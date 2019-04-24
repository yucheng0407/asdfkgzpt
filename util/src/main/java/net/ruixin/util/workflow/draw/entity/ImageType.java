package net.ruixin.util.workflow.draw.entity;

public enum ImageType {
    PNG("png"),
    JPG("jpg");

    private String key;

    private ImageType(String key) {
        this.key = key;
    }

    public String getKey() {
        return this.key;
    }

    @Override
    public String toString() {
        return this.key;
    }
}
