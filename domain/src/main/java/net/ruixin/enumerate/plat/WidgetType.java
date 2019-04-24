package net.ruixin.enumerate.plat;


/**
 * 控件类型
 */
public enum WidgetType {
    TEXT("text", "普通文本"),
    TEXTAREA("textarea", "长文本"),
    NUMBER("number", "数字"),
    RADIO("radio", "单选"),
    CHECKBOX("checkbox", "多选"),
    SELECT("select", "下拉选择"),
    DATEPICKER("datePicker", "日期"),
    ATTACHMENT("attachment", "附件"),
    SELECTOR("selector", "选择器"),
    DATABASE("database", "数据库字段");


    public final String key;
    public final String value;

    WidgetType(String key, String value) {
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

    public static WidgetType get(String key) {
        WidgetType[] var4;
        int var3 = (var4 = values()).length;

        for (int var2 = 0; var2 < var3; ++var2) {
            WidgetType c = var4[var2];
            if (c.getKey().equalsIgnoreCase(key)) {
                return c;
            }
        }

        throw new IllegalArgumentException(key);
    }

}
