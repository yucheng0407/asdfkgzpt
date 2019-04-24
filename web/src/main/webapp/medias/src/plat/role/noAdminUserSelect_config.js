/**
 * 用户表配置文件
 */

//搜索区字段配置
var userConfig = {
    "query.userName": {
        tagName: "用户名",
        canClear: true
    },
    "query.sex": {
        tagName: "性别",
        type: "dict",
        dictConfig: {
            dictCode: "SEXDEMO"
        },
        canClear: true
    }
};

//规定表头
var columns = [
    {title: '用户名', id: 'USER_NAME', width: '25%', align: 'left', renderer: "String"},
    {title: '性别', id: 'SEX', width: '25%', align: 'left', renderer: "Dict", dictCode: "SEXDEMO"},
    {title: '默认组织', id: 'ORGAN_NAME', width: '25%', align: 'left', renderer: "String"}
];

//列表视图设置
var userSettings = {
    url: "/user/getNoAdminUserList",
    autoQueryBox: {
        enable: true
    },
    autoListBox: {
        enable: true,
        columns: columns,
        allPageChose: true,
        mulchose: true, //是否多选
        checkbox: true //是否显示checkbox
    }
};
