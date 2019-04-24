package net.ruixin.controller.wgff;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 *网格员信息 路径跳转
 */
@Controller
@RequestMapping("/wgff")
public class WgyMapping {
    /**
     * 网格员信息列表
     */
    @RequestMapping("/wgyList")
    public String wgyList() { return "asdfkgzpt/wgff/wgyList";}

    /**
     * 网格员信息表单
     */
    @RequestMapping("/wgyEdit")
    public String wgyEdit() { return "asdfkgzpt/wgff/wgyEdit";}

    /**
     * 网格员信息查看表单
     */
    @RequestMapping("/wgyView")
    public String wgyView() { return "asdfkgzpt/wgff/wgyView";}
}
