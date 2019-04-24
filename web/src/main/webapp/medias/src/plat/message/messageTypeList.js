//消息vm
var messageVm;
$(function () {
        tableSettings.autoListBox.onRowDblClick = function (rowIndex, rowData, isSelected, event) {
            RX.page.open({
                title: "查看消息类型",
                url: "/message/messageTypeView",
                param: {
                    id: rowData.ID
                }
            });
        };
        messageVm = new Rxvm({
            widget: RX.Grid,
            el: '#dataDiv',
            settings: tableSettings,
            config: searchConfig,
            afterMount: function () {
                //初始化按钮
                RX.button.init($("#operate"), buttonsJson);
            }
        });
    }
);

//新增
function add() {
    RX.page.open({
        areaType:[700, 520],
        title: "新增消息类型",
        url: "/message/messageTypeAdd",
        param: {
            type: "xz"
        }
    });
}

//修改
function edit() {
    var row = messageVm.getSelected();
    if (row && row.length === 1) {
        RX.page.open({
            title: "修改消息类型",
            areaType:[700, 520],
            url: "/message/messageTypeEdit",
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
    var obj = messageVm.getSelected();//获取选中行的数据
    if (obj == null || obj.length != 1) {
        RX.msg(RX.SELECT_DELETE);
    } else {
        RX.confirm(RX.CONFIRM_DELETE, function (index) {
            $.ajax({
                type: "post",
                url: "/messageType/deleteMessageType",
                data: {id: obj[0].ID},
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

function sendMessage() {
    RX.page.open({
        title: "发送消息",
        url: "/message/messageEdit"
    });
}

RX.page.reload = function () {
    messageVm.reloadGrid();
};