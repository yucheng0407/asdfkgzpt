var formDataVm,
    param = RX.page.param;
var fromData;
$(function () {
    if (!param.formId)
        return;
    //获取form配置数据
    $.ajax({
        type: "get",
        url: "/form/getFormDef?id=" + param.formId + "&ran=" + Math.random(),
        async: false,
        success: function (ar) {
            if (ar.success) {
                fromData = ar.data;
                fromData["extendAttr"] = JSON.parse(fromData["extendAttr"]);
                var fields = fromData["fields"];
                for (var i = 0, maxLength = fields.length; i < maxLength; i++) {
                    fields[i]["fieldOptions"] = JSON.parse(fields[i]["fieldOptions"]);
                }
            } else {

            }
        }
    });
    var fields = fromData["fields"];
    //按钮配置
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
            id: "del",
            name: "删除",
            icon: "&#xe606;",
            onClick: "del"
        }
    ];
    var buttonsJson = {
        buttons: buttonArr
    };

    //解析fromData生成搜索区
    //搜索部分配置
    //无数据供搜索区生成
    var searchConfig = {
        "query.formId": {
            display: false,
            defaultValue: param.formId
        },
        "query.tableName": {
            display: false,
            defaultValue: fromData.tableName
        }
    };
    //解析fromData生成表头
    var columns = [];

    var field, fieldOptions, cxzd = [];
    for (var i = 0, maxLength = fields.length; i < maxLength; i++) {
        field = fields[i];
        fieldOptions = field["fieldOptions"];
        var serachObj;
        if (field.sfyxSt !== "UNVALID") {
            var fieldType = field.fieldType;
            //如果是选择器的话还需要变化一下code，展示的的是name字段，如果是金额的话还需要显示在右边等等
            if (fieldOptions["show_table"]) {
                serachObj = $.extend({
                    //不同类型的配置不一样，先全部是一样的
                    //  {title: '规则名称', id: 'RULE_NAME', width: '40%', align: 'left', renderer: "String"},
                    title: field.label,
                    id: field.code.toUpperCase(),
                    width: '100',
                    align: 'left',
                    renderer: "String"
                }, fieldControl.getHtmlTemConfig(field.fieldType, field.fieldOptions, field));
                columns.push(serachObj);
                cxzd.push(field);
                if (fieldOptions["show_search"] == true) {
                    $.extend(searchConfig, fieldControl.getSearchConfig(field["fieldType"], field["code"].toUpperCase(), fieldOptions, field));
                }
            }
        }
    }
    searchConfig["query.fields"] = {
        display: false,
        defaultValue: JSON.stringify(cxzd)
    };
//列表视图设置
    var formDataSettings = {
        url: "/form/getFormDataList",
        autoQueryBox: {
            enable: true
        },
        autoListBox: {
            enable: true,
            columns: columns
        }
    };
    formDataSettings.autoListBox.onRowDblClick = function (rowIndex, rowData, isSelected, event) {
        RX.page.open({
            title: "查看" + fromData.name,
            url: "/form/testSaveFormView",
            param: {
                id: rowData.ID,
                formId: param.formId
            }
        });
    };
    formDataVm = new Rxvm({
        widget: RX.Grid,
        el: '#dataDiv',
        settings: formDataSettings,
        config: searchConfig,
        afterMount: function () {
            RX.button.init($("#operate"), buttonsJson);
        }
    });
})
;

function add() {
    RX.page.open({
        title: "新增" + fromData.name,
        url: "/form/testSaveFormEdit",
        param: {
            formId: param.formId
        }
    });
}

function edit() {
    var row = formDataVm.getSelected();
    if (row.length > 0) {
        RX.page.open({
            title: "修改" + fromData.name,
            url: "/form/testSaveFormEdit",
            param: {
                id: row[0].ID,
                formId: param.formId
            }
        });
    } else {
        RX.msg(RX.SELECT_EDIT);
    }
}

function del() {
    var row = formDataVm.getSelected();
    if (row.length > 0) {
        RX.confirm(RX.CONFIRM_DELETE, function () {
            $.ajax({
                type: "post",
                url: "/form/delFormData?id=" + row[0].ID + "&formId=" + param.formId,
                async: false,
                success: function (ar) {
                    if (ar.success) {
                        RX.page.reload();
                        RX.msg(RX.SUCCESS_DELETE);
                    } else {
                        RX.alert(ar.msg);
                    }
                }
            });
            RX.page.close(index);
        });
    } else {
        RX.msg(RX.SELECT_DELETE);
    }
}

RX.page.reload = function () {
    formDataVm.reloadGrid();
};

