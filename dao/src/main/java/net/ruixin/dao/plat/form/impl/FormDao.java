package net.ruixin.dao.plat.form.impl;

import net.ruixin.dao.plat.form.IFormDao;
import net.ruixin.domain.constant.Const;
import net.ruixin.domain.plat.auth.ShiroUser;
import net.ruixin.domain.plat.form.FormDef;
import net.ruixin.domain.plat.form.FormField;
import net.ruixin.enumerate.plat.SfyxSt;
import net.ruixin.enumerate.plat.WidgetType;
import net.ruixin.util.hibernate.BaseDao;
import net.ruixin.util.http.HttpSessionHolder;
import net.ruixin.util.json.JacksonUtil;
import net.ruixin.util.mapUtil.MapUtil;
import net.ruixin.util.paginate.FastPagination;
import net.ruixin.util.shiro.ShiroKit;
import net.ruixin.util.tools.OracleUtils;
import net.ruixin.util.tools.RxBeanUtils;
import net.ruixin.util.tools.RxStringUtils;
import org.springframework.stereotype.Repository;

import java.beans.PropertyDescriptor;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;


/**
 * 表单设计DAO
 */
@SuppressWarnings("unchecked")
@Repository
public class FormDao extends BaseDao<FormDef> implements IFormDao {

    @Override
    public FastPagination getFormDefList(Map map) {
        //查主版本的数据
        StringBuilder sql = new StringBuilder("" +
                "SELECT DEF.ID, DEF.NAME, DEF.KEY,DEF.VERSION,DEF.IS_MAIN, DEF.DESCRIPTION, DEF.TYPE_ID,DEF.TABLE_NAME, DEF.XGSJ\n" +
                "  FROM SYS_FORM_DEF DEF\n" +
                " WHERE DEF.SFYX_ST = '1' ");
        List<Object> args = new ArrayList<>();
        if (RxStringUtils.isNotEmpty(map.get("name"))) {
            sql.append(" AND DEF.NAME LIKE ? ");
            args.add("%" + map.get("name") + "%");
        }
        if (RxStringUtils.isNotEmpty(map.get("key"))) {
            sql.append(" AND DEF.KEY = ? ");
            args.add(map.get("key"));
        }
        sql.append(" order by def.xgsj desc,def.id desc");
        return super.getPaginationBySql(sql, args, map);
    }

    @Override
    public Long saveFormData(Long formId, String dataJson) {
        Long id;
        FormDef formDef = this.get(formId);
        String tableName = formDef.getTableName();
        Map<String, Object> dataMap = JacksonUtil.readValue(dataJson, Map.class);
        List<Object> args = new ArrayList<>();
        //可能是更新数据，可能是插入数据
        StringBuilder sql = new StringBuilder("");
        Long userId = (Long) HttpSessionHolder.get().getAttribute(Const.USER_ID);
        Date sysDate = getSysDate();
        if (RxStringUtils.isNotEmpty(dataMap.get("id"))) {
            id = Long.parseLong(dataMap.get("id").toString());
            //更新数据
            sql.append("update ").append(tableName).append(" set ");
            for (FormField field : formDef.getFields()) {
                Map fieldOptions = JacksonUtil.readValue(field.getFieldOptions(), Map.class);
                if (!"MDSYS.SDO_GEOMETRY".equals(fieldOptions.get("database_type")) && !"SHZT".equals(field.getCode()) && !"SFKJ_ST".equals(field.getCode())) {
                    sql.append(field.getCode()).append(" = ? ,");
                    //值可能需要转化，字符串转化为日期
                    args.add(parseValue(field, dataMap.get(field.getCode())));
                } else {
                    if ("SHZT".equals(field.getCode())) {
                        sql.append(field.getCode()).append(" = (CASE WHEN SHZT='4' THEN '4' WHEN BZZT='0' THEN '3' ELSE '0' END ),");
                    }
                    if ("SFKJ_ST".equals(field.getCode())) {
                        sql.append(field.getCode()).append(" = (CASE WHEN SHZT!='4' THEN '0' ELSE SFKJ_ST END ),");
                    }
                }
            }
            //"xgrId"
            sql.append("XGR_ID = ?,");
            args.add(userId);
            //"xgsj"
            sql.append("XGSJ = ?");
            args.add(sysDate);
            sql.append(" WHERE ID = ? ");
            args.add(id);
        } else {
            //查询出id
            String seqSql = "select seq_" + tableName + ".nextval as id from dual";
            id = Long.parseLong(super.getJdbcTemplate().queryForMap(seqSql).get("id").toString());
            StringBuilder valueSql = new StringBuilder(") values(?");
            args.add(id);
            //插入数据
            sql.append("insert into ").append(tableName).append("(id");
            //还要添加修改人修改时间等字段
            //因为json数据中会存有关于附件的操作数据，所以不能遍历JSON数据，或者排除这些数据
            for (FormField field : formDef.getFields()) {
                Map fieldOptions = JacksonUtil.readValue(field.getFieldOptions(), Map.class);
                //值可能需要转化，字符串转化为日期
                if (!"MDSYS.SDO_GEOMETRY".equals(fieldOptions.get("database_type"))) {
                    sql.append(",").append(field.getCode());
                    valueSql.append(",?");
                    Object o = parseValue(field, dataMap.get(field.getCode()));
                    if (o != null && RxStringUtils.isNotEmpty(o)) {
                        args.add(o);
                    } else {
                        if (fieldOptions.get("default_value") != null) {
                            args.add(fieldOptions.get("default_value"));
                        } else {
                            args.add(o);
                        }
                    }
                }
            }
            //"cjrId"
            sql.append(",CJR_ID");
            valueSql.append(",?");
            args.add(userId);
            // "cjsj"
            sql.append(",CJSJ");
            valueSql.append(",?");
            args.add(sysDate);
            //"xgrId"
            sql.append(",XGR_ID");
            valueSql.append(",?");
            args.add(userId);
            //"xgsj"
            sql.append(",XGSJ");
            valueSql.append(",?");
            args.add(sysDate);
            //是否有效
            sql.append(",sfyx_st");
            valueSql.append(",?");
            args.add(SfyxSt.VALID.id);

            valueSql.append(")");
            sql.append(valueSql);
        }
        this.getJdbcTemplate().update(sql.toString(), args.toArray());
        //处理附件
        Map fjMap = (Map) dataMap.get("fjUpdateIds");
        if (fjMap != null) {
            super.updateFiles(fjMap.get("addIds").toString(), fjMap.get("delIds").toString());
        }
        return id;
    }

