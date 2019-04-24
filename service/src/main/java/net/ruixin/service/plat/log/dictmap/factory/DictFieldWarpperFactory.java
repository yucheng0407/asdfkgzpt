package net.ruixin.service.plat.log.dictmap.factory;


import net.ruixin.util.exception.BizExceptionEnum;
import net.ruixin.util.exception.BussinessException;
import net.ruixin.service.plat.factory.ConstantFactory;
import net.ruixin.service.plat.factory.IConstantFactory;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

/**
 * 字段的包装创建工厂
 */
public class DictFieldWarpperFactory {

    public static Object createFieldWarpper(Object field, String methodName) {
        IConstantFactory me = ConstantFactory.me();
        try {
            Method method = IConstantFactory.class.getMethod(methodName, field.getClass());
            return method.invoke(me, field);
        } catch (Exception e) {
            try {
                Method method = IConstantFactory.class.getMethod(methodName, Integer.class);
                return method.invoke(me, Integer.parseInt(field.toString()));
            } catch (NoSuchMethodException | InvocationTargetException | IllegalAccessException e1) {
                throw new BussinessException(BizExceptionEnum.ERROR_WRAPPER_FIELD, field + methodName);
            }
        }
    }

}
