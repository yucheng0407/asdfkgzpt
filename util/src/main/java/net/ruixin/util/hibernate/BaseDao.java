package net.ruixin.util.hibernate;

import net.ruixin.domain.constant.Const;
import net.ruixin.domain.plat.BaseDomain;
import net.ruixin.domain.plat.attachment.Attachment;
import net.ruixin.domain.rule.DelIgnore;
import net.ruixin.enumerate.plat.SfyxSt;
import net.ruixin.util.exception.BussinessException;
import net.ruixin.util.http.HttpSessionHolder;
import net.ruixin.util.paginate.FastPagination;
import net.ruixin.util.tools.ObjectUtils;
import net.ruixin.util.tools.OracleUtils;
import net.ruixin.util.tools.RxBeanUtils;
import net.ruixin.util.tools.RxStringUtils;
import oracle.jdbc.OracleTypes;
import oracle.sql.CLOB;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.jdbc.ReturningWork;
import org.hibernate.transform.Transformers;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeansException;
import org.springframework.beans.FatalBeanException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Component;

import java.util.Date;

import javax.annotation.Resource;
import javax.persistence.*;
import java.beans.PropertyDescriptor;
import java.io.Serializable;
import java.lang.reflect.*;
import java.math.BigDecimal;
import java.sql.*;
import java.util.*;

/**
 * 基础DAO实现
 */
@SuppressWarnings({"unchecked", "WeakerAccess", "SqlDialectInspection", "SqlNoDataSourceInspection"})
@Component
public class BaseDao<T> implements IBaseDao<T> {

    private static final Logger LOGGER = LoggerFactory.getLogger(BaseDao.class);

    private Class<T> entityClazz;

    private final Class<T> sourceClazz;

    @Resource
    protected SessionFactory sessionFactory;

    @Resource
    protected JdbcTemplate jdbcTemplate;

    @Resource
    protected NamedParameterJdbcTemplate npJdbcTemplate;

    public JdbcTemplate getJdbcTemplate() {
        return jdbcTemplate;
    }

    @SuppressWarnings("unused")
    public NamedParameterJdbcTemplate getNpJdbcTemplate() {
        return npJdbcTemplate;
    }

    public Session getSession() {
        return sessionFactory.getCurrentSession();
    }

