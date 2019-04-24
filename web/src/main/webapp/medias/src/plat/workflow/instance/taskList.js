$(function () {
    //流程实例id
    var wfiId = RX.page.param.wfiId;
    //环节id
    var nodeId = RX.page.param.nodeId;
    if(!wfiId || !nodeId) return;
    settings.url += "?wfiId=" + wfiId + "&nodeId=" + nodeId;
    settings.autoListBox.onRowDblClick = onRowDblClick;
    new Rxvm({
        widget: RX.Grid,
        el: '#dataDiv',
        settings: settings,
        afterMount: function(){
            $(".list_box").outerHeight($(window).height() - 60);
            $(window).resize(function () {
                $(".list_box").outerHeight($(window).height() - 60);
            });
         }
    });
});

//双击事件
function onRowDblClick(rowIndex, rowData, event) {
    RX.page.open({
        title: "流程监控",
        areaType: ["860px", "550px"],
        url: "/workflow/instance/taskHandle",
        param: {taskId: rowData.ID, flowViewTag: true}
    });
}
