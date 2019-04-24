package net.ruixin.controller.plat.form;

import net.ruixin.service.plat.form.IFormService;
import net.ruixin.service.plat.workflow.IWorkflowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 表单mapping
 */
@Controller
@RequestMapping("/form")
public class FormMapping {
    @Autowired
    private IWorkflowService workflowService;
    @Autowired
    private IFormService formService;

    /**
     * 表单设计列表
     */
    @RequestMapping("/formdesignList")
    public String formdesignList() {
        return "plat/form/formdesign/formdesignList";
    }


    /**
     * 表单设计列表
     */
    @RequestMapping("/formdesignEdit")
    public String formdesignEdit() {
        return "plat/form/formdesign/formdesignEdit";
    }

    /**
     * 表单设计预览
     */
    @RequestMapping("/previewDef")
    public String previewDef() {
        return "plat/form/formdesign/previewDef";
    }

    /**
     * 表单保存测试
     */
    @RequestMapping("/testSaveFormView")
    public String testSaveFormView() {
        return "plat/form/formdesign/testSaveFormView";
    }

    /**
     * 表单保存测试
     */
    @RequestMapping("/testSaveFormView2")
    public String testSaveFormView2() {
        return "plat/form/formdesign/testSaveFormView2";
    }

    /**
     * 表单保存测试
     */
    @RequestMapping("/testSaveFormEdit")
    public String testSaveForm() {
        return "plat/form/formdesign/testSaveFormEdit";
    }

    /**
     * 表单对象数据list查看列表
     */
    @RequestMapping("/ckFormData")
    public String ckFormData() {
        return "plat/form/formdesign/formObjList";
    }

    /**
     * 流程编辑页面
     */
    @RequestMapping("/wfFormEdit")
    public String wfFormEdit() {
        return "plat/form/formdesign/wfFormEdit";
    }

    /**
     * 流程查看页面
     */
    @RequestMapping("/wfFormView")
    public String wfFormView() {
        return "plat/form/formdesign/wfFormView";
    }

    /**
     * 流程设计器设计的表单页面
     */
    @RequestMapping("/formEdit")
    public String formEdit(String _pageType) {
        if ("wf".equals(_pageType)) {
            //流程页面
            return "plat/form/formdesign/wfFormEdit";
        } else {
            //普通页面
            return "plat/form/formdesign/testSaveEdit";
        }
    }

    @RequestMapping("/formView")
    public String formView(String _pageType) {
        if ("wf".equals(_pageType)) {
            //流程页面
            return "plat/form/formdesign/wfFormView";
        } else {
            //普通页面
            return "plat/form/formdesign/testSaveEdit";
        }
    }

    @RequestMapping("/wfFormList")
    public String wfFormList(String flowCode, Model model) {
        //如果flowCode存在则查找此流程的相关信息
//        if (RxStringUtils.isNotEmpty(flowCode)) {
//            /**
//             * 页面需要的信息
//             * 1、流程的相关信息（流程code，设计的表单信息）
//             * 2、表单的信息
//             */
//            //todo 老接口，等新版接口调整查找主版本流程
//            SysWorkflow workflow = workflowService.findWorkflowByCode(flowCode);
//            if (workflow != null) {
//                //流程code
//                model.addAttribute("flowCode", flowCode);
//                Map<String, Object> workflowMap = new HashMap<>();
//                model.addAttribute("flowName", workflow.getName());
//                model.addAttribute("ywztzd", workflow.getWorkflowYwztZd());
////                model.addAttribute("options", formService.getWfJson(workflow.getId()));
//            }
//        } else {
//            model.addAttribute("flowCode", "");
//            model.addAttribute("flowName", "");
//            model.addAttribute("ywztzd", "");
////            model.addAttribute("options", "");
//        }
        return "plat/form/formdesign/wfFormList";
    }

    /**
     * 采集标注动态列表
     */
    @RequestMapping("/ckFormDataForMap")
    public String ckFormDataForMap() {
        return "zybz/form/formObjList";
    }

    @RequestMapping("/organTree")
    public String organTree() {
        return "plat/form/formdesign/organTree_form";
    }
}
