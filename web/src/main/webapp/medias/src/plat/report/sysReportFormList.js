/**
 * 元数据列表
 */
var sysReportFormGridVm;
$(function () {

    //注册双击事件
    sysReportFormSettings.autoListBox.onRowDblClick = function (rowIndex, rowData, isSelected, event) {
        var formUrl = rowData["URL"];
        RX.page.open({
            title: "报表预览：" + rowData["NAME"],
            url: formUrl,
            areaType: "big",
            param: {id: rowData.ID, formUrl: formUrl}
        });
    };

    sysReportFormGridVm = new Rxvm({
        widget: RX.Grid,
        el: '.base_box',
        settings: sysReportFormSettings,
        config: sysReportFormConfig,
        afterMount: function () {
            //初始化列表按钮控件
            RX.button.init($("#operate"), buttonsJson);
        }
    });

});

/**
 * 新增报表
 */
function addSysReportForm() {
    RX.page.goto("/report/reportFormEdit");
}

/**
 * 修改报表
 */
function editSysReportForm() {
    var rowData = sysReportFormGridVm.getSelected();
    if (rowData.length === 1) {
        RX.page.goto("/report/reportFormEdit", {id: rowData[0].ID});
    } else {
        RX.msg(RX.SELECT_EDIT);
    }
}


<!--删除-->
/**
 * 删除元数据
 */
function delSysMetaData() {
    var obj = sysReportFormGridVm.getSelected();//获取选中行的数据
    if (obj == null || obj == undefined || obj[0] == null) {
        RX.msg(RX.SELECT_DELETE);
    } else {
        RX.confirm(RX.CONFIRM_DELETE, function (index) {
            $.ajax({
                url: "/report/delSysReportForm?id=" + obj[0].ID,
                success: function () {
                    RX.msg(RX.SUCCESS_DELETE);
                    RX.page.reload();
                }
            });
        });
    }
}


//刷新全局接口
RX.page.reload = function (param) {
    sysReportFormGridVm.reloadGrid(param);
};
