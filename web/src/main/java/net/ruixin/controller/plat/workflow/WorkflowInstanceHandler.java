package net.ruixin.controller.plat.workflow;

import net.ruixin.controller.BaseController;
import net.ruixin.domain.constant.Workflow;
import net.ruixin.domain.plat.workflow.instance.SysEntrust;
import net.ruixin.domain.plat.workflow.instance.SysTask;
import net.ruixin.domain.plat.workflow.instance.SysWorkflowInstance;
import net.ruixin.domain.plat.workflow.structure.frame.SysWorkflow;
import net.ruixin.service.plat.workflow.*;
import net.ruixin.service.plat.workflow.title.IWfInsTitleStrategy;
import net.ruixin.service.plat.workflow.title.WfInsTitleStrategyFactory;
import net.ruixin.util.data.AjaxReturn;
import net.ruixin.util.paginate.FastPagination;
import net.ruixin.util.resolver.FormModel;
import net.ruixin.util.resolver.SearchModel;
import net.ruixin.util.tools.RxStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.*;

/**
 * @author wcy
 * @date 2016-8-11
 * 工作流实例部分控制层
 */
@Controller
@RequestMapping("/workflow/instance")
public class WorkflowInstanceHandler extends BaseController {
    @Autowired
    private IWorkflowInstanceService workflowInstanceService;
    @Autowired
    private IWorkflowService workflowService;
    @Autowired
    private ISysTaskService sysTaskService;
    @Autowired
    private ISysEntrustService sysEntrustService;
    @Autowired
    private WfInsTitleStrategyFactory factory;
    @Autowired
    private IWorkflowPageDataService workflowPageDataService;

    /**
     * 根据流程编码启动流程(保存草稿时被前端直接调用)
     *
     * @param flowCode   流程编码
     * @param dataId     业务数据id
     * @param sourceData 源数据
     * @param title      流程实例标题
     * @param type       标志位 为draft时表示流程未启动时点击草稿按钮触发
     */
    @ResponseBody
    @RequestMapping(value = "/startWorkflow")
    public AjaxReturn startWorkflow(String flowCode, Long dataId, String sourceData, String title, String type) {
        Long userId = super.getCurrentUserId();
        SysWorkflow wf = workflowService.findWorkflowByCode(flowCode);
        if (wf == null) {
            return error().setMsg(Workflow.WF_NOT_FOUND);
        }
        List<Object> param = new ArrayList<>();
        param.add(wf.getId());
        param.add(userId);
        //流程发起类型:0是人工，1是嵌套
        param.add(0);
        //业务数据ID
        param.add(dataId);
        //传入流程实例标题
        if (RxStringUtils.isNotEmpty(title)) {
            param.add(title);
            //未传入流程实例标题
        } else {
            //草稿默认流程实例标题为流程名称
            if ("draft".equals(type)) {
                param.add(wf.getName());
                //定制流程实例标题
            } else {
                IWfInsTitleStrategy wfInsTitleStrategy = factory.getWfInsTitleStrategy(flowCode);
                if (null != wfInsTitleStrategy) {
                    param.add(wfInsTitleStrategy.getWfInsTitle(dataId, wf));
                } else {
                    param.add(wf.getInstanceTitle());
                }
            }
        }
        //流程源数据
        param.add(sourceData);
        //调用存储过程,启动流程
        String msg = workflowInstanceService.startup(param);
        //存储过程返回的参数
        String[] msgs = msg.split(",");
        if (Workflow.START_SUCCESS.equals(msgs[0])) {
            SysTask sysTask = sysTaskService.getTaskByWorkflowInstanceAndUser(Long.valueOf(msgs[1]), userId);
            return success().setData(sysTask.getId());
        } else {
            return error().setMsg(Workflow.START_FAIL);
        }
    }

    /**
     * 根据流程编码启动流程（未保存草稿，首次提交时被前端直接调用）
     *
     * @param flowCode 流程编码
     * @param dataId   业务数据ID
     * @param opinion  办理意见
     * @param title    流程实例标题
     * @param wfVars   流程变量及值
     * @param dataIds   数据ids，格式dataId:1,pageId:"",formId:"";dataId:1,pageId:"",formId:"";
     *
     */
    @ResponseBody
    @RequestMapping(value = "/startWorkflowAndSubmit")
    public AjaxReturn startWorkflowAndSubmit(String flowCode, Long dataId, String opinion, String title, String wfVars, String sourceData, String dataIds) {
        //启动工作流
        AjaxReturn ar = startWorkflow(flowCode, dataId, sourceData, title, null);
        //提交第一办理环节任务
        if (ar.getSuccess()) {
            ar = handleTask((Long) ar.getData(), null, null, opinion, null,
                    true, null, null, false, null, wfVars, null, dataIds);
        }
        //办理成功
        if (ar.getSuccess()) {
            return success().setMsg(Workflow.TRANSACT_SUCCESS);
        }
        return error().setMsg(Workflow.TRANSACT_FAIL);
    }

