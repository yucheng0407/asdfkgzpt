package net.ruixin.enumerate.plat;

/**
 * 工作流任务是否完成
 *
 * @Author: mxding
 * @Date: 2018-08-10 09:29
 */
public enum TaskFinishEnum {
    NO("未完成", "0"), YES("已完成", "1");

    public final String name;

    public final String value;

    TaskFinishEnum(String name, String value) {
        this.name = name;
        this.value = value;
    }
}
