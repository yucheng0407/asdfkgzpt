//搜索区字段配置
var config = {
    "query.startTime": {
        type: "date",
        dateConfig: {
            dateFmt: "yyyy-MM-dd HH:mm:ss",
            maxDate: "query.endTime"
        },
        tagName: "登录时间",
        spanShow: false,
        canClear: true
    },
    "query.endTime": {
        type: "date",
        dateConfig: {
            dateFmt: "yyyy-MM-dd HH:mm:ss",
            minDate: "query.startTime"
        },
        tagName: "至",
        spanShow: false,
        canClear: true
    },
    "query.userName": {
        tagName: "登录用户",
        maxLength: 50,
        canClear: true
    }
}
//列配置
var columns = [
    {title: '日志名称', id: 'LOG_NAME', width: '100', align: 'left', renderer: "String"},
    {title: '登录用户', id: 'USER_NAME', width: '120', align: 'left', renderer: "String"},
    {title: '登录时间', id: 'LOGIN_TIME', width: '150', align: 'left', renderer: "Date", format: "yyyy-MM-dd HH:mm:ss"},
    {title: 'IP地址', id: 'IP', width: '150', align: 'left', renderer: "String"},
    {title: '日志信息', id: 'MESSAGE', width: '', align: 'left', renderer: "String"}
];
//列表视图设置
var settings = {
    url: "/log/getLoginLogPage",
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