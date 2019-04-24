package net.ruixin.controller.gzl;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 *互联网-反馈 路径跳转
 */
@Controller
@RequestMapping("/gzl")
public class HlwFkMapping {
    /**
     * 互联网-反馈列表
     */
    @RequestMapping("/hlwFkList")
    public String hlwFkList() { return "asdfkgzpt/gzl/hlwFkList";}

    /**
     * 互联网-反馈表单
     */
    @RequestMapping("/hlwFkEdit")
    public String hlwFkEdit() { return "asdfkgzpt/gzl/hlwFkEdit";}

    /**
     * 互联网-反馈查看表单
     */
    @RequestMapping("/hlwFkView")
    public String hlwFkView() { return "asdfkgzpt/gzl/hlwFkView";}
}
