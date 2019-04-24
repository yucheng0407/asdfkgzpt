package net.ruixin.enumerate.plat;

/**
 *shiro查询参数类型
 *
 * @author Jealous
 * @date 2016-8-9
 */
public enum ShiroQueryKey {

    /**
     * 查询参数
     */
    ID("id", 0),
    CODE("code", 1);

    public final String name;

    public final int id;

    ShiroQueryKey(String name, int id) {
        this.name = name;
        this.id = id;
    }

    public static String getName(int id) {
        for (ShiroQueryKey c : ShiroQueryKey.values()) {
            if (c.id == id) {
                return c.name;
            }
        }
        return null;
    }

    public static ShiroQueryKey get(int id) {
        for (ShiroQueryKey c : ShiroQueryKey.values()) {
            if (c.id == id) {
                return c;
            }
        }
        return null;
    }
}
