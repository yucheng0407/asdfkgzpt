var sysOrganGridVm;
var mainTree;
$(function () {
    //实例化树
    mainTree = $.fn.zTree.init($("#tree"), config());

    //注册双击事件
    sysOrganSettings.autoListBox.onRowDblClick = function (rowIndex, rowData, isSelected, event) {
        RX.page.open({
            title: "查看机构",
            url: "/organ/sysOrganView",
            param: {
                id: rowData.ID
            }
        });
    };
    //初始化机构VM
    sysOrganGridVm = new Rxvm({
        widget: RX.Grid,
        el: '#right',
        settings: sysOrganSettings,
        config: sysOrganConfig,
        afterMount: function () {
            //初始化列表按钮控件
            RX.button.init($("#operate"), buttonsJson);
        }
    });
});

/**
 * 新增机构
 */
function addSysOrgan(parentOrganId, parentOrganName) {
    RX.page.open({
        title: "新增机构",
        url: "/organ/sysOrganAdd",
        areaType: [800, 580],
        param: {
            type: "xz",
            parentOrganId: parentOrganId,
            parentOrganName: parentOrganName
        }
    });
}

/**
 * 修改机构
 */
function editSysOrgan() {
    var rowData = sysOrganGridVm.getSelected();
    if (rowData.length === 1) {
        RX.page.open({
            title: "修改机构",
            url: "/organ/sysOrganEdit",
            areaType: [800, 580],
            param: {
                type: "xg",
                id: rowData[0].ID
            }
        });
    } else {
        RX.msg(RX.SELECT_EDIT);
    }
}

/**
 * 删除机构核心
 */
function delOrgan(delOrganId, newOrganId) {
    $.ajax({
        type: "get",
        url: "/organ/delSysOrgan?id=" + delOrganId + "&newOrganId=" + (newOrganId || ""),
        success: function () {
            RX.msg(RX.SUCCESS_DELETE);
            RX.page.prev().reload();
            reloadParentNode();
        }
    });
}

/**
 * 删除机构前打开机构关联信息
 * @returns {boolean}
 */
function checkDelOrgan() {
    var obj = sysOrganGridVm.getSelected();//获取选中行的数据
    if (obj == null || obj == undefined || obj[0] == null) {
        RX.msg(RX.SELECT_DELETE);
        return false;
    } else {
        var delOrganId = obj[0].ID;
        var result = isOrganGlxx(delOrganId);
        //组织只关联了角色
        if (result.organ.length === 0 && (result.user.length === 0 && result.post.length === 0) && result.role.length !== 0) {
            confirmCascadeOrgan(delOrganId, result);
        }
        //组织下没有元素
        else if (result.organ.length === 0 && result.user.length === 0 && result.post.length === 0 && result.role.length === 0) {
            RX.confirm(RX.CONFIRM_DELETE, function () {
                delOrgan(delOrganId);
            })
        } else {
            confirmCascadeOrgan(delOrganId, result);
        }
    }
}

//查看组织关联信息
function isOrganGlxx(id) {
    var result;
    $.ajax({
        type: "post",
        url: "/organ/organGlxx",
        async: false,
        data: {id: id},
        dataType: "json",
        success: function (ar) {
            if (ar.success) {             //设置为弹出层，显示关联数据
                result = ar.data;
            } else {
                RX.alert(ar.msg);
            }
        }
    });
    return result;
}

//打开关联信息
function confirmCascadeOrgan(delOrganId, data) {
    RX.page.open({
        title: "机构关联信息",
        url: "/organ/sysOrganLinkList",
        param: {
            func: "delOrgan",
            delOrganId: delOrganId,
            linkData: data
        }
    });
}

//刷新全局接口
RX.page.reload = function (param) {
    sysOrganGridVm.reloadGrid(param);
};

