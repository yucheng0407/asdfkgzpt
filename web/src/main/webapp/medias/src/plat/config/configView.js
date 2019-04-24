var vm,
    id = RX.page.param.id;
var buttonsJson = {
    editButton: {
        enable: false
    }
};
$(function () {
    //视图初始化
    vm = new Rxvm({
        el: '.form_box',
        settings: {
            getData: {
                url: id && "/config/getConfigById",
                param: {id: id}
            }
        },
        afterMount: function () {
            //初始化表单按钮控件
            buttons = RX.button.init($(".w_button_box"), buttonsJson, "ck");
        }
    });
});
