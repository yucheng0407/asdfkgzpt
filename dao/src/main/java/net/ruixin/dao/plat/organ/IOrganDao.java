package net.ruixin.dao.plat.organ;

import net.ruixin.domain.plat.organ.SysOrgan;
import net.ruixin.util.paginate.FastPagination;

import java.util.List;
import java.util.Map;

/**
 * @author Pitcher
 * @date 2016-8-16
 * 机构DAO接口
 */
public interface IOrganDao {

    /**
     * 查询组织机构列表
     *
     * @param map 查询条件
     * @return FastPagination
     */
    FastPagination getSysOrganListPage(Map map);

    /**
     * 保存、修改组织机构
     *
     * @param organ 组织机构实体对象
     */
    void saveSysOrgan(SysOrgan organ);

    /**
     * 删除组织机构
     *
     * @param organId    组织id
     * @param newOrganId 组织id
     */
    void deleteOrgan(Long organId, Long newOrganId);

    /**
     * 通过组织机构ID获取组织机构
     *
     * @param id 机构ID
     * @return 机构
     */
    SysOrgan getSysOrganById(Long id);

    /**
     * 获取机构的下级机构的信息(包括，下级机构的总数、岗位的总数、用户的总数)
     *
     * @param id 机构ID
     * @return 机构List
     */
    List<Map<String, Object>> getOrganListByParentId(Long id);

    /**
     * 验证同一组织机构下 简称不能重复
     *
     * @param organId   修改时本机构ID
     * @param organName 机构名称
     * @param parentOrg 上级机构ID
     * @return hasOrganName
     */
    boolean hasOrganName(Long organId, String organName, Long parentOrg);

    /**
     * 获取用户的机构、岗位角色信息
     *
     * @param userId 用户ID
     * @return 用户的机构、岗位信息
     */

    List<Map<String, Object>> getUserOrganPostRole(Long userId);

    /**
     * 通过组织机构代码获取组织机构
     *
     * @param code 机构代码
     * @return 机构
     */
    SysOrgan getOrganByCode(String code);

    /**
     * 组织机构树
     *
     * @param id   机构ID
     * @param kind 树种类
     * @return 机构树
     */
    List<Map<String, Object>> getOrganTree(Long id, String kind);

    /**
     * 更改机构树的父节点和排序
     *
     * @param ids      ids
     * @param parentId parentId
     */
    void changeTreeNodeSortAndParent(String ids, Long parentId);

    /**
     * 获取机构同步树数据通过角色id
     *
     * @param tid    顶级id
     * @param roleId 角色id
     * @return 机构同步树数据
     */

    List getOrganTbTreeDataListByRoleId(Long tid, Long roleId);

    /**
     * 获取组织岗位树数据
     *
     * @param organId 机构id
     * @return 树数据
     */
    Map getOrganPostTreeData(Long organId);

    /**
     * 获取组织机构的角色关联信息
     *
     * @param ids 机构ids
     * @return 机构关联信息
     */
    List<Map<String, Object>> getOrgansGlxx(String ids);

    /**
     * 获取组织机构的角色关联信息,
     *
     * @param ids 机构ids
     * @return 角色关联信息
     */
    List<Map<String, Object>> getOrgansLinkRole(String ids);

    /**
     * 获取机构树列表（同步）
     *
     * @param map 过滤参数 当前包括 topId(顶级id),outId(排查id)
     * @return 机构List
     */
    List<Map<String, Object>> getOrganList(Map map);

    /**
     * 获取树形的机构数据
     *
     * @param organId
     * @return
     */
    Map<String, Object> getOrganData(Long organId);

    List<Map<String, Object>> getPostListByOrganIds(String organIds);

    /**
     * 获取机构的所有子孙（包含本机构）
     *
     * @param organIds
     * @return
     */
    List<Map<String, Object>> getChildOrgans(String organIds);
}
