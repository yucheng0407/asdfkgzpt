var organId;
var organName;
var param = RX.page.param;
var func = param.func;
$(function () {
    //实例化ztree
    mainTree = $.fn.zTree.init($("#tree"),config());
    treeVm = new Rxvm({
        widget: RX.Grid,
        el: '#right',
        afterMount: function () {
            RX.button.init($("#w_butt"), buttonsJson);

        }
    });
});
//刷新全局接口
RX.page.reload = function (param) {
    treeVm.reloadGrid(param);
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
    var url = "/tree/getSyncOrganTree?kind=o";
    organId=RX.page.prev().getData();
    organId=RX.page.prev().getData();
    if(organId){
        url += "&filterId=" + organId;
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
            async: {enable: true, type: "post", url: url, autoParam: ["id", "lx","organId","sqCode"]},
            view: {
                expandSpeed: "",
                selectedMulti: false
            },
            callback: {
                onClick: zTreeOnClick,
                onAsyncSuccess: zTreeOnAsyncSuccess
            }
        };
    return setting;
}

//ztree节点点击事件
function zTreeOnClick(event, treeId, treeNode) {
    organId=treeNode.id;
    organName=treeNode.name;
    RX.page.reload();
}

//按钮配置
var buttonArr = [
    {
        id: "save",
        name: "确定",
        onClick: "add",
        style: "c_button"
    }
];
var buttonsJson = {
    tag: ".w_button_box",
    buttons: buttonArr
};

function add() {
    var evalFunc = RX.page.prev().window[func];
    evalFunc(organId,organName);
    RX.page.close();
}