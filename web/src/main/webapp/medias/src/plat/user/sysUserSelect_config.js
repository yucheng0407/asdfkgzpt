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
        tagName: "登录名",
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
    {title: '用户名', id: 'USER_NAME', width: '25%', align: 'center', renderer: "String"},
    {title: '登录名', id: 'LOGIN_NAME', width: '25%', align: 'center', renderer: "String"},
    {title: '默认组织', id: 'DEFAULT_ORGAN_NAME', width: '25%', align: 'center', renderer: "String"},
    {
        title: '是否封锁', id: 'IS_BLOCKED', width: '25%', align: 'center', renderer: function (v) {
            if (v === '1') {
                return '是';
            } else {
                return '否';
            }
        }
    }
];

//列表视图设置
var sysUserSettings = {
    url: "/user/getSysUserListPage",
    autoQueryBox: {
        enable: true,
        cols: [100, 140, 100, 140, 100, 140]
    },
    autoListBox: {
        enable: true,
        columns: columns,
        allPageChose: true,
        mulchose: true, //是否多选
        checkbox: true //是否显示checkbox
    }
};
