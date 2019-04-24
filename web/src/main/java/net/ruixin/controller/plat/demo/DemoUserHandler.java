package net.ruixin.controller.plat.demo;


import net.ruixin.controller.BaseController;
import net.ruixin.domain.plat.demo.DemoUser;
import net.ruixin.service.plat.demo.IDemoUserService;
import net.ruixin.util.data.AjaxReturn;
import net.ruixin.util.resolver.FormModel;
import net.ruixin.util.resolver.SearchModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Map;

/**
 *
 * @author pitcher
 * @date 2017/5/18
 */
@Controller
@RequestMapping("/demoUser")
public class DemoUserHandler extends BaseController {
    @Autowired
    private IDemoUserService demoUserService;

    @ResponseBody
    @RequestMapping(value = "/getDemoUserList")
    public AjaxReturn getDemoUser(@SearchModel Object map) {
        return new AjaxReturn().setSuccess(true).setData(demoUserService.getDemoUserList((Map) map));
    }

    @ResponseBody
    @RequestMapping(value = "/getDemoUserById")
    public AjaxReturn getDemoUserById(Long id) {
        return new AjaxReturn().setSuccess(true).setData(demoUserService.get(DemoUser.class, id));
    }

    @ResponseBody
    @RequestMapping(value = "/saveDemoUser")
    public AjaxReturn saveDemoUser(@FormModel DemoUser demoUser) {
        demoUserService.saveDemoUser(demoUser);
        return new AjaxReturn().setSuccess(true).setData(demoUser.getId());
    }

    @ResponseBody
    @RequestMapping("/deleteBatch")
    public AjaxReturn deleteBatch(String ids) {
        demoUserService.deleteBatch(ids);
        return new AjaxReturn().setSuccess(true);
    }
}
