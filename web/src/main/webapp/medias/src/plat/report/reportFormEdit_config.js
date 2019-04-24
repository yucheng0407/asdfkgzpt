//字段配置
var config = {
    name:{
        rules:{checkValue:["notNull"],checkSave:["notNull"]}
    },
    "settings.title":{
        rules:{checkValue:["notNull"],checkSave:["notNull"]},
        changeFunc:"freshPreview"
    },
    "settings.xTitle":{
        changeFunc:"freshPreview"
    },
    "settings.yTitle":{
        changeFunc:"freshPreview"
    },
    "settings.rownum":{
        rules:{checkValue:["isIntGteZero"]},
        changeFunc:"freshPreview"
    },
    // ruleType: {
    //     type:"dict",
    //     dictConfig:{
    //         checkType:"radio",
    //         dictCode:[{code:"0",value:"无规则"},{code:"1",value:"操作用户"},{code:"2",value:"操作用户所在机构"}]
    //     },
    //     defaultValue:"0",
    //     changeFunc:"freshPreview"
    // },
    // "settings.ruleColumn":{
    //     rules:{
    //         checkValue:["checkBelongMetaData"],
    //         checkSave:["checkBelongMetaData"]
    //     },
    //     changeFunc:"freshPreview"
    // },
    sfyxSt:{
        defaultValue:"VALID"
    }
}

//按钮配置
var buttonArr = [
    {
        id: "save",
        name: "保存",
        onClick: "save",
        style: "c_button"
    },
    {
        id: "back",
        name: "返回",
        onClick: "back",
        style: "n_button"
    }
];

var buttonsJson = {
    tag: ".w_button_box",
    buttons: buttonArr,
    closeButton:false
};



