package net.ruixin.enumerate.plat;

import java.util.LinkedHashMap;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 16-2-29
 * Time: 上午8:06
 * To change this template use File | Settings | File Templates.
 * @author Administrator
 */
public enum SfyxSt {
    /**
     * 是否有效
     */
    UNVALID("无效", 0), VALID("有效", 1), TEMPORARY("临时状态", 2),SPECIAL("特殊字段",3);

    public final String name;
    public final int id;

    SfyxSt(String name, int id) {
        this.name = name;
        this.id = id;
    }

    public static String getName(int id) {
        for (SfyxSt c : SfyxSt.values()) {
            if (c.id == id) {
                return c.name;
            }
        }
        return null;
    }

    public static SfyxSt get(int id) {
        for (SfyxSt c : SfyxSt.values()) {
            if (c.id == id) {
                return c;
            }
        }
        return null;
    }

    public static Map getMap() {
        Map<Object, Object> enumMap = new LinkedHashMap<>();
        for (SfyxSt c : SfyxSt.values()) {
            enumMap.put(c.id, c.name);
        }
        return enumMap;
    }
}
