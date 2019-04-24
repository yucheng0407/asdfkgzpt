var config = {
    name: {
        rules: {checkSave: ["notNull"]},
        maxLength: 25
    },
    code: {
        maxLength: 50
    },
    metadataColumn: {
        disabled: true
    },
    type: {
        type: "dict",
        dictConfig: {
            dictCode: [{code: "1", value: "分组属性"}, {code: "2", value: "运算属性"}]
        },
        disabled: true
    },
    groupType: {
        type: "dict",
        dictConfig: {
            showPlsSelect: false,
            dictCode:"BBZDFZLX"
            //[{code: "1", value: "按值分组"}, {code: "2", value: "按范围分组"}, {code: "3", value: "按日期单位分组分组"}]
        },
        defaultValue:"1"
    },
    calculateType: {
        type: "dict",
        dictConfig: {
            showPlsSelect: false,
            dictCode: "BBZDSZLX"
        },
        defaultValue:"1",
        changeFunc:"changeName"
    },
    orderType: {
        type: "dict",
        dictConfig: {
            showPlsSelect: false,
            dictCode: [{code: "0", value: "默认"}, {code: "1", value: "升序"}, {code: "2", value: "降序"}]
        },
        defaultValue:"0"
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

var buttonsJson = {
    tag: ".w_button_box",
    buttons: buttonArr
};



