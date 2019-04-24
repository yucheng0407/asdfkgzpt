/**
 * SysUser(用户表)表单
 */

var id = RX.page.param.id;
var sysUserFormVm;
var sysUserInfo;
$(function () {
    //初始化表单按钮控件
    RX.button.init($("#w_butt"), buttonsJson, "xz");
    //视图初始化
    sysUserFormVm = new Rxvm({
        el: '.form_box',
        template: '#sysUserForm',
        config: config,
        settings: {
            getData: {
                url: id && "/user/getSysUserById",
                param: {id: id},
                defaultData: {sysUserInfo: {}},
                success: function (ar) {
                    if (ar.success) {
                        return ar.data;
                    }
                }
            }
        },
        afterMount: function () {
            sysUserInfo = new Rxvm({
                el: '.user_info',
                template: '#userInfoForm',
                config:userInfoConfig,
                data:sysUserFormVm.get("sysUserInfo")
            })
        }
    });

});


/**
 * 保存方法
 */
function save() {
    if (sysUserFormVm.ruleValidate()&& sysUserFormVm.ruleValidate) {
        sysUserFormVm.set("sysUserInfo", JSON.parse(sysUserInfo.getJson()));
        $.ajax({
            type: "post",
            url: "/user/saveSysUser",
            data: {sysUser: sysUserFormVm.getJson()},
            dataType: "json",
            async: false,
            success: function (ar) {
                if (ar.success) {
                    RX.msg(RX.SUCCESS_SAVE);
                    RX.page.close();
                    RX.page.prev().reload();
                } else {
                    RX.alert(ar.msg);
                }
            }
        });
    }
}

//关闭确认
RX.page.cancelCheck = function () {
    if (sysUserFormVm.ifChange()) {
        RX.confirm(RX.CANCEL_CHECK, function (index) {
            RX.page.close();
        });
        return false;
    }
    return true;
};