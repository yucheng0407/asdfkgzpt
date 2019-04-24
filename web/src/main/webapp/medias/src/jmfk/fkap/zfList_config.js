var param=RX.page.param;
var xqlx=param.xqlx;
//搜索区字段配置
var xqListConfigs = {
    "query.zfksrq": {
        tagName: "重防开始时间",
        canClear: true,
        type: "date",
        dateConfig: {
            dateFmt: "yyyy-MM-dd"
        },
    },
    "query.zfjsrq": {
        tagName: "重防结束时间",
        canClear: true,
        type: "date",
        dateConfig: {
            dateFmt: "yyyy-MM-dd"
        },
    },
    "query.mc": {
        tagName: "重防区域名称",
        canClear: true,
    }
};
//规定表头
var columns = [
    {title: '重防区域', id: 'MC', width: '25%', align: 'left', renderer: "String"},
    {title: '重防日期', id: 'ZFRQ', width: '', align: 'left',renderer: function (v, rowData, rowIndex, showPro) {

            showPro.replaceSymbols = false;
            showPro.ifSetTitle = true;
            showPro.stitle = "";
            var time=rowData.ZFKSRQ+"--"+rowData.ZFJSRQ;
            return time;
        }
    },
    {title: '重防时间', id: 'ZFSJ', width: '15%', align: 'left',renderer: function (v, rowData, rowIndex, showPro) {

            showPro.replaceSymbols = false;
            showPro.ifSetTitle = true;
            showPro.stitle = "";
           var time=""
           var ksTime= rowData.ZFKSSJ.split(',');
           var jsTime= rowData.ZFJSSJ.split(',');
           for (var i = 0; i <ksTime.length ; i++) {
               time+= ksTime[i]+"--"+jsTime[i]+"<br>"
           }
            return time;
        }},
    {title: '所属单位', id: 'SSDW', width: '25%', align: 'left',renderer: "String"}
];

//列表视图设置
var xqListSettings = {
    url: "/jmfk/getZfListPage",
    autoQueryBox: {
        enable: true,
        cols: [100, 180,100, 180,100, 180],
        property: [
            "zfksrq",
            "zfjsrq",
            "mc"
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
