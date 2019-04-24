package net.ruixin.service.plat.workflow.impl;

import net.ruixin.dao.plat.workflow.*;
import net.ruixin.domain.constant.Workflow;
import net.ruixin.domain.plat.workflow.instance.SysNodeInstance;
import net.ruixin.domain.plat.workflow.instance.SysTask;
import net.ruixin.domain.plat.workflow.instance.SysWorkflowInstance;
import net.ruixin.domain.plat.workflow.instance.SysWorkflowVariableInstance;
import net.ruixin.domain.plat.workflow.structure.frame.SysWorkflow;
import net.ruixin.domain.plat.workflow.structure.frame.SysWorkflowVariable;
import net.ruixin.domain.plat.workflow.structure.node.SysNode;
import net.ruixin.domain.plat.workflow.structure.node.SysTransactNode;
import net.ruixin.domain.plat.workflow.structure.page.SysWorkflowPage;
import net.ruixin.domain.plat.workflow.structure.route.SysRouter;
import net.ruixin.enumerate.plat.SfyxSt;
import net.ruixin.enumerate.plat.TaskFinishEnum;
import net.ruixin.util.shiro.ShiroKit;
import net.ruixin.service.plat.workflow.ISysTaskService;
import net.ruixin.service.plat.workflow.IWorkflowInstanceService;
import net.ruixin.service.plat.workflow.IWorkflowService;
import net.ruixin.util.data.AjaxReturn;
import net.ruixin.util.data.FlowParam;
import net.ruixin.util.tools.RxStringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Jealous on 2016-8-16.
 * 流程实例接口实现
 */
@Service
@Transactional
public class WorkflowInstanceService implements IWorkflowInstanceService, ApplicationContextAware {
    private ApplicationContext applicationContext;

    @Autowired
    private ISysTaskDao sysTaskDao;

    @Autowired
    private ISysWorkflowVariableDao sysWorkflowVariableDao;

    @Autowired
    private ISysWorkflowVariableInstanceDao sysWorkflowVariableInstanceDao;

    @Autowired
    private IWorkflowInstanceDao workflowInstanceDao;

    @Autowired
    private ISysNodeDao sysNodeDao;

    @Autowired
    private ISysWorkflowPageDao sysWorkflowPageDao;

    @Autowired
    private ISysTaskService sysTaskService;

    @Autowired
    private ISysRouterDao routerDao;

    @Autowired
    private ISysNodeInstanceDao sysNodeInstanceDao;

    @Autowired
    private ISysTaskPageInstanceDao sysTaskPageInstanceDao;

    @Autowired
    private IWorkflowService workflowService;

    @Autowired
    private ISysWorkflowPageDataDao workflowPageDataDao;

    private static final Logger log = LoggerFactory.getLogger(WorkflowInstanceService.class);

    @Override
    public String startup(List<Object> param) {
        return workflowInstanceDao.startup(param);
    }

    @Override
    public String signForTask(Long id) {
        return workflowInstanceDao.signForTask(id);
    }

    @Override
    public AjaxReturn transact(List param, String auditOpinion, String wfVars, Long id, String branch, String opinion, String fjId) {
        //保存审批意见到临时表，存储过程引擎再去读取
        if (RxStringUtils.isNotEmpty(auditOpinion)) {
            sysTaskService.saveTmpAuditOpinion(auditOpinion);
        }
        //更新流程变量
        if (RxStringUtils.isNotEmpty(wfVars)) {
            workflowInstanceDao.initVariable(param.get(0), wfVars);
        }
        //任务办理
        String result = workflowInstanceDao.transact(param);
        AjaxReturn ar = new AjaxReturn();
        ar.setSuccess(false).setMsg(result);
        if (result.contains(Workflow.SUBMIT_SUCCESS)) {
            //提交后处理
            processJava(id, branch, opinion, fjId, Workflow.SUBMIT);
            ar.setSuccess(true);
        } else if (result.contains(Workflow.BACK_SUCCESS)) {
            //退回后处理
            processJava(id, branch, opinion, fjId, Workflow.BACK);
            ar.setSuccess(true);
        }
        return ar;
    }

