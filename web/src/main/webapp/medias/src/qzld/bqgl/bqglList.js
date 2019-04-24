var gridVm;
$(function () {
    //注册双击事件
    bqglListSettings.autoListBox.onRowDblClick = function (rowIndex, rowData, isSelected, event) {
        RX.page.open({
            title: "查看备勤任务",
            url: "/bqgl/bqglView",
            param: {id: rowData.ID}
        });
    };


    gridVm = new Rxvm({
        widget: RX.Grid,
        el: '#right',
        settings:  bqglListSettings,
        config: bqglListConfig,
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
        RX.page.reload();
    }
});
/**
 * 新增任务
 */
function add() {
    RX.page.open({
        title: "新增任务",
        url: "/bqgl/bqglAdd"
    });
}
/**
 * 全选这一天的日期发布
 * */
function allSel() {
    /*var obj = gridVm.getSelected();
    if(obj.length>0){
        var objs=$('.trhover');
        for (var i = 0; i <objs.length ; i++) {
            $(objs[i]).removeClass('trhover se selectRow')
        }
    }
    else{
        var objs=$('.trhover');
        for (var i = 0; i <objs.length ; i++) {
            $(objs[i]).attr('class','trhover se selectRow');
        }
    }*/
    $.ajax({
        type: "post",
        url: "/bqgl/qxfb",
        dataType: "json",
        async: false,
        success: function (ar) {
            if (ar.success) {
                RX.msg({icon: RX.ICON_SUCCESS, msg: "发布成功"});
                RX.page.reload();
            }
        }
    });


}
/**
 * 修改
 * */
function edit() {
    var obj = gridVm.getSelected();//获取选中行的数据
    if (obj == null || obj == undefined || obj[0] == null||obj.length!=1) {
        RX.msg(RX.SELECT_EDIT);
    }
    else {
        RX.page.open({
            title: "修改任务",
            url: "/bqgl/bqglEdit",
            param: {id: obj[0].ID}
        });
    }
}

/**
 * 发布
 * */
function sub() {
    var obj = gridVm.getSelected();
    if (!obj || obj.length === 0) {
        RX.msg(RX.SELECT_OPERATE);
    }
    var ids=""
    for (var i = 0; i <obj.length ; i++) {
        if(obj[i].SFFB_ST=='1'){
            RX.msg({icon: RX.ICON_ERROR, msg: "存在已发布的任务"});
            RX.page.reload();
            return
        }
        ids+=obj[i].ID+",";
    }
    $.ajax({
        type: "post",
        url: "/bqgl/changeFbzt",
        data: {ids:ids},
        dataType: "json",
        async: false,
        success: function (ar) {

            if (ar.success) {
                RX.msg({icon: RX.ICON_SUCCESS, msg: "发布成功"});
                RX.page.reload();
            }
        }
    });
}
/**
 * 删除
 * */
function deleteBqgl() {

    var obj = gridVm.getSelected();
    if (!obj || obj.length === 0) {
        RX.msg(RX.SELECT_OPERATE);
    }
    var ids=""
    for (var i = 0; i <obj.length ; i++) {
        if(obj[i].SFFB_ST=='1'){
            RX.msg({icon: RX.ICON_ERROR, msg: "存在已发布的任务"});
            RX.page.reload();
            return
        }
        ids+=obj[i].ID+",";
    }
    $.ajax({
        type: "post",
        url: "/bqgl/deleteBqgl",
        data: {ids:ids},
        dataType: "json",
        async: false,
        success: function (ar) {
            if (ar.success) {
                RX.msg({icon: RX.ICON_SUCCESS, msg: "删除成功"});
                RX.page.reload();
            }
        }
    });
}