    private String getCshShzt(Long rwId, Long formId) {
        String shzt = "3";
        List<Object> args = new ArrayList<>();
        args.add(rwId);
        args.add("0");
        args.add("1");
        args.add(formId);
        if (this.getJdbcTemplate().queryForList("SELECT  1 FROM T_ZYBZ_RWD  T WHERE T.ID=? AND T.SFSH_ST=? AND T.SFYX_ST=? AND T.FORM_ID=?", args).size() > 0) {
            shzt = "4";
        }
        return shzt;
    }

    private Object parseValue(FormField field, Object value) {
        String type = field.getFieldType();
        //日期
        if (WidgetType.DATEPICKER.getKey().equals(type)) {
            //获取日期格式
            Map options = JacksonUtil.readValue(field.getFieldOptions(), Map.class);
            SimpleDateFormat format = new SimpleDateFormat(options.get("datefmt").toString());
            try {
                if (value != null && !"".equals(value)) {
                   value = format.parse(value.toString());
                }
            } catch (ParseException e) { //ParseException
                throw new RuntimeException("日期转换错误", e);
            }
        }
        return value;
    }

    @Override
    public Map<String, Object> getFormData(Long formId, Long id) {
        //查询表单
        FormDef formDef = this.get(formId);
        String tableName = formDef.getTableName();
        StringBuilder sql = new StringBuilder("select id as \"id\" ");
        List<FormField> fields = formDef.getFields();
        for (FormField field : fields) {
            Map options = JacksonUtil.readValue(field.getFieldOptions(), Map.class);
            if (options.containsKey("add_hide_rights") && !"true".equals(options.get("add_hide_rights").toString())) {
                continue;
            }
            if (field.getSfyxSt() == SfyxSt.VALID && !"SHAPE".equals(field.getCode().toUpperCase())) {
                //选择器，需要关联查询
                if (WidgetType.SELECTOR.getKey().equals(field.getFieldType())) {
                    Map fieldOptions = JacksonUtil.readValue(field.getFieldOptions(), Map.class);
                    //获取选择器类型
                    //类型对应的sql
                    //todo 需要优化此段代码，不是在此判断
                    if ("user".equals(fieldOptions.get("selector_type"))) {
                        //用户
                        sql.append(",(SELECT WM_CONCAT(US.USER_NAME) FROM SYS_USER US WHERE INSTR(',' || ").append(field.getCode()).append(" || ',',',' || US.ID || ',')>0) as \"").append(field.getCode()).append("_name\"");
                    } else if ("org".equals(fieldOptions.get("selector_type"))) {
                        //机构
                        sql.append(",(SELECT WM_CONCAT(US.ORGAN_NAME) FROM SYS_ORGAN US WHERE INSTR(',' || ").append(field.getCode()).append(" || ',',',' || US.ID || ',')>0) as \"").append(field.getCode()).append("_name\"");
                    }
                }
                //fiexdTime:2019-1-17 by CR
              else  if(WidgetType.DATEPICKER.getKey().equals(field.getFieldType())){
                    Map fieldOptions = JacksonUtil.readValue(field.getFieldOptions(), Map.class);
                    sql.append(",TO_CHAR(").append(field.getCode().toUpperCase()).append(",'").append(fieldOptions.get("datefmt")).append("') AS ").append(field.getCode().toUpperCase());
                }
              else  {
                    //标准人 BZRXM fiexdTime:2019-1-22 by CR
                    if(field!=null&&("BZR_ID").equals(field.getCode())){
                        sql.append(",").append("(SELECT USER_NAME FROM sys_user WHERE ID =").append(field.getCode()).append( ")").append(" as \"").append("BZRXM").append("\"");
                    }
                    //标注单位
                    if(field!=null&&("BZDW").equals(field.getCode())){
                        sql.append(",").append("(SELECT ORGAN_NAME FROM SYS_organ WHERE ID =").append(field.getCode()).append( ")").append(" as \"").append("BZDWMC").append("\"");
                    }
                    else {
                        sql.append(",").append(field.getCode()).append(" as \"").append(field.getCode()).append("\"");
                    }
                }
            }
        }
        sql.append(" from ").append(tableName);
        sql.append(" where id = ?");
        Map<String, Object> map = null;
        map = this.getJdbcTemplate().queryForMap(sql.toString(), id);
        return map;
    }

    /**
     * todo 构建搜索区需要注意，一般日期会转化成开始-结束，选择器可能会转化为模糊匹配等等
     */
    @Override
    public FastPagination getFormDataList2(Map map) {
        //tableNames必须存在的
        if (RxStringUtils.isNotEmpty(map.get("tableName"))) {
            List<Object> params = new ArrayList<>();
            StringBuilder sql = new StringBuilder("select ID,SHZT,SHAPE SHOW_GEOMETRY ");
            //搜索区map
            Map<String, Object> searchMap = new HashMap<>();
            //todo 可以和工作流列表查询整合
            if (RxStringUtils.isNotEmpty(map.get("fields"))) {
                List<Map<String, Object>> fields = JacksonUtil.readValue(map.get("fields").toString(), List.class);
                for (int i = 0; i < fields.size(); i++) {
                    Map<String, Object> field = fields.get(i);
                    Map fieldOptions = (Map) field.get("fieldOptions");
                    if(WidgetType.DATEPICKER.getKey().equals(field.get("fieldType").toString())){
                     sql.append(",TO_CHAR(").append(field.get("code").toString().toUpperCase()).append(",'").append(fieldOptions.get("datefmt")).append("') AS ").append(field.get("code").toString().toUpperCase());

                    }
                    else if (WidgetType.SELECTOR.getKey().equals(field.get("fieldType").toString())) {
                        //todo 需要优化此段代码，不是在此判断
                        if ("user".equals(fieldOptions.get("selector_type"))) {
                            //用户
                            sql.append(",(SELECT WM_CONCAT(US.USER_NAME) FROM SYS_USER US WHERE INSTR(',' || ").append(field.get("code").toString().toUpperCase()).append(" || ',',',' || US.ID || ',')>0) as \"").append(field.get("code").toString().toUpperCase()).append("_NAME\"");
                        } else if ("org".equals(fieldOptions.get("selector_type"))) {
                           sql.append(",(SELECT WM_CONCAT(US.ORGAN_NAME) FROM SYS_ORGAN US WHERE INSTR(',' || ").append(field.get("code").toString().toUpperCase()).append(" || ',',',' || US.ID || ',')>0) as \"").append(field.get("code").toString().toUpperCase()).append("_NAME\"");
                        }
                    }
                    else {
                        sql.append(",").append(field.get("code").toString().toUpperCase());
                    }
                    if ("MC".equals(field.get("code").toString().toUpperCase()) || "BZZT".equals(field.get("code").toString().toUpperCase()) || "SHZT".equals(field.get("code").toString().toUpperCase())) {
                        searchMap.put(field.get("code").toString().toUpperCase(), getFieldSearchSql(field, map.get("tableName").toString()));
                    }
                }
            }
            sql.append(" from ").append(map.get("tableName"));
            sql.append(" where sfyx_st = '1' ");
            /**
             * fixedBy2019-2-1 修改权限
             * */
            ShiroUser user = ShiroKit.getUser();
            sql.append("AND ( cjr_id=? OR bzdw=? )");
            params.add(user.getId());
            params.add(user.getDftDeptId());
            //添加搜索区
            for (Map.Entry<String, Object> entry : searchMap.entrySet()) {
                if (RxStringUtils.isNotEmpty(map.get(entry.getKey())) && !"NOQUERY".equals(map.get(entry.getKey()))) {
                    sql.append("AND " + entry.getValue());
                    params.add(map.get(entry.getKey()));
                }
            }
            sql.append(" order by  XGSJ desc , BZZT desc  ");
            FastPagination fastPagination = super.getPaginationBySql(sql, params, map);
            MapUtil.handleGeometryToArcgis(fastPagination.getRows());
            return fastPagination;
        } else {
            return null;
        }
    }

