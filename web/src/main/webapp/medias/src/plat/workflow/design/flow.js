var body = $("#body");
var w = $(window);
$("document").ready(function () {

    //新建流程
    $('#button-new').click(function () {
        //panel().newFlow();
        RX.page.open({
            title: "新建流程",
            url: "/workflow/design/newWorkflow",
            areaType: "small"
        });
    });

    //保存流程
    $('#button-save').click(function () {
        panel().save();
    });

    //选择
    $('.operate').click(function () {
        var id = $(this).attr("id");
        changeStyle(id);
        switch (id) {
            //选择
            case "button-select": {
                panel().select();
                break;
            }
            //开始环节
            case "button-draw-start-node":
                panel().draw('StartNode');
                break;
            //活动环节
            case "button-draw-rect":
                panel().draw('ActivityNode');
                break;
            //决策环节
            case "button-draw-diamond":
                panel().draw('DecisionNode');
                break;
            //结束环节
            case "button-draw-end-node":
                panel().draw('EndNode');
                break;
            //流向
            case "button-draw-polyline":
                panel().relate('Router');
                break;
            default: {
                break;
            }
        }

    });
    w.resize();
    /*暂时注释，供重构参考*/
    // //嵌套环节
    // $('#button-draw-nestedrect').click(function () {
    //     panel().draw('ClusterNode');
    // });
    // //传阅环节
    // $('#button-draw-read-node').click(function () {
    //     panel().draw('CirculationNode');
    // });
});

//更改选择样式
function changeStyle(id) {
    $(".workflow_button").find(".checked").removeClass("checked");
    $('#' + id).addClass("checked").first().addClass("checked");
}

function config() {
    var setting = {
        data: {
            simpleData: {
                enable: true,
                idKey: "handleId",
                pIdKey: "pId",
                rootPId: 0
            }
        },
        view: {
            addHoverDom: addHoverDom,
            removeHoverDom: removeHoverDom,
            selectedMulti: false
        },
        callback: {
            onClick: function (event, treeId, treeNode) {
                var id = treeNode.id.split("_").pop();
                $.get("/workflow/design/getWorkflowJSON", {id: id, c: Math.random}, function (ar) {
                    if (ar.success) {
                        panel().getWorkflow(ar.data);
                    } else {
                        _top.layer.alert(ar.msg);
                    }
                }, 'json');
            },
            beforeClick: function (treeId, treeNode, clickFlag) {
                return treeNode.type == 'workflow';
            },
            onAsyncSuccess: RX.expandFirstTreeNode
        }
    };
    return setting;
}

reloadWfTree();
var flTree;

function reloadWfTree(func) {
    $.get("/workflow/design/getSyncWorkflowTypeAndWorkflowTree", {c: Math.random}, function (ar) {
        flTree = $.fn.zTree.init($("#flowlist"), config(), ar);
        if (func) {
            func()
        }
    }, 'json');
}

