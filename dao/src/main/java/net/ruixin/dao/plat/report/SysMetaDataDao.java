package net.ruixin.dao.plat.report;

import org.springframework.stereotype.Repository;
import net.ruixin.util.paginate.FastPagination;

import java.util.Map;
import java.util.ArrayList;
import java.util.List;

import net.ruixin.util.tools.RxStringUtils;
import net.ruixin.util.hibernate.BaseDao;
import net.ruixin.domain.plat.report.SysMetaData;

/**
 * 元数据 Dao实现
 *
 * @author rxCoder on 2018-8-20 9:16:01
 */
@Repository
public class SysMetaDataDao extends BaseDao<SysMetaData> implements ISysMetaDataDao {
    @Override
    public FastPagination getSysMetaDataListPage(Map map) {
        StringBuilder sql = new StringBuilder();
        List<Object> params = new ArrayList<>();

        sql.append("SELECT T.ID,T.NAME,T.CODE,T.TYPE,T.DETAIL FROM SYS_METADATA T WHERE T.SFYX_ST='1' ");


        if (RxStringUtils.isNotEmpty(map.get("name"))) {
            sql.append(" AND T.NAME LIKE ? ");
            params.add("%" + map.get("name") + "%");
        }
        if (RxStringUtils.isNotEmpty(map.get("code"))) {
            sql.append(" AND T.CODE LIKE ? ");
            params.add("%" + map.get("code") + "%");
        }
        if (RxStringUtils.isNotEmpty(map.get("type"))) {
            sql.append(" AND T.TYPE = ? ");
            params.add(map.get("type"));
        }
        sql.append("ORDER BY T.XGSJ DESC");
        return super.getPaginationBySql(sql, params, map);
    }


    @Override
    public FastPagination getSysMetaDataDetailListPage(Map map) {
        StringBuilder sql = new StringBuilder();
        List<Object> params = new ArrayList<>();
        if ("2".equals(map.get("type"))) {
            //查找视图名
            sql.append("SELECT UT.VIEW_NAME TABLE_NAME\n" +
                    "  FROM USER_VIEWS UT WHERE 1=1");
            if (RxStringUtils.isNotEmpty(map.get("tableName"))) {
                sql.append(" AND UT.VIEW_NAME LIKE ? ");
                params.add("%" + map.get("tableName") + "%");
            }
        } else {
            //查找表名与注释，用户表优先（“T_”打头）
            sql.append("SELECT UT.TABLE_NAME, UTC.COMMENTS\n" +
                    "  FROM USER_TABLES UT, USER_TAB_COMMENTS UTC\n" +
                    " WHERE UT.TABLE_NAME = UTC.TABLE_NAME\n" +
                    "   AND UT.TABLESPACE_NAME IS NOT NULL\n");

            if (RxStringUtils.isNotEmpty(map.get("tableName"))) {
                sql.append(" AND UT.TABLE_NAME LIKE ? ");
                params.add("%" + map.get("tableName") + "%");
            }
            if (RxStringUtils.isNotEmpty(map.get("comment"))) {
                sql.append(" AND UTC.COMMENTS LIKE ? ");
                params.add("%" + map.get("comment") + "%");
            }
            sql.append(" ORDER BY (CASE\n" +
                    "            WHEN INSTR(UT.TABLE_NAME, 'T_') = 1 THEN\n" +
                    "             1\n" +
                    "            ELSE\n" +
                    "             0\n" +
                    "          END) DESC");
        }
        return super.getPaginationBySql(sql, params, map);
    }

    @Override
    public FastPagination getSysMetaDataShowListPage(String tableName, Map map) {
        String sql = "SELECT * FROM " + tableName;
        return super.getPaginationBySql(sql, new ArrayList<>(), map);
    }

    @Override
    public List getSysMetaDataColumnList(String tableName) {
        String sql = " SELECT COL.COLUMN_NAME, COL.DATA_TYPE, UCC.COMMENTS\n" +
                "   FROM USER_TAB_COLUMNS COL, USER_COL_COMMENTS UCC\n" +
                "  WHERE UCC.TABLE_NAME = COL.TABLE_NAME\n" +
                "    AND UCC.COLUMN_NAME = COL.COLUMN_NAME\n" +
                "    AND COL.TABLE_NAME = ?\n";
        return getJdbcTemplate().queryForList(sql, tableName);
    }

    @Override
    public String getViewText(String tableName) {
        String sql = " SELECT UT.TEXT TABLE_NAME\n" +
                "                   FROM USER_VIEWS UT WHERE UT.VIEW_NAME = ?";
        String result = "";
        try {
            result = getJdbcTemplate().queryForObject(sql, String.class, tableName);
        } catch (Exception e) {
            result = "";
        }
        return result;
    }

    @Override
    public String createView(String text) {
        String result = "";
        try {
            getJdbcTemplate().execute(text);
        } catch (Exception e) {
            result = e.getCause().getMessage();
        }
        return result;
    }

    @Override
    public String getCommentOfColumn(String column) {
        String sql = " SELECT T.COMMENTS\n" +
                "  FROM SYS.USER_COL_COMMENTS T\n" +
                " WHERE T.COLUMN_NAME = ?\n" +
                "   AND T.COMMENTS IS NOT NULL\n" +
                "   AND ROWNUM < 2\n";
        List<Map<String, Object>> result = getJdbcTemplate().queryForList(sql, column);
        if (result.size() == 1) {
            return result.get(0).get("COMMENTS").toString();
        } else {
            return "";
        }
    }
}