    /**
     * 签收任务
     *
     * @param id 任务id
     */
    @ResponseBody
    @RequestMapping(value = "/signTask")
    public String signTask(Long id) {
        return workflowInstanceService.signForTask(id);
    }

    /**
     * 办理任务（每次提交、退回时被前端调用）
     *
     * @param id           任务id
     * @param userIds      指定的下一环节办理人ids，逗号分隔
     * @param branch       手动决策的分支条件
     * @param opinion      办理意见
     * @param fjId         附件id
     * @param agree        操作标志
     * @param auditOpinion 审批意见
     * @param dataId       业务数据ID
     * @param draft        是否草稿后提交
     * @param title        流程实例标题
     * @param wfVars       流程变量及值
     * @param backNodeIds  指定的退回环节IDS
     * @param dataIds   数据ids，格式dataId:1,pageId:"",formId:"";dataId:1,pageId:"",formId:"";
     */
    @ResponseBody
    @RequestMapping(value = "/handleTask")
    public AjaxReturn handleTask(Long id, String userIds, String branch, String opinion,
                                 String fjId, boolean agree, String auditOpinion, Long dataId,
                                 boolean draft, String title, String wfVars, String backNodeIds, String dataIds) {
        //保存草稿后首次提交
        if (null != dataId && draft) {
            //更新业务数据ID
            workflowInstanceService.updateWorkflowInstanceData(id, Workflow.COLUMN_DATA_ID, dataId);
        }
        //更新流程实例标题
        if (RxStringUtils.isNotEmpty(title)) {
            SysWorkflowInstance workflowInstance = sysTaskService.get(id).getWorkflow_instance_id();
            String wfTitle = workflowInstance.getTitle();
            if (!title.equals(wfTitle)) {
                workflowInstanceService.updateWorkflowInstanceData(id, Workflow.COLUMN_TITLE, title);
            }
        }
        //办理任务
        List<Object> param = new ArrayList<>();
        param.add(id);
        param.add(RxStringUtils.isNotEmpty(userIds) ? userIds : "");
        param.add(branch);
        param.add(opinion);
        param.add(fjId);
        param.add(agree ? "1" : "0");
        param.add(backNodeIds);//分支聚合测试
        //保存数据id
        workflowPageDataService.saveWorkflowPageData(sysTaskService.get(id).getWorkflow_instance_id().getId(),dataIds);
        return workflowInstanceService.transact(param, auditOpinion, wfVars, id, branch, opinion, fjId);

    }

    /**
     * 撤回任务
     *
     * @param id 任务ID
     */
    @ResponseBody
    @RequestMapping(value = "/withdraw")
    public AjaxReturn withdraw(Long id) {
        return workflowInstanceService.withdraw(id);
    }

    /**
     * 删除流程相关数据
     *
     * @param taskId 任务实例ID
     */
    @ResponseBody
    @RequestMapping(value = "/deleteWorkflowInstance")
    public AjaxReturn deleteWorkflowInstance(Long taskId) {
        workflowInstanceService.delWorkflowInstance(sysTaskService.get(taskId).getWorkflow_instance_id().getId());
        return success();
    }

    /**
     * 获取最新的任务实例ID
     *
     * @param flowCode 流程编码
     * @param dataId   数据ID
     */
    @ResponseBody
    @RequestMapping(value = "/getNewestTaskId")
    public AjaxReturn getNewestTaskId(String flowCode, Long dataId) {
        AjaxReturn ajaxReturn = new AjaxReturn();
        //以流程编码获取流程，并填入id参数
        SysWorkflow wf = workflowService.findWorkflowByCode(flowCode);
        if (wf == null) {
            return new AjaxReturn(false, null, Workflow.WF_NOT_FOUND);
        }
        Long taskId = workflowInstanceService.getLatestTaskIdByDataId(wf.getId(), dataId, super.getCurrentUserId());
        if (taskId == null) {
            ajaxReturn.setSuccess(true).setMsg("未找到最新的任务实例ID");
        } else {
            ajaxReturn.setSuccess(true).setData(taskId);
        }
        return ajaxReturn;
    }

