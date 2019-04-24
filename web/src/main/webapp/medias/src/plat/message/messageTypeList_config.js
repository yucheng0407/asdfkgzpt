//搜索部分配置
var searchConfig = {
    "query.name": {
        tagName: "类型名称",
        maxLength: 20,
        canClear: true
    },
    "query.code": {
        tagName: "类型编码",
        maxLength: 20,
        canClear: true
    }
};

//表头
var columns = [
    {title: '类型名称', id: 'NAME', width: '10%', align: 'left', renderer: "String"},
    {title: '类型编码', id: 'CODE', width: '10%', align: 'left', renderer: "String"},
    {title: '紧急程度', id: 'URGENT_LEVEL', width: '20%', align: 'left', renderer: "Dict", dictCode: "XXJJCD"},
    {title: '有效时间(天)', id: 'VALID_TIME', width: '10%', align: 'left', renderer: "String"},
    {title: '跳转类型', id: 'SKIP_TYPE', width: '10%', align: 'left', renderer: "Dict", dictCode: "XXTZLX"},
    {title: '窗口大小', id: 'WIN_SIZE', width: '10%', align: 'left', renderer: "Dict", dictCode: "WINSIZE"},
    {title: '操作类型', id: 'OPERATE_TYPE', width: '10%', align: 'left', renderer: "Dict", dictCode: "XXCZLX"},
    {title: '跳转路径', id: 'SKIP_PATH', width: '20%', align: 'left', renderer: "String"}
];

//列表视图设置
var tableSettings = {
    url: "/messageType/getMessageTypePage",
    autoQueryBox: {
        enable: true
    },
    autoListBox: {
        enable: true,
        columns: columns
    }
};

//操作按钮的配置
var buttonArr = [
    {
        id: "add",
        name: "新增",
        code:"ADD_MSGTYPE",
        icon: "&#xe62a;",
        onClick: "add"              //可以是方法引用，也可以是方法字符串名称
    },
    {
        id: "edit",
        name: "修改",
        icon: "&#xe605;",
        onClick: "edit"
    },
    {
        id: "del",
        name: "删除",
        icon: "&#xe606;",
        onClick: "del"
    },
    {
        id: "sendMessage",
        name: "发送消息",
        code:"SENDMSG",
        icon: "&#xe62a;",
        onClick: "sendMessage"
    }
];

//存在默认配置
var buttonsJson = {
    buttons: buttonArr,
    pageCode:"XXGLYM"
};