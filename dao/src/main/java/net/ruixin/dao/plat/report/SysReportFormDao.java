package net.ruixin.dao.plat.report;       

import net.ruixin.util.tools.RxStringUtils;
import org.springframework.stereotype.Repository;
import net.ruixin.util.paginate.FastPagination;
import java.util.Map;
import java.util.ArrayList;
import java.util.List;
import net.ruixin.util.hibernate.BaseDao;              
import net.ruixin.domain.plat.report.SysReportForm;  

/**
 * 报表 Dao实现
 *
 * @author rxCoder on 2018-8-21 14:03:06
 */
@Repository
public class SysReportFormDao extends BaseDao<SysReportForm> implements ISysReportFormDao {
    @Override
    public FastPagination getSysReportFormListPage(Map map) {
        StringBuilder sql = new StringBuilder();
        List<Object> params = new ArrayList<>();

        sql.append("SELECT T.ID,T.NAME,T.TYPE,T.XGSJ,M.NAME AS METADATA_NAME," +
                "'/report/reportFormPreview?id='||T.ID AS URL " +
                "FROM SYS_REPORT_FORM T " +
                "LEFT JOIN SYS_METADATA M ON M.ID = T.METADATA_ID " +
                "WHERE T.SFYX_ST='1' ");

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
        return super.getPaginationBySql(sql, params,map);
    }

}