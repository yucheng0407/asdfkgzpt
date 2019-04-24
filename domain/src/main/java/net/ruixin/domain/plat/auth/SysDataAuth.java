package net.ruixin.domain.plat.auth;

import net.ruixin.enumerate.plat.SfyxSt;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.Date;


/**
 * 数据权限
 *
 * @author Administrator
 */
@SuppressWarnings("unused")
@Table(name = "SYS_DATA_AUTH")
@Entity
@DynamicInsert
@DynamicUpdate
public class SysDataAuth {
    /**
     * ID
     */
    @Id
    @SequenceGenerator(name = "seq_sys_data_auth", sequenceName = "SEQ_SYS_DATA_AUTH", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_sys_data_auth")
    private Long id;

    /**
     * 角色id
     */
    @Column(name = "ROLE_ID")
    private Long roleId;

    /**
     * 规则id
     */
    @Column(name = "RULE_ID")
    private Long ruleId;

    /**
     * 用户id
     */
    @Column(name = "USER_ID")
    private Long userId;

    /**
     * 对象类ID
     */
    @Column(name = "OBJECT_ID")
    private Long objectId;

    /**
     * 对象数据IDs
     */
    @Column(name = "OIDS")
    private String oIds;

    /**
     * 页面IDs
     */
    @Column(name = "PAGE_IDS")
    private String pageIds;

    /**
     * 权限类型，1：查看，2：维护，维护包括查看
     */
    @Column(name = "QXLX")
    private String qxlx;

    /**
     * 创建人
     */
    @Column(name = "CJR_ID")
    private Long cjrId;

    /**
     * 创建时间
     */
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "CJSJ")
    private Date cjsj;

    /**
     * 是否有效
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

    public Long getRuleId() {
        return ruleId;
    }

    public void setRuleId(Long ruleId) {
        this.ruleId = ruleId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getObjectId() {
        return objectId;
    }

    public void setObjectId(Long objectId) {
        this.objectId = objectId;
    }

    public String getoIds() {
        return oIds;
    }

    public void setoIds(String oIds) {
        this.oIds = oIds;
    }

    public String getPageIds() {
        return pageIds;
    }

    public void setPageIds(String pageIds) {
        this.pageIds = pageIds;
    }

    public String getQxlx() {
        return qxlx;
    }

    public void setQxlx(String qxlx) {
        this.qxlx = qxlx;
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

    public SfyxSt getSfyxSt() {
        return sfyxSt;
    }

    public void setSfyxSt(SfyxSt sfyxSt) {
        this.sfyxSt = sfyxSt;
    }
}
