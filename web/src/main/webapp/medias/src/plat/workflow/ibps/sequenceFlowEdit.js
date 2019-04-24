var routerVm;
var routerJson = getCurrentBpmnElementData();
$(function () {
    if (routerJson.fromServer) {
        $.ajax({
            url: "/workflow/ibps/getBpmnSimpleRouter",
            type: "post",
            data: {wfId: bpmnProcId, domid: routerJson.domid},
            success: function (data) {
                initRxvm(data);
            }
        });
    } else {
        initRxvm(routerJson);
    }
});

function initRxvm(json) {
    routerVm = new Rxvm({
        el: $("[data-tab='seq-settings']")[0],
        config: config,
        data: json
    });
}

// 保存流向
function updateNodeAttr() {
    updateValue(config, routerVm.get(), routerJson);
}