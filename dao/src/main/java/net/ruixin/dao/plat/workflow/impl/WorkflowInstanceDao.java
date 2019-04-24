package net.ruixin.dao.plat.workflow.impl;

import net.ruixin.dao.plat.workflow.IWorkflowInstanceDao;
import net.ruixin.domain.plat.workflow.instance.SysWorkflowInstance;
import net.ruixin.enumerate.plat.TaskFinishEnum;
import net.ruixin.util.hibernate.BaseDao;
import net.ruixin.util.paginate.FastPagination;
import net.ruixin.util.tools.RxStringUtils;
import oracle.jdbc.OracleTypes;
import org.springframework.stereotype.Repository;

import java.util.*;

/**
 * Created by Jealous on 2016-8-16.
 * 流程实例类DAO接口实现
 */
@SuppressWarnings({"SqlDialectInspection", "SqlNoDataSourceInspection"})
@Repository
public class WorkflowInstanceDao extends BaseDao<SysWorkflowInstance> implements IWorkflowInstanceDao {
    @Override
    public String signForTask(Long id) {
        return super.prepareCallAndReturn("{call PKG_TASK.P_TASK_SIGN(?,?,?)}", id);
    }

    @Override
    public String transact(List param) {
        return super.prepareCallAndReturn("{call PKG_TASK.P_TASK_SUBMIT(?,?,?,?,?,?,?,?,?)}", param.toArray());
    }

    @Override
    public String startup(List<Object> param) {
        return super.prepareCallAndReturn("{call PKG_WF.P_WORKFLOW_START(?,?,?,?,?,?,?,?)}", param.toArray());
    }

    @Override
    public String returned(List<Object> param) {
        return super.prepareCallAndReturn("{call PKG_TASK.P_TASK_BACK(?,?,?,?,?)}", param.toArray());
    }

    @Override
    public String withdraw(Long id) {
        return super.prepareCallAndReturn("{call PKG_TASK.P_TASK_RECOVER(?,?,?)}", id);
    }

    @Override
    public String delWorkflowInstance(Long wiId) {
        return super.prepareCallAndReturn("{call PKG_WF.P_WORKFLOW_INSTANCE_DELETE(?,?,?)}", wiId);
    }

    @Override
    public int getNodeSheetcount(Long wid) {
        return super.getJdbcTemplate().queryForObject("SELECT COUNT(1) AS NUM FROM SYS_NODE_PAGE_INSTANCE P, " +
                "SYS_NODE_INSTANCE N WHERE P.NODE_INSTANCE_ID = N.ID AND P.DATA_ID IS NOT NULL " +
                "AND N.WORKFLOW_INSTANCE_ID = ?", Integer.class, wid);
    }

    @Override
    public Long getLatestTaskIdByWiId(Long wiId, Long userId, TaskFinishEnum taskFinish) {
        List paramList = new ArrayList();
        StringBuilder sb = new StringBuilder("SELECT MAX(TI.ID) AS ID FROM SYS_TASK_INSTANCE TI WHERE TI.SFYX_ST = '1' ");
        if (wiId != null) {
            sb.append("AND TI.WORKFLOW_INSTANCE_ID = ? ");
            paramList.add(wiId);
        }
        if (userId != null) {
            sb.append("AND TI.USER_ID = ? ");
            paramList.add(userId);
        }
        if (taskFinish != null) {
            sb.append("AND TI.IS_FINISH = ? ");
            paramList.add(taskFinish.value);
        }
        return jdbcTemplate.queryForObject(sb.toString(), Long.class, paramList.toArray());
    }

    @Override
    public Long getLatestTaskIdByDataId(Long wId, Long dataId, Long userId) {
        StringBuilder sb = new StringBuilder("SELECT MAX(STI.ID) AS SID " +
                "FROM SYS_WORKFLOW SW, SYS_WORKFLOW_INSTANCE SWI, SYS_TASK_INSTANCE STI " +
                "WHERE SW.ID = SWI.WORKFLOW_ID " +
                "AND SWI.ID = STI.WORKFLOW_INSTANCE_ID " +
                "AND SWI.DATA_ID = ? " +
                "AND SW.WORKFLOW_ID = ? ");
        List<Long> paramList = Arrays.asList(dataId, wId);
        if (userId != null) {
            sb.append("AND STI.USER_ID = ?");
            paramList.add(userId);
        }
        return jdbcTemplate.queryForObject(sb.toString(), Long.class, paramList.toArray());
    }

