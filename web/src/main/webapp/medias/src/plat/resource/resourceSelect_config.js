//搜索部分资源
var searchConfig = {
    "query.name": {
        tagName: "名称",
        maxLength: 20,
        canClear: true
    },
    "query.code": {
        tagName: "编码",
        maxLength: 20,
        canClear: true
    },
    "query.type": {
        display: false,
        defaultValue: resourceType
    }
};

//表头
var columns = [
    {title: '资源名称', id: 'NAME', width: '25%', align: 'left', renderer: "String"},
    {title: '资源编码', id: 'CODE', width: '25%', align: 'left', renderer: "String"},
    {title: '修改时间', id: 'XGSJ', width: '25%', align: 'left', renderer: "Date", format: "yyyy-MM-dd"}
];

//列表视图设置
var settings = {
    url: "/resource/getResourceList",
    autoQueryBox:{
        enable:true
    },
    autoListBox:{
        enable: true,
        columns: columns
    }
};