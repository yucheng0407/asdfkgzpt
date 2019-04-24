var startNodeVm;
var nodeProp = RX.page.param.property;
$(function () {
    //初始化按钮
    RX.button.init($(".w_button_box"), buttonsJson);
    startNodeVm = new Rxvm({
        el: ".form_box",
        config: config,
        data: nodeProp
    });
});

// 保存结束环节
function saveStartNode() {
    if(startNodeVm.ruleValidate()) {
        if (startNodeVm) {
            var elem = RX.parseJson(startNodeVm.getJson());
            for (var key in nodeProp) {
                if (elem.hasOwnProperty(key)) nodeProp[key] = elem[key];
            }
        }
        RX.page.close();
    }
}