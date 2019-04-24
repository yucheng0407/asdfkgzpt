//搜索区字段配置
var config = {
    "query.name": {
        tagName: "配置名称",
        maxLength: 50,
        canClear: true
    },
    "query.code": {
        tagName: "配置编码",
        maxLength: 30,
        canClear: true
    },
    "query.levels": {
        tagName: "配置级别",
        type: "dict",
        dictConfig: {
            dictCode: "CONFIGLEVEL"
        },
        canClear: true
    }
}
//列配置
var columns = [
    {title: '配置名称', id: 'NAME', width: '15%', align: 'left', renderer: "String"},
    {title: '配置编码', id: 'CODE', width: '15%', align: 'left', renderer: "String"},
    {title: '配置级别', id: 'LEVELS', width: '10%', align: 'left', renderer: "Dict", dictCode: "CONFIGLEVEL"},
    {title: '默认值', id: 'VALUE', width: '', align: 'left', renderer: "String"},
    {title: '修改时间', id: 'XGSJ', width: '15%', align: 'left', renderer: "Date", format: "yyyy-MM-dd"},
    {
        title: '操作', id: 'OPERS', width: '10%', align: 'left', renderer: function (v, rowData, rowIndex, showPro) {
            var rhtml = "";
            showPro.ifSetTitle = true;
            showPro.stitle = "";
            showPro.replaceSymbols = false;
            if (rowData.HAS_ALL == "1") {
                rhtml = "<a class='active_1' onclick='editConfig(" + rowData.ID + ")'>修改</a> <a class='active_2' onclick='delConfig(" + rowData.ID + ")'>删除</a>"
            } else if (rowData.APP_ID) {
                rhtml = "<a class='active_1' onclick='editConfig(" + rowData.ID + ")'>修改</a> <a class='active_2' onclick='delConfig(" + rowData.ID + ")'>删除</a>"
            }
            return rhtml;
        }
    }
]
//列表视图设置
var settings = {
    url: "/config/getConfigList",
    autoQueryBox: {
        enable: true,
        cols: [120, 160, 120, 160, 120, 240]
    },
    autoListBox: {
        enable: true,
        columns: columns,
        allPageChose: false //是否开启全页选择
    }
};
//操作按钮的配置
var buttonArr = [{
    id: "add",
    name: "新增",
    icon: "&#xe62a;",
    onClick: "add",
    code: "ADD_CONFIG"
},
    {
        id: "typeShow",
        name: "按类别展示",
        icon: "&#xe605;",
        onClick: "typeShow"
    }];
var buttonsJson = {
    tag: ".operation_box",
    tpl: null,
    param: {},
    title: null,
    buttons: buttonArr,
    pageCode:"PZGLYM"
}