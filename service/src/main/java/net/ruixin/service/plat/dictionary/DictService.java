package net.ruixin.service.plat.dictionary;


import net.ruixin.dao.plat.dictionary.IDictDao;
import net.ruixin.domain.plat.dictionary.SysDict;
import net.ruixin.domain.plat.dictionary.SysSubDict;
import net.ruixin.enumerate.plat.SfyxSt;
import net.ruixin.util.cache.Cache;
import net.ruixin.util.cache.CacheKit;
import net.ruixin.util.paginate.FastPagination;
import org.apache.commons.lang3.math.NumberUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;


/**
 * 字典服务层
 */
@Service
public class DictService implements IDictService {

    @Autowired
    private IDictDao dictDao;

    @Override
    @Transactional
    public void saveDict(SysDict sysDict) {
        //保存字典
        dictDao.saveDict(sysDict);
        //添加新字典编码缓存
        updateDictCache(sysDict);
        //删除原字典编码缓存
    }

    private void updateDictCache(SysDict sysDict) {
        List<Map<String, Object>> list = new ArrayList<>();
        Map<String, Object> map;
        for (SysSubDict subDict : sysDict.getSysSubDictList()) {
            if (subDict.getSfyxSt().equals(SfyxSt.VALID)) {
                map = new HashMap<>();
                map.put("dictCode", subDict.getDictCode());
                map.put("code", subDict.getCode());
                map.put("value", subDict.getValue());
                map.put("sort", subDict.getSort());
                map.put("pcode", subDict.getPcode());
                map.put("pdictcode", subDict.getPdictCode());
                list.add(map);
            }
        }
        //2018-10-15 对调整后的字典项进行重新排序
        Collections.sort(list, new Comparator<Map<String, Object>>() {
            @Override
            public int compare(Map<String, Object> m1, Map<String, Object> m2) {
                return NumberUtils.toInt(m1.get("sort").toString()) - NumberUtils.toInt(m2.get("sort").toString());
            }
        });
        CacheKit.put(Cache.DICT, sysDict.getDictCode(), list);
    }

    @Override
    public FastPagination getDictList(Map map) {
        return dictDao.getDictList(map);
    }

    @Override
    public SysDict getDictById(Long id) {
        return dictDao.getDictById(id);
    }

    @Override
    @Transactional
    public void deleteDict(Long dictId) {
        dictDao.deleteDict(dictId);
        //更新ehcache中字典缓存
        SysDict sysDict = dictDao.getDictById(dictId);
        CacheKit.remove(Cache.DICT, sysDict.getDictCode());
    }

    @Override
    public List<Map<String, Object>> getSubDictsByCode(String dictcode) {
        return dictDao.getSubDictsByCode(dictcode);
    }

    @Override
    public String getSubDictValueByCode(String dictCode,String code) {
        List<Map<String, Object>> subDict = dictDao.getSubDictsByCode(dictCode);
        for(Map map:subDict){
            if(map.get("CODE").equals(code)){
                return map.get("VALUE").toString();
            }
        }
        return null;
    }
}
