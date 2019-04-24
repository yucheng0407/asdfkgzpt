package net.ruixin.intercept;

import net.ruixin.domain.constant.Const;
import net.ruixin.util.shiro.ShiroKit;
import net.ruixin.util.cache.Cache;
import net.ruixin.util.cache.CacheKit;
import net.ruixin.util.exception.BizExceptionEnum;
import net.ruixin.util.exception.BussinessException;
import net.ruixin.util.exception.UnauthorizedException;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;
import java.util.Objects;

public class AuthInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        boolean hasAuth = true;
        String uri = request.getServletPath();
        String pathInfo = request.getPathInfo();
        if (pathInfo != null && pathInfo.length() > 0) {
            uri = uri + pathInfo;
        }
        //是否平台管理员
        if (ShiroKit.getUser() != null && Objects.requireNonNull(ShiroKit.getUser()).getRoleLevel() != Const.ROLE_LEVEL_PLATADMIN) {
            Map<String, Object> resUrl = CacheKit.get(Cache.CONSTANT, "RESOURCE");
            //非空再进行拦截，否则放行
            if (resUrl != null) {
                Boolean isRes = (Boolean) resUrl.get(uri);
                //判断是否是需要拦截的url，不是放行
                if (isRes != null && isRes) {
                    //判断是否拥有权限
                    Map<String, Object> resourceUrl = Objects.requireNonNull(ShiroKit.getUser()).getResourceUrl();
                    if (resourceUrl != null) {
                        Boolean hasRes = (Boolean) resourceUrl.get(uri);
                        if (hasRes == null) {
                            hasAuth = false;
                        }
                    } else {
                        hasAuth = false;
                    }
                }
            }
        }
        if (!hasAuth) {
            if (request.getHeader("x-requested-with") != null
                    && "XMLHttpRequest".equalsIgnoreCase(request.getHeader("x-requested-with"))) {
                throw new BussinessException(BizExceptionEnum.NO_PERMITION, uri);
            } else {
                throw new UnauthorizedException(" 没有访问权限：" + uri);
            }
        }
        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) {

    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) {

    }
}
