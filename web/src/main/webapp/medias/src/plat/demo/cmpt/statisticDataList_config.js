//搜索区字段配置
var config = {
    "query.userName": {
        tagName: "姓名(输入框)",
        canClear:true
    },
    "query.zzmm": {
        type: "dict",
        dictConfig: {
            dictCode: "ZZMMDEMO"
        },
        canClear:true,
        tagName: "政治面貌(下拉框)"
    },
    "query.csrq": {
        type: "date",
        dateConfig: {
            dateFmt: "yyyy-MM-dd",
            range: true
        },
        canClear:true,
        tagName: "出生日期(日期)"
    }
}

//列配置
var columns = [{
    title: "案例用户信息表", children: [
        {
            title: "案例用户", children: [
                {
                    title: "2018年度", children: [{
                        title: '姓名',
                        id: 'USER_NAME',
                        renderer: "String"
                    }]
                }
            ]
        },
        {
            title: '个人信息', rowNum: 2, children: [{
                title: '性别', id: 'SEX', width: '10%', renderer: "String"
            },
                {title: '政治面貌', id: 'ZZMM', width: '10%', renderer: "Dict", dictCode: "ZZMMDEMO"},
                {title: '出生日期', id: 'CSRQ', width: '20%', renderer: "Date", format: "yyyy-MM-dd"}
            ]
        },
        {title: '修改时间', id: 'XGSJ', width: '20%', renderer: "Date", format: "yyyy-MM-dd"}
    ]
}];

//列表视图设置
var settings = {
    url: "/demoUser/getDemoUserList",
    paged:false,
    autoQueryBox:{
        enable:true,
        cols: [120, 160, 120, 160, 120, 240]
    },
    autoListBox: {
        enable: true,
        columns: columns
    }
};

//操作按钮的配置
var buttonArr = [
    {
        id: "exportGrid",
        name: "导出",
        icon: "&#xe62a;",
        onClick: "exportGrid"
    }
];
var buttonsJson = {
    tag: ".operation_box",
    tpl: null,
    param: {},
    title: null,
    buttons: buttonArr
};

