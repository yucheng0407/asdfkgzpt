package net.ruixin.dao.plat.workflow.impl;

import net.ruixin.dao.plat.workflow.ISysNodeInstanceDao;
import net.ruixin.domain.constant.Workflow;
import net.ruixin.domain.plat.workflow.instance.SysNodeInstance;
import net.ruixin.domain.plat.workflow.instance.SysWorkflowInstance;
import net.ruixin.enumerate.plat.NodeType;
import net.ruixin.util.hibernate.BaseDao;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 环节实例Dao实现
 * Created by Jealous on 2016-10-25.
 */
@SuppressWarnings({"SqlDialectInspection", "SqlNoDataSourceInspection"})
@Repository
public class SysNodeInstanceDao extends BaseDao<SysNodeInstance> implements ISysNodeInstanceDao{
    @Override
    public List<SysNodeInstance> getSysNodeInstanceListByWorkflowInstanceId(Long id) {
        return super.findListByHql("from SysNodeInstance t where t.workflow_instance_id.id=? order by t.id desc",id);
    }

//    @Override
//    public List<SysNodeInstance> findNodeInstancesByWorkflowInstance(SysWorkflowInstance workflowInstance) {
//        return super.findListByHql("from SysNodeInstance t where t.workflow_instance_id=? order by t.id desc",workflowInstance);
//    }

    @Override
    public List<SysNodeInstance> findActivityNodeInstanceByWorkflowInstance(SysWorkflowInstance workflowInstance){
        return super.findListByHql("from SysNodeInstance n where n.workflow_instance_id=? and n.node_id.type=?",
                workflowInstance,NodeType.ACTIVITY_NODE);
    }

    @Override
    public SysNodeInstance findRunningNode(SysWorkflowInstance workflowInstance) {
        return super.getByHql("from SysNodeInstance t where t.status='1' and t.workflow_instance_id=?",workflowInstance);
    }

    @Override
    public String getRunningNodeIds(Long wiId) {
        return super.getJdbcTemplate().queryForObject("select wm_concat(t.node_id) from sys_node_instance t where t.workflow_instance_id = ? and t.status='1' and t.sfyx_st = '1'",String.class,wiId);
    }

    @Override
    public List<SysNodeInstance> getTransactList(Long workflowInstanceId, Long transactNodeid) {
        return super.findListByHql("from SysNodeInstance t where t.workflow_instance_id.id=? and t.node_id.id=? order by t.id desc",workflowInstanceId,transactNodeid);
    }
}
