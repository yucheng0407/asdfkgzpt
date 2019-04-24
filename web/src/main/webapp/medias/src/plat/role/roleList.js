var roleVm;       //角色列表对象
$(function () {
    tableSettings.autoListBox.onRowDblClick = function (rowIndex, rowData, isSelected, event) {
        RX.page.open({
            title: "查看角色",
            url: "/role/roleView",
            param: {
                id: rowData.ID
            }
        });
    };
    roleVm = new Rxvm({
        widget: RX.Grid,
        el: '#dataDiv',
        settings: tableSettings,
        config: SearchConfig,
        afterMount: function () {
            RX.button.init($("#operate"), buttonsJson);
        }
    });
});

RX.page.reload = function () {
    roleVm.reloadGrid();
};

function add() {
    var url = "/role/roleAdd";
    RX.page.open({title: "新增角色", url: url, param: {type: "xz"}});
}

function editRow(id) {
    var url = "/role/roleEdit";
    RX.page.open({
        title: "修改角色", url: url, param: {
            type: "xg",
            id: id
        }
    });
}

function delRow(id) {
    RX.confirm(RX.CONFIRM_DELETE, function (index) {
        $.ajax({
            type: "post",
            url: "/role/deleteRole?id=" + id,
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
        RX.page.close(index);
    });
}

function resourceRow(id) {
    RX.page.open({
        title: "设置角色资源", areaType: "tree", url: "/resource/roleResourceTreeSelect", param: {
            roleId: id
        }
    });
}