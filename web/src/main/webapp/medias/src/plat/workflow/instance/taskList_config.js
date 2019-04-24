//列表参数
var columns = [
    {title: '办理人', id: 'HANDLER', width: '120', align: 'left', renderer: "String"},
    {title: '派发时间', id: 'ALLOT_DATE', width: '200', align: 'left', renderer: "String"},
    // {title: '签收时间', id: 'ACCEPT_DATE', width: '120', align: 'center', renderer: "String"},
    {title: '办理时间', id: 'FINISH_DATE', width: '200', align: 'left', renderer: "String"},
    {title: '状态', id: 'STATUS', width: '120', align: 'left', renderer: "String"},
    {title: '动作', id: 'ACTION', width: '', align: 'left', renderer: "String"}
];

var settings = {
    url: "/workflow/instance/taskPage",
    paged: false,
    autoListBox: {
        enable: true,
        columns: columns
    }
};

