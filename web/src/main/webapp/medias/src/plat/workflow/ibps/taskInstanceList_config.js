//表头
var columns = [
    {title: '办理动作', id: 'action', width: '10%', align: 'left', renderer: "String"},
    {title: '任务状态', id: 'status', width: '15%', align: 'left', renderer: "String"},
    {title: '办理人', id: 'user_id.userName', width: '15%', align: 'left', renderer: "String"},
    {title: '派发时间', id: 'cjsj', width: '20%', align: 'left', renderer: "Date", format: "yyyy-MM-dd HH:mm"},
    {title: '签收时间', id: 'accept_date', width: '20%', align: 'left', renderer: "Date", format: "yyyy-MM-dd HH:mm"},
    {title: '结束时间', id: 'finish_date', width: '20%', align: 'left', renderer: "Date", format: "yyyy-MM-dd HH:mm"}
];

//列表视图设置
var taskInsSettings = {
    autoListBox: {
        enable: true,
        columns: columns
    }
};