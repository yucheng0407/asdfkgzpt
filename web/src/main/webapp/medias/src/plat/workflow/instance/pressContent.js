
var config = {
    content: {
        maxLength: 250,
        rules:{checkSave:["notNull"]}
    }
};

var buttonsJson= {
    tag: ".w_button_box",
    buttons: [
        {
            id: "sure",
            name: "确定",
            onClick: "pressAction",
            style: "c_button"
        }
    ]
};

var pressVm;
var param = RX.page.param;
$(function () {
    RX.button.init($('.w_button_box'), buttonsJson);
    pressVm = new Rxvm({
        el: ".form_box",
        config: config,
        data: param
    });
});

//确定按钮事件
function pressAction() {
    if(pressVm.ruleValidate()) {
        param.postPress(pressVm.get("content"));
        RX.page.close();
    } else {
        RX.alert("请填写催办内容！");
    }
}
