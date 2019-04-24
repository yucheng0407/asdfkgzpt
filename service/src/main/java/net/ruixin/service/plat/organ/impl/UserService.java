package net.ruixin.service.plat.organ.impl;

import net.ruixin.dao.plat.auth.IRoleDao;
import net.ruixin.dao.plat.organ.IOrganDao;
import net.ruixin.dao.plat.organ.IUserDao;
import net.ruixin.domain.plat.organ.SysUser;
import net.ruixin.service.plat.auth.IDataAuthGenerateService;
import net.ruixin.service.plat.common.BaseService;
import net.ruixin.service.plat.organ.IUserService;
import net.ruixin.util.shiro.ShiroKit;
import net.ruixin.util.cache.Cache;
import net.ruixin.util.cache.CacheKit;
import net.ruixin.util.paginate.FastPagination;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author admin
 * @date 2016-8-17
 * 用户服务实现
 */
@Service
public class UserService extends BaseService implements IUserService {

    @Autowired
    private IUserDao userDao;
    @Autowired
    private IRoleDao roleDao;

    @Autowired
    private IOrganDao organDao;

    @Autowired
    private IDataAuthGenerateService dataAuthGenerateService;

    @Override
    public void delUser(Long userId) {
        userDao.delUser(userId);
    }

    @Override
    public SysUser getUserById(Long userId) {
        return userDao.getUserById(userId);
    }

    @Override
    public FastPagination getUserPageList(Map map) {
        map.put("userId", ShiroKit.getUser().getId());
        return userDao.getUserPageList(map);
    }

    @Override
    @Transactional
    public void saveUser(SysUser sysUser) {
        String pwd = sysUser.getLoginPwd();
        if (pwd != null && !"".equals(pwd)) {
            userDao.saveUser(sysUser);
        } else {
            String defaultPwd = CacheKit.get(Cache.CONFIG, "defaultPassword");
            //密码使用MD5计算
            //是否md5加密
            String isMd5 = CacheKit.get(Cache.CONFIG, "MD5");
            //不采用加密
            if ("false".equals(isMd5)) {
                sysUser.setLoginPwd(defaultPwd);
            } else {
                sysUser.setLoginPwd(ShiroKit.md5Nosalt(defaultPwd));
            }
            userDao.saveUser(sysUser);
        }

        //保存用户后，处理用户组织机构数据权限
        userDao.refreshDataAuthOfUserOrgan(sysUser.getId());
    }
    @Override
    public List<Map<String, Object>> getUserListByOrganId(Long organId) {
        return userDao.getUserListByOrganId(organId);
    }

    @Override
    public Map getUserGlxx(Long userId) {
        List<Map<String, Object>> roleList = roleDao.getRoleListByEleId(userId, "3");
        Map<String, Object> map = new HashMap<>();
        map.put("role", roleList);
        return map;
    }

    @Override
    public List<Map<String, Object>> getWgwUserListByOrganId(Long organId) {
        return userDao.getWgwUserListByOrganId(organId);
    }

    @Override
    public SysUser getUserByLoginInfo(String loginName, String loginPwd) {
        return userDao.getUserByLoginInfo(loginName, loginPwd);
    }

    @Override
    @Transactional
    public boolean changePwd(String newPwd, Long userId) {
        return userDao.changePwd(newPwd, userId);
    }


    @Override
    public List<Map<String, Object>> getUserRoleInfo(SysUser user) {
        return userDao.getUserGlxx(user.getId());
    }

    @Override
    public SysUser getUserByLoginName(String loginName) {
        return userDao.findUserByLoginName(loginName);
    }
    @Override
    public SysUser getUserBySFZ(String sfz) {
        return userDao.getUserBySFZ(sfz);
    }

    @Override
    public List<Map<String, Object>> getUserSysRole(Long userId) {
        List<Map<String, Object>> resultList = new ArrayList<>();
        List<Map<String, Object>> roleList = roleDao.getUserSysRole(userId);
        for (Map<String, Object> map : roleList) {
            Map<String, Object> result = new HashMap<>();
            result.put("id", map.get("ID"));
            result.put("name", map.get("ROLE_NAME"));
            result.put("code", map.get("ROLE_CODE"));
            result.put("level", map.get("LEVELS"));
            resultList.add(result);
        }
        return resultList;
    }

    @Override
    public List<Map<String, Object>> getUserOrganPost(Long userId) {
        List<Map<String, Object>> resultList = new ArrayList<>();
        List<Map<String, Object>> organList = organDao.getUserOrganPostRole(userId);
        for (Map<String, Object> map : organList) {
            Map<String, Object> result = new HashMap<>();
            result.put("organId", map.get("ORGAN_ID"));
            result.put("organName", map.get("ORGAN_NAME"));
            result.put("organCode", map.get("ORGAN_CODE"));
            result.put("postRoleId", map.get("POST_ID"));
            result.put("postRoleName", map.get("POST_NAME"));
            resultList.add(result);
        }
        return resultList;
    }

    @Override
    @Transactional
    public void blockUser(Long userId) {
        userDao.blockUser(userId);
    }

    @Override
    @Transactional
    public void unblockUser(Long userId) {
        userDao.unblockUser(userId);
    }

    @Override
    @Transactional
    public void resetPwd(String pwd, String userIds) {
        if ("false".equals(CacheKit.get(Cache.CONFIG, "MD5"))) {
            userDao.resetPwd(pwd, userIds);
        } else {
            userDao.resetPwd(ShiroKit.md5Nosalt(pwd), userIds);
        }

    }

    @Override
    public FastPagination getNoAdminUserList(Map map) {
        return userDao.getNoAdminUserList(map);
    }

}
