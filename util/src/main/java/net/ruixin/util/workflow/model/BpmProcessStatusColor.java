package net.ruixin.util.workflow.model;

public class BpmProcessStatusColor {
    private String key = "";
    private String value = "";
    private String color = "";
    private Integer order = 0;

    public BpmProcessStatusColor() {
    }

    public BpmProcessStatusColor(String key, String value, String color, Integer order) {
        this.key = key;
        this.value = value;
        this.color = color;
        this.order = order;
    }

    public String getKey() {
        return this.key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getValue() {
        return this.value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public String getColor() {
        return this.color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public Integer getOrder() {
        return this.order;
    }

    public void setOrder(Integer order) {
        this.order = order;
    }
}
