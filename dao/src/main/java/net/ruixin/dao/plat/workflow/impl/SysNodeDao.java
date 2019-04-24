package net.ruixin.dao.plat.workflow.impl;

import net.ruixin.dao.plat.workflow.ISysNodeDao;
import net.ruixin.domain.plat.workflow.structure.frame.SysWorkflow;
import net.ruixin.domain.plat.workflow.structure.node.SysActivityNode;
import net.ruixin.domain.plat.workflow.structure.node.SysDecisionNode;
import net.ruixin.domain.plat.workflow.structure.node.SysNode;
import net.ruixin.domain.plat.workflow.structure.node.SysTransactNode;
import net.ruixin.util.hibernate.BaseDao;
import net.ruixin.util.shiro.ShiroKit;
import oracle.jdbc.OracleTypes;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Jealous on 2016-8-10.
 * 环节Dao实现
 */
@SuppressWarnings({"SqlDialectInspection", "SqlNoDataSourceInspection"})
@Repository
public class SysNodeDao extends BaseDao<SysNode> implements ISysNodeDao {
    @Override
    public List<SysNode> findNodesByWorkflow(SysWorkflow workflow) {
        return super.findListByHql("from SysNode t where t.sysWorkflow = ? and t.sfyxSt = '1'", workflow);
    }

    @Override
    public SysNode getNodeByWorkflowAndDomid(Long workflow, String domid) {
        return super.getByHql("from SysNode n where n.sysWorkflow.id=? and n.sfyxSt = '1' and n.domid=?", workflow, domid);
    }

    @Override
    public List<SysNode> findNodeListByWorkflow(Long wfId){
        return super.findListByHql("from SysNode n where n.sysWorkflow.id=? and n.sfyxSt = '1'",wfId);
    }

    @Override
    public List<SysNode> findNodeListByWorkflowAndDomids(Long wfId, String[] domidArray) {
        return super.getSession().createQuery("from SysNode n where n.sysWorkflow.id=:id and n.sfyxSt = '1' and n.domid in (:domid)")
                .setParameter("id", wfId)
                .setParameterList("domid", domidArray).list();
    }

    @Override
    public SysTransactNode getTransactNode(Long id) {
        return (SysTransactNode) super.getByHql("from SysTransactNode s where s.id = ? and s.sfyxSt = '1'", id);
    }

    @Override
    public Integer getNodeMaxSort(Long wfId) {
        return super.getJdbcTemplate().queryForObject("SELECT NVL(MAX(SORT),0) FROM SYS_NODE T WHERE WORKFLOW_ID=? AND SFYX_ST='1'",
                Integer.class, wfId);
    }

    @Override
    public void save(SysNode node) {
        super.saveOrUpdate(node);
    }

    @Override
    public SysActivityNode getActivityNode(Long id) {
        return (SysActivityNode) super.getByHql("from SysActivityNode s where id = ?", id);
    }

    @Override
    public SysDecisionNode getDecisionNode(Long id) {
        return (SysDecisionNode) super.getByHql("from SysDecisionNode s where id = ?", id);
    }

    @Override
    public SysNode get(Long id) {
        return super.get(id);
    }

    @Override
    public List findNextTransactNodes(Long nodeId, String branch, Long wid) {
        List<Object> param = new ArrayList<>();
        param.add(nodeId);
        param.add(branch);
        param.add(wid);
        List<Integer> data = new ArrayList<>();
        data.add(OracleTypes.CURSOR);
        data.add(OracleTypes.VARCHAR);
        return super.prepareCallAndReturnCustom("{call PKG_WF.P_WORKFLOW_NEXT_NODE(?,?,?,?,?,?)}", param, data);
    }

    @Override
    public String copyNodesRelatedObjects(SysNode sourceNode, SysNode targetNode) {
        Long userId = 0L;
        if (ShiroKit.getUser() != null) {
            userId = ShiroKit.getUser().getId();
        }
        return super.prepareCallAndReturn("{call PKG_WF.P_NODE_COPY_RELATED_OBJECTS(?,?,?,?,?)}", sourceNode.getId(), targetNode.getId(), userId);
    }
}