    /**
     * todo 构建搜索区需要注意，一般日期会转化成开始-结束，选择器可能会转化为模糊匹配等等
     */
    @Override
    public FastPagination getFormShDataList(Map map) {
        //tableNames必须存在的
        if (RxStringUtils.isNotEmpty(map.get("tableName"))) {
            List<Object> params = new ArrayList<>();
            StringBuilder sql = new StringBuilder("select ID ");
            //搜索区map
            Map<String, Object> searchMap = new HashMap<>();
            //todo 可以和工作流列表查询整合
            if (RxStringUtils.isNotEmpty(map.get("fields"))) {
                List<Map<String, Object>> fields = JacksonUtil.readValue(map.get("fields").toString(), List.class);
                for (int i = 0; i < fields.size(); i++) {
                    Map<String, Object> field = fields.get(i);
                    Map fieldOptions = (Map) field.get("fieldOptions");
                    if (WidgetType.SELECTOR.getKey().equals(field.get("fieldType").toString())) {
                        //todo 需要优化此段代码，不是在此判断
                        if ("user".equals(fieldOptions.get("selector_type"))) {
                            //用户
                            sql.append(",(SELECT WM_CONCAT(US.USER_NAME) FROM SYS_USER US WHERE INSTR(',' || ").append(field.get("code").toString().toUpperCase()).append(" || ',',',' || US.ID || ',')>0) as \"").append(field.get("code").toString().toUpperCase()).append("_NAME\"");
                        } else if ("org".equals(fieldOptions.get("selector_type"))) {
                            sql.append(",(SELECT WM_CONCAT(US.ORGAN_NAME) FROM SYS_ORGAN US WHERE INSTR(',' || ").append(field.get("code").toString().toUpperCase()).append(" || ',',',' || US.ID || ',')>0) as \"").append(field.get("code").toString().toUpperCase()).append("_NAME\"");
                        }
                    } else {
                        sql.append(",").append(field.get("code").toString().toUpperCase());
                    }
                    if ("MC".equals(field.get("code").toString().toUpperCase()) || "BZZT".equals(field.get("code").toString().toUpperCase()) || "SHZT".equals(field.get("code").toString().toUpperCase())) {
                        searchMap.put(field.get("code").toString().toUpperCase(), getFieldSearchSql(field, map.get("tableName").toString()));
                    }
                }
            }
            sql.append(" from ").append(map.get("tableName"));
            sql.append(" where sfyx_st = '1' AND SHZT not in ('3','4') ");
            //添加搜索区
            for (Map.Entry<String, Object> entry : searchMap.entrySet()) {
                if (RxStringUtils.isNotEmpty(map.get(entry.getKey())) && !"NOQUERY".equals(map.get(entry.getKey()))) {
                    sql.append("AND " + entry.getValue());
                    params.add(map.get(entry.getKey()));
                }
            }
            sql.append(" order by SHZT, XGSJ desc ");
            return super.getPaginationBySql(sql, params, map);
        } else {
            return null;
        }
    }

    /**
     * todo 构建搜索区需要注意，一般日期会转化成开始-结束，选择器可能会转化为模糊匹配等等
     */
    @Override
    public FastPagination getFormCkDataList(Map map) {
        //tableNames必须存在的
        if (RxStringUtils.isNotEmpty(map.get("tableName"))) {
            List<Object> params = new ArrayList<>();
            StringBuilder sql = new StringBuilder("select ID,SHZT ");
            //搜索区map
            Map<String, Object> searchMap = new HashMap<>();
            //todo 可以和工作流列表查询整合
            if (RxStringUtils.isNotEmpty(map.get("fields"))) {
                List<Map<String, Object>> fields = JacksonUtil.readValue(map.get("fields").toString(), List.class);
                for (int i = 0; i < fields.size(); i++) {
                    Map<String, Object> field = fields.get(i);
                    Map fieldOptions = (Map) field.get("fieldOptions");
                    if (WidgetType.SELECTOR.getKey().equals(field.get("fieldType").toString())) {
                        //todo 需要优化此段代码，不是在此判断
                        if ("user".equals(fieldOptions.get("selector_type"))) {
                            //用户
                            sql.append(",(SELECT WM_CONCAT(US.USER_NAME) FROM SYS_USER US WHERE INSTR(',' || ").append(field.get("code").toString().toUpperCase()).append(" || ',',',' || US.ID || ',')>0) as \"").append(field.get("code").toString().toUpperCase()).append("_NAME\"");
                        } else if ("org".equals(fieldOptions.get("selector_type"))) {
                            sql.append(",(SELECT WM_CONCAT(US.ORGAN_NAME) FROM SYS_ORGAN US WHERE INSTR(',' || ").append(field.get("code").toString().toUpperCase()).append(" || ',',',' || US.ID || ',')>0) as \"").append(field.get("code").toString().toUpperCase()).append("_NAME\"");
                        }
                    } else {
                        sql.append(",").append(field.get("code").toString().toUpperCase());
                    }
                    if ("MC".equals(field.get("code").toString().toUpperCase()) || "BZZT".equals(field.get("code").toString().toUpperCase())) {
                        searchMap.put(field.get("code").toString().toUpperCase(), getFieldSearchSql(field, map.get("tableName").toString()));
                    }
                }
            }
            sql.append(" from ").append(map.get("tableName"));
            sql.append(" where sfyx_st = '1' AND SFKJ_ST='1' ");
            //添加搜索区
            for (Map.Entry<String, Object> entry : searchMap.entrySet()) {
                if (RxStringUtils.isNotEmpty(map.get(entry.getKey())) && !("" +
                        "").equals(map.get(entry.getKey()))) {
                    sql.append("AND " + entry.getValue());
                    params.add(map.get(entry.getKey()));
                }
            }
            sql.append(" order by BZZT, XGSJ desc ");
            return super.getPaginationBySql(sql, params, map);
        } else {
            return null;
        }
    }

