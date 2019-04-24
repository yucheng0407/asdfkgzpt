//搜索部分资源
var searchConfig = {
    "query.name": {
        tagName: "流程名称",
        maxLength: 25,
        canClear: true
    },
    "query.code": {
        tagName: "流程编码",
        maxLength: 25,
        canClear: true
    },
    "query.status": {
        type: "dict",
        dictConfig: {
            dictCode: "WORKFLOWSTATUS"
        },
        tagName: "发布状态",
        canClear: true
    },
    "query.typeId": {
        display: false
    }
};
//表头
var columns = [
    {title: '流程名称', id: 'NAME', width: '20%', align: 'left', renderer: "String"},
    {title: '流程编码', id: 'CODE', width: '15%', align: 'left', renderer: "String"},
    {title: '流程实例标题', id: 'INSTANCE_TITLE', width: '20%', align: 'left', renderer: "String"},
    {
        title: '版本号', id: 'VERSION', width: '15%', align: 'left', renderer: function (v, rowData, rowIndex, showPro) {
            var rhtml = "V" + v;
            showPro.ifSetTitle = true;
            //新版使用小写
            showPro.stitle = "";
            showPro.replaceSymbols = false;
            if (rowData.TOTAL > 1) {
                rhtml += '&nbsp;&nbsp;&nbsp;<a onclick="listMoreVersion(\'' + rowData.CODE + '\')">更多版本(' + rowData.TOTAL + ')</a>';
            } else if (rowData.STATUS && rowData.STATUS === "1") {
                //单个发布版本
                rhtml += '&nbsp;&nbsp;&nbsp; <a title="复制为新版本" onclick="copyAsNewVersion(' + rowData.ID + ')"><i class="iconfont">&#xe6dc;</i></a>';
            }
            return rhtml;
        }
    },
    {title: '流程状态', id: 'STATUS_NAME', width: '10%', align: 'left', renderer: "String"},
    {title: '创建时间', id: 'CJSJ', width: '20%', align: 'left', renderer: "Date", format: "yyyy-MM-dd HH:mm"}
];

function listMoreVersion(code) {
    RX.page.goto("/workflow/ibps/flowVersionList", {code: code});
}


//列表视图设置
var tableSettings = {
    url: "/workflow/ibps/getWorkflowDefList",
    autoQueryBox: {
        enable: true
    },
    autoListBox: {
        enable: true,
        columns: columns
    }
};

var buttonArr = [
    {
        id: "add",
        name: "新增",
        icon: "&#xe62a;",
        onClick: "add"
    },
    {
        id: "importDef",
        name: "导入流程定义",
        icon: "&#xe676;",
        onClick: "importDef"
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
        icon: "&#xe606;",
        onClick: "del"
    }
];
//存在默认配置
var buttonsJson = {
    buttons: buttonArr
};
