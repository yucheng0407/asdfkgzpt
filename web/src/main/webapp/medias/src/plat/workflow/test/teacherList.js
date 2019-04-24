var teacherVm;
$(function () {
    settings.autoListBox.onRowDblClick = function onRowDblClick(rowIndex, rowData, isSelected, event) {
        //办理流程 第二个参数对象用以传递参数到办理表单页面
        handleWorkflowByWiId(rowData.WF_INS_ID,rowData.WF_ID, null);
    };
    teacherVm = new Rxvm({
        widget: RX.Grid,
        el: ".base_box",
        config: config,
        settings: settings,
        afterMount: function() {
            //初始化按钮
            RX.button.init($("#operation"), buttonsJson);
        }
    })
});

/**
 * 载入数据表格
 * @param param
 */
function reloadTable(param) {
    teacherVm.reloadGrid();
}

function startFlow(){
    //启动流程 参数对象中必须包括流程编码flowCode，其它参数根据业务需要传递（如：此处可以指定流程实例标题wfTitle）
    //测试普通流程
    // confirmWorkflowStart({title: "请假流程", flowCode: "QJLC", type: "xz"});
    //测试含分支聚合环节的流程
    // confirmWorkflowStart({title: "测试分支聚合", flowCode: "CSFZJH", type: "xz"});
    //测试bpmn流程
    confirmWorkflowStart({title: "测试流程", flowCode: "flowImageTest", type: "xz"});
}