    @Override
    public List getBlrList(Long rwid, Boolean agree, String decision, String backNodeIds) {
        List<Object> param = new ArrayList<>();
        param.add(rwid);
        param.add(decision);
        param.add(agree ? "1" : "0");
        param.add(backNodeIds);
        List<Integer> data = new ArrayList<>();
        data.add(OracleTypes.CURSOR);
        data.add(OracleTypes.VARCHAR);
        return super.prepareCallAndReturnCustom("{call PKG_WF.P_WF_NEXT_NODE_USER_ORG(?,?,?,?,?,?,?)}", param, data);
    }

    @Override
    public void updateWorkflowInstanceData(Long taskId, String columnName, Object columnValue) {
        if (RxStringUtils.isNotEmpty(columnName)) {
            String sql = "UPDATE SYS_WORKFLOW_INSTANCE WI SET WI." + columnName + "=?" +
                    " WHERE WI.SFYX_ST = '1' " +
                    "      AND WI.ID = (SELECT TI.WORKFLOW_INSTANCE_ID " +
                    "                     FROM SYS_TASK_INSTANCE TI " +
                    "                     WHERE TI.ID = ? AND TI.SFYX_ST = '1')";
            super.executeSqlUpdate(sql, columnValue, taskId);
        }
    }

    /**
     * 获取特送退回的环节树
     *
     * @param taskId 任务ID
     */
    @Override
    public List<Map<String, Object>> getSpecialBackTree(Long taskId) {
        Object[] params = new Object[2];
        String sql = "SELECT *\n" +
                "  FROM SYS_NODE\n" +
                " where WORKFLOW_ID = (SELECT B.WORKFLOW_ID\n" +
                "                        FROM SYS_TASK_INSTANCE A, SYS_WORKFLOW_INSTANCE B\n" +
                "                       WHERE A.WORKFLOW_INSTANCE_ID = B.ID\n" +
                "                         AND A.ID = ?)\n" +
                "   AND ID IN\n" +
                "       (SELECT R.START_NODE_ID\n" +
                "          FROM SYS_ROUTER R\n" +
                "         START WITH R.END_NODE_ID =\n" +
                "                    (SELECT B.NODE_ID\n" +
                "                       FROM SYS_TASK_INSTANCE A, SYS_NODE_INSTANCE B\n" +
                "                      WHERE A.NODE_INSTANCE_ID = B.ID\n" +
                "                        AND A.ID = ?)\n" +
                "        CONNECT BY NOCYCLE PRIOR R.START_NODE_ID = R.END_NODE_ID)\n" +
                "   AND ID IN\n" +
                "       (SELECT R.END_NODE_ID\n" +
                "          FROM SYS_ROUTER R\n" +
                "         START WITH R.START_NODE_ID = ?\n" +
                "        CONNECT BY NOCYCLE PRIOR R.END_NODE_ID = R.START_NODE_ID)\n" +
                "   AND ID IN (SELECT NODE_ID\n" +
                "                FROM SYS_NODE_INSTANCE\n" +
                "               WHERE STATUS = '2'\n" +
                "                 AND WORKFLOW_INSTANCE_ID =\n" +
                "                     (SELECT WORKFLOW_INSTANCE_ID\n" +
                "                        FROM SYS_TASK_INSTANCE\n" +
                "                       WHERE ID = ?))\n";
        params[0] = taskId;
        params[1] = taskId;
        return super.getJdbcTemplate().queryForList(sql, params);
    }

    @Override
    public SysWorkflowInstance get(Long id) {
        return super.get(id);
    }

    @Override
    public String batchProcess(Long userId, String wfiIds, String opinion, String handleTag) {
        return super.prepareCallAndReturn("{call PKG_WF.P_WORKFLOW_BATCH_HANDLE(?,?,?,?,?,?)}", wfiIds, userId, opinion, handleTag);
    }

