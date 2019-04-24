var gridVm;
var fbid = RX.page.param.fbid;
var jsid = RX.page.param.jsid;
var sfkhf = RX.page.param.sfkhf;
$(function () {
    $.ajax({
        type: "post",
        url: "/fkzl/getFkzlFkDetail?fbid=" + fbid + "&sfkhf=" + sfkhf,
        dataType: "json",
        async: false,
        success: function (ar) {
            if (ar.success) {
                var fbrMessage = ar.data[0];
                $(".bt_title").html(fbrMessage.BT);
                var fbrDiv = $(".feedback_message");
                var jsrDiv = $(".reply_box");
                fbrDiv.html("");
                jsrDiv.html("");
                var fkDetail = ['<div class="message_title_box">' +
                '<a class="message_title">', fbrMessage.FBDWMC, ' ', fbrMessage.CJRMC, '：', ' </a>' +
                '</div>' +
                '<p class="message_content">', fbrMessage.NR, '</p>' +
                '<ul class="message_fj">' +
                '<li>' +
                '<a href="#none">图图图图图.jpg</a>' +
                '<i class="iconfont">&#xe630;</i>' +
                '</li>' +
                '</ul><div class="message_time_hf">', (sfkhf == '1' ? "<a onclick=\"reply()\" class=\"message_hf\">回复</a>" : ""), '' +
                '<p class="message_time">', fbrMessage.CJSJ, '</p>' +
                '</div>' +
                '<a class="message_dw">' +
                '<i class="iconfont">&#xe7fd;</i>位置获取成功' +
                '</a>'
                ].join('');
                if (fbrMessage.CHILD_MENU.length > 0) {
                    for (var i = 0; i < fbrMessage.CHILD_MENU.length; i++) {
                        fkDetail += ['<p style="border-top:1px dashed #c3c3c3;margin:10px 0 5px 0;"></p><div class="message_title_box">' +
                        '<a class="message_title">补充说明：</a>' +
                        '</div>' +
                        '<p class="message_content">', fbrMessage.CHILD_MENU[i].NR, '</p>' +
                        '<ul class="message_fj">' +
                        '<li>' +
                        '<a href="#none">图图图图图.jpg</a>' +
                        '<i class="iconfont">&#xe630;</i>' +
                        '</li>' +
                        '</ul>' +
                        '<div class="message_time_hf"><p class="message_time">', fbrMessage.CHILD_MENU[i].XGSJ, '</p></div>' +
                        '<a class="message_dw">' +
                        '<i class="iconfont">&#xe7fd;</i>位置获取成功' +
                        '</a>'].join("");
                    }
                }
                fkDetail += ['</div>'].join('');
                fbrDiv.html(fbrDiv.html() + fkDetail);
                $(".feedback_message").show();
                var jsrDetail = '';
                var jsrMessage = "";
                if (ar.data.length > 1) {
                    for (var i = 1; i < ar.data.length; i++) {
                        jsrMessage = ar.data[i];
                        jsrDetail += ['<div class="short_message">' +
                        '<div class="message_title_box">' +
                        '<a class="message_title">', jsrMessage.JSDWMC, ' ', jsrMessage.JSRMC, '：', ' </a>' +
                        '</div>'].join("");
                        for (var j = 0; j < jsrMessage.CHILD_MENU.length; j++) {
                            if (j != 0) {
                                jsrDetail += ['<div class="double_reply_box">' +
                                '<div class="message_title_box">' +
                                '<a class="message_title">', (jsrMessage.MARK == "jsr" ? jsrMessage.JSRMC : fbrMessage.CJRMC), '</a>' +
                                '</div>'].join("");
                            }
                            jsrDetail += ['<p class="message_content">', jsrMessage.CHILD_MENU[j].NR, '</p>' +
                            '<ul class="message_fj">' +
                            '<li>' +
                            '<a href="#none">图图图图图.jpg</a>' +
                            '<i class="iconfont">&#xe630;</i>' +
                            '</li>' +
                            '</ul>' +
                            '<div class="message_time_hf"><p class="message_time">', jsrMessage.CHILD_MENU[j].XGSJ, '</p></div>' +
                            '<a class="message_dw">' +
                            '<i class="iconfont">&#xe7fd;</i>位置获取成功' +
                            '</a>'].join("");
                            if (j != 0) {
                                jsrDetail += ['</div>'].join("");
                            }
                        }
                        jsrDetail += ['</div>'].join('');
                    }
                }
                jsrDiv.html(jsrDiv.html() + jsrDetail);
            } else {
                RX.msg(RX.ICON_ERROR, "获取反馈详情信息失败！");
            }
        }
    });

});

function reBack() {
    RX.page.goto("/fkzl/fkzlFkList");
}

function reply() {
    RX.page.open("/fkzl/fkzlFkEdit?jsid=" + jsid
    );
}
