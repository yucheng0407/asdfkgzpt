package net.ruixin.domain.plat.auth;

import net.ruixin.domain.plat.BaseDomain;
import net.ruixin.enumerate.plat.SfyxSt;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.Formula;

import javax.persistence.*;

/**
 * 组合角色关联表
 */
@SuppressWarnings("unused")
@Table(name = "SYS_GLB_COMBINE_ROLE")
@Entity
@DynamicInsert
@DynamicUpdate
public class SysGlbCombineRole extends BaseDomain {
    /**
     * 主键id
     */
    @Id
    @SequenceGenerator(name = "seq_sys_glb_combine_role", sequenceName = "SEQ_SYS_GLB_COMBINE_ROLE", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_sys_glb_combine_role")
    private Long id;
    /**
     * 关联id
     */
    @Column(name = "ROLE_ID")
    private Long roleId;

    //角色名称
    @Formula("(SELECT ROLE.ROLE_NAME FROM SYS_ROLE ROLE WHERE ROLE.ID = ROLE_ID AND ROLE.SFYX_ST = '1')")
    private String roleName;

    /**
     * 组合角色的id
     */
    @Column(name = "COMBINE_ROLE_ID")
    private Long combineRoleId;

    //角色级别
    @Formula("(SELECT ROLE.LEVELS FROM SYS_ROLE ROLE WHERE ROLE.ID = ROLE_ID AND ROLE.SFYX_ST = '1')")
    private String levels;

    /**
     * 有效状态，0：无效，1：有效
     */
    @Enumerated
    @Column(name = "SFYX_ST")
    private SfyxSt sfyxSt;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getRoleId() {
        return roleId;
    }

    public void setRoleId(Long roleId) {
        this.roleId = roleId;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public Long getCombineRoleId() {
        return combineRoleId;
    }

    public void setCombineRoleId(Long combineRoleId) {
        this.combineRoleId = combineRoleId;
    }

    public SfyxSt getSfyxSt() {
        return sfyxSt;
    }

    public void setSfyxSt(SfyxSt sfyxSt) {
        this.sfyxSt = sfyxSt;
    }

    public String getLevels() {
        return levels;
    }

    public void setLevels(String levels) {
        this.levels = levels;
    }
}
