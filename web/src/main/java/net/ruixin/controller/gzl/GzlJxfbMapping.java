package net.ruixin.controller.gzl;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 *工作流-继续发布 路径跳转
 */
@Controller
@RequestMapping("/gzl")
public class GzlJxfbMapping {
    /**
     * 工作流-继续发布列表
     */
    @RequestMapping("/gzlJxfbList")
    public String gzlJxfbList() { return "asdfkgzpt/gzl/gzlJxfbList";}

    /**
     * 工作流-继续发布表单
     */
    @RequestMapping("/gzlJxfbEdit")
    public String gzlJxfbEdit() { return "asdfkgzpt/gzl/gzlJxfbEdit";}

    /**
     * 工作流-继续发布查看表单
     */
    @RequestMapping("/gzlJxfbView")
    public String gzlJxfbView() { return "asdfkgzpt/gzl/gzlJxfbView";}
}
