//搜索区字段配置
var config = {
    "query.title": {
        tagName: "标题",
        canClear: true,
        maxLength: 20
    }
}

//按钮配置
var buttonArr = [
    {
        id: "startFlow",
        name: "发起请假流程",
        icon: "&#xe62a;",
        onClick: "startFlow"
    }
];

var buttonsJson = {
    buttons: buttonArr
};

//列配置
var columns = [
    {title: '标题', id: 'TITLE', width: '160', align: 'left', renderer: "String"},
    {title: '流程状态', id: 'STATUS', width: '160', align: 'left', renderer: "Dict", dictCode: "QJLCZT"},
    {title: '最后办理人', id: 'USER_NAME', width: '160', align: 'left', renderer: "String"},
    {title: '修改时间', id: 'XGSJ', width: '160', align: 'left', renderer: "Date", format: "yyyy-MM-dd HH:mm"}
];

//视图设置
var settings = {
    url: "/workflow/test/getTeacherList",
    autoQueryBox: {
        enable:true,
        property:["title"]
    },
    autoListBox:{
        enable: true,
        columns: columns
    }
};

