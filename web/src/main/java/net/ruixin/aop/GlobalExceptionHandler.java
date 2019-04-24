package net.ruixin.aop;

import net.ruixin.intercept.AjaxSessionTimeoutException;
import net.ruixin.service.plat.log.LogManager;
import net.ruixin.service.plat.log.factory.LogTaskFactory;
import net.ruixin.util.data.AjaxReturn;
import net.ruixin.util.exception.BussinessException;
import net.ruixin.util.exception.UnauthorizedException;
import net.ruixin.util.exception.UploadException;
import net.ruixin.util.http.HttpKit;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.CredentialsException;
import org.apache.shiro.authc.DisabledAccountException;
import org.apache.shiro.session.InvalidSessionException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@ControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    /**
     * 附件异常拦截
     */
    @ExceptionHandler(UploadException.class)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public String uploadExHandler(UploadException e) {
        LogManager.me().executeLog(LogTaskFactory.exceptionLog(e));
        HttpKit.getRequest().setAttribute("tip", e.getFriendlyMsg());
        log.error("附件异常:", e);
        return "{'err':'上传失败，失败原因：" + e.getFriendlyMsg() + "'}";
    }

    /**
     * 业务异常拦截
     */
    @ExceptionHandler(BussinessException.class)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public AjaxReturn bizExHandler(BussinessException e) {
        LogManager.me().executeLog(LogTaskFactory.exceptionLog(e));
        HttpKit.getRequest().setAttribute("tip", e.getFriendlyMsg());
        log.error("业务异常:", e);
        return new AjaxReturn(false, e.getFriendlyMsg());
    }


    /**
     * 账号密码错误
     */
    @ExceptionHandler(CredentialsException.class)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public String credentials(CredentialsException e, Model model) {
        String username = HttpKit.getRequest().getParameter("username");
        LogManager.me().executeLog(LogTaskFactory.loginLog(username, "账号密码错误", HttpKit.getIp()));
        return "*账号密码错误";
    }

    /**
     * 用户未登录
     */
    @ExceptionHandler(AuthenticationException.class)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public String unAuth(AuthenticationException e, Model model) {
        log.error("用户未登陆：", e);
        return "登录异常请联系管理员";
    }

    /**
     * 账号被锁定
     */
    @ExceptionHandler(DisabledAccountException.class)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public String accountLocked(DisabledAccountException e, Model model) {
        String username = HttpKit.getRequest().getParameter("username");
        LogManager.me().executeLog(LogTaskFactory.loginLog(username, "账号锁定，请联系管理员", HttpKit.getIp()));
        return "账号锁定，请联系管理员";
    }

    /**
     * 权限异常
     */
    @ExceptionHandler(UnauthorizedException.class)
    @ResponseStatus(HttpStatus.OK)
    public String credentials(UnauthorizedException e) {
        LogManager.me().executeLog(LogTaskFactory.exceptionLog(e));
        HttpKit.getRequest().setAttribute("tip", "权限异常");
        log.error("权限异常!", e);
        return "401";
    }

    /**
     * session失效的异常拦截
     */
    @ExceptionHandler(InvalidSessionException.class)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public String sessionTimeout(InvalidSessionException e, Model model, HttpServletRequest request, HttpServletResponse response) {
        assertAjax(response);
        return "session超时,请重新登录";
    }

    /**
     * ajax session失效的异常拦截
     */
    @ExceptionHandler(AjaxSessionTimeoutException.class)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public String ajaxsessionTimeout(AjaxSessionTimeoutException e) {
        return e.getMessage();
    }

    /**
     * 拦截未知的运行时异常
     */
    @ExceptionHandler(RuntimeException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public String notFount(RuntimeException e) {
        LogManager.me().executeLog(LogTaskFactory.exceptionLog(e));
        HttpKit.getRequest().setAttribute("tip", "服务器未知运行时异常");
        log.error("运行时异常:", e);
        return "500";
    }

    private void assertAjax(HttpServletResponse response) {
        if (isAjaxRequest()) {
            //如果是ajax请求响应头会有，x-requested-with
            response.setHeader("sessionstatus", "timeout");//在响应头设置session状态
        }
    }

    private boolean isAjaxRequest() {
        HttpServletRequest request = HttpKit.getRequest();
        return request.getHeader("x-requested-with") != null
                && "XMLHttpRequest".equalsIgnoreCase(request.getHeader("x-requested-with"));
    }
}
