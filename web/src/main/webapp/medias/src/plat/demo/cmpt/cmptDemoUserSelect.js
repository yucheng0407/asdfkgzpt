var func = RX.getUrlParam("func");
var selIds = RX.getUrlParam("selIds");
var flag = RX.getUrlParam("flag");
$(function () {

    if (flag === "chose") {
        settings.autoListBox.selObject = {ID: selIds};
    } else {
        settings.autoListBox.dischose = true;
        settings.autoListBox.disObject = {ID: selIds};
    }

    var gridVm = new Rxvm({
        widget: RX.Grid,
        el: '.base_box',
        settings: settings
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

})
