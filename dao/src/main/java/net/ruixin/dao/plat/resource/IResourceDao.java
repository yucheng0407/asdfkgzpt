package net.ruixin.dao.plat.resource;

import net.ruixin.domain.plat.resource.SysResource;
import net.ruixin.util.paginate.FastPagination;

import java.util.List;
import java.util.Map;

public interface IResourceDao {

    /**
     * 保存、修改资源
     *
     * @param resource 资源
     */
    void saveResource(SysResource resource);

    void updateResourceMaxSort(Long id, Long parentId);

    /**
     * 根据ID获取资源实体
     *
     * @param id 资源ID
     */
    SysResource getResourceById(Long id);

    /**
     * 根据ID删除资源
     *
     * @param id 资源ID
     */
    void delResource(Long id);

    /**
     * 分页列表查询
     *
     * @param map 查询条件
     */
    FastPagination getResourceList(Map map);

    /**
     * 资源异步树数据获取
     *
     * @param resourceType 资源类型
     * @param removeId     启动(排除)资源id
     * @param id           异步节点id
     */
    List<Map<String, Object>> getResourceTreeData(String resourceType, Long removeId, Long id);


    /**
     * 角色资源异步树数据获取
     */
    List<Map<String, Object>> getRoleResourceTreeData(String type, String roleIds, String showRoleIds, Boolean showAll);

    /**
     * 保存角色资源关联
     */
    void saveRoleResource(Long roleId, String resourceIds, Long cjrId, String delIds, Boolean isPlat);

    List<Map<String, Object>> getUserResource(Long userId, String type, Boolean hasAll, Boolean isSysAdmin);

    List<Map<String, Object>> getMenus(Long userId, Boolean hasAll, Boolean isSysAdmin);

    void changeTreeNodeSortAndParent(String ids, Long parentId, String parentType, Long parentShowId, Long needClearTargetId);

    FastPagination getMenuUrlList(Map map);

    void updateOuterTargetUrl(Long id, String url);

    List<Map<String, Object>> getUserResourceUrl(Long id);

    /**
     * 查找自己可分配的资源
     *
     * @param type
     * @param roleIds
     * @param showRoleIds
     * @param showAll
     * @return
     */
    List<Map<String, Object>> getRoleAllocatResourceData(String type, String roleIds, String showRoleIds, Boolean showAll);

    /**
     * 资源分配
     *
     * @param roleIds
     * @param resId
     * @param cjrId
     */
    void saveAllotRes(String roleIds, Long resId, Long cjrId);

    void delResourceByFormId(Long id);
}
