var startNodeVm;
var startJson = getCurrentBpmnElementData();
$(function () {
    if (startJson.fromServer) {
        //从服务端获取
        $.ajax({
            url: "/workflow/ibps/getBpmnSimpleNode",
            type: "post",
            data: {wfId: bpmnProcId, domid: startJson.domid},
            success: function (data) {
                initRxvm(data);
            }
        });
    } else {
        initRxvm(startJson);
    }
});

function initRxvm(json) {
    startNodeVm = new Rxvm({
        el: $("[data-tab='start-settings']")[0],
        config: config,
        data: json
    });
}

// 保存结束环节
function updateNodeAttr() {
    updateValue(config, startNodeVm.get(), startJson);
}