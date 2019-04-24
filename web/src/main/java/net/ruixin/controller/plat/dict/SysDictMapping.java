package net.ruixin.controller.plat.dict;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 系统字典表（主表） 路径跳转
 */
@Controller
@RequestMapping("/dict")
public class SysDictMapping {
    /**
     * 系统字典表（主表）列表
     */
    @RequestMapping("/sysDictList")
    public String sysDictList() {
        return "plat/dict/sysDictList";
    }

    /**
     * 系统字典表（主表）表单
     */
    @RequestMapping("/sysDictEdit")
    public String sysDictEdit() {
        return "plat/dict/sysDictEdit";
    }

    /**
     * 系统字典表新增表单
     */
    @RequestMapping("/sysDictAdd")
    public String sysDictAdd() {
        return "plat/dict/sysDictAdd";
    }

    /**
     * 系统字典表（主表）查看表单
     */
    @RequestMapping("/sysDictView")
    public String sysDictView() {
        return "plat/dict/sysDictView";
    }

    /**
     * 系统字典表（子表）
     */
    @RequestMapping("/sysSubdictEdit")
    public String sysSubdictEdit() {
        return "plat/dict/sysSubdictEdit";
    }


    /**
     * 系统字典选择
     */
    @RequestMapping("/sysDictSelect")
    public String sysDictSelect() {
        return "plat/dict/sysDictSelect";
    }
}
