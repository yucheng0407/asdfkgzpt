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
        changeFunc: "organChange"
    },
    dftOrganName: {        //默认机构
        type: "layer",
        layerConfig: {
            url: "/organ/organTree?",
            style: "tree",
            callbackFunc: "organSelectCallback",
            canDelete: true
        },
        changeFunc: "organChange",
        rules: {checkSave: ["notNull"]}
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

//角色关联表列表字段配置
var sysGlbRoleConfig = {
    "list.*.id": {        //主键
    },
    "list.*.roleId": {        //角色ID
    },
    "list.*.glId": {        //关联ID
    },
    "list.*.glType": {        //关联类型，3：用户，2：组织,
    },
    "list.*.sfqySt": {        //是否启用 1启用0禁用
        display: false,
        defaultValue: "VALID"
    },
    "list.*.sfyxSt": {        //是否有效
        display: false,
        defaultValue: "VALID"
    }
};

var organRoleConfig = {
    "list.*.roleType": {        //角色类型
    },
    "list.*.roleCode": {        //角色类型名称
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



