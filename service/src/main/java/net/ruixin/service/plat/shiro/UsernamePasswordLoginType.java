package net.ruixin.service.plat.shiro;

import org.apache.shiro.authc.UsernamePasswordToken;

public class UsernamePasswordLoginType extends UsernamePasswordToken {
    /**
     *登陆类型
     */
    private String loginType;

    public UsernamePasswordLoginType(String username, String password, String loginType) {
        super(username, password);
        this.loginType = loginType;
    }

    public String getLoginType() {
        return loginType;
    }

    public void setLoginType(String loginType) {
        this.loginType = loginType;
    }
}
