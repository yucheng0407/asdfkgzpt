/**
 *同步人员-机构选择树&&人员-组选择树 ZYG
 */
var param = RX.page.param;
var filterId = param.filterId; //过滤的id，异步树生效。
var func = param.func;     //回调函数
var mainTree;      //树
var organId;
var type=param.type;
$(function () {
    organId=RX.page.prev().getData();
    //实例化机构列表ztree对象
    mainTree = $.fn.zTree.init($("#userTree"), config());
    treeVm = new Rxvm({
        widget: RX.Grid,
        el: '#right',
        afterMount: function () {
            RX.button.init($("#w_butt"), buttonsJson);
        }
    });
});


//人员选择树
function config() {
    var url = "/tree/getSyncOrganTree?topId="+organId;
    if(filterId){
        url += "&filterId=" + filterId;
    }
    if(type=='select'){
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
            },
            callback: {
                onAsyncSuccess: zTreeOnAsyncSuccess
            },
            view: {
                expandSpeed: "",
                selectedMulti: false
            }
        };
        setting.view.notShowClass = true;
    }
    else {
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
            },
            callback: {
                onAsyncSuccess: zTreeOnAsyncSuccess
            },
            view: {
                expandSpeed: "",
                selectedMulti: true
            },
            check: {
                enable: true,
                chkboxType: {"Y": "ps", "N": "s"}
            }
        };
        setting.view.notShowClass = true;
    }
    return setting;
}
//异步加载人员树默认展开节点
var firstAsyncSuccessFlag = 0;



function zTreeOnAsyncSuccess(event, treeId, msg) {
    if (firstAsyncSuccessFlag == 0) {
        try {
            //调用默认展开第一个结点
            var nodes = mainTree.getNodes();
            if (nodes.length == 0) {
                layer.alert("数据不存在", function (index) {
                    layer.close(index);
                    RX.page.close();
                });
            } else {
                mainTree.expandNode(nodes[0], true);
                firstAsyncSuccessFlag = 1;
            }
        } catch (err) {

        }
    }
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

function add(){
    var names = [];
    var ids= [];
    var nodes=null;
    //单选
    if(type==='select'){
        nodes = mainTree.getSelectedNodes();
    }
    //多选
    else{
        nodes = mainTree.getCheckedNodes();
    }
    for (var i = 0; i < nodes.length; i++) {
        if (nodes[i].lx != 'jg') {
            names.push(nodes[i].name);
            ids.push(nodes[i].id);
        }
    }
    var evalFunc = RX.page.prev().window[func];
    evalFunc(names.join(','),ids.join(','));
    RX.page.close();
}
