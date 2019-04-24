var workflowVm;
$(function(){
    workflowVm = new Rxvm({
        el: "#flowSelect",
        config: config,
        afterMount: function(){
            RX.button.init($("#w_butt"), buttonsJson);
        }
    });
});

// 创建流程
function createWorkFlow() {
    var flowId = workflowVm.get("flowId");
    var newVersion = !!workflowVm.get("newVersion");
    var copyStruct = !!workflowVm.get("copyStruct");
    // 当没有选择任何流程时走原新建流程逻辑
    if(flowId == undefined || $.trim(flowId)==""|| (!newVersion && !copyStruct)) {
        RX.page.close();// 关闭流程选择窗口
        panel().newFlow(); // 打开流程设置界面
    } else {
        $.get("/workflow/design/getCopyWorkflowJSON", {
            id: flowId,
            newVersion: newVersion,
            copyStructure: copyStruct,
            c: Math.random
        }, function (ar) {
            if (ar.success) {
                panel().getWorkflow(ar.data);
                var flow = panel().getPanel().flow.property;
                if(newVersion) flow.operatingStatus = '3';//新版本
                if(copyStruct) flow.operatingStatus = '4';//复制结构
                if(newVersion && copyStruct) flow.operatingStatus = '5';//另存
                RX.page.close();
            } else {
                RX.alert(ar.msg);
            }
        }, 'json');
    }
}

//取消
function cancelCreate() {RX.page.close();}

//拿到流程图绘制面板
function panel() {
    return $("#flow-panel", RX.page.prevWin().document)[0].contentWindow;
}

/*选择已有流程确定后*/
function workflowSettingCallback(flowId, flowName) {
    workflowVm.set("flowId", flowId);
    workflowVm.set("flowName", flowName);
    $(".label_check").removeClass("hideElement");
    workflowVm.set("newVersion","on");
    workflowVm.set("copyStruct","on");
}

/*点击清空按钮的时候隐藏设置按钮*/
function hideCreateSetting() {
    workflowVm.set("flowId", "");
    workflowVm.set("flowName", "");
    $(".label_check").addClass("hideElement");
    workflowVm.set("newVersion","");
    workflowVm.set("copyStruct","");
}