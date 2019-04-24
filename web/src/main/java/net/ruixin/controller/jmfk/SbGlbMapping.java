package net.ruixin.controller.jmfk;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 *防控安排_设备_关联表 路径跳转
 */
@Controller
@RequestMapping("/jmfk")
public class SbGlbMapping {
    /**
     * 防控安排_设备_关联表列表
     */
    @RequestMapping("/sbGlbList")
    public String sbGlbList() { return "asdfkgzpt/jmfk/sbGlbList";}

    /**
     * 防控安排_设备_关联表表单
     */
    @RequestMapping("/sbGlbEdit")
    public String sbGlbEdit() { return "asdfkgzpt/jmfk/sbGlbEdit";}

    /**
     * 防控安排_设备_关联表查看表单
     */
    @RequestMapping("/sbGlbView")
    public String sbGlbView() { return "asdfkgzpt/jmfk/sbGlbView";}
}
