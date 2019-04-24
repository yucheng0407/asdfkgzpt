package net.ruixin.util.shiro;

import net.ruixin.domain.constant.Const;
import net.ruixin.domain.plat.auth.ShiroUser;
import net.ruixin.enumerate.plat.ShiroQueryKey;
import net.ruixin.util.support.ToolUtil;
import net.ruixin.util.tools.RxStringUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.crypto.hash.Md5Hash;
import org.apache.shiro.crypto.hash.SimpleHash;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.util.ByteSource;

import java.util.*;

/**
 * shiro工具类
 */
@SuppressWarnings("unchecked")
public class ShiroKit {

    private static final String NAMES_DELIMETER = ",";

    /**
     * 加盐参数
     */
    public final static String hashAlgorithmName = "MD5";

    /**
     * 循环次数
     */
    public final static int hashIterations = 1024;

    /**
     * shiro密码加密工具类
     *
     * @param credentials 密码
     * @param saltSource  密码盐
     * @return
     */
    public static String md5(String credentials, String saltSource) {
        ByteSource salt = new Md5Hash(saltSource);
        return new SimpleHash(hashAlgorithmName, credentials, salt, hashIterations).toString();
    }

    public static String md5Nosalt(String credentials) {
        return new SimpleHash(hashAlgorithmName, credentials, null, hashIterations).toString();
    }

    /**
     * 获取随机盐值
     *
     * @param length
     * @return
     */
    public static String getRandomSalt(int length) {
        return ToolUtil.getRandomString(length);
    }

    /**
     * 获取当前 Subject
     *
     * @return Subject
     */
    public static Subject getSubject() {
        return SecurityUtils.getSubject();
    }

    /**
     * 获取封装的 ShiroUser
     *
     * @return ShiroUser
     */
    public static ShiroUser getUser() {
        if (isGuest()) {
            return null;
        } else {
            return (ShiroUser) getSubject().getPrincipals().getPrimaryPrincipal();
        }
    }

    /**
     * 从shiro获取session
     */
    public static Session getSession() {
        return getSubject().getSession();
    }

    /**
     * 获取shiro指定的sessionKey
     *
     * @param key session中属性标志
     */
    @SuppressWarnings("unchecked")
    public static <T> T getSessionAttr(String key) {
        Session session = getSession();
        return session != null ? (T) session.getAttribute(key) : null;
    }

    /**
     * 设置shiro指定的sessionKey
     *
     * @param key   session中属性标志
     * @param value session中属性值
     */
    public static void setSessionAttr(String key, Object value) {
        Session session = getSession();
        session.setAttribute(key, value);
    }

    /**
     * 移除shiro指定的sessionKey
     *
     * @param key session中属性标志
     */
    public static void removeSessionAttr(String key) {
        Session session = getSession();
        if (session != null) {
            session.removeAttribute(key);
        }
    }

    /**
     * 已认证通过的用户。不包含已记住的用户，这是与user标签的区别所在。与notAuthenticated搭配使用
     *
     * @return 通过身份验证：true，否则false
     */
    public static boolean isAuthenticated() {
        return getSubject() != null && getSubject().isAuthenticated();
    }

    /**
     * 未认证通过用户，与authenticated标签相对应。与guest标签的区别是，该标签包含已记住用户。。
     *
     * @return 没有通过身份验证：true，否则false
     */
    public static boolean notAuthenticated() {
        return !isAuthenticated();
    }

    /**
     * 认证通过或已记住的用户。与guset搭配使用。
     *
     * @return 用户：true，否则 false
     */
    public static boolean isUser() {
        return getSubject() != null && getSubject().getPrincipal() != null;
    }

    /**
     * 验证当前用户是否为“访客”，即未认证（包含未记住）的用户。用user搭配使用
     *
     * @return 访客：true，否则false
     */
    public static boolean isGuest() {
        return !isUser();
    }

    /**
     * 判断当前用户角色级别
     */
    public static int getRoleLevel() {
        return Objects.requireNonNull(ShiroKit.getUser()).getRoleLevel();
    }

    /**
     * 当前用户角色级别的角色id
     */
    public static Long getLevelRoleId() {
        return Objects.requireNonNull(ShiroKit.getUser()).getRoleLevelId();
    }

    /**
     * 判断当前用户是否是超级管理员
     */
    public static boolean isPlatAdmin() {
        return Objects.requireNonNull(ShiroKit.getUser()).getRoleLevel() == 1;
    }

