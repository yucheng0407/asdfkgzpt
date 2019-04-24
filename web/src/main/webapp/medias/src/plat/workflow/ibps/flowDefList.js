var flowDefeVm;
$(function () {
    //创建工作流类型树
    createFlowDefTree();
    flowDefeVm = new Rxvm({
        widget: RX.Grid,
        el: '#dataDiv',
        settings: tableSettings,
        config: searchConfig,
        afterMount: function () {
            RX.button.init($("#operate"), buttonsJson);
        }
    });
});

function createFlowDefTree() {
    $.ajax({
        url: "/workflow/ibps/getWfTypeTreeData",
        type: 'post',
        success: function (ar) {
            $.fn.zTree.init($("#tree"), {
                data: {
                    simpleData: {
                        enable: true
                    }
                },
                callback: {
                    onClick: zTreeOnClick
                },
                view: {
                    addHoverDom: addHoverDom,
                    removeHoverDom: removeHoverDom,
                    selectedMulti: false
                }
            }, ar);
        }
    })
}

function zTreeOnClick(event, treeId, treeNode) {
    flowDefeVm.autoQuery.set("query.typeId", treeNode.id);
    flowDefeVm.reloadGrid();
}

/**
 * 新增
 */
function add() {
    RX.page.goto("/workflow/ibps/designer", {operatingStatus: OperatingStatus.CREATED});
}

/**
 * 导入流程定义
 */
function importDef() {
    RX.page.open({
        title: "导入流程定义",
        url: "/workflow/ibps/importDef",
        areaType: "small"
    });
}

/**
 * 修改
 */
function edit() {
    var rowData = flowDefeVm.getSelected();
    if (rowData && rowData.length && rowData.length === 1) {
        RX.page.goto("/workflow/ibps/designer", {
            id: rowData[0].ID,
            operatingStatus: OperatingStatus.MODIFY,
            status: rowData[0].STATUS
        });
    } else {
        RX.msg("请选择一条数据进行修改");
    }
}

/**
 * 删除
 */
function del() {
    var rowData = flowDefeVm.getSelected();
    if (rowData && rowData.length && rowData.length === 1) {
        RX.confirm("确认删除流程 " + (rowData[0].NAME || "") + " ?", function () {
            RX.loading();
            $.ajax({
                url: "/workflow/design/delWorkflow?id=" + rowData[0].ID,
                type: "post",
                success: function (ar) {
                    RX.closeLoading();
                    if (ar.success) {
                        RX.msg("删除成功");
                        flowDefeVm.reloadGrid();
                    } else {
                        RX.msg("删除失败");
                    }
                }
            })
        });
    } else {
        RX.msg("请选择一条数据进行删除");
    }
}

RX.page.reload = function () {
    flowDefeVm.reloadGrid();
};

function addHoverDom(treeId, treeNode) {
    var sObj = $("#" + treeNode.tId + "_span");
    if ($("#addBtn_" + treeNode.id).length > 0
        || $("#editBtn_" + treeNode.id).length > 0 || $("#delBtn_" + treeNode.id).length > 0)
        return;
    //增加
    var addStr = "<span class='button add' id='addBtn_" + treeNode.id
        + "' title='增加类别' onfocus='this.blur();'></span>";
    sObj.after(addStr);
    var addBtn = $("#addBtn_" + treeNode.id);
    if (addBtn) {
        addBtn.bind("click", function () {
            var url = "/workflow/design/workflowType?type=xz&nodeId=" + treeNode.id + "&nodeName=" + RX.encode(treeNode.name);
            RX.page.open({title: "新建流程类别", areaType: "small", url: url});
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
            RX.page.open({title: "修改流程类别", areaType: "small", url: url});
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
}

function removeHoverDom(treeId, treeNode) {
    $("#addBtn_" + treeNode.id).unbind().remove();
    $("#editBtn_" + treeNode.id).unbind().remove();
    $("#delBtn_" + treeNode.id).unbind().remove();
}

/**
 * 刷新ztree
 */
function reloadWfTree() {
    createFlowDefTree()
}

