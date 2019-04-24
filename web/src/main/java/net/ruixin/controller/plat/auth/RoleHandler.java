package net.ruixin.controller.plat.auth;

import net.ruixin.controller.BaseController;
import net.ruixin.domain.plat.auth.SysGlbRoleAuthRule;
import net.ruixin.domain.plat.auth.SysRole;
import net.ruixin.service.plat.auth.IRoleService;
import net.ruixin.service.plat.log.aop.BussinessLog;
import net.ruixin.util.data.AjaxReturn;
import net.ruixin.util.paginate.FastPagination;
import net.ruixin.util.resolver.CollectionModel;
import net.ruixin.util.resolver.FormModel;
import net.ruixin.util.resolver.JsonModel;
import net.ruixin.util.resolver.SearchModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.Map;

/**
 * Created by admin on 2016-8-24.
 * 角色控制类
 */
@Controller
@RequestMapping("/role")
@SuppressWarnings("unchecked")
public class RoleHandler extends BaseController {

    @Autowired
    private IRoleService roleService;

    /**
     * 根据ID查询角色信息
     *
     * @param id 角色ID
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping("/getRoleById")
    public AjaxReturn getRoleById(Long id) {
        SysRole sysRole = roleService.getRoleById(id);
        //只有是业务角色时才会查找关联要素，否则置空
        if (!"1".equals(sysRole.getRoleType())) {
            sysRole.setSysGlbRoleList(null);
        }
        return new AjaxReturn().setSuccess(true).setData(sysRole);
    }

    /**
     * 根据角色ID查询关联要素信息
     * TODO
     * 未找到前端调用逻辑
     *
     * @param roleIds 角色IDs,逗号拼接的ID字符串
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping("/getRoleGlDataList")
    public AjaxReturn getRoleGlDataList(String roleIds) {
        List list = roleService.getRoleGlDataList(roleIds);
        return new AjaxReturn().setSuccess(true).setData(list);
    }

    /**
     * 根据角色id查询工作流name
     * TODO
     * 未找到前端调用逻辑
     *
     * @param id 角色ID
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping("/getWFNameByRoleId")
    public AjaxReturn getWFNameByRoleId(Long id) {
        return roleService.getWFNameByRoleId(id);
    }

    /**
     * 保存角色信息
     *
     * @param sysRole   角色信息
     * @param clearFlag 是否清除流程角色的关联数据
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping("/saveRole")
    @BussinessLog(value = "角色变更")
    public AjaxReturn saveRole(@FormModel SysRole sysRole, Boolean clearFlag) {
        roleService.saveRole(sysRole, clearFlag);
        return new AjaxReturn().setSuccess(true).setData(sysRole.getId());
    }


    /**
     * 查询角色列表
     *
     * @param map map中除了包括分页查询的条件外，还包括以下参数：
     *            roleName:角色名称 roleCode:角色代码 roleType:角色类型
     *            glType:关联类型(2-组织机构 1-岗位 3-用户) gl_id:关联id
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping("/getRoleList")
    public AjaxReturn getRoleList(@SearchModel Object map) {
        FastPagination fastPagination = roleService.getRoleList((Map) map);
        return new AjaxReturn().setSuccess(true).setData(fastPagination);
    }

    /**
     * 删除角色信息
     *
     * @param id 角色ID
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping("/deleteRole")
    @BussinessLog(value = "角色删除")
    public AjaxReturn deleteRole(Long id) {
        roleService.deleteRole(id);
        return new AjaxReturn(true);
    }

    /**
     * 通过关联要素信息获取角色信息
     * TODO
     * 未找到前端调用逻辑
     *
     * @param map organIds postIds 关联类型 3：用户 1：岗位 2：机构
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping("/getRoleByGlxx")
    public AjaxReturn getRoleByGlxx(@JsonModel Object map) {
        return new AjaxReturn().setSuccess(true).setData(roleService.getRoleByGlxx((Map) map));
    }

    /**
     * 查询角色下有无关联用户
     * TODO
     * 未找到前端调用逻辑
     *
     * @param roleId 角色id
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping("/checkRoleHasUser")
    public AjaxReturn checkRoleHasUser(Long roleId) {
        return new AjaxReturn().setSuccess(true).setData(roleService.checkRoleHasUser(roleId));
    }

    /**
     * 查询角色下关联规则
     *
     * @param roleId 角色id
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping("/getRoleGlRule")
    public AjaxReturn getRoleGlRule(Long roleId) {
        return success().setSuccess(true).setData(roleService.getRoleGlRule(roleId));
    }

    /*
     * 查询角色关联用户
     * TODO
     * 未找到前端调用逻辑
     * @param map 查询条件
     * @param roleId 角色id
     * */
    @ResponseBody
    @RequestMapping("/getRoleGlbUser")
    public AjaxReturn getRoleGlbUser(@SearchModel Object map, String roleId) {
        FastPagination fastPagination = new FastPagination();
        if (!"null".equals(roleId)) {
            fastPagination = roleService.getRoleGlbUser((Map) map, Long.parseLong(roleId));
        }
        return success().setSuccess(true).setData(fastPagination);
    }

