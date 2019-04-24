package net.ruixin.service.plat.organ;

import net.ruixin.domain.plat.organ.SysUser;
import net.ruixin.service.plat.common.IBaseService;
import net.ruixin.util.paginate.FastPagination;

import java.util.List;
import java.util.Map;

/**
 * @author admin
 * @date 2016-8-17
 * 用户服务接口
 */
@SuppressWarnings("unused")
public interface IUserService extends IBaseService {

    /**
     * 查询用户列表
     *
     * @param map 查询条件
     * @return FastPagination
     */
    FastPagination getUserPageList(Map map);


    /**
     * 删除用户
     *
     * @param userId
     */
    void delUser(Long userId);

    /**
     * 保存用户信息
     *
     * @param sysUser 用户实体
     */
    void saveUser(SysUser sysUser);

    /**
     * 根据ID查询用户信息
     *
     * @param userId 用户ID
     * @return SysUser
     */
    SysUser getUserById(Long userId);

    /**
     * 根据机构ID查询用户List
     *
     * @param organId 机构ID
     * @return List
     */
    List<Map<String, Object>> getUserListByOrganId(Long organId);

    /**
     * 查询获取用户关联角色信息
     *
     * @param userId 用户id
     * @return Map
     */
    Map getUserGlxx(Long userId);

    /**
     * 获取无组织用户
     *
     * @param organId 组织id
     * @return List
     */
    List<Map<String, Object>> getWgwUserListByOrganId(Long organId);


    /**
     * 根据登录信息获取用户实体
     *
     * @param loginName 登录名
     * @param loginPwd  登录密码
     * @return SysUser
     */
    SysUser getUserByLoginInfo(String loginName, String loginPwd);

    /**
     * 根据用户信息获取用户角色信息
     *
     * @param user 用户信息
     * @return list
     */
    List<Map<String, Object>> getUserRoleInfo(SysUser user);

    /**
     * 修改用户密码
     *
     * @param newPwd 新密码
     * @param userId 用户id
     * @return ar
     */
    boolean changePwd(String newPwd, Long userId);

    /**
     * 根据登录信息获取用户实体
     *
     * @param loginName 登录名
     * @return SysUser
     */
    SysUser getUserByLoginName(String loginName);

    /**
     * 根据身份证获取用户实体
     *
     * @param sfz 登录名
     * @return SysUser
     */
    SysUser getUserBySFZ(String sfz);
    /**
     * 获取用户系统角色集合
     *
     * @param userId 用户id
     */
    List<Map<String, Object>> getUserSysRole(Long userId);

    /**
     * 根据用户ID获取用户机构岗位
     *
     * @param userId 用户id
     * @return
     */
    List<Map<String, Object>> getUserOrganPost(Long userId);

    /**
     * 封锁用户
     *
     * @param userId 用户ID
     */
    void blockUser(Long userId);

    /**
     * 解锁用户
     *
     * @param userId 用户ID
     */
    void unblockUser(Long userId);

    /**
     * 重置用户密码
     *
     * @param pwd     密码
     * @param userIds 用户ids
     */

    void resetPwd(String pwd, String userIds);

    /**
     * 获取没有关联过管理员的用户
     *
     * @param map
     * @return
     */
    FastPagination getNoAdminUserList(Map map);
}
