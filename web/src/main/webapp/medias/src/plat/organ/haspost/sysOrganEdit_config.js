var config = {
    id: { // 主键ID
    },
    organName: { // 机构名称
        rules: {checkSave: ["notNull"]},
        maxLength: 20
    },
    fullName: { // 组织机构全称
        rules: {checkSave: ["notNull"]},
        maxLength: 20
    },
    organCode: { // 机构代码
        rules: {checkKeyup: ["isCode"], checkSave: ["notNull"]},
        maxLength: 25
    },
    parentOrg: { // 上级机构
    },
    parentName: {
        type: "layer",
        layerConfig: {
            url: "/organ/organTree?",
            // url: "/tree/getTree?",
            title: "选择上级机构",
            callbackFunc: "parentOrganSelectCallback",
            style: "tree",
            checkFunc: "addOrganId",
            canDelete: true,
            deleteProperty: "parentOrg"
        }
    },
    sortNum: { // 显示顺序
    },
    description: { // 备注
        type: "textarea",
        textareaConfig: {
            showNum: true
        },
        maxLength: 100
    },
    sfyxSt: { // 有效状态 0无效 1有效
        display: false,
        defaultValue: "VALID"
    },
    organLevel: { // 组织机构级别
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
    "list.*.glType": {        //关联类型，3：用户，1：基础岗位，2：组织, 4：实际岗位
    },
    "list.*.roleName": {        //角色名称
    },
    "list.*.roleCode": {        //角色编码
    },
    "list.*.roleTypeName": {        //角色编码
    },
    "list.*.roleType": {        //角色类型
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

//岗位关联表列表字段配置
var sysGlbPostConfig = {
    "list.*.id": {        //主键
    },
    "list.*.roleId": {        //角色ID
    },
    "list.*.glId": {        //关联ID
    },
    "list.*.glType": {        //关联类型，3：用户，1：基础岗位，2：组织, 4：实际岗位
    },
    "list.*.roleName": {        //角色名称
        disabled: true
    },
    "list.*.roleCode": {        //角色编码
        disabled: true
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



