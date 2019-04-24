package net.ruixin.service.plat.report;

import net.ruixin.domain.plat.report.SysReportForm;
import net.ruixin.service.plat.common.IBaseService;
import net.ruixin.util.paginate.FastPagination;

import java.util.List;
import java.util.Map;

/**
 * @author Zxh
 */
public interface IReportService extends IBaseService {

    List<Map<String,Object>> getReportFormData();

    Map<String,Object> getFormPreviewData(String json);

    Map<String,Object> getFormPreviewData(Long id);

    Map<String,Object> getFormData(SysReportForm form);
}
