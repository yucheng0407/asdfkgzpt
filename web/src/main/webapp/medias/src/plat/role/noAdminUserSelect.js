var userGridVm,
    param = RX.page.param,
    func = param.func;            //回调函数
$(function () {
    userSettings.autoListBox.dischose = true;
    userSettings.autoListBox.disObject = {ID: param.ids};
    userGridVm = new Rxvm({
        widget: RX.Grid,
        el: '.base_box',
        settings: userSettings,
        config: userConfig
    });
    //确认
    $("#confirm").click(function () {
        selectItem();
    });
});

function selectItem() {
    var obj = userGridVm.getSelected();
    if (obj == null || obj == undefined || obj[0] == null) {
        RX.msg(RX.SELECT_DATA);
    } else {
        var evalFunc = RX.page.prevWin()[func];
        var result = evalFunc(obj);
        if (result || typeof(result) == "undefined") {
            RX.page.close();
        }
    }
}