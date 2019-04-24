package net.ruixin.controller.qbyp;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 *巡区表 路径跳转
 */
@Controller
@RequestMapping("/qbyp")
public class XqbMapping {
    /**
     * 巡区表列表
     */
    @RequestMapping("/xqbList")
    public String xqbList() { return "asdfkgzpt/qbyp/xqbList";}

    /**
     * 巡区表表单
     */
    @RequestMapping("/xqbEdit")
    public String xqbEdit() { return "asdfkgzpt/qbyp/xqbEdit";}

    /**
     * 巡区表查看表单
     */
    @RequestMapping("/xqbView")
    public String xqbView() { return "asdfkgzpt/qbyp/xqbView";}
}
