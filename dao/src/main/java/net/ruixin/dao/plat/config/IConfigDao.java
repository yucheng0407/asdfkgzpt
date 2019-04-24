package net.ruixin.dao.plat.config;

import net.ruixin.domain.plat.config.SysConfig;
import net.ruixin.util.paginate.FastPagination;

import java.util.List;
import java.util.Map;

public interface IConfigDao {

    /**
     * 保存、修改配置
     *
     * @param config 配置
     */
    void saveConfig(SysConfig config);

    /**
     * 根据ID获取配置实体
     *
     * @param id 配置ID
     */
    SysConfig getConfigById(Long id);

    /**
     * 根据ID删除配置
     *
     * @param id 配置ID
     */
    void delConfig(Long id);

    /**
     * 分页列表查询
     *
     * @param map 查询条件
     */
    FastPagination getConfigList(Map map);

    /**
     * 配置按类别平铺数据获取
     *
     * @param appIds 应用ids
     */
    List<Map<String, Object>> getConfigListByAppType(String appIds, Boolean hasAll);

    /**
     * 删除所有资源配置
     *
     */
    void deleteAllResourceConfig();

    /**
     * 恢复默认资源配置
     */
    void defaultResourceConfig();
    /**
     * 获取所有生效配置
     */
    List<Map<String,Object>> getAllValidConfig();

    /**
     * 根据资源id清除配置数据
     * @param id 资源id
     * @param xgrId 修改人id
     */
    void delConfigByResourceId(Long id, Long xgrId);
}
