package net.ruixin.service.plat.auth;

import net.ruixin.domain.plat.auth.SysGlbRoleAuthRule;
import net.ruixin.domain.plat.auth.SysRole;
import net.ruixin.service.plat.common.IBaseService;
import net.ruixin.util.data.AjaxReturn;
import net.ruixin.util.paginate.FastPagination;

import java.util.List;
import java.util.Map;

/**
 * Created by admin on 2016-8-24.
 * 角色服务接口
 */
public interface IRoleService extends IBaseService {
    /**
     * 根据ID查询角色信息
     *
     * @param id 角色ID
     * @return 角色实体
     */
    SysRole getRoleById(Long id);

    /**
     * 根据角色ID查询关联对象信息
     *
     * @param roleIds 角色ID,逗号拼接的ID字符串
     * @return List
     */
    List getRoleGlDataList(String roleIds);

    /**
     * 保存角色信息
     *
     * @param sysRole   角色信息
     * @param clearFlag 是否清除流程角色的关联数据
     */
    void saveRole(SysRole sysRole, Boolean clearFlag);

    /**
     * 查询角色列表
     *
     * @param map 查询条件
     * @return FastPagination
     */
    FastPagination getRoleList(Map map);

    /**
     * 删除角色信息
     *
     * @param roleId 角色ID
     */
    void deleteRole(Long roleId);

    /**
     * 根据角色id查询工作流name
     *
     * @param roleId 角色ID
     * @return AjaxReturn
     */
    AjaxReturn getWFNameByRoleId(Long roleId);

    /**
     * 通过关联id获取关联角色
     *
     * @param map organIds postIds 关联类型  3：用户  1：岗位  2：机构
     * @return List
     */
    List<Map<String, Object>> getRoleByGlxx(Map map);

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
     * 获取角色关联用户
     *
     * @param map    查询条件
     * @param roleId 角色id
     * @return FastPagination
     */
    FastPagination getRoleGlbUser(Map map, Long roleId);

    /**
     * 根据角色id获取角色关联信息
     *
     * @param roleId 角色id
     * @param type   使用类型 “relate”/"show"
     */
    Map<String, Object> getGlxxByRole(Long roleId, String type);

    void saveRoleGlxx(Object[] params);

    /**
     * 根据角色id获取角色关联动态规则
     *
     * @param roleId 角色id
     */
    List<Map<String, Object>> getRuleByRole(Long roleId);

    void saveRoleRule(List<SysGlbRoleAuthRule> list);

    List<Map<String, Object>> getRoleListByEleId(Long eleId, String gl_type);


    FastPagination getSelectRole(Map map);

    /**
     * 获取角色关联的组织结构
     *
     * @param roleId 角色ID
     * @return map结构树
     */
    Map<String, Object> getGlbOrganByRole(Long roleId);

    /**
     * 分页查询可授权用户列表
     *
     * @param map
     * @return
     */
    FastPagination getUserAuthorityList(Map map);

    /**
     * 获取用户的被授权信息
     *
     * @param userId        被授权用户
     * @param currentUserId 当前操作用户
     * @return
     */
    Map<String, Object> getUserAuthorityInfo(Long userId, Long currentUserId);

    /**
     * 获取可分配权限角色列表
     *
     * @param map
     * @return
     */
    FastPagination getAuthorityRoleList(Map map);

    /**
     * 保存用户授权信息
     *
     * @param userId
     * @param addIds
     * @param delIds
     */
    void saveUserAuthority(Long userId, String addIds, String delIds);

    /**
     * 获取当前登录人管理员角色下的组合角色（非主动组合）
     */
    FastPagination getRoleListByRole(Map map);

    /**
     * 获取角色下关联的用户
     *
     * @param roleId 角色id
     * @return
     */
    List<Map<String, Object>> getGlUserByRole(Long roleId);
}