    @Override
    public void processJava(Long id, String branch, String opinion, String fjId, String type) {
        SysTask task = sysTaskService.get(id);
        SysTransactNode transactNode = sysNodeDao.getTransactNode(task.getNode_instance_id().getNode_id().getId());
        String processSql;
        //撤回后进入前置程序
        if (Workflow.RECOVER.equals(type)) {
            processSql = transactNode.getStartupProcess();
        } else { //进入后置程序
            processSql = transactNode.getFinishProcess();
            if (processSql == null) {
                //流程实例状态已完成 查找流程后处理
                if ("0".equals(task.getWorkflow_instance_id().getStatus())) {
                    processSql = task.getWorkflow_instance_id().getWorkflow_id().getFinishProcessSql();
                }
            }
        }
        if (processSql != null) {
            String[] ps = processSql.split("JAVA:");
            if (ps.length > 1) {
                for (int i = 1; i < ps.length; i++) {
                    String pName = RxStringUtils.toLowerCaseFirstOne(ps[i].trim());
                    SupportProgram supportProgram = (SupportProgram) applicationContext.getBean(pName);
                    supportProgram.setNodeInstance(task.getNode_instance_id());
                    supportProgram.setWorkflowInstance(task.getWorkflow_instance_id());
                    supportProgram.setSysTask(task);
                    supportProgram.run(opinion, branch, fjId, type);
                }
            }
        }
    }

    @Override
    public String returned(List<Object> param) {
        return workflowInstanceDao.returned(param);
    }

    @Override
    public AjaxReturn withdraw(Long id) {
        SysTask task = sysTaskDao.get(id);
        if (task == null) {
            throw new RuntimeException("未找到id为" + id + "的流程任务");
        }
        Long currentUserId = ShiroKit.getUser().getId();
        if(!currentUserId.equals(task.getUser_id().getId())) {
            log.debug("当前登录用户不是要撤回任务的办理人");
            id = workflowInstanceDao.getLatestTaskIdByWiId(task.getWorkflow_instance_id().getId(), currentUserId, TaskFinishEnum.YES);
            if(id == null) {
                throw new RuntimeException("当前用户不存在要撤回的任务");
            }
        }
        String result = workflowInstanceDao.withdraw(id);
        if (Workflow.RECOVER_SUCCESS.equals(result)) {
            processJava(id, null, null, null, Workflow.RECOVER);
            return new AjaxReturn(true).setMsg(result);
        } else {
            return new AjaxReturn(false).setMsg(result);
        }
    }

    @Transactional
    @Override
    public String delWorkflowInstance(Long wiId) {
        //删除关联data表中的数据
        workflowPageDataDao.delDate(wiId);
        return workflowInstanceDao.delWorkflowInstance(wiId);
    }

    @Override
    public Long getLatestTaskIdByWiId(Long wiId, Long userId) {
        if(wiId == null) {
            throw new RuntimeException("获取最新任务时流程实例ID不能为空");
        }
        Long taskId = null;
        if(userId != null) {
            //若用户ID不为空首先获取当前用户的未完成任务
            taskId = workflowInstanceDao.getLatestTaskIdByWiId(wiId, userId, TaskFinishEnum.NO);
        }
        //若未获取到任何任务获取当前流程实例的最新任务
        if(taskId == null) {
            taskId = workflowInstanceDao.getLatestTaskIdByWiId(wiId, null, null);
        }
        return taskId;
    }

    @Override
    public Long getLatestTaskIdByDataId(Long wId, Long dataId, Long userId) {
        if(wId == null || dataId == null) {
            throw new RuntimeException("获取最新任务时流程ID和业务数据ID不能为空");
        }
        Long taskId = workflowInstanceDao.getLatestTaskIdByDataId(wId, dataId, userId);
        if (taskId == null) {
            taskId = workflowInstanceDao.getLatestTaskIdByDataId(wId, dataId, null);
        }
        return taskId;
    }

    @Override
    public String getWorkflowSheetUrl(String flowCode, Long dataId) {
        SysWorkflow wf = workflowService.findWorkflowByCode(flowCode);
        if (wf != null && wf.getId() != null) {
            List<SysWorkflowPage> list = sysWorkflowPageDao.findWorkflowSheetsByWorkflow(wf.getId());
            if (list.size() > 0) {
                return list.get(0).getResource().getUrl() + "?edit=false&id=" + dataId;
            }
        }
        return null;
    }

