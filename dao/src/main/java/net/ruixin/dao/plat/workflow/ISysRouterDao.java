package net.ruixin.dao.plat.workflow;

import net.ruixin.domain.plat.workflow.structure.frame.SysWorkflow;
import net.ruixin.domain.plat.workflow.structure.route.SysRouter;

import java.util.List;
import java.util.Map;

/**
 * 流向dao
 * Created by Jealous on 2016-9-1.
 */
public interface ISysRouterDao {
    /**
     * 保存流向
     * @param router 流向
     */
    void save(SysRouter router);

    /**
     * 获取流向
     * @param routerId 流向ID
     * @return 流向实体
     */
    SysRouter get(Long routerId);

    /**
     * 通过流程找流向
     * @param workflow 工作流
     * @return 流向list
     */
    List<SysRouter> findRoutersByWorkflow(SysWorkflow workflow);

    /**
     * 通过流出节点查流向
     * @param endNodeId 流出节点ID
     * @return 流向list
     */
    List<SysRouter> findFromRoutersByNode(Long endNodeId);

    /**
     * 通过流入节点查流向
     * @param startNodeId 流入节点ID
     * @return 流向list
     */
    List<SysRouter> findToRoutersByNode(Long startNodeId);


    /**
     * 获取流程某个domid对应的流向
     * @param workflowId 流程id
     * @param domid dom元素ID
     * @return
     */

    SysRouter getRouterByWorkflowAndDomid(Long workflowId, String domid);

    Map<String,Object> getRouterMapByWorkflowAndDomid(Long workflowId, String domid);
}
