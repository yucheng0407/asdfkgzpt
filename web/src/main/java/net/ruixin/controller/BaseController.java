package net.ruixin.controller;

import net.ruixin.domain.constant.Const;
import net.ruixin.domain.plat.auth.ShiroUser;
import net.ruixin.domain.plat.organ.SysUser;
import net.ruixin.service.plat.shiro.factory.IShiro;
import net.ruixin.service.plat.shiro.factory.ShiroFactroy;
import net.ruixin.util.cache.Cache;
import net.ruixin.util.cache.CacheKit;
import net.ruixin.util.jwt.JWTUtil;
import net.ruixin.util.shiro.ShiroKit;
import net.ruixin.domain.constant.SysConst;
import net.ruixin.util.data.AjaxReturn;
import net.ruixin.util.exception.BizExceptionEnum;
import net.ruixin.util.exception.BussinessException;
import net.ruixin.util.file.FileUtil;
import net.ruixin.util.http.HttpKit;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

public class BaseController {
    protected static final String REDIRECT = "redirect:";
    protected static final String FORWARD = "forward:";

    private static final Logger LOGGER = LoggerFactory.getLogger(BaseController.class);


    protected HttpServletRequest getHttpServletRequest() {
        return HttpKit.getRequest();
    }

    protected HttpServletResponse getHttpServletResponse() {
        return HttpKit.getResponse();
    }

    protected HttpSession getSession() {
        return HttpKit.getRequest().getSession();
    }

    protected HttpSession getSession(Boolean flag) {
        return HttpKit.getRequest().getSession(flag);
    }

    protected ShiroUser getShiroUser() {
        return ShiroKit.getUser();
    }

    protected Long getCurrentUserId() {
        return (Long) getSession().getAttribute(Const.USER_ID);
    }

    protected String getCurrentUserName() {
        return (String) getSession().getAttribute(Const.USER_NAME);
    }

    protected String getPara(String name) {
        return HttpKit.getRequest().getParameter(name);
    }

    protected void setAttr(String name, Object value) {
        HttpKit.getRequest().setAttribute(name, value);
    }

    protected void addCookie(String cookieName, String cookieValue) {
        Cookie temp = new Cookie(cookieName, cookieValue);
        temp.setMaxAge(SysConst.COOKIE_AGE);
        this.getHttpServletResponse().addCookie(temp);
    }

    protected void deleteCookieByName(String cookieName) {
        Cookie[] cookies = this.getHttpServletRequest().getCookies();
        for (Cookie cookie : cookies) {
            if (cookie.getName().equals(cookieName)) {
                Cookie temp = new Cookie(cookie.getName(), "");
                temp.setMaxAge(0);
                this.getHttpServletResponse().addCookie(temp);
            }
        }
    }

    protected ResponseEntity<byte[]> renderFile(String fileName, String filePath) {
        byte[] bytes = FileUtil.toByteArray(filePath);
        return renderFile(fileName, bytes);
    }

    protected ResponseEntity<byte[]> renderFile(String fileName, byte[] fileBytes) {
        String dfileName;
        try {
            dfileName = URLEncoder.encode(fileName, "utf-8");
        } catch (UnsupportedEncodingException e) {
            throw new BussinessException(BizExceptionEnum.File_CODING_ERROR, fileName);
        }
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        headers.setContentDispositionFormData("attachment", dfileName);
        return new ResponseEntity<>(fileBytes, headers, HttpStatus.OK);
    }

    protected AjaxReturn success() {
        return new AjaxReturn(true);
    }

    protected AjaxReturn error() {
        return new AjaxReturn(false);
    }

    protected void reInputStream(InputStream is, HttpServletResponse reponse, String type) throws Exception {
        if (is != null) {
            reponse.setContentType(type);
            ServletOutputStream out = null;
            try {
                out = reponse.getOutputStream();
                byte[] bs = new byte[1024];
                int n;
                while ((n = is.read(bs)) != -1) {
                    out.write(bs, 0, n);
                }
                out.flush();
            } catch (Exception e) {
                LOGGER.error("响应输出流异常", e);
            } finally {
                if (is != null) {
                    is.close();
                }
                if (out != null) {
                    out.close();
                }
            }
        }
    }

    /**
     * 刷新Token
     * @return 新Token
     */
    protected String refreshToken() {
        String token = this.getHttpServletRequest().getHeader("Authorization");
        //解密获得username
        String username = JWTUtil.getUsername(token);
        IShiro shiroFactory = ShiroFactroy.me();
        SysUser user = shiroFactory.userByToken(token, username);
        //生成新Token
        String refreshedToken = JWTUtil.sign(user.getLoginName(), user.getLoginPwd());
        //更新缓存信息
        CacheKit.put(Cache.TOKEN, refreshedToken, user, JWTUtil.EXPIRE_DAYS * 24 * 3600);
        CacheKit.put(Cache.TOKEN, token, user, 300);
        return refreshedToken;
    }

}
