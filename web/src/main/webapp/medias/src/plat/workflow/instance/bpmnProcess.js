/**
 * 显示BPMN流程图
 * @param wfId
 * @param instId
 */
function showBpmnFlowImage(wfId, instId) {
    RX.page.open({
        title:"流程图",
        areaType:"big",
        url: "workflow/ibps/flowImage",
        param: {wfId: wfId, instId: instId}
    });
}