var tree,
    param = RX.page.param,
    id = param.id,
    resourceType = param.resourceType,
    func = param.func;
$(function () {
    tree = $.fn.zTree.init($("#tree"), {
        data: {
            simpleData: {
                enable: true,
                idKey: "id",
                pIdKey: "pid",
                rootPId: 0
            }
        },
        async: {
            enable: true,
            type: "post",
            url: "/resource/getResourceTreeData?removeId=" + id + "&resourceType=" + resourceType,
            autoParam: ["id"]
        }
    });

    $("#save").click(function () {
        var nodes = tree.getSelectedNodes();
        if (nodes.length == 0) {
            RX.alert("未选择");
        } else {
            var evalFunc = RX.page.prevWin()[func];
            evalFunc(nodes[0].id, nodes[0].name, nodes[0].type);
            RX.page.close();
        }
    });
});

