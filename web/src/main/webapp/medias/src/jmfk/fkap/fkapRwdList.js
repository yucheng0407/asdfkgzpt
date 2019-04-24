var gridVm;
var organId;
var organName;
$(function () {
    //注册双击事件
    fkapRwdListSettings.autoListBox.onRowDblClick = function (rowIndex, rowData, isSelected, event) {
        RX.page.open({
            title: "查看备勤任务",
            url: "/jmfk/fkapRwdView",
            param: {id: rowData.ID}
        });
    };
    gridVm = new Rxvm({
        widget: RX.Grid,
        el: '#right',
        settings:  fkapRwdListSettings,
        config: fkapRwdListConfig,
        afterMount: function () {
            //实例化按钮
            RX.button.init($("#operate"), buttonsJson);
            //实例化ztree
            mainTree = $.fn.zTree.init($("#tree"), config());
        }
    });
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
        gridVm.autoQuery.set("query.organId", treeNode.id);
        organId=treeNode.id;
        organName=treeNode.name;
        RX.page.reload();
    }
});

/**
 * 新增
 * */
function addRwd() {
    RX.page.open({
        title: "新增任务",
        url: "/jmfk/fkapRwdEdit?organId="+organId+"&organName="+organName
    });
}
/**
 * 修改
 * */
function editRwd() {

}
//删除
function deleteRwd() {
    
}
/**
 * 发布
 * */
function sub() {

}