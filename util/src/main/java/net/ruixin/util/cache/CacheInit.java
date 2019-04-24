package net.ruixin.util.cache;

import net.ruixin.domain.constant.Const;
import net.sf.ehcache.Cache;
import net.sf.ehcache.CacheManager;
import net.sf.ehcache.Element;
import org.apache.commons.lang3.StringUtils;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.*;

/**
 * 后端缓存初始化
 * 配置缓存、字典暂不缓存
 */
@SuppressWarnings("unchecked")
public class CacheInit {

    private static final String dictSql = "SELECT SS.DICT_CODE \"dictCode\", " +
            " SS.CODE \"code\", SS.VALUE \"value\",SS.SORT \"sort\", " +
            " SS.PCODE \"pcode\", SS.PDICT_CODE \"pdictcode\", " +
            " SS.REMARK \"remark\" " +
            "  FROM SYS_SUBDICT SS WHERE SS.SFYX_ST = '1' ORDER BY SORT";
    private static final String configSql = "SELECT C.CODE KEY, C.VALUE ,C.BIZ_TYPE AS TYPE FROM SYS_CONFIG C " +
            "LEFT JOIN SYS_RESOURCE R ON R.ID = C.APP_ID AND INSTR('" + Const.APP_CODE + "',R.CODE) > 0 " +
            "WHERE C.SFYX_ST = '1' ORDER BY C.BIZ_TYPE ASC, C.APP_ID NULLS FIRST";
    private static final String appSql = "SELECT R.ID FROM SYS_RESOURCE R WHERE R.CODE = '" + Const.APP_CODE + "' AND ROWNUM = 1";
    private static final String resSql = "SELECT T.URL url FROM SYS_RESOURCE T WHERE T.TYPE != 'APP' AND T.SFYX_ST = '1' AND T.TARGET_ID IS NULL AND T.URL IS NOT NULL";

    public void setJdbcTemplate(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private JdbcTemplate jdbcTemplate;

    public void init() {
        CacheManager cacheManager = CacheManager.getInstance();
        //缓存项目id
        Map app = jdbcTemplate.queryForMap(appSql);
        if (null != app) {
            CacheKit.put(net.ruixin.util.cache.Cache.CONSTANT, "appId", app.get("ID"));
        }
        //资源
        List<Map<String, Object>> resList = jdbcTemplate.queryForList(resSql);
        CacheKit.put(net.ruixin.util.cache.Cache.CONSTANT, "RESOURCE", toHashMap(resList));
        //缓存字典
        List<Map<String, Object>> dicts = jdbcTemplate.queryForList(dictSql);
        CacheKit.putAll(net.ruixin.util.cache.Cache.DICT, toCollection(dicts));
        CacheKit.get(net.ruixin.util.cache.Cache.DICT, "ZDLX");
        //缓存配置
        Cache cache = cacheManager.getCache(net.ruixin.util.cache.Cache.CONFIG);
        List<Map<String, Object>> configs = jdbcTemplate.queryForList(configSql);
        //单个缓存配置
        CacheKit.putAll(net.ruixin.util.cache.Cache.CONFIG, toElement(configs));
        //按类型缓存配置
        initTypeConfig(configs, cache);
        //处理并缓存资源配置
        initResource(cache);
    }

    private HashMap toHashMap(List<Map<String, Object>> resList) {
        HashMap<String, Object> hashRes = new HashMap();
        for (Map<String, Object> map : resList) {
            String url = (String) map.get("url");
            if (StringUtils.isNotBlank(url)) {
                hashRes.put(url, true);
            }
        }
        return hashRes;
    }

    private void initTypeConfig(List<Map<String, Object>> configs, Cache cache) {
        if (null != configs && configs.size() > 0) {
            Object type = configs.get(0).get("TYPE");
            Map<String, Object> typeConfigMap = new HashMap<>();
            for (Map map : configs) {
                if (type.equals(map.get("TYPE"))) {
                    typeConfigMap.put(map.get("KEY").toString(), map.get("VALUE"));
                } else {
                    cache.put(new Element(type, typeConfigMap));
                    type = map.get("TYPE");
                    typeConfigMap = new HashMap<>();
                    typeConfigMap.put(map.get("KEY").toString(), map.get("VALUE"));
                }
            }
            cache.put(new Element(type, typeConfigMap));
        }
    }

    private void initResource(Cache cache) {
        Map<String, Map<String, Object>> resourceMap = new HashMap<>();
        List<Map<String, Object>> resourceDict = new ArrayList<>();
        Map<String, Object> resConfigMap = (Map<String, Object>) cache.get(Const.CONFIG_TYPE_RESOURCE).getObjectValue();
        if (null != resConfigMap) {
            String[] resourceType = null;
            for (Map.Entry entry : resConfigMap.entrySet()) {
                if ("resType".equals(entry.getKey())) {
                    resourceType = entry.getValue().toString().split(",");
                    break;
                }
            }
            if (null != resourceType) {
                for (String type : resourceType) {
                    resourceMap.put(type, new HashMap<>());
                    Map subdict = new HashMap();
                    subdict.put("code", type);
                    resourceDict.add(subdict);
                }
                for (Map.Entry<String, Object> entry : resConfigMap.entrySet()) {
                    if (!"resType".equals(entry.getKey()) && entry.getKey().startsWith("res_")) {
                        String[] subType = entry.getKey().split("_");
                        if (subType.length == 3 && resourceMap.containsKey(subType[1])) {
                            resourceMap.get(subType[1]).put(subType[2], entry.getValue() != null ? entry.getValue().toString() : "");
                            if ("name".equals(subType[2])) {
                                for (Map subdict : resourceDict) {
                                    if (subType[1].equals(subdict.get("code"))) {
                                        subdict.put("value", entry.getValue() != null ? entry.getValue().toString() : "");
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        cache.put(new Element("resourceConfig", resourceMap));
        cache.put(new Element("resourceDict", resourceDict));
    }

    private Collection<Element> toElement(List<Map<String, Object>> maps) {
        Set<Element> set = new HashSet<>();
        for (Map<String, Object> map : maps) {
            set.add(new Element(map.get("KEY"), map.get("VALUE")));
        }
        return set;
    }

    private Collection<Element> toCollection(List<Map<String, Object>> maps) {
        Set<Element> set = new HashSet<>();
        Map<String, List<Map>> code = new HashMap<>();
        String dictCode;
        List<Map> list;
        for (Map<String, Object> map : maps) {
            dictCode = map.get("dictCode").toString();
            if (code.containsKey(dictCode)) {
                code.get(dictCode).add(map);
            } else {
                list = new ArrayList<>();
                list.add(map);
                code.put(dictCode, list);
            }
        }
        for (Map.Entry entry : code.entrySet()) {
            set.add(new Element(entry.getKey(), entry.getValue()));
        }
        return set;
    }
}