    /**
     * todo 构建搜索区需要注意，一般日期会转化成开始-结束，选择器可能会转化为模糊匹配等等
     */
    @Override
    public FastPagination getFormDataList(Map map) {
        //tableNames必须存在的
        if (RxStringUtils.isNotEmpty(map.get("tableName"))) {
            List<Object> params = new ArrayList<>();
            StringBuilder sql = new StringBuilder("select ID");
            //搜索区map
            Map<String, Object> searchMap = new HashMap<>();
            //todo 可以和工作流列表查询整合
            if (RxStringUtils.isNotEmpty(map.get("fields"))) {
                List<Map<String, Object>> fields = JacksonUtil.readValue(map.get("fields").toString(), List.class);
                for (int i = 0; i < fields.size(); i++) {
                    Map<String, Object> field = fields.get(i);
                    Map fieldOptions = (Map) field.get("fieldOptions");
                    if (WidgetType.SELECTOR.getKey().equals(field.get("fieldType").toString())) {
                        //todo 需要优化此段代码，不是在此判断
                        if ("user".equals(fieldOptions.get("selector_type"))) {
                            //用户
                            sql.append(",(SELECT WM_CONCAT(US.USER_NAME) FROM SYS_USER US WHERE INSTR(',' || ").append(field.get("code").toString().toUpperCase()).append(" || ',',',' || US.ID || ',')>0) as \"").append(field.get("code").toString().toUpperCase()).append("_NAME\"");
                        } else if ("org".equals(fieldOptions.get("selector_type"))) {
                            sql.append(",(SELECT WM_CONCAT(US.ORGAN_NAME) FROM SYS_ORGAN US WHERE INSTR(',' || ").append(field.get("code").toString().toUpperCase()).append(" || ',',',' || US.ID || ',')>0) as \"").append(field.get("code").toString().toUpperCase()).append("_NAME\"");
                        }
                    } else {
                        sql.append(",").append(field.get("code").toString().toUpperCase());
                    }
                    if (RxStringUtils.isNotEmpty(fieldOptions.get("show_search"))) {
                        searchMap.put(field.get("code").toString().toUpperCase(), getFieldSearchSql(field, map.get("tableName").toString()));
                    }
                }
            }
            sql.append(" from ").append(map.get("tableName"));
            sql.append(" where sfyx_st = '1'");
            //添加搜索区
            for (Map.Entry<String, Object> entry : searchMap.entrySet()) {
                if (RxStringUtils.isNotEmpty(map.get(entry.getKey()))) {
                    sql.append("AND " + entry.getValue());
                    params.add(map.get(entry.getKey()));
                }
            }
            sql.append(" order by xgsj desc ");
            return super.getPaginationBySql(sql, params, map);
        } else {
            return null;
        }
    }

    @Override
    public void fbForm(FormDef formDef) {
        String tableName = formDef.getTableName();
        formDef.setIsMain("1");
        if (RxStringUtils.isNotEmpty(tableName)) {
            updateTable(formDef);
        } else {
            createTable(formDef);
        }
    }

    @Override
    public void delFormData(Long id, Long formId) {
        FormDef formDef = this.get(formId);
        String tableName = formDef.getTableName();
        String delSql = "UPDATE " + tableName + " SET SFYX_ST = '0' WHERE ID=?";
        this.getJdbcTemplate().update(delSql, id);
    }

    @Override
    public void deleteBatch(String ids, Long formId) {
        FormDef formDef = this.get(formId);
        Long useid = (Long) HttpSessionHolder.get().getAttribute(Const.USER_ID);
        List args = new ArrayList();
        String tableName = formDef.getTableName();
        StringBuffer sql = new StringBuffer("update " + tableName + " set sfyx_st = 0 ");
        if (null != useid) {
            sql.append(" ,XGR_ID = ? ");
            args.add(useid);
        }
        sql.append(" ,xgsj = sysdate ");
        sql.append(" where ").append(OracleUtils.getInSql("id", ids));
        executeSqlUpdate(sql, args.toArray());
    }

    @Override
    public void shBatchFormData(String ids, Long formId, String shzt) {
        FormDef formDef = this.get(formId);
        Long useid = (Long) HttpSessionHolder.get().getAttribute(Const.USER_ID);
        List args = new ArrayList();
        String tableName = formDef.getTableName();
        StringBuffer sql = new StringBuffer("update " + tableName + " set shzt = ?,SFKJ_ST=? ");
        args.add(shzt);
        args.add(("1".equals(shzt) ? "1" : "0"));
        if (null != useid) {
            sql.append(" ,XGR_ID = ? ");
            args.add(useid);
        }
        sql.append(" ,xgsj = sysdate ");
        sql.append(" where ").append(OracleUtils.getInSql("id", ids));
        sql.append(" and sfyx_st = '1' and shzt='0' ");
        executeSqlUpdate(sql, args.toArray());
    }

