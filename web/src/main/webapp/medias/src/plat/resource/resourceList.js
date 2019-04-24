var resourceVm,
    oldParentId = null;
$(function () {
    //创建资源树
    createResourceTree();
    tableSettings.autoListBox.onRowDblClick = function (rowIndex, rowData, isSelected, event) {
        RX.page.open({
            title: "查看" + getTypeName(rowData.TYPE),
            url: "/resource/resourceView?resourceType=" + rowData.TYPE,
            param: {
                type: "ck",
                id: rowData.ID
            }
        });
    };
    resourceVm = new Rxvm({
        widget: RX.Grid,
        el: '#dataDiv',
        settings: tableSettings,
        config: searchConfig,
        afterMount: function () {
            RX.button.init($("#operate"), buttonsJson);
        }
    });
    new RX.ZTreeSearch($("#tree").parent(), "tree");
});

function createResourceTree() {
    $.ajax({
        url: "/resource/getRoleResourceTreeData",
        type: 'post',
        data: {treeHide: false},
        success: function (ar) {
            $.fn.zTree.init($("#tree"), {
                data: {
                    simpleData: {
                        enable: true,
                        idKey: "id",
                        pIdKey: "pid",
                        rootPId: 0
                    }
                },
                edit: {
                    enable: true,
                    drag: {
                        isCopy: false,    //是否允许复制节点，true时拖动节点变成复制该节点，按ctrl拖动表示复制
                        isMove: true
                    },
                    showRenameBtn: false,
                    showRemoveBtn: false
                },
                callback: {
                    beforeDrag: zTreeBeforeDrag,
                    beforeDrop: ztreeBeforeDrop,
                    onDrop: zTreeOnDrop,
                    onClick: zTreeOnClick
                }
            }, ar);
        }
    })
}

//是否可移动，比如顶级节点不可移动等
//注意是treeNodes，可以拖动多个节点
function zTreeBeforeDrag(treeId, treeNodes) {
    var result = true, type = treeNodes[0].type;
    $.each(treeNodes, function (i, t) {
        if (t.type != type) {
            result = false;
            RX.alert("不可同时移动不同类型的资源");
            return false;
        }
    })
    if (result) {
        oldParentId = treeNodes[0].pid;
    }
    return result;
}

//是否可以移至目标节点 的
//moveType  "inner"：成为子节点，"prev"：成为同级前一个节点，"next"：成为同级后一个节点
//判断资源类型，移动资源、目标资源，和规则对比
function ztreeBeforeDrop(treeId, treeNodes, targetNode, moveType) {
    if (!targetNode) {
        return false;
    }
    //比较资源类型，看是否可以移动
    if (moveType == "inner" && !checkIfConfigChild(treeNodes[0].type, targetNode.type)) {     //inner移动：不可作为下级
        RX.alert("不可将" + getTypeName(treeNodes[0].type) + "移动到" + getTypeName(targetNode.type) + "下");
        return false;
    } else if (treeNodes[0].pid != targetNode.pid) {         //sort移动：上级不同时
        if (targetNode.pid && targetNode.pid != "0") {       //具有上级时
            var parentNode = targetNode.getParentNode();
            if (parentNode && !checkIfConfigChild(treeNodes[0].type, parentNode.type)) {         //不可作为移动点父级点的下级
                RX.alert("不可将" + getTypeName(treeNodes[0].type) + "移动到" + getTypeName(parentNode.type) + "下");
                return false;
            }
        }
    }
    return true;
}

function checkIfConfigChild(fromType, toType) {
    var result = false;
    if (!fromType || !toType) {
        return result;
    }
    var config = resourceConfig[fromType];
    if (config.parent && config.parent.indexOf(toType) > -1) {
        result = true;
    }
    return result;
}

