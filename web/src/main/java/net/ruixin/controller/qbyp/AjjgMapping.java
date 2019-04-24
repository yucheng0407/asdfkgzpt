package net.ruixin.controller.qbyp;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 *案件加工 路径跳转
 */
@Controller
@RequestMapping("/qbyp")
public class AjjgMapping {
    /**
     * 案件加工列表
     */
    @RequestMapping("/ajjgList")
    public String ajjgList() { return "asdfkgzpt/qbyp/ajjgList";}

    /**
     * 案件加工表单
     */
    @RequestMapping("/ajjgEdit")
    public String ajjgEdit() { return "asdfkgzpt/qbyp/ajjgEdit";}

    /**
     * 案件加工查看表单
     */
    @RequestMapping("/ajjgView")
    public String ajjgView() { return "asdfkgzpt/qbyp/ajjgView";}
}