//zTree的配置
function config() {
    // var url = "/tree/getOrganPostUserTreeWithAuth?kind=op&includeNoOrgan=false";
    var organType = RX.cache(_top, "BASE").ORGAN_TYPE;
    var url;
    if (organType === "np-mo" || organType === "np-so") {
        url = "/tree/getOrganPostUserTree?kind=o";
    } else {
        url = "/tree/getOrganPostUserTree?kind=op";
    }
    var setting = {
        data: {
            simpleData: {
                enable: true,
                idKey: "handleId",
                pIdKey: "pId",
                rootPId: 0
            }
        },
        async: {
            enable: true, type: "post", url: url,
            autoParam: ["id", "lx"]
            // dataFilter: childAjaxDataFilter
        },
        edit: {
            enable: true,
            drag: {
                isCopy: false,    //是否允许复制节点，true时拖动节点变成复制该节点，按ctrl拖动表示复制
                isMove: true
            },
            removeTitle: "删除",
            renameTitle: "修改",
            showRenameBtn: false,
            showRemoveBtn: false
        },
        view: {
            fontCss: getFont,
            selectedMulti: false
        },
        callback: {
            onClick: zTreeOnClick,
            onAsyncSuccess: zTreeOnAsyncSuccess,
            beforeDrag: zTreeBeforeDrag,
            onDrop: zTreeOnDrop
        }
    };
    if (!(!-[1,] && !window.XMLHttpRequest)) {         //不是IE6
        setting.view.addHoverDom = addHoverDom;
        setting.view.removeHoverDom = removeHoverDom;
    } else {
        setting.view.expandSpeed = "";
    }
    return setting;
}

//验证是否拥有权限
var checkHasChildAuth = function () {
    function checkAuth(node) {
        var result = false;
        if (node.hasAuth) {
            result = true;
        } else {
            var parentNode = node.getParentNode();
            if (parentNode) {
                result = checkHasChildAuth(parentNode);
            }
        }
        return result;
    }

    var authPool = {};

    return function (node) {
        if (typeof authPool[node.id] !== "undefined") {
            return authPool[node.id];
        } else {
            var result = checkAuth(node);
            if (node.lx === "jg") {
                authPool[node.id] = result;
            }
            return result;
        }
    }
}();

//权限影响字体样式
function getFont(treeId, node) {
    if (checkHasChildAuth(node)) {
        return {"font-weight": "bold"};
    } else {
        return {color: "#ccc"};
    }
}

//刷新树父节点方法
function reloadParentNode() {
    $.fn.zTree.init($("#tree"), config());
    firstAsyncSuccessFlag = 0; //设置标志位为0
}

//树节点单击事件
function zTreeOnClick(event, treeId, treeNode) {
    //无权限点击无效
    if (!checkHasChildAuth(treeNode)) {
        return false;
    }
    if (treeNode.id === 0 && treeNode.lx === "jg") {
        sysOrganGridVm.autoQuery.set("query.parentOrg", "");
        sysOrganGridVm.autoQuery.set("query.parentId", "");
        RX.page.reload();
    } else if (treeNode.lx === "jg") {
        sysOrganGridVm.autoQuery.set("query.parentOrg", treeNode.name);
        sysOrganGridVm.autoQuery.set("query.parentId", treeNode.id);
        RX.page.reload();
    } else if (treeNode.lx === "gw") {
        sysOrganGridVm.autoQuery.set("query.parentId", -1);
        RX.page.reload();
    }
}

//异步加载树默认展开节点标志位
var firstAsyncSuccessFlag = 0;

//异步加载树默认展开节点
function zTreeOnAsyncSuccess(event, treeId, msg) {
    if (firstAsyncSuccessFlag === 0) {
        try {
            //调用默认展开第一个结点
            var nodes = mainTree.getNodes();
            mainTree.expandNode(nodes[0], true);
            firstAsyncSuccessFlag = 1;
        } catch (err) {
        }
    }
}

/**
 * 树节点hover事件
 * 主要用来添加按钮
 * @param treeId
 * @param treeNode
 */