    @Override
    public List getLocationFormData(String cjlx, Long formId, Long rowId) {
        FormDef formDef = this.get(formId);
        //tableNames必须存在的
        if (RxStringUtils.isNotEmpty(formDef.getTableName())) {
            List<Object> params = new ArrayList<>();
            StringBuilder sql = new StringBuilder("select ID,SHZT,SHAPE SHOW_GEOMETRY ");
            //搜索区map
            Map<String, Object> searchMap = new HashMap<>();
            //todo 可以和工作流列表查询整合
            if (formDef.getFields().size() > 0) {
                for (int i = 0; i < formDef.getFields().size(); i++) {
                    FormField field = formDef.getFields().get(i);

                    Map<String, Object> fieldOptions = JacksonUtil.readValue(field.getFieldOptions().toString(), Map.class);
                    if (fieldOptions.get("show_map") != null && "true".equals(fieldOptions.get("show_map").toString())) {
                        //选择器
                        if (RxStringUtils.isNotEmpty(field.getFieldType()) && WidgetType.SELECTOR.getKey().equals(field.getFieldType())) {
                            //todo 需要优化此段代码，不是在此判断
                            if ("user".equals(fieldOptions.get("selector_type"))) {
                                //用户
                                //sql.append(",(SELECT WM_CONCAT(US.USER_NAME) FROM SYS_USER US WHERE INSTR(',' || ").append(field.getCode().toString().toUpperCase()).append(" || ',',',' || US.ID || ',')>0) as \"").append(field.getCode().toString().toUpperCase()).append("_NAME\"");
                                sql.append(",(SELECT WM_CONCAT(US.USER_NAME) FROM SYS_USER US WHERE INSTR(',' || ").append(field.getCode().toString().toUpperCase()).append(" || ',',',' || US.ID || ',')>0) AS ").append(field.getCode().toString().toUpperCase());
                            } else if ("org".equals(fieldOptions.get("selector_type"))) {
                                //sql.append(",(SELECT WM_CONCAT(US.ORGAN_NAME) FROM SYS_ORGAN US WHERE INSTR(',' || ").append(field.getCode().toString().toUpperCase()).append(" || ',',',' || US.ID || ',')>0) as \"").append(field.getCode().toString().toUpperCase()).append("_NAME\"");
                                sql.append(",(SELECT WM_CONCAT(US.ORGAN_NAME) FROM SYS_ORGAN US WHERE INSTR(',' || ").append(field.getCode().toString().toUpperCase()).append(" || ',',',' || US.ID || ',')>0) AS ").append(field.getCode().toString().toUpperCase());
                            }

                        } // 日期   (fiexdTime:2019-1-17 by CR)
                        else if(RxStringUtils.isNotEmpty(field.getFieldType()) && WidgetType.DATEPICKER.getKey().equals(field.getFieldType())) {
                            sql.append(",TO_CHAR(").append(field.getCode().toString().toUpperCase()).append(",'").append(fieldOptions.get("datefmt")).append("') AS ").append(field.getCode().toString().toUpperCase());
                        }//单选或者下拉
                        else  if((RxStringUtils.isNotEmpty(field.getFieldType())&&WidgetType.RADIO.getKey().equals(field.getFieldType()))||
                                (RxStringUtils.isNotEmpty(field.getFieldType())&&WidgetType.SELECT.getKey().equals(field.getFieldType())))
                        {
                            String filedOption=this.jdbcTemplate.queryForObject("SELECT FIELD_OPTIONS FROM SYS_FORM_FIELD WHERE FORM_ID =?  AND CODE=?",new Object[]{formId,field.getCode().toString().toUpperCase()},String.class);
                            String dictCode="";
                            String[] arr = filedOption.replace("\"", "").split(",");
                            for (int j = 0; j < arr.length; j++) {
                                if (arr[j].contains("dictCode")) {
                                    dictCode = arr[j].substring(arr[j].indexOf(":") + 1);
                                }
                            }
                            String sql2 = "SELECT CODE ,VALUE  FROM SYS_SUBDICT  WHERE  DICT_CODE=? AND  SFYX_ST=1";
                            List<Map<String, Object>> maps = jdbcTemplate.queryForList(sql2, new Object[]{dictCode});
                            sql.append(",DECODE(").append(field.getCode().toString().toUpperCase());
                            for (Map map : maps) {
                                sql.append(" , ").append("'"+map.get("CODE")+"'").append(" , ").append("'"+map.get("VALUE")+"'");
                            }
                            sql.append(")").append(field.getCode().toString().toUpperCase());
                        }//多选
                        else if(RxStringUtils.isNotEmpty(field.getFieldType()) && WidgetType.CHECKBOX.getKey().equals(field.getFieldType())){
                            String filedOption=this.jdbcTemplate.queryForObject("SELECT FIELD_OPTIONS FROM SYS_FORM_FIELD WHERE FORM_ID =?  AND CODE=?",new Object[]{formId,field.getCode().toString().toUpperCase()},String.class);
                            String dictCode="";
                            String[] arr = filedOption.replace("\"", "").split(",");
                            for (int j = 0; j < arr.length; j++) {
                                if (arr[j].contains("dictCode")) {
                                    dictCode = arr[j].substring(arr[j].indexOf(":") + 1);
                                }
                            }
                            sql.append(",(SELECT WM_CONCAT(B.VALUE) FROM  ").append("(SELECT * FROM SYS_SUBDICT WHERE DICT_CODE= '").append(dictCode).append("') B  WHERE  INSTR(','||").append(field.getCode().toString().toUpperCase()).append("||',',','||B.CODE||',')>0 ) AS ").append(field.getCode().toString().toUpperCase());
                        }
                        else {
                            sql.append(",").append(field.getCode().toString().toUpperCase());
                        }
                    }
                }
            }
            sql.append(" from ").append(formDef.getTableName());
            sql.append(" where sfyx_st = '1' AND BZZT='1' ");
            if(rowId!=null){
                sql.append(" AND ID!= ").append(rowId);
            }
            sql.append(" order by XGSJ desc ");
            return super.jdbcTemplate.queryForList(sql.toString());
        } else {
            return null;
        }
    }

