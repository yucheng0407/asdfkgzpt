package net.ruixin.controller.plat.workflow;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/workflow/instance")
public class WorkflowInstanceMapping {
    //流程页面
    @RequestMapping(value = "/opinionTable")
    public String opinionTable() {
        return "plat/workflow/instance/opinionTable";
    }

    //流程页面
    @RequestMapping(value = "/taskHandle")
    public String taskHandle() {
        return "plat/workflow/instance/taskHandle";
    }

    //流程监控页面
    @RequestMapping(value = "/workflowView")
    public String workflowView() {
        return "plat/workflow/instance/workflowView";
    }

    //流程图页面
    @RequestMapping(value = "/image")
    public String image() {
        return "plat/workflow/instance/image";
    }

    //任务列表
    @RequestMapping(value = "/taskList")
    public String taskList() {
        return "plat/workflow/instance/taskList";
    }

    //委办列表
    @RequestMapping(value = "/entrustList")
    public String entrustList() {
        return "plat/workflow/instance/entrustList";
    }

    //委办编辑
    @RequestMapping(value = "/entrustEdit")
    public String entrustEdit() {
        return "plat/workflow/instance/entrustEdit";
    }

    //办理页面
    @RequestMapping(value = "/handle")
    public String handle() {
        return "plat/workflow/instance/handle";
    }

    //特送退回弹出页面
    @RequestMapping("/specialBack")
    public String specialBack() {
        return "plat/workflow/instance/specialBack";
    }

    //选择退回节点
    @RequestMapping(value = "/selectBackNode")
    public String selectBackNode() {
        return "plat/workflow/instance/selectBackNode";
    }

    //催办内容页面
    @RequestMapping(value = "/pressContent")
    public String pressContent() {
        return "plat/workflow/instance/pressContent";
    }

    //流程图形
    @RequestMapping(value = "/transactList")
    public String transactList() {
        return "plat/workflow/instance/transactList";
    }
}
