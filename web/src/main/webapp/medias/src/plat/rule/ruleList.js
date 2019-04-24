var ruleVm;         //规则列表对象
$(function () {
    tableSettings.autoListBox.onRowDblClick = function (rowIndex, rowData, isSelected, event) {
        RX.page.open({
            title: "查看规则",
            url: "/rule/ruleView",
            param: {
                id: rowData.ID
            }
        });
    };
    ruleVm = new Rxvm({
        widget: RX.Grid,
        el: '#dataDiv',
        settings: tableSettings,
        config: searchConfig,
        afterMount: function () {
            RX.button.init($("#operate"), buttonsJson);
        }
    });
});

//新增
function add() {
    RX.page.open({
        title: "新增规则",
        url: "/rule/ruleAdd",
        param: {
            type: "xz"
        }
    });
}

//修改
function edit() {
    var row = ruleVm.getSelected();
    if (row.length > 0) {
        RX.page.open({
            title: "修改规则",
            url: "/rule/ruleEdit",
            param: {
                type: "xg",
                id: row[0].ID
            }
        });
    } else {
        RX.msg(RX.SELECT_EDIT);
    }
}

//删除
function del() {
    var obj = ruleVm.getSelected();//获取选中行的数据
    if (obj == null || obj == undefined || obj[0] == null) {
        RX.msg(RX.SELECT_DELETE);
    } else {
        if (isdel(obj[0].ID)) {
            RX.confirm(RX.CONFIRM_DELETE, function () {
                $.ajax({
                    type: "post",
                    url: "/rule/delAuthRule",
                    data: {authRuleId: obj[0].ID},
                    async: false,
                    success: function (ar) {
                        if (ar.success) {
                            RX.page.reload();
                            RX.msg(RX.SUCCESS_DELETE);
                        } else {
                            RX.alert(ar.msg);
                        }
                    }
                });
            });
        }
    }
}

RX.page.reload = function () {
    ruleVm.reloadGrid();
};

//删除前置验证 判断在不在其它地方使用
function isdel(id) {
    var flag = false;
    $.ajax({
        type: "post",
        url: "/rule/getRoleNameByRuleId",
        data: {id: id},
        async: false,
        success: function (ar) {
            if (ar.success) {
                flag = true;
            } else {
                RX.page.open({
                    title: "该规则在以下要素中使用,不可删除",
                    areaType: "small",
                    url: "/rule/commonMsg",
                    param: {data: ar.data}
                });
            }
        }
    });
    return flag;
}

