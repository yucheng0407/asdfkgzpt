var roleVm,                 //角色对象
    param = RX.page.param,
    id = param.id;
$(function () {

    //初始化表单按钮控件
    RX.button.init($(".w_button_box"), buttonsJson, "xg");

    roleVm = new Rxvm({
        el: '.form_box',
        settings: {
            getData: {
                url: "/role/getUserAuthorityInfo?userId=" + id + "&random=" + Math.random(),
                defaultData: {
                    authorityList: []
                },
                success: function (ar) {
                    var data = ar.data,
                        info = {
                            userId: data.sysUser.id,
                            userName: data.sysUser.userName,
                            authorityList: data.authorityList || [],
                            otherAuthorityList: data.otherAuthorityList || []
                        };
                    return info;
                }
            }
        },
        //子组件声明
        components: {
            "AuthTags": {
                widget: RX.Tag,
                settings: {
                    height: '110px',
                    tagProperty: "ROLE_NAME"
                },
                methods: {
                    selectTag: function () {
                        if(isPlatAdmin){
                            var hasLevelTwo = false;
                            $.each(this.get("list") || [], function (i, t) {
                                if (t.ROLE_LEVEL === "2") {
                                    hasLevelTwo = true;
                                    return false;
                                }
                            });
                            if(hasLevelTwo){
                                RX.msg(RX.ERROR_OPREATE, "该用户已有业务管理员级别角色，无法授权");
                                return false;
                            }
                        }
                        //目前只能选择非平台管理员，排除自身
                        RX.page.open({
                            title: "选择授予角色",
                            url: "/role/authorityRoleSelect?",
                            param: {
                                disIds: this.getExistRoleIds(),
                                func: "roleSelectCallback"
                            }
                        });
                    },
                    getExistRoleIds: function () {
                        var idArr = [];
                        $.each(this.get("list") || [], function (i, t) {
                            if (t.ROLE_ID) {
                                idArr.push(t.ROLE_ID);
                            }
                        });
                        return idArr.join();
                    }
                }
            },
            "OtherAuthTags": {
                widget: RX.Tag,
                settings: {
                    height: '110px',
                    tagProperty: "ROLE_NAME",
                    type: "ck"
                }
            }
        }
    });

});

function save() {
    var historyRoles = roleVm.$historyData.authorityList,
        newRoles = roleVm.get().authorityList,
        addIds = [],
        delIds = [];
    $.each(historyRoles, function (i, t) {
        var delTag = true;
        $.each(newRoles, function (i2, t2) {
            if (t.ROLE_ID == t2.ROLE_ID) {
                delTag = false;
                return false;
            }
        });
        if (delTag) {
            delIds.push(t.ROLE_ID);
        }
    });
    $.each(newRoles, function (i, t) {
        var addTag = true;
        $.each(historyRoles, function (i2, t2) {
            if (t.ROLE_ID == t2.ROLE_ID) {
                addTag = false;
                return false;
            }
        })
        if (addTag) {
            addIds.push(t.ROLE_ID);
        }
    });
    $.ajax({
        type: "post",
        url: "/role/saveUserAuthority",
        data: {userId: roleVm.get("userId"), addIds: addIds.join(), delIds: delIds.join()},
        dataType: "json",
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

/**
 * 选择组合角色的回调
 * 添加至组合角色框中，删除触发的角色
 */
function roleSelectCallback(roles) {
    //增加
    $.each(roles, function (i, t) {
        roleVm.$refs["authTags"].addTag(t);
    });
}

RX.page.cancelCheck = function () {
    if (roleVm.ifChange()) {
        RX.confirm(RX.CANCEL_CHECK, function () {
            RX.page.close();
        });
        return false;
    }
    return true;
};