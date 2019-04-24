package net.ruixin.intercept;

import net.ruixin.util.shiro.ShiroKit;
import net.ruixin.util.http.HttpKit;
import org.apache.shiro.session.InvalidSessionException;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 验证session超时的拦截器
 */
public class SessionTimeoutInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler){
        String servletPath = getPath();
        if (isAjaxRequest(request)) {
            //ajax请求
            if (!"/loginVali".equals(servletPath) &&
                    !("/config/getBaseConfig".equals(servletPath) || "/main/getShiroUserInfo".equals(servletPath))
                    && ShiroKit.getSession().getAttribute("sessionFlag") == null) {
                ShiroKit.getSubject().logout();
                String message = "session timeout";
                if ("/global/notFound".equals(servletPath)) {
                    message = "ajax notfound";
                }
                if ("/global/error".equals(servletPath)) {
                    message = "ajax error";
                }
                throw new AjaxSessionTimeoutException(message);
            } else {
               return true;
            }
        } else {
            //页面请求
            if ("/login".equals(servletPath)
                    || "/loginVali".equals(servletPath)
                    || "/loginValiApp".equals(servletPath)
                    || "/main/aidAccess".equals(servletPath)

                    || servletPath.contains("/rwd")
                    || servletPath.contains("/cjrw")
                    || servletPath.contains("/form")
                    || servletPath.contains("/dynamicForm")
                    || servletPath.contains("/attachment")
                    || servletPath.contains("/dict")
                    || servletPath.contains("/gzl")
                    || "logoutApp".equals(servletPath)
                    || "/main/changePwd".equals(servletPath)


                    || "logout".equals(servletPath)
                    || "/global/notFound".equals(servletPath)
                    || "/global/error".equals(servletPath)
                    || "/global/sessionError".equals(servletPath)
                    || "/global/unauthorized".equals(servletPath)) {
                return true;
            } else {
                if (ShiroKit.getSession().getAttribute("sessionFlag") == null) {
                    ShiroKit.getSubject().logout();
                    throw new InvalidSessionException();
                } else {
                    return true;
                }
            }
        }
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) {

    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) {

    }

    private boolean isAjaxRequest(HttpServletRequest request) {
        return request.getHeader("x-requested-with") != null
                && "XMLHttpRequest".equalsIgnoreCase(request.getHeader("x-requested-with"));
    }

    private String getPath() {
        HttpServletRequest request = HttpKit.getRequest();
        String uri = request.getServletPath();
        String pathInfo = request.getPathInfo();
        if (pathInfo != null && pathInfo.length() > 0) {
            uri = uri + pathInfo;
        }
        return uri;
    }
}
