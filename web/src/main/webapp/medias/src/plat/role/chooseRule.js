var ruleVm,
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
    ruleVm = new Rxvm({
        widget: RX.Grid,
        el: '#dataRule',
        config: config,
        settings: {
            getData: {
                url: "/role/getRuleByRole?roleId=" + roleId + "&random=" + Math.random(),
                success: function (ar) {
                    return {
                        type: type,
                        list: ar.data
                    };
                }
            }
        },
        methods: {
            //编辑规则
            editRule: function (keypath) {
                RX.page.open({
                    title: "修改动态规则",
                    url: "/rule/ruleEdit",
                    param: {
                        type: "xg",
                        func: "ruleEditCallback",
                        id: this.get(keypath + ".ruleId"),
                        keypath: keypath
                    }
                });
            },
            //删除
            delRule: function (keypath) {
                this.set(keypath + ".sfyxSt", "UNVALID");
            },
            //选择
            selRule: function () {
                var ids = getSeRulelIds() || [];
                RX.page.open({
                    title: "请选择动态规则",
                    url: "/rule/ruleSelect",
                    param: {
                        func: "ruleSelectCallback",
                        ruleType: 2,
                        ids:ids.join(",")
                    }
                });
            },
            //新增规则
            addRule: function () {
                RX.page.open({
                    title: "新增动态规则",
                    url: "/rule/ruleEdit",
                    param: {
                        type: "xz",
                        func: "ruleSelectCallback",
                        ruleType: 2
                    }
                });
            },
            /**
             * 查看规则
             * @param keypath
             */
            openRule: function (keypath) {
                RX.page.open({
                    title: "查看动态规则",
                    url: "/rule/ruleView",
                    param: {
                        id: this.get(keypath + ".ruleId")
                    }
                });
            }
        }
    });
    //保存
    $("#save").click(function () {
        var list = ruleVm.get("list");
        if (list && list.length > 0) {
            $.ajax({
                type: "post",
                url: "/role/saveRoleRule",
                data: {list: JSON.stringify(list)},
                success: function (ar) {
                    if (ar.success) {
                        RX.msg(RX.SUCCESS_SAVE);
                        RX.page.close();
                    } else {
                        RX.alert(ar.msg);
                    }
                }
            })
        } else {
            RX.msg(RX.msg_warning, "请选择至少一条数据！！！");
        }
    });
});

//选择规则回调函数
function ruleSelectCallback(id, name, xgsj, description) {
    ruleVm.append("list", {
        roleId: roleId,
        ruleId: id,
        ruleName: name,
        ruleXgsj: xgsj,
        description: description
    });
}

//获取选中的rule的ids
function getSeRulelIds() {
    var ruleArr = ruleVm.get("list");
    var ids = [];
    for (var i = 0, modelsLength = ruleArr.length; i < modelsLength; i++) {
        if (ruleArr[i].sfyxSt !== "UNVALID") {
            ids.push(ruleArr[i].ruleId);
        }
    }
    return ids;
}

//修改规则回调
function ruleEditCallback(id, name, xgsj, description, keypath) {
    ruleVm.set(keypath + ".ruleName", name);
    ruleVm.set(keypath + ".ruleXgsj", xgsj);
    ruleVm.set(keypath + ".description", description);
}