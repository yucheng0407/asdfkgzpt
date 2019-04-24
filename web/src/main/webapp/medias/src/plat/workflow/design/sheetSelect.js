var func = RX.page.param.func;//回调函数
var selIds = RX.page.param.selIds;//数据禁选
var keyPath = RX.page.param.keypath;
var sheetVm;
$(function () {
    // 设置禁选数据
    settings.autoListBox.disObject = {"id": selIds};
    settings.autoListBox.onRowDblClick = selectSheetItem;

    //创建VM实例
    sheetVm = new Rxvm({
        widget: RX.Grid,
        el: '.base_box',
        settings: settings,
        config: config,
        afterMount: function() {
            RX.button.init($(".w_button_box"), buttonsJson);
        }
    });
});

//选择表单
function selectSheetItem() {
    var rows = sheetVm.getSelected();
    if (rows.length > 0) {
        var evalFunc = RX.page.prevWin().RX.getGlobalFunc(func);
        var result = evalFunc(rows[0].ID, rows[0].NAME, keyPath);
        if (result || typeof(result) == "undefined") {
            RX.page.close();
        }
    } else {
        RX.msg(RX.SELECT_DATA);
    }
}