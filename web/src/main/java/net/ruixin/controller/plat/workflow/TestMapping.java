package net.ruixin.controller.plat.workflow;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/workflow/test")
public class TestMapping {
    //列表
    @RequestMapping(value = "/teacherList")
    public String teacherList() {
        return "plat/workflow/test/teacherList";
    }

    //流程表单
    @RequestMapping(value = "/teacherEdit")
    public String teacherEdit() {
        return "plat/workflow/test/teacherEdit";
    }

    //流程表单
    @RequestMapping(value = "/teacherView")
    public String teacherView() {
        return "plat/workflow/test/teacherView";
    }
}
