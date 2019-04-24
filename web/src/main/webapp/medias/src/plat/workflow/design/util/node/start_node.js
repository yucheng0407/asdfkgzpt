function StartNode() {
    Oval.call(this);

    this.clsName = "node start";

    this.backgroundColor = "#D2F3FF";

    this.borderColor = "#7B7B7B";

    this.dblclickEvent = function (event) {
        RX.page.open({
            title:"开始环节设置",
            param: this,
            url:"/workflow/design/startNodeEdit",
            areaType:["600px","400px"]
        });
    };
}

StartNode.create = function (flow, x, y, createId, id) {
    var node = new StartNode();
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
};

StartNode.create2 = function (flow, x, y, p) {
    var node = new StartNode();
    node.flow = flow;

    p.domid = "n" + p.id.toString();

    node.property = p;

    flow.addShape(node);
    return node;
};
