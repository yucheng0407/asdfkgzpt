package net.ruixin.domain.plat.auth;

import net.ruixin.domain.plat.BaseDomain;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.Formula;

import javax.persistence.*;

/**
 * Created by admin on 2016-8-24.
 * 角色关联要素实体
 */
@SuppressWarnings("unused")
@Table(name = "SYS_GLB_ROLE_USER")
@Entity
@DynamicInsert
@DynamicUpdate
public class SysGlbRoleUser extends BaseDomain {

    //ID
    @Id
    @SequenceGenerator(name = "seq_sys_glb_role_user", sequenceName = "SEQ_SYS_GLB_ROLE_USER", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_sys_glb_role_user")
    private Long id;

    //角色ID
    @Column(name = "ROLE_ID")
    private Long roleId;

    //角色名称
    @Formula("(SELECT ROLE.ROLE_NAME FROM SYS_ROLE ROLE WHERE ROLE.ID = ROLE_ID AND ROLE.SFYX_ST = '1')")
    private String roleName;
    //角色代码
    @Formula("(SELECT ROLE.ROLE_CODE FROM SYS_ROLE ROLE WHERE ROLE.ID = ROLE_ID AND ROLE.SFYX_ST = '1')")
    private String roleCode;
    //角色级别
    @Formula("(SELECT ROLE.LEVELS FROM SYS_ROLE ROLE WHERE ROLE.ID = ROLE_ID AND ROLE.SFYX_ST = '1')")
    private String roleLevel;


    //用户ID
    @Column(name = "USER_ID")
    private Long userId;


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

    public String getRoleCode() {
        return roleCode;
    }

    public void setRoleCode(String roleCode) {
        this.roleCode = roleCode;
    }

    public String getRoleLevel() {
        return roleLevel;
    }

    public void setRoleLevel(String roleLevel) {
        this.roleLevel = roleLevel;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

}
