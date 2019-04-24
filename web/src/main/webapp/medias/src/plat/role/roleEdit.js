var roleVm,                 //角色对象
    param = RX.page.param,
    wfTag = param.wfTag,    //工作流跳转标志
    type = param.type,    //标志位
    id = param.id,    //角色id
    func = param.func,
    roleType,
    canCancel = false,
    wfRoleMade;   //用于流程角色组成类别
$(function () {
    if (type === "xg") {
        roleConfig.roleType.disabled = true;
        roleConfig.roleCode.disabled = true;
    }
    //从工作流进入的页面，角色类型只为流程角色。
    if (wfTag == "1") {
        roleConfig.roleType.dictConfig.pcode = 2;
        roleConfig.roleType.disabled = true;
        roleType = 2;
    } else {
        //非平台管理员只可以业务用户的角色
        if (type === "xz") {
            if (isPlatAdmin) {
                roleConfig.roleType.dictConfig.pcode = [1, 2];
            } else {
                roleConfig.roleType.dictConfig.pcode = [1, 3];
            }
        }
        roleType = 1;
        if (isPlatAdmin) {
            roleConfig.levels.dictConfig.pcode = 2;
            roleConfig.levels.defaultValue = 2;
        }
    }
    roleVm = new Rxvm({
        el: '.form_box',
        config: roleConfig,
        settings: {
            getData: {
                url: id ? "/role/getRoleById?id=" + id + "&random=" + Math.random() : null,
                defaultData: {
                    roleType: roleType,
                    combineRoleList: [],
                    isPlatAdmin: isPlatAdmin
                },
                success: function (ar) {
                    var data = ar.data;
                    roleType = data.roleType;
                    data.isPlatAdmin = isPlatAdmin;
                    wfRoleMade = data.roleMade;
                    return data;
                }
            }
        },
        //子组件声明
        components: {
            "LeaderTags": {
                widget: RX.Tag,
                settings: {
                    tagProperty: "roleName"
                },
                methods: {
                    selectTag: function () {
                        RX.page.open({
                            title: "选择组合角色",
                            url: "/role/roleSelect?",
                            param: {
                                selIds: this.getExistUserIds(),
                                func: "roleSelectCallback",
                                excludeId: roleVm.get("id") || "",
                                ifOwn: "owner",
                                notShowType: "2",
                                mulchose: true,
                                isPlatAdmin: isPlatAdmin
                            }
                        });
                    },
                    getExistUserIds: function () {
                        var idArr = [];
                        $.each(this.get("list") || [], function (i, t) {
                            if (t.sfyxSt !== "UNVALID" && t.roleId) {
                                idArr.push(t.roleId);
                            }
                        });
                        return idArr.join();
                    }
                }
            }
        },
        afterMount: function () {
            if (roleType == 2) {
                roleVm.setConfig("isCombine", {disabled: true});
            }
            changeRule(null, null, roleType);
            if (type === "xg") {
                $("#chooseOrgan").show();
            }
        }
    });
    //保存
    $("#save").click(function () {
        if (roleVm.ruleValidate()) {
            var roleType = roleVm.get("roleType");
            //清空流程级别字段
            if (roleType != 1) {
                roleVm.set("levels", "");
            }
            var param = {sysRole: roleVm.getJson()};
            //修改状态，流程角色
            if (roleVm.get("id") && roleVm.get("roleType") === "2" && wfRoleMade !== roleVm.get("wfRoleMade")) {
                param.clearFlag = true;
            } else {
                param.clearFlag = false;
            }
            $.ajax({
                type: "post",
                url: "/role/saveRole",
                data: param,
                success: function (ar) {
                    if (ar.success) {
                        id = ar.data;
                        roleVm.set("id", id);
                        wfRoleMade = roleVm.get("wfRoleMade");
                        if (wfTag == "1") { //工作流进入保存角色
                            if (func) {
                                var callback = RX.page.prevWin()[func];
                                callback(ar.data, roleVm.get("roleName"), roleVm.get("roleCode"), roleVm.get("roleType"), null, roleVm.get("roleMade"), $("#roleMade  option:selected").text());
                            }
                        }
                        RX.page.prev().reload();
                        if (type === "xz" && !canCancel) {
                            canCancel = true;
                            roleType = roleVm.get("roleType");
                            var text = "关联设置";
                            if (roleType == 1) {
                                //管理员角色
                                if (roleVm.get("levels") == 1) {
                                    text = "管理员分配";
                                } else {
                                    text = "角色授权";
                                }
                            } else if (roleType == 2) {
                                text = "角色授权";
                            } else if (roleType == 3) {
                                text = "关联所属机构";
                            }
                            RX.confirm("保存成功，是否进行" + text + "？",
                                function () {
                                    gotoChooseOrgan(text, type === "xz" ? true : "");
                                },
                                function () {
                                    RX.page.close();
                                }
                            );
                            $("#chooseOrgan").show();
                        } else {
                            RX.msg(RX.SUCCESS_SAVE);
                            RX.page.close();
                        }
                    } else {
                        RX.alert(ar.msg);
                    }
                }
            });
        }
    });
    //关联设置
    $("#chooseOrgan").click(function () {
        gotoChooseOrgan($(this).val());
    });

});