    @Override
    public List getBlrList(Long rwid, Boolean agree, String decision, String backNodeIds) {
        return workflowInstanceDao.getBlrList(rwid, agree, decision, backNodeIds);
    }

    @Override
    public void updateWorkflowInstanceData(FlowParam param, Long dataId, String title) {
        workflowInstanceDao.updateWorkflowInstanceData(param.getTaskId(), Workflow.COLUMN_DATA_ID, dataId);
        workflowInstanceDao.updateWorkflowInstanceData(param.getTaskId(), Workflow.COLUMN_TITLE, title);
        workflowInstanceDao.updateSysGlbBizWf(param.getTaskId(), Workflow.COLUMN_DATA_ID, dataId);
        workflowInstanceDao.updateSysGlbBizWf(param.getTaskId(), Workflow.COLUMN_TITLE, title);
    }

    @Override
    public void updateWorkflowInstanceData(Long taskId, String columnName, Object columnValue) {
        workflowInstanceDao.updateWorkflowInstanceData(taskId, columnName, columnValue);
        workflowInstanceDao.updateSysGlbBizWf(taskId, columnName, columnValue);
    }

    @Override
    public void updateTaskPageInstanceData(FlowParam param, Long dataId) {
        sysTaskPageInstanceDao.updateTaskPageInstanceData(dataId, param.getTaskId(), param.getNpId());
    }

    @Override
    public void updateTmpData(Long taskId, Long nodePageId, String tmpData) {
        sysTaskPageInstanceDao.updateTmpData(taskId, nodePageId, tmpData);
    }

