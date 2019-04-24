package net.ruixin.util.cache;

import net.sf.ehcache.Element;

import java.util.Collection;
import java.util.List;
import java.util.Map;

/**
 * 缓存工具类
 */
public class CacheKit {

    private static final ICache defaultCacheFactory = new EhcacheFactory();

    /**
     * 添加缓存
     *
     * @param cacheName 缓存位置名称
     * @param key       key
     * @param value     value
     */
    public static void put(String cacheName, Object key, Object value) {
        defaultCacheFactory.put(cacheName, key, value);
    }

    /**
     * 添加缓存
     * @param cacheName 缓存位置名称
     * @param key key
     * @param value value
     * @param liveSeconds 缓存存活时间(s)
     */
    public static void put(String cacheName, Object key, Object value, Integer liveSeconds) {
        defaultCacheFactory.put(cacheName, key, value, liveSeconds);
    }

    /**
     * 根据CODE或类型获取缓存的值
     *
     * @param cacheName 缓存名称或缓存类型名称
     * @param key       配置名称
     * @param <T>
     * @return
     */
    public static <T> T get(String cacheName, Object key) {
        return defaultCacheFactory.get(cacheName, key);
    }

    @SuppressWarnings("rawtypes")
    public static List getKeys(String cacheName) {
        return defaultCacheFactory.getKeys(cacheName);
    }

    /**
     * 获取所有缓存
     *
     * @param cacheName 缓存位置名称
     * @return
     */
    public static Map<Object, Element> getAll(String cacheName) {
        return defaultCacheFactory.getAll(cacheName);
    }

    /**
     * 删除缓存
     *
     * @param cacheName 缓存位置名称
     * @param key       key
     */
    public static void remove(String cacheName, Object key) {
        defaultCacheFactory.remove(cacheName, key);
    }

    /**
     * 删除所有缓存
     *
     * @param cacheName 缓存名称
     */
    public static void removeAll(String cacheName) {
        defaultCacheFactory.removeAll(cacheName);
    }

    /**
     * 存入缓存
     * @param cacheName 缓存名称
     * @param elements
     */
    public static void putAll(String cacheName, Collection<Element> elements) {
        defaultCacheFactory.putAll(cacheName, elements);
    }
}


