/**
 * 角色表配置文件
 */
var param = RX.page.param,
    kind = param.kind,
    levels = param.levels || "",   //包含的角色级别，多个逗号隔开
    excludeId = param.excludeId || "";   //排除的id
var columns, sysRoleConfig;
//规定表头
if ("role" === kind || "combineRole" === kind || "all" === kind) {
    //搜索区字段配置
    sysRoleConfig = {
        "query.roleName": {
            tagName: "角色名称",
            canClear: true
        },
        "query.roleCode": {
            tagName: "角色代码",
            canClear: true
        },
        "query.levels": {
            display: false,
            defaultValue: levels
        },
        "query.excludeId": {
            display: false,
            defaultValue: excludeId
        },
        //非平台管理员标志
        "query.notAdminFlag": {
            display: false,
            defaultValue: param.notAdminFlag || ""
        }
    };
    columns = [
        {title: '角色名称', id: 'ROLE_NAME', width: '30%', align: 'left', renderer: "String"},
        {title: '角色代码', id: 'ROLE_CODE', width: '30%', align: 'left', renderer: "String"},
        {title: '角色类型', id: 'ROLE_TYPE_NAME', width: '25%', align: 'left', renderer: "String"},
        {title: '角色级别', id: 'LEVELS', width: '20%', align: 'left', renderer: "Dict", dictCode: "SYSLEVEL"}
    ];
} else {
    sysRoleConfig = {
        "query.roleName": {
            tagName: "岗位名称",
            canClear: true
        },
        "query.roleCode": {
            tagName: "岗位代码",
            canClear: true
        }
    };
    columns = [
        {title: '岗位名称', id: 'ROLE_NAME', width: '50%', align: 'left', renderer: "String"},
        {title: '岗位代码', id: 'ROLE_CODE', width: '50%', align: 'left', renderer: "String"}
    ];
}

//列表视图设置
var sysRoleSettings = {
    url: "/role/getSelectRole",
    autoQueryBox: {
        enable: true,
        cols: [80, 140, 80, 140, 80, 140],
        property: [
            "roleName",
            "roleCode"]

    },
    limit: 5,
    autoListBox: {
        enable: true,
        columns: columns,
        checkbox: true, //是否显示checkbox
        mulchose: true, //是否多选,
        allPageChose: false //是否开启全页选择
    }
};


if (param.flag && param.flag === "workflow") {
    sysRoleConfig["query.roleType"] = {
        tagName: "角色类型",
        type: "dict",
        dictConfig: {
            dictCode: "JSLX"
        },
        canClear: true
    };
    sysRoleSettings.autoQueryBox = {
        enable: true,
        cols: [80, 100, 80, 100, 80, 100],
        property: [
            "roleName",
            "roleCode",
            "roleType"]

    }
}
