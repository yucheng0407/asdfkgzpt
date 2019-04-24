package net.ruixin.controller.plat.workflow;

import net.ruixin.controller.BaseController;
import net.ruixin.domain.plat.workflow.structure.frame.SysWorkflow;
import net.ruixin.domain.plat.workflow.structure.frame.SysWorkflowType;
import net.ruixin.service.plat.workflow.IWorkflowService;
import net.ruixin.service.plat.workflow.IWorkflowTypeService;
import net.ruixin.util.data.AjaxReturn;
import net.ruixin.util.exception.BizExceptionEnum;
import net.ruixin.util.exception.BussinessException;
import net.ruixin.util.resolver.FormModel;
import net.ruixin.util.resolver.SearchModel;
import net.ruixin.util.support.ToolUtil;
import net.ruixin.util.tools.RxStringUtils;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author Jealous
 * @date 2016-8-9
 * 工作流结构部分控制层
 */
@Controller
@RequestMapping("/workflow/design")
public class WorkflowHandler extends BaseController {

    @Autowired
    private IWorkflowTypeService workflowTypeService;

    @Autowired
    private IWorkflowService workflowService;

    private static final Logger log = LoggerFactory.getLogger(WorkflowHandler.class);

    /**
     * 构建流程类别树
     *
     * @param id 流程类别主键信息
     */
    @ResponseBody
    @RequestMapping(value = "/createWorkflowTypeTree")
    public List createWorkflowTypeTree(Long id) {
        List<SysWorkflowType> sysWorkflowTypeList;
        if (id != null) {
            sysWorkflowTypeList = workflowTypeService.findWorkflowTypesByParent(id);
        } else {
            sysWorkflowTypeList = workflowTypeService.findTopWorkflowTypes();
        }
        return workflowTypeService.parseTreeMap(sysWorkflowTypeList, null, "workflowType");
    }

    /**
     * 获取流程类别
     *
     * @param id 流程类别主键信息
     */
    @ResponseBody
    @RequestMapping(value = "/getWorkflowType")
    public AjaxReturn getWorkflowType(Long id) {
        return success().setData(workflowTypeService.getWorkflowType(id));
    }

    /**
     * 删除流程类别
     *
     * @param id 流程类别主键信息
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping(value = "/delWorkflowType")
    public AjaxReturn delWorkflowType(Long id) {
        boolean result = false;
        String message;
        if (id != null) {
            if (workflowTypeService.hasChildren(id)) {
                result = false;
                message = "该流程类别包含子流程类别，不可删除";
            } else if (workflowService.hasWorkflow(id)) {
                result = false;
                message = "该流程类别下存在工作流，不可删除";
            } else {
                if (workflowTypeService.delWorkflowType(id)) {
                    result = true;
                    message = "删除成功";
                } else {
                    message = "删除失败";
                }
            }
        } else {
            message = "请求出错，缺失流程类别主键信息";
        }
        return new AjaxReturn().setSuccess(result).setMsg(message);
    }

    /**
     * 新增、修改流程类别
     */
    @ResponseBody
    @RequestMapping(value = "/saveWorkflowType")
    public AjaxReturn saveWorkflowType(@FormModel SysWorkflowType workflowType) {
        workflowTypeService.saveWorkflowType(workflowType);
        return success();
    }

    /**
     * 构建流程类别树+类别下的工作流数据
     *
     * @param id 流程类别ID
     * @return List
     */
    @ResponseBody
    @RequestMapping(value = "/createWorkflowTypeAndWorkflowTree")
    public List createWorkflowTypeAndWorkflowTree(String id) {
        List<SysWorkflowType> sysWorkflowTypeList = null;
        List<SysWorkflow> sysWorkflowList = null;
        if(id != null) {
            if(id.startsWith("f_")) {
                String flowId = id.substring("f_".length());
                SysWorkflow workFlow = workflowService.get(Long.parseLong(flowId));
                if(workFlow != null) {
                    sysWorkflowList = workflowService.listVersionWorkflow(workFlow.getCode(),true);
                    if(!ToolUtil.isNullList(sysWorkflowList)) sysWorkflowList.remove(0);
                }
            } else {
                sysWorkflowTypeList = workflowTypeService.findWorkflowTypesByParent(Long.parseLong(id));
                sysWorkflowList = workflowService.findLatestVersionWfByType(Long.parseLong(id));
                if(!ToolUtil.isNullList(sysWorkflowList)) {
                    for(SysWorkflow workflow:sysWorkflowList) workflow.setLatestVersion(true);
                }
            }
        } else {
            sysWorkflowTypeList = workflowTypeService.findTopWorkflowTypes();
        }
        return workflowTypeService.parseTreeMap(sysWorkflowTypeList, sysWorkflowList, "workflow");
    }

    /**
     * 查询所有的流程
     *
     * @return List
     */
    @ResponseBody
    @RequestMapping(value = "/findWorkflow")
    public List<Map<String, Object>> findWorkflow() {
        List<SysWorkflow> list = workflowService.findAllWorkflow();
        List<Map<String, Object>> json = new ArrayList<>();
        for (SysWorkflow it : list) {
            Map<String, Object> map = new HashMap<>();
            map.put("id", it.getId());
            map.put("name", it.getName());
            json.add(map);
        }
        return json;
    }

