package net.ruixin.service.plat.workflow;

import net.ruixin.domain.plat.workflow.instance.SysTask;
import net.ruixin.domain.plat.workflow.structure.frame.SysWorkflow;
import net.ruixin.domain.plat.workflow.structure.node.SysNode;
import net.ruixin.domain.plat.workflow.structure.route.SysRouter;

import java.util.List;
import java.util.Map;

public interface IBpmnService {

    /**
     * 获取流程
     * @param id
     * @return
     */
    SysWorkflow getBpmnProcess(Long id);

    /**
     * 获取流程环节
     * @param wfId
     * @return
     */
    List<Map<String, Object>> getBpmnNodeList(Long wfId);

    /**
     * 获取用户任务Json
     * @param wfId 流程ID
     * @param domid DOM元素ID
     * @return
     */
    Map<String,Object> getBpmnUserTask(Long wfId, String domid);

    List<Map<String, Object>> getBpmnUserTaskList(Long wfId,String[] domidArray);

    SysNode getBpmnUserTask(Long sysNodeId);

    SysNode getBpmnUserTask(SysNode sysNode);

    /**
     * 获取简单节点
     * @param wfId 流程ID
     * @param domid DOM元素ID
     * @return
     */
    SysNode getBpmnSimpleNode(Long wfId, String domid);

    /**
     * 获取简单流向
     * @param wfId 流程ID
     * @param domid DOM元素ID
     * @return
     */
    Map<String, Object> getBpmnSimpleRouter(Long wfId, String domid);

    /**
     * 获取环节的任务实例
     * @param wfId 流程id
     * @param wfInsId 流程实例id
     * @param nodeDomId 环节dom id
     * @return
     */
    List<SysTask> getTaskInstanceByNode(Long wfId,Long wfInsId,String nodeDomId);

    /**
     * 切换流程发布状态
     * @param id 流程id
     * @param status 发布状态
     */
    void switchWorkflowStatus(Long id,String status);
}
