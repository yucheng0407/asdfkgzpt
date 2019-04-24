package net.ruixin.service.plat.shiro;

import net.ruixin.domain.plat.auth.ShiroUser;
import net.ruixin.domain.plat.organ.SysUser;
import net.ruixin.service.plat.shiro.factory.IShiro;
import net.ruixin.service.plat.shiro.factory.ShiroFactroy;
import net.ruixin.util.shiro.ShiroKit;
import org.apache.shiro.authc.*;
import org.apache.shiro.authc.credential.CredentialsMatcher;
import org.apache.shiro.authc.credential.HashedCredentialsMatcher;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;

public class ShiroDbRealm extends AuthorizingRealm {

    /**
     * 登录认证
     */
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authcToken)
            throws AuthenticationException {
        IShiro shiroFactory = ShiroFactroy.me();
        UsernamePasswordToken token = (UsernamePasswordToken) authcToken;
        //获取当前用户
        SysUser user = shiroFactory.user(token.getUsername());
        ShiroUser shiroUser = shiroFactory.shiroUser(user);
        return shiroFactory.info(shiroUser, user, super.getName());
    }

    /**
     * 权限认证
     */
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
//        IShiro shiroFactory = ShiroFactroy.me();
//        ShiroUser shiroUser = (ShiroUser) principals.getPrimaryPrincipal();

//        Set<String> permissionSet = new HashSet<>();
//        Set<String> roleNameSet = new HashSet<>();
//        List<Long> roleList = shiroUser.getRoleList();
//
//
//        for (Long roleId : roleList) {
//            List<String> permissions = shiroFactory.findPermissionsByRoleId(roleId);
//            if (permissions != null) {
//                for (String permission : permissions) {
//                    if (ToolUtil.isNotEmpty(permission)) {
//                        permissionSet.add(permission);
//                    }
//                }
//            }
//            String roleName = shiroFactory.findRoleNameByRoleId(roleId);
//            roleNameSet.add(roleName);
//        }

        //        info.addStringPermissions(permissionSet);
//        info.addRoles(roleNameSet);
        return new SimpleAuthorizationInfo();
    }

    /**
     * 设置认证加密方式
     */
    @Override
    public void setCredentialsMatcher(CredentialsMatcher credentialsMatcher) {
        HashedCredentialsMatcher md5CredentialsMatcher = new HashedCredentialsMatcher();
        md5CredentialsMatcher.setHashAlgorithmName(ShiroKit.hashAlgorithmName);
        md5CredentialsMatcher.setHashIterations(ShiroKit.hashIterations);
        super.setCredentialsMatcher(md5CredentialsMatcher);
    }
}
