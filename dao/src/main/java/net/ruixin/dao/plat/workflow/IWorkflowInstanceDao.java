package net.ruixin.dao.plat.workflow;

import net.ruixin.domain.plat.workflow.instance.SysWorkflowInstance;
import net.ruixin.enumerate.plat.TaskFinishEnum;
import net.ruixin.util.paginate.FastPagination;

import java.util.List;
import java.util.Map;

/**
 * @author Jealous
 * @date 2016-8-16
 * 流程实例类DAO接口
 */
public interface IWorkflowInstanceDao {
    /**
     * 签收任务
     *
     * @param id 任务ID
     * @return 签收结果
     */
    String signForTask(Long id);

    /**
     * 办理任务
     *
     * @param param 参数
     * @return 办理结果
     */
    String transact(List param);

    /**
     * 启动流程
     *
     * @param param 启动参数
     * @return 返回结果
     */
    String startup(List<Object> param);

    /**
     * 退回
     *
     * @param param 退回参数
     * @return 返回结果
     */
    String returned(List<Object> param);

    /**
     * 撤回
     *
     * @param id 任务实例ID
     * @return 返回结果
     */
    String withdraw(Long id);

    /**
     * 删除流程实例
     *
     * @param wiId 流程实例ID
     * @return 执行结果
     */
    String delWorkflowInstance(Long wiId);

    /**
     * 通过流程ID获取环节表单数
     *
     * @param wid 流程ID
     * @return 环节表单数
     */
    int getNodeSheetcount(Long wid);

    /**
     * 根据流程ID和业务数据ID
     * 获取当前办理人最新的任务
     * @param wId    流程ID
     * @param dataId 业务数据ID
     * @param userId 用户ID
     * @return 任务ID
     */
    Long getLatestTaskIdByDataId(Long wId, Long dataId, Long userId);

    /**
     * 根据流程实例ID获取当前办理人的最新任务
     * @param wiId 流程实例名称
     * @param userId 任务办理人
     * @param taskFinish 任务状态是否完成:0未完成,1完成
     * @return 任务ID
     */
    Long getLatestTaskIdByWiId(Long wiId, Long userId, TaskFinishEnum taskFinish);

    /**
     * 获取办理人
     *
     * @param rwid        任务ID
     * @param agree       是否同意
     * @param decision    决策条件
     * @param backNodeIds 指定退回的环节IDS
     * @return 办理人list
     */
    List getBlrList(Long rwid, Boolean agree, String decision, String backNodeIds);

    void updateWorkflowInstanceData(Long taskId, String columnName, Object columnValue);

    /**
     * 获取特送退回的环节树
     *
     * @param taskId 任务ID
     * @return List
     */
    List<Map<String, Object>> getSpecialBackTree(Long taskId);

    /**
     * 获取流程实例对象
     *
     * @param id 流程实例ID
     * @return 流程实例对象
     */
    SysWorkflowInstance get(Long id);

    /**
     * 流程批量办理
     *
     * @param userId    用户ID
     * @param wfiIds    流程实例ID序列
     * @param opinion   批量办理意见
     * @param handleTag 1 提交 0退回
     * @return str
     */
    String batchProcess(Long userId, String wfiIds, String opinion, String handleTag);

    /**
     * 插入流程涉及人员
     *
     * @param wiId 流程实例Id
     * @param nId  流程环节Id
     * @param ids  人员ids字符串，id以逗号隔开
     */
    void insertWorkflowAdditionUsers(Long wiId, Long nId, String ids);

    /**
     * 根据ID获取流程实例
     *
     * @param id 流程实例ID
     * @return SysWorkflowInstance
     */
    SysWorkflowInstance getById(Long id);

    /**
     * 验证由sql实现的规则是否能找到办理人
     *
     * @param flowCode 流程编码
     * @param dataId   业务数据ID
     * @return 执行结果
     */
    String hasDynamicUser(String flowCode, Long dataId);

    /**
     * 更新环节页面实例表中path（表SYS_NODE_PAGE_INSTANCE存在时使用）
     *
     * @param path   文件名/路径
     * @param pageId 页面id
     * @param winId  流程实例id
     */
    void updateWordpath(String path, Long pageId, Long winId);

    /**
     * 更新任务页面实例表中签章模板路径（表SYS_NODE_PAGE_INSTANCE不存在时使用）
     *
     * @param path     路径
     * @param pageCode 页面编码
     * @param wfInsId  流程实例ID
     */
    void updateWordPath(String path, String pageCode, Long wfInsId);

    /**
     * 根据任务id查找业务数据id
     *
     * @param id 任务id
     * @return 业务数据id
     */
    Long getDataIdByTaskId(Long id);

    /**
     * 特送退回
     *
     * @param nodeInstanceId 环节实例id
     * @param nodeId         环节id
     * @param opinion        办理意见
     * @param fjId           附件ID
     * @return string
     */
    String specialBack(Long nodeInstanceId, Long nodeId, String opinion, String fjId);

    void updateSysGlbBizWf(Long taskId, String columnName, Object columnValue);

    /**
     * 更新流程变量
     *
     * @param taskId 任务ID
     * @param wfVars 流程变量及值
     */
    void initVariable(Object taskId, String wfVars);

    /**
     * 获取聚合环节要退回的环节
     *
     * @param mergeNodeId 聚合环节ID
     * @return 要退回的环节
     */
    List<Map<String, Object>> getBackNodes(Long mergeNodeId);
}
