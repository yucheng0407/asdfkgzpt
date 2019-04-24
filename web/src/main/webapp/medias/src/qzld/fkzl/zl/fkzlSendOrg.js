var orgtemplate;
var orgTree;
$(function(){
    //视图初始化
    orgtemplate = new Rxvm({
        el: '.orgcom',
        template: '#orgtemplate',
        config: config,
        afterMount: function(){
            //实例化机构列表ztree对象
            orgTree = $.fn.zTree.init($("#teamTree"), getSetttingconfig());

        }
    });
});




//发送指令事件
function send(){
    if (orgtemplate.ruleValidate()){
        var nodes = orgTree.getCheckedNodes(true);
        var reciverOrgIds = "";
        for(var i=0;i<nodes.length;i++){
            reciverOrgIds+=nodes[i].id + ",";
        }
        if(reciverOrgIds.length==0){
            RX.alert("请选择要发送的单位!");
            return;
        }
        var fkzlSend = {
            type:orgtemplate.get("zltype"),
            content:orgtemplate.get("content"),
            orgIds:reciverOrgIds.substr(0,reciverOrgIds.length-1)
        };

        $.ajax({
            type: "post",
            url: "/fkzl/sendFkzl",
            contentType : 'application/json',
            dataType : 'json',
            data: JSON.stringify(fkzlSend),
            async: false,
            success: function (ar){
                if (ar.success) {
                    RX.msg(RX.SUCCESS_SAVE);
                    RX.page.reload();
                } else {
                    RX.alert(ar.msg);
                }
            }
        })
    }
}

var filterId;
function getSetttingconfig(){
    var url = "/tree/getOrganPostUserTree?kind=op";
    if (filterId) {
        url += "&filterId=" + filterId;
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
        },
        view: {
            expandSpeed: "",
            selectedMulti: false
        },
        callback: {
            onAsyncSuccess: zTreeOnAsyncSuccess
        },
        check: {
            enable: true,
            chkStyle: "checkbox",
            chkboxType: {"Y": "s", "N": "s"}
        }
    };
    setting.view.notShowClass = true;
    return setting;
}

//异步加载人员树默认展开节点
var firstAsyncSuccessFlag = 0;

function zTreeOnAsyncSuccess(event, treeId, msg) {
    if (firstAsyncSuccessFlag == 0) {
        try {
            //调用默认展开第一个结点
            var nodes = orgTree.getNodes();
            if (nodes.length == 0) {

                layer.alert("数据不存在", function (index) {
                    layer.close(index);
                    RX.page.close();
                });
            } else {
                firstAsyncSuccessFlag = 1;
                orgTree.expandNode(nodes[0], true);
            }
        } catch (err) {
        }
    }
}