    /**
     * 根据角色id获取角色关联信息
     *
     * @param roleId 角色id
     * @param type   使用类型 “relate”/"show"
     */
    @ResponseBody
    @RequestMapping("/getGlxxByRole")
    public AjaxReturn getGlxxByRole(Long roleId, String type) {
        return success().setData(roleService.getGlxxByRole(roleId, type));
    }

    /**
     * 保存角色关联信息
     *
     * @param roleId       角色ID
     * @param organsAdd    增加机构IDS
     * @param organsDel    删除机构IDS
     * @param usersInclude 包含用户IDS
     * @param usersExclude 排除用户arIDS
     * @param usersTurn    取消（包含、排除）用户IDS
     * @return ar
     */
    @ResponseBody
    @RequestMapping("/saveRoleGlxx")
    public AjaxReturn saveRoleGlxx(Long roleId, String organsAdd, String organsDel,
                                   String usersInclude, String usersExclude, String usersTurn) {
        Object[] params = new Object[]{roleId, organsAdd, organsDel, usersInclude, usersExclude, usersTurn};
        roleService.saveRoleGlxx(params);
        return success();
    }

    /**
     * 根据角色id获取角色关联动态规则
     *
     * @param roleId 角色id
     */
    @ResponseBody
    @RequestMapping("/getRuleByRole")
    public AjaxReturn getRuleByRole(Long roleId) {
        return success().setData(roleService.getRuleByRole(roleId));
    }

    /**
     * 保存角色信息
     *
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping("/saveRoleRule")
    public AjaxReturn saveRoleRule(@CollectionModel(target = SysGlbRoleAuthRule.class) Object list) {
        roleService.saveRoleRule((List<SysGlbRoleAuthRule>) list);
        return success();
    }

//    @ResponseBody
//    @RequestMapping("/saveRoleRule")
//    public AjaxReturn renderAddRole(){
//
//    }

    /**
     * 获取角色选择信息
     *
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping("/getSelectRole")
    public AjaxReturn getSelectRole(@SearchModel Object obj, String kind) {
        Map map = (Map) obj;
        map.put("kind", kind);
        return success().setData(roleService.getSelectRole(map));
    }

    /**
     * 获取角色关联的组织结构
     *
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping("/getGlbOrganByRole")
    public AjaxReturn getGlbOrganByRole(Long roleId) {
        return success().setData(roleService.getGlbOrganByRole(roleId));
    }

    /**
     * 查询用户权限列表
     *
     * @param map map中除了包括分页查询的条件外，还包括以下参数：
     *            organ_id:所属机构
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping("/getUserAuthorityList")
    public AjaxReturn getUserAuthorityList(@SearchModel Object map) {
        return new AjaxReturn().setSuccess(true).setData(roleService.getUserAuthorityList((Map) map));
    }

    @ResponseBody
    @RequestMapping("/getUserAuthorityInfo")
    public AjaxReturn getUserAuthorityInfo(Long userId) {
        return new AjaxReturn().setSuccess(true).setData(
                roleService.getUserAuthorityInfo(userId, getCurrentUserId()));
    }

    /**
     * 查询用户可授权角色列表
     *
     * @param map map中除了包括分页查询的条件外，还包括以下参数：
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping("/getAuthorityRoleList")
    public AjaxReturn getAuthorityRoleList(@SearchModel Object map) {
        Map map2 = (Map) map;
        map2.put("currentUserId", getCurrentUserId());
        return new AjaxReturn().setSuccess(true).setData(roleService.getAuthorityRoleList(map2));
    }

    @ResponseBody
    @RequestMapping("/saveUserAuthority")
    public AjaxReturn saveUserAuthority(Long userId, String addIds, String delIds) {
        roleService.saveUserAuthority(userId, addIds, delIds);
        return success();
    }

    @ResponseBody
    @RequestMapping("/getRoleListByRole")
    public AjaxReturn getRoleListByRole(@SearchModel Object map) {
        return success().setData(roleService.getRoleListByRole((Map) map));
    }

    /**
     * 获取角色关联的用户列表
     *
     * @param roleId 角色id
     * @return
     */
    @ResponseBody
    @RequestMapping("/getAdminUserByRole")
    public AjaxReturn getAdminUserByRole(Long roleId) {
        return success().setData(roleService.getGlUserByRole(roleId));
    }
}
