var judgeNodeVm;
var judgeJson = getCurrentBpmnElementData();
$(function () {
    if (judgeJson.fromServer) {
        //从服务端获取
        $.ajax({
            url: "/workflow/ibps/getBpmnSimpleNode",
            type: "post",
            data: {wfId: bpmnProcId, domid: judgeJson.domid},
            success: function (data) {
                initRxvm(data);
            }
        });
    } else {
        initRxvm(judgeJson);
    }
});

function initRxvm(json) {
    judgeNodeVm = new Rxvm({
        el: $("[data-tab='gateway-settings']")[0],
        config: config,
        data: json
    });
}

// 保存决策环节
function updateNodeAttr() {
    updateValue(config, judgeNodeVm.get(), judgeJson);
}