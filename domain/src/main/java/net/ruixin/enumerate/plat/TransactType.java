package net.ruixin.enumerate.plat;

import com.fasterxml.jackson.annotation.JsonValue;

/**
 * 活动类型
 *
 * @author Jealous
 * @date 2015/10/15
 */
public enum TransactType {
    /**
     * 办理方式
     */
    PREEMPTION("抢占", 0), COUNTERSIGN("会签", 1);

    public final String name;

    public final int id;

    TransactType(String name, int id) {
        this.name = name;
        this.id = id;
    }

    public static String getName(Integer id) {
        if (id != null) {
            for (TransactType c : TransactType.values()) {
                if (c.id == id) {
                    return c.name;
                }
            }
        }
        return null;
    }

    public static TransactType get(Integer id) {
        if (id != null) {
            for (TransactType c : TransactType.values()) {
                if (c.id == id) {
                    return c;
                }
            }
        }
        //默认抢占式(非空)
        return PREEMPTION;
    }

    @JsonValue
    public int getId() {
        return id;
    }
}
