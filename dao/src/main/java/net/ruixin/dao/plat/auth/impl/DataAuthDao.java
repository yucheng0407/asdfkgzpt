package net.ruixin.dao.plat.auth.impl;

import net.ruixin.dao.plat.auth.IDataAuthDao;
import net.ruixin.domain.plat.auth.AuthResult;
import net.ruixin.domain.plat.auth.SysDataAuth;
import net.ruixin.util.hibernate.BaseDao;
import net.ruixin.util.paginate.FastPagination;
import net.ruixin.util.tools.RxStringUtils;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * 数据权限dao
 *
 * @author Administrator
 */
@Repository
public class DataAuthDao extends BaseDao<SysDataAuth> implements IDataAuthDao {

    @Override
    public FastPagination getDataAuthList(Map map) {
        //获取查询参数
        Object userId = map.get("userId");
        Object oId = map.get("oId");
        Object objectName = map.get("objectName");
        Long objId = Long.parseLong(map.get("objId").toString());
        //获取待查询的数据库表名与字段名
        String dbsql = "SELECT O.DB_NAME,O.SHOW_NAME FROM SYS_OBJECT O WHERE O.ID=? AND O.SFYX_ST='1'";
        Map dbmap = getJdbcTemplate().queryForMap(dbsql, objId);
        String tableName = dbmap.get("DB_NAME").toString();
        String columnName = dbmap.get("SHOW_NAME").toString();
        //查询sql
        StringBuilder sql = new StringBuilder(300);
        List<Object> args = new ArrayList<>();
        //查询用户对某一对象的权限
        if (RxStringUtils.isNotEmpty(userId) && RxStringUtils.isNotEmpty(oId)) {
            sql.append("SELECT A.ID, A.USER_ID, U.USER_NAME, O.OBJ_NAME, B.ID OID, B.")
                    .append(columnName).append(" O_NAME FROM SYS_DATA_AUTH A, SYS_OBJECT O, SYS_USER U, ")
                    .append(tableName).append(" B").append(" WHERE A.OBJECT_ID = O.ID ")
                    .append(" AND A.USER_ID = U.ID ").append(" AND A.OIDS = B.ID ")
                    .append(" AND A.OBJECT_ID = ? ").append(" AND A.USER_ID = ? ")
                    .append(" AND A.OIDS = ? ").append(" AND A.SFYX_ST = '1' ")
                    .append(" AND O.SFYX_ST = '1' ").append(" AND U.SFYX_ST = '1' ")
                    .append(" AND B.SFYX_ST = '1' ");
            args.add(objId);
            args.add(userId);
            args.add(oId);
            //查询用户对某类对象的权限
        } else if (RxStringUtils.isNotEmpty(userId)) {
            dbsql = " SELECT COUNT(1) FROM SYS_DATA_AUTH A WHERE A.OBJECT_ID=? AND A.USER_ID=? AND A.OIDS IS NULL AND A.SFYX_ST='1'";
            Integer num = getJdbcTemplate().queryForObject(dbsql, Integer.class, objId, userId);
            //拥有该类对象所有数据权限
            if (num == 1) {
                dbsql = "SELECT COUNT(1) FROM " + tableName + " WHERE SFYX_ST='1' ";
                if (RxStringUtils.isNotEmpty(objectName)) {
                    dbsql += " AND " + columnName + " LIKE '%" + objectName + "%'";
                }
                num = getJdbcTemplate().queryForObject(dbsql, Integer.class);
                //模糊查询有数据
                if (num > 0) {
                    sql.append("SELECT A.ID, A.USER_ID, U.USER_NAME, O.OBJ_NAME, A.OIDS OID, '' O_NAME\n" +
                            "  FROM SYS_DATA_AUTH A, SYS_OBJECT O, SYS_USER U\n" +
                            " WHERE A.OBJECT_ID = O.ID\n" +
                            "   AND A.USER_ID = U.ID\n" +
                            "   AND A.SFYX_ST = '1'\n" +
                            "   AND O.SFYX_ST = '1'\n" +
                            "   AND U.SFYX_ST = '1'\n" +
                            "   AND A.OBJECT_ID = ?\n" +
                            "   AND A.USER_ID = ?\n" +
                            "   AND A.OIDS IS NULL\n");
                    args.add(objId);
                    args.add(userId);
                    return super.getPaginationBySql(sql, args, map);
                    //模糊查询没有数据
                } else {
                    return null;
                }
                //拥有该类对象部分数据权限
            } else {
                sql.append("SELECT A.ID, A.USER_ID, U.USER_NAME, O.OBJ_NAME, B.ID OID, B.")
                        .append(columnName).append(" O_NAME FROM SYS_DATA_AUTH A, SYS_OBJECT O, SYS_USER U, ")
                        .append(tableName).append(" B").append(" WHERE A.OBJECT_ID = O.ID ")
                        .append(" AND A.USER_ID = U.ID ").append(" AND A.OIDS = B.ID ")
                        .append(" AND A.OBJECT_ID = ? ").append(" AND A.USER_ID = ? ")
                        .append(" AND A.SFYX_ST = '1' ").append(" AND O.SFYX_ST = '1' ")
                        .append(" AND U.SFYX_ST = '1' ").append(" AND B.SFYX_ST = '1' ");
                args.add(objId);
                args.add(userId);
            }
            //查询具有某一对象权限的所有用户
        } else if (RxStringUtils.isNotEmpty(oId)) {
            sql.append("SELECT A.ID, A.USER_ID, U.USER_NAME, O.OBJ_NAME, B.ID OID, B.")
                    .append(columnName).append(" O_NAME FROM SYS_DATA_AUTH A, SYS_OBJECT O, SYS_USER U, ")
                    .append(tableName).append(" B").append(" WHERE A.OBJECT_ID = O.ID ")
                    .append(" AND A.USER_ID = U.ID ").append(" AND A.OIDS = B.ID ")
                    .append(" AND A.OBJECT_ID = ? ").append(" AND A.OIDS = ? ")
                    .append(" AND A.SFYX_ST = '1' ").append(" AND O.SFYX_ST = '1' ")
                    .append(" AND U.SFYX_ST = '1' ").append(" AND B.SFYX_ST = '1' ");
            args.add(objId);
            args.add(oId);
        }
        //根据对象名称进行模糊匹配
        if (RxStringUtils.isNotEmpty(objectName)) {
            sql.append(" AND B.").append(columnName).append(" LIKE ? ");
            args.add("%" + objectName + "%");
        }
        //查询结果封装为FastPagination对象并返回
        return super.getPaginationBySql(sql, args, map);
    }

