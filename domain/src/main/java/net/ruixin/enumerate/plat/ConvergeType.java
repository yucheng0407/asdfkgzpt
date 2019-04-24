package net.ruixin.enumerate.plat;

import com.fasterxml.jackson.annotation.JsonValue;

/**
 * 聚合方式
 *
 * @author Jealous
 * @date 2015/10/15
 */
public enum ConvergeType {
    /**
     * 聚合方式
     */
    SYNC_CONVERGE("同步聚合", 0),
    ASYNC_CONVERGE("异步聚合", 1),
    NO_CONVERGE("无聚合", 2);

    public final String name;

    public final int id;

    ConvergeType(String name, int id) {
        this.name = name;
        this.id = id;
    }

    public static String getName(Integer id) {
        if (id != null) {
            for (ConvergeType c : ConvergeType.values()) {
                if (c.id == id) {
                    return c.name;
                }
            }
        }
        return null;
    }

    public static ConvergeType get(Integer id) {
        if (id != null) {
            for (ConvergeType c : ConvergeType.values()) {
                if (c.id == id) {
                    return c;
                }
            }
        }
        return null;
    }

    @JsonValue
    public int getId() {
        return id;
    }
}
