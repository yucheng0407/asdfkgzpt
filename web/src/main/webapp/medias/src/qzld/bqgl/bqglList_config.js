/**
 * 用户表配置文件
 */

//搜索区字段配置
var bqglListConfig = {
    "query.name": {
        tagName: "人员名称",
        canClear: true,
        spanShow: false
    },
    "query.date": {
        tagName: "查询日期",
        canClear: true,
        spanShow: false,
        defaultValue:(new Date()).Format("yyyy-MM-dd"),
        display: false
    },
    "query.organId": {
        tagName: "机构id",
        canClear: true,
        spanShow: false,
        display: false
    }
};

//规定表头
var columns = [
    {title: '责任单位', id: 'ZRDWMC', width: '', align: 'left', renderer: "String"},
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
    {title: '值班领导电话', id: 'ZBLDDH', width: '', align: 'left', renderer: "String"},
    {title: '值班室电话', id: 'ZBSDH', width: '', align: 'left', renderer: "String"},
    {title: '值班民警', id: 'ZBMJMCS', width: '', align: 'left', renderer: "String"},
    {title: '备勤领导', id: 'BQLDMC', width: '', align: 'left', renderer: "String"},
    {title: '备勤民警', id: 'BQMJMCS', width: '', align: 'left', renderer: "String"},
    {title: '任务更新时间', id: 'XGSJ', width: '', align: 'left', renderer: "String"},
];

//列表视图设置
var bqglListSettings = {
    url: "/bqgl/getBqglList",
    autoQueryBox: {
        enable: true,
        cols: [100, 140, 100, 140, 100, 140],
        property: [
            "name",
            "date",
            "organId"
           ]

    },
    autoListBox: {
        enable: true,
        columns: columns,
        mulchose: false,    //是否多选
        allPageChose: false //是否开启全页选择
    }
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
        id: "allSel",
        name: "全选",
        icon: "&#xe6dc;",
        onClick: "allSel"
    },
    {
        id: "sub",
        name: "发布",
        icon: "&#xe607;",
        onClick: "sub"
    },
    {
        id: "deleteBqgl",
        name: "删除",
        icon: "&#xe606;",
        onClick: "deleteBqgl"
    }
];
var buttonsJson = {
    tag: ".operation_box",
    tpl: null,
    param: {},
    title: null,
    buttons: buttonArr
};