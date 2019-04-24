//搜索部分配置
var searchConfig = {
    "query.objectName": {
        tagName: "名称",
        canClear: true,
        maxLength: 50
    }
};
//规定表头
var columns = [
    {title: '名称', id: 'OBJ_NAME', width: '90%', align: 'left', renderer: "String"}
];
//列表视图设置
var tableSettings = {
    autoQueryBox: {
        enable: true
    },
    limit:5,
    autoListBox: {
        enable: true,
        columns: columns,
        mulchose: true, //是否多选
        checkbox: true //是否显示checkbox
    }
};
