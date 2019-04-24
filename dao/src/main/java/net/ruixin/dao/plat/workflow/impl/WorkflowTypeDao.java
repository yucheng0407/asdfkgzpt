package net.ruixin.dao.plat.workflow.impl;

import net.ruixin.dao.plat.workflow.IWorkflowTypeDao;
import net.ruixin.domain.plat.workflow.structure.frame.SysWorkflowType;
import net.ruixin.util.hibernate.BaseDao;
import net.ruixin.util.tree.FlowTreeNode;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * Created by Jealous on 2016-8-11.
 * 流程类别Dao实现
 */
@SuppressWarnings({"SqlDialectInspection", "SqlNoDataSourceInspection"})
@Repository
public class WorkflowTypeDao extends BaseDao<SysWorkflowType> implements IWorkflowTypeDao {
    @Override
    public SysWorkflowType get(Long workflowTypeId) {
        return super.get(workflowTypeId);
    }

    @Override
    public List<SysWorkflowType> findByParent(Long id) {
        return super.findListByHql("from SysWorkflowType t where t.parentId = ? and t.sfyxSt = '1'", id);
    }

    @Override
    public List<SysWorkflowType> findTops() {
        return super.findListByHql("from SysWorkflowType t where (t.parentId is null or t.parentId = 1) and t.sfyxSt = '1' order by id asc");
    }

    @Override
    public boolean del(Long id) {
        super.delete(id);
        return true;
    }

    @Override
    public void save(SysWorkflowType sysWorkflowType) {
        super.saveOrUpdate(sysWorkflowType);
    }

    @Override
    public Integer hasChildrenWorkflowTypes(Long id) {
        String sql = "select count(1) from SYS_WORKFLOW_TYPE t where t.sfyx_st = '1' and t.PARENT_ID = ?";
        return super.getJdbcTemplate().queryForObject(sql, Integer.class, id);
    }

    @Override
    public List<FlowTreeNode> getSyncWorkflowTypeAndWorkflowTree(){
        String sql = " SELECT ID,\n" +
                "        'workflowtype' TYPE,\n" +
                "        't_' || ID AS HANDLEID,\n" +
                "        NAME,\n" +
                "        '' CODE,\n" +
                "        NVL2(PARENT_ID, 't_' || PARENT_ID, 't_') AS PID\n" +
                "   FROM SYS_WORKFLOW_TYPE\n" +
                "  WHERE SFYX_ST = '1'\n" +
                " UNION ALL\n" +
                " SELECT * FROM (SELECT ID,\n" +
                "        'workflow' TYPE,\n" +
                "        'f_' || ID AS HANDLEID,\n" +
                "        W.NAME || '(v' || W.VERSION || ')',\n" +
                "        CODE,\n" +
                "        't_' || TYPE_ID AS PID\n" +
                "   FROM SYS_WORKFLOW W\n" +
                "  WHERE W.SFYX_ST = '1' AND W.ISLATESTVERSION = '1')\n" +
                "  UNION ALL\n" +
                " SELECT * FROM (\n" +
                " SELECT W.ID,\n" +
                "        'workflow' TYPE,\n" +
                "        'f_' || W.ID AS HANDLEID,\n" +
                "        W.NAME || '(v' || W.VERSION || ')',\n" +
                "        W.CODE,\n" +
                "        'f_' || T.ID AS PID\n" +
                "   FROM SYS_WORKFLOW W\n" +
                "   LEFT JOIN SYS_WORKFLOW T ON T.CODE = W.CODE AND T.ISLATESTVERSION = '1'\n" +
                "  WHERE W.SFYX_ST = '1' AND W.ISLATESTVERSION = '0'\n" +
                "  ORDER BY W.CODE,W.VERSION DESC)";
        return getJdbcTemplate().query(sql, new FlowTreeNode.TreeRowMapper());
    }

    @Override
    public List<Map<String, Object>> getWfTypeTreeData() {
        return super.getJdbcTemplate().queryForList("SELECT T.ID \"id\",T.NAME \"name\",T.PARENT_ID \"pId\" FROM SYS_WORKFLOW_TYPE T WHERE T.SFYX_ST = '1' ");
    }

    @Override
    public List<FlowTreeNode> getFlowTypeAndFlowTree(){
        String sql = " SELECT ID,\n" +
                "        'workflowtype' TYPE,\n" +
                "        't_' || ID AS HANDLEID,\n" +
                "        NAME,\n" +
                "        '' CODE,\n" +
                "        NVL2(PARENT_ID, 't_' || PARENT_ID, 't_') AS PID\n" +
                "   FROM SYS_WORKFLOW_TYPE\n" +
                "  WHERE SFYX_ST = '1'\n" +
                " UNION ALL\n" +
                " SELECT * FROM (SELECT ID,\n" +
                "        'workflow' TYPE,\n" +
                "        'f_' || ID AS HANDLEID,\n" +
                "        W.NAME,\n" +
                "        CODE,\n" +
                "        't_' || TYPE_ID AS PID\n" +
                "   FROM SYS_WORKFLOW W\n" +
                "  WHERE W.SFYX_ST = '1'  AND W.STATUS = '1' )";
        return getJdbcTemplate().query(sql, new FlowTreeNode.TreeRowMapper());
    }
}
