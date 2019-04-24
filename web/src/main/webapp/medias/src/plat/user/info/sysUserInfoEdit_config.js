var config = {
    id: { // id
    },
    userName: { // 用户名
        rules: {checkSave: ["notNull"]},
        maxLength: 20
    },
    loginName: { // 登录名
        rules: {checkSave: ["notNull"]},
        maxLength: 20
    },
    sex: { // 性别
        type: "dict",
        dictConfig: {
            dictCode: "SEXDEMO",
            checkType: "radio"
        },
        defaultValue: "1"
    },
    loginPwd: { // 登录密码
        maxLength: 20
    },
    defaultOrganId: { // 默认组织
    },
    sort: { // 序号
    },
    sfyxSt: { // 有效状态
        display: false,
        defaultValue: "VALID"
    },
    isBlocked: { // 是否封锁 0否 1是
        defaultValue: "0"
    }
};
var userInfoConfig={
    sfyxSt: { // 有效状态
        display: false,
        defaultValue: "VALID"
    },
    sfzhm:{
        rules: {checkValue: ["isIdCardNo"]},
        maxLength: 18
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



