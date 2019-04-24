package net.ruixin.service.plat.organ.impl;

import net.ruixin.dao.plat.auth.IRoleDao;
import net.ruixin.dao.plat.organ.IOrganDao;
import net.ruixin.dao.plat.organ.IUserDao;
import net.ruixin.domain.plat.organ.SysOrgan;
import net.ruixin.service.plat.organ.IOrganService;
import net.ruixin.util.shiro.ShiroKit;
import net.ruixin.util.paginate.FastPagination;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author admin
 * @date 2016-8-16
 * 机构服务实现
 */
@Service
public class OrganService implements IOrganService {

    @Autowired
    private IOrganDao organDao;
    @Autowired
    private IUserDao userDao;
    @Autowired
    private IRoleDao roleDao;


    @Override
    public FastPagination getSysOrganListPage(Map map) {
        map.put("userId", ShiroKit.getUser().getId());
        return organDao.getSysOrganListPage(map);
    }

    @Override
    @Transactional
    public void saveSysOrgan(SysOrgan organ) {
        organDao.saveSysOrgan(organ);

        userDao.refreshDataAuthOfUserOrganByOrgan(organ.getId());
    }

    @Override
    @Transactional
    public void delSysOrgan(Long organId, Long newOrganId) {
        organDao.deleteOrgan(organId, newOrganId);
    }

    @Override
    public SysOrgan getSysOrganById(Long id) {
        return organDao.getSysOrganById(id);
    }

    @Override
    public Map getOrganGlxx(Long organId) {
        //获取下级机构信息
        List<Map<String, Object>> organList = organDao.getOrganListByParentId(organId);
        //获取机构下用户信息
        List<Map<String, Object>> userList = userDao.getUserListByOrganId(organId);
        //获取机构下的岗位信息
        List<Map<String, Object>> postList = roleDao.getPostRoleByOrganId(organId);
        //获取角色信息
        List<Map<String, Object>> roleList = roleDao.getRoleListByEleId(organId, "2");
        Map<String, Object> map = new HashMap<>();
        map.put("organ", organList);
        map.put("user", userList);
        map.put("role", roleList);
        map.put("post", postList);
        return map;
    }

    @Override
    public List<Map<String, Object>> getOrganListByParentId(Long id) {
        return organDao.getOrganListByParentId(id);
    }


    @Override
    public boolean hasOrganName(Long organId, String organName, Long parentOrg) {
        return organDao.hasOrganName(organId, organName, parentOrg);
    }

    @Override
    public SysOrgan getOrganByCode(String code) {
        return organDao.getOrganByCode(code);
    }

    @Override
    public void changeTreeNodeSortAndParent(String ids, Long parentId) {
        organDao.changeTreeNodeSortAndParent(ids, parentId);
    }

    @Override
    public List<Map<String, Object>> getOrgansGlxx(String ids) {
        return organDao.getOrgansGlxx(ids);
    }


    @Override
    public List<Map<String, Object>> getOrgansLinkRole(String ids) {
        return organDao.getOrgansLinkRole(ids);
    }


}
