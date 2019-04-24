//先这样命名
function FormControl($el, type) {
    this.type = type;
    var id = RX.page.param.formId, formData, formConfig;
    if (id) {
        $.ajax({
            type: "get",
            url: '/form/getFormDef?id=' + id + "&ran=" + Math.random(),
            async: false,
            success: function (ar) {
                if (ar.success) {
                    formData = ar.data;
                    formData["extendAttr"] = JSON.parse(formData["extendAttr"]);
                    var fields = formData["fields"];
                    for (var i = 0, maxLength = fields.length; i < maxLength; i++) {
                        fields[i]["fieldOptions"] = JSON.parse(fields[i]["fieldOptions"]);
                    }
                    formConfig = formData.extendAttr;
                } else {
                    RX.alert(ar.msg);
                }
            }
        });
    } else {
        formData = RX.page.param.data;
        formConfig = formData.extendAttr
    }
    this.formData = formData;
    initTpl();

    //初始化tpl
    function initTpl() {
        //字段属性，注意是有效数据
        var fields = formData["fields"];
        var formTpl = '<script type="text/template">';
        formTpl += '<div class="p_box">';

        //表单title
        if (formConfig && !formConfig["hide_name"]) {
            formTpl += '<div class="page_title">';
            formTpl += '<h1>' + formData["name"] + '</h1>';
            formTpl += '</div>';
        }
        //拼接table
        formTpl += '<table class="form" border="0" cellspacing="0" cellpadding="0">';
        //获取col
        formTpl += '<colgroup>' +
            '<col width="120px"/>' +
            '<col/>' +
            '<col width="120px"/>' +
            '<col/>' +
            '<col width="120px"/>' +
            '<col/>' +
            '<col  width="120px"/>' +
            '<col/>' +
            '</colgroup>';
        formTpl += '<tbody>';
        formTpl += '<tr>';
        var index = 0;
        //整体占比，默认是占一行的
        $.each(fields, function (i, field) {
            if (field["sfyxSt"] !== "UNVALID" && !field["fieldOptions"]["hide_rights"] && (!type || (type === 'xz' && !field["fieldOptions"]["add_hide_rights"]) || type === "ck")) {
                var fieldOptions = field["fieldOptions"];
                var fieldOccupy = parseInt(fieldOptions["grids_to_occupy"] || 4);
                var fieldColspan = 2 * fieldOccupy - 1;
                if ((index + fieldColspan + 1) > 8) {
                    formTpl += '</tr><tr>';
                    index = fieldColspan + 1;
                } else {
                    index += fieldColspan + 1;
                }
                //字段在当前环节的相关信息，获取字段的必填信息
                formTpl += '<th>' + (fieldOptions["required"] ? '<b>*</b>' : '') + field["label"] + (fieldOptions["units"] ? "(" + fieldOptions["units"] + ")" : "") + '</th>';
                if (type === "ck") {
                    formTpl += '<td colspan="' + fieldColspan + '">' + fieldControl.getViewHtml(field["fieldType"], field["code"], field) + '</td>';
                } else {
                    formTpl += '<td colspan="' + fieldColspan + '">' + fieldControl.getEditHtml(field["fieldType"], field["code"], field) + '</td>';
                }
            }
        });
        formTpl += '</tr></tbody>';
        formTpl += '</table>';
        formTpl += '</div>';
        formTpl += '</script>';
        $el.append(formTpl);
    }

    //生成获取字段接口
    if (type === "ck") {
        var fields = formData["fields"];
        $.each(fields, function (index, field) {
            var fieldType = field["fieldType"];
            if (fieldType === "radio" || fieldType === "checkbox" || fieldType === "select") {
                (function (options) {
                    window["get" + field["code"]] = function () {
                        var dictCode = [];
                        for (var i = 0, maxLength = options.length; i < maxLength; i++) {
                            dictCode.push({
                                code: options[i].val,
                                value: options[i].label
                            });
                        }
                        return dictCode;
                    }
                })(field["fieldOptions"]["options"])
            }
        });
    }
}

/**
 * 获取配置项
 * @returns {{}}
 */
FormControl.prototype.getConfig = function () {
    var mainConfig = {}, fields = this.formData["fields"], formConfig = this.formData.extendAttr, type = this.type;
    //解析config设置
    $.each(fields, function (i, field) {
        if (field["sfyxSt"] !== "UNVALID") {
            //插入个性状态控制，已经处理之后的代码
            $.extend(mainConfig, fieldControl.getConfig(field["fieldType"], field["code"], field["fieldOptions"], formConfig, type));
        }
    });
    return mainConfig;
};