    private Query setParameter(Query query, Map<String, ?> parameterMap) {
        for (Map.Entry<String, ?> entry : parameterMap.entrySet()) {
            Object o = entry.getValue();
            try {
                if (Number.class.isAssignableFrom(entry.getValue().getClass())) {
                    Class vc = entry.getValue().getClass();
                    Class key = entityClazz.getDeclaredField(entry.getKey()).getType();
                    if (vc != key) {
                        Method m = key.getMethod("valueOf", String.class);
                        o = m.invoke(null, entry.getValue().toString());
                    }
                }
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
            query.setParameter(entry.getKey(), o);
        }
        return query;
    }

    public BaseDao() {
        Type type = getClass().getGenericSuperclass();
        if (type instanceof ParameterizedType) {
            this.entityClazz = (Class<T>) ((ParameterizedType) type).getActualTypeArguments()[0];
            sourceClazz = entityClazz;
        } else {
            this.entityClazz = null;
            sourceClazz = null;
        }
    }

    //------------------------------------------------------------------------------------------接口实现
    @Override
    public void delete(Serializable id) {
        delLogic(id, this.entityClazz);
    }

    protected void delLogic(Serializable id, Class<?> tClass) {
        String tableName = tClass.getAnnotation(Table.class).name();
        PropertyDescriptor sfyx = RxBeanUtils.getPropertyDescriptor(tClass, "sfyxSt");
        if (sfyx == null) {
            //没有有效标识位的直接物理删除
            executeSqlUpdate("delete from " + tableName + " where id = ?", id);
        } else {
            //否则更改标识位
            Long useid = (Long) HttpSessionHolder.get().getAttribute(Const.USER_ID);
            StringBuffer sql = new StringBuffer("update " + tableName + " set SFYX_ST = '0' ");
            List args = new ArrayList();
            PropertyDescriptor pd_xgr = RxBeanUtils.getPropertyDescriptor(tClass, "xgrId");
            if (pd_xgr != null) {
                sql.append(" ,XGR_ID = ? ");
                args.add(useid);
            }
            PropertyDescriptor pd_xgsj = RxBeanUtils.getPropertyDescriptor(tClass, "xgsj");
            if (pd_xgsj != null) {
                sql.append(" ,xgsj = sysdate ");
            }
            sql.append(" where id = ? ");
            args.add(id);
            executeSqlUpdate(sql, args.toArray());
        }
    }

    @Override
    public void deleteCascade(Serializable id) {
        delLogicCascade(id, this.entityClazz);
    }

    protected void delLogicCascade(Serializable id, Class<?> clazz) {
        try {
            this.delLogic(id, clazz);
            Object t = getSession().get(clazz, id);
            Field[] fields = clazz.getDeclaredFields();
            Field.setAccessible(fields, true);
            for (Field f : fields) {
                OneToOne oto = f.getAnnotation(OneToOne.class);
                if (oto != null && !f.isAnnotationPresent(DelIgnore.class)) {
                    CascadeType[] cascadeTypes = oto.cascade();
                    for (CascadeType cascadeType : cascadeTypes) {
                        if (cascadeType == CascadeType.ALL || cascadeType == CascadeType.REMOVE) {
                            //获取属性值
                            Object o = f.get(t);
                            //获取属性对象ID属性
                            Field idFld = o.getClass().getDeclaredField("id");
                            idFld.setAccessible(true);
                            delLogicCascade((Serializable) idFld.get(o), o.getClass());
                            break;
                        }
                    }
                    continue;
                }
                OneToMany otm = f.getAnnotation(OneToMany.class);
                if (otm != null && !f.isAnnotationPresent(DelIgnore.class)) {
                    CascadeType[] cascadeTypes = otm.cascade();
                    for (CascadeType cascadeType : cascadeTypes) {
                        if (cascadeType == CascadeType.ALL || cascadeType == CascadeType.REMOVE) {
                            //获取属性值
                            Object o = f.get(t);
                            if (o instanceof Collection<?>) {
                                for (Object tmp : (Collection<?>) o) {
                                    //获取属性对象ID属性
                                    Field idFld = tmp.getClass().getDeclaredField("id");
                                    idFld.setAccessible(true);
                                    delLogicCascade((Serializable) idFld.get(tmp), tmp.getClass());
                                }
                            }
                            break;
                        }
                    }
                }
                ManyToMany mtm = f.getAnnotation(ManyToMany.class);
                if (mtm != null && !f.isAnnotationPresent(DelIgnore.class)) {
                    CascadeType[] cascadeTypes = mtm.cascade();
                    for (CascadeType cascadeType : cascadeTypes) {
                        if (cascadeType == CascadeType.ALL || cascadeType == CascadeType.REMOVE) {
                            JoinTable jt = f.getAnnotation(JoinTable.class);
                            if (jt != null) {
                                String tName = jt.name();
                                JoinColumn[] jcs = jt.joinColumns();
                                String fk = jcs[0].name();
                                deleteJoinTable(tName, fk, id);
                            }
                        }
                    }
                }
            }
        } catch (Throwable e) {
            throw new FatalBeanException("Could not cascade delete", e);
        } finally {
            entityClazz = sourceClazz;
        }
    }

    private void deleteJoinTable(String tName, String fk, Serializable id) {
        String condition = "select count(*) from user_tab_columns where table_name = ? and column_name = 'SFYX_ST'";
        Integer count = this.getJdbcTemplate().queryForObject(condition, Integer.class, id);
        if (count != null && count > 0) {
            if (RxStringUtils.isNotEmpty(tName) && RxStringUtils.isNotEmpty(fk)) {
                executeSqlUpdate("update " + tName + " set " + " SFYX_ST = '0' where " + fk + " = ?", id);
            }
        } else {
            executeSqlUpdate("delete from " + tName + " where " + fk + " = ?", id);
        }
    }

    @Override
    public void saveOrUpdate(T entity) throws BeansException {
        Class<T> tClass = this.entityClazz;
        save(entity, tClass);
    }

    protected Object save(T entity, Class<T> tClass) {
        Object id = ObjectUtils.ifIdExist(entity);
        Session session = getSession();
        //修改方法
        if (id != null) {
            Object persistent;
            if (((BaseDomain) entity).getInteractionFields() != null) {
                //先获取数据库中对象
                persistent = session.get(tClass, (Serializable) id);
                //覆盖修改的非空属性
                RxBeanUtils.copyPropertiesIgnoreNull(entity, persistent, session);
            } else {
                persistent = entity;
            }
            //修改系统属性
            ObjectUtils.setEntityValue(persistent, getSysDate(), "xgrId", "xgsj");
            //执行更新
            session.saveOrUpdate(persistent);
        } else {        //保存方法
            //系统属性赋初值
            ObjectUtils.setEntityValue(entity, getSysDate(), "cjrId", "cjsj", "xgrId", "xgsj");
            //执行保存
            session.saveOrUpdate(entity);
        }
        //更新附件
        try {
            Map fjMap = (Map) BaseDomain.class.getDeclaredMethod("getFjUpdateIds").invoke(entity);
//            Map fjMap = (Map) ((BaseDomain) entity).getClass().getDeclaredMethod("getFjUpdateIds").invoke(entity);
            if (fjMap != null) {
                String addIds = fjMap.get("addIds").toString();
                String delIds = fjMap.get("delIds").toString();
                updateFiles(addIds, delIds);
            }

        } catch (IllegalAccessException | InvocationTargetException | NoSuchMethodException e) {
            LOGGER.error("更新附件异常", e);
        }
        return ObjectUtils.ifIdExist(entity);
    }

    public void updateFiles(String addFileIds, String delFileIds) {
        if (RxStringUtils.isNotEmpty(addFileIds)) {
            String sql = "UPDATE SYS_ATTACHMENT SET SFYX_ST='1' WHERE ID IN (SELECT COLUMN_VALUE FROM TABLE(SPLITSTR(?, ',')))";
            getJdbcTemplate().update(sql, addFileIds);
        }
        if (RxStringUtils.isNotEmpty(delFileIds)) {
            delLogicBatch(delFileIds, (Class<T>) Attachment.class);
        }
    }

    @Override
    public void deleteBatch(String ids) {
        delLogicBatch(ids, this.entityClazz);
    }

    protected void delLogicBatch(String ids, Class<T> tClass) {
        String tableName = tClass.getAnnotation(Table.class).name();
        Long useid = (Long) HttpSessionHolder.get().getAttribute(Const.USER_ID);
        List args = new ArrayList();
        PropertyDescriptor sfyx = RxBeanUtils.getPropertyDescriptor(tClass, "sfyxSt");
        if (sfyx == null) {
            //没有有效标识位的直接物理删除
            executeSqlUpdate("delete from " + tableName + " where id in SELECT * FROM TABLE(SPLITSTR(?,','))", ids);
        } else {
            StringBuffer sql = new StringBuffer("update " + tableName + " set sfyx_st = 0 ");
            PropertyDescriptor pd_xgr = RxBeanUtils.getPropertyDescriptor(tClass, "xgrId");
            if (pd_xgr != null && null != useid) {
                sql.append(" ,XGR_ID = ? ");
                args.add(useid);
            }
            PropertyDescriptor pd_xgsj = RxBeanUtils.getPropertyDescriptor(tClass, "xgsj");
            if (pd_xgsj != null) {
                sql.append(" ,xgsj = sysdate ");
            }
            sql.append(" where ").append(OracleUtils.getInSql("id", ids));
            executeSqlUpdate(sql, args.toArray());
        }
    }

    @Override
    public void saveOrUpdateBatch(Collection<T> entities) {
        for (T entity : entities) {
            saveOrUpdate(entity);
        }
    }

    @Override
    public T get(Serializable id) {
        if (id == null || entityClazz == null) {
            return null;
        }
        return (T) getSession().get(entityClazz, id);
    }

    @Override
    public T getValid(Serializable id) {
        if (id == null || entityClazz == null) {
            return null;
        }
        T t = (T) getSession().get(entityClazz, id);
        PropertyDescriptor sfyx = RxBeanUtils.getPropertyDescriptor(entityClazz, "sfyxSt");
        if (sfyx == null) {
            return t;
        } else {
            try {
                if (sfyx.getReadMethod().invoke(entityClazz).equals(SfyxSt.VALID)) {
                    return t;
                } else {
                    return null;
                }
            } catch (IllegalAccessException | InvocationTargetException e) {
                LOGGER.error("对象获取异常", e);
            }
        }
        return t;
    }

    @Override
    public T getByHql(CharSequence queryString, Object... params) {
        Query qry = getSession().createQuery(queryString.toString());
        for (int i = 0; i < params.length; ++i) {
            qry.setParameter(i, params[i]);
        }
        List list = qry.setMaxResults(1).list();
        if (list.isEmpty()) {
            return null;
        }
        return (T) list.get(0);
    }

    @Override
    public T getByHql(CharSequence queryString, Map<String, ?> params) {
        Query qry = getSession().createQuery(queryString.toString());
        setParameter(qry, params);
        List list = qry.setMaxResults(1).list();
        if (list.isEmpty()) {
            return null;
        }
        return (T) list.get(0);
    }

    @Override
    @Deprecated
    public T getBySql(CharSequence sql, Object... params) {
        SQLQuery sqlQuery = getSession().createSQLQuery(sql.toString());
        for (int i = 0; i < params.length; ++i) {
            sqlQuery.setParameter(i, params[i]);
        }
        List list = sqlQuery.setResultTransformer(Transformers.aliasToBean(entityClazz)).list();
//        List list = sqlQuery.addEntity(entityClazz).list();
        if (list.isEmpty()) {
            return null;
        }
        return (T) list.get(0);
    }

    @Override
    @Deprecated
    public T getBySql(CharSequence sql, Map<String, ?> params) {
        SQLQuery sqlQuery = getSession().createSQLQuery(sql.toString());
        setParameter(sqlQuery, params);
        List list = sqlQuery.setResultTransformer(Transformers.aliasToBean(entityClazz)).list();
//        List list = sqlQuery.addEntity(entityClazz).list();
        if (list.isEmpty()) {
            return null;
        }
        return (T) list.get(0);
    }

    @Override
    public T getBySqlNative(CharSequence sql, Object... params) {
        return (T) ObjectUtils.parseMapToObj(this.getJdbcTemplate().queryForMap(sql.toString(), params), entityClazz);
    }

    @Override
    public T getBySqlNative(CharSequence sql, Map<String, ?> params) {
        return (T) ObjectUtils.parseMapToObj(this.getNpJdbcTemplate().queryForMap(sql.toString(), params), entityClazz);
    }

    @Override
    public List<T> findListByHql(CharSequence queryString, Object... params) {
        Query query = getSession().createQuery(queryString.toString());
        for (int i = 0; i < params.length; ++i) {
            query.setParameter(i, params[i]);
        }
        return query.list();
    }

    @Override
    public List<T> findListByHql(CharSequence queryString, Map<String, ?> params) {
//        if(params.get("HqlName")!=null){
//            params.remove("HqlName");
//        }
        Query query = getSession().createQuery(queryString.toString());
        setParameter(query, params);
        return query.list();
    }

    @Override
    public List<T> getListBySql(CharSequence sql, Object... params) {
        List<T> listT = new ArrayList<>();
        List<Map<String, Object>> list = this.getJdbcTemplate().queryForList(sql.toString(), params);
        for (Map map : list) {
            listT.add((T) ObjectUtils.parseMapToObj(map, entityClazz));
        }
        return listT;
//        SQLQuery sqlQuery = getSession().createSQLQuery(sql.toString());
//        for (int i = 0; i < params.length; ++i) {
//            sqlQuery.setParameter(i, params[i]);
//        }
//        return sqlQuery.addEntity(entityClazz).list();
    }

    @Override
    public List<T> getListBySql(CharSequence sql, Map<String, ?> params) {
        List<T> listT = new ArrayList<>();
        List<Map<String, Object>> list = this.getNpJdbcTemplate().queryForList(sql.toString(), params);
        for (Map map : list) {
            listT.add((T) ObjectUtils.parseMapToObj(map, entityClazz));
        }
        return listT;
//        SQLQuery sqlQuery = getSession().createSQLQuery(sql.toString());
//        setParameter(sqlQuery, params);
//        return sqlQuery.addEntity(entityClazz).list();
    }

    @Override
    public List<T> findByProperty(String name, Object value) {
        String hql = "from " + entityClazz.getSimpleName() + " where " + name + " = ? ";
        return findListByHql(hql, value);
    }

    @Override
    public List<T> findByProperty(Map<String, ?> conditionMap) {
        StringBuilder hql = new StringBuilder();
        hql.append("from  ").append(entityClazz.getSimpleName());
        if (!conditionMap.isEmpty()) {
            Iterator<String> it = conditionMap.keySet().iterator();
            String key = it.next();
            hql.append(" where  ").append(key).append("=:").append(key);
            while (it.hasNext()) {
                key = it.next();
                hql.append(" and  ").append(key).append("=:").append(key);
            }
        }
        return findListByHql(hql.toString(), conditionMap);
    }

    @Override
    public int executeSqlUpdate(CharSequence sql, Object... args) {
        SQLQuery queryObject = this.getSession().createSQLQuery(sql.toString());
        for (int i = 0; i < args.length; ++i) {
            queryObject.setParameter(i, args[i]);
        }
        return queryObject.executeUpdate();
    }

    @Override
    public int executeHqlUpdate(CharSequence hql, Object... args) {
        Query queryObject = getSession().createQuery(hql.toString());
        for (int i = 0; i < args.length; ++i) {
            queryObject.setParameter(i, args[i]);
        }
        return queryObject.executeUpdate();
    }

    @Override
    public FastPagination getPaginationBySql(CharSequence queryString, List params, Map pageParam) {
        if (null != pageParam.get("allPage") || null == pageParam.get("pageSize")) {
            FastPagination fastPagination = new FastPagination();

            fastPagination.setRows(getJdbcTemplate().queryForList(queryString.toString(), params.toArray()));
            fastPagination.setTotal(fastPagination.getRows().size());
            return fastPagination;
        } else {
            Integer pageIndex = (Integer) pageParam.get("pageNo");
            Integer pageSize = (Integer) pageParam.get("pageSize");
            Integer oldPage = (Integer) pageParam.get("oldPage");
            String newSql = "select * from (" + queryString + ")";
            //顺序排列的ids
            String ascIds = null;
            if (null != pageParam.get("ascIds")) {
                ascIds = pageParam.get("ascIds").toString();
            }
            //降序排除的ids
            String descIds = null;
            if (null != pageParam.get("descIds")) {
                descIds = pageParam.get("descIds").toString();
            }
            if (RxStringUtils.isNotEmpty(ascIds)) {
                newSql += "order by " + ascIds + " asc nulls last";
            } else if (RxStringUtils.isNotEmpty(descIds)) {
                newSql += "order by " + descIds + " desc nulls last";
            } else {
                newSql = queryString.toString();
            }
            if (pageSize > 0) {
                String sql = "SELECT * FROM ( SELECT A.*, ROWNUM RN FROM( " +
                        newSql +
                        " ) A WHERE ROWNUM <= ? ) WHERE RN >= ?";
                List<Object> args = new ArrayList<>();
                if (null != params) {
                    args.addAll(params);
                }
                FastPagination fastPagination = new FastPagination();
                if (pageParam.get("needGetTotal").equals(true)) {
                    String totalsql = "SELECT count(*) as rn FROM( " + queryString + " ) A";
                    Integer total = ((BigDecimal) this.getJdbcTemplate().queryForMap(totalsql, args.toArray()).get("RN")).intValue();
                    fastPagination.setTotal(total);
                }
                Integer pages;
                if (oldPage <= pageIndex) {//向前翻页
                    //end
                    args.add(pageIndex * pageSize + 1);
                    //start
                    args.add((oldPage - 1) * pageSize + 1);
                    pages = pageIndex - oldPage + 1;
                } else {      //向后翻页
                    //end
                    args.add(oldPage * pageSize + 1);
                    //start
                    args.add((pageIndex - 1) * pageSize + 1);
                    pages = oldPage - pageIndex + 1;
                }
//        List rows = this.getListBySql(sql, args.toArray());
                List rows = this.getJdbcTemplate().queryForList(sql, args.toArray());
                fastPagination.setPageSize(pageSize);
                fastPagination.setRows(rows);
                if (rows.size() <= pageSize * pages) {
                    fastPagination.setHasNext(false);
                } else {
                    fastPagination.setHasNext(true);
                }
                return fastPagination;
            } else {
                List rows = this.getJdbcTemplate().queryForList(newSql, params.toArray());
                FastPagination fastPagination = new FastPagination();
                fastPagination.setRows(rows);
                return fastPagination;
            }
        }
    }

    @Override
    public FastPagination getPaginationBySql(CharSequence queryString, List params, int startPage, int endPage,
                                             int pageSize, boolean getTotal) {
        String newSql = "select * from (" + queryString + ")";
        if (pageSize > 0) {
            String sql = "SELECT * FROM ( SELECT A.*, ROWNUM RN FROM( " +
                    newSql +
                    " ) A WHERE ROWNUM <= ? ) WHERE RN >= ?";
            List<Object> args = new ArrayList<>();
            if (null != params) {
                args.addAll(params);
            }
            FastPagination fastPagination = new FastPagination();
            if (getTotal) {
                String totalsql = "SELECT count(*) as rn FROM( " + queryString + " ) A";
                Integer total = ((BigDecimal) this.getJdbcTemplate().queryForMap(totalsql, args.toArray()).get("RN")).intValue();
                fastPagination.setTotal(total);
            }
            Integer pages;
            if (endPage <= startPage) {//向前翻页
                //end
                args.add(startPage * pageSize + 1);
                //start
                args.add((endPage - 1) * pageSize + 1);
                pages = startPage - endPage + 1;
            } else {      //向后翻页
                //end
                args.add(endPage * pageSize + 1);
                //start
                args.add((startPage - 1) * pageSize + 1);
                pages = endPage - startPage + 1;
            }
//        List rows = this.getListBySql(sql, args.toArray());
            List rows = this.getJdbcTemplate().queryForList(sql, args.toArray());
            fastPagination.setPageSize(pageSize);
            fastPagination.setRows(rows);
            if (rows.size() <= pageSize * pages) {
                fastPagination.setHasNext(false);
            } else {
                fastPagination.setHasNext(true);
            }
            return fastPagination;
        } else {
            List rows = this.getJdbcTemplate().queryForList(newSql, params.toArray());
            FastPagination fastPagination = new FastPagination();
            fastPagination.setRows(rows);
            return fastPagination;
        }
    }

    @Override
    public FastPagination getPaginationByHql(CharSequence queryString, List params, Map pageParam) {
        Query query = getSession().createQuery(queryString.toString());
        for (int i = 0; i < params.size(); ++i) {
            query.setParameter(i, params.get(i));
        }
        FastPagination fastPagination = new FastPagination();
        if (null != pageParam.get("allPage") || null == pageParam.get("pageSize")) {
            fastPagination.setRows(query.list());
            fastPagination.setTotal(fastPagination.getRows().size());
            return fastPagination;
        } else {
            if (pageParam.get("needGetTotal").equals(true)) {
                String totalsql = "SELECT count(*) as rn FROM( " + queryString + " ) A";
                Integer total = (query.list().size());
                fastPagination.setTotal(total);
            }
            Integer pageIndex = (Integer) pageParam.get("pageNo");
            Integer pageSize = (Integer) pageParam.get("pageSize");
            Integer oldPage = (Integer) pageParam.get("oldPage");
            Integer pages;
            if (oldPage <= pageIndex) {//向前翻页
                pages = pageIndex - oldPage + 1;
                query.setFirstResult((oldPage - 1) * pageSize);
                query.setMaxResults(pageIndex * pageSize);
            } else {      //向后翻页
                pages = oldPage - pageIndex + 1;
                query.setFirstResult((pageIndex - 1) * pageSize);
                query.setMaxResults(oldPage * pageSize);
            }
            List rows = query.list();
            fastPagination.setPageSize(pageSize);
            fastPagination.setRows(rows);
            if (rows.size() < pageSize * pages) {
                fastPagination.setHasNext(false);
            } else {
                fastPagination.setHasNext(true);
            }
            return fastPagination;
        }
    }

    @Override
    public FastPagination getPaginationByHql(CharSequence queryString, List params, int startPage, int endPage,
                                             int pageSize, boolean getTotal) {
        Query query = getSession().createQuery(queryString.toString());
        for (int i = 0; i < params.size(); ++i) {
            query.setParameter(i, params.get(i));
        }
        FastPagination fastPagination = new FastPagination();
        if (getTotal) {
            String totalsql = "SELECT count(*) as rn FROM( " + queryString + " ) A";
            Integer total = (query.list().size());
            fastPagination.setTotal(total);
        }
        Integer pages;
        if (endPage <= startPage) {//向前翻页
            pages = startPage - endPage + 1;
            query.setFirstResult((endPage - 1) * pageSize);
            query.setMaxResults(startPage * pageSize);
        } else {      //向后翻页
            pages = endPage - startPage + 1;
            query.setFirstResult((startPage - 1) * pageSize);
            query.setMaxResults(endPage * pageSize);
        }
        List rows = query.list();
        fastPagination.setPageSize(pageSize);
        fastPagination.setRows(rows);
        if (rows.size() < pageSize * pages) {
            fastPagination.setHasNext(false);
        } else {
            fastPagination.setHasNext(true);
        }
        return fastPagination;
    }

    /**
     * 简单分页
     *
     * @param queryString 查询sql
     * @param params      查询参数
     * @param pageIndex   当前页
     * @param pageSize    一页数据的行数
     * @return
     */
    @Override
    public FastPagination simpleFastPage(CharSequence queryString, List params, int pageIndex, int pageSize) {
        String sql = "SELECT * FROM ( SELECT A.*, ROWNUM RN FROM( " +
                queryString +
                " ) A WHERE ROWNUM <= ? ) WHERE RN >= ?";
        List<Object> args = new ArrayList<>();
        args.addAll(params);
        FastPagination fastPagination = new FastPagination();

        String totalsql = "SELECT count(*) as rn FROM( " + queryString + " ) A";
        Integer total = ((BigDecimal) this.getJdbcTemplate().queryForMap(totalsql, args.toArray()).get("RN")).intValue(); //总数
        fastPagination.setTotal(total);

        args.add((pageIndex) * pageSize);
        args.add((pageIndex - 1) * pageSize + 1);

        List rows = this.getJdbcTemplate().queryForList(sql, args.toArray());
        fastPagination.setPageSize(pageSize);
        fastPagination.setRows(rows);
        if (rows.size() <= pageSize * pageIndex) {
            fastPagination.setHasNext(false);
        } else {
            fastPagination.setHasNext(true);
        }
        return fastPagination;
    }

    @Override
    public String prepareCallAndReturn(final CharSequence callSql, final Object... inParameters) {
        Session session = getSession();
        return session.doReturningWork(connection -> {
            CallableStatement cs = connection.prepareCall(callSql.toString());
            int inParametersLength = inParameters.length;
            for (int i = 0; i < inParametersLength; i++) {
                cs.setObject(i + 1, inParameters[i]);
            }
            cs.registerOutParameter(inParametersLength + 1, Types.VARCHAR);
            cs.registerOutParameter(inParametersLength + 2, Types.VARCHAR);
            cs.executeUpdate();
            if ("SUCCESS".equals(cs.getString(inParametersLength + 2))) {
                return cs.getString(inParametersLength + 1);
            } else {
//                    throw new RuntimeException(cs.getString(inParametersLength + 2));
                throw new BussinessException(cs.getString(inParametersLength + 2), callSql.toString());
            }
        });
    }

    @Override
    public List prepareCallAndReturnList(final CharSequence callSql, final Object... inParameters) {
        Session session = getSession();
        return session.doReturningWork(connection -> {
            CallableStatement cs = connection.prepareCall(callSql.toString());
            int inParametersLength = inParameters.length;
            for (int i = 0; i < inParametersLength; i++) {
                cs.setObject(i + 1, inParameters[i]);
            }
            cs.registerOutParameter(inParametersLength + 1, oracle.jdbc.internal.OracleTypes.CURSOR);
            cs.registerOutParameter(inParametersLength + 2, Types.VARCHAR);
            cs.executeUpdate();
            if ("SUCCESS".equals(cs.getString(inParametersLength + 2))) {
                return OracleUtils.parseResultSetToList((ResultSet) cs.getObject(inParametersLength + 1), null);
            } else {
//                    throw new RuntimeException(cs.getString(inParametersLength + 2));
                throw new BussinessException(cs.getString(inParametersLength + 2), callSql.toString());
            }
        });
    }

    @Override
    public void prepareCallNoReturn(final CharSequence callSql, final Object... inParameters) {
        Session session = getSession();
        session.doWork(connection -> {
            CallableStatement cs = connection.prepareCall(callSql.toString());
            int inParametersLength = inParameters.length;
            for (int i = 0; i < inParametersLength; i++) {
                cs.setObject(i + 1, inParameters[i]);
            }
            cs.registerOutParameter(inParametersLength + 1, Types.VARCHAR);
            cs.executeUpdate();
            if (!"SUCCESS".equals(cs.getString(inParametersLength + 1))) {
//                    throw new RuntimeException(cs.getString(inParametersLength + 1));
                throw new BussinessException(cs.getString(inParametersLength + 1), callSql.toString());
            }
        });
    }

    public void prepareCallNoParam(final CharSequence callSql) {
        Session session = getSession();
        session.doWork(connection -> {
            CallableStatement cs = connection.prepareCall(callSql.toString());
            cs.registerOutParameter(1, Types.VARCHAR);
            cs.registerOutParameter(2, Types.VARCHAR);
            cs.executeUpdate();
            if (!"SUCCESS".equals(cs.getString(1))) {
                throw new BussinessException(cs.getString(2), callSql.toString());
            }
        });
    }

    @Override
    public void prepareCallNoReturnClob(final CharSequence callSql, final int[] indexs, final Object... inParameters) {
        Session session = getSession();
        session.doWork(connection -> {
            CallableStatement cs = connection.prepareCall(callSql.toString());
            int inParametersLength = inParameters.length;
            CLOB clob;
            for (int i = 0; i < inParametersLength; i++) {
                int count = 0;
                for (int index : indexs) {
                    if (i == index) {
                        count++;
                        break;
                    }
                }
                if (count == 1) {
                    clob = CLOB.createTemporary(connection.getMetaData().getConnection(), true, 1);
                    clob.setString(1, (String) inParameters[i]);
                    cs.setObject(i + 1, clob);
                } else if (count == 0) {
                    cs.setObject(i + 1, inParameters[i]);
                }
            }
            cs.registerOutParameter(inParametersLength + 1, Types.VARCHAR);
            cs.executeUpdate();
            if (!"SUCCESS".equals(cs.getString(inParametersLength + 1))) {
                throw new BussinessException(cs.getString(inParametersLength + 1), callSql.toString());
            }
        });
    }

    @Override
    public List<Object> prepareCallAndReturnCustom(final CharSequence callSql, final List<Object> inParameters, final List<Integer> outTypeList) {
        Session session = getSession();
        return session.doReturningWork((ReturningWork<List>) connection -> {
            CallableStatement cs = connection.prepareCall(callSql.toString());
            int inParametersLength = inParameters.size();
            int outLength = outTypeList.size();
            for (int i = 0; i < inParametersLength; i++) {
                cs.setObject(i + 1, inParameters.get(i));
            }
            for (int j = 0; j < outLength; j++) {
                cs.registerOutParameter(inParametersLength + j + 1, outTypeList.get(j));
            }
            cs.registerOutParameter(inParametersLength + outLength + 1, Types.VARCHAR);
            cs.executeUpdate();
            if (!"SUCCESS".equals(cs.getString(inParametersLength + outLength + 1))) {
//                    throw new RuntimeException(cs.getString(inParametersLength + outLength + 1));
                throw new BussinessException(cs.getString(inParametersLength + outLength + 1), callSql.toString());
            } else {
                List<Object> result = new ArrayList<>();
                for (int k = 0; k < outLength; k++) {
                    if (outTypeList.get(k).equals(OracleTypes.CURSOR)) {
                        result.add(OracleUtils.parseResultSetToList((ResultSet) cs.getObject(inParametersLength + k + 1), null));
                    } else {
                        result.add(cs.getObject(inParametersLength + k + 1));
                    }
                }
                return result;
            }
        });
    }

    @Override
    public List<Map<String, Object>> callFuncAndReturnList(final CharSequence callSql, final Object... inParameters) {
        return getSession().doReturningWork((ReturningWork<List<Map<String, Object>>>) connection -> {
            CallableStatement cs = connection.prepareCall(callSql.toString());
            cs.registerOutParameter(1, OracleTypes.CURSOR);
            int inParametersLength = inParameters.length;
            for (int i = 0; i < inParametersLength; i++) {
                cs.setObject(i + 2, inParameters[i]);
            }
            cs.executeUpdate();
            return OracleUtils.parseResultSetToList((ResultSet) cs.getObject(1), null);
        });
    }

    @Override
    public Date getSysDate() {
        String sql = "SELECT SYSDATE FROM DUAL";
        return jdbcTemplate.queryForObject(sql, Date.class);
    }
}