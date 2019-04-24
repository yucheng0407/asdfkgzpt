package net.ruixin.service.plat.log;

import net.ruixin.service.plat.log.dictmap.base.AbstractDictMap;
import net.ruixin.service.plat.log.dictmap.factory.DictFieldWarpperFactory;
import net.ruixin.service.plat.log.dictmap.factory.DictMapFactory;
import net.ruixin.util.support.DateUtil;
import net.ruixin.util.support.StrKit;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.beans.IntrospectionException;
import java.beans.PropertyDescriptor;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.Date;
import java.util.Map;

/**
 * 对比两个对象的变化的工具类
 */
@SuppressWarnings("unchecked")
public class Contrast {

    private static final Logger LOGGER = LoggerFactory.getLogger(Contrast.class);

    //记录每个修改字段的分隔符
    public static final String separator = ";;;";

    /**
     * 比较两个对象,并返回不一致的信息
     */
    public static String contrastObj(Object pojo1, Object pojo2) {
        StringBuilder str = new StringBuilder();
        try {
            Class clazz = pojo1.getClass();
            Field[] fields = pojo1.getClass().getDeclaredFields();
            int i = 1;
            for (Field field : fields) {
                if ("serialVersionUID".equals(field.getName())) {
                    continue;
                }
                PropertyDescriptor pd = new PropertyDescriptor(field.getName(), clazz);
                Method getMethod = pd.getReadMethod();
                Object o1 = getMethod.invoke(pojo1);
                Object o2 = getMethod.invoke(pojo2);
                if (o1 == null || o2 == null) {
                    continue;
                }
                if (o1 instanceof Date) {
                    o1 = DateUtil.getDay((Date) o1);
                }
                if (!o1.toString().equals(o2.toString())) {
                    if (i != 1) {
                        str.append(separator);
                    }
                    str.append("字段名称").append(field.getName()).append(",旧值:").append(o1).append(",新值:").append(o2);
                    i++;
                }
            }
        } catch (Exception e) {
            LOGGER.error(e.getMessage(), e);
        }
        return str.toString();
    }

    /**
     * 比较两个对象pojo1和pojo2,并输出不一致信息
     */
    public static String contrastObj(String dictClass, String key, Object pojo1, Map<String, String> pojo2) {
        AbstractDictMap dictMap = DictMapFactory.createDictMap(dictClass);
        StringBuilder str = new StringBuilder(parseMutiKey(dictMap, key, pojo2) + separator);
        try {
            if (pojo1 != null) {

                Class clazz = pojo1.getClass();
                Field[] fields = pojo1.getClass().getDeclaredFields();
                int i = 1;
                for (Field field : fields) {
                    if ("serialVersionUID".equals(field.getName())) {
                        continue;
                    }
                    PropertyDescriptor pd = new PropertyDescriptor(field.getName(), clazz);
                    Method getMethod = pd.getReadMethod();
                    Object o1 = getMethod.invoke(pojo1);
                    Object o2 = pojo2.get(StrKit.firstCharToLowerCase(getMethod.getName().substring(3)));
                    if (o1 == null || o2 == null) {
                        continue;
                    }
                    if (o1 instanceof Date) {
                        o1 = DateUtil.getDay((Date) o1);
                    } else if (o1 instanceof Integer) {
                        o2 = Integer.parseInt(o2.toString());
                    }
                    if (!o1.toString().equals(o2.toString())) {
                        if (i != 1) {
                            str.append(separator);
                        }
                        String fieldName = dictMap.get(field.getName());
                        String fieldWarpperMethodName = dictMap.getFieldWarpperMethodName(field.getName());
                        if (fieldWarpperMethodName != null) {
                            Object o1Warpper = DictFieldWarpperFactory.createFieldWarpper(o1, fieldWarpperMethodName);
                            Object o2Warpper = DictFieldWarpperFactory.createFieldWarpper(o2, fieldWarpperMethodName);
                            str.append("字段名称:").append(fieldName).append(",旧值:").append(o1Warpper).append(",新值:").append(o2Warpper);
                        } else {
                            str.append("字段名称:").append(fieldName).append(",旧值:").append(o1).append(",新值:").append(o2);
                        }
                        i++;
                    }
                }
            }
        } catch (IntrospectionException | InvocationTargetException | IllegalAccessException e) {
            LOGGER.error(e.getMessage(), e);
        }
        return str.toString();
    }

