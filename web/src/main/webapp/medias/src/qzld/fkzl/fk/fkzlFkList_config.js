/**
 * 用户表配置文件
 */
var searchConfig = {
    "query.ydzt": {
        type: "dict",
        dictConfig: {
            dictCode: "YDZT",
            checkType: "radio"
        },
        defaultValue: "NOQUERY"
    },
    "query.fklx": {
        type: "dict",
        dictConfig: {
            dictCode: [
                {code: "防控反馈", value: "防控反馈"},
                {code: "防范反馈", value: "防范反馈"},
                {code: "纠纷调解", value: "纠纷调解"},
                {code: "治安防范", value: "治安防范"},
                {code: "重点关注", value: "重点关注"},
                {code: "治安宣传", value: "治安宣传"}
            ]
        }
    },
    "query.nr": {}
};

//视图设置
var settings = {
    url: "/fkzl/getFkzlFkList",
    selectType: "single",
    limit: 6
};

//操作按钮的配置
var buttonArr = [
];

//存在默认配置
var buttonsJson = {
    tag: ".operation_box",
    tpl: null,
    param: {},
    title: null,
    buttons: buttonArr
};



