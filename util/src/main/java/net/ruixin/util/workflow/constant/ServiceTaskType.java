package net.ruixin.util.workflow.constant;

public enum ServiceTaskType {
    MESSAGE("message", "普通任务"),
    SCRIPT("script", "脚本任务"),
    SERVICE("service", "服务任务");

    private String key = "";
    private String value = "";

    private ServiceTaskType(String key, String value) {
        this.key = key;
        this.value = value;
    }

    public String getKey() {
        return this.key;
    }

    public String getValue() {
        return this.value;
    }

    @Override
    public String toString() {
        return this.key;
    }

    public static ServiceTaskType fromKey(String key) {
        ServiceTaskType[] var4;
        int var3 = (var4 = values()).length;

        for(int var2 = 0; var2 < var3; ++var2) {
            ServiceTaskType c = var4[var2];
            if (c.getKey().equalsIgnoreCase(key)) {
                return c;
            }
        }

        throw new IllegalArgumentException(key);
    }
}