    /**
     * 判断当前用户是否是系统管理员
     */
    public static boolean isSysAdmin() {
        return Objects.requireNonNull(ShiroKit.getUser()).getRoleLevel() == 2;
    }

    /**
     * 获取用户角色ids
     *
     * @return String 用户角色ids
     */
    public static String getUserRoleIds() {
        StringBuilder roleIds = new StringBuilder();
        for (Map map : Objects.requireNonNull(getUser()).getRoleList()) {
            roleIds.append(roleIds.length() == 0 ? "" : NAMES_DELIMETER).append(map.get("id").toString());
        }
        return roleIds.toString();
    }

    /**
     * 获取用户资源
     *
     * @param type     资源类型
     * @param queryKey 查询标志
     * @param param    查询参数（逗号隔开）
     * @return List<Map> 类型资源列表
     */
    public static List<Map> getUserResource(String type, ShiroQueryKey queryKey, String param) {
        if (null == type) {
            return new ArrayList<>();
        }
        List<Map> resourceList = Objects.requireNonNull(ShiroKit.getUser()).getResourceMap().get(type);
        if (RxStringUtils.isNotEmpty(param)) {
            List params = Arrays.asList(param.split(NAMES_DELIMETER));
            List<Map> resultList = new ArrayList<>();
            String queryName = null != queryKey ? "parent" + RxStringUtils.toUpperCaseFirstOne(queryKey.name) : "";
            for (Map map : resourceList) {
                if (RxStringUtils.isEmpty(queryName)
                        || (null != map.get(queryName) && params.contains(map.get(queryName).toString()))) {
                    resultList.add(map);
                }
            }
            return resultList;
        } else {
            return resourceList;
        }
    }

    /**
     * 获取用户子系统资源
     *
     * @param type       资源类型
     * @param zxtCode    子系统代码
     * @param parentCode 父系统代码
     * @return List<Map> 类型资源列表
     */
    public static List<Map> getUserZxtResource(String type, String zxtCode, String parentCode) {
        if (null == type) {
            return new ArrayList<>();
        }
        List<Map> resourceList = Objects.requireNonNull(ShiroKit.getUser()).getResourceMap().get(type);
        List<Map> resultList = new ArrayList<>();
        for (Map map : resourceList) {
            if (parentCode.equals(map.get("parentCode").toString()) && zxtCode.equals(map.get("code").toString())) {
                resultList.add(map);
            }
        }
        return resultList;
    }

    /**
     * 获取用户资源ids
     *
     * @param type     资源类型
     * @param queryKey 查询标志
     * @param param    查询参数（逗号隔开）
     * @return String 类型资源ids
     */
    public static String getUserResourceIds(String type, ShiroQueryKey queryKey, String param) {
        StringBuilder resultIds = new StringBuilder();
        if (null == type) {
            return "";
        }
        List<Map> resourceList = getUserResource(type, queryKey, param);
        for (Map map : resourceList) {
            resultIds.append(resultIds.length() == 0 ? "" : NAMES_DELIMETER).append(Const.RES_TYPE_MENU.equals(type) ? map.get("ID").toString() : map.get("id").toString());
        }

        return resultIds.toString();
    }

    /**
     * 验证当前用户是否属于以下任意一个角色
     *
     * @param queryKey 查询标志
     * @param param    查询参数（逗号隔开）
     * @return 属于:true,否则false
     */
    public static boolean hasAnyRoles(ShiroQueryKey queryKey, String param) {
        boolean hasAnyRole = false;
        if (null == param) {
            return hasAnyRole;
        }
        List<Map<String, Object>> roleList = Objects.requireNonNull(getUser()).getRoleList();
        List params = Arrays.asList(param.split(NAMES_DELIMETER));
        String queryName = null != queryKey ? queryKey.name : "";
        for (Map map : roleList) {
            if (null != map.get(queryName) && params.contains(map.get(queryName).toString())) {
                hasAnyRole = true;
                break;
            }
        }
        return hasAnyRole;
    }

