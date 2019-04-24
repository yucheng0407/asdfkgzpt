package net.ruixin.util.workflow.model.def;

import java.util.ArrayList;
import java.util.List;

public class BpmDefLayout {
    public static final String BpmDefLayout = "BpmDefLayout_";
    private Long defId;
    private Long instId;
    private String name = "";
    private float width = 0.0F;
    private float height = 0.0F;
    private float originalWidth = 0.0F;
    private float originalHeight = 0.0F;

    private List<BpmNodeLayout> listLayout = new ArrayList<>();

    public Long getDefId() {
        return defId;
    }

    public void setDefId(Long defId) {
        this.defId = defId;
    }

    public Long getInstId() {
        return instId;
    }

    public void setInstId(Long instId) {
        this.instId = instId;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
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

    public float getOriginalWidth() {
        return originalWidth;
    }

    public void setOriginalWidth(float originalWidth) {
        this.originalWidth = originalWidth;
    }

    public float getOriginalHeight() {
        return originalHeight;
    }

    public void setOriginalHeight(float originalHeight) {
        this.originalHeight = originalHeight;
    }

    public List<BpmNodeLayout> getListLayout() {
        return this.listLayout;
    }

    public void setListLayout(List<BpmNodeLayout> listLayout) {
        this.listLayout = listLayout;
    }
}