var formdesignList;
$(function () {
    var formDefConfig = {
        "query.name": {
            tagName: "表单名称",
            canClear: true
        },
        "query.key": {
            tagName: "表单key",
            canClear: true
        }
    };
    //规定表头
    var columns = [
        {
            title: '表单名称', id: 'NAME', width: '15%', align: 'left', renderer: function (v, rowData, rowIndex, showPro) {
            showPro.ifSetTitle = true;
            showPro.replaceSymbols = false;
            v = replaceSymbols(v);
            return "<a href='javascript:void(0)' onclick='edit(" + rowData.ID + ")'>" + (v + (rowData["VERSION"] ? "" : "(草稿)")) + "</a>";
        }
        },
        {title: '表单key', id: 'KEY', width: '10%', align: 'left', renderer: "String"},
        {
            title: '表名', id: 'TABLE_NAME', width: '10%', align: 'left', renderer: "String"
        },
        {
            title: '描述',
            id: 'DESCRIPTION',
            width: '10%',
            align: 'left',
            renderer: "String"
        },
        {
            title: '修改时间',
            id: 'XGSJ',
            width: '20%',
            align: 'left',
            renderer: "Date",
            format: "yyyy-MM-dd HH:mm"
        },
        {
            title: '操作',
            id: 'ID',
            width: '22%',
            align: 'left',
            renderer: function (v, rowData, rowIndex, showPro) {
                var rhtml = "";
                showPro.ifSetTitle = true;
                showPro.stitle = "";
                showPro.replaceSymbols = false;
                rhtml = "<a class='active_1' onclick='previewForm(" + v + ",\"" + rowData.NAME + "\")'>预览</a> " +
                    "<a class='active_2' onclick='delForm(" + rowData.ID + ")'>删除</a>";
                //是否主版本，主版本是发布之后的版本
                if (rowData.IS_MAIN === "0") {
                    rhtml += " <a class='active_1' onclick='fbForm(" + v + ")'>" + (rowData.TABLE_NAME ? "发布为新版本" : "发布") + "</a>";
                } else {
                    rhtml += " <a class='active_1' onclick='ckFormList(" + v + ",\"" + rowData.NAME + "\")'>进入列表</a>";
                }
                return rhtml;
            }
        }
    ];
    var formdesignSettings = {
        url: "/form/getFormDefList",
        autoQueryBox: {
            enable: true
        },
        autoListBox: {
            enable: true,
            columns: columns
        }
    };
    var buttonsJson = {
        buttons: [
            {
                id: "add",
                name: "新增",
                icon: "&#xe62a;",
                onClick: "add"              //可以是方法引用，也可以是方法字符串名称
            }
        ]
    };
    formdesignList = new Rxvm({
        widget: RX.Grid,
        el: '#dataDiv',
        settings: formdesignSettings,
        config: formDefConfig,
        afterMount: function () {
            RX.button.init($("#operate"), buttonsJson);
        }
    });
});

/**
 * 新增
 */
function add() {
    RX.page.goto("/form/formdesignEdit", {
        fields: [{
            label: "名称", code: "MC", fieldType: "text",
            fieldOptions: {
                max_length: 100,
                required: true,
                candelete: false,
                canchange: false
            },
            sfyxSt: "VALID"
        }]
    });
}

/**
 * 编辑
 */
function edit(formId) {
    RX.page.goto("/form/formdesignEdit?id=" + formId);
}

/**
 * 预览
 */
function previewForm(formId, formName) {
    RX.page.open({
        title: "查看" + formName,
        url: "/form/previewDef",
        param: {
            formId: formId
        }
    });
}

/**
 * 删除
 */
function delForm(formId) {
    RX.confirm(RX.CONFIRM_DELETE, function () {
        $.ajax({
            url: "/form/delFormDef?id=" + formId,
            success: function (ar) {
                if (ar.success) {
                    RX.msg(RX.SUCCESS_DELETE);
                    RX.page.reload();
                } else {
                    RX.alert(ar.msg);
                }

            }
        });
    });
}

/**
 * 发布新版本
 */
function fbForm(formId) {
    RX.confirm("是否发布为新版本", function () {
        $.ajax({
            type: "post",
            url: "/form/fbForm",
            data: {
                formId: formId
            },
            success: function (ar) {
                if (ar.success) {
                    RX.msg("发布成功");
                    RX.page.reload();
                } else {
                    RX.alert(ar.msg);
                }
            }
        });
    })
}

/**
 * 查看列表数据
 */
function ckFormList(formId, formName) {
    RX.page.open({
        title: formName,
        url: "/form/ckFormData",
        param: {
            formId: formId
        }
    });
}

function ckOtherVersion(formId) {
    RX.alert("待增加");
}

RX.page.reload = function (param) {
    formdesignList.reloadGrid(param);
};

/**
 * window.open弹出页面回调刷新事件
 * @param msg
 */
function reloadWindow() {
    RX.page.reload();
}



