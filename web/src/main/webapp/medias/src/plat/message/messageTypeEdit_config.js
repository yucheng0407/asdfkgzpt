//model渲染方案配置
var config = {
    id: {display: false},
    name: {
        rules: {checkSave: ["notNull"]}
    },
    code: {
        rules: {checkSave: ["notNull"]}
    },
    urgentLevel: {
        type: "dict",
        dictConfig: {
            dictCode: "XXJJCD"
        }
    },
    validTime: {
        rules: {checkSave: ["isIntGtZero"]}
    },
    operateType: {
        type: "dict",
        dictConfig: {
            dictCode: "XXCZLX",
            checkType: "radio"
        },
        defaultValue: "1"

    },
    winSize: {
        type: "dict",
        dictConfig: {
            dictCode: "WINSIZE"
        }
    },
    skipPath: {
        rules: {checkSave: ["notNull"]}
    },
    skipType: {
        rules: {checkSave: ["notNull"]},
        type: "dict",
        dictConfig: {
            dictCode: "XXTZLX"
        },
        changeFunc: "SkipTypeChange"
    },
    description: {
        type: "textarea",
        textareaConfig: {
            showNum: true
        },
        maxLength: 100
    },
    sfyxSt: {     //是否有效
        display: false,
        defaultValue: "VALID"
    }
};