    @Override
    public List getFormDataWz(Long formId, Long id) {
        FormDef formDef = this.get(formId);
        //tableNames必须存在的
        if (RxStringUtils.isNotEmpty(formDef.getTableName())) {
            StringBuilder sql = new StringBuilder("select ID,SHZT,SHAPE SHOW_GEOMETRY ");
            //todo 可以和工作流列表查询整合
            if (formDef.getFields().size() > 0) {
                for (int i = 0; i < formDef.getFields().size(); i++) {
                    FormField field = formDef.getFields().get(i);
                    Map<String, Object> fieldOptions = JacksonUtil.readValue(field.getFieldOptions().toString(), Map.class);
                    if (fieldOptions.get("show_map") != null && "true".equals(fieldOptions.get("show_map").toString())) {
                        //选择器
                      if (RxStringUtils.isNotEmpty(field.getFieldType()) && WidgetType.SELECTOR.getKey().equals(field.getFieldType())) {
                            //todo 需要优化此段代码，不是在此判断
                            if ("user".equals(fieldOptions.get("selector_type"))) {
                                //用户
                                //sql.append(",(SELECT WM_CONCAT(US.USER_NAME) FROM SYS_USER US WHERE INSTR(',' || ").append(field.getCode().toString().toUpperCase()).append(" || ',',',' || US.ID || ',')>0) as \"").append(field.getCode().toString().toUpperCase()).append("_NAME\"");
                                sql.append(",(SELECT WM_CONCAT(US.USER_NAME) FROM SYS_USER US WHERE INSTR(',' || ").append(field.getCode().toString().toUpperCase()).append(" || ',',',' || US.ID || ',')>0) AS ").append(field.getCode().toString().toUpperCase());
                            } else if ("org".equals(fieldOptions.get("selector_type"))) {
                                //sql.append(",(SELECT WM_CONCAT(US.ORGAN_NAME) FROM SYS_ORGAN US WHERE INSTR(',' || ").append(field.getCode().toString().toUpperCase()).append(" || ',',',' || US.ID || ',')>0) as \"").append(field.getCode().toString().toUpperCase()).append("_NAME\"");
                                sql.append(",(SELECT WM_CONCAT(US.ORGAN_NAME) FROM SYS_ORGAN US WHERE INSTR(',' || ").append(field.getCode().toString().toUpperCase()).append(" || ',',',' || US.ID || ',')>0) AS ").append(field.getCode().toString().toUpperCase());
                            }
                        } //日期
                       else if(RxStringUtils.isNotEmpty(field.getFieldType()) && WidgetType.DATEPICKER.getKey().equals(field.getFieldType())) {
                            sql.append(",TO_CHAR(").append(field.getCode().toString().toUpperCase()).append(",'").append(fieldOptions.get("datefmt")).append("') AS ").append(field.getCode().toString().toUpperCase());
                        }//单选或者下拉
                       else  if((RxStringUtils.isNotEmpty(field.getFieldType())&&WidgetType.RADIO.getKey().equals(field.getFieldType()))||
                                (RxStringUtils.isNotEmpty(field.getFieldType())&&WidgetType.SELECT.getKey().equals(field.getFieldType())))
                        {
                            String filedOption=this.jdbcTemplate.queryForObject("SELECT FIELD_OPTIONS FROM SYS_FORM_FIELD WHERE FORM_ID =?  AND CODE=?",new Object[]{formId,field.getCode().toString().toUpperCase()},String.class);
                            String dictCode="";
                            String[] arr = filedOption.replace("\"", "").split(",");
                            for (int j = 0; j < arr.length; j++) {
                                if (arr[j].contains("dictCode")) {
                                    dictCode = arr[j].substring(arr[j].indexOf(":") + 1);
                                }
                            }
                            String sql2 = "SELECT CODE ,VALUE  FROM SYS_SUBDICT  WHERE  DICT_CODE=? AND  SFYX_ST=1";
                            List<Map<String, Object>> maps = jdbcTemplate.queryForList(sql2, new Object[]{dictCode});
                            sql.append(",DECODE(").append(field.getCode().toString().toUpperCase());
                            for (Map map : maps) {
                                sql.append(" , ").append("'"+map.get("CODE")+"'").append(" , ").append("'"+map.get("VALUE")+"'");
                            }
                            sql.append(")").append(field.getCode().toString().toUpperCase());
                        }//多选
                      else if(RxStringUtils.isNotEmpty(field.getFieldType()) && WidgetType.CHECKBOX.getKey().equals(field.getFieldType())){
                          String filedOption=this.jdbcTemplate.queryForObject("SELECT FIELD_OPTIONS FROM SYS_FORM_FIELD WHERE FORM_ID =?  AND CODE=?",new Object[]{formId,field.getCode().toString().toUpperCase()},String.class);
                          String dictCode="";
                          String[] arr = filedOption.replace("\"", "").split(",");
                          for (int j = 0; j < arr.length; j++) {
                              if (arr[j].contains("dictCode")) {
                                  dictCode = arr[j].substring(arr[j].indexOf(":") + 1);
                              }
                          }
                     sql.append(",(SELECT WM_CONCAT(B.VALUE) FROM  ").append("(SELECT * FROM SYS_SUBDICT WHERE DICT_CODE= '").append(dictCode).append("') B  WHERE  INSTR(','||").append(field.getCode().toString().toUpperCase()).append("||',',','||B.CODE||',')>0 ) AS ").append(field.getCode().toString().toUpperCase());
                      }
                        else {
                            sql.append(",").append(field.getCode().toString().toUpperCase());
                        }
                    }
                }
            }
            sql.append(" from ").append(formDef.getTableName());
            sql.append(" where sfyx_st = '1' AND BZZT='1' AND ID=? ");
            sql.append(" order by XGSJ desc ");
            return super.jdbcTemplate.queryForList(sql.toString(), id);
        } else {
            return null;
        }
    }


