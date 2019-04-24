/**
 *机构选择树表单设计使用
 * @type {*}
 */
var param = RX.page.param,
    sync = param.sync || false,  //加载方式,默认同步   false:异步

    func = param.func,     //回调函数
    kind = param.kind || "o",     //树的种类  o:机构树 ou:机构用户树 op:机构岗位数  默认：o
    selectType = param.selectType || "sin",     //选择方式，单选多选。 "sin":单选 "mul:多选  默认：sin
    topId = param.topId || 2,               //顶级ID
    cascadeSel = param.cascadeSel || "ps-s",                 //默认ps-s ,"-"前半代表勾选时，父子节点的级联；"-"后半代表取消勾选时，父子节点的级联
    //例如：都不级联：n-n,都级联："ps-ps"等
    includeNoOrgan = param.includeNoOrgan || false;         //包含无机构用户。
var confirmFunc = RX.page.param.confirmFunc; //本页面编写确认函数，会将nodes传入到本页面
var filterId = param.filterId; //过滤的id，异步树生效。
var mainTree;    //机构树
$(function () {
    if (sync === false || sync === "false") {
        //异步树
        asyncOrganTree();
    } else {
        //同步树
        syncOrganTree();
    }
    //获取树对象
    // var zTree = $.fn.zTree.getZTreeObj("tree");

    //确认操作
    $("#confirm").click(function () {
        if (func && func !== "null") {
            confirmSelect();
        } else {
            RX.page.close();
        }
    });
});

/**
 * 树的公共配置
 */
function treeConfig() {
    var setting = {
        data: {
            simpleData: {
                enable: true,
                idKey: "handleId", //节点数据中保存其父节点唯一标识的属性名称
                pIdKey: "pId",//节点数据中保存唯一标识的属性名称
                rootPId: 0   //用于修正根节点父节点数据
            }
        },
        check: {},
        view: {
            dblClickExpand: false
        },
        callback: {
            onClick: onClick                //点击后
        }
    };
    //多选框checkBox
    if (selectType === "mul") {
        setting.check = {
            enable: true
        }
    }
    var selType;
    //判断是否级联选择
    selType = handleSelType(cascadeSel);
    setting.check.chkboxType = selType;
    return setting;
}

/**
 * 初始化异步树
 */
function asyncOrganTree() {
    var url = "/tree/getOrganPostUserTree?kind=" + kind + "&includeNoOrgan=" + includeNoOrgan;
    var setting = treeConfig();
    setting.async = {
        enable: true,
        type: "post",
        url: url,
        autoParam: ["id", "lx", "organId"],
        dataFilter: ajaxDataFilter //数据过滤
    };
    setting.callback.onAsyncSuccess = zTreeOnAsyncSuccess; //树异步加载事件
    mainTree = $.fn.zTree.init($("#tree"), setting);
}

/**
 * 初始化同步树
 */
function syncOrganTree() {
    var setting = treeConfig();
    var url = "/tree/getSyncOrganTree?kind=" + kind + "&topId=" + topId;
    $.ajax({
        url: url,
        success: function (ar) {
            mainTree = $.fn.zTree.init($("#tree"), setting, ar);
        }
    });

}

//树单击事件
function onClick(event, treeId, treeNode, clickFlag) {
}


var firstAsyncSuccessFlag = 0;

/**
 * 异步加载成功接口
 * @param event
 * @param treeId
 * @param msg
 */
function zTreeOnAsyncSuccess(event, treeId, msg) {
    if (firstAsyncSuccessFlag === 0) {
        try {
            //调用默认展开第一个结点
            var nodes = mainTree.getNodes();
            mainTree.expandNode(nodes[0], true);
            firstAsyncSuccessFlag = 1;
            RX.closePageLoading();
        } catch (err) {
        }
    }
}

//获取机构子节点的第一个机构父节点
function getJgNode(node) {
    var parentNode = node.getParentNode();
    if (parentNode.lx === 'jg') {
        return parentNode;
    } else {
        return getJgNode(parentNode);
    }
}


/**
 * 选择树的确认操作
 */
function confirmSelect() {
    var nodes;
    if (selectType === "mul") {
        nodes = mainTree.getCheckedNodes(true);
    } else {
        nodes = mainTree.getSelectedNodes();
    }
    if (confirmFunc) {
        var confirmCallFunc = RX.page.prev().window[confirmFunc];
        confirmCallFunc(nodes);
        RX.page.close();
    } else {
        var func = RX.page.param.func;
        var evalFunc = RX.page.prev().window[func];
        var ids = "", names = '', codes = "";
        var organName = [], postRoleName = [], organId = [], postRoleId = [];
        nodes.length > 0 && $.each(nodes, function (index, node) {
            if (node.lx === "jg") {
                organName.push(node.name);
                organId.push(node.id);
            }
            if (node.lx === "gw") {
                postRoleName.push(node.name);
                postRoleId.push(node.id);
                var organNode = getJgNode(node);
                organName.push(organNode.name);
                organId.push(organNode.id);
            }
        });
        if (evalFunc(organId.join(","), organName.join(","), param.viewModel) === false) {
        } else {
            RX.page.close();
        }
    }
}

/**
 * 数据过滤
 * @param treeId
 * @param parentNode
 * @param responseData
 * @returns {Array}
 */
function ajaxDataFilter(treeId, parentNode, responseData) {
    var resultData = [];
    $.each(responseData, function (i, t) {
        if (!(filterId && filterId == t.id && t.lx === 'jg')) {
            resultData.push(t);
        }
    });
    return resultData;
}

function handleSelType(selType) {
    var selResult = {"Y": "", "N": ""};
    if (selType) {
        var selArr = selType.split("-");
        selResult.Y = RX.replaceStrChar(selArr[0], "n", "");
        selResult.N = RX.replaceStrChar(selArr[1], "n", "");
    }
    return selResult;
}