    /**
     * 通过流程实例获取最新的任务实例ID
     *
     * @param wiId 流程实例ID
     */
    @ResponseBody
    @RequestMapping(value = "/getNewestTaskIdByWiId")
    public AjaxReturn getNewestTaskIdByWiId(Long wiId) {
        Long taskId = workflowInstanceService.getLatestTaskIdByWiId(wiId, super.getCurrentUserId());
        return success().setData(taskId);
    }

    /**
     * 获取工作流中的流程表单URL
     *
     * @param flowCode 流程编码
     * @param dataId   数据ID
     */
    @ResponseBody
    @RequestMapping(value = "/getWorkflowSheetUrl")
    public AjaxReturn getWorkflowSheetUrl(String flowCode, Long dataId) {
        return success().setData(workflowInstanceService.getWorkflowSheetUrl(flowCode, dataId));
    }

    /**
     * 流程启动后根据任务ID获取任务办理页面数据
     *
     * @param id 任务ID
     */
    @ResponseBody
    @RequestMapping(value = "/getTaskHandleJson")
    public AjaxReturn getTaskHandleJson(Long id) {
        return success().setData(sysTaskService.generateTaskHandleJson(id, super.getCurrentUserId()));
    }

    /**
     * 流程启动前根据流程编码获取办理页面数据
     *
     * @param flowCode 流程编码
     */
    @ResponseBody
    @RequestMapping(value = "/getTaskHandleByCode")
    public AjaxReturn getTaskHandleByCode(String flowCode) {
        return success().setData(sysTaskService.generateTaskHandleJson(flowCode));
    }

    /**
     * 获取流程确认办理页面的数据
     *
     * @param id          任务ID
     * @param dataId      业务数据ID
     * @param agree       1提交 0退回
     * @param flowCode    流程编码
     * @param wfVars      流程变量及值
     * @param title       流程实例标题
     * @param backNodeIds 指定退回的环节IDS
     * @param dataIds   数据ids，格式dataId:1,pageId:"",formId:"";dataId:1,pageId:"",formId:"";
     */
    @ResponseBody
    @RequestMapping(value = "/getHandleData")
    public AjaxReturn getHandleData(Long id, Long dataId, boolean agree, String flowCode,
                                    String wfVars, String title, String backNodeIds, String dataIds) {
        if (dataId != null) {
            workflowInstanceService.updateWorkflowInstanceData(id, "DATA_ID", dataId);
            sysTaskService.updateTmpData(id, null);
        }
        if (RxStringUtils.isNotEmpty(title)) {
            workflowInstanceService.updateWorkflowInstanceData(id, "TITLE", title);
        }
        if (RxStringUtils.isNotEmpty(wfVars)) {
            workflowInstanceService.initVariable(id, wfVars);
        }
        //清空草稿数据
        workflowInstanceService.emptyTmpData(id);

        Map<String, Object> result = new HashMap<>();
        String info = "";
        String nodeName = "";
        List blrList = null;
        List tempList = workflowInstanceService.getBlrList(id, agree, "", backNodeIds);
        if (tempList.size() > 0) {
            String r = tempList.get(1).toString();
            if (!"取出失败".equals(r)) {
                if ("下一环节是结束环节".equals(r)) {
                    info = "endNode";
                } else {
                    String[] rs = r.split(",");
                    if (rs.length > 1) {
                        nodeName = rs[1];
                    }
                    blrList = (List) tempList.get(0);
                    if (blrList == null || blrList.size() == 0) {
                        info = "noPeople";
                    }
                }
            }
        }
        //节点名称
        result.put("nodeName", nodeName);
        //办理人列表
        result.put("blrList", blrList);
        //页面信息标志
        result.put("info", info);
        //是否显示附件按钮
        result.put("sfbxscfj", Objects.equals(sysTaskService.get(id).getNode_instance_id().getNode_id().getSfbxscfj(), "1"));
        if (RxStringUtils.isNotEmpty(flowCode)) {
            //根据流程编码、业务数据id 查询sql维护的流程角色是否正常——wcy 17/2/22
            Long ywDataId = workflowInstanceService.getDataIdByTaskId(id);
            result.put("data_id", ywDataId);
            if (RxStringUtils.isNotEmpty(ywDataId)) {
                String s = workflowInstanceService.hasDynamicUser(flowCode, ywDataId);
                if (s.length() > 1) {
                    result.put("hasDynamicUser", false);
                    result.put("msg", s.substring(2));
                } else {
                    result.put("hasDynamicUser", true);
                }
            }
        }
        //保存数据id
        workflowPageDataService.saveWorkflowPageData(sysTaskService.get(id).getWorkflow_instance_id().getId(),dataIds);
        //任务ID
        result.put("taskId", id);
        return success().setData(result);
    }

