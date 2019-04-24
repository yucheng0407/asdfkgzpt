package net.ruixin.util.workflow.draw.entity;

public class FlowImageStyle {
    private String borderColor;
    private Float borderWidth;
    private String backgroundColor;

    public FlowImageStyle() {
    }

    public String getBorderColor() {
        return this.borderColor;
    }

    public void setBorderColor(String borderColor) {
        this.borderColor = borderColor;
    }

    public Float getBorderWidth() {
        return this.borderWidth;
    }

    public void setBorderWidth(Float borderWidth) {
        this.borderWidth = borderWidth;
    }

    public String getBackgroundColor() {
        return this.backgroundColor;
    }

    public void setBackgroundColor(String backgroundColor) {
        this.backgroundColor = backgroundColor;
    }
}
