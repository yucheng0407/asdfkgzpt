var config = {
    ruleName: {
        rules: {checkSave: ["notNull"]},
        type: "layer",
        layerConfig: {
            url: "/rule/ruleSelect",
            title: "请选择规则",
            callbackFunc: "ruleCallbackFunc"
        },
        ifForm: false
    },
    id: {
        display: false
    }
};