    /**
     * 验证当前用户是否属于以下全部角色
     *
     * @param queryKey 查询标志
     * @param param    查询参数（逗号隔开）
     * @return 属于:true,否则false
     */
    public static boolean hasAllRoles(ShiroQueryKey queryKey, String param) {
        boolean hasAnyRole = true;
        if (null == param) {
            return false;
        }
        List<Map<String, Object>> roleList = Objects.requireNonNull(getUser()).getRoleList();
        String[] params = param.split(NAMES_DELIMETER);
        String queryName = null != queryKey ? queryKey.name : "";
        for (String str : params) {
            boolean hasStr = false;
            for (Map map : roleList) {
                if (null != map.get(queryName) && str.equals(map.get(queryName).toString())) {
                    hasStr = true;
                    break;
                }
            }
            if (!hasStr) {
                hasAnyRole = false;
                break;
            }
        }
        return hasAnyRole;
    }

    /**
     * 验证当前用户是否属于以下任意一个部门
     *
     * @param queryKey 查询标志
     * @param param    查询参数（逗号隔开）
     * @return 属于:true,否则false
     */
    public static boolean inAnyOrgans(ShiroQueryKey queryKey, String param) {
        boolean inAnyOrgans = false;
        if (null == param) {
            return inAnyOrgans;
        }
        List<Map<String, Object>> organList = Objects.requireNonNull(getUser()).getDeptList();
        List params = Arrays.asList(param.split(NAMES_DELIMETER));
        String queryName = null != queryKey ? "organ" + RxStringUtils.toUpperCaseFirstOne(queryKey.name) : "";
        for (Map map : organList) {
            if (null != map.get(queryName) && params.contains(map.get(queryName).toString())) {
                inAnyOrgans = true;
                break;
            }
        }
        return inAnyOrgans;
    }

    /**
     * 验证当前用户是否属于以下全部部门
     *
     * @param queryKey 查询标志
     * @param param    查询参数（逗号隔开）
     * @return 属于:true,否则false
     */
    public static boolean inAllOrgans(ShiroQueryKey queryKey, String param) {
        boolean inAllOrgans = true;
        if (null == param) {
            return false;
        }
        List<Map<String, Object>> organList = Objects.requireNonNull(getUser()).getDeptList();
        String[] params = param.split(NAMES_DELIMETER);
        String queryName = null != queryKey ? "organ" + RxStringUtils.toUpperCaseFirstOne(queryKey.name) : "";
        for (String str : params) {
            boolean hasStr = false;
            for (Map map : organList) {
                if (null != map.get(queryName) && str.equals(map.get(queryName).toString())) {
                    hasStr = true;
                    break;
                }
            }
            if (!hasStr) {
                inAllOrgans = false;
                break;
            }
        }
        return inAllOrgans;
    }

    /**
     * 验证当前用户是否拥有以下任意一个资源
     *
     * @param queryKey 查询标志
     * @param param    查询参数（逗号隔开）
     * @return 属于:true,否则false
     */
    public static boolean hasAnyResources(String type, ShiroQueryKey queryKey, String param) {
        boolean hasAnyResources = false;
        if (RxStringUtils.isEmpty(type) || null == param) {
            return hasAnyResources;
        }
        List<Map<String, Object>> resourceList = Objects.requireNonNull(getUser()).getResourceMap().get(type);
        if (null == resourceList) {
            return hasAnyResources;
        }
        List params = Arrays.asList(param.split(NAMES_DELIMETER));
        String queryName = null != queryKey ? queryKey.name : "";
        for (Map map : resourceList) {
            if (null != map.get(queryName) && params.contains(map.get(queryName).toString())) {
                hasAnyResources = true;
                break;
            }
        }
        return hasAnyResources;
    }

    /**
     * 验证当前用户是否拥有以下全部资源
     *
     * @param queryKey 查询标志
     * @param param    查询参数（逗号隔开）
     * @return 属于:true,否则false
     */
    public static boolean hasAllResources(String type, ShiroQueryKey queryKey, String param) {
        boolean hasAllResources = true;
        if (RxStringUtils.isEmpty(type) || null == param) {
            return false;
        }
        List<Map<String, Object>> resourceList = Objects.requireNonNull(getUser()).getResourceMap().get(type);
        String[] params = param.split(NAMES_DELIMETER);
        String queryName = null != queryKey ? queryKey.name : "";
        for (String str : params) {
            boolean hasStr = false;
            for (Map map : resourceList) {
                if (null != map.get(queryName) && str.equals(map.get(queryName).toString())) {
                    hasStr = true;
                    break;
                }
            }
            if (!hasStr) {
                hasAllResources = false;
                break;
            }
        }
        return hasAllResources;
    }
}
