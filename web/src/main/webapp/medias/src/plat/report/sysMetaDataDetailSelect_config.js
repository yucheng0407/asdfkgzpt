/**
 * 元数据配置文件
 */

var isView = RX.page.param.type == "2";
//搜索区字段配置
var sysMetaDataConfig = {
    "query.tableName": {
        tagName: "名称",
        canClear:true
    },
    "query.type": {
        display:false
    }
};

//规定表头
var columns = [
    {title: '名称', id: 'TABLE_NAME', width: '50%', align: 'left', renderer: "String"}
];

if(!isView){
    sysMetaDataConfig["query.comment"] = {
        tagName: "注释",
        canClear:true
    };
    columns.push({title: '注释', id: 'COMMENTS', width: '50%', align: 'left', renderer: "String"});
}

//列表视图设置
var sysMetaDataSettings = {
    url: "/report/getSysMetaDataDetailListPage",
    autoQueryBox:{
        enable:true
    },
    autoListBox:{
        enable: true,
        columns: columns,
        allPageChose: false //是否开启全页选择
    }
};

