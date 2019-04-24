var id = RX.page.param.id;
$(function () {

    //初始化表单按钮控件
    buttons = RX.button.init($(".w_button_box"), buttonsJson, "ck");

    //视图初始化
    new Rxvm({
        el: '.form_box',
        settings: {
            getData: {
                url: "/demoOrgan/getDemoOrganById?id=" + id
            }
        },
        components: {
            "ProjectGrid": {
                widget: RX.Grid
            },
            "LeaderGrid": {
                widget: RX.Grid
            }
        }
    });

});

function getSexDict() {
    return [
        {"value": "男", "code": "0"},
        {"value": "女", "code": "1"}
    ];
}