    @Override
    public void saveDataAuth(String userIds, Long objId, String oIds, Long userId) {
        List<Object> params = new ArrayList<>();
        params.add(objId);
        params.add(userIds);
        params.add(oIds);
        params.add(userId);
        super.prepareCallNoReturn("{call PKG_BASEPLAT.P_UPDATE_DATA_AUTH(?,?,?,?,?)}", params.toArray());
    }

    @Override
    public SysDataAuth getDataAuthById(Long id) {
        return null;
    }


    @Override
    public List getObjList() {
        String sql = "SELECT SO.ID \"code\", " +
                "SO.OBJ_NAME \"value\" " +
                "FROM SYS_OBJECT SO WHERE SO.SFYX_ST = '1' ";
        return super.jdbcTemplate.queryForList(sql);
    }

    @Override
    public FastPagination getZtObjList(Map map, Long objId) {
        //获取待查询的数据库表名与字段名
        String dbsql = "SELECT O.DB_NAME,O.SHOW_NAME FROM SYS_OBJECT O WHERE O.ID=? AND O.SFYX_ST='1'";
        Map dbmap = getJdbcTemplate().queryForMap(dbsql, objId);
        String tableName = dbmap.get("DB_NAME").toString();
        String columnName = dbmap.get("SHOW_NAME").toString();
        List<Object> args = new ArrayList<>();
        StringBuilder sql = new StringBuilder(100);
        sql.append("SELECT T.ID , T.").append(columnName).append(" OBJ_NAME FROM ")
                .append(tableName).append(" T WHERE T.SFYX_ST='1' ");
        //根据对象名称进行模糊匹配
        Object objectName = map.get("objectName");
        if (RxStringUtils.isNotEmpty(objectName)) {
            sql.append(" AND T.").append(columnName).append(" LIKE ? ");
            args.add("%" + objectName + "%");
        }
        //查询结果封装为FastPagination对象并返回
        return super.getPaginationBySql(sql, args, map);
    }

    @Override
    public void delDataAuth(Long userId, Long objId, String oIds) {
        List<Object> args = new ArrayList<>();
        StringBuilder sql = new StringBuilder("delete from sys_data_auth auth where ");
        sql.append("auth.user_id = ?");
        args.add(userId);
        sql.append(" and auth.object_id = ? ");
        args.add(objId);
        if (RxStringUtils.isNotEmpty(oIds)) {
            sql.append(" and auth.oids = ? ");
            args.add(oIds);
        } else {
            sql.append(" and auth.oids is null ");
        }
        super.getJdbcTemplate().update(sql.toString(), args.toArray());
    }

    @Override
    public void batchDel(String userIds, Long objectId) {
        List<Object> args = new ArrayList<>();
        StringBuilder sql = new StringBuilder("delete from sys_data_auth a where a.user_id in(select column_value from table(splitstr(?,','))) ");
        args.add(userIds);
        if (objectId != null) {
            sql.append("and a.object_id=? ");
            args.add(objectId);
        }
        super.getJdbcTemplate().update(sql.toString(), args.toArray());
    }

    @Override
    public AuthResult getUserDataAuthResult(Long userId, String objectCode) {
        String sql0 = "select count(*) from sys_user u, sys_glb_role_user gru," +
                " sys_role r where gru.user_id = u.id and gru.role_id = r.id" +
                " and r.levels = 1 and u.id = ?";
        Integer platNum = getJdbcTemplate().queryForObject(sql0, Integer.class, userId);
        if (platNum > 0) {
            AuthResult ar = new AuthResult();
            ar.setHasAuth(true);
            ar.setHasAll(true);
            return ar;
        }
        String sql = "select *\n" +
                "  from sys_data_auth da\n" +
                " where da.user_id = ?\n" +
                "   and da.object_id in\n" +
                "       (select o.id from sys_object o where o.obj_code = ?)\n" +
                "   and da.sfyx_st = '1'\n";
        List<Map<String, Object>> resultList = getJdbcTemplate().queryForList(sql, userId, objectCode);
        AuthResult ar = new AuthResult();
        if (resultList.size() > 0) {
            ar.setHasAuth(true);
            StringBuilder oids = new StringBuilder();
            for (Map<String, Object> map : resultList) {
                if (RxStringUtils.isNotEmpty(map.get("OIDS"))) {
                    if (oids.length() != 0) {
                        oids.append(",");
                    }
                    oids.append(map.get("OIDS").toString());
                } else {
                    ar.setHasAll(true);
                    break;
                }
            }
            if (!ar.getHasAll()) {
                ar.setOids(oids.toString());
            }
        }
        return ar;
    }
}
