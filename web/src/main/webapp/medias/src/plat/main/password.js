var passwordVm;
$(function () {

    //视图初始化
    passwordVm = new Rxvm({
        el: '.form_box',
        template: '#password'
    });
    $("#save").click(function () {
        var oldPwd = $.trim(passwordVm.get("oldPwd"));
        var newPwd = $.trim(passwordVm.get("newPwd"));
        var confirmPwd = $.trim(passwordVm.get("confirmPwd"));

        if (!newPwd) {
            RX.msg(RX.ICON_WARNING, "新密码不能为空！");
            return;
        }
        if (!confirmPwd) {
            RX.msg(RX.ICON_WARNING, "请确认新密码！");
            return;
        }
        if (newPwd !== confirmPwd) {
            RX.msg(RX.ICON_WARNING, "两次输入密码不一致！");
            return;
        }
        if (newPwd === oldPwd) {
            RX.msg(RX.ICON_ERROR, "新密码不能与原密码相同！");
            return;
        }
        $.ajax({
            type: "POST",
            url: "/main/changePwd",
            data: {"oldPwd": oldPwd, "newPwd": newPwd},
            async: false,
            success: function (ar) {
                if (ar.success) {
                    RX.msg("修改成功");
                    $.cookie('loginName', "");
                    $.cookie('loginPwd', "");
                    RX.page.close();
                } else {
                    RX.alert(ar.msg);
                }
            }
        });
    });
});


