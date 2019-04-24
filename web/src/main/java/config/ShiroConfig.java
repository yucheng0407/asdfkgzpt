package config;

import net.ruixin.service.plat.shiro.*;
import net.ruixin.domain.constant.SysConst;
import net.ruixin.service.plat.shiro.jwt.JWTFilter;
import net.ruixin.service.plat.shiro.jwt.JWTRealm;
import org.apache.shiro.cache.CacheManager;
import org.apache.shiro.cache.ehcache.EhCacheManager;
import org.apache.shiro.codec.Base64;
import org.apache.shiro.realm.Realm;
import org.apache.shiro.session.mgt.SessionManager;
import org.apache.shiro.spring.LifecycleBeanPostProcessor;
import org.apache.shiro.spring.security.interceptor.AuthorizationAttributeSourceAdvisor;
import org.apache.shiro.spring.web.ShiroFilterFactoryBean;
import org.apache.shiro.web.mgt.CookieRememberMeManager;
import org.apache.shiro.web.mgt.DefaultWebSecurityManager;
import org.apache.shiro.web.servlet.Cookie;
import org.apache.shiro.web.servlet.ShiroHttpSession;
import org.apache.shiro.web.servlet.SimpleCookie;
import org.apache.shiro.web.session.mgt.DefaultWebSessionManager;
import org.springframework.beans.factory.config.MethodInvokingFactoryBean;
import org.springframework.cache.ehcache.EhCacheManagerFactoryBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.servlet.Filter;
import java.util.*;

/**
 * shiro权限管理的配置
 */
@Configuration
public class ShiroConfig {

    /**
     * 安全管理器
     */
    @SuppressWarnings("SpringJavaAutowiringInspection")
    @Bean
    public DefaultWebSecurityManager securityManager(CookieRememberMeManager rememberMeManager, CacheManager cacheShiroManager, SessionManager sessionManager) {
        DefaultWebSecurityManager securityManager = new DefaultWebSecurityManager();
//        securityManager.setRealm(this.shiroDbRealm());
//        List<Realm> realmList = new ArrayList<>();
//        realmList.add(this.shiroDbRealmByAccount());
//        realmList.add(this.shiroDbRealmBySfz());
        securityManager.setCacheManager(cacheShiroManager);
        securityManager.setRememberMeManager(rememberMeManager);
        securityManager.setSessionManager(sessionManager);
        securityManager.setAuthenticator(customizedModularRealmAuthenticator());
        return securityManager;
    }
    /**
     * 自定义认证器
     *
     * @return
     */
    @Bean
    public CustomizedModularRealmAuthenticator customizedModularRealmAuthenticator() {
        CustomizedModularRealmAuthenticator customizedAuthenticator = new CustomizedModularRealmAuthenticator();
        List<Realm> realmList = new ArrayList<>();
        realmList.add(this.shiroDbRealmByAccount());
        realmList.add(this.shiroDbRealmBySfz());
        customizedAuthenticator.setRealms(realmList);
        return customizedAuthenticator;
    }

    /**
     * session管理器(单机环境)
     */
    @Bean
    public DefaultWebSessionManager defaultWebSessionManager(CacheManager cacheShiroManager) {
        DefaultWebSessionManager sessionManager = new DefaultWebSessionManager();
        sessionManager.setCacheManager(cacheShiroManager);
//        sessionManager.setSessionValidationInterval(60 * 60 * 1000);
        sessionManager.setGlobalSessionTimeout(SysConst.SESSION_AGE);
//        sessionManager.setDeleteInvalidSessions(true);
        sessionManager.setSessionValidationSchedulerEnabled(true);
        sessionManager.setSessionIdUrlRewritingEnabled(false);
        Cookie cookie = new SimpleCookie(ShiroHttpSession.DEFAULT_SESSION_ID_NAME);
        cookie.setName("shiroCookie");
//        cookie.setHttpOnly(true);
        cookie.setMaxAge(SysConst.COOKIE_AGE);
        sessionManager.setSessionIdCookie(cookie);
        return sessionManager;
    }


    /**
     * 缓存管理器 使用Ehcache实现
     */
    @SuppressWarnings("SpringJavaAutowiringInspection")
    @Bean
    public CacheManager getCacheShiroManager(EhCacheManagerFactoryBean ehcache) {
        EhCacheManager ehCacheManager = new EhCacheManager();
        ehCacheManager.setCacheManager(ehcache.getObject());
        return ehCacheManager;
    }

    /**
     * 项目自定义的Realm
     */
    @Bean
    public ShiroDbRealm shiroDbRealm() {
        return new ShiroDbRealm();
    }

