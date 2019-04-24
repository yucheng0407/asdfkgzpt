//字段配置
var config = {
    id: {display: false},
    name: {
        rules: {checkSave: ["notNull"]},
        maxLength: 50
    },
    code: {
        rules: {checkSave: ["notNull"]},
        maxLength: 30
    },
    levels: {
        rules: {checkSave: ["notNull"]},
        type: "dict",
        dictConfig: {
            dictCode: "CONFIGLEVEL",
            pcode: roleLevel == "1" ? null : roleLevel,
            showPlsSelect: false
        },
        defaultValue: roleLevel
    },
    bizType: {
        rules: {checkSave: ["notNull"]},
        type: "dict",
        dictConfig: {
            dictCode: "CONFIGTYPE",
            dependence: "levels"
        }
    },
    appId: {},
    appName: {
        rules: {checkSave: ["notNull"]},
        type: "layer",
        layerConfig: {
            url: "/resource/resourceSelect?resourceType=app&",
            title: "选择应用",
            callbackFunc: "selectAppCallback",
            style: "medium",
            canDelete: true
        },
        ifForm: false
    },
    value: {
        rules: {checkSave: ["notNull"]},
        maxLength: 150
    },
    description: {
        type: "textarea",
        textareaConfig: {
            showNum: true
        },
        maxLength: 100
    },
    sfyxSt: {
        display: false,
        defaultValue: "VALID"
    }
};
//按钮配置
var buttonArr = [
    {
        id: "save",
        name: "保存",
        onClick: "save",
        style: "c_button"
    }
];
//按钮json
var buttonsJson = {
    buttons: buttonArr
};

