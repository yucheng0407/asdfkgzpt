package net.ruixin.service.plat.workflow.impl;

import net.ruixin.dao.plat.workflow.*;
import net.ruixin.domain.constant.Workflow;
import net.ruixin.domain.plat.workflow.instance.SysTask;
import net.ruixin.domain.plat.workflow.structure.frame.SysWorkflow;
import net.ruixin.domain.plat.workflow.structure.node.SysActivityNode;
import net.ruixin.domain.plat.workflow.structure.node.SysNode;
import net.ruixin.domain.plat.workflow.structure.route.SysRouter;
import net.ruixin.enumerate.plat.NodeType;
import net.ruixin.enumerate.plat.WorkflowSaveStatus;
import net.ruixin.service.plat.workflow.IBpmnService;
import net.ruixin.util.support.BeanKit;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class BpmnService implements IBpmnService {
    @Autowired
    private IWorkflowDao workflowDao;

    @Autowired
    private ISysWorkflowPageDao workflowPageDao;

    @Autowired
    private ISysWorkflowVariableDao workflowVariableDao;

    @Autowired
    private ISysNodeDao nodeDao;

    @Autowired
    private ISysNodePageDao nodePageDao;

    @Autowired
    private ISysNodeCandidateDao nodeCandidateDao;

    @Autowired
    private ISysNodeButtonDao nodeButtonDao;

    @Autowired
    private ISysRouterDao routerDao;

    @Autowired
    private ISysTaskDao taskDao;

    @Override
    public SysWorkflow getBpmnProcess(Long id) {
        SysWorkflow workflow = workflowDao.get(id);
        workflow.setSheets(workflowPageDao.querySheetsByWorkflow(id));
        workflow.setWorkflowVariables(workflowVariableDao.findVariableByWorkflow(workflow));
        workflow.setNodeMaxSort(nodeDao.getNodeMaxSort(id));
        //获取node
        workflow.setNodes(this.getBpmnNodeList(id));
        //获取router
        workflow.setRouters(routerDao.findRoutersByWorkflow(workflow));
        return workflow;
    }

    @Override
    public List<Map<String, Object>> getBpmnNodeList(Long wfId) {
        List<SysNode> sysNodeList = nodeDao.findNodeListByWorkflow(wfId);
        List<Map<String, Object>> mapList = new ArrayList<>();
        if (sysNodeList != null && sysNodeList.size() > 0) {
            for (SysNode sysNode : sysNodeList) {
                //活动环节
                if (sysNode.getType().equals(NodeType.ACTIVITY_NODE)) {
                    SysActivityNode sysActivityNode = nodeDao.getActivityNode(sysNode.getId());
                    mapList.add(BeanKit.fillMapWithBean(BeanKit.beanToMap(this.getBpmnUserTask(sysNode), "sysWorkflow"), sysActivityNode, "sysWorkflow"));
                } else {
                    mapList.add(BeanKit.beanToMap(sysNode, "sysWorkflow"));
                }
            }
        }
        return mapList;
    }


    @Override
    public Map<String, Object> getBpmnUserTask(Long wfId, String domid) {
        SysNode sysNode = nodeDao.getNodeByWorkflowAndDomid(wfId, domid);
        if (sysNode != null) {
            SysActivityNode sysActivityNode = nodeDao.getActivityNode(sysNode.getId());
            return BeanKit.fillMapWithBean(BeanKit.beanToMap(this.getBpmnUserTask(sysNode)), sysActivityNode);
        }
        return null;
    }

    @Override
    public List<Map<String, Object>> getBpmnUserTaskList(Long wfId, String[] domidArray) {
        List<SysNode> userTaskList = nodeDao.findNodeListByWorkflowAndDomids(wfId, domidArray);
        List<Map<String, Object>> mapList = new ArrayList<>();
        if (userTaskList != null && userTaskList.size() > 0) {
            for (SysNode userTask : userTaskList) {
                SysActivityNode sysActivityNode = nodeDao.getActivityNode(userTask.getId());
                mapList.add(BeanKit.fillMapWithBean(BeanKit.beanToMap(this.getBpmnUserTask(userTask)), sysActivityNode));
            }
        }
        return mapList;
    }

    @Override
    public SysNode getBpmnUserTask(Long sysNodeId) {
        return this.getBpmnUserTask(nodeDao.get(sysNodeId));
    }

    @Override
    public SysNode getBpmnUserTask(SysNode sysNode) {
        //办理人
        sysNode.setCandidates(nodeCandidateDao.queryCandidateByNode(sysNode.getId()));
        //表单
        sysNode.setSheets(nodePageDao.querySheetsByNode(sysNode.getId()));
        //按钮
        sysNode.setButtons(nodeButtonDao.queryButtonsByNode(sysNode.getId()));
        return sysNode;
    }

    @Override
    public SysNode getBpmnSimpleNode(Long wfId, String domid) {
        SysWorkflow workflow = workflowDao.get(wfId);
        if (workflow != null) {
            return nodeDao.getNodeByWorkflowAndDomid(workflow.getId(), domid);
        }
        return null;
    }

    @Override
    public Map<String, Object> getBpmnSimpleRouter(Long wfId, String domid) {
        SysWorkflow workflow = workflowDao.get(wfId);
        if (workflow != null) {
            return routerDao.getRouterMapByWorkflowAndDomid(workflow.getId(), domid);
        }
        return null;
    }

    @Override
    public List<SysTask> getTaskInstanceByNode(Long wfId, Long wfInsId, String nodeDomId) {
        return taskDao.getTaskInstanceByNode(wfId, wfInsId, nodeDomId);
    }


    @Override
    @Transactional
    public void switchWorkflowStatus(Long id, String status) {
        SysWorkflow workflow = workflowDao.get(id);
        if (workflow != null) {
            if (status.equals(String.valueOf(WorkflowSaveStatus.RELEASE.getId()))) {
                //若启用该版本，则停用当前主版本
                workflowDao.batchHandleWorkflowStatus(workflow.getCode());
            }
            workflow.setStatus(status);
            workflowDao.update(workflow);
        }
    }
}
