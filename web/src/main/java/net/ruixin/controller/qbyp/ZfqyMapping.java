package net.ruixin.controller.qbyp;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 *重防区域 路径跳转
 */
@Controller
@RequestMapping("/qbyp")
public class ZfqyMapping {
    /**
     * 重防区域列表
     */
    @RequestMapping("/zfqyList")
    public String zfqyList() { return "asdfkgzpt/qbyp/zfqyList";}

    /**
     * 重防区域表单
     */
    @RequestMapping("/zfqyEdit")
    public String zfqyEdit() { return "asdfkgzpt/qbyp/zfqyEdit";}

    /**
     * 重防区域查看表单
     */
    @RequestMapping("/zfqyView")
    public String zfqyView() { return "asdfkgzpt/qbyp/zfqyView";}
}
