 var config = {
        "query.roleName": {
            tagName: "角色名称",
            canClear: true
        },
        "query.roleCode": {
            tagName: "角色代码",
            canClear: true
        }
    };
var columns = [
        {title: '角色名称', id: 'ROLE_NAME', width: '40%', align: 'center', renderer: "String"},
        {title: '角色代码', id: 'ROLE_CODE', width: '30%', align: 'center', renderer: "String"}
    ];

var settings = {
    url: "/role/getAuthorityRoleList",
    autoQueryBox: {
        enable: true
    },
    autoListBox: {
        enable: true,
        columns: columns,
        checkbox: true, //是否显示checkbox
        mulchose: true, //是否多选,
        allPageChose: true //是否开启全页选择
    }
};
