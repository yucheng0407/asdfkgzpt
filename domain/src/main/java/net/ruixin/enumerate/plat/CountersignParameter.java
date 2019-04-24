package net.ruixin.enumerate.plat;

import com.fasterxml.jackson.annotation.JsonValue;

/**
 * 会签方式
 *
 * @author Jealous
 * @date 2015/10/15
 */
public enum CountersignParameter {
    /**
     * 会签方式
     */
    ALL("全部", 0), PROPORTION("比例", 1), FIXED("固定", 2);

    public final String name;

    public final int id;

    CountersignParameter(String name, int id) {
        this.name = name;
        this.id = id;
    }

    public static String getName(int id) {
        for (CountersignParameter c : CountersignParameter.values()) {
            if (c.id == id) {
                return c.name;
            }
        }
        return null;
    }

    public static CountersignParameter get(Integer id) {
        if (id != null) {
            for (CountersignParameter c : CountersignParameter.values()) {
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