    @Override
    public void insertWorkflowAdditionUsers(Long wiId, Long nId, String ids) {
        String sql = "insert into sys_wf_auto_handle_user(WORKFLOW_INSTANCE_ID,NODE_ID,USER_ID)\n" +
                "select ?,?,x\n" +
                "from (select column_value x from table( splitstr('" + ids + "',',')))\n";
        super.getJdbcTemplate().update(sql, wiId, nId);
    }

    @Override
    public SysWorkflowInstance getById(Long id) {
        return super.get(id);
    }

    @Override
    public String hasDynamicUser(String flowCode, Long dataId) {
        return super.prepareCallAndReturn("{call PKG_WF_DAMIC_USER.P_WORKFLOW_DAMIC_USER_YZ(?,?,?,?)}", flowCode, dataId);
    }

    @Override
    public void updateWordpath(String path, Long pageId, Long winId) {
        String sql = "UPDATE SYS_NODE_PAGE_INSTANCE NPI SET NPI.PATH=? WHERE NPI.NODE_INSTANCE_ID IN " +
                "(SELECT NI.ID FROM SYS_NODE_INSTANCE NI WHERE NI.WORKFLOW_INSTANCE_ID=?) " +
                "AND NPI.PAGE_ID=? ";
        super.executeSqlUpdate(sql, path, winId, pageId);
    }

    @Override
    public void updateWordPath(String path, String pageCode, Long wfInsId) {
        String sql = "UPDATE SYS_TASK_PAGE_INSTANCE TPI\n" +
                "   SET TPI.PATH = ?\n" +
                " WHERE TPI.TASK_INSTANCE_ID IN\n" +
                "       (SELECT TI.ID\n" +
                "          FROM SYS_TASK_INSTANCE TI\n" +
                "         WHERE TI.WORKFLOW_INSTANCE_ID = ?\n" +
                "           AND TI.SFYX_ST = '1')\n" +
                "   AND TPI.PAGE_ID = (SELECT R.ID FROM SYS_RESOURCE R WHERE R.CODE=? AND R.SFYX_ST='1')\n" +
                "   AND TPI.SFYX_ST = '1' ";
        super.executeSqlUpdate(sql, path, wfInsId, pageCode);
    }

    @Override
    public Long getDataIdByTaskId(Long id) {
        String sql = "SELECT WI.DATA_ID\n" +
                "  FROM SYS_WORKFLOW_INSTANCE WI, SYS_TASK_INSTANCE TI\n" +
                " WHERE WI.ID = TI.WORKFLOW_INSTANCE_ID\n" +
                "   AND WI.SFYX_ST = '1'\n" +
                "   AND TI.SFYX_ST = '1' " +
                "   AND TI.ID=? ";
        return Long.valueOf(super.getJdbcTemplate().queryForMap(sql, id).get("DATA_ID").toString());
    }

    @Override
    public String specialBack(Long nodeInstanceId, Long nodeId, String opinion, String fjId) {
        Object[] objs = new Object[]{nodeInstanceId, nodeId, opinion, fjId};
        return super.prepareCallAndReturn("{call PKG_WF.P_WORKFLOW_SPECIAL_BACK(?,?,?,?,?,?)}", objs);
    }

    @Override
    public void updateSysGlbBizWf(Long taskId, String columnName, Object columnValue) {
        if (RxStringUtils.isNotEmpty(columnName)) {
            String sql = "UPDATE SYS_GLB_BIZ_WF BW SET BW." + columnName + "=?" +
                    " WHERE BW.SFYX_ST = '1' " +
                    "   AND BW.WORKFLOW_INSTANCE_ID = (SELECT TI.WORKFLOW_INSTANCE_ID " +
                    "                     FROM SYS_TASK_INSTANCE TI " +
                    "                     WHERE TI.ID = ? AND TI.SFYX_ST = '1')";
            super.executeSqlUpdate(sql, columnValue, taskId);
        }
    }

    @Override
    public void initVariable(Object taskId, String wfVars) {
        super.prepareCallNoReturn("{call PKG_WF.P_INIT_WF_VARIABLE(?,?,?)}", taskId, wfVars);
    }

    @Override
    public List<Map<String, Object>> getBackNodes(Long mergeNodeId) {
        return super.callFuncAndReturnList("{?=call PKG_TASK.F_GET_BACK_NODES(?)}", mergeNodeId);
    }

}
