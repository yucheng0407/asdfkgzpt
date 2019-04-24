package net.ruixin.service.plat.shiro.factory;

import net.ruixin.domain.constant.Const;
import net.ruixin.domain.plat.auth.ShiroUser;
import net.ruixin.domain.plat.organ.SysUser;
import net.ruixin.service.plat.organ.IUserService;
import net.ruixin.service.plat.resource.IResourceService;
import net.ruixin.util.jwt.JWTUtil;
import net.ruixin.util.shiro.ShiroKit;
import net.ruixin.util.cache.Cache;
import net.ruixin.util.cache.CacheKit;
import net.ruixin.util.spring.SpringContextHolder;
import org.apache.shiro.authc.CredentialsException;
import org.apache.shiro.authc.LockedAccountException;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.DependsOn;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;

/**
 * @author Administrator
 */
@Service
@DependsOn("springContextHolder")
@Transactional(readOnly = true)
public class ShiroFactroy implements IShiro {

    @Autowired
    private IUserService userService;

    @Autowired
    private IResourceService resourceService;

    public static IShiro me() {
        return SpringContextHolder.getBean(IShiro.class);
    }

    @Override
    public SysUser user(String account) {
        SysUser user = userService.getUserByLoginName(account);
        // 账号不存在
        if (null == user) {
            throw new CredentialsException();
        }
        // 账号被锁定
        if (!Objects.equals(user.getIsBlocked(), "0")) {
            throw new LockedAccountException();
        }
        return user;
    }

    @Override
    public SysUser userBySFZ(String sfz) {
        SysUser user = userService.getUserBySFZ(sfz);
        // 账号不存在
        if (null == user) {
            throw new CredentialsException();
        }
        // 账号被锁定
        if (!Objects.equals(user.getIsBlocked(), "0")) {
            throw new LockedAccountException();
        }
        return user;
    }

    @Override
    public SysUser userByToken(String token, String username) {
        Object cacheUser = CacheKit.get(Cache.TOKEN, token);
        if (cacheUser == null) {
            //缓存数据不存在，db查询
            SysUser user = userService.getUserByLoginName(username);
            if (user == null) {
                throw new CredentialsException();
            } else {
                CacheKit.put(Cache.TOKEN, token, user, JWTUtil.EXPIRE_DAYS * 24 * 3600);
            }
            return user;
        } else {
            return (SysUser) cacheUser;
        }
    }

    @Override
    public ShiroUser shiroUser(SysUser user) {
        ShiroUser shiroUser = new ShiroUser();

        //Step1.用户信息装载
        shiroUser.setId(user.getId());            // 账号id
        shiroUser.setAccount(user.getLoginName());// 账号
        shiroUser.setName(user.getUserName());        // 用户名称
        shiroUser.setDftDeptId(user.getDefaultOrganId());    // 部门id
        shiroUser.setDftDeptName(user.getDftOrganName());// 部门名称
// Todo:       shiroUser.setUserInfo((Map<String, Object>) RxBeanUtils.objectToMap(user));   //用户信息Map
        shiroUser.setDeptList(userService.getUserOrganPost(user.getId()));       //组织岗位List

        //Step2.用户角色状态
        List<Map<String, Object>> roles = userService.getUserSysRole(user.getId());
        shiroUser.setRoleList(roles);     //角色List
        if (roles.size() > 0 && null != roles.get(0).get("level")) {
            shiroUser.setRoleLevel(Integer.parseInt(roles.get(0).get("level").toString()));// 最高角色级别
            shiroUser.setRoleLevelId(Long.parseLong(roles.get(0).get("id").toString()));// 最高角色级别id
            //Step3.用户资源装载
            shiroUser.setResourceMap(resourceService.getUserResource(user.getId(),
                    shiroUser.getRoleLevel() == Const.ROLE_LEVEL_PLATADMIN, shiroUser.getRoleLevel() == Const.ROLE_LEVEL_SYSADMIN));
            shiroUser.setResourceUrl(resourceService.getUserResourceUrl(user.getId()));
        }
        return shiroUser;
    }

    @Override
    public void setShiroUserInfo(SysUser user, ShiroUser shiroUser) {

    }

    @Override
    public List<String> findPermissionsByRoleId(Long roleId) {
        //抽象所有的资源为权限数据，统一管理。资源的关键信息URL
        return null;
    }

    @Override
    public String findRoleNameByRoleId(Long roleId) {
        return null;
    }

    @Override
    public SimpleAuthenticationInfo info(ShiroUser shiroUser, SysUser user, String realmName) {
        //是否md5加密
        String isMd5 = CacheKit.get(Cache.CONFIG, "MD5");
        String credentials = user.getLoginPwd();
        //不采用加密
        if ("false".equals(isMd5)) {
            credentials = ShiroKit.md5Nosalt(credentials);
        }
        // 密码加盐处理
//        String source = user.getSalt();
//        ByteSource credentialsSalt = new Md5Hash(source);
//        return new SimpleAuthenticationInfo(shiroUser, credentials, credentialsSalt, realmName);
        return new SimpleAuthenticationInfo(shiroUser, credentials, realmName);
    }

    @Override
    public Set<String> findRoles(String appKey, String username) {
        return null;
    }

    @Override
    public Set<String> findPermissions(String appKey, String username) {
        return null;
    }
}
