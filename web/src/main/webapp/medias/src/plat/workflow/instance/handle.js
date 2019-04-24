var handleVm;
var param = RX.page.param;
$(function () {
    //初始化按钮
    RX.button.init($('.w_button_box'), buttonsJson);
    handleVm = new Rxvm({
        el: ".form_box",
        config: config,
        data: param,
        components: {
            BlrGrid: {
                widget: RX.Grid,
            }
        }
    });
});

// 提交任务
function submitTask() {
    if(handleVm.ruleValidate()) {
        param.sureFunc(handleVm.get("opinion"), handleVm.get("fj_id"), param.layerMsg);
    } else {
        RX.alert("请填写办理意见！");
    }
}

//上传/查看附件
function uploadOrViewFile() {
    var fjId = handleVm.get("fj_id");
    if(!fjId) {
        fjId = RX.uuid();
        handleVm.set("fj_id", fjId);
    }
    RX.page.open({
        title: "资料附件上传",
        areaType:["550px", "400px"],
        url: "/attachment/wfAttachment?fj_id=" + fjId
    });
}


RX.page.cancelCheck = function() {
    RX.confirm("是否取消提交?", function() {
        param.callBackCloseFunc();
    })
}
