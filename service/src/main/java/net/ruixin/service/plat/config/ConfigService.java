package net.ruixin.service.plat.config;

import net.ruixin.dao.plat.config.IConfigDao;
import net.ruixin.domain.constant.Const;
import net.ruixin.domain.plat.config.SysConfig;
import net.ruixin.service.plat.common.BaseService;
import net.ruixin.util.shiro.ShiroKit;
import net.ruixin.util.cache.Cache;
import net.ruixin.util.cache.CacheKit;
import net.ruixin.util.json.JacksonUtil;
import net.ruixin.util.paginate.FastPagination;
import net.sf.ehcache.CacheManager;
import net.sf.ehcache.Element;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class ConfigService extends BaseService implements IConfigService {

    @Autowired
    private IConfigDao configDao;

    @Transactional
    @Override
    public void saveConfig(SysConfig config) {
        //新增、修改配置到数据库
        configDao.saveConfig(config);
        //若非当前应用配置，则不维护缓存
        if (config.getLevels().equals(Const.CONFIG_LEVEL_APP) && !CacheKit.get(Cache.CONSTANT, "appId").equals(config.getAppId())) {
            return;
        }
        //同步更新后端缓存配置
        CacheKit.put(Cache.CONFIG, config.getCode(), config.getValue());
        //同步更新后端缓存类型配置
        Map<String, Object> typeConfig = CacheKit.get(Cache.CONFIG, config.getBizType());
        if (null == typeConfig) {
            typeConfig = new HashMap<>();
        }
        typeConfig.put(config.getCode(), config.getValue());
        CacheKit.put(Cache.CONFIG, config.getBizType(), typeConfig);
        //若更新资源相关配置，重新处理资源配置
        if (Const.CONFIG_TYPE_RESOURCE.equals(config.getBizType())) {
            reloadResource(CacheKit.get(Cache.CONFIG, "resType"), typeConfig);
        }
    }

    @Transactional
    @Override
    public void saveAllResourceConfig(String json) {
        //清空所有已有的资源配置
        configDao.deleteAllResourceConfig();
        List<SysConfig> resCfg = getConfigListByJson(json);
        for (SysConfig sc : resCfg) {
            super.save(sc);
        }
    }

    private List<SysConfig> getConfigListByJson(String json) {
        List<SysConfig> sysConfigList = new ArrayList<>(50);
        Map<String, Map<String, String>> map = JacksonUtil.readValue(json, Map.class);
        Set resType = new HashSet();
        map.forEach((key1, value1) -> {
            resType.add(key1);
            value1.forEach((key, value) -> sysConfigList.add(new SysConfig("res" + "_" + key1 + "_" + key, value, "1", "2")));
        });
        if(resType.size() > 0){
            sysConfigList.add(new SysConfig("resType", StringUtils.join(resType,","), "1", "2"));
        }
        return sysConfigList;
    }

    private void reloadResource(Object resType, Map<String, Object> typeConfig) {
        Map<String, Map<String, Object>> resourceMap = new HashMap<>();
        List<Map<String, Object>> resourceDict = new ArrayList<>();
        String[] resourceType = null;
        if (null != resType) {
            resourceType = resType.toString().split(",");
        }
        if (null != resourceType) {
            for (String type : resourceType) {
                resourceMap.put(type, new HashMap<>());
                Map<String, Object> subdict = new HashMap<>();
                subdict.put("code", type);
                resourceDict.add(subdict);
            }
            for (Map.Entry entry : typeConfig.entrySet()) {
                String key = entry.getKey().toString();
                if (!"resType".equals(key) && key.startsWith("res_")) {
                    String[] subType = key.split("_");
                    if (subType.length == 3 && resourceMap.containsKey(subType[1])) {
                        Object value = entry.getValue();
                        resourceMap.get(subType[1]).put(subType[2], value != null ? value.toString() : "");
                        if ("name".equals(subType[2])) {
                            for (Map<String, Object> subdict : resourceDict) {
                                if (subType[1].equals(subdict.get("code"))) {
                                    subdict.put("value", value != null ? value.toString() : "");
                                    break;
                                }
                            }
                        }
                    }
                }
            }
        }
        CacheKit.put(Cache.CONFIG, "resourceConfig", resourceMap);
        CacheKit.put(Cache.CONFIG, "resourceDict", resourceDict);
    }

    @Override
    public SysConfig getConfigById(Long id) {
        return configDao.getConfigById(id);
    }

    @Transactional
    @Override
    public void delConfig(Long id) {
        //删除数据库中配置
        configDao.delConfig(id);
        //同步更新后端缓存配置
        SysConfig config = getConfigById(id);
        //若非当前应用配置，则不维护缓存
        if (config.getLevels().equals(Const.CONFIG_LEVEL_APP) && !CacheKit.get(Cache.CONSTANT, "appId").toString().equals(config.getAppId().toString())) {
            return;
        }
        //同步更新后端缓存配置
        CacheKit.remove(Cache.CONFIG, config.getCode());
        //同步更新后端缓存类型配置
        Map<String, Object> typeConfig = CacheKit.get(Cache.CONFIG, config.getBizType());
        if (null == typeConfig) {
            typeConfig = new HashMap<>();
        }
        typeConfig.remove(config.getCode());
        CacheKit.put(Cache.CONFIG, config.getBizType(), typeConfig);
        //若更新资源相关配置，重新处理资源配置
        if (Const.CONFIG_TYPE_RESOURCE.equals(config.getBizType())) {
            reloadResource(CacheKit.get(Cache.CONFIG, "resType"), typeConfig);
        }
    }

    @Override
    public FastPagination getConfigList(Map<String, Object> map) {
        map.put("appIds", ShiroKit.getUserResourceIds(Const.RES_TYPE_APP, null, null));
        map.put("hasAll", ShiroKit.isPlatAdmin());
        return configDao.getConfigList(map);
    }

    @Override
    public List<Map<String, Object>> getConfigListByType() {
        Boolean isPlatAdmin = ShiroKit.isPlatAdmin();
        List<Map<String, Object>> resultList = new ArrayList<>();
        StringBuilder appIds = new StringBuilder();
        if (!isPlatAdmin) {
            List<Map> appList = ShiroKit.getUserResource(Const.RES_TYPE_APP, null, null);
            for (Map map : appList) {
                appIds.append(map.get("id").toString()).append(",");
            }
        }
        //平台配置获取
        List<Map<String, Object>> configList = configDao.getConfigListByAppType(appIds.toString(), isPlatAdmin);
        if (configList.size() > 0) {
            Map<String, Object> appMap = new HashMap<>();
            List<Map<String, Object>> typeList = new ArrayList<>();
            Map<String, Object> typeMap = new HashMap<>();
            List<Map<String, Object>> mapList = new ArrayList<>();
            for (Map<String, Object> map : configList) {
                if (appMap.containsKey("appId")) {
                    if (appMap.get("appId").equals(map.get("APP_ID") != null ? map.get("APP_ID").toString() : "0")) {
                        if (typeMap.get("typeName").equals(map.get("TYPE_NAME").toString())) {
                            mapList.add(map);
                        } else {
                            typeMap.put("configList", mapList);
                            typeList.add(typeMap);
                            typeMap = new HashMap<>();
                            typeMap.put("typeName", map.get("TYPE_NAME").toString());
                            mapList = new ArrayList<>();
                            mapList.add(map);
                        }
                    } else {
                        typeMap.put("configList", mapList);
                        typeList.add(typeMap);
                        appMap.put("typeList", typeList);
                        resultList.add(appMap);
                        appMap = new HashMap<>();
                        typeList = new ArrayList<>();
                        typeMap = new HashMap<>();
                        mapList = new ArrayList<>();
                        typeMap.put("typeName", map.get("TYPE_NAME").toString());
                        appMap.put("appId", map.get("APP_ID").toString());
                        appMap.put("name", map.get("APP_NAME"));
                        appMap.put("edit", true);
                        mapList.add(map);
                    }
                } else {
                    if (Const.CONFIG_LEVEL_PLAT.equals(map.get("LEVELS").toString())) {
                        appMap.put("appId", "0");
                        appMap.put("name", "平台");
                        appMap.put("typeList", new ArrayList<>());
                        appMap.put("edit", isPlatAdmin);
                        typeMap.put("typeName", map.get("TYPE_NAME").toString());
                        mapList.add(map);
                    } else {
                        appMap.put("appId", map.get("APP_ID").toString());
                        appMap.put("name", map.get("APP_NAME"));
                        appMap.put("typeList", new ArrayList<>());
                        appMap.put("edit", true);
                        typeMap.put("typeName", map.get("TYPE_NAME").toString());
                        mapList.add(map);
                    }
                }
            }
            typeMap.put("configList", mapList);
            typeList.add(typeMap);
            appMap.put("typeList", typeList);
            resultList.add(appMap);
        }
        return resultList;
    }

    @Override
    public void defaultResourceConfig(){
        configDao.defaultResourceConfig();
    }

    @Override
    public void recacheAllConfig(){
        CacheManager cacheManager = CacheManager.getInstance();
        //缓存配置
        net.sf.ehcache.Cache cache = cacheManager.getCache(net.ruixin.util.cache.Cache.CONFIG);
        List<Map<String, Object>> configs = configDao.getAllValidConfig();
        //清除已存在配置
        CacheKit.removeAll(net.ruixin.util.cache.Cache.CONFIG);
        //单个缓存配置
        CacheKit.putAll(net.ruixin.util.cache.Cache.CONFIG, toElement(configs));
        //按类型缓存配置
        initTypeConfig(configs, cache);
        //处理并缓存资源配置
        initResource(cache);
    }

    private void initTypeConfig(List<Map<String, Object>> configs, net.sf.ehcache.Cache cache) {
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

    private void initResource(net.sf.ehcache.Cache cache) {
        Map<String, Map<String, Object>> resourceMap = new HashMap<>();
        List<Map<String, Object>> resourceDict = new ArrayList<>();
        Map<String,Object> resConfigMap = (Map<String, Object>) cache.get(Const.CONFIG_TYPE_RESOURCE).getObjectValue();
        if(null != resConfigMap){
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
                for (Map.Entry<String,Object> entry : resConfigMap.entrySet()) {
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
