var flowVersionVm;
$(function () {
    flowVersionVm = new Rxvm({
        widget: RX.Grid,
        el: '#dataDiv',
        settings: tableSettings,
        afterMount: function () {
            RX.button.init($("#operate"), buttonsJson);
        }
    });
});

/**
 * 返回
 */
function goBack() {
    RX.page.back();
}


/**
 * 修改
 */
function edit() {
    var rowData = flowVersionVm.getSelected();
    if (rowData && rowData.length && rowData.length === 1) {
        RX.page.goto("/workflow/ibps/designer", {
            id: rowData[0].ID,
            operatingStatus: OperatingStatus.MODIFY,
            status: rowData[0].STATUS
        });
    } else {
        RX.msg("请选择一条数据进行修改");
    }
}

/**
 * 删除
 */
function del() {
    var rowData = flowVersionVm.getSelected();
    if (rowData && rowData.length && rowData.length === 1) {
        RX.confirm("确认删除流程 " + (rowData[0].NAME || "") + " ?", function () {
            RX.loading();
            $.ajax({
                url: "/workflow/design/delWorkflow?id=" + rowData[0].ID,
                type: "post",
                success: function (ar) {
                    RX.closeLoading();
                    if (ar.success) {
                        RX.msg("删除成功");
                        flowVersionVm.reloadGrid();
                    } else {
                        RX.msg("删除失败");
                    }
                }
            })
        });
    } else {
        RX.msg("请选择一条数据进行删除");
    }
}

/**
 * 切换流程停启用状态
 * @param id
 * @param status
 */
function switchStatus(id, status) {
    RX.loading();
    $.ajax({
        url: "/workflow/ibps/switchWorkflowStatus",
        type: "post",
        data: {id: id, status: status},
        success: function (ar) {
            RX.closeLoading();
            if (ar.success) {
                flowVersionVm.reloadGrid();
            } else {
                RX.msg("更改流程发布状态失败");
            }
        }
    })
}

RX.page.reload = function () {
    flowVersionVm.reloadGrid();
};
