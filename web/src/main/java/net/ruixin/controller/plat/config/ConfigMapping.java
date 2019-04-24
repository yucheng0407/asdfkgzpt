package net.ruixin.controller.plat.config;

import net.ruixin.util.shiro.ShiroKit;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 配置mapping
 */
@Controller
@RequestMapping("/config")
public class ConfigMapping {
    //配置列表
    @RequestMapping(value = "/configList")
    public String configList() {
        return "plat/config/configList";
    }

    //配置新增
    @RequestMapping(value = "/configAdd")
    public String configAdd(Model model) {
        model.addAttribute("roleLevel", ShiroKit.getRoleLevel());
        return "plat/config/configEdit";
    }

    //配置编辑
    @RequestMapping(value = "/configEdit")
    public String configEdit(Model model) {
        model.addAttribute("roleLevel", ShiroKit.getRoleLevel());
        return "plat/config/configEdit";
    }

    //配置查看
    @RequestMapping(value = "/configView")
    public String configView() {
        return "plat/config/configView";
    }

    //按类型展示的配置列表
    @RequestMapping(value = "/configTypeShow")
    public String configTypeShow() {
        return "plat/config/configTypeShow";
    }

}
