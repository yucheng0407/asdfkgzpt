package net.ruixin.enumerate.plat;

/**
 * @Author: wangyang
 * @Date: 2018-09-013 16:12
 */
public enum WorkflowSaveStatus {
    DRAFT("草稿", 0),
    RELEASE("发布", 1),
    DISABLED("不启用", 2);

    public final String name;
    public final int id;

    WorkflowSaveStatus(String name, int id) {
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
     *
     * @param id 状态ID
     * @return
     */
    public static WorkflowSaveStatus get(int id) {
        switch (id) {
            case 0:
                return WorkflowSaveStatus.DRAFT;
            case 1:
                return WorkflowSaveStatus.RELEASE;
            case 2:
                return WorkflowSaveStatus.DISABLED;
            default:
                return WorkflowSaveStatus.DRAFT;
        }
    }

    @Override
    public String toString() {
        return String.valueOf(this.getId());
    }
}
