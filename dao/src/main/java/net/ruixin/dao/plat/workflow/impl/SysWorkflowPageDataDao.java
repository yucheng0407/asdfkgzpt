package net.ruixin.dao.plat.workflow.impl;

import net.ruixin.dao.plat.workflow.ISysWorkflowPageDataDao;
import net.ruixin.domain.plat.workflow.instance.SysWorkflowPageData;
import net.ruixin.util.hibernate.BaseDao;
import org.springframework.stereotype.Repository;


@SuppressWarnings({"SqlDialectInspection", "SqlNoDataSourceInspection"})
@Repository
public class SysWorkflowPageDataDao extends BaseDao<SysWorkflowPageData> implements ISysWorkflowPageDataDao {

    @Override
    public SysWorkflowPageData getWorkflowPageData(Long wiId, Long pageId) {
        return this.getByHql("from SysWorkflowPageData t where t.workflowInstanceId = ? " +
                "and t.pageId = ? and t.sfyxSt = '1')", wiId, pageId);
    }

    @Override
    public void delDate(Long wiId) {
        String sql = "DELETE FROM SYS_WORKFLOW_PAGE_DATA_INS WHERE WORKFLOW_INSTANCE_ID = ?";
        this.getJdbcTemplate().update(sql, wiId);
    }
}
