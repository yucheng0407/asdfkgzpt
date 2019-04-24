package net.ruixin.controller.plat.report;

import net.ruixin.controller.BaseController;
import net.ruixin.service.plat.report.IReportService;
import net.ruixin.util.cache.Cache;
import net.ruixin.util.cache.CacheKit;
import net.ruixin.util.data.AjaxReturn;
import net.ruixin.util.paginate.FastPagination;
import net.ruixin.util.resolver.SearchModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Map;

/**
 * 资源mapping
 */
@Controller
@RequestMapping("/report")
@SuppressWarnings("all")
public class ReportController extends BaseController{

    @Autowired
    private IReportService reportService;

    @ResponseBody
    @RequestMapping(value = "/getReportFormData")
    public AjaxReturn getReportFormData() {
        return success().setData(reportService.getReportFormData());
    }

    //报表查看
    @RequestMapping(value = "/reportFormView")
    public String reportFormView() {
        return "plat/report/reportFormView";
    }

    //报表编辑
    @RequestMapping(value = "/reportFormEdit")
    public String reportFormEdit() {
        return "plat/report/reportFormEdit";
    }

    @ResponseBody
    @RequestMapping(value = "/getFormPreviewData")
    public AjaxReturn getFormPreviewData(String json) {
        return success().setData(reportService.getFormPreviewData(json));
    }

    @ResponseBody
    @RequestMapping(value = "/getFormPreviewDataById")
    public AjaxReturn getFormPreviewDataById(Long id) {
        return success().setData(reportService.getFormPreviewData(id));
    }
}
