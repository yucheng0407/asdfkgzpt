var vm;
$(function () {
    settings.autoListBox.onRowDblClick = function (rowIndex, rowData, isSelected, event) {
        RX.page.open({
            title: "查看配置",
            url: "/config/configView",
            param: {
                id: rowData.ID
            }
        });
    };
    vm = new Rxvm({
        widget: RX.Grid,
        el: '.base_box',
        settings: settings,
        config: config,
        afterMount: function () {
            RX.button.init($("#operate"), buttonsJson);
        }
    });
});

//新增配置
function add() {
    RX.page.open({
        title: "新增配置",
        url: "/config/configAdd"
    });
}

//按类型展示
function typeShow() {
    RX.page.goto("/config/configTypeShow");
}

//删除配置
function delConfig(id) {
    RX.confirm(RX.CONFIRM_DELETE, function (index) {
        $.ajax({
            type: "post",
            url: "/config/delConfig",
            data: {id: id},
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

//修改配置
function editConfig(id) {
    RX.page.open({
        title: "修改配置",
        areaType: "medium",
        url: "/config/configEdit",
        param: {
            id: id
        }
    });
    RX.stopBubble();
}

//刷新全局接口
RX.page.reload = function (param) {
    vm.reloadCurrent(param);
}
