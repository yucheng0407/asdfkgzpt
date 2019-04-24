package net.ruixin.service.plat.log.factory;

import net.ruixin.domain.plat.auth.ShiroUser;
import net.ruixin.domain.plat.log.*;

import java.util.Date;

/**
 * 日志对象创建工厂
 */
public class LogFactory {
    /**
     * 创建登录日志
     */
    public static LoginLog createLoginLog(LogType logType, ShiroUser user, String msg, String ip, LogSucceed result) {
        LoginLog loginLog = new LoginLog();
        loginLog.setLogName(logType.getMessage());
        loginLog.setIp(ip);
        loginLog.setLoginTime(new Date());
        loginLog.setMessage(msg);
        loginLog.setSuccess(result.getMessage());
        if (user != null) {
            loginLog.setUserId(user.getId());
            loginLog.setUserName(user.getName());
        }
        return loginLog;
    }

    /**
     * 创建异常日志
     */
    public static ExceptionLog createExceptionLog(ShiroUser user, String msg) {
        ExceptionLog exceptionLog = new ExceptionLog();
        exceptionLog.setUserId(user.getId());
        exceptionLog.setUserName(user.getName());
        exceptionLog.setMessage(msg);
        exceptionLog.setCreateTime(new Date());
        return exceptionLog;
    }

    /**
     * 创建操作日志
     */
    public static OperationLog createOperationLog(LogType logType, ShiroUser user, String bussinessName, String clazzName, String methodName, String msg, LogSucceed succeed) {
        OperationLog operationLog = new OperationLog();
        operationLog.setLogType(logType.getMessage());
        operationLog.setLogName(bussinessName);
        operationLog.setUserId(user.getId());
        operationLog.setUserName(user.getName());
        operationLog.setClassName(clazzName);
        operationLog.setMethod(methodName);
        operationLog.setCreateTime(new Date());
        operationLog.setSuccess(succeed.getMessage());
        operationLog.setMessage(msg);
        return operationLog;
    }
}