function addHoverDom(treeId, treeNode) {
    //无权限点击无效
    if (!checkHasChildAuth(treeNode)) {
        return false;
    }
    var sObj = $("#" + treeNode.tId + "_span");
    //验证按钮是否存在
    if (treeNode.editNameFlag || $("#addBtn_" + treeNode.id).length > 0 || $("#stopBtn_" + treeNode.id).length > 0
        || $("#ableBtn_" + treeNode.id).length > 0 || $("#editBtn_" + treeNode.id).length > 0) return;
    var addStr;
    if (treeNode.lx === "jg") {
        //添加按钮
        addStr = $("<span class='iconfont tree-add' id='addBtn_" + treeNode.id + "' title='新增' onfocus='this.blur();'>&#xe62a;</span>");
        sObj.after(addStr);
        var btn = $("#addBtn_" + treeNode.id);
        var parentOrganId = treeNode.id;
        var parentOrganName = "";
        if (parentOrganId) {
            parentOrganName = treeNode.name
        } else {
            parentOrganId = null;
        }
        //添加机构
        if (btn) {
            btn.bind("click", function () {
                addSysOrgan(parentOrganId, parentOrganName);
            });
        }

        if (treeNode.id != 0) {       //如果不是  顶级"机构"
            //编辑按钮
            var editStr = "<span class='iconfont tree-edit' id='editBtn_" + treeNode.id + "' title='修改' onfocus='this.blur();'>&#xe605;</span>";
            addStr.after(editStr);
            var editBtn = $("#editBtn_" + treeNode.id);
            if (editBtn) {
                editBtn.bind("click", function () {
                    RX.page.open({
                        title: "修改机构",
                        url: "/organ/sysOrganAdd",
                        param: {type: "xg", id: treeNode.id}
                    });
                });
            }
        }
    } else if (treeNode.lx == "gw") {
        // var relateRole = "<span class='button edit' id='editBtn_" + treeNode.id + "' title='关联岗位' onfocus='this.blur();'></span>";
        // sObj.append(relateRole);
        // var relateRoleBtn = $("#editBtn_" + treeNode.id);
        // if (relateRoleBtn) {
        //     relateRoleBtn.bind("click", function () {
        //         openStack(window, "关联角色", "medium", "/post/postRole?type=xg&organPostId=" +
        //             treeNode.id + "&organId=" + treeNode.organId + "&basePostId=" + treeNode.basePostId
        //         );
        //     });
        // }
        //编辑按钮
        // var deleteStr = "<span class='button remove' id='deleteBtn_" + treeNode.id + "' title='删除' onfocus='this.blur();'></span>";
        // sObj.append(deleteStr);
        // var deleteBtn = $("#deleteBtn_" + treeNode.id);
        // if (deleteBtn) {
        //     deleteBtn.bind("click", function () {
        //         //todo 岗位下有人禁止删除
        //         layer.confirm("确认删除该岗位吗？", function (index) {
        //             deletePost(treeNode.id, treeNode);
        //             layer.close(index);
        //         })
        //     });
        // }
    }
}

//树节点hover
// 移除事件
function removeHoverDom(treeId, treeNode) {
    //无权限点击无效
    if (!checkHasChildAuth(treeNode)) {
        return false;
    }
    $("#addBtn_" + treeNode.id).unbind().remove();
    $("#deleteBtn_" + treeNode.id).unbind().remove();
    // $("#ableBtn_" + treeNode.id).unbind().remove();
    $("#editBtn_" + treeNode.id).unbind().remove();

}

//注意是treeNodes，可以拖动多个节点
function zTreeBeforeDrag(treeId, treeNodes) {
    for (var i = 0; i < treeNodes.length; i++) {
        if (treeNodes[i].lx !== 'jg') {
            // treeNodes[i].drag == false;
            return false;
        }
    }
    if (treeNodes.length > 1) {
        RX.alert("只可拖动一个机构");
    } else {
        if (treeNodes[0].pId == 0) {
            RX.alert("顶级机构不可拖动");
        }
    }

}

/**
 *
 * @param event
 * @param treeId 目标节点的treeId
 * @param treeNodes 被拖拽节点的JSON数据集合
 * @param targetNode    目标节点的JSON数据集合
 * @param moveType  //相对目标节点的位置  "inner"：成为子节点，"prev"：成为同级前一个节点，"next"：成为同级后一个节点
 */
function zTreeOnDrop(event, treeId, treeNodes, targetNode, moveType) {
    var ids = [], parentNode = targetNode;
    if (!moveType) {
        return;
    }
    if (moveType === "inner") {
        if (parentNode.children) {
            $.each(parentNode.children, function (i, t) {
                if (t.lx === 'jg') {
                    ids.push(t.id);
                }
            })
        }
    } else if (treeNodes[0].pid != parentNode.pid) {
        parentNode = targetNode.getParentNode();
        if (parentNode) {
            if (parentNode.children) {
                $.each(parentNode.children, function (i, t) {
                    if (t.lx === 'jg') {
                        ids.push(t.id);
                    }
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
                    if (t.lx === 'jg') {
                        ids.push(t.id);
                    }
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
            url: "/organ/changeTreeNodeSortAndParent",
            type: 'post',
            data: {ids: ids.join(), parentId: parentNode.id},
            success: function (ar) {
                if (ar.success) {
                    RX.msg(RX.SUCCESS_OPERATE);
                } else {
                    RX.alert(ar.msg);
                }
            }
        })
    }
}


