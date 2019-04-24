//字段配置
var config = {
    "query.userName": {
        tagName: "姓名(输入框)"
    },
    "query.zzmm": {
        type: "dict",
        dictConfig: {
            dictCode: "ZZMMDEMO"
        },
        tagName: "政治面貌(下拉框)"
    },
    "query.csrq": {
        type: "date",
        dateConfig: {
            dateFmt: "yyyy-MM-dd",
            range: true
        },
        tagName: "出生日期(日期)"
    }
}

//视图设置
var settings = {
    url: "/demoUser/getDemoUserList",
    autoQueryBox:{
        enable:true,
        cols: [120, 160, 120, 160, 120, 240],
        property:["userName","zzmm","csrq"]
    },
    selectType:"single",
    limit:6
};

//操作按钮的配置
var buttonArr = [
    {
        id: "add",
        name: "新增",
        icon: "&#xe62a;",
        onClick: "add"
    },
    {
        id: "edit",
        name: "修改",
        icon: "&#xe605;",
        onClick: "edit"
    },
    {
        id: "refreshPage",
        name: "刷新（保留历史）",
        icon: "&#xe605;",
        onClick: "refreshPage"
    }
];

//存在默认配置
var buttonsJson = {
    tag: ".operation_box",
    tpl: null,
    param: {},
    title: null,
    buttons: buttonArr
};