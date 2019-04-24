package net.ruixin.service.plat.log.dictmap.factory;

import net.ruixin.service.plat.log.dictmap.base.AbstractDictMap;
import net.ruixin.service.plat.log.dictmap.base.SystemDict;
import net.ruixin.util.exception.BizExceptionEnum;
import net.ruixin.util.exception.BussinessException;

/**
 * 字典的创建工厂
 */
@SuppressWarnings("unchecked")
public class DictMapFactory {

    private static final String basePath = "net.ruixin.service.plat.log.dictmap.";

    /**
     * 通过类名创建具体的字典类
     */
    public static AbstractDictMap createDictMap(String className) {
        if ("SystemDict".equals(className)) {
            return new SystemDict();
        } else {
            try {
                Class<AbstractDictMap> clazz = (Class<AbstractDictMap>) Class.forName(basePath + className);
                return clazz.newInstance();
            } catch (ClassNotFoundException | InstantiationException | IllegalAccessException e) {
                throw new BussinessException(BizExceptionEnum.ERROR_CREATE_DICT, className);
            }
        }
    }
}
