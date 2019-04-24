$(function () {
    var id = RX.page.param.id;
    RX.button.init($(".w_button_box"), "", "ck");
    //视图初始化
    new Rxvm({
        el: '.form_box',
        settings: {
            getData: {
                url: "/rule/getAuthRuleById?authRuleId=" + id
            }
        },
        //子组件声明
        components: {
            "ProjectGrid": {}
        }
    });
});