    /**
     * 项目自定义的Realm
     */
    @Bean
    public ShiroDbRealmAccount shiroDbRealmByAccount() {
        return new ShiroDbRealmAccount();
    }

    /**
     * 项目自定义的Realm2
     */
    @Bean
    public ShiroDbRealmBySfz shiroDbRealmBySfz() {
        return new ShiroDbRealmBySfz();
    }

    /**
     * JWT Realm
     */
    @Bean
    public JWTRealm jwtRealm(){
        return new JWTRealm();
    }

    /**
     * rememberMe管理器
     */
    @Bean
    public CookieRememberMeManager rememberMeManager(SimpleCookie rememberMeCookie) {
        CookieRememberMeManager manager = new CookieRememberMeManager();
        manager.setCipherKey(Base64.decode("Z3VucwAAAAAAAAAAAAAAAA=="));
        manager.setCookie(rememberMeCookie);
        return manager;
    }

    /**
     * 记住密码Cookie
     */
    @Bean
    public SimpleCookie rememberMeCookie() {
        SimpleCookie simpleCookie = new SimpleCookie("rememberMe");
//        simpleCookie.setHttpOnly(true);
        simpleCookie.setMaxAge(7 * 24 * 60 * 60);//7天
        return simpleCookie;
    }

    /**
     * Shiro的过滤器链
     */
    @Bean
    public ShiroFilterFactoryBean shiroFilter(DefaultWebSecurityManager securityManager) {
        ShiroFilterFactoryBean shiroFilter = new ShiroFilterFactoryBean();
        shiroFilter.setSecurityManager(securityManager);
        shiroFilter.setLoginUrl("/login");
        shiroFilter.setSuccessUrl("/");
        shiroFilter.setUnauthorizedUrl("/global/unauthorized");
        // 添加自定义过滤器
        Map<String, Filter> filterMap = new HashMap<>(1);
        filterMap.put("jwt", new JWTFilter());
        shiroFilter.setFilters(filterMap);
        //配置过滤连
        Map<String, String> hashMap = new LinkedHashMap<>();
        hashMap.put("/medias/**", "anon");
        hashMap.put("/main/aidAccess/**", "anon");
        hashMap.put("/login", "anon");
        hashMap.put("/loginVali", "anon");
        hashMap.put("/loginValiApp","anon");
        hashMap.put("/global/sessionError", "anon");
        hashMap.put("/config/getBaseConfig", "anon");
        hashMap.put("/main/getShiroUserInfo", "anon");
        hashMap.put("/attachment/**", "anon");
        hashMap.put("/**", "jwt,user");
//        hashMap.put("/dict/**", "anon");
//        hashMap.put("/rwd/**", "anon");
//        hashMap.put("/form/**", "anon");
//        hashMap.put("/dynamicForm/**", "anon");
//        hashMap.put("/attachment/**", "anon");
//        hashMap.put("/main/changePwd", "anon");
        shiroFilter.setFilterChainDefinitionMap(hashMap);
        return shiroFilter;
    }

    /**
     * 在方法中 注入 securityManager,进行代理控制
     */
    @Bean
    public MethodInvokingFactoryBean methodInvokingFactoryBean(DefaultWebSecurityManager securityManager) {
        MethodInvokingFactoryBean bean = new MethodInvokingFactoryBean();
        bean.setStaticMethod("org.apache.shiro.SecurityUtils.setSecurityManager");
        bean.setArguments(new Object[]{securityManager});
        return bean;
    }

    /**
     * Shiro生命周期处理器: 用于在实现了Initializable接口的Shiro bean初始化时调用Initializable接口回调(例如:UserRealm)
     * 在实现了Destroyable接口的Shiro bean销毁时调用 Destroyable接口回调(例如:DefaultSecurityManager)
     */
    @Bean
    public LifecycleBeanPostProcessor lifecycleBeanPostProcessor() {
        return new LifecycleBeanPostProcessor();
    }

    /**
     * 启用shrio授权注解拦截方式，AOP式方法级权限检查
     */
    @Bean
    public AuthorizationAttributeSourceAdvisor authorizationAttributeSourceAdvisor(DefaultWebSecurityManager securityManager) {
        AuthorizationAttributeSourceAdvisor authorizationAttributeSourceAdvisor =
                new AuthorizationAttributeSourceAdvisor();
        authorizationAttributeSourceAdvisor.setSecurityManager(securityManager);
        return authorizationAttributeSourceAdvisor;
    }

}
