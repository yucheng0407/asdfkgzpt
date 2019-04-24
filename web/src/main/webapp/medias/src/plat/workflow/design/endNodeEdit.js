var endNodeVm;
var nodeProp = RX.page.param.property;
$(function () {
    //初始化按钮
    RX.button.init($(".w_button_box"), buttonsJson);
    endNodeVm = new Rxvm({
        el: ".form_box",
        config: config,
        data: nodeProp
    });
});

// 保存结束环节
function saveEndNode() {
    if(endNodeVm.ruleValidate()) {
        if (endNodeVm) {
            var elem = RX.parseJson(endNodeVm.getJson());
            for (var key in nodeProp) {
                if (elem.hasOwnProperty(key)) nodeProp[key] = elem[key];
            }
        }
        RX.page.close();
    }
}