    @Override
    public FastPagination getWfInsList(Map map) {
        //todo 可添加逻辑，如：未办理在前，自己的任务在前等
        List<Object> args = new ArrayList<>();
        StringBuilder sql = new StringBuilder("SELECT BW.STATUS,\n" +
                "       BW.TITLE,\n" +
                "       (SELECT WI.WORKFLOW_ID FROM SYS_WORKFLOW_INSTANCE WI WHERE WI.ID=BW.WORKFLOW_INSTANCE_ID) AS WF_ID,\n" +
                "       BW.WORKFLOW_INSTANCE_ID WF_INS_ID,\n" +
                "       BW.XGSJ,\n" +
                "       U.USER_NAME\n");
        //todo
//        if (RxStringUtils.isEmpty(map.get("flowCode"))) {
//            //没有时需要展示流程名称，因为没有是展示所有的流程实例数据
//        }
//        String tableNames = "";
//        String tableName = "";
        //搜索区map
//        Map<String, Object> searchMap = new HashMap<>();
//        if (RxStringUtils.isNotEmpty(map.get("options"))) {
//            Map<String, Object> options = JacksonUtil.readValue(map.get("options").toString(), Map.class);
//            for (Map.Entry<String, Object> entry : options.entrySet()) {
//                //拼接关联的表名
//                //todo 目前只会存在一张表，一个表单，存在多个会无法关联
////                tableNames += entry.getKey() + " " + entry.getKey();
//                tableName = entry.getKey();
//                List<Map<String, Object>> fields = (List) entry.getValue();
//                for (int i = 0; i < fields.size(); i++) {
//                    Map<String, Object> field = fields.get(i);
//                    Map fieldOptions = (Map) field.get("fieldOptions");
//                    if (WidgetType.SELECTOR.getKey().equals(field.get("fieldType").toString())) {
//                        //todo 需要优化此段代码，不是在此判断
//                        if ("user".equals(fieldOptions.get("selector_type"))) {
//                            //用户
//                            sql.append(",(SELECT US.USER_NAME FROM SYS_USER US WHERE US.ID = ").append(entry.getKey() + "." + field.get("code").toString().toUpperCase()).append(") as ").append(field.get("code").toString().toUpperCase()).append("_NAME ");
//                        } else {
//
//                        }
//                    } else {
//                        sql.append(",").append(entry.getKey() + "." + field.get("code").toString().toUpperCase());
//                    }
//                    if (RxStringUtils.isNotEmpty(fieldOptions.get("show_search"))) {
//                        searchMap.put(field.get("code").toString().toUpperCase(), getFieldSearchSql(field, entry.getKey()));
//                    }
//                }
//            }
//        }

        sql.append("  FROM SYS_USER U,SYS_GLB_BIZ_WF BW \n");
//        if (RxStringUtils.isNotEmpty(tableName)) {
//            sql.append(" LEFT JOIN ").append(tableName).append(" ").append(tableName).append(" ON ").append(tableName).append(".ID=BW.DATA_ID ");
//        }
        sql.append(" WHERE BW.USER_ID = U.ID ");
        if (RxStringUtils.isNotEmpty(map.get("flowCode"))) {
            sql.append("   AND BW.WORKFLOW_CODE = ? ");
            args.add(map.get("flowCode"));
        }
        if (RxStringUtils.isNotEmpty(map.get("title"))) {
            sql.append(" AND BW.TITLE LIKE ?");
            args.add("%" + map.get("title") + "%");
        }
        sql.append("   AND (U.SFYX_ST = '1' OR U.SFYX_ST = '3') \n" +
                "   AND BW.SFYX_ST = '1' ");
//        //添加搜索区
//        for (Map.Entry<String, Object> entry : searchMap.entrySet()) {
//            if (RxStringUtils.isNotEmpty(map.get(entry.getKey()))) {
//                sql.append("AND " + entry.getValue());
//                args.add(map.get(entry.getKey()));
//            }
//        }
        sql.append(" ORDER BY BW.XGSJ DESC ");
        return super.getPaginationBySql(sql, args, map);
    }

    @Override
    public FormDef getFormByCode(String formCode) {
        return this.getByHql("from FormDef f where f.sfyxSt = '1' and f.key=? ", formCode);
    }

    /**
     * 获取搜索条件sql
     *
     * @param field
     * @return
     */
    private String getFieldSearchSql(Map<String, Object> field, String key) {
        String sql;
        //或者是like
        String fieldType = field.get("fieldType").toString();
        if (WidgetType.TEXT.getKey().equals(fieldType) || WidgetType.NUMBER.getKey().equals(fieldType)) {
            sql = " instr(" + key + "." + field.get("code").toString().toUpperCase() + ",?) > 0 ";
        } else if (WidgetType.DATEPICKER.getKey().equals(fieldType)) {
            //fieldName).append(" >= TO_DATE(?,")
            //todo 日期做成时间段搜索
            sql = "";
        } else {
            sql = key + "." + field.get("code").toString().toUpperCase() + "= ? ";
        }
        return sql;
    }

    /**
     * 创建表
     *
     * @param formDef 表单对象
     */
    private void createTable(FormDef formDef) {
        ArrayList<String> commonSql = new ArrayList<>();
        //table前缀
//        String preTableName = formDef.getPreName();
        //需要加上后缀
        String tableName = formDef.getKey();
        //设置tableName
        formDef.setTableName(tableName);
        //设置版本号，初始为1
        formDef.setVersion(1);
        //Y标识是
        formDef.setIsMain("1");
        //创建sql
        StringBuilder sql = new StringBuilder();
        List<FormField> fields = formDef.getFields();
        sql.append("create table ").append(tableName).append("(");
        //创建主键
        sql.append("id INTEGER not null,");
        commonSql.add("COMMENT ON table  " + tableName + " IS '" + (formDef.getName() + (null == formDef.getDescription() ? "" : ("：" + formDef.getDescription()))) + "'");
        for (FormField field : fields) {
            if (field.getSfyxSt() == SfyxSt.VALID) {
                sql.append(field.getCode()).append(" ").append(getColumnType(field)).append(",");
                //设置column名称
                field.setColumnName(field.getCode());
                commonSql.add("COMMENT ON COLUMN " + tableName + "." + field.getCode() + " IS '" + field.getLabel() + "'");
            }
        }
        //创建内置字段
        sql.append("CJR_ID INTEGER,");
        sql.append("CJSJ DATE,");
        sql.append("XGR_ID INTEGER,");
        sql.append("XGSJ DATE,");
        sql.append("SFYX_ST CHAR(1),");
        //冗余一个版本号字段
        sql.append("F_VERSION INTEGER");
        sql.append(")");
        List<Object> params = new ArrayList<>();
        params.add(tableName);
        params.add(sql.toString());
        String sql2 = "INSERT INTO USER_SDO_GEOM_METADATA (TABLE_NAME, COLUMN_NAME, DIMINFO, SRID)  VALUES ('" + tableName + "', 'SHAPE', MDSYS.SDO_DIM_ARRAY(MDSYS.SDO_DIM_ELEMENT('X', -180, 180, 0.00000000050),MDSYS.SDO_DIM_ELEMENT('Y', -90, 90, 0.00000000050)),4326)";
        this.getJdbcTemplate().update(sql2);
        //建表
        this.prepareCallNoReturn("{call PKG_FORM_DEF.P_CREATE_FORMTABLE(?,?,?)}", params.toArray());
        //保存
        this.saveOrUpdate(formDef);
        for (String aCommonSql : commonSql) {
            this.getJdbcTemplate().update(aCommonSql);
        }

    }

