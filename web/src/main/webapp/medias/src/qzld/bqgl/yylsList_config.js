
//搜索区字段配置
var config = {
    "query.date": {
        type: "date",
        dateConfig: {
            dateFmt: "yyyy-MM-dd"
        },
        tagName: "请选择日期",
        canClear:true
    },
    "query.name": {
        tagName: "值班/备勤领导姓名",
        canClear:true
    },

};

//规定表头
var columns = [
    {title: '值班时间段', id: '', width: '', align: 'left', renderer: function (v, rowData, rowIndex, showPro) {

            showPro.replaceSymbols = false;
            showPro.ifSetTitle = true;
            showPro.stitle = "";
            var time=rowData.ZBKSSJ+"--"+rowData.ZBJSSJ;
            return time;
        }
    },
    {title: '值班领导', id: 'ZBLDXM', width: '', align: 'left', renderer: "String"},
    {title: '值班领导职务', id: 'ZBLDZW', width: '', align: 'left', renderer: "String"},
    {title: '值班室电话', id: 'ZBSDH', width: '', align: 'left', renderer: "String"},
    {title: '备勤领导', id: 'BQLDMC', width: '', align: 'left', renderer: "String"},

];

//列表视图设置
var settings = {
    url: "/bqgl/getYylsList",
    autoQueryBox:{
        enable:true,
        cols: [100, 180, 140, 180],
        property:[
            "date",
            "name",
             ]
    },
    autoListBox:{
        enable: true,
        columns: columns,
        allPageChose: false //是否开启全页选择
    }
};
//按钮配置
var buttonArr = [
    {
        id: "yy",
        name: "确定",
        onClick: "yy",
        style: "c_button"
    }
];

var buttonsJson = {
    tag: ".w_button_box",
    buttons: buttonArr
};


