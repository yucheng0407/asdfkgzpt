var config = {
    name: {
        rules: {checkSave: ["notNull"]}
    },
    decisionType: {
        rules: {checkSave: ["notNull"]},
        type: "dict",
        dictConfig: {
            dictCode: [{code: "1", value: "自动决策"}, {code: "0", value: "手动决策"}],
            checkType: "radio"
        },
        disabled: true,
        spanShow: false
    }
};
