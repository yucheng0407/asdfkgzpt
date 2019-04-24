package net.ruixin.domain.plat.config;

import net.ruixin.domain.constant.Const;
import net.ruixin.domain.plat.BaseDomain;
import net.ruixin.domain.rule.Restrict;
import net.ruixin.domain.rule.Rule;
import net.ruixin.enumerate.plat.SfyxSt;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.Formula;

import javax.persistence.*;
import java.util.Date;

@Table(name = "SYS_CONFIG")
@Entity
@DynamicInsert
@DynamicUpdate
public class SysConfig extends BaseDomain {

    //主键ID
    @Id
    @SequenceGenerator(name = "seq_sys_config", sequenceName = "SEQ_SYS_CONFIG", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_sys_config")
    private Long id;

    //名称
    @Restrict(rules = {@Rule(validateClass = "CheckUnique", name = "配置项名称")})
    @Column(name = "NAME")
    private String name;

    //代码
    @Restrict(rules = {@Rule(validateClass = "CheckUnique", name = "配置项编码")})
    @Column(name = "CODE")
    private String code;

    //描述
    @Column(name = "DESCRIPTION")
    private String description;

    //值
    @Column(name = "VALUE")
    private String value;

    //级别
    @Column(name = "LEVELS")
    private String levels;

    //业务类型
    @Column(name = "BIZ_TYPE")
    private String bizType;

    //所属应用id
    @Column(name = "APP_ID")
    private Long appId;

    //所属应用名称
    @Formula("(SELECT RES.NAME FROM SYS_RESOURCE RES WHERE RES.ID = APP_ID AND RES.TYPE='" + Const.RES_TYPE_APP + "' AND RES.SFYX_ST='1')")
    private String appName;

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

    //是否有效
    @Enumerated
   @Column(name = "SFYX_ST")
    private SfyxSt sfyxSt;

    public SysConfig(String code, String value, String levels, String bizType) {
        this.code = code;
        this.value = value;
        this.levels = levels;
        this.bizType = bizType;
        this.sfyxSt = SfyxSt.VALID;
    }

    public SysConfig() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public String getLevels() {
        return levels;
    }

    public void setLevels(String levels) {
        this.levels = levels;
    }

    public String getBizType() {
        return bizType;
    }

    public void setBizType(String bizType) {
        this.bizType = bizType;
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

    public Long getAppId() {
        return appId;
    }

    public void setAppId(Long appId) {
        this.appId = appId;
    }

    public String getAppName() {
        return appName;
    }

    public void setAppName(String appName) {
        this.appName = appName;
    }
}
