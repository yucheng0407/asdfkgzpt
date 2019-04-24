/**
 * 元数据配置文件
 */

//搜索区字段配置
var sysMetaDataConfig = {
    "query.name": {
        tagName: "名称",
        canClear:true
    },
    "query.code": {
        tagName: "编码",
        canClear:true
    },
    "query.type": {
        type: "dict",
        dictConfig: {
            dictCode: "YSJSXLX"
        },
        canClear:true,
        tagName: "实现类型"
    }
};

//规定表头
var columns = [
    {title: '元数据名称', id: 'NAME', width: '25%', align: 'left', renderer: "String"},
    {title: '元数据编码', id: 'CODE', width: '25%', align: 'left', renderer: "String"},
    {title: '实现类型', id: 'TYPE', width: '25%', align: 'left', renderer: "Dict",dictCode: "YSJSXLX"},
    {title: '实现细节', id: 'DETAIL', width: '25%', align: 'left', renderer: "String"}
];

//列表视图设置
var sysMetaDataSettings = {
    url: "/report/getSysMetaDataListPage",
    autoQueryBox:{
        enable:true,
        cols: [100, 140,100, 140,100,140],
        property:[
            "name",
            "code",
            "type"]

    },
    autoListBox:{
        enable: true,
        columns: columns,
        allPageChose: false //是否开启全页选择
    }
};
