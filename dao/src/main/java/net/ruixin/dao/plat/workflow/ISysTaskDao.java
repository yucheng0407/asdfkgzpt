package net.ruixin.dao.plat.workflow;

import net.ruixin.domain.plat.organ.SysOrgan;
import net.ruixin.domain.plat.workflow.instance.SysTask;
import net.ruixin.domain.plat.workflow.instance.SysWorkflowInstance;
import net.ruixin.domain.plat.workflow.structure.node.SysNode;

import java.util.List;
import java.util.Map;

/**
 * 流程任务类操作接口
 *
 * @author wcy
 */
public interface ISysTaskDao {
    /**
     * 获取流程任务
     *
     * @param id 流程任务id
     * @return 流程任务
     */
    SysTask get(Long id);

    /**
     * 获取流程任务，通过流程实例ID和用户ID
     *
     * @param wId    流程实例ID
     * @param userId 用户ID
     * @return 流程任务
     */
    SysTask getTaskByWorkflowInstanceAndUser(Long wId, Long userId);

    /**
     * 根据流程实例查找任务
     *
     * @param id 流程实例ID
     * @return 任务list
     */
    List<SysTask> findTasksByWorkflowInstance(Long id);

    /**
     * 通过环节实例获取任务列表
     *
     * @param id 环节实例ID
     * @return 任务列表
     */
    List<SysTask> findTasksByNodeInstanceId(Long id);

    /**
     * 任务列表
     *
     * @param wfiId  环节实例ID
     * @param nodeId 环节ID
     * @return 任务列表
     */
    List taskPage(Long wfiId, Long nodeId);

    /**
     * 获取动态流程意见
     *
     * @param wiId 流程实例Id
     * @param spId 系统页面Id
     * @return 赋值结果
     */
    List getNodePageOpinion(Long wiId, Long spId);

    /**
     * 获取流程意见（暂为实现打印，包含页面编码）
     *
     * @param wiId 流程实例Id
     * @return 赋值结果
     */
    List getPageOpinionWithCode(Long wiId);

    /**
     * 将流程意见存入临时表
     *
     * @param auditOpinion 意见
     */
    void saveTmpAuditOpinion(String auditOpinion);

    /**
     * 根据环节ID获取页面
     *
     * @param nodeId 环节ID
     * @return 页面list
     */
    List<Map<String, Object>> getSheetByNodeId(Long nodeId);

    /**
     * 根据流程编码获取第一活动环节实体
     *
     * @param flowCode 流程编码
     * @return 活动环节实体
     */
    SysNode getFirstActivityNode(String flowCode);

    /**
     * 根据任务ID获取流程自带按钮显隐标志
     *
     * @param taskId 任务ID
     * @param userId 用户ID
     * @param nodeId 环节ID
     * @return 按钮显隐标志
     */
    String getHandleTypes(Long taskId, Long nodeId, Long userId);

    /**
     * 根据机构ID获取单个机构实体
     *
     * @param organId 机构ID
     * @return 机构实体
     */
    SysOrgan getOrganById(Long organId);

    /**
     * 更新草稿数据
     *
     * @param id      任务ID
     * @param tmpJson 草稿数据
     */
    void updateTmpData(Long id, String tmpJson);

    /**
     * 获取运行中任务列表
     * @param workflowInstance
     * @return
     */
    List<SysTask> getRunningTasks(SysWorkflowInstance workflowInstance);


    /**
     * 获取环节的任务实例
     * @param wfId
     * @param wfInsId
     * @param nodeDomId
     * @return
     */
    List<SysTask> getTaskInstanceByNode(Long wfId, Long wfInsId, String nodeDomId);

    /**
     * 获取流程实例最新的任务信息
     * @param wfInstId
     * @return
     */
    List<Map<String,Object>> getLatestTaskInstanceList(Long wfInstId);
}
