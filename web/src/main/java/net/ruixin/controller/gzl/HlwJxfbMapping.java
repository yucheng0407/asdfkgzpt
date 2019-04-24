package net.ruixin.controller.gzl;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 *互联网-继续发布 路径跳转
 */
@Controller
@RequestMapping("/gzl")
public class HlwJxfbMapping {
    /**
     * 互联网-继续发布列表
     */
    @RequestMapping("/hlwJxfbList")
    public String hlwJxfbList() { return "asdfkgzpt/gzl/hlwJxfbList";}

    /**
     * 互联网-继续发布表单
     */
    @RequestMapping("/hlwJxfbEdit")
    public String hlwJxfbEdit() { return "asdfkgzpt/gzl/hlwJxfbEdit";}

    /**
     * 互联网-继续发布查看表单
     */
    @RequestMapping("/hlwJxfbView")
    public String hlwJxfbView() { return "asdfkgzpt/gzl/hlwJxfbView";}
}