function gotoChooseOrgan(title, closeTag) {
    var roleMade = roleVm.get("roleMade");
    //岗位角色
    if (roleVm.get("roleType") == 3) {
        RX.page.open({
            title: title,
            areaType: "tree",
            url: "/role/chooseOrganTree",
            param: {
                type: type,
                roleId: id,
                closeParentTag: closeTag
            }
        });
    } else {
        if (roleMade == 1) { //固定用户
            if (roleVm.get("levels") == 2) {
                //管理员角色
                RX.page.open({
                    title: title,
                    url: "/role/chooseAdminUser",
                    param: {
                        type: type,
                        roleId: id
                    }
                });
            } else {
                RX.page.open({
                    title: title,
                    areaType: ['650px', '600px'],
                    url: "/role/chooseOrgan",
                    param: {
                        type: type,
                        roleId: id,
                        func: "chooseCallBack",
                        closeParentTag: closeTag ? "1" : ""
                    }
                });
            }
        } else if (roleMade == 2) {// 动态规则
            RX.page.open({
                title: title,
                url: "/role/chooseRule",
                param: {
                    type: type,
                    roleId: id,
                    closeParentTag: closeTag ? "1" : ""
                }
            });
        } else {
            RX.alert("请先选择角色类型");
            return;
        }
    }
}

//关联设置回调
function chooseCallBack() {
    if (func) {
        var callback = RX.page.prevWin()[func];
        callback(roleVm.get("id"), roleVm.get("roleName"), roleVm.get("roleCode"), roleVm.get("roleType"), null, roleVm.get("roleMade"), $("#roleMade  option:selected").text());
    }
}

//根据角色类型显示规则,并清空相关数据
function changeRule(rVm, keypath, roleType) {
    roleType = roleType || roleVm.get("roleType");
    if (roleType == 1 && (isPlatAdmin || type === "ck")) { //业务角色
        rVm && roleVm.set("roleMade", "1");
        roleVm.setConfig("levels", "");
        if (roleVm.get("levels") == 2) {
            $("#chooseOrgan").val("管理员分配");
        } else {
            $("#chooseOrgan").val("角色授权");
        }
        rVm && roleVm.set("isCombine", "0");
        rVm && roleVm.setConfig("isCombine", {
            disabled: false
        });
    } else if (roleType == 2) {
        rVm && roleVm.setConfig("roleMade", "");
        $("#chooseOrgan").val("角色授权");
        rVm && roleVm.set("isCombine", "0");
        rVm && roleVm.setConfig("isCombine", {
            disabled: true
        });
    } else if (roleType == 3) {
        rVm && roleVm.set("isCombine", "1");
        rVm && roleVm.setConfig("isCombine", {
            disabled: true
        });
        $("#chooseOrgan").val("关联所属机构");
    } else {
        rVm && roleVm.set("roleMade", "1");
        $("#chooseOrgan").val("角色授权");
        rVm && roleVm.set("isCombine", "0");
        rVm && roleVm.setConfig("isCombine", {
            disabled: false
        });
    }
}

/**
 * 是否组合变化触发的函数
 */
function combineChange(vm) {
    //不是组合角色时清空组合角色数据
    if (vm.get("isCombine") === "0") {
        roleVm.$refs["leaderTags"].removeAllTag();
        vm.set("combineRoleList", roleVm.$refs["leaderTags"].get("list"));
    }
}

/**
 * 选择组合角色的回调
 * 添加至组合角色框中，删除触发的角色
 */
function roleSelectCallback(roles) {
    //增加
    $.each(roles, function (i, t) {
        roleVm.$refs["leaderTags"].addTag({
            roleName: t.ROLE_NAME,
            roleId: t.ID,
            sfyxSt: "VALID"
        });
    });
}

RX.page.cancelCheck = function () {
    if (canCancel) {
        return true;
    } else {
        if (roleVm.ifChange()) {
            RX.confirm(RX.CANCEL_CHECK, function () {
                RX.page.close();
            });
            return false;
        }
        return true;
    }
};