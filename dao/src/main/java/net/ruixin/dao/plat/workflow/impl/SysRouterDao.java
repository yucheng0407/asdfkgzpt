package net.ruixin.dao.plat.workflow.impl;

import net.ruixin.dao.plat.workflow.ISysRouterDao;
import net.ruixin.domain.plat.workflow.structure.frame.SysWorkflow;
import net.ruixin.domain.plat.workflow.structure.route.SysRouter;
import net.ruixin.util.hibernate.BaseDao;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 流向dao实现
 * Created by Jealous on 2016-9-1.
 */
@SuppressWarnings({"SqlDialectInspection", "SqlNoDataSourceInspection"})
@Repository
public class SysRouterDao extends BaseDao<SysRouter> implements ISysRouterDao {
    @Override
    public void save(SysRouter router) {
        super.saveOrUpdate(router);
    }

    @Override
    public SysRouter get(Long routerId) {
        return super.get(routerId);
    }

    @Override
    public List<SysRouter> findRoutersByWorkflow(SysWorkflow workflow) {
        return super.findListByHql("from SysRouter t where t.workflow = ? and t.sfyxSt = '1'", workflow);
    }

    @Override
    public List<SysRouter> findFromRoutersByNode(Long endNodeId) {
        return super.findListByHql("from SysRouter t where t.endNode.id = ? and t.sfyxSt = '1'", endNodeId);
    }

    @Override
    public List<SysRouter> findToRoutersByNode(Long startNodeId) {
        return super.findListByHql("from SysRouter t where t.startNode.id = ? and t.sfyxSt = '1'", startNodeId);
    }


    @Override
    public SysRouter getRouterByWorkflowAndDomid(Long workflowId, String domid) {
        return super.getByHql("from SysRouter r where r.workflow.id=? and r.domid=?", workflowId, domid);
    }


    @Override
    public Map<String, Object> getRouterMapByWorkflowAndDomid(Long workflowId, String domid) {
        List<Map<String, Object>> routers = super.getJdbcTemplate().query("SELECT ID, \n" +
                        "NAME, \n" +
                        "BRANCH, \n" +
                        "START_NODE_ID, \n" +
                        "END_NODE_ID, \n" +
                        "WORKFLOW_ID, \n" +
                        "CJR_ID, \n" +
                        "CJSJ, \n" +
                        "SFYX_ST, \n" +
                        "DOM_ID FROM SYS_ROUTER R WHERE R.SFYX_ST='1' AND R.WORKFLOW_ID=? AND R.DOM_ID=?",
                new RowMapper<Map<String, Object>>() {
                    @Override
                    public Map<String, Object> mapRow(ResultSet rs, int rowNum) throws SQLException {
                        Map<String, Object> row = new HashMap<>();
                        row.put("id", rs.getString("ID"));
                        row.put("name", rs.getString("NAME"));
                        row.put("branch", rs.getString("BRANCH"));
                        row.put("startNodeId", rs.getString("START_NODE_ID"));
                        row.put("endNodeId", rs.getString("END_NODE_ID"));
                        row.put("workflowId", rs.getString("WORKFLOW_ID"));
                        row.put("domid", rs.getString("DOM_ID"));
                        row.put("sfyxSt", "VALID");
                        return row;
                    }
                }, workflowId, domid);
        if (routers != null && routers.size() > 0) {
            return routers.get(0);
        }
        return null;
    }
}