function addHoverDom(treeId, treeNode) {
    var sObj = $("#" + treeNode.tId + "_span");
    if (treeNode.editNameFlag || $("#addBtn_" + treeNode.id).length > 0
        || $("#editBtn_" + treeNode.id).length > 0 || $("#delBtn_" + treeNode.id).length > 0
        || $("#expBtn_" + treeNode.id).length > 0)
        return;
    if (treeNode.type === "workflowtype") {
        //增加
        var addStr = "<span class='button add' id='addBtn_" + treeNode.id
            + "' title='增加类别' onfocus='this.blur();'></span>";
        sObj.after(addStr);
        var addBtn = $("#addBtn_" + treeNode.id);
        if (addBtn) {
            addBtn.bind("click", function () {
                var url = "/workflow/design/workflowType?type=xz&nodeId=" + treeNode.id + "&nodeName=" + RX.encode(treeNode.name);
                RX.page.open({title:"新建流程类别",areaType:"small",url:url});
            });
        }
        //编辑
        var editStr = "<span class='button edit' id='editBtn_" + treeNode.id
            + "' title='修改' onfocus='this.blur();'></span>";
        sObj.append(editStr);
        var editBtn = $("#editBtn_" + treeNode.id);
        if (editBtn) {
            editBtn.bind("click", function () {
                var url = "/workflow/design/workflowType?type=xg&nodeId=" + treeNode.id + "&nodeName=" + RX.encode(treeNode.name);
                RX.page.open({title:"修改流程类别",areaType:"small",url:url});
            });
        }
        //删除
        var delStr = "<span class='button remove' id='delBtn_" + treeNode.id
            + "' title='删除' onfocus='this.blur();'></span>";
        sObj.append(delStr);
        var delBtn = $("#delBtn_" + treeNode.id);
        if (delBtn) {
            delBtn.bind("click", function () {
                layer.confirm("确认删除该流程类别？", function (index) {
                    layer.close(index);
                    $.ajax({
                        type: "post",
                        url: "/workflow/design/delWorkflowType",
                        data: {id: treeNode.id},
                        async: false,
                        success: function (ar) {
                            if (ar.success) {
                                reloadWfTree();
                                RX.msg(RX.SUCCESS_DELETE);
                            } else {
                                RX.alert(ar.msg);
                            }
                        }
                    });
                })
            });
        }
        //导入
        var impStr = "<span class='button imp' id='impBtn_" + treeNode.id + "' title='上传' onfocus='this.blur();'></span>";
        sObj.append(impStr);
        var impBtn = $("#impBtn_" + treeNode.id);
        if (impBtn) {
            impBtn.bind("click", function () {
                RX.page.open({
                    title:"上传文件",
                    areaType:"small",
                    url: "/workflow/design/impWorkflow?typeId=" + treeNode.id
                });
            });
        }
    } else {
        //删除
        delStr = "<span class='button remove' id='delBtn_" + treeNode.id
            + "' title='删除' onfocus='this.blur();'></span>";
        sObj.append(delStr);
        delBtn = $("#delBtn_" + treeNode.id);
        if (delBtn) {
            delBtn.bind("click", function () {
                layer.confirm("确定要删除所选流程吗?", function (index) {
                    layer.close(index);
                    $.ajax({
                        type: "post",
                        url: "/workflow/design/delWorkflow",
                        data: {id: treeNode.id.replace("f_", "")},
                        async: false,
                        success: function (ar) {
                            if (ar.success) {
                                reloadWfTree();
                                RX.msg(RX.SUCCESS_DELETE);
                            } else {
                                RX.alert(ar.msg);
                            }
                        }
                    });
                })
            });
        }
        //导出
        var expStr = "<span class='button exp' id='expBtn_" + treeNode.id
            + "' title='下载' onfocus='this.blur();'></span>";
        sObj.append(expStr);
        var expBtn = $("#expBtn_" + treeNode.id);
        if (expBtn) {
            expBtn.bind("click", function () {
                window.open(RX.handlePath("/workflow/design/expWorkflow?workflowId=" + treeNode.id));
            });
        }
    }

    // 修改流程类别树右侧无法展示的问题
    $('#' + treeNode.tId + "_a").mousemove(function(event){
        //相对于树面板左边的距离
        var treeLeft = event.clientX - $(".tree_box").prop("offsetLeft");
        if(treeLeft > $(".tree_box").width() - 10) {
            var curScrollLeft = $(".tree_box").prop("scrollLeft");
            $(".tree_box").scrollLeft(curScrollLeft + 10);
        }
    })
}

function removeHoverDom(treeId, treeNode) {
    $("#addBtn_" + treeNode.id).unbind().remove();
    $("#editBtn_" + treeNode.id).unbind().remove();
    $("#delBtn_" + treeNode.id).unbind().remove();
    $("#expBtn_" + treeNode.id).unbind().remove();
    $("#impBtn_" + treeNode.id).unbind().remove();
}

function panel() {
    //chrome 存在本地跨域问题
    return $("#flow-panel")[0].contentWindow;
}

//选中树节点，并填充panel内容
function redrawPanel(id) {
    var nodes = flTree.getNodesByParam("handleId", "f_" + id);
    if (nodes.length) {
        flTree.selectNode(nodes[0]);
    }
    $.get("/workflow/design/getWorkflowJSON", {id: id, c: Math.random}, function (ar) {
        if (ar.success) {
            panel().getWorkflow(ar.data);
        } else {
            RX.alert(ar.msg);
        }
    }, 'json');
}