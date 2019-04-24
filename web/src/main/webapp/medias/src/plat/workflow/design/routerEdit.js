var routerVm;
var routerProp = RX.page.param.property;
$(function () {
    RX.button.init($('.w_button_box'), buttonsJson);
    routerVm = new Rxvm({
        el: ".form_box",
        config: config,
        data: routerProp
    });
});

// 保存流向
function saveRouter() {
    if(routerVm.ruleValidate()) {
        if (routerVm) {
            var elem = RX.parseJson(routerVm.getJson());
            for (var key in routerProp) {
                if (elem.hasOwnProperty(key)) routerProp[key] = elem[key];
            }
        }
        RX.page.close();
    }
}