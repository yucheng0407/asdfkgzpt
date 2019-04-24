package net.ruixin.controller.plat.workflow;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/workflow/design")
public class WorkflowMapping {

    //流程类别管理
    @RequestMapping(value = "/workflowType")
    public String workflowType() {
        return "plat/workflow/design/workflowType";
    }

    //流程类别管理
    @RequestMapping(value = "/workflowTypeSelect")
    public String workflowTypeSelect() {
        return "plat/workflow/design/workflowTypeSelect";
    }

    //流程设计
    @RequestMapping(value = "/flow")
    public String workflowDesign() {
        return "plat/workflow/design/flow";
    }

    //流程设计
    @RequestMapping(value = "/panel")
    public String panel() {
        return "plat/workflow/design/panel";
    }

    //开始环节
    @RequestMapping(value = "/startNodeEdit")
    public String startNodeEdit() {
        return "plat/workflow/design/startNodeEdit";
    }

    //结束环节
    @RequestMapping(value = "/endNodeEdit")
    public String end_node() {
        return "plat/workflow/design/endNodeEdit";
    }

    //决策环节
    @RequestMapping(value = "/judgeNodeEdit")
    public String judgeNodeEdit() {
        return "plat/workflow/design/judgeNodeEdit";
    }

    // 流向设置
    @RequestMapping(value = "/routerEdit")
    public String routerEdit() {
        return "plat/workflow/design/routerEdit";
    }

    // 新建流程页面
    @RequestMapping(value = "/flowPropertyEdit")
    public String flowPropertyEdit() {
        return "plat/workflow/design/flowPropertyEdit";
    }

    //弹出选择流程表单
    @RequestMapping(value = "/sheetSelect")
    public String sheetSelect() {
        return "plat/workflow/design/sheetSelect";
    }

    // 活动环节
    @RequestMapping(value = "/activity_node")
    public String activity_node() {
        return "plat/workflow/design/activityNodeEdit";
    }

    //导入流程
    @RequestMapping(value = "/impWorkflow")
    public String impWorkflow() {
        return "plat/workflow/design/impWorkflow";
    }

    //复制新建流程
    @RequestMapping(value = "/newWorkflow")
    public String newWorkflow() {
        return "plat/workflow/design/newWorkflow";
    }
}
