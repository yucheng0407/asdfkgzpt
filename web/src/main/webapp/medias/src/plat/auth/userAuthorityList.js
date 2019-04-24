var gridVm;
$(function () {

    //注册双击事件
    sysUserSettings.autoListBox.onRowDblClick = function (rowIndex, rowData, isSelected, event) {
        RX.page.open({
            title: "调整用户权限",
            url: "/role/userAuthorityView",
            param: {
                id: rowData.ID
            }
        });
    };

    gridVm = new Rxvm({
        widget: RX.Grid,
        el: '#right',
        settings: sysUserSettings,
        config: sysUserConfig,
        afterMount: function () {
            RX.button.init($("#operate"), buttonsJson);
            //实例化ztree
            mainTree = $.fn.zTree.init($("#tree"), config());
        }
    });
});

function auth() {
    var rowData = gridVm.getSelected();
    if (rowData.length === 1) {
        RX.page.open(
            {
                title: "调整用户权限",
                url: "/role/userAuthorityEdit",
                param: {
                    id: rowData[0].ID
                }
            });
    } else {
        RX.msg(RX.ICON_WARNING, "请选择一条数据进行授权");
    }
}

//刷新全局接口
RX.page.reload = function (param) {
    gridVm.reloadGrid(param);
};


//异步加载树默认展开节点
var firstAsyncSuccessFlag = 0;

function zTreeOnAsyncSuccess(event, treeId, msg) {
    if (firstAsyncSuccessFlag === 0) {
        try {
            //调用默认展开第一个结点
            var nodes = mainTree.getNodes();
            // if(nodes[0]){
            //     mainTree.selectNode(nodes[0]);
            //     mainTree.setting.callback.onClick(null, mainTree.setting.treeId, nodes[0]);
            // }
            mainTree.expandNode(nodes[0], true);
            firstAsyncSuccessFlag = 1;
        } catch (err) {
        }
    }
}

//zTree配置
function config() {
    var organType = RX.cache(_top, "BASE").ORGAN_TYPE;
    var url;
    if (organType === "np-mo" || organType === "np-so") {
        url = "/tree/getOrganPostUserTree?kind=o";
    } else {
        url = "/tree/getOrganPostUserTree?kind=op";
    }
    // var url = "/tree/getOrganPostUserTreeWithAuth?kind=op&includeNoOrgan=true";
    var setting = {
        data: {
            simpleData: {
                enable: true,
                idKey: "handleId",
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
            authPool[node.id] = result;
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
    var param = [];
    if (!checkHasChildAuth(treeNode)) {
        return false;
    }
    gridVm.autoQuery.set("query.organName", treeNode.name);
    gridVm.autoQuery.set("query.organId", treeNode.id);
    RX.page.reload();
}