    /**
     * 比较两个对象pojo1和pojo2,并输出不一致信息
     */
    public static String contrastObjByName(String dictClass, String key, Object pojo1, Map<String, String> pojo2) {
        AbstractDictMap dictMap = DictMapFactory.createDictMap(dictClass);
        StringBuilder str = new StringBuilder(parseMutiKey(dictMap, key, pojo2) + separator);
        try {
            if (pojo1 != null) {
                Class clazz = pojo1.getClass();
                Field[] fields = pojo1.getClass().getDeclaredFields();
                int i = 1;
                for (Field field : fields) {
                    if ("serialVersionUID".equals(field.getName())) {
                        continue;
                    }
                    String prefix = "get";
                    int prefixLength = 3;
                    if (Boolean.class.isAssignableFrom(field.getType())) {
                        prefix = "is";
                        prefixLength = 2;
                    }
                    Method getMethod;
                    try {
                        getMethod = clazz.getDeclaredMethod(prefix + StrKit.firstCharToUpperCase(field.getName()));
                    } catch (NoSuchMethodException e) {
                        System.err.println("this className:" + clazz.getName() + " is not methodName: " + e.getMessage());
                        continue;
                    }
                    Object o1 = getMethod.invoke(pojo1);
                    Object o2 = pojo2.get(StrKit.firstCharToLowerCase(getMethod.getName().substring(prefixLength)));
                    if (o1 == null || o2 == null) {
                        continue;
                    }
                    if (o1 instanceof Date) {
                        o1 = DateUtil.getDay((Date) o1);
                    } else if (o1 instanceof Integer) {
                        o2 = Integer.parseInt(o2.toString());
                    }
                    if (!o1.toString().equals(o2.toString())) {
                        if (i != 1) {
                            str.append(separator);
                        }
                        String fieldName = dictMap.get(field.getName());
                        String fieldWarpperMethodName = dictMap.getFieldWarpperMethodName(field.getName());
                        if (fieldWarpperMethodName != null) {
                            Object o1Warpper = DictFieldWarpperFactory.createFieldWarpper(o1, fieldWarpperMethodName);
                            Object o2Warpper = DictFieldWarpperFactory.createFieldWarpper(o2, fieldWarpperMethodName);
                            str.append("字段名称:").append(fieldName).append(",旧值:").append(o1Warpper).append(",新值:").append(o2Warpper);
                        } else {
                            str.append("字段名称:").append(fieldName).append(",旧值:").append(o1).append(",新值:").append(o2);
                        }
                        i++;
                    }
                }
            }
        } catch (IllegalArgumentException | IllegalAccessException | InvocationTargetException e) {
            LOGGER.error(e.getMessage(), e);
        }
        return str.toString();
    }

    /**
     * 解析多个key(逗号隔开的)
     */
    public static String parseMutiKey(AbstractDictMap dictMap, String key, Map<String, String> requests) {
        StringBuilder sb = new StringBuilder();
        if (key.contains(",")) {
            String[] keys = key.split(",");
            for (String item : keys) {
                String fieldWarpperMethodName = dictMap.getFieldWarpperMethodName(item);
                String value = requests.get(item);
                if (fieldWarpperMethodName != null) {
                    Object valueWarpper = DictFieldWarpperFactory.createFieldWarpper(value, fieldWarpperMethodName);
                    sb.append(dictMap.get(item)).append("=").append(valueWarpper).append(",");
                } else {
                    sb.append(dictMap.get(item)).append("=").append(value).append(",");
                }
            }
            return StrKit.removeSuffix(sb.toString(), ",");
        } else {
            String fieldWarpperMethodName = dictMap.getFieldWarpperMethodName(key);
            String value = requests.get(key);
            if (fieldWarpperMethodName != null) {
                Object valueWarpper = DictFieldWarpperFactory.createFieldWarpper(value, fieldWarpperMethodName);
                sb.append(dictMap.get(key)).append("=").append(valueWarpper);
            } else {
                sb.append(dictMap.get(key)).append("=").append(value);
            }
            return sb.toString();
        }
    }

}