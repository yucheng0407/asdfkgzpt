var config = {
    remark: {           //字典项扩展
        maxLength: 100
    },
    sort: {        //序号
        rules: {checkSave: ["notNull", "isIntGtZero", "isInteger"]},
        maxLength: 10
    },
    code:{
        rules: {checkSave: ["notNull"]},
        maxLength: 30
    },
    value:{
        rules: {checkSave: ["notNull"]},
        maxLength: 50
    },
    pcode:{
        type:"dict",
        dictConfig: {
            reqInterface: "getParentDict"
        },
        maxLength: 30
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



