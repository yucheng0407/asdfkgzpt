var tree,
    param = RX.page.param,
    id = param.id,
    roleId = param.roleId,
    resourceType = param.resourceType,
    func = param.func;
$(function () {
    $.ajax({
        url: "/resource/getRoleAllocatResourceTree",
        type: 'post',
        data: {treeHide: true, roleId: roleId},
        success: function (ar) {
            tree = $.fn.zTree.init($("#tree"), {
                data: {
                    simpleData: {
                        enable: true,
                        idKey: "id",
                        pIdKey: "pid",
                        rootPId: 0
                    }
                },
                check: {
                    enable: true,
                    chkboxType: {"Y": "ps", "N": "s"}
                }
            }, ar);
        }
    });
    new RX.ZTreeSearch($("#tree").parent(), "tree");
    $("#save").click(function () {
        var ids = [], nodes = tree.getNodesByParam("checked", true);
        $.each(nodes, function (i, t) {
            ids.push(t.id);
        });
        //获取上次保存的数据
        var saveNodes = tree.getNodesByParam("isSave", true);
        var delIds = [];
        $.each(saveNodes, function (i, t) {
            if (!t.checked) {
                delIds.push(t.id);
            }
        });
        //获取已经排除的数据，下级以及下级的下级必须删除，所以需要获取这次删除的资源
        $.ajax({
            url: "/resource/saveRoleResource",
            type: 'post',
            data: {roleId: roleId, resourceIds: ids.join(), delIds: delIds.join()},
            success: function (ar) {
                if (ar.success) {
                    RX.msg(RX.SUCCESS_SAVE);
                    RX.page.close();
                } else {
                    RX.alert(ar.msg);
                }
            }
        });
    });
});

