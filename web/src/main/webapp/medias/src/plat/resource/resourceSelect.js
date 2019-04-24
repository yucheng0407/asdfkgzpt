var gridVm,
    func = RX.page.param.func;
$(function () {
    settings.autoListBox.onRowDblClick = function (rowIndex, rowData, isSelected, event) {
        selectItem(rowData);
    };
    gridVm = new Rxvm({
        widget: RX.Grid,
        el: '.base_box',
        template: "loadTpl:noButtonGridTpl",
        settings: settings,
        config: searchConfig
    });
    //确认
    $("#save").click(function () {
        var obj = gridVm.getSelected();//获取选中行的数据
        if (obj == null || obj.length != 1) {
            RX.alert("请选一条数据");
        } else {
            selectItem(obj[0]);
        }
    });
});

/**
 * 选择数据
 * @param rowData
 */
function selectItem(rowData) {
    var evalFunc = RX.page.prevWin()[func];
    var result = evalFunc(rowData.ID, rowData.NAME, rowData.CODE);
    if (result || typeof(result) === "undefined") {
        RX.page.close();
    }
}