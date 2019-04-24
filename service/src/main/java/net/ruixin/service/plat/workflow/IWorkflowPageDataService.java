package net.ruixin.service.plat.workflow;

@SuppressWarnings("unused")
public interface IWorkflowPageDataService {

    /**
     * 保存
     * @param wiId 流程实例id
     * @param dataIds dataIds
     */
    void saveWorkflowPageData(Long wiId, String dataIds);

    /**
     * 获取
     * @param wiId  流程实例id
     * @param pageId 页面id
     * @return
     */
    Long getDataId(Long wiId, Long pageId);
}
