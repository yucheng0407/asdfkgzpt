package net.ruixin.domain.constant;

/**
 * 系统常量，禁止开发人员修改
 */
public interface SysConst {

    long MILLIS_PER_SECOND = 1000;

    long MILLIS_PER_MINUTE = 60 * MILLIS_PER_SECOND;

    long MILLIS_PER_HOUR = 60 * MILLIS_PER_MINUTE;

    /**
     * 服务器Session生命周期
     */
    long SESSION_AGE = 12 * MILLIS_PER_HOUR;

    /**
     * Cookie生命周期
     */
    int COOKIE_AGE = 24 * 60 * 60;

}
