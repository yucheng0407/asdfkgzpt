
package net.ruixin.service.plat.report;

import net.ruixin.service.plat.common.IBaseService;
import net.ruixin.util.paginate.FastPagination;
import java.util.Map;
import net.ruixin.domain.plat.report.SysReportForm;
/**
 * 报表 Service接口
 *
 * @author rxCoder on 2018-8-21 14:03:06
 */
public interface ISysReportFormService extends IBaseService {

    /**
     * 获取SysReportForm分页列表
     *
     * @param map 查询条件
     * @return 分页信息
     */
    FastPagination getSysReportFormListPage(Map map);
    /**
     * 保存报表
     *
     * @param sysReportForm 报表
     */
    void saveSysReportForm(SysReportForm sysReportForm);
    /**
      * SysReportForm级联删除
      *
      * @param id 实体对象主键
      */
    void deleteCascade(Long id) throws NoSuchFieldException, IllegalAccessException;

    SysReportForm getReportForm(Long id);
}