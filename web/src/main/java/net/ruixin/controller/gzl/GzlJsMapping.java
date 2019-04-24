package net.ruixin.controller.gzl;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 *工作流-接收 路径跳转
 */
@Controller
@RequestMapping("/gzl")
public class GzlJsMapping {
    /**
     * 工作流-接收列表
     */
    @RequestMapping("/gzlJsList")
    public String gzlJsList() { return "asdfkgzpt/gzl/gzlJsList";}

    /**
     * 工作流-接收表单
     */
    @RequestMapping("/gzlJsEdit")
    public String gzlJsEdit() { return "asdfkgzpt/gzl/gzlJsEdit";}

    /**
     * 工作流-接收查看表单
     */
    @RequestMapping("/gzlJsView")
    public String gzlJsView() { return "asdfkgzpt/gzl/gzlJsView";}
}
