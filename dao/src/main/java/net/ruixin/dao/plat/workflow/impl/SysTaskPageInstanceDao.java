package net.ruixin.dao.plat.workflow.impl;

import net.ruixin.dao.plat.workflow.ISysTaskPageInstanceDao;
import net.ruixin.domain.plat.workflow.instance.SysTaskPageInstance;
import net.ruixin.util.hibernate.BaseDao;
import net.ruixin.util.json.JacksonUtil;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * 任务表单实例DAO
 */
@SuppressWarnings({"SqlDialectInspection", "SqlNoDataSourceInspection"})
@Repository
public class SysTaskPageInstanceDao extends BaseDao<SysTaskPageInstance> implements ISysTaskPageInstanceDao {
    @Override
    public List<SysTaskPageInstance> findByTask(Long id) {
        return super.findListByHql("from SysTaskPageInstance t where t.sysTask.id = ? order by t.sysNodePage.sort", id);
    }

    @Override
    public void updateTaskPageInstanceData(Long dataId, Long taskId, Long nodePageId) {
        super.executeHqlUpdate("update SysTaskPageInstance t set data_id = ? where t.sysTask.id = ? and t.sysNodePage.id = ?", dataId, taskId, nodePageId);
    }

    @Override
    public void updateTmpData(Long taskId, Long nodePageId, String tmpData) {
        super.executeHqlUpdate("update SysTaskPageInstance t set tmp_data_json = ? where t.sysTask.id = ? and t.sysNodePage.id = ?", tmpData, taskId, nodePageId);
        //需要同步更新操作的附件
        Map<String,Object> fjMap = (Map) JacksonUtil.readValue(tmpData,Map.class).get("fjUpdateIds");
        this.updateFiles(fjMap.get("addIds").toString(),fjMap.get("delIds").toString());
    }

    @Override
    public void emptyTmpData(Long taskId) {
        super.executeHqlUpdate("update SysTaskPageInstance t set tmp_data_json = null where t.sysTask.id = ?", taskId);
    }
}
