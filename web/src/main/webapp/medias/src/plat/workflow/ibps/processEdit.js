//获取数据
var flowProp = RX.page.param,
    baseProc, formProc, variablesProc, handlerProc;
var flowJson = getCurrentBpmnElementData(),
    preYwztzd;   //进入页面的业务状态字典值
$(function () {
    if (flowJson.fromServer) {
        RX.loading();
        //从服务端获取
        $.ajax({
            url: "/workflow/ibps/getBpmnProcess",
            type: "post",
            data: {id: flowProp.id},
            success: function (ar) {
                RX.closeLoading();
                if (ar && ar.success) {
                    var data = ar.data;
                    var typeObject = data.type;
                    if (typeObject) {
                        data.type = typeObject.id;
                        data.typeName = typeObject.name;
                    }
                    data.variables = data.workflowVariables;
                    if (data.nodeMaxSort) {
                        //更新缓存
                        bpmnProcessData.nodeMaxSort = data.nodeMaxSort;
                    }
                    //初始化nodes数据
                    if (data.nodes && data.nodes.length) {
                        $.each(data.nodes, function (i, e) {
                            //前后端属性对应
                            e.finishProcessSql = e.finishProcess;
                            bpmnNodesData[e.domid] = e;
                        });
                    }
                    //初始化routers数据
                    if (data.routers && data.routers.length) {
                        $.each(data.routers, function (i, e) {
                            bpmnRoutersData[e.domid] = e;
                        });
                    }
                    initRxvm(data);
                } else {
                    RX.alert(ar.msg);
                }
            }
        });
    } else {
        initRxvm(flowJson);
    }
});

function initRxvm(json) {
    //基础vm
    baseProc = new Rxvm({
        el: $("[data-tab='proc-general']")[0],
        config: flowConfig,
        data: json,
        methods: {
            changeTitle: function () {
                this.set("instanceTitle", this.get("name"));
            }
        },
        afterMount: function () {
            var status = this.get("status"), operatingStatus = flowProp.operatingStatus;
            //操作为修改或者新版本 流程编码不可修改
            if (status === SaveStatus.Release && operatingStatus && (operatingStatus === OperatingStatus.MODIFY
                || operatingStatus === OperatingStatus.NEWVERSION
                || operatingStatus === OperatingStatus.SAVEAS)) {
                this.setDisabled("code", true);
            }
            if (operatingStatus === OperatingStatus.NEWVERSION) {
                $("#tr_wf_version").hide();
            }
        }
    });
    preYwztzd = baseProc.get("workflowYwztZd");
    //表单
    formProc = new Rxvm({
        el: $("[data-tab='proc-forms']")[0],
        config: sheetConfig,
        data: {
            sheets: json.sheets
        },
        methods: {
            addSheet: function () {
                this.append("sheets", {sort: getMaxSort(this.get("sheets")) + 1, sfyxSt: "VALID"});
            },
            delSheet: function (keypath) {
                this.set(keypath + ".sfyxSt", "UNVALID");
                var sheetId = this.get(keypath).sheet_id;
                //去除改表单使用到的地方
                var nodes = getAllNodes();
                $.each(nodes, function (index, node) {
                    var sheets = node.sheets;
                    if (sheets) node.sheets = sheets.filter(function (sheet) {
                        var res = true;
                        if (sheet.sheet_id == sheetId) {
                            //已经保存的数据设置无效
                            if (sheet.id) {
                                sheet.sfyxSt = "UNVALID";
                            } else {
                                //未保存的直接去除
                                res = false;
                            }
                        }
                        return res;
                    })
                });
            }
        }
    });
    //变量
    variablesProc = new Rxvm({
        el: $("[data-tab='proc-variables']")[0],
        config: variableConfig,
        data: {
            variables: json.variables
        },
        methods: {
            addVariable: function () {
                this.append("variables", {sfyxSt: "VALID"});
            },
            delVariable: function (keypath) {
                this.set(keypath + ".sfyxSt", "UNVALID");
            }
        }
    });
    //后处理
    handlerProc = new Rxvm({
        el: $("[data-tab='proc-handler']")[0],
        config: handlerConfig,
        data: json
    });
}


