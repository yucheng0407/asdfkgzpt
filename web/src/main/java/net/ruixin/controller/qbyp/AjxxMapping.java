package net.ruixin.controller.qbyp;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 *案件信息 路径跳转
 */
@Controller
@RequestMapping("/qbyp")
public class AjxxMapping {
    /**
     * 案件信息列表
     */
    @RequestMapping("/ajxxList")
    public String ajxxList() { return "asdfkgzpt/qbyp/ajxxList";}

    /**
     * 案件信息表单
     */
    @RequestMapping("/ajxxEdit")
    public String ajxxEdit() { return "asdfkgzpt/qbyp/ajxxEdit";}

    /**
     * 案件信息查看表单
     */
    @RequestMapping("/ajxxView")
    public String ajxxView() { return "asdfkgzpt/qbyp/ajxxView";}
}
