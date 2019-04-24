package net.ruixin.controller.qbyp;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 *重防区域-重防时间 路径跳转
 */
@Controller
@RequestMapping("/qbyp")
public class ZfsjMapping {
    /**
     * 重防区域-重防时间列表
     */
    @RequestMapping("/zfsjList")
    public String zfsjList() { return "asdfkgzpt/qbyp/zfsjList";}

    /**
     * 重防区域-重防时间表单
     */
    @RequestMapping("/zfsjEdit")
    public String zfsjEdit() { return "asdfkgzpt/qbyp/zfsjEdit";}

    /**
     * 重防区域-重防时间查看表单
     */
    @RequestMapping("/zfsjView")
    public String zfsjView() { return "asdfkgzpt/qbyp/zfsjView";}
}
