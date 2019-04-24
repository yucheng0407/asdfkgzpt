//按钮配置
var buttonArr = [
    {
        id: "add",
        name: "新增",
        code: "ADDRULE",
        icon: "&#xe62a;",
        onClick: "add"              //可以是方法引用，也可以是方法字符串名称
    },
    {
        id: "edit",
        name: "修改",
        code: "EDITRULE",
        icon: "&#xe605;",
        onClick: "edit"
    },
    {
        id: "del",
        name: "删除",
        code: "DELRULE",
        icon: "&#xe606;",
        onClick: "del"
    }
];
var buttonsJson = {
    pageCode: "ruleList",     //当前页面code
    buttons: buttonArr
};
//搜索部分配置
var searchConfig = {
    "query.RULE_NAME": {
        tagName: "规则名称",
        maxLength: 100,
        canClear: true
    },
    "query.SXFS": {
        tagName: "实现方式",
        type:"dict",
        dictConfig:{
            dictCode:"GZSXFS"
        },
        canClear: true
    }
};
//规定表头
var columns = [
    {title: '规则名称', id: 'RULE_NAME', width: '40%', align: 'left', renderer: "String"},
    {title: '配置/实现方式', id: 'SXFS', width: '30%', align: 'left', renderer: "String"},
    {
        title: '修改时间',
        id: 'XGSJ',
        width: '30%',
        align: 'left',
        renderer: "Date",
        format: "yyyy-MM-dd HH:mm"
    }
];
//列表视图设置
var tableSettings = {
    url: "/rule/getAuthRuleList",
    autoQueryBox: {
        enable: true
    },
    autoListBox: {
        enable: true,
        columns: columns
    }
};

