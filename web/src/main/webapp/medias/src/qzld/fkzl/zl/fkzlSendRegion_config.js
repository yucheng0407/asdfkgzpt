var config = {
    id: { // ID

        rules: {checkSave: ["notNull"]}
    },
    regionWay:"RECT",
    zltype: { // 指令类型
        rules: {checkSave: ["notNull"]},
        type: "dict",
        dictConfig: {
            dictCode: "ZLLX",
        },
        defaultValue: "1"
    },
    content: { // 指令内容
        rules: {checkSave: ["notNull"]},
        maxLength: 250
    },
    reciver: { // 接收人
        rules: {checkSave: ["notNull"]},
        maxLength: 25
    }
};