    /**
     * 获取单个流程数据
     *
     * @param id 流程ID
     * @return Map
     */
    @ResponseBody
    @RequestMapping(value = "/findWorkflowById")
    public Map<String, java.io.Serializable> findWorkflowById(Long id) {
        SysWorkflow workflow = workflowService.get(id);
        Map<String, java.io.Serializable> map = new HashMap<>();
        map.put("name", workflow.getName());
        if (workflow.getVersion() != null) {
            map.put("version", workflow.getVersion());
        } else {
            map.put("version", 1);
        }
        return map;
    }

    /**
     * 删除流程
     *
     * @param id 流程ID
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping(value = "/delWorkflow")
    public AjaxReturn delWorkflow(Long id) {
        workflowService.delWorkflow(id);
        return success();
    }

    /**
     * 保存流程
     *
     * @param json json格式工作流内容
     * @return 成功否
     */
    @ResponseBody
    @RequestMapping(value = "/saveWorkflow")
    public AjaxReturn saveWorkflow(String json) {
        boolean result = false;
        String message = null;
        Long workflowId = null;
        try {
            workflowId = workflowService.saveWorkflow(json);
        } catch(Exception e) {
            log.error("保存失败",e);
            message = e.getMessage();
        }
        if (workflowId != null) {
            result = true;
            message = "保存成功";
        } else {
            message = RxStringUtils.isEmpty(message) ? "保存失败" :("保存失败:" + message);
        }
        return new AjaxReturn().setSuccess(result).setMsg(message).setData(workflowId);
    }

    /**
     * 获取工作流
     *
     * @param id 工作流id
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping(value = "/getWorkflowJSON")
    public AjaxReturn getWorkflowJSON(Long id) {
        return success().setData(workflowService.getWorkflowJSON(id));
    }

    /**
     * 获取复制新建工作流
     *
     * @param id 工作流id
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping(value = "/getCopyWorkflowJSON")
    public AjaxReturn getCopyWorkflowJSON(Long id,Boolean newVersion,Boolean copyStructure) {
        return success().setData(workflowService.getSaveAsWorkflowJSON(id, newVersion, copyStructure));
    }

    /**
     * 分页查询流程表单
     *
     * @param map 参数集
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping(value = "/getPageList")
    public AjaxReturn getPageList(@SearchModel Object map) {
        return success().setData(workflowService.getPageList((Map) map));
    }

    /**
     * 获取工作流最大版本号
     *
     * @param workflowId 流程ID
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping(value = "/getWorkflowVersion")
    public AjaxReturn getWorkflowVersion(Long workflowId) {
        return success().setData(workflowService.getWorkflowVersion(workflowId));
    }

    /**
     * 获取同步流程分类流程树数据
     *
     * @return List 同步树数据
     */
    @ResponseBody
    @RequestMapping(value = "/getSyncWorkflowTypeAndWorkflowTree")
    public List getSyncWorkflowTypeAndWorkflowTree() {
        return workflowTypeService.getSyncWorkflowTypeAndWorkflowTree();
    }

    /**
     * 以excel的方式导出流程数据
     *
     * @param workflowId 流程编号
     */
    @ResponseBody
    @RequestMapping("/expWorkflow")
    public void expWorkflow(Long workflowId) {
        workflowService.expWorkflow(workflowId);
    }

    /**
     * 导入excel中流程数据
     *
     * @param request 请求
     * @param typeId  流程类别ID
     * @return 流程信息json
     */
    @ResponseBody
    @RequestMapping("/importWorkflow")
    public AjaxReturn impWorkflow(HttpServletRequest request, Long typeId) {
        String xls = ".xls";
        String xlsx = ".xlsx";
        Long workflowId = null;
        MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
        MultipartFile multipartFile = multipartRequest.getFile("filedata");
        if (multipartFile != null) {
            String fileName = multipartFile.getOriginalFilename();
            Workbook workbook = null;
            try {
                if (fileName.endsWith(xls)) {
                    workbook = new HSSFWorkbook(multipartFile.getInputStream());
                } else if (fileName.endsWith(xlsx)) {
                    workbook = new XSSFWorkbook(multipartFile.getInputStream());
                }
            } catch (IOException e) {
                throw new BussinessException(BizExceptionEnum.FILE_EXCEL_ERROR, fileName);
            }
            if (workbook != null) {
                workflowId = workflowService.impWorkflow(workbook, typeId);
            }
        }
        return success().setData(workflowService.getWorkflowJSON(workflowId));
    }

    @ResponseBody
    @RequestMapping("/isFlowCodeExist")
    public AjaxReturn isFlowCodeExist(String flowCode) {
        return success().setData(workflowService.isFlowCodeExist(flowCode));
    }

    @ResponseBody
    @RequestMapping("/getNewVersion")
    public AjaxReturn getNewVersion(String flowCode) {
        return success().setData(workflowService.getNewVersion(flowCode));
    }

    @ResponseBody
    @RequestMapping("/hasRunningWorkflowInstance")
    public AjaxReturn hasRunningWorkflowInstance(Long workflowId) {
        return success().setData(workflowService.hasRunningWorkflowInstance(workflowId));
    }

    @ResponseBody
    @RequestMapping("/getFlowTypeAndFlowTree")
    public List getFlowTypeAndFlowTree() {
        return workflowTypeService.getFlowTypeAndFlowTree();
    }
}
