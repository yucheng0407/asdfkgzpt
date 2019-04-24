package net.ruixin.controller.qbyp;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 *情报会商 路径跳转
 */
@Controller
@RequestMapping("/qbyp")
public class HsxxMapping {
    /**
     * 情报会商列表
     */
    @RequestMapping("/hsxxList")
    public String hsxxList() { return "asdfkgzpt/qbyp/hsxxList";}

    /**
     * 情报会商表单
     */
    @RequestMapping("/hsxxEdit")
    public String hsxxEdit() { return "asdfkgzpt/qbyp/hsxxEdit";}

    /**
     * 情报会商查看表单
     */
    @RequestMapping("/hsxxView")
    public String hsxxView() { return "asdfkgzpt/qbyp/hsxxView";}
}
