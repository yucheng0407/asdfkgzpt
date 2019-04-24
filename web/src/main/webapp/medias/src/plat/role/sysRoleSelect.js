var sysRoleGridVm;
var func = RX.page.param.func;
var selIds = RX.page.param.selIds;
var flag = RX.page.param.flag;
$(function () {
    sysRoleSettings.autoListBox.dischose = true;
    sysRoleSettings.autoListBox.disObject = {ID: selIds};
    sysRoleSettings.url = "/role/getSelectRole?kind=" + kind;
    if(flag === "workflow") {
        sysRoleSettings.autoListBox.mulchose = false;
        sysRoleSettings.autoListBox.checkbox = false;
    }
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
            var result;
            /*活动节点选择角色*/
            if(flag === "workflow") {
                result = evalFunc(rows[0].ID, rows[0].ROLE_NAME, rows[0].ROLE_CODE, rows[0].ROLE_TYPE, rows[0].ROLE_TYPE_NAME, rows[0].ROLE_MADE);
            } else {
                result = evalFunc(rows)
            }
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
    sysRoleGridVm.reloadGrid(param);
};
