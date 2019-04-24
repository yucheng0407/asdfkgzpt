package net.ruixin.domain.plat.auth;

import net.ruixin.domain.plat.BaseDomain;
import net.ruixin.domain.rule.Restrict;
import net.ruixin.domain.rule.Rule;
import net.ruixin.enumerate.plat.SfyxSt;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

/**
 * Created by admin on 2016-8-24.
 * 角色实体
 */
@SuppressWarnings("unused")
@Table(name = "SYS_ROLE")
@Entity
@DynamicInsert
@DynamicUpdate
public class SysRole extends BaseDomain {

    //ID
    @Id
    @SequenceGenerator(name = "seq_sys_role", sequenceName = "SEQ_SYS_ROLE", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_sys_role")
    private Long id;

    //角色代码
    @Restrict(rules = {@Rule(validateClass = "CheckUnique", name = "角色编码")})
    @Column(name = "ROLE_CODE")
    private String roleCode;

    //角色名称
    @Restrict(rules = {@Rule(validateClass = "CheckUnique", name = "角色名称")})
    @Column(name = "ROLE_NAME")
    private String roleName;

    //角色类型   字典项 1:业务角色 2:流程角色
    @Column(name = "ROLE_TYPE")
    private String roleType;

    //级别
    @Column(name = "LEVELS")
    private String levels;

    //角色组成类型
    @Column(name = "ROLE_MADE")
    private String roleMade;

    //备注
    @Column(name = "DESCRIPTION")
    private String description;

    //创建人
    @Column(name = "CJR_ID")
    private Long cjrId;

    //创建时间
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "CJSJ")
    private Date cjsj;

    //修改人
    @Column(name = "XGR_ID")
    private Long xgrId;

    //修改时间
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "XGSJ")
    private Date xgsj;

    //权限类型
    @Column(name = "AUTH_TYPE")
    private String authType;

    @Enumerated
    @Column(name = "SFYX_ST")
    private SfyxSt sfyxSt;

    @OneToMany(cascade = {CascadeType.REFRESH, CascadeType.REMOVE})
    @JoinColumn(name = "ROLE_ID", referencedColumnName = "ID")
    @Where(clause = " SFYX_ST='1' ")
    private List<SysGlbRole> sysGlbRoleList;

    @OneToMany(cascade = {CascadeType.ALL})
    @JoinColumn(name = "COMBINE_ROLE_ID", referencedColumnName = "ID")
    @Where(clause = " SFYX_ST='1' ")
    private List<SysGlbCombineRole> combineRoleList;

    @OneToMany(cascade = {CascadeType.REFRESH, CascadeType.REMOVE})
    @JoinColumn(name = "ROLE_ID", referencedColumnName = "ID")
    @Where(clause = " SFYX_ST='1' ")
    private List<SysGlbRoleAuthRule> sysGlbRoleAuthRuleList;

    //是否组合角色 1是 0否
    @Column(name = "IS_COMBINE")
    private String isCombine;

    //创建的角色id
    @Column(name = "CREATE_ROLE_ID")
    private Long createRoleId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRoleCode() {
        return roleCode;
    }

    public void setRoleCode(String roleCode) {
        this.roleCode = roleCode;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public String getRoleType() {
        return roleType;
    }

    public void setRoleType(String roleType) {
        this.roleType = roleType;
    }

    public String getAuthType() {
        return authType;
    }

    public void setAuthType(String authType) {
        this.authType = authType;
    }

    public String getLevels() {
        return levels;
    }

    public void setLevels(String levels) {
        this.levels = levels;
    }

    public String getRoleMade() {
        return roleMade;
    }

    public void setRoleMade(String roleMade) {
        this.roleMade = roleMade;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getCjrId() {
        return cjrId;
    }

    public void setCjrId(Long cjrId) {
        this.cjrId = cjrId;
    }

    public Date getCjsj() {
        return cjsj;
    }

    public void setCjsj(Date cjsj) {
        this.cjsj = cjsj;
    }

    public Long getXgrId() {
        return xgrId;
    }

    public void setXgrId(Long xgrId) {
        this.xgrId = xgrId;
    }

    public Date getXgsj() {
        return xgsj;
    }

    public void setXgsj(Date xgsj) {
        this.xgsj = xgsj;
    }

    public SfyxSt getSfyxSt() {
        return sfyxSt;
    }

    public void setSfyxSt(SfyxSt sfyxSt) {
        this.sfyxSt = sfyxSt;
    }

    public List<SysGlbRole> getSysGlbRoleList() {
        return sysGlbRoleList;
    }

    public void setSysGlbRoleList(List<SysGlbRole> sysGlbRoleList) {
        this.sysGlbRoleList = sysGlbRoleList;
    }

    public List<SysGlbRoleAuthRule> getSysGlbRoleAuthRuleList() {
        return sysGlbRoleAuthRuleList;
    }

    public void setSysGlbRoleAuthRuleList(List<SysGlbRoleAuthRule> sysGlbRoleAuthRuleList) {
        this.sysGlbRoleAuthRuleList = sysGlbRoleAuthRuleList;
    }

    public String getIsCombine() {
        return isCombine;
    }

    public void setIsCombine(String isCombine) {
        this.isCombine = isCombine;
    }

    public List<SysGlbCombineRole> getCombineRoleList() {
        return combineRoleList;
    }

    public void setCombineRoleList(List<SysGlbCombineRole> combineRoleList) {
        this.combineRoleList = combineRoleList;
    }

    public Long getCreateRoleId() {
        return createRoleId;
    }

    public void setCreateRoleId(Long createRoleId) {
        this.createRoleId = createRoleId;
    }
}
