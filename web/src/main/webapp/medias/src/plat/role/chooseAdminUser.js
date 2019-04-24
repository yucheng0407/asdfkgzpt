var userVm,
    param = RX.page.param,
    //标志位
    type = param.type,
    //规则视图
    roleId = param.roleId;
$(function () {
    //操作类型标志位
    var type = param.type;
    if (type === "xz") {
        $("#save").show();
    } else if (type === "xg") {
        $("#save").show();
    }
    //视图初始化
    userVm = new Rxvm({
        widget: RX.Grid,
        el: '#userList',
        config: config,
        settings: {
            getData: {
                url: "/role/getAdminUserByRole?roleId=" + roleId + "&random=" + Math.random(),
                success: function (ar) {
                    return {
                        type: type,
                        list: ar.data
                    };
                }
            }
        },
        methods: {
            //选择
            selUser: function () {
                var ids = getSeRulelIds() || [];
                //选择没有分配过管理员的用户
                RX.page.open({
                    title: "请选择用户",
                    url: "/role/noAdminUserSelect",
                    param: {
                        func: "userSelectCallback",
                        ids: ids.join(",")
                    }
                });
            },
            delUser: function (keypath) {
                this.set(keypath + ".sfyxSt", "UNVALID");
            }
        }
    });
    //保存
    $("#save").click(function () {
        var userList = userVm.get("list");
        //已经保存过的数据不会存在列表中
        var usersInclude = "";
        var usersTurn = "";
        var user;
        for (var i = 0, maxLength = userList.length; i < maxLength; i++) {
            user = userList[i];
            if (user.id) {
                if (user.sfyxSt === "UNVALID") {
                    //被删除的数据，去除了用hi
                    if (usersTurn.indexOf(user.userId) === -1) {
                        usersTurn += user.userId + ",";
                    }
                }
            } else {
                if (user.sfyxSt !== "UNVALID") {
                    //增加的用户
                    if (usersInclude.indexOf(user.userId) === -1) {
                        usersInclude += user.userId + ",";
                    }
                }
            }
        }
        usersInclude = usersInclude ? usersInclude.substring(0, usersInclude.length - 1) : "";
        usersTurn = usersTurn ? usersTurn.substring(0, usersTurn.length - 1) : "";
        if (usersInclude || usersTurn) {
            $.ajax({
                type: "post",
                url: "/role/saveRoleGlxx",
                data: {
                    roleId: roleId,
                    organsAdd: "",
                    organsDel: "",
                    usersInclude: usersInclude,
                    usersExclude: "",
                    usersTurn: usersTurn
                },
                success: function (ar) {
                    if (ar.success) {
                        RX.msg(RX.SUCCESS_SAVE);
                        RX.page.close(param.closeParentTag ? 2 : 1);
                    } else {
                        RX.alert(ar.msg);
                    }
                }
            });
        } else {
            RX.msg("没有修改");
        }
    })
});

//选择规则回调函数
function userSelectCallback(sels) {
    var obj;
    for (var i = 0, maxLength = sels.length; i < maxLength; i++) {
        obj = sels[i];
        userVm.append("list", {
            userId: obj.ID,
            userName: obj.USER_NAME,
            sex: obj.SEX,
            organName: obj.ORGAN_NAME || "",
            sfyxSt: "VALID"
        });
    }
}

//获取选中的rule的ids
function getSeRulelIds() {
    var ruleArr = userVm.get("list");
    var ids = [];
    for (var i = 0, modelsLength = ruleArr.length; i < modelsLength; i++) {
        if (ruleArr[i].sfyxSt !== "UNVALID") {
            ids.push(ruleArr[i].userId);
        }
    }
    return ids;
}