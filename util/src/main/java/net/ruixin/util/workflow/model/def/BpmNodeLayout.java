package net.ruixin.util.workflow.model.def;

import net.ruixin.util.workflow.constant.NodeType;

public class BpmNodeLayout {
    private String nodeId = "";
    private String name = "";
    private NodeType nodeType;
    private String parentNodeId = "";
    private float x = 0.0F;
    private float y = 0.0F;
    private float width = 0.0F;
    private float height = 0.0F;

    public BpmNodeLayout(String nodeId, String name, NodeType nodeType, String parentNodeId, float x, float y, float width, float height) {
        this.nodeId = nodeId;
        this.name = name;
        this.nodeType = nodeType;
        this.parentNodeId = parentNodeId;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    public String getNodeId() {
        return this.nodeId;
    }

    public void setNodeId(String nodeId) {
        this.nodeId = nodeId;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public NodeType getNodeType() {
        return this.nodeType;
    }

    public void setNodeType(NodeType nodeType) {
        this.nodeType = nodeType;
    }

    public String getParentNodeId() {
        return this.parentNodeId;
    }

    public void setParentNodeId(String parentNodeId) {
        this.parentNodeId = parentNodeId;
    }

    public float getX() {
        return this.x;
    }

    public void setX(float x) {
        this.x = x;
    }

    public float getY() {
        return this.y;
    }

    public void setY(float y) {
        this.y = y;
    }

    public float getWidth() {
        return this.width;
    }

    public void setWidth(float width) {
        this.width = width;
    }

    public float getHeight() {
        return this.height;
    }

    public void setHeight(float height) {
        this.height = height;
    }
}
