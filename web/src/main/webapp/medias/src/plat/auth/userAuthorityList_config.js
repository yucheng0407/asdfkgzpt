/**
 * 用户表配置文件
 */

//搜索区字段配置
var sysUserConfig = {
    "query.organName": {
        tagName: "所属机构",
        disabled: true,
        canClear: true,
        spanShow: false
    },
    "organId":{
        display:false,
        canClear:true
    },
    "query.userName": {
        tagName: "用户名",
        canClear: true
    },
    "query.loginName": {
        tagName: "登录账号",
        canClear: true
    }
};

//规定表头
var columns = [
    {title: '用户名', id: 'USER_NAME', width: '50%', align: 'left', renderer: "String"},
    {title: '登录账号', id: 'LOGIN_NAME', width: '50%', align: 'left', renderer: "String"}
];

//列表视图设置
var sysUserSettings = {
    url: "/role/getUserAuthorityList",
    autoQueryBox: {
        enable: true,
        cols: [100, 140, 100, 140, 100, 140]
    },
    autoListBox: {
        enable: true,
        columns: columns,
        allPageChose: false //是否开启全页选择
    }
};

//操作按钮的配置
var buttonArr = [
    {
        id: "auth",
        name: "授权",
        icon: "&#xe605;",
        onClick: "auth"
    }
];
var buttonsJson = {
    tag: ".operation_box",
    tpl: null,
    param: {},
    title: null,
    buttons: buttonArr
};