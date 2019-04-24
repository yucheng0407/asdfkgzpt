var messageTypeVm,
    param = RX.page.param,
    type = param.type;
$(function () {
    var id = param.id,
        messageType;
    messageTypeVm = new Rxvm({
        el: '.form_box',
        config: config,
        settings: {
            getData: {
                url: id ? "/messageType/getMessageTypeById?id=" + id + "&r=" + Math.random() : null,
                success: function (ar) {
                    messageType = ar.data;
                    return messageType;
                }
            }
        }
    });
    $("#save").click(function () {
        if (messageTypeVm.ruleValidate()) {
            $.ajax({
                type: "post",
                url: "/messageType/saveMessageType",
                data: {messageType: messageTypeVm.getJson()},
                success: function (ar) {
                    if (ar.success) {
                        RX.page.prev().reload();
                        RX.msg(RX.SUCCESS_SAVE);
                        RX.page.close();
                    } else {
                        RX.alert(ar.msg);
                    }
                }
            });
        }
    });
});

function SkipTypeChange(t) {
    //清除数据
    messageTypeVm.set("skipPath", "");
    messageTypeVm.set("winSize", "");
}

RX.page.cancelCheck = function () {
    if (messageTypeVm.ifChange()) {
        RX.confirm(RX.CANCEL_CHECK, function () {
            RX.page.close();
        });
        return false;
    }
    return true;
};