var sysUserGridVm,
    param = RX.page.param,
    func = param.func,            //回调函数
    multyFlag = param.multyFlag;  //是否多选  true  false，默认为true
$(function () {
    if (multyFlag === "false") {
        sysUserSettings.autoListBox.mulchose = false;
        sysUserSettings.autoListBox.checkbox = false;
    }
    sysUserGridVm = new Rxvm({
        widget: RX.Grid,
        el: '.base_box',
        settings: sysUserSettings,
        config: sysUserConfig
    });
    //确认
    $("#confirm").click(function () {
        selectItem();
    });
});

function selectItem() {
    var obj = sysUserGridVm.getSelected();//获取选中行的数据
    if (obj == null || obj == undefined || obj[0] == null) {
        RX.msg(RX.SELECT_DATA);
    } else {
        var evalFunc = RX.page.prevWin()[func];
        var ids = [], names = [];
        for (var i = 0, maxLength = obj.length; i < maxLength; i++) {
            ids.push(obj[i].ID);
            names.push(obj[i].USER_NAME);
        }
        var result = evalFunc(ids.join(","), names.join(","), param.viewModel);
        if (result || typeof(result) == "undefined") {
            RX.page.close();
        }
    }
}