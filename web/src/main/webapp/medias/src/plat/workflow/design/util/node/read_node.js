function CirculationNode() {
    Shape.call(this);

    this.clsName = "node read";

    this.backgroundColor = "#D2F3FF";

    this.borderColor = "#7B7B7B";

    this.dblclickEvent = function (event) {
        RX.page.open({
            title:"传阅环节设置",
            param: this,
            url:"/workflow/design/read_node",
            areaType:["630px","545px"]
        });
    }

}

CirculationNode.create = function (flow, x, y, createId, id) {
    var node = new CirculationNode();
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

CirculationNode.create2 = function (flow, x, y, p) {
    var node = new CirculationNode();
    node.flow = flow;

    p.domid = "n"+p.id.toString();

    node.property = p;

    flow.addShape(node);
    return node;
};
