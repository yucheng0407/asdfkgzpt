//保存验证
var saveValidateConfig = {
    base: {
        process: {
            name: {
                name: "流程名称",
                rules: ["jsonValueNotNull"]
            },
            code: {         //流程编码
                name: "流程编码",
                rules: ["jsonValueNotNull"]
            }
        },
        node: {
            name: {
                name: "环节名称",
                rules: ["jsonValueNotNull"]
            },
            sort: {
                name: "环节序号",
                rules: ["jsonValueNotNull", "jsonValueIsIntGteZero"]
            }
        }
    },
    release: {
        process: {
            instanceTitle: {
                name: "流程实例标题",
                rules: ["jsonValueNotNull"]
            },
            typeName: {
                name: "流程类别",
                rules: ["jsonValueNotNull"]
            }
        }
    }
};

/**
 * json value值不可为空
 * @param value
 * @param name
 * @param e
 * @returns {boolean}
 */
function jsonValueNotNull(value, name, e) {
    //验证不通过
    var _msg = "";
    //避免json value 为0验证为空的情况
    if ((value !== 0 && !value) || $.trim(value + "") == "") {
        //选中验证不通过的环节
        var _shape = bpmnDesigner._canvas._elementRegistry._elements[e.domid];
        if (_shape) {
            bpmnSelector.select(_shape.element);
        }
        if (e.type == bpmnConfig["bpmn:UserTask"].typeValue) {
            //提示信息带上名称
            if (e.name) {
                _msg = "[" + e.name + "]";
            }
        }
        RX.msg(RX.ERROR_OPREATE, _msg + name + "不可为空");
        return false;
    }
    return true;
}

/**
 * json value大于0的整数
 * @param value
 * @param name
 * @param e
 * @returns {boolean}
 */
function jsonValueIsIntGteZero(value, name, e) {
    //验证不通过
    var _msg = "";
    if (!(value > 0)) {
        //选中验证不通过的环节
        var _shape = bpmnDesigner._canvas._elementRegistry._elements[e.domid];
        if (_shape) {
            bpmnSelector.select(_shape.element);
        }
        if (e.type == bpmnConfig["bpmn:UserTask"].typeValue) {
            //提示信息带上名称
            if (e.name) {
                _msg = "[" + e.name + "]";
            }
        }
        RX.msg(RX.ERROR_OPREATE, _msg + name + "须为大于0的整数");
        return false;
    }
    return true;
}

/**
 * 通用表单检验
 * @param jsonData
 * @param config
 * @returns {boolean}
 */
function checkGeneralJson(jsonData, config) {
    var result = true;
    $.each(config, function (i, e) {
        if (result) {
            $.each(e.rules, function (j, f) {
                if (f) {
                    var fn = window[f];
                    if (typeof fn === "function") {
                        result = fn(jsonData[i], e.name, jsonData);
                    }
                    if (!result) {
                        return result;
                    }
                }
            });
        } else {
            return result;
        }
    });
    return result;
}

/**
 * 检验活动环节数据
 * @param json
 * @param config
 * @returns {boolean}
 */
function checkNodesJson(json, config) {
    var result = true;
    if (json) {
        $.each(json, function (i, e) {
            if (e.type == bpmnConfig["bpmn:UserTask"].typeValue) {
                if (!checkGeneralJson(e, config)) {
                    result = false;
                    return result;
                }
            }
        });
    }
    return result;
}