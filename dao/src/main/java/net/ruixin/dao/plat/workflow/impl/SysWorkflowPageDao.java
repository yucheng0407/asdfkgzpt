package net.ruixin.dao.plat.workflow.impl;

import net.ruixin.dao.plat.workflow.ISysWorkflowPageDao;
import net.ruixin.domain.plat.workflow.structure.page.SysWorkflowPage;
import net.ruixin.enumerate.plat.SfyxSt;
import net.ruixin.util.hibernate.BaseDao;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 流程表单DAO接口实现
 * Created by Jealous on 2016-9-1.
 */
@SuppressWarnings({"SqlDialectInspection", "SqlNoDataSourceInspection"})
@Repository
public class SysWorkflowPageDao extends BaseDao<SysWorkflowPage> implements ISysWorkflowPageDao {
    @Override
    public SysWorkflowPage get(Long workflowPageId) {
        return super.get(workflowPageId);
    }

    @Override
    public void saveWorkflowPage(SysWorkflowPage workflowPage) {
        super.saveOrUpdate(workflowPage);
    }

    @Override
    public List<SysWorkflowPage> findWorkflowSheetsByWorkflow(Long wId) {
        return super.findListByHql("from SysWorkflowPage t where t.sysWorkflow.id = ? and t.sfyxSt = '1' order by sort",wId);
    }

    @Override
    public List<Map<String,Object>> querySheetsByWorkflow(Long wfId){
        return super.getJdbcTemplate().query("SELECT ID, \n" +
                        "NAME, \n" +
                        "WORKFLOW_ID, \n" +
                        "PAGE_ID, \n" +
                        "SORT, \n" +
                        "SFYX_ST  FROM SYS_WORKFLOW_PAGE P WHERE P.SFYX_ST = '1' AND P.WORKFLOW_ID=? ORDER BY SORT",
                new RowMapper<Map<String,Object>>() {
                    @Override
                    public Map<String,Object> mapRow(ResultSet rs, int rowNum) throws SQLException {
                        Map<String,Object> row= new HashMap<>();
                        row.put("id",rs.getString("ID"));
                        row.put("title",rs.getString("NAME"));
                        row.put("name",rs.getString("NAME"));
                        row.put("workflow_id",rs.getString("WORKFLOW_ID"));
                        row.put("sheet_id",rs.getString("PAGE_ID"));
                        row.put("sort",rs.getString("SORT"));
                        row.put("sfyxSt","VALID");
                        return row;
                    }
                },wfId);
    }
}