    @Override
    public void emptyTmpData(Long taskId) {
        sysTaskPageInstanceDao.emptyTmpData(taskId);
    }

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        this.applicationContext = applicationContext;
    }

    /**
     * 获取特送退回的环节树
     *
     * @param taskId 任务ID
     */
    @Override
    public List getSpecialBackTree(Long taskId) {
        List<Map<String, Object>> specialBackTreeList = new ArrayList<>();
        List<Map<String, Object>> getSpecialBackTreeList = workflowInstanceDao.getSpecialBackTree(taskId);
        for (Map map : getSpecialBackTreeList) {
            Map<String, Object> result = new HashMap<>();
            result.put("id", map.get("NODE_ID").toString());
            result.put("pId", 0);
            result.put("name", map.get("NAME").toString());
            result.put("isParent", false);
            result.put("open", false);
            specialBackTreeList.add(result);
        }
        return specialBackTreeList;
    }

    @Override
    public Object getSimpleWorkflowJSON(Long id, String flowCode) {
        Map<String, Object> result = new HashMap<>();
        SysWorkflow workflow = null;
        if(id != null) {
            SysWorkflowInstance wfInstance = workflowInstanceDao.get(id);
            workflow = wfInstance.getWorkflow_id();
        } else {
            workflow = workflowService.findWorkflowByCode(flowCode);//获取流程
        }
        List<SysNode> nodes = sysNodeDao.findNodesByWorkflow(workflow);  //获取环节
        List<SysRouter> routers = routerDao.findRoutersByWorkflow(workflow);  //获取流向
        Map<String, Object> workflowStructure = new HashMap<>();
        workflowStructure.put("workflow", workflow);
        workflowStructure.put("nodes", nodes);
        workflowStructure.put("routers", routers);
        result.put("Workflow", workflowStructure);
        if (null != id) { //获取实例数据
            SysWorkflowInstance workflowInstance = workflowInstanceDao.get(id);
            List<SysNodeInstance> nodeInstances = sysNodeInstanceDao.getSysNodeInstanceListByWorkflowInstanceId(workflowInstance.getId());
            result.put("WorkflowInstance", nodeInstances);
            result.put("instance", workflowInstance);
            // 找到运行中的环节ID
            String nodeIds = sysNodeInstanceDao.getRunningNodeIds(workflowInstance.getId());
            if (RxStringUtils.isNotEmpty(nodeIds)) {
                result.put("nodeIds", nodeIds);
            }
        }
        return result;
    }

    @Override
    public String batchProcess(Long userId, String wfiIds, String opinion, String handleTag) {
        return workflowInstanceDao.batchProcess(userId, wfiIds, opinion, handleTag);
    }

    @Override
    public boolean initVariable(FlowParam param, String name, String value) {
        // 通过任务获得流程实例
        Long taskId = param.getTaskId();
        if (taskId != null) {
            SysTask task = sysTaskDao.get(taskId);
            SysWorkflowInstance workflowInstance = task.getWorkflow_instance_id();
            SysWorkflowVariable workflowVariable = sysWorkflowVariableDao.getByNameAndWfi(name, workflowInstance.getWorkflow_id());
            SysWorkflowVariableInstance swvi = sysWorkflowVariableInstanceDao.getByVariableAndWfi(workflowVariable, workflowInstance);
            if (swvi == null) {
                swvi = new SysWorkflowVariableInstance();
            }
            swvi.setWorkflow_instance_id(workflowInstance);
            swvi.setVariable_id(workflowVariable);
            swvi.setValue(value);
            swvi.setSfyxSt(SfyxSt.VALID);
            sysWorkflowVariableInstanceDao.save(swvi);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public List getPageOpinionWithCode(Long wiId) {
        return sysTaskDao.getPageOpinionWithCode(wiId);
    }

    @Override
    public void insertWorkflowAdditionUsers(FlowParam param, String ids) {
        workflowInstanceDao.insertWorkflowAdditionUsers(param.getWiId(), param.getnId(), ids);
    }

    @Override
    public SysWorkflowInstance getById(Long id) {
        return workflowInstanceDao.getById(id);
    }

    @Override
    public SysNode findRunningNode(SysWorkflowInstance win) {
        // 找到运行中的环节ID
        SysNodeInstance node = sysNodeInstanceDao.findRunningNode(win);
        if (null != node) {
            return node.getNode_id();
        } else {
            return null;
        }
    }

    @Override
    public String hasDynamicUser(String flowCode, Long dataId) {
        return workflowInstanceDao.hasDynamicUser(flowCode, dataId);
    }

    @Override
    public void updateWordpath(String path, Long pageId, Long winId) {
        workflowInstanceDao.updateWordpath(path, pageId, winId);
    }

    @Override
    public void updateWordPath(String path, String pageCode, Long wfInsId) {
        workflowInstanceDao.updateWordPath(path, pageCode, wfInsId);
    }

    @Override
    public Long getDataIdByTaskId(Long id) {
        return workflowInstanceDao.getDataIdByTaskId(id);
    }

    @Override
    public String specialBack(Long nodeInstanceId, Long nodeId, String opinion, String fjId) {
        return workflowInstanceDao.specialBack(nodeInstanceId, nodeId, opinion, fjId);
    }

    @Override
    public void initVariable(Long id, String wfVars) {
        workflowInstanceDao.initVariable(id, wfVars);
    }

    @Override
    public List<Map<String, Object>> getBackNodes(Long mergeNodeId) {
        return workflowInstanceDao.getBackNodes(mergeNodeId);
    }

    @Override
    public void pressTask(Long taskId, String content){
        //发起催办任务
        SysTask fromTask = sysTaskDao.get(taskId);
        Long currentUserId = ShiroKit.getUser().getId();
        if(!currentUserId.equals(fromTask.getUser_id().getId())) {
            log.debug("当前登录用户不是催办任务的办理人");
            taskId = workflowInstanceDao.getLatestTaskIdByWiId(fromTask.getWorkflow_instance_id().getId(), currentUserId, TaskFinishEnum.YES);
            if(taskId == null) {
                throw new RuntimeException("当前用户不存在要催办的任务");
            }
            fromTask = sysTaskDao.get(taskId);
        }
        //被催办任务集合
        List<SysTask> toTasks = sysTaskDao.getRunningTasks(fromTask.getWorkflow_instance_id());
        for(SysTask toTask : toTasks){
            System.out.println("催办信息:"+fromTask.getUser_id().getUserName()+"催办了"+
                    toTask.getUser_id().getUserName()+"("+fromTask.getWorkflow_instance_id().getTitle()+")。"+content);
        }
    }
}
