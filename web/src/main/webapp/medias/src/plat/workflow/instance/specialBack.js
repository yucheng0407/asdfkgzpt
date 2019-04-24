//获取参数
var param = RX.page.param;
$(function () {
    //树配置
    function config() {
        var url = "/workflow/instance/getSpecialBackTree?taskId=" + param.taskId;
        return {
            data: {simpleData: {enable: true}},
            async: {enable: true, type: "post", url: url},
            callback: {
                onClick: zTreeOnClick
            }
        };
    }

    /**
     * 点击树节点事件
     * @param event
     * @param treeId
     * @param treeNode
     */
    function zTreeOnClick(event, treeId, treeNode) {
        var treeObj = $.fn.zTree.getZTreeObj("tree");
        var nodes = treeObj.getSelectedNodes();
        var nodeid = "";
        for (var i = 0; i < nodes.length; i++) {
            nodeid = nodes[i].id
        }
        if (nodeid != "")
            $("#nodeid").val(nodeid);
    }

    //初始化树
    $.fn.zTree.init($("#tree"), config());

    //确定事件
    $("#yes").click(function () {
        if ($('#nodeid').val() != "") {
            if ($('#opinion').val() != "") {
                $.ajax({
                    type: "post",
                    url: "/workflow/instance/specialBackTo",
                    data: {
                        taskId: param.taskId,
                        nodeId: $('#nodeid').val(),
                        opinion: $('#opinion').val(),
                        fjId: $("#fj_id").val()
                    },
                    async: false,
                    success: function (ar) {
                        if (ar.success) {
                            param.callBack();
                        } else {
                            RX.alert(ar.msg);
                        }
                    }
                });
            } else {
                RX.alert("请填写办理意见");
            }
        } else {
            RX.alert("请选择退回到的环节");
        }
    });


    //上传/查看附件按钮触发事件
    $("#viewFile").click(function () {
        if (!$("#fj_id").val()) {
            var uuid = RX.uuid();
            $("#fj_id").val(uuid);
            RX.page.open({title:"资料附件上传",areaType:["550px", "400px"],url:"/xcjdjc/jdccEditFj?fj_id=" + uuid});
        } else {
            RX.page.open({title:"资料附件上传",areaType:["550px", "400px"],url:"/xcjdjc/jdccEditFj?fj_id=" + $("#fj_id").val()});
        }
    });
});