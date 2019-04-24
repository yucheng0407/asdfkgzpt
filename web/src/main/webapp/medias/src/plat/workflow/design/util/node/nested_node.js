function ClusterNode() {
    Shape.call(this);

    this.clsName = "shape nested rect";

    this.backgroundColor = "#D2F3FF";

    this.borderColor = "#7B7B7B";

    this.dblclickEvent = function (event) {
        RX.page.open({
            title:"嵌套环节设置",
            param: this,
            url:"/workflow/design/nested_node",
            areaType:["600px","425px"]
        });
    }
}

ClusterNode.create = function (flow, x, y, createId, id) {
    var node = new ClusterNode();
    node.flow = flow;

    var domid, nid;
    if (createId) {
        domid = "n" + (flow.newShapeID++).toString();
        nid = "";
    }
    else {
        domid = "n" + id.toString();
        nid = id;
    }

    node.property = nodeProperty.create(node, x, y, domid, nid);

    flow.addShape(node);
    return node;
}

ClusterNode.create2 = function (flow, x, y, p) {
    var node = new ClusterNode();
    node.flow = flow;

    p.domid = "n" + p.id.toString();

    node.property = p;

    flow.addShape(node);
    return node;
}
