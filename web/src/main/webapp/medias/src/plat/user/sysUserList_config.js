/**
 * 用户表配置文件
 */

//搜索区字段配置
var sysUserConfig = {
    "query.userName": {
        tagName: "用户名",
        canClear: true
    },
    "query.loginName": {
        tagName: "登录账号",
        canClear: true
    },
    "query.isBlocked": {
        tagName: "是否封锁",
        type: "dict",
        dictConfig: {
            dictCode: [{code: 1, value: "是"}, {code: 0, value: "否"}]
        },
        canClear: true
    }
};

//规定表头
var columns = [
    {title: '用户名', id: 'USER_NAME', width: '20%', align: 'left', renderer: "String"},
    {title: '登录账号', id: 'LOGIN_NAME', width: '20%', align: 'left', renderer: "String"},
    {title: '默认组织', id: 'DEFAULT_ORGAN_NAME', width: '20%', align: 'left', renderer: "String"},
    {title: '是否封锁', id: 'IS_BLOCKED', width: '20%', align: 'left', renderer: "Dict", dictCode: "SF"},
    {title: '修改时间', id: 'XGSJ', width: '20%', align: 'left', renderer: "Date", format: "yyyy-MM-dd HH:mm"}

];

//列表视图设置
var sysUserSettings = {
    url: "/user/getSysUserListPage",
    autoQueryBox: {
        enable: true,
        cols: [100, 140, 100, 140, 100, 140]
    },
    // paged: false,     //是否分页
    autoListBox: {
        enable: true,
        columns: columns,
        canCopy: true,
        allPageChose: false //是否开启全页选择
    }
};

//操作按钮的配置
var buttonArr = [
    {
        id: "addSysUser",
        name: "新增",
        icon: "&#xe62a;",
        onClick: "addSysUser",
        code: "ADD_USER"
    },
    {
        id: "edit",
        name: "修改",
        icon: "&#xe605;",
        onClick: "editSysUser",
        code: "EDIT_USER"
    },
    {
        id: "delSysUser",
        name: "删除",
        icon: "&#xe606;",
        onClick: "delSysUser",
        code: "DEL_USER"
    }, {
        id: "isBlock",
        name: "封锁/解锁",
        icon: "&#xe607;",
        onClick: "isBlock",
        code: "BLOCK_USER"
    }, {
        id: "exportGrid",
        name: "导出",
        icon: "&#xe607;",
        onClick: "exportGrid"
    }
];
var buttonsJson = {
    tag: ".operation_box",
    tpl: null,
    param: "你好",
    title: null,
    buttons: buttonArr,
    pageCode: "YHGLYM",
    beforeInit: function (p) {
    }
};