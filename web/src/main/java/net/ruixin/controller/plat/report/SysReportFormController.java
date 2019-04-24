package net.ruixin.controller.plat.report;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.stereotype.Controller;
import net.ruixin.controller.BaseController;
import net.ruixin.util.data.AjaxReturn;
import net.ruixin.util.resolver.FormModel;
import net.ruixin.util.resolver.SearchModel;
import java.util.Map;
import net.ruixin.domain.plat.report.SysReportForm;                           
import net.ruixin.service.plat.report.ISysReportFormService;   

/**
 * 报表 Controller实现
 *
 * @author RXCoder on 2018-8-21 14:03:06
 */
@Controller
@RequestMapping("/report")
public class SysReportFormController extends BaseController {

    @Autowired
    private ISysReportFormService sysReportFormService;

    /**
     * 获取SysReportForm分页列表
     *
     * @param map 查询条件
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping("/getSysReportFormListPage")
    public AjaxReturn getSysReportFormListPage(@SearchModel Object map) {
        return success().setData(sysReportFormService.getSysReportFormListPage((Map) map));
    }
    /**
     * 保存报表
     *
     * @param sysReportForm 报表
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping("/saveSysReportForm")
    public AjaxReturn saveSysReportForm(@FormModel SysReportForm sysReportForm) {
    sysReportFormService.saveSysReportForm(sysReportForm);
        return success().setData(sysReportForm.getId());
    }
    /**
     * 通过id获取报表
     *
     * @param id sysReportFormId
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping("/getSysReportFormById")
    public AjaxReturn getSysReportFormById(Long id) {
        return success().setData(sysReportFormService.getReportForm(id));
    }
    /**
     * 删除报表
     *
     * @param id SysReportFormId
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping("/delSysReportForm")
    public AjaxReturn delSysReportForm(Long id) {
    sysReportFormService.delete(SysReportForm.class,id);
        return  success();
    }
    /**
     * 通过id级联删除报表
     *
     * @param id  SysReportFormId
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping("/deleteCascade")
    public AjaxReturn deleteCascade(Long id) throws NoSuchFieldException, IllegalAccessException {
    sysReportFormService.deleteCascade(id);
         return success();
    }

}
