var messageVm;
$(function () {
    messageVm = new Rxvm({
        el: '.form_box',
        config: config
    });
//消息的发送
    $("#send").click(function () {
        if (messageVm.ruleValidate()) {
            $.ajax({
                type: "post",
                url: "/message/generateMessage",
                data: {message: messageVm.getJson()},
                success: function (ar) {
                    if (ar.success) {
                        RX.msg("发送成功");
                        RX.page.close();
                    } else {
                        RX.alert(ar.msg);
                    }
                }
            });
        }
    });
});

function getMessageType() {
    var result = [];
    $.ajax({
        url: "/messageType/getMessageTypeList",
        type: "post",
        async: false,
        success: function (ar) {
            $.each(ar.data, function (i, t) {
                result.push({"value": t.NAME, "code": t.CODE})
            })
        }
    });
    return result;
}

function sendUserSelect(ids, names) {
    messageVm.set('sendUser', names);
    messageVm.set("sendUserIds", ids);
}

RX.page.cancelCheck = function () {
    if (messageVm.ifChange()) {
        RX.confirm(RX.CANCEL_CHECK, function () {
            RX.page.close();
        });
        return false;
    }
    return true;
};

function confirmFunc(nodes) {
    var sendUserIds = "", sendUserNames="";
    $.each(nodes, function (i, t) {
        sendUserIds += t.id + ",";
        sendUserNames += t.name + ",";
    });
    messageVm.set("sendUserIds", sendUserIds);
    messageVm.set("sendUser", sendUserNames);
}