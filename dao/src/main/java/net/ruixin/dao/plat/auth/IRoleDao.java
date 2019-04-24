package net.ruixin.dao.plat.auth;

import net.ruixin.domain.plat.auth.SysRole;
import net.ruixin.util.paginate.FastPagination;

import java.util.List;
import java.util.Map;

/**
 * Created by admin on 2016-8-24.
 * 角色DAO接口
 */
public interface IRoleDao {
    /**
     * 根据角色ID查询角色信息
     *
     * @param id 角色ID
     * @return 角色实体
     */
    SysRole getRoleById(Long id);

    /**
     * 保存角色信息
     *
     * @param sysRole   角色信息
     * @param clearFlag 是否清除流程角色的关联数据
     */
    void persistRole(SysRole sysRole, Boolean clearFlag);

    void saveRole(SysRole sysRole);
    /**
     * 查询角色列表
     *
     * @param map 查询条件
     * @return FastPagination
     */
    FastPagination getRoleList(Map map);

    /**
     * 根据角色ID查询关联对象信息
     *
     * @param roleIds 角色ID,逗号拼接的ID字符串
     * @return List
     */
    List getRoleGlDataList(String roleIds);

    /**
     * 删除角色信息
     *
     * @param roleId 角色ID
     */
    void deleteRole(Long roleId);

    /**
     * 通过关联id获取关联角色
     *
     * @param gl_ids  关联id，支持多个id同时获取
     * @param gl_type 关联类型 2 机构   1 岗位   0 用户
     */
    List<Map<String, Object>> getRoleByGlxx(String gl_ids, String gl_type);


    /**
     * 查询获取要素关联角色信息
     *
     * @param eleId   要素id
     * @param gl_type 关联要素类型 2 机构   1 岗位   0 用户
     * @return List
     */
    List<Map<String, Object>> getRoleListByEleId(Long eleId, String gl_type);


    /**
     * 查询角色下有无关联用户
     *
     * @param roleId 角色id
     * @return Boolean
     */
    boolean checkRoleHasUser(Long roleId);

    /**
     * 查询角色下规则
     *
     * @param roleId 角色id
     * @return List
     */
    List getRoleGlRule(Long roleId);


    /**
     * 获取用户所有角色的最大数据权限
     *
     * @param userId 用户id
     * @return String
     */
    String getRoleAuthTypeByUserId(Long userId);

    /**
     * 获取用户所有角色的最大数据权限
     *
     * @param map    搜索条件
     * @param roleId 角色id
     * @return FastPagination
     */
    FastPagination getRoleGlbUser(Map map, Long roleId);


    /**
     * 根据角色id查询工作流name
     *
     * @param roleId 角色ID
     * @return List
     */
    List<Map<String, Object>> getWFNameByRoleId(Long roleId);

    /**
     * 根据角色id获取角色关联信息
     *
     * @param roleId 角色id
     */
    Map<String, Object> getGlxxByRoleForRelate(Long roleId);

    Map<String, Object> getGlxxByRoleForShow(Long roleId);

    void saveRoleGlxx(Object[] params);

    /**
     * 根据角色id获取角色关联动态规则
     *
     * @param roleId 角色id
     */
    List<Map<String, Object>> getRuleByRole(Long roleId);

    /**
     * 根据用户关联角色
     *
     * @param userId 用户id
     */
    List<Map<String, Object>> getUserSysRole(Long userId);

    /**
     * 根据机构ID获取岗位角色
     *
     * @param id 机构ID
     * @return 岗位角色
     */
    List<Map<String, Object>> getPostRoleByOrganId(Long id);


    /**
     * 角色选择
     *
     * @return 搜索参数
     */
    FastPagination getSelectRole(Map map);

    /**
     * 获取角色关联的组织结构
     *
     * @param roleId
     * @return
     */
    Map<String, Object> getGlbOrganByRole(Long roleId);

    /**
     * 通过机构和岗位获取该岗位下的用户
     *
     * @param organId    机构id
     * @param postRoleId 岗位角色
     * @return 用户集合
     */
    List<Map<String, Object>> getUserListByPostRoleIdAndOrganId(Long organId, Long postRoleId);

    /**
     * 获取角色包含用户id列表
     *
     * @param roleId
     * @return
     */
    List<Long> getUserIdListByRole(Long roleId);

    /**
     * 分页查询可分配权限用户列表
     *
     * @param map
     * @return
     */
    FastPagination getUserAuthorityList(Map map);

    /**
     * 获取用户权限列表
     *
     * @param userId        被分配用户id
     * @param currentUserId 当前操作用户id
     * @return
     */
    List<Map<String, Object>> getUserAuthorityList(Long userId, Long currentUserId);

    List<Map<String, Object>> getUserOtherAuthorityList(Long userId, Long currentUserId);

    /**
     * 获取可分配角色分页列表
     *
     * @param map
     * @return
     */
    FastPagination getAuthorityRoleList(Map map);

    /**
     * 增加用户分配角色
     *
     * @param userId 用户id
     * @param roleId 角色id
     */
    void addUserAuthority(Long userId, Long roleId);

    /**
     * 去除用户分配角色
     *
     * @param userId 用户id
     * @param roleId 角色id
     */
    void removeUserAuthority(Long userId, Long roleId);

    /**
     * 获取组合角色
     *
     * @param map
     * @return
     */
    FastPagination getCombineRoleList(Map map);

    /**
     * 获取关联角色的用户信息
     *
     * @param roleId 角色id
     * @return
     */
    List<Map<String, Object>> getUserByRole(Long roleId);
}