    /**
     * 更新表
     *
     * @param formDef 表单对象
     */
    private void updateTable(FormDef formDef) {
        //注释sql
        ArrayList<String> commonSql = new ArrayList<>();
        String tableName = formDef.getTableName();
        //        //1、获取上个版本的数据，主要是获取新增的数据
//        //查找最大版本号数据id和版本号
//        String querySql = "SELECT F.ID,F.VERSION \n" +
//                "  FROM SYS_FORM_DEF F\n" +
//                " WHERE F.SFYX_ST = '1'\n" +
//                "   AND F.VERSION IS NOT NULL\n" +
//                "   AND F.KEY = ? \n" +
//                " ORDER BY F.VERSION DESC";
//        List<Map<String, Object>> list = this.getJdbcTemplate().queryForList(querySql, formDef.getKey());
//        if (list.size() > 0) {
//            Map<String, Object> map = list.get(0);
//            //2、比较变化量
//            Long preId = Long.parseLong(map.get("ID").toString());
//            int maxVersion = Integer.parseInt(map.get("VERSION").toString());
//            FormDef preForm = this.get(preId);
//            //判断表单名称是否变化
//            if (!preForm.getName().equals(formDef.getName())) {
//                commonSql.add("COMMENT ON table  " + tableName + " IS '" + formDef.getName() + "'");
//            }
//            //主要是找新增的数据
//            Boolean ifAdd = true;
//            StringBuilder addSql = new StringBuilder();
//            for (FormField newField : formDef.getFields()) {
//                if (SfyxSt.UNVALID != newField.getSfyxSt()) {
//                    for (FormField preField : preForm.getFields()) {
//                        if (SfyxSt.UNVALID != preField.getSfyxSt()) {
//                            if (newField.getCode().equals(preField.getCode())) {
//                                //可能修改，不是新增的
//                                ifAdd = false;
//                                //判断是否修改了数据库需要修改的字段
//                                if (!newField.getLabel().equals(preField.getLabel())) {
//                                    //显示名称修改了
//                                    commonSql.add("COMMENT ON COLUMN " + tableName + "." + newField.getCode() + " IS '" + newField.getLabel() + "'");
//                                }
//                                break;
//                            }
//                        }
//                    }
//                    //都不存在之前的数据中,为新增
//                    if (ifAdd) {
//                        //更新语句
//                        addSql.append(newField.getCode()).append(" ").append(getColumnType(newField)).append(",");
//                        newField.setColumnName(newField.getCode());
//                        commonSql.add("COMMENT ON COLUMN " + tableName + "." + newField.getCode() + " IS '" + newField.getLabel() + "'");
//                    } else {
//                        ifAdd = true;
//                    }
//                }
//            }
//            String addStr = addSql.toString();
//            if (!"".equals(addStr)) {
//                //存在更新语句
//                String updateSql = "alter table " + formDef.getTableName() + " add(" + addStr.substring(0, addStr.length() - 1) + ")";
//                //更新表
//                this.getJdbcTemplate().execute(updateSql);
//            }
//            //将原来的主版本去除
//            preForm.setIsMain("0");
//            this.saveOrUpdate(preForm);
//            //设置版本号
////            formDef.setVersion(maxVersion + 1);
//            //设为主版本
//            formDef.setIsMain("1");
//            this.saveOrUpdate(formDef);
//            for (String aCommonSql : commonSql) {
//                this.getJdbcTemplate().update(aCommonSql);
//            }
//        }
        StringBuilder addSql = new StringBuilder();
        //由数据来处理
        commonSql.add("COMMENT ON table  " + tableName + " IS '" + (formDef.getName() + (null == formDef.getDescription() ? "" : ("：" + formDef.getDescription()))) + "'");
        for (FormField field : formDef.getFields()) {
            //查找有效而且没有生成过数据库字段的数据
            if (SfyxSt.UNVALID != field.getSfyxSt()) {
                if (RxStringUtils.isEmpty(field.getColumnName())) {
                    addSql.append(field.getCode()).append(" ").append(getColumnType(field)).append(",");
                    //保存column字段
                    field.setColumnName(field.getCode());
                    commonSql.add("COMMENT ON COLUMN " + tableName + "." + field.getCode() + " IS '" + field.getLabel() + "'");
                } else {
                    //生成过数据库字段的数据，但字段不知道是否变化，所有直接修改备注
                    commonSql.add("COMMENT ON COLUMN " + tableName + "." + field.getColumnName() + " IS '" + field.getLabel() + "'");
                }
            }
        }
        String addStr = addSql.toString();
        if (!"".equals(addStr)) {
            //存在更新语句`
            String updateSql = "alter table " + formDef.getTableName() + " add(" + addStr.substring(0, addStr.length() - 1) + ")";
            //更新表
            this.getJdbcTemplate().execute(updateSql);
        }
        this.saveOrUpdate(formDef);
        //修改状态为发布状态
        for (String aCommonSql : commonSql) {
            this.getJdbcTemplate().update(aCommonSql);
        }
    }

    /**
     * 获取sql类型
     *
     * @param field 字段
     * @return String
     */
    private String getColumnType(FormField field) {
        /**
         *       filedType 分为
         *       text
         *       textarea
         *       number
         *       radio
         *       checkbox
         *       select
         *       datePicker
         *       attachment uuid
         *       selector 一般是id
         */
        //还得获取设置的max_length，没有采取默认，先统一100
        //普通字段默认是100，textarea默认是500，maxLength少于按默认值按默认值
        //定义各种类型的数据类型，以及数据库默认长度
        String fieldType = field.getFieldType();
        String str;
        Map<String, Object> fieldOptions = JacksonUtil.readValue(field.getFieldOptions(), Map.class);
        int maxLength;
        //读取设置的最大长度????有意义？？？
        if (null != fieldOptions && null != fieldOptions.get("max_length")) {
            maxLength = Integer.parseInt(fieldOptions.get("max_length").toString());
        } else {
            maxLength = 100;
        }
        int maxNum = 100;
        if ("textarea".equals(fieldType)) {
            maxNum = 500;
        }
        if (maxLength > maxNum) {
            maxLength = maxNum;
        }
        switch (fieldType) {
            case "datePicker":
                str = "DATE";
                break;
            case "selector":
                str = "VARCHAR2(100)";
                break;
            case "database":
                if (null != fieldOptions && null != fieldOptions.get("database_type")) {
                    str = fieldOptions.get("database_type").toString();
                } else {
                    str = "VARCHAR2(50)";
                }
                break;
            default:
                str = "VARCHAR2(" + maxLength + ")";

        }
        return str;
    }

}


