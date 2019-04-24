package net.ruixin.domain.plat.auth;

public class AuthResult {
    /**
     * 是否有权限
     */
    private Boolean hasAuth = false;
    /**
     * 是否有全部权限
     */
    private Boolean hasAll = false;
    /**
     * 有哪些数据权限
     */
    private String oids = "";

    public AuthResult() {
        this.hasAuth = false;
        this.hasAll = false;
        this.oids = "";
    }

    public Boolean getHasAuth() {
        return hasAuth;
    }

    public void setHasAuth(Boolean hasAuth) {
        this.hasAuth = hasAuth;
    }

    public Boolean getHasAll() {
        return hasAll;
    }

    public void setHasAll(Boolean hasAll) {
        this.hasAll = hasAll;
    }

    public String getOids() {
        return oids;
    }

    public void setOids(String oids) {
        this.oids = oids;
    }
}
