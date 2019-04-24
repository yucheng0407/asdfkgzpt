/**
 * 用户表配置文件
 */

//搜索区字段配置
var fkapRwdListConfig = {
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
    {title: '巡组', id: 'XZ', width: '', align: 'left', renderer: "String"},
    {title: '巡防时间', id: 'XZ', width: '', align: 'left',renderer: function (v, rowData, rowIndex, showPro) {

            showPro.replaceSymbols = false;
            showPro.ifSetTitle = true;
            showPro.stitle = "";
            var time=""
            var ksTime= rowData.XFKSSJ;
            var jsTime= rowData.XFJSSJ;
            return ksTime+"--"+jsTime;
        }
        },
    {title: '任务类型', id: 'RWLX', width: '', align: 'left',renderer: "Dict", dictCode: "XFRWLX"},
    {title: '巡区', id: 'XQID', width: '', align: 'left', renderer: "String"},
    {title: '巡逻方式', id: 'XFFS', width: '', align: 'left', renderer: "Dict", dictCode: "XFFS"},
    {title: '任务类型', id: 'RWLX', width: '', align: 'left', renderer: "Dict", dictCode: "XFRWLX"},
    {title: '巡防设备', id: 'SBNAME', width: '', align: 'left', renderer: "String"},
    {title: '责任民警', id: 'ZRMJMCS', width: '', align: 'left', renderer: "String"},
    {title: '重防区域', id: 'ZFQY', width: '', align: 'left', renderer: "String"},
    {title: '重防时段', id: 'ZFSD', width: '', align: 'left', renderer: "String"}
];

//列表视图设置
var fkapRwdListSettings = {
    url: "/jmfk/getFkapRwdListPage",
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
        onClick: "addRwd"
    },
    {
        id: "edit",
        name: "修改",
        icon: "&#xe605;",
        onClick: "editRwd"
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
        onClick: "deleteRwd"
    }
];
var buttonsJson = {
    tag: ".operation_box",
    tpl: null,
    param: {},
    title: null,
    buttons: buttonArr
};