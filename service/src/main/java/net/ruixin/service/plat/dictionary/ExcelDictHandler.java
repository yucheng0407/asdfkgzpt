package net.ruixin.service.plat.dictionary;

import cn.afterturn.easypoi.handler.inter.IExcelDictHandler;
import net.ruixin.util.cache.Cache;
import net.ruixin.util.cache.CacheKit;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component
public class ExcelDictHandler implements IExcelDictHandler {
    @Override
    public String toName(String dict, Object obj, String name, Object value) {
        List<Map<String, String>> dictList = CacheKit.get(Cache.DICT, dict);
        for (Map<String, String> map : dictList) {
            if (map.get("code").equals(value)) {
                return map.get("value");
            }
        }
        return null;
    }

    @Override
    public String toValue(String dict, Object obj, String name, Object value) {
        return null;
    }
}
