package net.ruixin.dao.plat.report;

import net.ruixin.util.paginate.FastPagination;

import java.util.List;
import java.util.Map;

/**
 * @author Zxh
 */
public interface IReportDao {

    List<Map<String,Object>> getReportFormData();

    List<Map<String,Object>> getFormData(String sql, List params);
}
