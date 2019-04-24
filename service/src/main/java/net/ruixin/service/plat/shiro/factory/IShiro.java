package net.ruixin.service.plat.shiro.factory;

import net.ruixin.domain.plat.organ.SysUser;
import net.ruixin.domain.plat.auth.ShiroUser;
import org.apache.shiro.authc.SimpleAuthenticationInfo;

import java.util.List;
import java.util.Set;

/**
 * 定义shirorealm所需数据的接口
 *
 */
public interface IShiro {

    /**
     * 根据账号获取登录用户
     *
     * @param account 账号
     */
    SysUser user(String account);


    /**
     * 根据身份证获取用户
     * @param sfz 身份证
     * @return
     */
    SysUser userBySFZ(String sfz);

    /**
     * 根据token获取用户
     * @param token 令牌
     * @return
     */
    SysUser userByToken(String token, String username);


    /**
     * 根据系统用户获取Shiro的用户
     *
     * @param user 系统用户
     */
    ShiroUser shiroUser(SysUser user);

    /**
     * 根据系统用户获取Shiro的用户——userInfo用户信息
     *
     * @param user 系统用户
     */
    void setShiroUserInfo(SysUser user, ShiroUser shiroUser);

    /**
     * 获取权限列表通过角色id
     *
     * @param roleId 角色id
     */
    List<String> findPermissionsByRoleId(Long roleId);

    /**
     * 根据角色id获取角色名称
     *
     * @param roleId 角色id
     */
    String findRoleNameByRoleId(Long roleId);

    /**
     * 获取shiro的认证信息
     */
    SimpleAuthenticationInfo info(ShiroUser shiroUser, SysUser user, String realmName);

    Set<String> findRoles(String appKey, String username);

    Set<String> findPermissions(String appKey, String username);
}
