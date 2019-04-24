/**
 * 元数据配置文件
 */
var formType = [{code:"1",value:"表格"},{code:"2",value:"柱状图"},
    {code:"3",value:"折线图"},{code:"4",value:"饼状图"}];

//搜索区字段配置
var sysReportFormConfig = {
    "query.name": {
        tagName: "报表名称",
        canClear:true
    },
    "query.code": {
        tagName: "报表编码",
        canClear:true
    },
    "query.type": {
            type: "dict",
            dictConfig: {
                dictCode: formType
            },
            canClear:true,
            tagName: "报表类型"
        }
};

//规定表头
var columns = [
    {title: '名称', id: 'NAME', width: '20%', align: 'left', renderer: "String"},
    {title: '类型', id: 'TYPE', width: '20%', align: 'left', renderer: "Dict", dictCode:formType},
    {title: '关联元数据', id: 'METADATA_NAME', width: '20%', align: 'left', renderer: "String"},
    {title: '地址', id: 'URL', width: '20%', align: 'left', renderer: "String"},
    {title: '最后修改时间', id: 'XGSJ', width: '20%', align: 'left', renderer: "Date", format: "yyyy-MM-dd HH:mm"}
];

//列表视图设置
var sysReportFormSettings = {
    url: "/report/getSysReportFormListPage",
    autoQueryBox:{
        enable:true
    },
    autoListBox:{
        enable: true,
        columns: columns,
        allPageChose: false //是否开启全页选择
    }
};

//操作按钮的配置
var buttonArr = [
    {
        id: "addSysReportForm",
        name: "新增",
        icon: "&#xe62a;",
        onClick: "addSysReportForm"
    },
    {
        id: "editSysReportForm",
        name: "修改",
        icon: "&#xe605;",
        onClick: "editSysReportForm"
    },
    {
        id: "delSysReportForm",
        name: "删除",
        icon: "&#xe606;",
        onClick: "delSysReportForm"
    }
];
var buttonsJson = {
    tag: ".operation_box",
    param: {},
    title: null,
    buttons: buttonArr
};