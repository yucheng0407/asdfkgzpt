package net.ruixin.dao.plat.workflow;

import net.ruixin.domain.plat.workflow.instance.SysWorkflowPageData;



/*
*
* */
public interface ISysWorkflowPageDataDao {

    /**
     * 根据流程实例和页面id获取数据
     * @param wiId
     * @param pageId
     * @return
     */
    SysWorkflowPageData getWorkflowPageData(Long wiId,Long pageId);

    /**
     * 根据流程实例id删除数据
     * @param wiId
     */
    void delDate(Long wiId);
}
