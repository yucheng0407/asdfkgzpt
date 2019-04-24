//主表单字段配置
var organConfig = {
    id: {        //主键ID
    },
    organName: {        // 名称
        rules: {checkSave: ["notNull"]},
        maxLength: 20,
        tagName: "组织名称"
    },
    sfyxSt: {        //是否有效
        display: false,
        defaultValue: "VALID"
    }
};

//项目子列表字段配置
var projectConfig = {
    "list.*.id": {        //主键ID
    },
    "list.*.projectName": {        // 名称
        maxLength: 20
    },
    "list.*.projectType": {     //项目类型
        maxLength: 20
    },
    "list.*.clrq": {     //成立日期
        type: "date",
        dateConfig: {
            dateFmt: "M月d日"
        },
        defaultValue: "3月4日"
    },
    "list.*.sfyxSt": {        //是否有效
        display: false,
        defaultValue: "VALID"
    }
};

//领导人字列表字段配置
var leaderConfig = {
    "list.*.id": {        //主键ID
    },
    "list.*.leaderName": {        // 姓名
        maxLength: 20,
        disabled: true
    },
    "list.*.userId": {
        display: false
    },
    "list.*.sex": {     //性别
        type: "dict",
        dictConfig: {
            dictCode: [{code: "0", value: "男"}, {code: "1", value: "女"}]
        },
        disabled: true
        // spanShow: false
    },
    "list.*.sfyxSt": {        //是否有效
        display: false,
        defaultValue: "VALID"
    }
};

//按钮区配置
var buttonArr = [
    {
        id: "save",
        name: "保存",
        onClick: "save",
        style: "c_button"
    }
];
var buttonsJson = {
    style: "c_button",
    tag: ".w_button_box",
    buttons: buttonArr
};


