package net.ruixin.controller.gzl;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 *工作流发布 路径跳转
 */
@Controller
@RequestMapping("/gzl")
public class GzlFbMapping {
    /**
     * 工作流发布列表
     */
    @RequestMapping("/gzlFbList")
    public String gzlFbList() { return "asdfkgzpt/gzl/gzlFbList";}

    /**
     * 工作流发布表单
     */
    @RequestMapping("/gzlFbEdit")
    public String gzlFbEdit() { return "asdfkgzpt/gzl/gzlFbEdit";}

    /**
     * 工作流发布查看表单
     */
    @RequestMapping("/gzlFbView")
    public String gzlFbView() { return "asdfkgzpt/gzl/gzlFbView";}
}
