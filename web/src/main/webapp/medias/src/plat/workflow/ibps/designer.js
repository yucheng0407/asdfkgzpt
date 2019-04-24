var bpmnProcId = RX.page.param.id,
    defFile = RX.page.param.defFile,
    designVm,
    bpmnDesigner, //流程设计器对象，可用以获取具体的图形对象
    bpmnSelector; //流程设计选择器,可用于对图上元素进行选中操作
$(function () {
    designVm = new Rxvm({
        el: ".operation_box",
        data: {
            operatingStatus: RX.page.param.operatingStatus,
            status: RX.page.param.status
        }
    });
    //返回
    $("#js-goback").on("click", function () {
        RX.page.back();
    });
});

/**
 * 获取当前操作的bpmn元素数据
 * @returns {*}
 */
function getCurrentBpmnElementData() {
    if (currentBpmnElement && currentBpmnElement.type) {
        switch (currentBpmnElement.type) {
            case "bpmn:Process":
                return bpmnProcessData;
            case "bpmn:SequenceFlow":
                return bpmnRoutersData[currentBpmnElement.id];
            default:
                return bpmnNodesData[currentBpmnElement.id];
        }
    }
    return null;
}

/**
 * 保存
 * @param xml bpmn定义
 * @param status 发布状态
 * @param operatingStatus 操作状态
 */
function saveBpmnData(xml, status, operatingStatus) {
    //构造json
    var jsonData = bpmnProcessData;
    jsonData.nodes = [];
    $.each(bpmnNodesData, function (key, val) {
        jsonData.nodes.push(val);
    });
    jsonData.routers = [];
    $.each(bpmnRoutersData, function (key, val) {
        jsonData.routers.push(val);
    });
    jsonData.bpmnDef = xml;

    //解析所需的参数初始化
    jsonData.priority = 'high';

    if (checkGeneralJson(jsonData, saveValidateConfig.base.process) &&
        checkNodesJson(jsonData.nodes, saveValidateConfig.base.node)) {
        //基础配置验证
        if (!status || status === SaveStatus.Release || status === SaveStatus.Disabled) {
            //非草稿
            if (checkGeneralJson(jsonData, saveValidateConfig.release.process)) {
                //验证流程和环节配置
                if (jsonData.id) {
                    if (operatingStatus && operatingStatus === OperatingStatus.NEWVERSION) {
                        //复制为新版本,不启用
                        jsonData.status = SaveStatus.Disabled;
                        jsonData.operatingStatus = OperatingStatus.NEWVERSION;
                        saveBpmnWorkFlow(jsonData);
                    }
                    //编辑操作，判断流程是否存在运行实例
                    else if (checkHasRunningWfInstance(jsonData.id)) {
                        if (layer) {
                            layer.confirm("当前流程存在运行实例，是否另存为新版本", {
                                icon: RX.ICON_DOUBT,
                                btn: ['另存为新版本', '覆盖当前版本', '取消'],
                                btn1: function (index) {
                                    jsonData.status = SaveStatus.Disabled;
                                    jsonData.operatingStatus = OperatingStatus.NEWVERSION;
                                    layer.close(index);
                                    saveBpmnWorkFlow(jsonData);
                                },
                                btn2: function (index) {
                                    jsonData.operatingStatus = OperatingStatus.MODIFY;
                                    //不改变流程当前发布状态
                                    layer.close(index);
                                    saveBpmnWorkFlow(jsonData);
                                },
                                btn3: function (index) {
                                    layer.close(index);
                                }
                            });
                        }
                    } else {
                        //未创建流程实例直接覆盖
                        if (status) {
                            jsonData.status = status;
                        }
                        jsonData.operatingStatus = OperatingStatus.MODIFY;
                        saveBpmnWorkFlow(jsonData);
                    }
                } else {
                    //新增发布操作
                    if (checkFlowCodeIsExist(bpmnProcessData.code)) {
                        //不允许新增发布流程编码完全相同的流程
                        RX.msg(RX.ERROR_OPREATE, "流程编码 " + bpmnProcessData.code + " 已存在，请重新输入");
                    } else {
                        jsonData.status = status;
                        jsonData.operatingStatus = OperatingStatus.CREATED;
                        saveBpmnWorkFlow(jsonData);
                    }
                }
            }
        } else if (status === SaveStatus.Draft) {
            //草稿
            if ((checkNodesJson(jsonData.nodes, saveValidateConfig.base.node))) {
                if (jsonData.id) {
                    if (jsonData.status === SaveStatus.Release) {
                        //编辑的流程已发布，作为新草稿流程
                        RX.confirm("该流程已发布，是否作为草稿保存", function () {
                            jsonData.status = status;
                            jsonData.operatingStatus = OperatingStatus.CREATED;
                            jsonData.id = null;
                            saveBpmnWorkFlow(jsonData);
                        });
                    } else {
                        jsonData.status = status;
                        jsonData.operatingStatus = OperatingStatus.MODIFY;
                        saveBpmnWorkFlow(jsonData);
                    }
                } else {
                    jsonData.status = status;
                    jsonData.operatingStatus = OperatingStatus.CREATED;
                    saveBpmnWorkFlow(jsonData);
                }
            }
        }
    }
}

