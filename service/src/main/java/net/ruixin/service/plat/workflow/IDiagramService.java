package net.ruixin.service.plat.workflow;

import net.ruixin.util.workflow.model.def.BpmDefLayout;

import java.io.InputStream;

public interface IDiagramService {
    /**
     * 生成流程图
     * @param instId 流程实例ID
     * @param wfId 流程定义ID
     * @return
     */
    InputStream genImage(Long instId, Long wfId);

    /**
     * 构建bpmn布局
     * @param bpmnXml bpmnXml
     * @return
     */
    BpmDefLayout buildBpmDefLayout(String bpmnXml);
}
