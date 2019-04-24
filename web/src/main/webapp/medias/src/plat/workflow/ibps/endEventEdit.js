var endNodeVm;
var endJson = getCurrentBpmnElementData();
$(function () {
    if (endJson.fromServer) {
        //从服务端获取
        $.ajax({
            url: "/workflow/ibps/getBpmnSimpleNode",
            type: "post",
            data: {wfId: bpmnProcId, domid: endJson.domid},
            success: function (data) {
                initRxvm(data);
            }
        });
    } else {
        initRxvm(endJson);
    }
});

function initRxvm(json) {
    endNodeVm = new Rxvm({
        el: $("[data-tab='end-settings']")[0],
        config: config,
        data: json
    });
}

// 保存结束环节
function updateNodeAttr() {
    updateValue(config, endNodeVm.get(), endJson);
}