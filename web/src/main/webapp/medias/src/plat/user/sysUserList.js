var sysUserGridVm;
$(function () {

    //实例化ztree
    mainTree = $.fn.zTree.init($("#tree"), config());

    //注册双击事件
    sysUserSettings.autoListBox.onRowDblClick = function (rowIndex, rowData, isSelected, event) {
        RX.page.open({
            title: "查看用户",
            url: "/user/sysUserView",
            areaType: [850, 600],
            param: {
                id: rowData.ID
            }
        });
    };
    sysUserGridVm = new Rxvm({
        widget: RX.Grid,
        el: '#right',
        // template: '#dataList',
        settings: sysUserSettings,
        config: sysUserConfig,
        afterMount: function () {
            RX.button.init($("#operate"), buttonsJson);
        }
    });
});

/**
 * 新增用户表
 */
function addSysUser() {
    var query = sysUserGridVm.get("query");
    var organId = query.organId;
    var organName = query.organName;
    var postRoleId = query.postRoleId;
    var postRoleName = query.postRoleName;
    RX.page.open({
        title: "新增用户",
        areaType: [850, 600],
        url: "/user/sysUserAdd",
        param: {
            organId: organId,
            organName: organName,
            postRoleId: postRoleId,
            postRoleName: postRoleName
        }
    });
}

/**
 * 修改用户表
 */
function editSysUser() {
    var rowData = sysUserGridVm.getSelected();
    if (rowData.length === 1) {
        RX.page.open(
            {
                title: "修改用户",
                url: "/user/sysUserEdit",
                areaType: [850, 600],
                param: {
                    type: "xg",
                    id: rowData[0].ID
                }
            });
    } else {
        RX.msg(RX.SELECT_EDIT);
    }
}


<!--删除-->
/**
 * 删除用户表
 */
function delSysUser() {
    var obj = sysUserGridVm.getSelected();//获取选中行的数据
    if (obj == null || obj == undefined || obj[0] == null) {
        RX.msg(RX.SELECT_DELETE);
    } else {
        RX.confirm(RX.CONFIRM_DELETE, function (index) {
            $.ajax({
                url: "/user/delSysUser?userId=" + obj[0].ID,
                success: function (ar) {
                    if (ar.success) {
                        RX.msg(RX.SUCCESS_DELETE);
                        RX.page.prev().reload();
                    } else {
                        RX.alert(ar.msg);
                    }

                }
            });
        });
    }
}

//封锁/解锁用户
function isBlock() {
    var obj = sysUserGridVm.getSelected();
    if (!obj || obj.length === 0) {
        RX.msg(RX.SELECT_OPERATE);
    } else {
        if (obj[0].IS_BLOCKED == 0) {
            $.ajax({
                type: "get",
                url: "/user/blockUser?userId=" + obj[0].ID + "&r=" + Math.random(),
                success: function (ar) {
                    RX.msg('封锁成功');
                    RX.page.reload();
                }
            })
        } else if (obj[0].IS_BLOCKED == 1) {
            $.ajax({
                type: "get",
                url: "/user/unblockUser?userId=" + obj[0].ID + "&r=" + Math.random(),
                success: function (ar) {
                    RX.msg('解锁成功');
                    RX.page.reload();
                }
            })
        } else {
            RX.alert("该数据状态异常");
        }
    }
}

//刷新全局接口
RX.page.reload = function (param) {
    sysUserGridVm.reloadGrid(param);
};


//异步加载树默认展开节点
var firstAsyncSuccessFlag = 0;

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



//zTree配置
function config() {
    // var url = "/tree/getOrganPostUserTreeWithAuth?kind=op&includeNoOrgan=true";
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
                idKey: "handleId", //节点数据中保存其父节点唯一标识的属性名称
                pIdKey: "pId",
                rootPId: 0
            }
        },
        async: {enable: true, type: "post", url: url, autoParam: ["id", "lx"]},
        view: {
            fontCss: getFont,
            selectedMulti: false
        },
        callback: {
            onClick: zTreeOnClick,
            onAsyncSuccess: zTreeOnAsyncSuccess
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

//ztree节点点击事件
function zTreeOnClick(event, treeId, treeNode) {
    //无权限点击无效
    if (!checkHasChildAuth(treeNode)) {
        return false;
    }
    var param = [];
    if (treeNode.lx === "jg") {
        if (treeNode.id == 0) {
            sysUserGridVm.autoQuery.set("query.organName", "");
            sysUserGridVm.autoQuery.set("query.organId", "");
        } else if (treeNode.id == -1) {
            sysUserGridVm.autoQuery.set("query.postRoleId", "");
            sysUserGridVm.autoQuery.set("query.postRoleName", "");
            sysUserGridVm.autoQuery.set("query.organName", treeNode.name);
            sysUserGridVm.autoQuery.set("query.organId", treeNode.id);
        } else {
            sysUserGridVm.autoQuery.set("query.postRoleId", ""); //清空
            sysUserGridVm.autoQuery.set("query.postRoleName", "");
            sysUserGridVm.autoQuery.set("query.organName", treeNode.name);
            sysUserGridVm.autoQuery.set("query.organId", treeNode.id);
        }
    } else if (treeNode.lx === "gw") {
        sysUserGridVm.autoQuery.set("query.postRoleId", treeNode.id);
        sysUserGridVm.autoQuery.set("query.postRoleName", treeNode.name);
        sysUserGridVm.autoQuery.set("query.organId", treeNode.organId);
        sysUserGridVm.autoQuery.set("query.organName", treeNode.organName);
    }
    RX.page.reload();
}

//在树节点后添加按钮事件
function addHoverDom(treeId, treeNode) {
    //无权限点击无效
    if (!checkHasChildAuth(treeNode)) {
        return false;
    }
    if (treeNode.id != 0 && treeNode.id != -1) {
        var sObj = $("#" + treeNode.tId + "_span");
        if (treeNode.editNameFlag || $("#addBtn_" + treeNode.id).length > 0) return;
        var addStr = "<span class='iconfont tree-add' id='addBtn_" + treeNode.id
            + "' title='新增' onfocus='this.blur();'>&#xe62a;</span>";
        sObj.after(addStr);
        var btn = $("#addBtn_" + treeNode.id);

        if (btn) {
            btn.bind("click", function () {  //getParrentOrgan
                if (treeNode.lx === "jg") {
                    RX.page.open({
                        title: "新增用户",
                        areaType: [700, 510],
                        url: "/user/sysUserEdit",
                        param: {
                            type: "xz",
                            organId: treeNode.id,
                            organName: treeNode.name
                        }
                    });
                } else if (treeNode.lx === "gw") {
                    var organName = treeNode.organName;
                    var organId = treeNode.organId;
                    var postRoleId = treeNode.id;
                    var postRoleName = treeNode.name;
                    RX.page.open({
                        title: "新增用户",
                        areaType: "medium",
                        url: "/user/sysUserEdit",
                        param: {
                            type: "xz",
                            organId: organId,
                            organName: organName,
                            postRoleId: postRoleId,
                            postRoleName: postRoleName
                        }
                    });

                }

            });
        }
    }
}

//移除树节点后添加按钮的事件
function removeHoverDom(treeId, treeNode) {
    //无权限点击无效
    if (!checkHasChildAuth(treeNode)) {
        return false;
    }
    $("#addBtn_" + treeNode.id).unbind().remove();
}

function exportGrid(){
    sysUserGridVm.exportGrid();
}