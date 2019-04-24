package net.ruixin.util.workflow.draw.bpmn;

import java.awt.geom.Point2D.Double;
import java.util.Iterator;
import java.util.List;

public class BPMNEdge {
    private List<Double> points;
    private String name;
    private Double midpoint;
    private DirectionType direction;
    private String sourceRef;
    private String targetRef;
    private FlowType flowType;
    private float labelX = 0.0F;
    private float labelY = 0.0F;
    private float labelWidth = 0.0F;
    private float labelHeight = 0.0F;

    public BPMNEdge() {
    }

    public List<Double> getPoints() {
        return this.points;
    }

    public void setPoints(List<Double> points) {
        this.points = points;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getMidpoint() {
        return this.midpoint;
    }

    public void setMidpoint(Double midpoint) {
        this.midpoint = midpoint;
    }

    public DirectionType getDirection() {
        return this.direction;
    }

    public void setDirection(DirectionType direction) {
        this.direction = direction;
    }

    public String getSourceRef() {
        return this.sourceRef;
    }

    public void setSourceRef(String sourceRef) {
        this.sourceRef = sourceRef;
    }

    public String getTargetRef() {
        return this.targetRef;
    }

    public void setTargetRef(String targetRef) {
        this.targetRef = targetRef;
    }

    public FlowType getFlowType() {
        return this.flowType;
    }

    public void setFlowType(FlowType flowType) {
        this.flowType = flowType;
    }

    public float getLabelX() {
        return this.labelX;
    }

    public void setLabelX(float labelX) {
        this.labelX = labelX;
    }

    public float getLabelY() {
        return this.labelY;
    }

    public void setLabelY(float labelY) {
        this.labelY = labelY;
    }

    public float getLabelWidth() {
        return this.labelWidth;
    }

    public void setLabelWidth(float labelWidth) {
        this.labelWidth = labelWidth;
    }

    public float getLabelHeight() {
        return this.labelHeight;
    }

    public void setLabelHeight(float labelHeight) {
        this.labelHeight = labelHeight;
    }

    @Override
    public String toString() {
        String str = "";

        Double point;
        for(Iterator var3 = this.points.iterator(); var3.hasNext(); str = str + point.getX() + ":" + point.getY() + "  ") {
            point = (Double)var3.next();
        }

        return "BPMNEdge [points=" + str + ", name=" + this.name + " <midpoint=" + this.midpoint.getX() + ":" + this.midpoint.getY() + ">]";
    }
}

