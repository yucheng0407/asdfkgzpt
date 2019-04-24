var param = RX.page.param,
    //操作类型标志位
    type = param.type,
    roleId = param.roleId,
    func = param.func;
$(function () {
    if (type != "ck") {
        $("#save").show();
    }
    //获取初值
    var role = {};   //供初始化的角色数据对象
    if (roleId) {
        $.ajax({
            type: "get",
            url: "/role/getRoleById?id=" + roleId + "&random=" + Math.random(),
            async: false,
            success: function (ar) {
                if (ar.success) {
                    role = ar.data;
                } else {
                    RX.alert(ar.msg);
                }
            }
        });
    }
    var resultBack;
    if (roleId) {
        $.ajax({
            type: "post",
            url: "/role/getGlxxByRole",
            data: {roleId: roleId, type: "relate"},
            success: function (ar) {
                if (ar.success) {
                    var data = ar.data;
                    resultBack = chooseOrganPostUser(data.inUsers, data.outUsers, data.organs,type);
                } else {
                    RX.alert(ar.msg);
                }
            }
        });
    }
    $("#save").click(function () {
        // //获取关联要素
        var saveParam = {};
        saveParam = resultBack.getSaveOrganData();
        $.ajax({
            type: "post",
            url: "/role/saveRoleGlxx",
            data: {
                roleId: roleId,
                organsAdd: saveParam.addOrganStr,
                organsDel: saveParam.delOrganStr,
                usersInclude: saveParam.gxAddUserStr,
                usersExclude: saveParam.gxNotUserStr,
                usersTurn: saveParam.delUserStr
            },
            success: function (ar) {
                if (ar.success) {
                    RX.msg(RX.SUCCESS_SAVE);
                    var evalFunc = RX.page.prevWin()[func];
                    result = evalFunc();
                    RX.page.close(param.closeParentTag ? 2 : 1);
                } else {
                    RX.alert(ar.msg);
                }
            }
        });
    });

});