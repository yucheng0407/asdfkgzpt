/**
 * 机构配置文件
 */

//搜索区字段配置
var sysOrganConfig = {
    "query.parentOrg": {
        tagName: "上级机构",
        disabled: true,
        canClear: false,
        spanShow: false
    },
    "query.organName": {
        tagName: "机构名称",
        canClear: true
    },
    "query.fullName": {
        tagName: "机构全称",
        canClear: true
    },
    "query.organCode": {
        tagName: "机构代码",
        canClear: true
    },
    "query.parentId": {
        display: false,
        canClear: true
    }
};

//规定表头
var columns = [
    {
        title: '机构名称',
        id: 'ORGAN_NAME',
        width: '20%',
        align: 'left',
        renderer: function (v, rowData, rowIndex, showPro) {
            var rhtml = v;
            if (rowData.UTYPE ==="1") {
                showPro.stitle = v;
                showPro.ifSetTitle = true;
                showPro.replaceSymbols = false;
                rhtml = "<img src='" + RX.handlePath("/medias/style/plat/image/resource/home_resource.png") + "'" +
                    " style='margin:-4px 5px 0px 0px;' align='absmiddle'/>" + rhtml;
            }
            return rhtml;
        }
    },
    {title: '机构全称', id: 'FULL_NAME', width: '20%', align: 'left', renderer: "String"},
    {title: '机构代码', id: 'ORGAN_CODE', width: '20%', align: 'left', renderer: "String"},
    {title: '上级机构', id: 'PARENT_ORG', width: '20%', align: 'left', renderer: "String"},
    {title: '修改时间', id: 'XGSJ', width: '20%', align: 'left', renderer: "Date",format:"yyyy-MM-dd HH:mm"}
];


//列表视图设置
var sysOrganSettings = {
    url: "/organ/getSysOrganListPage",
    autoQueryBox: {
        enable: true,
        cols: [100, 140, 100, 140, 100, 140]

    },
    autoListBox: {
        enable: true,
        columns: columns,
        allPageChose: false //是否开启全页选择
    }
};

//操作按钮的配置
var buttonArr = [
    {
        id: "addSysOrgan",
        name: "新增",
        icon: "&#xe62a;",
        onClick: "addSysOrgan",
        code:"ADD_ORGAN"
    },
    {
        id: "edit",
        name: "修改",
        icon: "&#xe605;",
        onClick: "editSysOrgan",
        code:"EDIT_ORGAN"
    },
    {
        id: "delSysOrgan",
        name: "删除",
        icon: "&#xe606;",
        onClick: "checkDelOrgan",
        code:"DEL_ORGAN"
    }
];
var buttonsJson = {
    tag: ".operation_box",
    tpl: null,
    param: {},
    title: null,
    buttons: buttonArr,
    pageCode:"JGGLYM"
};