//保存流程信息
function updateNodeAttr() {
    updateValue(flowConfig, baseProc.get(), flowJson);
    flowJson["sheets"] = JSON.parse(formProc.getJson())["sheets"];
    var variables = variablesProc.get("variables");
    if (variables) {
        flowJson["variables"] = variablesProc.get("variables").filter(function (variable) {
            return checkIsValidate(variable) && variable["name"] || variable["value"]
        });
    }
    updateValue(handlerConfig, handlerProc.get(), flowJson);
    //判断业务状态字典有没有变化，变化的清空节点的ywzt
    if (baseProc.get("workflowYwztZd") !== preYwztzd) {
        clearYwzt()
    }
}

//检查变量名称是否重复
function checkVariableNameRepeat() {
    var varList = formProc.get("variables");
    if (varList && varList.length > 0) {
        var nameArr = [];
        for (var i = 0; i < varList.length; i++) {
            if (varList[i].sfyxSt != "UNVALID") {
                nameArr.push($.trim(varList[i].name.toString()));
            }
        }
        return isRepeat(nameArr);
    }
    return false;
}

// 检查数组重复
function isRepeat(arr) {
    if (arr && arr.length > 0) {
        var sArr = arr.sort();
        for (var i = 0; i < sArr.length - 1; i++) {
            if (sArr[i] == sArr[i + 1]) {
                return true;
            }
        }
    }
    return false;
}

//选择表单回调
function sheetCallback(sheetId, sheetName, keyPath) {
    var sheetVm = formProc;
    var sheetSort = sheetVm.get(sheetVm.replacePath(keyPath, "sort"));
    var sheetTitle = sheetVm.get(sheetVm.replacePath(keyPath, "title"));
    if (!sheetSort || $.trim(sheetSort.toString()) === "") {
        sheetVm.set(sheetVm.replacePath(keyPath, "sort"), getMaxSort(sheetVm.get("sheets")) + 1);
    }
    if (!sheetTitle || $.trim(sheetTitle.toString()) === "") {
        sheetVm.set(sheetVm.replacePath(keyPath, "title"), sheetName);
    }
    sheetVm.set(sheetVm.replacePath(keyPath, "sheet_id"), sheetId);
    sheetVm.set(sheetVm.replacePath(keyPath, "name"), sheetName);
}

/**
 * 获取最大的表单序号
 * @param sheetList
 * @returns {number}
 */
function getMaxSort(sheetList) {
    var maxSort = 0;
    if (sheetList && sheetList.length > 0) {
        for (var i = 0; i < sheetList.length; i++) {
            if (sheetList[i].sfyxSt != "UNVALID") {
                var tempSort = parseInt(sheetList[i].sort);
                if (tempSort > maxSort) maxSort = tempSort;
            }
        }
    }
    return maxSort;
}

//设置表单禁选
function setDisabledChoose() {
    var selIds = '';
    var sheetVm = formProc;
    var sheetList = sheetVm.get("sheets");
    if (sheetList && sheetList.length > 0) {
        for (var i = 0; i < sheetList.length; i++) {
            if (sheetList[i].sfyxSt != "UNVALID") {
                selIds += sheetList[i].sheet_id.toString() + ",";
            }
        }
    }
    if (selIds !== '') {
        selIds = selIds.substr(0, selIds.length - 1);
    }
    return '&selIds=' + selIds;
}

//选择流程类型回调
function workflowTypeCallback(typeId, typeName) {
    baseProc.set("type", typeId);
    baseProc.set("typeName", typeName);
}

//业务状态字典选择回调接口
function ywzdSelectCallBack(code, name) {
    baseProc.set("workflowYwztZd", code);
    baseProc.set("workflowYwztZdName", name);
}

function clearYwztZd() {
    baseProc.set("workflowYwztZd", "");
    baseProc.set("workflowYwztZdName", "");
}

//环节编码字典选择回调接口
function nodeCodeDictSelectCallBack(code, name) {
    baseProc.set("nodeCodeDictCode", code);
    baseProc.set("nodeCodeDictName", name);
}

function clearNodeCode() {
    baseProc.set("nodeCodeDictCode", "");
    baseProc.set("nodeCodeDictName", "");
}

//清空环节业务状态
function clearYwzt() {
    var nodes = getAllNodes();
    if (nodes && nodes.length) {
        for (var i = 0, nodesLength = nodes.length; i < nodesLength; i++) {
            //是活动环节或者嵌套环节
            nodes[i].ywzt = "";
        }
    }
}


