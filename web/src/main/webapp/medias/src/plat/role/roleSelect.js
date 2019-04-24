var sysRoleGridVm,
    param = RX.page.param,
    func = RX.page.param.func,
    selIds = param.selIds,
    endNum = param.endNum || 1,  //成功之后关闭的页数
    resId = param.resId;   //资源id
$(function () {
    sysRoleSettings.autoListBox.dischose = true;
    sysRoleSettings.autoListBox.disObject = {ID: selIds};
    sysRoleGridVm = new Rxvm({
        widget: RX.Grid,
        el: '.base_box',
        template: "loadTpl:noButtonGridTpl",
        settings: sysRoleSettings,
        config: sysRoleConfig

    });
    $("#confirm").click(function () {
        var rows = sysRoleGridVm.getSelected();
        if (rows.length > 0) {
            var evalFunc = RX.page.prevWin().RX.getGlobalFunc(func);
            var result = evalFunc(rows, resId);
            if (result || typeof(result) == "undefined") {
                RX.page.close(endNum);
            }
        } else {
            RX.msg(RX.SELECT_DATA);
        }
    })

});

//刷新全局接口
RX.page.reload = function (param) {
    sysRoleGridVm.reloadGrid(param);
};
