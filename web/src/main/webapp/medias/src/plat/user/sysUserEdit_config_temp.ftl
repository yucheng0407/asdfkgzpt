<!--主对象配置-->
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
<#if organType==ns||organType==np>
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
</#if>
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
//用户个人信息配置
var userInfoConfig={
<#list userInfo as item>
   sfzhm:{
        rules: {checkValue: ["isIdCardNo"]},
        maxLength: 18
    },
</#list>
    sfyxSt: { // 有效状态
        display: false,
        defaultValue: "VALID"
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
    "list.*.roleType": {        //角色类型
    },
    "list.*.levels": {        //角色级别
    },
    "list.*.roleTypeName": {        //角色类型名称
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

<#if organType==ms||organType==mp>
<!--机构岗位用户列表字段配置-->
var sysGlbOrganUserPostConfig = {
    "list.*.id": {        //主键ID
        display: false
    },
    "list.*.userId": {        //用户ID
        display: false
    },
    "list.*.organId": {        //机构ID
        display: false
    },
    "list.*.organName": {        //机构名称
        ifForm: false
    },
    <#if organType==ys||organType==yp>
    "list.*.postRoleName": {        //岗位名称
        ifForm: false
    },
    "list.*.postRoleId": {        //岗位ID
        display: false
    },
    </#if>
    "list.*.sfyxSt": {        //是否有效
        display: false,
        defaultValue: "VALID"
    }
};
</#if>
<!--用户所在角色列表字段配置-->
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



