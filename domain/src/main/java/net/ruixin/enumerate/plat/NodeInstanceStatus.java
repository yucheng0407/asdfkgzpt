package net.ruixin.enumerate.plat;

public enum NodeInstanceStatus {
    /**
     * 环节实例状态
     */
    RUNNING("运行", "1"),
    COMPLETE("完成", "2"),
    PAUSED("暂停", "3"),
    UNVALID("无效", "4");

    public final String name;

    public final String id;

    NodeInstanceStatus(String name, String id) {
        this.name = name;
        this.id = id;
    }

    public static String getName(String id) {
        for (NodeInstanceStatus c : NodeInstanceStatus.values()) {
            if (c.id.equals(id)) {
                return c.name;
            }
        }
        return null;
    }

    public static NodeInstanceStatus get(String id) {
        for (NodeInstanceStatus c : NodeInstanceStatus.values()) {
            if (c.id.equals(id)) {
                return c;
            }
        }
        return null;
    }

    public String getId() {
        return id;
    }
}
