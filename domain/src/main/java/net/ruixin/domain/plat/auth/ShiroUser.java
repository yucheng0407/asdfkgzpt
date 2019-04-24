package net.ruixin.domain.plat.auth;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

/**
 * 自定义Authentication对象，使得Subject除了携带用户的登录名外还可以携带更多信息
 */
public class ShiroUser implements Serializable {
    private static final long serialVersionUID = 1L;

    /******用户基本相关******/
    private Long id;          // 主键ID
    private String account;      // 账号
    private String name;         // 姓名
    private Long dftDeptId;      // 默认部门id
    private String dftDeptName;        // 默认部门名称
    private Map<String,Object> userInfo;      //用户信息
    private List<Map<String,Object>> deptList;       //关联部门岗位集合

    /******用户角色相关******/
    private int roleLevel = 99;      //最高角色权限，值中“Const.ROLE_LEVEL_PLATADMIN”：“1”最高
    private Long roleLevelId;         //最高权限的角色id
    private List<Map<String,Object>> roleList; // 角色集

    /******用户资源相关******/
    private Map<String,List> resourceMap;  // 资源集合 分组父子

    private Map<String,Object> resourceUrl; //资源的URL集合

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getDftDeptId() {
        return dftDeptId;
    }

    public void setDftDeptId(Long dftDeptId) {
        this.dftDeptId = dftDeptId;
    }

    public String getDftDeptName() {
        return dftDeptName;
    }

    public void setDftDeptName(String dftDeptName) {
        this.dftDeptName = dftDeptName;
    }

    public Map<String, Object> getUserInfo() {
        return userInfo;
    }

    public void setUserInfo(Map<String, Object> userInfo) {
        this.userInfo = userInfo;
    }

    public List<Map<String, Object>> getDeptList() {
        return deptList;
    }

    public void setDeptList(List<Map<String, Object>> deptList) {
        this.deptList = deptList;
    }

    public int getRoleLevel() {
        return roleLevel;
    }

    public void setRoleLevel(int roleLevel) {
        this.roleLevel = roleLevel;
    }

    public List<Map<String, Object>> getRoleList() {
        return roleList;
    }

    public void setRoleList(List<Map<String, Object>> roleList) {
        this.roleList = roleList;
    }

    public Map<String, List> getResourceMap() {
        return resourceMap;
    }

    public void setResourceMap(Map<String, List> resourceMap) {
        this.resourceMap = resourceMap;
    }

    public Map<String, Object> getResourceUrl() {
        return resourceUrl;
    }

    public void setResourceUrl(Map<String, Object> resourceUrl) {
        this.resourceUrl = resourceUrl;
    }

    public Long getRoleLevelId() {
        return roleLevelId;
    }

    public void setRoleLevelId(Long roleLevelId) {
        this.roleLevelId = roleLevelId;
    }

    @Override
    public String toString() {
        return "ShiroUser{" +
                "id=" + id +
                ", account='" + account + '\'' +
                ", name='" + name + '\'' +
                '}';
    }
}
