package net.ruixin.controller.plat.auth;

import net.ruixin.util.shiro.ShiroKit;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/role")
@SuppressWarnings("all")
public class RoleMapping {
    //角色选择弹出层
    @RequestMapping(value = "/sysRoleSelect")
    public String sysRoleSelect() {
        return "plat/role/sysRoleSelect";
    }

    //角色选择页面
    @RequestMapping(value = "/roleSelect")
    public String roleSelect() {
        return "plat/role/roleSelect";
    }

    //角色选择弹出层
    @RequestMapping(value = "/roleElementView")
    public String roleElementView() {
        return "plat/role/roleElementView";
    }

    //角色查看列表
    @RequestMapping(value = "roleList")
    public String roleList(Model model) {
        model.addAttribute("isPlatAdmin", ShiroKit.isPlatAdmin());
        return "plat/role/roleList";
    }

    //角色新增页面
    @RequestMapping(value = "/roleAdd")
    public String roleAdd(Model model) {
        model.addAttribute("isPlatAdmin", ShiroKit.isPlatAdmin());
        model.addAttribute("roleLevel", ShiroKit.getRoleLevel());
        return "plat/role/roleEdit";
    }

    //角色修改页面
    @RequestMapping(value = "/roleEdit")
    public String roleEdit(Model model) {
        model.addAttribute("isPlatAdmin", ShiroKit.isPlatAdmin());
        model.addAttribute("roleLevel", ShiroKit.getRoleLevel());
        return "plat/role/roleEdit";
    }

    //角色编辑页面
    @RequestMapping(value = "/roleView")
    public String roleView(Model model) {
        model.addAttribute("isPlatAdmin", ShiroKit.isPlatAdmin());
        model.addAttribute("roleLevel", ShiroKit.getRoleLevel());
        return "plat/role/roleView";
    }

    //角色选择关联要素
    @RequestMapping(value = "/chooseOrgan")
    public String chooseOrgan() {
        return "plat/role/chooseOrgan";
    }

    //角色选择关联动态规则
    @RequestMapping(value = "/chooseRule")
    public String chooseRule() {
        return "plat/role/chooseRule";
    }

    //岗位角色选择组织机构
    @RequestMapping(value = "/chooseOrganTree")
    public String chooseOrganTree() {
        return "plat/role/chooseOrganTree";
    }

    //用户权限管理列表（分级授权）
    @RequestMapping(value = "/userAuthorityList")
    public String userAuthorityList() {
        return "plat/auth/userAuthorityList";
    }

    //用户权限管理表单（分级授权）
    @RequestMapping(value = "/userAuthorityEdit")
    public String userAuthorityEdit(Model model) {
        model.addAttribute("isPlatAdmin", ShiroKit.isPlatAdmin());
        return "plat/auth/userAuthorityEdit";
    }

    //用户权限管理查看（分级授权）
    @RequestMapping(value = "/userAuthorityView")
    public String userAuthorityView() {
        return "plat/auth/userAuthorityView";
    }

    //选择可授权角色列表（分级授权）
    @RequestMapping(value = "/authorityRoleSelect")
    public String authorityRoleSelect() {
        return "plat/auth/authorityRoleSelect";
    }

    //用户分配管理员角色
    @RequestMapping(value = "/chooseAdminUser")
    public String chooseAdminUser() {
        return "plat/role/chooseAdminUser";
    }

    //用户分配管理员角色
    @RequestMapping(value = "/noAdminUserSelect")
    public String noAdminUserSelect() {
        return "plat/role/noAdminUserSelect";
    }
}