    /**
     * 根据流程编码启动流程,并返回下一环节信息
     *
     * @param flowCode 流程编码
     * @param dataId   业务数据ID
     * @param title    流程实例标题
     * @param wfVars   流程变量及值
     * @param dataIds   数据ids，格式dataId:1,pageId:"",formId:"";dataId:1,pageId:"",formId:"";
     */
    @ResponseBody
    @RequestMapping(value = "/startWorkflowAndGetHandleData")
    public AjaxReturn startWorkflowAndGetHandleData(String flowCode, Long dataId, String title, String wfVars, String sourceData, String dataIds) {
        //启动工作流
        AjaxReturn ar = startWorkflow(flowCode, dataId, sourceData, title, null);
        //获取下一环节信息
        if (ar.getSuccess()) {
            ar = getHandleData((Long) ar.getData(), null, true, flowCode, wfVars, null, null, dataIds);
        }
        if (ar.getSuccess()) {
            return ar;
        }
        return error().setMsg(Workflow.TRANSACT_FAIL);
    }

    /**
     * 获取环节实例列表数据
     *
     * @param id       流程实例ID
     * @param flowCode 流程编码
     */
    @ResponseBody
    @RequestMapping(value = "/getSimpleWorkflowJSON")
    public AjaxReturn getSimpleWorkflowJSON(Long id, String flowCode) {
        return success().setData(workflowInstanceService.getSimpleWorkflowJSON(id, flowCode));
    }

    /**
     * 任务列表
     *
     * @param wfiId  流程实例ID
     * @param nodeId 环节ID
     */
    @ResponseBody
    @RequestMapping(value = "/taskPage")
    public AjaxReturn taskPage(Long wfiId, Long nodeId) {
        return success().setData(sysTaskService.taskPage(wfiId, nodeId));
    }

    /**
     * 获取流程意见
     *
     * @param wiId 流程实例ID
     */
    @ResponseBody
    @RequestMapping(value = "/getFlowOpinion")
    public AjaxReturn getFLowOpinion(Long wiId) {
        return success().setData(workflowInstanceService.getPageOpinionWithCode(wiId));
    }

    /**
     * 保存表单草稿数据
     *
     * @param taskId     任务ID
     * @param nodePageId 环节页面ID
     * @param tmpData    草稿数据
     * @return ar
     */
    @ResponseBody
    @RequestMapping(value = "/saveTmpData")
    public AjaxReturn saveTmpData(Long taskId, Long nodePageId, String tmpData) {
        workflowInstanceService.updateTmpData(taskId, nodePageId, tmpData);
        return success();
    }

    /**
     * 催办
     *
     * @param taskId 任务ID
     * @return ar
     */
    @ResponseBody
    @RequestMapping(value = "/pressTask")
    public AjaxReturn pressTask(Long taskId, String content) {
        workflowInstanceService.pressTask(taskId, content);
        return success();
    }

    /**
     * 批量办理流程
     *
     * @param wfiIds    流程实例IDS
     * @param opinion   办理意见
     * @param handleTag 1：提交 0：退回
     * @return ar
     */
    @ResponseBody
    @RequestMapping(value = "/batchProcessWf")
    public AjaxReturn batchProcessWf(String wfiIds, String opinion, String handleTag) {
        return success().setData(workflowInstanceService.batchProcess(super.getCurrentUserId(), wfiIds, opinion, handleTag));
    }

    /**
     * 获取流程意见
     *
     * @param wiId   流程实例ID
     * @param pageId 页面ID
     * @return ar
     */
    @ResponseBody
    @RequestMapping(value = "/getNodePageOpinion")
    public AjaxReturn getNodePageOpinion(Long wiId, Long pageId) {
        return success().setData(sysTaskService.getNodePageOpinion(wiId, pageId));
    }

    /**
     * 获取特送退回的环节树
     *
     * @param taskId 任务ID
     */
    @ResponseBody
    @RequestMapping(value = "/getSpecialBackTree", method = RequestMethod.POST)
    public List getSpecialBackTree(@RequestParam("taskId") Long taskId) {
        return workflowInstanceService.getSpecialBackTree(taskId);
    }

