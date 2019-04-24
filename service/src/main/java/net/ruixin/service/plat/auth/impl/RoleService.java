package net.ruixin.service.plat.auth.impl;

import net.ruixin.dao.plat.auth.IRoleDao;
import net.ruixin.dao.plat.organ.IUserDao;
import net.ruixin.domain.plat.auth.SysGlbRoleAuthRule;
import net.ruixin.domain.plat.auth.SysRole;
import net.ruixin.domain.plat.organ.SysUser;
import net.ruixin.service.plat.auth.IRoleService;
import net.ruixin.service.plat.common.BaseService;
import net.ruixin.util.shiro.ShiroKit;
import net.ruixin.util.data.AjaxReturn;
import net.ruixin.util.paginate.FastPagination;
import net.ruixin.util.tools.RxStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

/**
 * Created by admin on 2016-8-24.
 * 角色服务实现
 */
@Service
public class RoleService extends BaseService implements IRoleService {

    @Autowired
    private IRoleDao roleDao;

    @Autowired
    private IUserDao userDao;

    @Override
    public SysRole getRoleById(Long id) {
        return roleDao.getRoleById(id);
    }

    @Override
    public List getRoleGlDataList(String roleIds) {
        return roleDao.getRoleGlDataList(roleIds);
    }

    @Override
    @Transactional
    public void saveRole(SysRole sysRole, Boolean clearFlag) {
        //新增
        if (null == sysRole.getId()) {
            //查找当前用户角色级别的角色id
            sysRole.setCreateRoleId(ShiroKit.getLevelRoleId());
        }
        roleDao.saveRole(sysRole);
        roleDao.persistRole(sysRole, clearFlag);
    }

    @Override
    public FastPagination getRoleList(Map map) {
        return roleDao.getRoleList(map);
    }

    @Override
    @Transactional
    public void deleteRole(Long roleId) {
        roleDao.deleteRole(roleId);
    }

    @Override
    public AjaxReturn getWFNameByRoleId(Long roleId) {
        AjaxReturn ar = new AjaxReturn();
        List<Map<String, Object>> list = roleDao.getWFNameByRoleId(roleId);
        List<Object> newList = new ArrayList<>();
        Map<String, Object> map;
        if (list.size() > 0) { //被其它流程使用
            map = new HashMap<>();
            map.put("data", list);
            map.put("name", "工作流");
            map.put("showName", "NAME");
            newList.add(map);
            ar.setSuccess(false).setData(newList);
        } else { //未被其它流程使用
            ar.setSuccess(true);
        }
        return ar;
    }

    @Override
//    public List<Map<String, Object>> getRoleByGlxx(Map map) {
//        List<Map<String, Object>> organRoles = new ArrayList<>();
//        if (RxStringUtils.isNotEmpty(map.get("organIds"))) {
//            organRoles = roleDao.getRoleByGlxx(map.get("organIds").toString(), "2");
//        }
//        List<Map<String, Object>> postRoles = new ArrayList<>();
//        if (RxStringUtils.isNotEmpty(map.get("postIds"))) {
//            postRoles = roleDao.getRoleByGlxx(map.get("postIds").toString(), "1");
//        }
//        List<Map<String, Object>> newOrganRoles = getNewRoles(organRoles);
//        List<Map<String, Object>> newPostRoles = getNewRoles(postRoles);
//
//        List<Map<String, Object>> finalRoles = new ArrayList<>();
//        List<Object> tempRoles = new ArrayList<>();
//        if (newOrganRoles.size() > 0 && newPostRoles.size() > 0) {
//            finalRoles.addAll(newPostRoles);//加入所有岗位查出的角色
//            for (Map<String, Object> newPostRole : newPostRoles) {
//                tempRoles.add(newPostRole.get("ROLEID"));
//            }
//            for (Map<String, Object> newOrganRole : newOrganRoles) {
//                //加入机构查出并与岗位查出的角色不重复的角色
//                if (!tempRoles.contains(newOrganRole.get("ROLEID"))) {
//                    finalRoles.add(newOrganRole);
//                }
//            }
//        } else if (newOrganRoles.size() > 0) {
//            finalRoles.addAll(newOrganRoles);
//        } else if (newPostRoles.size() > 0) {
//            finalRoles.addAll(newPostRoles);
//        }
//        return finalRoles;
//    }

