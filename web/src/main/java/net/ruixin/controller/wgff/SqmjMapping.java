package net.ruixin.controller.wgff;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 *网格队伍-社区民警信息 路径跳转
 */
@Controller
@RequestMapping("/wgff")
public class SqmjMapping {
    /**
     * 网格队伍-社区民警信息列表
     */
    @RequestMapping("/sqmjList")
    public String sqmjList() { return "asdfkgzpt/wgff/sqmjList";}

    /**
     * 网格队伍-社区民警信息表单
     */
    @RequestMapping("/sqmjEdit")
    public String sqmjEdit() { return "asdfkgzpt/wgff/sqmjEdit";}

    /**
     * 网格队伍-社区民警信息查看表单
     */
    @RequestMapping("/sqmjView")
    public String sqmjView() { return "asdfkgzpt/wgff/sqmjView";}
}
