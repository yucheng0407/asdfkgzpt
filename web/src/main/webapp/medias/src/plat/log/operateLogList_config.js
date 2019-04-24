//搜索区字段配置
var config = {
    "query.startTime": {
        type: "date",
        dateConfig: {
            dateFmt: "yyyy-MM-dd HH:mm:ss"
        },
        tagName: "操作时间",
        spanShow: false
    },
    "query.endTime": {
        type: "date",
        dateConfig: {
            dateFmt: "yyyy-MM-dd HH:mm:ss"
        },
        tagName: "至",
        spanShow: false
    },
    "query.userName": {
        tagName: "操作用户",
        maxLength: 50,
        canClear: true
    }
}
//列配置
var columns = [
    {title: '日志类型', id: 'LOG_TYPE', width: '120', align: 'left', renderer: "String"},
    {title: '操作用户', id: 'USER_NAME', width: '120', align: 'left', renderer: "String"},
    {title: '操作结果', id: 'SUCCESS', width: '120', align: 'left', renderer: "String"},
    {title: '操作时间', id: 'CREATE_TIME', width: '150', align: 'left', renderer: "Date", format: "yyyy-MM-dd HH:mm:ss"},
    {title: '日志信息', id: 'MESSAGE', width: '', align: 'left', renderer: "String"}
];
//列表视图设置
var settings = {
    url: "/log/getOperateLogPage",
    autoQueryBox:{
        enable:true,
        cols: [80, 200, 80, 200, 80, 200]
    },
    autoListBox:{
        enable: true,
        columns: columns,
        allPageChose: false //是否开启全页选择
    }
};