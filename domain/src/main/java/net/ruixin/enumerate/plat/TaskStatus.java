package net.ruixin.enumerate.plat;

import com.fasterxml.jackson.annotation.JsonValue;

/**
 * 任务状态
 *
 * @author Jealous
 * @date 2016-8-9
 */
public enum TaskStatus {
    /**
     * 任务状态
     */
    WAITING("待办", 0),
    ACCEPTING("在办", 1),
    FINISHED("已办", 2),
    PREEMPTION_STOP("抢占终止", 3),
    COUNTERSIGN_STOP("会签终止", 4),
    CIRCULATION_STOP("传阅终止", 5),
    ASYNCHRONISM_STOP("异步终止", 6),
    BE_WITHDRAW("被撤回", 7),
    BE_RETURN("被退回", 8);

    public final String name;

    public final int id;

    TaskStatus(String name, int id) {
        this.name = name;
        this.id = id;
    }

    public static String getName(int id) {
        for (TaskStatus c : TaskStatus.values()) {
            if (c.id == id) {
                return c.name;
            }
        }
        return null;
    }

    public static TaskStatus get(int id) {
        for (TaskStatus c : TaskStatus.values()) {
            if (c.id == id) {
                return c;
            }
        }
        return null;
    }

    @JsonValue
    public String getName() {
        return name;
    }

    public String getValue() {
        return String.valueOf(id);
    }
}
