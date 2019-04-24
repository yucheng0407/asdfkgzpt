package net.ruixin.service.plat.shiro;

import net.ruixin.service.plat.shiro.jwt.JWTRealm;
import net.ruixin.service.plat.shiro.jwt.JWTToken;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.pam.ModularRealmAuthenticator;
import org.apache.shiro.realm.Realm;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.Collection;

public class CustomizedModularRealmAuthenticator extends ModularRealmAuthenticator {
    @Autowired
    private JWTRealm jwtRealm;

    @Override
    protected AuthenticationInfo doAuthenticate(AuthenticationToken authenticationToken)
            throws AuthenticationException {
        // 判断getRealms()是否返回为空
        assertRealmsConfigured();
        // 对应的Realm
        Collection<Realm> typeRealms = new ArrayList<>();
        if (authenticationToken instanceof JWTToken) {
            typeRealms.add(jwtRealm);
        } else {
            // 所有Realm
            Collection<Realm> realms = getRealms();
            // 强制转换回自定义的CustomizedToken
            UsernamePasswordLoginType customizedToken = (UsernamePasswordLoginType) authenticationToken;
            // 登录类型
            String loginType = customizedToken.getLoginType();
            for (Realm realm : realms) {
                if (realm.getName().contains(loginType))
                    typeRealms.add(realm);
            }
        }
        // 判断是单Realm还是多Realm
        if (typeRealms.size() == 1) {
            return doSingleRealmAuthentication(typeRealms.iterator().next(), authenticationToken);
        } else {
            return doMultiRealmAuthentication(typeRealms, authenticationToken);
        }
    }

}
