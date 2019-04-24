package net.ruixin.controller.gzl;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 *互联网-接收 路径跳转
 */
@Controller
@RequestMapping("/gzl")
public class HlwJsMapping {
    /**
     * 互联网-接收列表
     */
    @RequestMapping("/hlwJsList")
    public String hlwJsList() { return "asdfkgzpt/gzl/hlwJsList";}

    /**
     * 互联网-接收表单
     */
    @RequestMapping("/hlwJsEdit")
    public String hlwJsEdit() { return "asdfkgzpt/gzl/hlwJsEdit";}

    /**
     * 互联网-接收查看表单
     */
    @RequestMapping("/hlwJsView")
    public String hlwJsView() { return "asdfkgzpt/gzl/hlwJsView";}
}
