var param=RX.page.param;
var xqlx=param.xqlx;
//搜索区字段配置
var xqListConfigs = {
    "query.xqmc": {
        tagName: "巡区名称",
        canClear: true,
    }
};
//规定表头
var columns = [
    {title: '巡区名称', id: 'XQMC', width: '', align: 'left', renderer: "String"},
    {title: '所属单位', id: 'SSDW', width: '', align: 'left',renderer: "String"}
];

//列表视图设置
var xqListSettings = {
    url: "/jmfk/getXqListPage?xqlx="+xqlx,
    autoQueryBox: {
        enable: true,
        cols: [100, 180],
        property: [
            "xqmc"
        ]

    },
    autoListBox: {
        enable: true,
        columns: columns,
        mulchose: false //是否多选
    }
};
//按钮配置
var buttonArr = [
    {
        id: "qd",
        name: "确定",
        onClick: "qd",
        style: "c_button"
    }
];

var buttonsJson = {
    tag: ".w_button_box",
    buttons: buttonArr
};