//拖曳结束后，数据处理
function zTreeOnDrop(event, treeId, treeNodes, targetNode, moveType) {
    var selfId = treeNodes[0].id, ids = [], parentNode = targetNode;

    if (!moveType) {
        return;
    }
    if (moveType === "inner") {
        if (parentNode.children) {
            $.each(parentNode.children, function (i, t) {
                ids.push(t.id);
            })
        }
    } else if (treeNodes[0].pid != parentNode.pid) {
        parentNode = targetNode.getParentNode();
        if (parentNode) {
            if (parentNode.children) {
                $.each(parentNode.children, function (i, t) {
                    ids.push(t.id);
                })
            }
        } else {
            $.each($.fn.zTree.getZTreeObj(treeId).getNodesByParam("pid", 0), function (i, t) {
                ids.push(t.id);
            });
            parentNode = {}
        }
    } else {
        parentNode = targetNode.getParentNode();
        if (parentNode) {
            if (parentNode.children) {
                $.each(parentNode.children, function (i, t) {
                    ids.push(t.id);
                })
            }
        } else {
            $.each($.fn.zTree.getZTreeObj(treeId).getNodesByParam("pid", 0), function (i, t) {
                ids.push(t.id);
            });
            parentNode = {}
        }
    }
    if (ids.length > 0) {
        $.ajax({
            url: "/resource/changeTreeNodeSortAndParent",
            type: 'post',
            data: {
                ids: ids.join(),
                parentId: parentNode.id,
                parentType: parentNode.type,
                parentShowId: parentNode.showParentId,
                needClearTargetId: oldParentId == parentNode.id ? null : selfId
            },
            success: function (ar) {
                if (ar.success) {
                    RX.msg("操作成功");
                } else {
                    RX.alert(ar.msg);
                    //刷新树
                }
            }
        })
        if (oldParentId != parentNode.id) {
            createResourceTree();
        }
    }
}

function zTreeOnClick(event, treeId, treeNode) {
    resourceVm.autoQuery.set("query.parentName", treeNode.name);
    resourceVm.autoQuery.set("query.parentId", treeNode.id);
    resourceVm.autoQuery.set("query.parentType", treeNode.type);
    resourceVm.reloadGrid();
}

function getTypeName(code) {
    var name = "";
    $.each(resourceDict, function (i, t) {
        if (t.code == code) {
            name = t.value;
            return false;
        }
    });
    return name;
}

function add() {
    var sm = resourceVm.autoQuery.get("query"), url = "/resource/resourceTypeSelect";
    if (sm.parentId) {
        url += "?parentId=" + sm.parentId + "&parentName=" + RX.encode(sm.parentName) + "&parentType=" + sm.parentType;
    }
    RX.page.open({title: "新增资源", url: url});
}

function edit() {
    var row = resourceVm.getSelected();
    if (row && row.length == 1) {
        RX.page.open({
            title: "修改" + getTypeName(row[0].TYPE),
            url: "/resource/resourceEdit?resourceType=" + row[0].TYPE,
            param: {
                type: "xg",
                id: row[0].ID
            }
        });
    } else {
        RX.msg(RX.SELECT_EDIT);
    }
}

/**
 * 资源是否存在下级资源
 * @param resId
 */
function checkHasChild(resId) {
    var ztreeObj = $.fn.zTree.getZTreeObj("tree");
    //查找父节点为resId的节点，节点存在则存在下级
    return ztreeObj.getNodeByParam("pid", resId);
}

function del() {
    var obj = resourceVm.getSelected();//获取选中行的数据
    if (obj == null || obj.length != 1) {
        RX.msg(RX.SELECT_DELETE);
    } else {
        var isParent = (obj[0].UTYPE == 1);
        var msg;
        if (checkHasChild(obj[0].ID)) {
            msg = "该资源存在下级资源，删除会一起删除，确认删除？";
        } else {
            msg = "您确定要删除所选吗？";
        }
        RX.confirm(msg, function () {
            $.ajax({
                type: "post",
                url: "/resource/delResource",
                data: {id: obj[0].ID},
                async: false,
                success: function (ar) {
                    if (ar.success) {
                        RX.msg(RX.SUCCESS_DELETE);
                        if (isParent) {
                            var sm = resourceVm.autoQuery;
                            sm.set("query.parentId", "");
                            sm.set("query.parentName", "");
                            sm.set("query.parentType", "");
                        }
                        RX.page.reload();
                    } else {
                        RX.alert(ar.msg);
                    }
                }
            });
        });
    }
}

RX.page.reload = function () {
    resourceVm.reloadGrid();
    createResourceTree();
};