/**
 * 获取当前操作元素的源活动环节
 * @returns
 */
function findCurrentSourceUserTask() {
    //当前操作元素
    var _current = bpmnDesigner._current.element;
    if (_current && _current.type === "bpmn:ExclusiveGateway") {
        return findSourceUserTask(_current.businessObject);
    }
    return null;
}


/**
 * 获取bpmn对象的源活动环节
 * @param bo
 * @returns {Array}
 */
function findSourceUserTask(bo) {
    var routers = bo.incoming;
    var sources = [];
    if (routers && routers.length) {
        $.each(routers, function (i, router) {
            if (router.$type === "bpmn:SequenceFlow" && router.sourceRef) {
                var source = router.sourceRef;
                if (source.$type === "bpmn:UserTask") {
                    sources.push(bpmnNodesData[source.id]);
                } else {
                    sources.push.apply(sources, findSourceUserTask(source));
                }
            }
        });
    }
    return sources;
}

/**
 * 保存流程数据
 * @param jsonData
 */
function saveBpmnWorkFlow(jsonData) {
    RX.loading();
    $.ajax({
        type: "post",
        url: "/workflow/design/saveWorkflow",
        async: true,
        data: {json: JSON.stringify(jsonData)},
        success: function (ar) {
            RX.closeLoading();
            if (ar.success) {
                RX.msg("保存成功");
                RX.page.back();
            } else {
                RX.msg(RX.ERROR_OPREATE, "保存失败");
            }
        }
    });
}

/**
 * 检查流程编码是否已存在
 * @param flowCode 流程编码
 */
function checkFlowCodeIsExist(flowCode) {
    RX.loading();
    var isExist = false;
    $.ajax({
        type: "post",
        url: "/workflow/design/isFlowCodeExist",
        async: false,
        data: {flowCode: flowCode, c: Math.random},
        success: function (ar) {
            RX.closeLoading();
            if (ar.success) {
                if (ar.data === true) {
                    isExist = true;
                }
            } else {
                RX.msg(RX.ERROR_OPREATE, "校验流程编码失败");
            }
        }
    });
    return isExist;
}


/**
 * 检查当前流程是否还有正在运行的流程实例
 * @param workflowId 流程id
 * @returns {boolean}
 */
function checkHasRunningWfInstance(workflowId) {
    RX.loading();
    var isHas = false;
    $.ajax({
        type: "post",
        url: "/workflow/design/hasRunningWorkflowInstance",
        async: false,
        data: {workflowId: workflowId, c: Math.random},
        success: function (ar) {
            RX.closeLoading();
            if (ar.success) {
                isHas = ar.data;
            } else {
                RX.alert(ar.msg);
            }
        }
    });
    return isHas;
}

/**
 * 通过流程id获取xml定义
 * @param handler
 */
function getBpmnDefXmlByProcId(handler) {
    $.ajax({
        url: "/workflow/ibps/getBpmnDefXml",
        data: {id: bpmnProcId},
        success: function (xml) {
            RX.closeLoading();
            if (handler && typeof handler === "function") {
                handler(xml, true);
            }
        }
    });
}

/**
 * 按配置中的key，更新obj1中数据至obj2中
 * @param config
 * @param obj1
 * @param obj2
 */
function updateValue(config, obj1, obj2) {
    for (var obj in config) {
        if (config[obj].ifForm !== false) {
            obj2[obj] = obj1[obj];
        }
    }
    if (obj2.fromServer) {
        obj2.fromServer = false;
    }
}

//验证数据有效性
function checkIsValidate(obj) {
    return (obj.id == null && obj.sfyxSt !== "UNVALID") || (obj.id != null);
}