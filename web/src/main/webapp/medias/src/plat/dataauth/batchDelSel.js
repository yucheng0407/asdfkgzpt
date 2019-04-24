var batchVm;  //数据权限对象
$(function () {
    //初始化尺寸
    batchVm = new Rxvm({
        el: '#batchView',
        config: config
    });
    //保存按钮事件
    $("#save").click(function () {
        if (batchVm.ruleValidate()) {
            var $objectId = batchVm.getElement("objectId");
            var objType = $objectId.val() ? $objectId.find("option:selected").text() : "";
            RX.confirm("确定要删除选择用户的所有" + objType + "权限吗？", function () {
                $.ajax({
                    type: "post",
                    url: "/auth/batchDel",
                    async: false,
                    data: {
                        userIds: batchVm.get("userIds"),
                        objectId: batchVm.get("objectId") || ""
                    },
                    success: function (ar) {
                        if (ar.success) {
                            RX.page.prev().reload();
                            RX.msg(RX.SUCCESS_DELETE);
                            RX.page.close();
                        } else {
                            RX.alert(ar.msg);
                        }
                    }
                });
            });
        }
    });
});

/**
 * 获取对象字典数据
 */
function getObjZd() {
    var zdList;
    $.ajax({
        type: "get",
        url: "/auth/getObjList",
        async: false,
        success: function (ar) {
            if (ar.success) {
                zdList = ar.data;
            } else {
                RX.alert(ar.msg);
            }
        }
    });
    return zdList;
}

function userCallbackFunc(ids, names) {
    batchVm.set("userIds", ids);
    batchVm.set("userNames", names);
}

//清空选择的ids
function delUserIds() {
    batchVm.set("userIds", "");
}
