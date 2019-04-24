package net.ruixin.enumerate.plat;

/**
 * 工作流按钮类型
 */
public enum WfBtnType {
    SUBMIT("提交", "1"), REFUSE("退回", "2"), SAVEDRAFT("保存草稿", "3"),
    CANCEL("撤回", "4"), DEL("删除", "5"), DIY("自定义", "6"),
    SPECBACK("特送退回", "7"), PRESS("催办", "8");

    public final String name;

    public final String id;

    WfBtnType(String name, String id) {
        this.name = name;
        this.id = id;
    }

    public static String getName(String id) {
        for (WfBtnType c : WfBtnType.values()) {
            if (id.equals(c.id)) {
                return c.name;
            }
        }
        return null;
    }

    public static WfBtnType get(String id) {
        for (WfBtnType c : WfBtnType.values()) {
            if (id.equals(c.id)) {
                return c;
            }
        }
        return null;
    }
}
