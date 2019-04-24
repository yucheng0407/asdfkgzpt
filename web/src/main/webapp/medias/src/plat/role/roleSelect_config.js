/**
 * 角色表配置文件
 */
var param = RX.page.param,
    excludeId = param.excludeId || "";   //排除的id
var sysRoleConfig = {
    "query.roleName": {
        tagName: "角色名称",
        canClear: true
    },
    "query.roleCode": {
        tagName: "角色代码",
        canClear: true
    },
    "query.roleLevel": {
        tagName: "角色级别",
        display: false,
        defaultValue: param.roleLevel || ""
    },
    //不展示的角色类型
    "query.notShowType": {
        display: false,
        defaultValue: param.notShowType || ""
    },
    //排除的id
    "query.excludeId": {
        display: false,
        defaultValue: excludeId
    },
    //是否自己管理的
    "query.ifOwn": {
        display: false,
        defaultValue: param.ifOwn || ""
    }
};
//管理员都是业务角色，无需搜索项
if (!param.isPlatAdmin) {
    sysRoleConfig["query.roleType"] = {
        tagName: "角色类型",
        type: "dict",
        dictConfig: {
            dictCode: "JSLX",
            pcode: [1, 3]
        },
        canClear: true
    };
}

columns = [
    {title: '角色名称', id: 'ROLE_NAME', width: '30%', align: 'left', renderer: "String"},
    {title: '角色代码', id: 'ROLE_CODE', width: '20%', align: 'left', renderer: "String"},
    {title: '角色类型', id: 'ROLE_TYPE', width: '20%', align: 'left', renderer: "Dict", dictCode: "JSLX"},
    {title: '角色级别', id: 'LEVELS', width: '20%', align: 'left', renderer: "Dict", dictCode: "SYSLEVEL"}
];
//列表视图设置
var sysRoleSettings = {
    url: "/role/getRoleListByRole",
    autoQueryBox: {
        enable: true,
        cols: [90, 120, 90, 120, 90, 120]
    },
    autoListBox: {
        enable: true,
        columns: columns,
        checkbox: param.mulchose, //是否显示checkbox ,平台管理员选择业务管理员只能选一个.
        mulchose: param.mulchose, //是否多选,
        allPageChose: false //是否开启全页选择
    }
};
