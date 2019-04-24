//表头
var columns = [
    {title: '流程名称', id: 'NAME', width: '20%', align: 'left', renderer: "String"},
    {title: '流程实例标题', id: 'INSTANCE_TITLE', width: '20%', align: 'left', renderer: "String"},
    {
        title: '版本号', id: 'VERSION', width: '15%', align: 'left', renderer: function (v, rowData, rowIndex, showPro) {
            var rhtml = "V" + v;
            showPro.ifSetTitle = true;
            //新版使用小写
            showPro.stitle = "";
            showPro.replaceSymbols = false;
            if (rowData.STATUS && rowData.STATUS == SaveStatus.Release) {
                rhtml += '&nbsp;&nbsp;&nbsp; <i title="主版本" class="iconfont" style="color: #00B83F">&#xe68b;</i>';
            }
            return rhtml;
        }
    },
    {title: '流程状态', id: 'STATUS_NAME', width: '10%', align: 'left', renderer: "String"},
    {title: '创建时间', id: 'CJSJ', width: '20%', align: 'left', renderer: "Date", format: "yyyy-MM-dd HH:mm"},
    {
        title: '操作', id: 'OPERS', width: '15%', align: 'left', renderer: function (v, rowData, rowIndex, showPro) {
            var rhtml = "";
            showPro.ifSetTitle = true;
            //新版使用小写
            showPro.stitle = "";
            showPro.replaceSymbols = false;
            if (rowData.STATUS) {
                var _status = rowData.STATUS;
                switch (_status) {
                    case SaveStatus.Release:
                        rhtml += '<a class="active_2" onclick="switchStatus(' + rowData.ID + ',\'' + SaveStatus.Disabled + '\')">停用</a>';
                        rhtml += '<a class="active_1" onclick="copyAsNewVersion(' + rowData.ID + ')">复制为新版本</a>';
                        break;
                    case SaveStatus.Disabled:
                        rhtml += '<a class="active_1" onclick="switchStatus(' + rowData.ID + ',\'' + SaveStatus.Release + '\')">启用</a>';
                        rhtml += '<a class="active_1" onclick="copyAsNewVersion(' + rowData.ID + ')">复制为新版本</a>';
                        break;
                    default:
                        break;
                }
            }
            return rhtml;
        }
    }
];

//列表视图设置
var flowCode = RX.page.param.code;
var tableSettings = {
    url: flowCode && "/workflow/ibps/getWorkflowListByCode?code=" + flowCode,
    autoListBox: {
        enable: true,
        columns: columns
    }
};

var buttonArr = [
    {
        id: "back",
        name: "返回",
        icon: "&#xe6a3;",
        onClick: "goBack"
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
