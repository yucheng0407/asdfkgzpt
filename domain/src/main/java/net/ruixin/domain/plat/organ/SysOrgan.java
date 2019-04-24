package net.ruixin.domain.plat.organ;

import net.ruixin.domain.plat.BaseDomain;
import net.ruixin.domain.plat.auth.SysGlbRole;
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

/**
 * 组织机构实体
 *
 * @author Pitcher
 */
@SuppressWarnings("unused")
@Table(name = "SYS_ORGAN")
@Entity
@DynamicInsert
@DynamicUpdate
public class SysOrgan extends BaseDomain {

    @Id
    @SequenceGenerator(name = "seq_sysorgan", sequenceName = "SEQ_SYS_ORGAN", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_sysorgan")
    private Long id;
    //组织编码
    @Restrict(rules = {@Rule(validateClass = "CheckUnique", name = "机构编码")})
    @Column(name = "ORGAN_CODE")
    private String organCode;
    //组织简称
    @Column(name = "ORGAN_NAME")
    private String organName;
    //组织全称
    @Restrict(rules = {@Rule(validateClass = "CheckUnique", name = "机构全称")})
    @Column(name = "FULL_NAME")
    private String fullName;
    //上级组织
    @Column(name = "PARENT_ORG")
    private Long parentOrg;

    //上级组织名称
    @Formula("(SELECT ORGAN.ORGAN_NAME FROM SYS_ORGAN ORGAN WHERE ORGAN.ID=PARENT_ORG AND ORGAN.SFYX_ST='1')")
    private String parentName;

    //显示顺序
    @Column(name = "SORT_NUM")
    private Integer sortNum;
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
    //有效标识:0无效，1有效
    @Enumerated
    @Column(name = "SFYX_ST")
    private SfyxSt sfyxSt;

    //与角色的一对多关系
    @OneToMany(targetEntity = SysGlbRole.class, cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumns(@JoinColumn(name = "GL_ID", referencedColumnName = "ID"))
    @Where(clause = " SFYX_ST='1' AND GL_TYPE='2' AND (ROLE_TYPE='1' OR ROLE_TYPE='2') ")
    private List<SysGlbRole> sysGlbRoleList;


    //与岗位的一对多关系
    @OneToMany(targetEntity = SysGlbRole.class, cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumns(@JoinColumn(name = "GL_ID", referencedColumnName = "ID"))
    @Where(clause = " SFYX_ST='1' AND GL_TYPE='2' AND ROLE_TYPE='3' ")
    private List<SysGlbRole> sysGlbPostList;

    //与机构岗位的关联

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOrganCode() {
        return organCode;
    }

    public void setOrganCode(String organCode) {
        this.organCode = organCode;
    }

    public String getOrganName() {
        return organName;
    }

    public void setOrganName(String organName) {
        this.organName = organName;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public Long getParentOrg() {
        return parentOrg;
    }

    public void setParentOrg(Long parentOrg) {
        this.parentOrg = parentOrg;
    }

    public String getParentName() {
        return parentName;
    }

    public void setParentName(String parentName) {
        this.parentName = parentName;
    }

    public Integer getSortNum() {
        return sortNum;
    }

    public void setSortNum(Integer sortNum) {
        this.sortNum = sortNum;
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

    public List<SysGlbRole> getSysGlbPostList() {
        return sysGlbPostList;
    }

    public void setSysGlbPostList(List<SysGlbRole> sysGlbPostList) {
        this.sysGlbPostList = sysGlbPostList;
    }
}
