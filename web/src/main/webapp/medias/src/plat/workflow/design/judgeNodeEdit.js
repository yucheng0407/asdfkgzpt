var judgeNodeVm;
var pro = RX.page.param;
var nodeProp = pro.property;
$(function () {
    //初始化按钮
    RX.button.init($(".w_button_box"), buttonsJson);
    judgeNodeVm = new Rxvm({
        el: ".form_box",
        config: config,
        data: RX.copy(nodeProp, true),
    });
});

// 保存决策环节
function saveJudgeNode() {
    if(judgeNodeVm.ruleValidate()) {
        if (nodeProp) {
            var elem = RX.parseJson(judgeNodeVm.getJson());
            for (var key in elem) {
                nodeProp[key] = elem[key];
            }
            var obj = pro._obj;
            if (obj != null ) {
                var newName = elem.name;
                obj.attr("title", newName);
                var text = obj.data("enclosedText");
                if (text != null) {
                    pro.textWrap2(text, 50, newName, 30);
                    text.attr("title", newName);
                }
            }
        }
        RX.page.close();
    }
}