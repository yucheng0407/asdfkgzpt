/**
 * 初次启动流程接口
 * @param obj {flowCode:流程编码,type:页面状态类型,toTag:返回URL,title:弹出层窗口标题,wfTitle:指定的流程实例标题}
 */
function confirmWorkflowStart(obj) {
    obj = obj || {};
    obj.toTag = obj.toTag || getToTagUrl(window);
    openWorkflow("/workflow/instance/taskHandle", obj);

}

/**
 * 通过流程编码和业务数据ID办理流程
 * @param dataId 业务数据ID
 * @param flowCode 流程编码
 * @param obj 参数
 */
function handleWorkflowByCodeAndDataId(dataId, flowCode, obj) {
    if (!obj.toTag) {
        obj.toTag = getToTagUrl(window);
    }
    $.ajax({
        type: "post",
        url: "/workflow/instance/getNewestTaskId",
        data: {flowCode: flowCode, dataId: dataId},
        async: false,
        success: function (ar) {
            if (ar.success) {
                obj.taskId = ar.data;
                if (obj.taskId) {
                    openWorkflow("/workflow/instance/taskHandle", obj);
                }
            } else {
                RX.alert(ar.msg);
            }
        }
    });
}

function getToTagUrl(win) {
    //查看MainIframeR那一层
    if (win.name != "MainIframeR") {
        return RX.page.parentWin().location.href;
    } else {
        return win.location.href;
    }
}

/**
 * 通过流程实例ID办理流程
 * @param wiId 流程实例ID
 * @param wfId 流程ID
 * @param obj 参数
 */
function handleWorkflowByWiId(wiId, wfId, obj) {
    obj = obj || {};
    obj.toTag = obj.toTag || getToTagUrl(window);
    $.ajax({
        type: "post",
        url: "/workflow/instance/getNewestTaskIdByWiId",
        data: {wiId: wiId},
        async: false,
        success: function (ar) {
            if (ar.success) {
                obj.taskId = ar.data;
                obj.wiId = wiId;
                obj.wfId = wfId;
                if (obj.taskId) {
                    openWorkflow("/workflow/instance/taskHandle", obj);
                }
            } else {
                RX.alert(ar.msg);
            }
        }
    });
}

/**
 * 根据任务ID办理任务
 * @param taskId 任务ID
 * @param obj 参数对象
 */
function handleWorkflowByTaskId(taskId, obj) {
    if (!taskId) {
        RX.alert("没有任务ID");
        return;
    }
    obj = obj || {};
    obj.toTag = obj.toTag || window.location.href;
    obj.taskId = taskId;
    openWorkflow("/workflow/instance/taskHandle", obj);
}

var targetWin = null;

//流程办理
function openWorkflow(url, obj) {
    //工作流弹出风格
    if (RX.cache(_top, "WORKFLOW.workFlowType") === "layer") {
        RX.page.open({
            title: obj.title,
            areaType: [getMinPx($(_top).width() + "px", "1000px"), getMinPx($(_top).height() + "px", "640px")],
            url: url,
            param: obj,
            callbacks: {
                success: function (layero, index) {
                    if (window.successCallback) {
                        window.successCallback();
                    }
                },
                cancel: function () {
                    RX.page.close();
                },
                end: function (reloadIndex) {
                    if (reloadIndex) {
                        if (typeof reloadIndex === "function") {  //回调首页刷新
                            reloadIndex();
                        } else {
                            try {
                                var reloadFunc = eval(reloadIndex);
                                if (typeof reloadFunc === "function") {
                                    reloadFunc();
                                }
                            } catch (e) {
                            }
                        }
                    }
                    RX.page.close();
                }
            }
        });
    } else {
        RX.page.goto(url, obj);
    }
}

/**
 * 获取最小px值
 * @param value1
 * @param value2
 * @returns {*} 自小px值
 * @private
 */
function getMinPx(value1, value2) {
    var num1 = parseInt(value1);
    num1 = !isNaN(num1) ? num1 : 10;
    var num2 = parseInt(value2);
    num2 = !isNaN(num2) ? num2 : 10;
    if (num1 < num2) {
        return value1;
    } else {
        return value2;
    }
}


//查看流程图
function showStatus(id, title, buildParam) { //缺少title参数报错，已添加  wcy17/2/24
    var url = "/workflow/instance/workflowView?id=" + id;
    RX.page.open({
        title: title,
        url: url,
        param: buildParam,
        areaType: ["850px", "550px"]
    });
}

var baseOpinionView;

function buildAuditOpinion(oid, param) {
    RX.load({
        module: "opinionView",
        callback: function () {
            baseOpinionView = new OpinionView({
                collection: new OpinionCollection,
                el: $("#" + oid),
                wiId: param.wiId,
                npId: param.npId,
                pageId: param.pageId,
                editFlag: param.editFlag
            });
            baseOpinionView.render();
        }
    })
}

function getFrameOpinion() {
    if (baseOpinionView) {
        var obj = $(".flowEditOpinion");
        if (obj.length > 0) {
            return {npId: obj.attr("npId"), opinion: obj.val()};
        }
    }
}