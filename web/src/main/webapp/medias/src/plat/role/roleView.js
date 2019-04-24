var roleVm,                 //角色对象
    id = param.id,    //角色id
    roleType,
    roleMade,
    showBtnName;
$(function () {
    //从工作流进入的页面，角色类型只为流程角色。
    roleVm = new Rxvm({
        el: '.form_box',
        settings: {
            getData: {
                url: "/role/getRoleById?id=" + id + "&random=" + Math.random(),
                success: function (ar) {
                    var data = ar.data;
                    roleType = data.roleType;
                    roleMade = data.roleMade;
                    if (data.levels == "1") {
                        buttonsJson.editButton = false;
                    }
                    return data;
                }
            }
        },
        //子组件声明
        components: {
            "LeaderTags": {
                widget: RX.Tag,
                settings: {
                    tagProperty: "roleName",
                    type: "ck"
                },
                methods: {
                    isRequire: function (t) {
                        var roleLevel = roleVm.get("levels");
                        var roleType = roleVm.get("roleType");
                        var combineLevels = RX.ROLE_LEVEL_COMPINE[roleLevel] || roleLevel;
                        var checkFlag;
                        if (roleType == 1) {
                            //业务角色判断角色级别
                            checkFlag = t.levels ? combineLevels.indexOf(t.levels) > -1 : !isPlatAdmin;
                        } else {
                            //流程角色判断是不是
                            checkFlag = true;
                        }
                        return checkFlag && (typeof t.sfyxSt !== "undefined" ? t.sfyxSt !== "UNVALID" : true);
                    }
                }
            }
        },
        afterMount: function () {
            if (roleType == 1) { //业务角色
                showBtnName = "查看角色授权";
                if (roleVm.get("levels") === "2") {
                    showBtnName = "查看分配的管理员用户";
                }
            } else if (roleType == 2) {
                showBtnName = "查看角色组成";
            } else if (roleType == 3) {
                showBtnName = "查看所属机构";
            } else {
                showBtnName = "查看角色授权";
            }
            buttonsJson.buttons[0].name = showBtnName;
            RX.button.init($(".w_button_box"), buttonsJson, "ck");
        }
    });
});

function chooseOrgan() {
    gotoChooseOrgan(showBtnName);
}

function gotoChooseOrgan(title, closeTag) {
    if (roleType == 3) {
        RX.page.open({
            title: title,
            areaType: "tree",
            url: "/role/chooseOrganTree",
            param: {
                type: "ck",
                roleId: id
            }
        });
    } else if (roleMade == 1) { //固定用户
        if (roleVm.get("levels") == 2) {
            //管理员角色
            RX.page.open({
                title: title,
                url: "/role/chooseAdminUser",
                param: {
                    type: "ck",
                    roleId: id
                }
            });
        } else {
            RX.page.open({
                title: title,
                areaType: ['650px', '600px'],
                url: "/role/chooseOrgan",
                param: {
                    type: "ck",
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
                type: "ck",
                roleId: id,
                closeParentTag: closeTag ? "1" : ""
            }
        });
    } else {
        RX.alert("请先选择角色类型");
        return;
    }
}
