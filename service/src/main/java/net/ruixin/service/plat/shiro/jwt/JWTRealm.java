package net.ruixin.service.plat.shiro.jwt;

import net.ruixin.domain.plat.auth.ShiroUser;
import net.ruixin.domain.plat.organ.SysUser;
import net.ruixin.service.plat.shiro.factory.IShiro;
import net.ruixin.service.plat.shiro.factory.ShiroFactroy;
import net.ruixin.util.cache.Cache;
import net.ruixin.util.cache.CacheKit;
import net.ruixin.util.jwt.JWTUtil;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;

public class JWTRealm extends AuthorizingRealm {
    /**
     * 必须重写此方法，不然Shiro会报错
     */
    @Override
    public boolean supports(AuthenticationToken token) {
        return token instanceof JWTToken;
    }

    /**
     * 默认使用此方法进行用户名正确与否验证，错误抛出异常即可。
     */
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken auth) throws AuthenticationException {
        JWTToken jwtToken = (JWTToken) auth;
        String token = (String) jwtToken.getCredentials();
        //解密获得username
        String username = JWTUtil.getUsername(token);
        if (username == null) {
            throw new AuthenticationException("token invalid");
        }
        IShiro shiroFactory = ShiroFactroy.me();
        SysUser user = shiroFactory.userByToken(token, username);
        if (user == null) {
            throw new AuthenticationException("User didn't existed!");
        }
        if (!JWTUtil.verify(token, username, user.getLoginPwd())) {
            throw new AuthenticationException("Username or password error");
        }
        ShiroUser shiroUser = shiroFactory.shiroUser(user);
        return new SimpleAuthenticationInfo(shiroUser, token, getName());
    }

    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
        return new SimpleAuthorizationInfo();
    }
}
