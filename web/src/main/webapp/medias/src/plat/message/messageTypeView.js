var param = RX.page.param;
$(function () {
    RX.button.init($(".w_button_box"), "", "ck");
    new Rxvm({
        el: '.form_box',
        settings: {
            getData: {
                url: "/messageType/getMessageTypeById?id=" + param.id + "&r=" + Math.random()
            }
        }
    });
});