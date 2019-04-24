package net.ruixin.controller.gzl;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 *工作流反馈 路径跳转
 */
@Controller
@RequestMapping("/gzl")
public class GzlFkMapping {
    /**
     * 工作流反馈列表
     */
    @RequestMapping("/gzlFkList")
    public String gzlFkList() { return "asdfkgzpt/gzl/gzlFkList";}

    /**
     * 工作流反馈表单
     */
    @RequestMapping("/gzlFkEdit")
    public String gzlFkEdit() { return "asdfkgzpt/gzl/gzlFkEdit";}

    /**
     * 工作流反馈查看表单
     */
    @RequestMapping("/gzlFkView")
    public String gzlFkView() { return "asdfkgzpt/gzl/gzlFkView";}
}
