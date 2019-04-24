package net.ruixin.domain.plat.organ;

import net.ruixin.domain.plat.BaseDomain;
import net.ruixin.domain.plat.auth.SysGlbRole;
import net.ruixin.domain.plat.auth.SysGlbRoleUser;
import net.ruixin.domain.rule.Restrict;
import net.ruixin.domain.rule.Rule;
import net.ruixin.enumerate.plat.SfyxSt;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.Formula;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * 用户实体
 *
 * @author Jealous
 * @date 2016-8-3
 */
@SuppressWarnings("unused")
@Table(name = "SYS_USER")
@Entity
@DynamicInsert
@DynamicUpdate
public class SysUser extends BaseDomain {
    @Id
    @SequenceGenerator(name = "seq_sysuser", sequenceName = "SEQ_SYS_USER", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_sysuser")
    private Long id;
    //登录名
    @Restrict(rules = {@Rule(validateClass = "CheckUnique", name = "登录账号")})
    @Column(name = "LOGIN_NAME")
    private String loginName;
    //登录密码
    @Column(name = "LOGIN_PWD")
    private String loginPwd;
    //用户名
    @Column(name = "USER_NAME")
    private String userName;
    //性别
    @Column(name = "SEX")
    private String sex;
    //组织id
    @Column(name = "DEFAULT_ORGAN_ID")
    private Long defaultOrganId;
    //所属的所有的机构ids
    @Formula("(SELECT WM_CONCAT(T.ORGAN_ID) FROM SYS_GLB_USER T WHERE T.USER_ID=ID AND T.SFYX_ST='1')")
    private String organIds;
    //默认组织名称
    @Formula("(SELECT ORGAN.ORGAN_NAME FROM SYS_ORGAN ORGAN WHERE ORGAN.ID = DEFAULT_ORGAN_ID AND ORGAN.SFYX_ST='1')")
    private String dftOrganName;
    //默认组织代码
    @Formula("(SELECT ORGAN.ORGAN_CODE FROM SYS_ORGAN ORGAN WHERE ORGAN.ID = DEFAULT_ORGAN_ID AND ORGAN.SFYX_ST='1')")
    private String dftOrganCode;
    //显示顺序
    @Column(name = "SORT")
    private Integer sortNum;
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
    //有效标识:0无效，1有效
    @Enumerated
    @Column(name = "SFYX_ST")
    private SfyxSt sfyxSt;

    //与机构、岗位关联关系 三要素表
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumns(@JoinColumn(name = "USER_ID", referencedColumnName = "ID"))
    @Where(clause = " SFYX_ST='1' ")
    @OrderBy(" organId asc ")
    private List<SysGlbUser> sysGlbUser;

    //与角色的一对多关系
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumns(@JoinColumn(name = "GL_ID", referencedColumnName = "ID"))
    @Where(clause = " SFYX_ST='1' AND SFQY_ST='1' AND GL_TYPE='3' ")
    private List<SysGlbRole> sysGlbRoleList;

    //所在机构与角色的一对多关系
    @Transient
    private List<Map<String, Object>> sysOrganRoleList;

    //与角色的分解关系
    @OneToMany(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumns(@JoinColumn(name = "USER_ID", referencedColumnName = "ID"))
    private List<SysGlbRoleUser> userRoleList;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="INFO_ID")
    private SysUserInfo sysUserInfo;

    //是否封锁
    @Column(name = "IS_BLOCKED")
    private String isBlocked;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLoginName() {
        return loginName;
    }

    public void setLoginName(String loginName) {
        this.loginName = loginName;
    }

    public String getLoginPwd() {
        return loginPwd;
    }

    public void setLoginPwd(String loginPwd) {
        this.loginPwd = loginPwd;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getDftOrganName() {
        return dftOrganName;
    }

    public void setDftOrganName(String dftOrganName) {
        this.dftOrganName = dftOrganName;
    }

    public Integer getSortNum() {
        return sortNum;
    }

    public void setSortNum(Integer sortNum) {
        this.sortNum = sortNum;
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

    public Long getDefaultOrganId() {
        return defaultOrganId;
    }

    public void setDefaultOrganId(Long defaultOrganId) {
        this.defaultOrganId = defaultOrganId;
    }

    public List<SysGlbRole> getSysGlbRoleList() {
        return sysGlbRoleList;
    }

    public void setSysGlbRoleList(List<SysGlbRole> sysGlbRoleList) {
        this.sysGlbRoleList = sysGlbRoleList;
    }


    public String getDftOrganCode() {
        return dftOrganCode;
    }

    public void setDftOrganCode(String dftOrganCode) {
        this.dftOrganCode = dftOrganCode;
    }

    public String getIsBlocked() {
        return isBlocked;
    }

    public void setIsBlocked(String isBlocked) {
        this.isBlocked = isBlocked;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public List<SysGlbRoleUser> getUserRoleList() {
        return userRoleList;
    }

    public void setUserRoleList(List<SysGlbRoleUser> userRoleList) {
        this.userRoleList = userRoleList;
    }

    public List<SysGlbUser> getSysGlbUser() {
        return sysGlbUser;
    }

    public void setSysGlbUser(List<SysGlbUser> sysGlbUser) {
        this.sysGlbUser = sysGlbUser;
    }

    public String getOrganIds() {
        return organIds;
    }

    public void setOrganIds(String organIds) {
        this.organIds = organIds;
    }

    public List<Map<String, Object>> getSysOrganRoleList() {
        return sysOrganRoleList;
    }

    public void setSysOrganRoleList(List<Map<String, Object>> sysOrganRoleList) {
        this.sysOrganRoleList = sysOrganRoleList;
    }

    public SysUserInfo getSysUserInfo() {
        return sysUserInfo;
    }

    public void setSysUserInfo(SysUserInfo sysUserInfo) {
        this.sysUserInfo = sysUserInfo;
    }

    public SysUser(String loginName, String loginPwd, String userName) {
        this.loginName = loginName;
        this.loginPwd = loginPwd;
        this.userName = userName;
        this.sfyxSt = SfyxSt.VALID;
    }

    public SysUser() {
    }
}
