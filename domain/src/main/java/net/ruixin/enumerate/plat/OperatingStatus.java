package net.ruixin.enumerate.plat;

/**
 * @Author: mxding
 * @Date: 2018-06-04 16:08
 */
public enum OperatingStatus {
    CREATED("新建", 1),
    MODIFY("修改", 2),
    NEWVERSION("新版本", 3),
    COPYSTRUCTURE("复制结构", 4),
    SAVEAS("另存", 5),
    IMPORTING("导入", 6);

    public final String name;
    public final int id;

    OperatingStatus(String name, int id) {
        this.name = name;
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public int getId() {
        return id;
    }

    /**
     * 根据状态ID获取状态枚举
     * @param id 状态ID
     * @return
     */
    public static OperatingStatus get(int id) {
        switch(id) {
            case 1:
                return OperatingStatus.CREATED;
            case 2:
                return OperatingStatus.MODIFY;
            case 3:
                return OperatingStatus.NEWVERSION;
            case 4:
                return OperatingStatus.COPYSTRUCTURE;
            case 5:
                return OperatingStatus.SAVEAS;
            case 6:
                return OperatingStatus.IMPORTING;
            default:
                return OperatingStatus.CREATED;
        }
    }

    /**
     * 判断状态是否为复制新建
     * 复制新建：新版本 or 复制结构 or 另存
     * @param operatingStatus
     * @return
     */
    public static boolean isCopyCreated(OperatingStatus operatingStatus) {
        return OperatingStatus.NEWVERSION.equals(operatingStatus) ||
                OperatingStatus.COPYSTRUCTURE.equals(operatingStatus) ||
                OperatingStatus.SAVEAS.equals(operatingStatus);
    }

    @Override
    public String toString() {
        return String.valueOf(this.getId());
    }
}
