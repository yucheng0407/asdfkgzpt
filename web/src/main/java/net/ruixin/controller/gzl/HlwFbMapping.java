package net.ruixin.controller.gzl;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 *互联网-发布 路径跳转
 */
@Controller
@RequestMapping("/gzl")
public class HlwFbMapping {
    /**
     * 互联网-发布列表
     */
    @RequestMapping("/hlwFbList")
    public String hlwFbList() { return "asdfkgzpt/gzl/hlwFbList";}

    /**
     * 互联网-发布表单
     */
    @RequestMapping("/hlwFbEdit")
    public String hlwFbEdit() { return "asdfkgzpt/gzl/hlwFbEdit";}

    /**
     * 互联网-发布查看表单
     */
    @RequestMapping("/hlwFbView")
    public String hlwFbView() { return "asdfkgzpt/gzl/hlwFbView";}
}
