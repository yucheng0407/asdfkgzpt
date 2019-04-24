package net.ruixin.domain.plat.auth;

import net.ruixin.domain.plat.BaseDomain;
import net.ruixin.enumerate.plat.Sfqy_st;
import net.ruixin.enumerate.plat.SfyxSt;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.Formula;

import javax.persistence.*;

/**
 * Created by admin on 2016-8-24.
 * 角色关联要素实体
 */
@SuppressWarnings("unused")
@Table(name = "SYS_GLB_ROLE")
@Entity
@DynamicInsert
@DynamicUpdate
public class SysGlbRole extends BaseDomain {

    //ID
    @Id
    @SequenceGenerator(name = "seq_sys_glb_role", sequenceName = "SEQ_SYS_GLB_ROLE", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_sys_glb_role")
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

    //角色类型
    @Column(name = "ROLE_TYPE")
    private String roleType;

    //角色类型名称
    @Formula("(SELECT SS.VALUE FROM SYS_ROLE R, SYS_SUBDICT SS WHERE R.ROLE_TYPE = SS.CODE " +
            "   AND SS.DICT_CODE = 'JSLX' AND R.ID = ROLE_ID " +
            "   AND SS.SFYX_ST = '1' AND R.SFYX_ST = '1' )")
    private String roleTypeName;

    //创建的角色id
    @Formula("(SELECT ROLE.CREATE_ROLE_ID FROM SYS_ROLE ROLE WHERE ROLE.ID = ROLE_ID AND ROLE.SFYX_ST = '1')")
    private Long createRoleId;

    //角色级别
    @Formula("(SELECT ROLE.levels FROM SYS_ROLE ROLE WHERE ROLE.ID = ROLE_ID AND ROLE.SFYX_ST = '1')")
    private String levels;

    //角色级别名称
    @Formula("(SELECT GET_DICT_VALUE(R.LEVELS,'SYSLEVEL') FROM SYS_ROLE R  WHERE R.ID= ROLE_ID AND R.SFYX_ST='1')")
    private String levelName;

    //角色关联ID
    @Column(name = "GL_ID")
    private Long glId;

    //关联类型，3：用户，1：岗位，2：组织 4:组织岗位
    @Column(name = "GL_TYPE")
    private String glType;

    //是否有效  0：无效   1：有效
    @Enumerated
    @Column(name = "SFYX_ST")
    private SfyxSt sfyxSt;

    //是否启用  0：否   1：是
    @Enumerated
    @Column(name = "SFQY_ST")
    private Sfqy_st sfqySt;


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

    public Long getGlId() {
        return glId;
    }

    public void setGlId(Long glId) {
        this.glId = glId;
    }

    public String getGlType() {
        return glType;
    }

    public void setGlType(String glType) {
        this.glType = glType;
    }

    public SfyxSt getSfyxSt() {
        return sfyxSt;
    }

    public void setSfyxSt(SfyxSt sfyxSt) {
        this.sfyxSt = sfyxSt;
    }

    public Sfqy_st getSfqySt() {
        return sfqySt;
    }

    public void setSfqySt(Sfqy_st sfqySt) {
        this.sfqySt = sfqySt;
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

    public String getRoleType() {
        return roleType;
    }

    public void setRoleType(String roleType) {
        this.roleType = roleType;
    }

    public String getRoleTypeName() {
        return roleTypeName;
    }

    public void setRoleTypeName(String roleTypeName) {
        this.roleTypeName = roleTypeName;
    }

    public String getLevels() {
        return levels;
    }

    public void setLevels(String levels) {
        this.levels = levels;
    }

    public Long getCreateRoleId() {
        return createRoleId;
    }

    public void setCreateRoleId(Long createRoleId) {
        this.createRoleId = createRoleId;
    }

    public String getLevelName() {
        return levelName;
    }

    public void setLevelName(String levelName) {
        this.levelName = levelName;
    }
}
