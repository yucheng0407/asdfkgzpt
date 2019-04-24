
package net.ruixin.dao.plat.report;
import java.util.Map;
import net.ruixin.util.paginate.FastPagination;
import net.ruixin.util.hibernate.IBaseDao;
import net.ruixin.domain.plat.report.SysReportForm;

/**
 * 报表Dao接口
 *
 * @author rxCoder on 2018-8-21 14:03:06
 */
public interface ISysReportFormDao extends IBaseDao<SysReportForm> {

    /**
     * 查询报表分页列表
     *
     * @param map 查询条件
     * @return 模块分页信息
     */
    FastPagination getSysReportFormListPage(Map map);
}
