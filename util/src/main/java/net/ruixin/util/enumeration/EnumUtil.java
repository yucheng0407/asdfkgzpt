package net.ruixin.util.enumeration;

import net.ruixin.util.tools.RxStringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-5-21
 * Time: 上午11:24
 * To change this template use File | Settings | File Templates.
 */
@SuppressWarnings({"finally", "ReturnInsideFinallyBlock", "unused", "unchecked"})
public class EnumUtil {

    private static final Logger LOGGER = LoggerFactory.getLogger(EnumUtil.class);

    /**
     * 枚举工具类，通过此方法可以生成枚举属性组成的列表，方便前台生成select框
     *
     * @param className 枚举类名
     * @return 枚举属性组成的列表
     */
    private static List<Map<String, Object>> getEnumValue(String className) {
        List<Map<String, Object>> result = new ArrayList<>();
        try {
            Object[] enumArr = Class.forName(className).getEnumConstants();
            List<Field> fieldList = new ArrayList<>();
            Field[] fields = Class.forName(className).getDeclaredFields();
            for (Field fld : fields) {
                if (!fld.isEnumConstant() && !"$VALUES".equals(fld.getName())) {
                    fld.setAccessible(true);
                    fieldList.add(fld);
                }
            }
            for (Object anEnumArr : enumArr) {
                Map<String, Object> item = new HashMap<>();
                item.put("key", anEnumArr.toString());
                for (Field field : fieldList) {
                    item.put(field.getName(), field.get(anEnumArr));
                }
                result.add(item);
            }
            return result;
        } catch (Exception e) {
            LOGGER.error("获取枚举数据异常", e);
            return null;
        }
    }

    /**
     * 根据枚举类、name查找枚举实例
     *
     * @param enumClass 枚举类
     * @param enumKey   name
     */
    private static Enum getEnumByKey(Class enumClass, String enumKey) {
        return Enum.valueOf(enumClass, enumKey);
    }

    /**
     * 根据枚举类、index查找枚举实例
     *
     * @param enumClass 枚举类
     * @param index     index
     */
    private static Enum getEnumByIndex(Class enumClass, int index) {
        Enum[] enumArr = (Enum[]) enumClass.getEnumConstants();
        return enumArr[index];
    }

    /**
     * 根据枚举类、value查找枚举实例
     *
     * @param enumClass 枚举类
     * @param value     name
     */
    public static Enum getEnum(Class enumClass, String value) {
        if (RxStringUtils.isNumber(value)) {
            return getEnumByIndex(enumClass, Integer.parseInt(value));
        } else {
            return getEnumByKey(enumClass, value);
        }
    }
}