    /**
     * 特送退回
     *
     * @param taskId  任务实例id
     * @param nodeId  环节id
     * @param opinion 办理意见
     */
    @ResponseBody
    @RequestMapping("/specialBackTo")
    public AjaxReturn specialBackTo(Long taskId, Long nodeId, String opinion, String fjId) {
        SysTask sysTask = sysTaskService.get(taskId);
        String result = workflowInstanceService.specialBack(sysTask.getNode_instance_id().getId(), nodeId, opinion, fjId);
        if (RxStringUtils.isEmpty(result)) {
            workflowInstanceService.processJava(taskId, "", "特送退回", fjId, "TSTH");
            return success();
        } else {
            return error().setMsg(result);
        }
    }

    /**
     * 退回(暂未使用)
     *
     * @param id     任务实例ID
     * @param reason 意见
     * @param branch 决策分支
     * @param fjId   附件ID
     */
    @ResponseBody
    @RequestMapping(value = "/backTask")
    public AjaxReturn backTask(Long id, String reason, String branch, String fjId) {
        List<Object> param = new ArrayList<>();
        param.add(id);
        param.add(reason);
        param.add(branch);
        String result = workflowInstanceService.returned(param);
        if (Workflow.BACK_SUCCESS.equals(result)) {
            workflowInstanceService.processJava(id, branch, reason, fjId, "BACK");
            return success().setMsg(result);
        }
        return error().setMsg(result);
    }

    /**
     * 是否能退回任务(暂未使用)
     *
     * @param id 任务ID
     */
    @ResponseBody
    @RequestMapping(value = "/isBackTask")
    public AjaxReturn isBackTask(Long id) {
        return success().setData(sysTaskService.isReturned(sysTaskService.get(id)));
    }

    /**
     * 下一环节办理人
     *
     * @param rwid     任务ID
     * @param decision 意见
     */
    @SuppressWarnings("unchecked")
    @ResponseBody
    @RequestMapping(value = "/getBlrList")
    public AjaxReturn getBlrList(Long rwid, String decision) throws UnsupportedEncodingException {
        if (RxStringUtils.isNotEmpty(decision)) {
            decision = URLDecoder.decode(URLDecoder.decode(decision, "UTF-8"), "UTF-8");
        }
        FastPagination fastPagination = new FastPagination();
        String checkNextNode = "";
        List result = workflowInstanceService.getBlrList(rwid, true, decision, null);
        if (result.size() > 0) {
            List list = (List) result.get(0);
            fastPagination.setRows(list);
            if ("下一环节是结束环节".equals(result.get(1))) {
                checkNextNode = "endNode";
            } else if (list == null || list.size() == 0) {
                checkNextNode = "noPeople";
            }
        }
        return success().setMsg(checkNextNode).setData(fastPagination);
    }

    /**
     * 委办列表
     *
     * @param map 搜索条件
     */
    @ResponseBody
    @RequestMapping(value = "/getEntrustList")
    public AjaxReturn getEntrustList(@SearchModel Object map) {
        return success().setData(sysEntrustService.getEntrustList((Map) map, super.getCurrentUserId()));
    }

    /**
     * 获取委办实体
     */
    @ResponseBody
    @RequestMapping(value = "/getEntrustById")
    public AjaxReturn getEntrustById(Long id) {
        return success().setData(sysEntrustService.getEntrustById(id));
    }

    /**
     * 保存委托
     */
    @ResponseBody
    @RequestMapping(value = "/saveEntrust")
    public AjaxReturn saveEntrust(@FormModel SysEntrust sysEntrust) {
        Boolean isCanSave = sysEntrustService.checkTime(sysEntrust, super.getCurrentUserId());
        if (isCanSave) {
            sysEntrust.setUserId(super.getCurrentUserId());
            return success().setData(sysEntrustService.saveEntrust(sysEntrust));
        } else {
            return error().setMsg("时间有误");
        }
    }

    /**
     * 停止委办
     */
    @ResponseBody
    @RequestMapping(value = "/stopEntrust")
    public AjaxReturn stopEntrust(Long id) {
        sysEntrustService.stopEntrust(id);
        return success();
    }

    /**
     * 获取聚合环节要退回的环节
     */
    @ResponseBody
    @RequestMapping(value = "/getBackNodes")
    public AjaxReturn getBackNodes(Long mergeNodeId) {
        return success().setData(workflowInstanceService.getBackNodes(mergeNodeId));
    }

}
