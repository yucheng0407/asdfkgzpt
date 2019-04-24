var type = RX.page.param.type;
var nodeId = RX.page.param.nodeId;
var nodeName = RX.decode(RX.page.param.nodeName);
var workflowTypeVm;
$(function () {
    workflowTypeVm = new Rxvm({
        el:".form_box",
        config: config,
        afterMount:function(){
            if (type === "xg" && nodeId) {
                $.ajax({
                    type: "get",
                    url: "/workflow/design/getWorkflowType?id=" + nodeId + "&random=" + Math.random(),
                    async: false,
                    success: function (ar) {
                        if (ar.success) {
                            renderForm(ar.data);
                        } else {
                            RX.alert(ar.msg);
                        }
                    }
                });
            } else {
                renderForm();
            }
            $(".w_button_box").show();
            workflowTypeVm.setDisabled("parentName", true);
        }
    });

    $("#save").click(function () {
        if (workflowTypeVm.ruleValidate()) {
            $.ajax({
                type: "post",
                url: "/workflow/design/saveWorkflowType",
                data: {workflowType: workflowTypeVm.getJson()},
                dataType: "json",
                success: function (ar) {
                    if (ar.success) {
                        RX.msg("保存成功");
                        RX.page.prevWin().reloadWfTree();
                        RX.page.close();
                    } else {
                        RX.alert(ar.msg);
                    }
                }
            });
        }
    });
});

//重新渲染表单
function renderForm(data) {
    if (!data) {
        workflowTypeVm.set("parentId", nodeId);
        workflowTypeVm.set("parentName", nodeName);
        workflowTypeVm.setDisabled("parentName", true);
    } else {
        workflowTypeVm.set("id", data.id);
        workflowTypeVm.set("name", data.name);
        workflowTypeVm.set("parentId", data.parentId);
        workflowTypeVm.set("parentName", data.parentName);
        workflowTypeVm.set("description", data.description);
        workflowTypeVm.set("sfyxSt", data.sfyxSt);
    }
}