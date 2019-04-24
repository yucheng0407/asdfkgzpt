var gridVm;
var func = RX.page.param.func;
//选中
var selIds = RX.page.param.selIds;
//禁用
var disIds = RX.page.param.disIds;
$(function () {

    settings.autoListBox.dischose = true;
    if (disIds) {
        settings.autoListBox.disObject = {ID: disIds};
    }
    if (selIds) {
        settings.autoListBox.selObject = {ROLE_ID: selIds};
    }

    gridVm = new Rxvm({
        widget: RX.Grid,
        el: '.base_box',
        template: "loadTpl:noButtonGridTpl",
        settings: settings,
        config: config
    });

    $("#confirm").click(function () {
        var rows = gridVm.getSelected();
        if (rows.length > 0) {
            var evalFunc = RX.page.prevWin().RX.getGlobalFunc(func);
            var result = evalFunc(rows);
            if (result || typeof(result) == "undefined") {
                RX.page.close();
            }
        } else {
            RX.msg(RX.SELECT_DATA);
        }
    })

});

//刷新全局接口
RX.page.reload = function (param) {
    gridVm.reloadGrid(param);
};
