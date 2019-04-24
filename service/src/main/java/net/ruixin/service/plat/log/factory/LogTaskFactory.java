package net.ruixin.service.plat.log.factory;

import net.ruixin.domain.plat.auth.ShiroUser;
import net.ruixin.domain.plat.log.*;
import net.ruixin.service.plat.common.BaseService;
import net.ruixin.service.plat.log.LogManager;
import net.ruixin.util.shiro.ShiroKit;
import net.ruixin.util.spring.SpringContextHolder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.TimerTask;

public class LogTaskFactory {

    private static final Logger logger = LoggerFactory.getLogger(LogManager.class);
    private static final BaseService baseService = SpringContextHolder.getBean("baseService");

    /**
     * 登录成功日志
     */
    public static TimerTask loginLog(final ShiroUser user, final String ip) {
        return new TimerTask() {
            @Override
            public void run() {
                try {
                    LoginLog loginLog = LogFactory.createLoginLog(LogType.LOGIN, user, "登录成功", ip, LogSucceed.SUCCESS);
                    baseService.saveHibernate(loginLog);
                } catch (Exception e) {
                    logger.error("创建登录日志异常!", e);
                }
            }
        };
    }

    /**
     * 登录失败日志
     */
    public static TimerTask loginLog(final String username, final String msg, final String ip) {
        return new TimerTask() {
            @Override
            public void run() {
                LoginLog loginLog = LogFactory.createLoginLog(
                        LogType.LOGIN_FAIL, null, "账号:" + username + "," + msg, ip, LogSucceed.FAIL);
                try {
                    baseService.saveHibernate(loginLog);
                } catch (Exception e) {
                    logger.error("创建登录失败异常!", e);
                }
            }
        };
    }

    /**
     * 登出日志
     */
    public static TimerTask exitLog(final ShiroUser user, final String ip) {
        return new TimerTask() {
            @Override
            public void run() {
                LoginLog loginLog = LogFactory.createLoginLog(LogType.EXIT, user, "退出成功", ip, LogSucceed.SUCCESS);
                try {
                    baseService.saveHibernate(loginLog);
                } catch (Exception e) {
                    logger.error("创建退出日志异常!", e);
                }
            }
        };
    }

    /**
     * 业务日志
     */
    public static TimerTask bussinessLog(final ShiroUser user, final String bussinessName, final String clazzName, final String methodName, final String msg) {
        return new TimerTask() {
            @Override
            public void run() {
                OperationLog operationLog = LogFactory.createOperationLog(
                        LogType.BUSSINESS, user, bussinessName, clazzName, methodName, msg, LogSucceed.SUCCESS);
                try {
                    baseService.saveHibernate(operationLog);
                } catch (Exception e) {
                    logger.error("创建业务日志异常!", e);
                }
            }
        };
    }

    /**
     * 异常日志
     */
    public static TimerTask exceptionLog(final Exception exception) {
        return new TimerTask() {
            @Override
            public void run() {
//                String msg = ToolUtil.getExceptionMsg(exception);
                String msg = exception.getMessage();
                ExceptionLog exceptionLog = LogFactory.createExceptionLog(ShiroKit.getUser(),msg);
                try {
                    baseService.saveHibernate(exceptionLog);
                } catch (Exception e) {
                    logger.error("创建异常日志异常!", e);
                }
            }
        };
    }
}
