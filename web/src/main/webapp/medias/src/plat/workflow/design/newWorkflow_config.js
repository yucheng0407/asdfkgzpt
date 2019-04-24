var config = {
    flowId:{ // 流程ID
        type:"normal",
        rules: {checkSave: ["notNull"]}
    },
    flowName:{ // 选择已有流程
        rules: {checkSave: ["notNull"]},
        type: "layer",
        layerConfig: {
            title: "选择已有流程",
            style: ["300px", "400px"],
            url: "/workflow/design/workflowTypeSelect?selectType=workflow&",
            callbackFunc: "workflowSettingCallback",
            canDelete: true
        },
        changeFunc: "hideCreateSetting"
    },
    newVersion:{
    },
    copyStruct:{
    }
}

//按钮配置
var buttonArr = [
    {
        id: "sure",
        name: "确定",
        onClick: "createWorkFlow",
        style: "c_button"
    },
    {
        id: "cancel",
        name: "取消",
        onClick: "cancelCreate",
        style: "n_button"
    }
];

var buttonsJson = {
    tag: ".w_button_box",
    buttons: buttonArr,
    closeButton: false
};