    public List<Map<String, Object>> getRoleByGlxx(Map map) {
        List<Map<String, Object>> organRoles = null;
        if (map.containsKey("organIds") && RxStringUtils.isNotEmpty(map.get("organIds"))) {
            organRoles = roleDao.getRoleByGlxx(map.get("organIds").toString(), "2");
        }
        List<Map<String, Object>> postRoles = null;
        if (map.containsKey("postIds") && RxStringUtils.isNotEmpty(map.get("postIds"))) {
            postRoles = roleDao.getRoleByGlxx(map.get("postIds").toString(), "1");
        }
        Set<Map<String, Object>> roles = new HashSet<>();
        if (organRoles != null) {
            roles.addAll(organRoles);
        }
        if (postRoles != null) {
            roles.addAll(postRoles);
        }

        if (roles.size() > 0) {
            return new ArrayList<>(roles);
        } else {
            return null;
        }
    }

    @Override
    public boolean checkRoleHasUser(Long roleId) {
        return roleDao.checkRoleHasUser(roleId);
    }

    @Override
    public List getRoleGlRule(Long roleId) {
        return roleDao.getRoleGlRule(roleId);
    }

    @Override
    public FastPagination getRoleGlbUser(Map map, Long roleId) {
        return roleDao.getRoleGlbUser(map, roleId);
    }

    @Override
    public Map<String, Object> getGlxxByRole(Long roleId, String type) {
        switch (type) {
            case "relate":
                return roleDao.getGlxxByRoleForRelate(roleId);
            case "show":
                return roleDao.getGlxxByRoleForShow(roleId);
            default:
                return null;
        }
    }

    @Transactional
    @Override
    public void saveRoleGlxx(Object[] params) {
        List<Long> oldUserList = roleDao.getUserIdListByRole(Long.valueOf(params[0].toString()));

        roleDao.saveRoleGlxx(params);

        List<Long> newUserList = roleDao.getUserIdListByRole(Long.valueOf(params[0].toString()));
        oldUserList.removeAll(newUserList);
        oldUserList.addAll(newUserList);
        for (Long userId : oldUserList) {
            userDao.refreshDataAuthOfUserOrgan(userId);
        }
    }

    @Override
    public List<Map<String, Object>> getRuleByRole(Long roleId) {
        return roleDao.getRuleByRole(roleId);
    }

    @Transactional
    @Override
    public void saveRoleRule(List<SysGlbRoleAuthRule> list) {
        for (SysGlbRoleAuthRule s : list) {
            save(s);
        }
    }


    @Override
    public List<Map<String, Object>> getRoleListByEleId(Long eleId, String gl_type) {
        return roleDao.getRoleListByEleId(eleId, gl_type);
    }

    @Override
    public FastPagination getSelectRole(Map map) {
        return roleDao.getSelectRole(map);
    }

    @Override
    public Map<String, Object> getGlbOrganByRole(Long roleId) {
        return roleDao.getGlbOrganByRole(roleId);
    }

    @Override
    public FastPagination getUserAuthorityList(Map map) {
        map.put("userId", ShiroKit.getUser().getId());
        return roleDao.getUserAuthorityList(map);
    }

    @Override
    public Map<String, Object> getUserAuthorityInfo(Long userId, Long currentUserId) {
        Map<String, Object> info = new HashMap<>();
        info.put("sysUser", get(SysUser.class, userId));
        info.put("authorityList", roleDao.getUserAuthorityList(userId, currentUserId));
        info.put("otherAuthorityList", roleDao.getUserOtherAuthorityList(userId, currentUserId));
        return info;
    }

    @Override
    public FastPagination getAuthorityRoleList(Map map) {
        return roleDao.getAuthorityRoleList(map);
    }

    @Override
    public void saveUserAuthority(Long userId, String addIds, String delIds) {
        SysUser user = get(SysUser.class, userId);
        Boolean ifChange = false;
        if (RxStringUtils.isNotEmpty(addIds)) {
            ifChange = true;
            for (String addId : addIds.split(",")) {
                roleDao.addUserAuthority(userId, Long.valueOf(addId));
            }
        }
        if (RxStringUtils.isNotEmpty(delIds)) {
            ifChange = true;
            for (String delId : delIds.split(",")) {
                roleDao.removeUserAuthority(userId, Long.valueOf(delId));
            }
        }
        if (ifChange) {
            userDao.afterChangeUser(userId);
        }
    }

    @Override
    public FastPagination getRoleListByRole(Map map) {
        map.put("roleId", ShiroKit.getLevelRoleId());
        if (ShiroKit.isPlatAdmin()) {
            map.put("platAdmin", ShiroKit.isPlatAdmin());
        }
        return roleDao.getCombineRoleList(map);
    }

    @Override
    public List<Map<String, Object>> getGlUserByRole(Long roleId) {
        return roleDao.getUserByRole(roleId);
    }
}
