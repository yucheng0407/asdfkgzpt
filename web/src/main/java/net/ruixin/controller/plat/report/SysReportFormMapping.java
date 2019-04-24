package net.ruixin.controller.plat.report;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 *报表 路径跳转
 */
@Controller
@RequestMapping("/report")
public class SysReportFormMapping {
    /**
     * 报表列表
     */
    @RequestMapping("/sysReportFormList")
    public String sysReportFormList() { return "plat/report/sysReportFormList";}

    /**
     * 报表表单
     */
    @RequestMapping("/sysReportFormEdit")
    public String sysReportFormEdit() { return "plat/report/sysReportFormEdit";}

    /**
     * 报表查看表单
     */
    @RequestMapping("/sysReportFormView")
    public String sysReportFormView() { return "plat/report/sysReportFormView";}

    /**
     * 报表查看表单
     */
    @RequestMapping("/sysReportPropertyEdit")
    public String sysReportPropertyEdit() { return "plat/report/sysReportPropertyEdit";}

    //报表预览
    @RequestMapping(value = "/reportFormPreview")
    public String reportFormPreview() {
        return "plat/report/reportFormPreview";
    }
}
