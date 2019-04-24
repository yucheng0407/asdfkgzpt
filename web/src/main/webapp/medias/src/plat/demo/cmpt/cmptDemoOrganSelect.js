var func = RX.getUrlParam("func");
var cid = RX.getUrlParam("cid");
var keypath = RX.getUrlParam("keypath");
$(function () {

    var gridVm = new Rxvm({
        widget: RX.Grid,
        el: '.base_box',
        settings: settings
    });

    $("#confirm").click(function () {
        var rows = gridVm.getSelected();
        if (rows.length > 0) {
            var organName = rows[0].ORGAN_NAME;
            var organId = rows[0].ID;
            var evalFunc = RX.page.prevWin().RX.getGlobalFunc(func);
            var result = evalFunc(cid, keypath, organName, organId)
            if (result || typeof(result) == "undefined") {
                RX.page.close();
            }
        } else {
            RX.msg(RX.SELECT_DATA);
        }
    })

})
