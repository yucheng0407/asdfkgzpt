package net.ruixin.service.plat.shiro.jwt;

import org.apache.shiro.authc.AuthenticationToken;

public class JWTToken implements AuthenticationToken {
    private String token;

    private String loginType = "Token";

    public JWTToken(String token) {
        this.token = token;
    }

    public JWTToken(String token, String loginType) {
        this.token = token;
        this.loginType = loginType;
    }

    @Override
    public Object getPrincipal() {
        return token;
    }

    @Override
    public Object getCredentials() {
        return token;
    }

    public String getLoginType() {
        return loginType;
    }

    public void setLoginType(String loginType) {
        this.loginType = loginType;
    }
}
