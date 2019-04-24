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
var columns = [
    {
        title: '姓名(String)(居左显示)',
        id: 'USER_NAME',
        width: '20%',
        align: 'left',
        renderer: function (v, rowData, rowIndex, showPro) {
            showPro.ifSetTitle = true;
            showPro.replaceSymbols = false;
            v = replaceSymbols(v);
            return "<a href='javascript:void(0)' onclick='alert(" + rowData.ID + ")'>" + v + "</a>";
        }
    },
    {
        title: '性别(Function)', id: 'SEX', width: '20%', renderer: function (v) {
            if (v == '0') {
                return "男"
            } else if (v == "1") {
                return "女"
            } else {
                return v;
            }
        }
    },
    {title: '出生日期(Date)', id: 'CSRQ', width: '20%', renderer: "Date", format: "yyyy-MM-dd",canOrder:true},
    {title: '政治面貌(Dict)', id: 'ZZMM', width: '20%', renderer: "Dict", dictCode: "ZZMMDEMO"}
];

//列表视图设置
var settings = {
    url: "/demoUser/getDemoUserList",
    autoQueryBox:{
        enable:true,
        cols: [120, 160, 120, 160, 120, 240]
    },
    autoListBox:{
        enable: true,
        columns: columns,   //配置为方法，则根据方法执行结果动态获取columns
        checkbox: true, //是否显示checkbox
        mulchose: true, //是否多选,
        allPageChose: true //是否开启全页选择
    },
    historyKey:"demoUserList"
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
        id: "del",
        name: "删除",
        icon: "&#xe605;",
        onClick: "delDemoUser"
    },
    {
        id: "reloadQuery",
        name: "更改搜索区",
        icon: "&#xe605;",
        onClick: "reloadQuery"
    },
    {
        id: "setSetting",
        name: "切换单选/多选",
        icon: "&#xe605;",
        onClick: "setSetting"
    },
    {
        id: "refreshPage",
        name: "刷新（保留历史）",
        icon: "&#xe605;",
        onClick: "refreshPage"
    },
    {
        id: "exportGrid",
        name: "导出",
        icon: "&#xe605;",
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