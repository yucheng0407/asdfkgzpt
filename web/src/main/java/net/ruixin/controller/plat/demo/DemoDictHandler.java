package net.ruixin.controller.plat.demo;


import net.ruixin.controller.BaseController;
import net.ruixin.domain.plat.demo.DemoDict;
import net.ruixin.service.plat.demo.IDemoDictService;
import net.ruixin.util.data.AjaxReturn;
import net.ruixin.util.resolver.FormModel;
import net.ruixin.util.resolver.SearchModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Map;

/**
 * Created by pitcher on 2017/5/18.
 */
@Controller
@RequestMapping("/demoDict")
public class DemoDictHandler extends BaseController {
    @Autowired
    private IDemoDictService demoDictService;

    @ResponseBody
    @RequestMapping(value = "/getDemoDictList")
    public AjaxReturn getDemoDict(@SearchModel Object map) {
        return new AjaxReturn().setSuccess(true).setData(demoDictService.getDemoDictList((Map) map));
    }

    @ResponseBody
    @RequestMapping(value = "/getDemoDictById")
    public AjaxReturn getDemoDictById(Long id) {
        return new AjaxReturn().setSuccess(true).setData(demoDictService.get(DemoDict.class, id));
    }

    @ResponseBody
    @RequestMapping(value = "/saveDemoDict")
    public AjaxReturn saveDemoDict(@FormModel DemoDict demoDict) {
        demoDictService.saveDemoDict(demoDict);
        return new AjaxReturn().setSuccess(true).setData(demoDict.getId());
    }

    @ResponseBody
    @RequestMapping("/deleteBatch")
    public AjaxReturn deleteBatch(String ids) {
        demoDictService.deleteBatch(ids);
        return new AjaxReturn().setSuccess(true);
    }
}
