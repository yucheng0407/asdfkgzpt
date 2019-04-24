package net.ruixin.controller;

import com.fasterxml.jackson.databind.JsonNode;
import net.ruixin.domain.constant.Const;
import net.ruixin.service.plat.log.LogManager;
import net.ruixin.service.plat.log.factory.LogTaskFactory;
import net.ruixin.service.plat.shiro.UsernamePasswordLoginType;
import net.ruixin.service.plat.shiro.jwt.JWTToken;
import net.ruixin.util.data.AjaxReturn;
import net.ruixin.util.json.JacksonUtil;
import net.ruixin.util.jwt.JWTUtil;
import net.ruixin.util.shiro.ShiroKit;
import net.ruixin.domain.plat.auth.ShiroUser;
import net.ruixin.util.cache.Cache;
import net.ruixin.util.cache.CacheKit;
import net.ruixin.util.tools.RxStringUtils;
import org.apache.shiro.authz.AuthorizationException;
import org.apache.shiro.subject.Subject;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

import static net.ruixin.util.http.HttpKit.getIp;

/**
 * 登录控制器
 */
@Controller
public class LoginController extends BaseController {

    /**
     * 跳转到平台主页
     */
    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String index(Model model) {
        //获取皮肤类型
        String skin = CacheKit.get(Cache.USER, "selectSkin");
        if (RxStringUtils.isEmpty(skin)) {
            skin = "default";
        }
        model.addAttribute("selectSkin", skin);
        model.addAttribute("username", Objects.requireNonNull(ShiroKit.getUser()).getName());
        return "/plat/main/indexMain";
    }

    /**
     * 跳转到子系统
     */
    @RequestMapping("/index")
    public String index() {
        return "/plat/main/index";
    }

    /**
     * 跳转子页
     */
    @RequestMapping("/leftMenu")
    public String leftMenu() {
        return "/plat/main/leftMenu";
    }

    /**
     * 跳转二级菜单页面（子系统）
     */
    @RequestMapping("/leftMenuToZxt")
    public String leftMenuToZxt() {
        return "/plat/main/leftMenuToZxt";
    }

    /**
     * Center
     */
    @RequestMapping("/center")
    public String center() {
        return "/plat/main/center";
    }

    /**
     * aidAccess
     */
    @RequestMapping("/main/aidAccess")
    public String aidAccess() {
        return "/plat/main/aidAccess";
    }

    /**
     * 跳转到登录页面
     */
    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public String login() {
        if (ShiroKit.isAuthenticated() || ShiroKit.getUser() != null) {
            return REDIRECT + "/";
        } else {
            return "login";
        }
    }

    /**
     * 点击登录执行的动作
     */
    @RequestMapping(value = "/loginVali", method = RequestMethod.POST)
    @ResponseBody
    public String loginVali() throws UnsupportedEncodingException {
        String loginName = super.getPara("username").trim();
        String password = super.getPara("password").trim();
        String loginType = super.getPara("loginType").trim();
//        String remember = super.getPara("remember");
        Subject currentUser = ShiroKit.getSubject();
        UsernamePasswordLoginType token = new UsernamePasswordLoginType(loginName, password, loginType);
//        if ("on".equals(remember)) {
//            token.setRememberMe(true);
//        } else {
//            token.setRememberMe(false);
//        }
        currentUser.login(token);
        ShiroUser shiroUser = ShiroKit.getUser();
        getSession().setAttribute(Const.USER_SESSION_KEY, shiroUser);
        super.getSession().setAttribute(Const.USER_LOGIN_NAME, Objects.requireNonNull(shiroUser).getAccount());
        super.getSession().setAttribute(Const.USER_NAME, shiroUser.getName());
        super.getSession().setAttribute(Const.USER_ID, shiroUser.getId());
        LogManager.me().executeLog(LogTaskFactory.loginLog(shiroUser, getIp()));
        addCookie("userName", URLEncoder.encode(shiroUser.getName(), "UTF-8"));
        String defaultOrganName = shiroUser.getDftDeptName() != null ? shiroUser.getDftDeptName() : "无机构用户";
        addCookie("organName", URLEncoder.encode(defaultOrganName, "UTF-8"));
        super.getSession().setAttribute("sessionFlag", true);
        return "SUCCESS";
    }

    /**
     * 移动端登录执行的动作
     */
    @RequestMapping(value = "/loginValiApp", method = RequestMethod.POST)
    @ResponseBody
    public AjaxReturn loginValiApp(String data) throws UnsupportedEncodingException{
        JsonNode json = JacksonUtil.getJsonNode(data);
        String loginName = json.get("username").asText();
        String password = json.get("password").asText();
        String loginType = json.get("loginType").asText();
        Subject currentUser = ShiroKit.getSubject();
        String token = JWTUtil.sign(loginName, password);
        JWTToken jwtToken = new JWTToken(token, loginType);
        try {
            currentUser.login(jwtToken);
        } catch (AuthorizationException e) {
            e.printStackTrace();
        }
        Map<String, Object> res = new HashMap<>();
        ShiroUser shiroUser = ShiroKit.getUser();
        res.put("token", token);
        res.put("user", shiroUser);
        return success().setData(res);
    }

    /**
     * App 用户名、密码登录
     */
    @RequestMapping(value = "/loginValiApp2", method = RequestMethod.POST)
    @ResponseBody
    public AjaxReturn loginValiApp2() {
        AjaxReturn aj = new AjaxReturn();
        String loginName = super.getPara("username").trim();
        String password = super.getPara("password").trim();
        String loginType = super.getPara("loginType").trim();
        Subject currentUser = ShiroKit.getSubject();
        String token = JWTUtil.sign(loginName, password);
        JWTToken jwtToken = new JWTToken(token, loginType);
        try {
            currentUser.login(jwtToken);
        } catch (AuthorizationException e) {
            e.printStackTrace();
        }
        Map<String, Object> res = new HashMap<>();
        res.put("token", token);
        res.put("user", ShiroKit.getUser());
        return aj.setSuccess(true).setData(res);
    }


    /**
     * Token登录
     */
    @RequestMapping(value = "/tokenVali")
    @ResponseBody
    public AjaxReturn tokenVali() throws UnsupportedEncodingException{
        AjaxReturn aj = new AjaxReturn();
        Map<String, Object> res = new HashMap<>();
        ShiroUser shiroUser = ShiroKit.getUser();
        res.put("token", super.refreshToken());
        res.put("user", shiroUser);
        return aj.setSuccess(true).setData(res);
    }


    /**
     * 退出登录
     */
    @RequestMapping(value = "/logout", method = RequestMethod.GET)
    public String logOut() {
        LogManager.me().executeLog(LogTaskFactory.exitLog(ShiroKit.getUser(), getIp()));
        ShiroKit.getSubject().logout();
        return REDIRECT + "login";
    }

    /**
     * App退出登录
     */
    @RequestMapping(value = "/logoutApp")
    public AjaxReturn logoutApp() {
        LogManager.me().executeLog(LogTaskFactory.exitLog(ShiroKit.getUser(), getIp()));
        ShiroKit.getSubject().logout();
        return success();
    }
}
