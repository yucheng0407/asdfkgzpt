package net.ruixin.service.plat.workflow.title;


import net.ruixin.domain.plat.workflow.structure.frame.SysWorkflow;

public interface IWfInsTitleStrategy {
    /**
     * 根据业务数据ID、流程定制流程实例标题
     *
     * @param dataId 业务数据ID
     * @param wf     流程
     */
    String getWfInsTitle(Long dataId, SysWorkflow wf);
}
