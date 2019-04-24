var config = {
    id: { // ID
    },
    name: { // 元数据名称
        rules: {checkSave: ["notNull"]},
        maxLength: 25
    },
    code: { // 元数据编码
        rules: {checkSave: ["notNull"]},
        maxLength: 25
    },
    type: { // 实现类型，“1”数据表，“2”视图，“3”程序
        rules: {checkSave: ["notNull"]},
        type: "dict",
        dictConfig: {
            dictCode: "YSJSXLX",
            showPlsSelect: false
        },
        changeFunc: "typeChangeFunc"
    },
    detail: { // 实现细节，数据表名/视图名/程序包+方法名
        rules: {checkSave: ["notNull"]},
        type: "layer",
        layerConfig: {
            url: "/report/sysMetaDataDetailSelect",
            title: "选择数据表",
            checkFunc: "detailCheckFunc",
            callbackFunc: "detailSelectCallback"
        }
    },
    sfyxSt: { // 是否有效，“0”无效，“1”有效
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

var buttonsJson = {
    tag: ".w_button_box",
    buttons: buttonArr
};



