package net.ruixin.dao.plat.config;

import net.ruixin.domain.constant.Const;
import net.ruixin.domain.plat.config.SysConfig;
import net.ruixin.util.hibernate.BaseDao;
import net.ruixin.util.paginate.FastPagination;
import net.ruixin.util.tools.RxStringUtils;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Repository
public class ConfigDao extends BaseDao<SysConfig> implements IConfigDao {

    @Override
    public void saveConfig(SysConfig config) {
        super.saveOrUpdate(config);
    }

    @Override
    public SysConfig getConfigById(Long id) {
        return super.get(id);
    }

    @Override
    public void delConfig(Long id) {
        super.delete(id);
    }

    @Override
    public FastPagination getConfigList(Map map) {
        StringBuilder sql = new StringBuilder("SELECT C.ID, C.NAME, C.CODE, C.VALUE, C.LEVELS, C.XGSJ, C.APP_ID\n");
        if (Boolean.valueOf(map.get("hasAll").toString())) {
            sql.append(", 1 HAS_ALL");
        }
        sql.append(" FROM SYS_CONFIG C WHERE C.SFYX_ST='1' ");
        List<Object> args = new ArrayList<>();
        if (Boolean.valueOf(map.get("hasAll").toString())) {
            if (RxStringUtils.isNotEmpty(map.get("appIds"))) {
                sql.append(" AND (C.APP_ID IS NULL OR C.APP_ID IN(").append(map.get("appIds").toString()).append(")) ");
            } else {
                sql.append(" AND C.APP_ID IS NULL ");
            }
        }
        if (RxStringUtils.isNotEmpty(map.get("name"))) {
            sql.append(" AND C.NAME LIKE ? ");
            args.add("%" + map.get("name") + "%");
        }
        if (RxStringUtils.isNotEmpty(map.get("code"))) {
            sql.append(" AND C.CODE LIKE ? ");
            args.add("%" + map.get("code") + "%");
        }
        if (RxStringUtils.isNotEmpty(map.get("levels"))) {
            sql.append(" AND C.LEVELS = ? ");
            args.add(map.get("levels"));
        }
        sql.append(" ORDER BY C.XGSJ DESC");
        return super.getPaginationBySql(sql, args, map);
    }

    @Override
    public List<Map<String, Object>> getConfigListByAppType(String appIds, Boolean hasAll) {
        List<String> args = new ArrayList<>();
        StringBuilder sql = new StringBuilder("SELECT C.ID, C.NAME, C.CODE, C.VALUE, " +
                " C.LEVELS, C.APP_ID, R.NAME AS APP_NAME, \n" +
                " (SELECT D.VALUE FROM SYS_SUBDICT D WHERE D.DICT_CODE = 'CONFIGTYPE' AND D.CODE = C.BIZ_TYPE ) TYPE_NAME " +
                "  FROM SYS_CONFIG C " +
                " LEFT JOIN SYS_RESOURCE R ON R.ID = C.APP_ID AND R.SFYX_ST='1' WHERE C.SFYX_ST='1' ");
        if (!hasAll) {
            if (RxStringUtils.isNotEmpty(appIds)) {
                sql.append(" AND (C.APP_ID IS NULL OR INSTR(','||?||',', ','||C.APP_ID||',')>0) ");
                args.add(appIds);
            } else {
                sql.append(" AND C.APP_ID IS NULL ");
            }
        }
        sql.append(" AND C.LEVELS IS NOT NULL AND C.BIZ_TYPE IS NOT NULL " +
                " ORDER BY C.APP_ID NULLS FIRST, C.BIZ_TYPE, C.XGSJ DESC");
        return getJdbcTemplate().queryForList(sql.toString(), args.toArray());
    }

    @Override
    public void deleteAllResourceConfig() {
        String sql = "DELETE FROM SYS_CONFIG C WHERE (INSTR(C.CODE, 'res_') > -0 OR C.CODE = 'resType') AND C.BIZ_TYPE = 2 AND LEVELS = 1";
        super.getJdbcTemplate().update(sql);
    }

    @Override
    public void defaultResourceConfig() {
        super.prepareCallNoReturn("{call PKG_BASEPLAT.P_DEFAULT_RESOURCE_CONFIG(?)}");
    }

    @Override
    public List<Map<String, Object>> getAllValidConfig() {
//        List<String> args = new ArrayList<>();
        String configSql = "SELECT C.CODE KEY, C.VALUE ,C.BIZ_TYPE AS TYPE FROM SYS_CONFIG C " +
                "LEFT JOIN SYS_RESOURCE R ON R.ID = C.APP_ID AND INSTR('" + Const.APP_CODE + "',R.CODE) > 0 " +
                "WHERE C.SFYX_ST = '1' ORDER BY C.BIZ_TYPE ASC, C.APP_ID NULLS FIRST";
        return getJdbcTemplate().queryForList(configSql);
    }

    @Override
    public void delConfigByResourceId(Long id, Long xgrId) {
        String sql = "UPDATE SYS_CONFIG " +
                "SET SFYX_ST = '0'," +
                "XGSJ = sysdate," +
                "XGR_ID = ? " +
                "WHERE APP_ID = ? ";
        super.getJdbcTemplate().update(sql, xgrId, id);
    }
}
