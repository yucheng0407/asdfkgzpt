package net.ruixin.controller.plat.workflow;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/workflow/ibps")
public class IbpsMapping {
    @RequestMapping(value = "/designer")
    public String designer() {
        return "plat/workflow/ibps/designer";
    }

    @RequestMapping(value = "/processEdit")
    public String processEdit() {
        return "plat/workflow/ibps/processEdit";
    }

    @RequestMapping(value = "/userTaskEdit")
    public String userTaskEdit() {
        return "plat/workflow/ibps/userTaskEdit";
    }

    @RequestMapping(value = "/startEventEdit")
    public String startEventEdit() {
        return "plat/workflow/ibps/startEventEdit";
    }

    @RequestMapping(value = "/endEventEdit")
    public String endEventEdit() {
        return "plat/workflow/ibps/endEventEdit";
    }

    @RequestMapping(value = "/exclusiveGatewayEdit")
    public String exclusiveGatewayEdit() {
        return "plat/workflow/ibps/exclusiveGatewayEdit";
    }

    @RequestMapping(value = "/sequenceFlowEdit")
    public String sequenceFlowEdit() {
        return "plat/workflow/ibps/sequenceFlowEdit";
    }

    /**
     * 流程图
     * @return
     */
    @RequestMapping(value="/flowImage")
    public String flowImage(){
        return "plat/workflow/ibps/flowImage";
    }

    /**
     * 任务实例
     * @return
     */
    @RequestMapping(value = "/taskInstanceView")
    public String taskInstanceView(){
        return "plat/workflow/ibps/taskInstanceView";
    }

    @RequestMapping(value = "/taskInstanceList")
    public String taskInstanceList(){
        return "plat/workflow/ibps/taskInstanceList";
    }


    /**
     * 流程定义列表
     *
     * @return
     */
    @RequestMapping(value = "/flowDefList")
    public String flowDefList() {
        return "plat/workflow/ibps/flowDefList";
    }

    /**
     * 流程版本列表
     * @return
     */
    @RequestMapping(value = "/flowVersionList")
    public String flowVersionList() {
        return "plat/workflow/ibps/flowVersionList";
    }

    /**
     * 导入流程定义
     *
     * @return
     */
    @RequestMapping(value = "/importDef")
    public String importDef() {
        return "plat/workflow/ibps/importDef";
    }


    @RequestMapping(value = "/userTaskCandidateEdit")
    public String userTaskCandidate(){
        return "plat/workflow/ibps/userTaskCandidateEdit";
    }

}
