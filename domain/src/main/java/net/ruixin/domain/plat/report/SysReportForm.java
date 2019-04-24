package net.ruixin.domain.plat.report;
import net.ruixin.domain.plat.BaseDomain;
import net.ruixin.domain.plat.auth.SysGlbRole;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import javax.persistence.*;

import net.ruixin.enumerate.plat.SfyxSt;
import org.hibernate.annotations.Where;

import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * 实体:SysReportForm(报表)
 *
 * @author RXCoder  on 2018-8-21 14:03:06
 */

@Table(name = "SYS_REPORT_FORM")
@Entity
@DynamicInsert
@DynamicUpdate
public class SysReportForm extends BaseDomain{
      
    /**
     * 主键
     */
    @Id
    @SequenceGenerator(name = "seq_sys_report_form", sequenceName = "SEQ_SYS_REPORT_FORM", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_sys_report_form")
    private Long id;
        /**
     * 报表名称
     */
    @Column(name = "NAME")
    private String name;
        /**
     * 元数据ID
     */
    @Column(name = "METADATA_ID")
    private Long metadataId;
        /**
     * 报表类型，”1“表格，”2“柱状图，”3“折线图，”4“饼状图
     */
    @Column(name = "TYPE")
    private String type;
        /**
     * 报表地址
     */
    @Column(name = "URL")
    private String url;
        /**
     * 规则类型
     */
    @Column(name = "RULE_TYPE")
    private String ruleType;
        /**
     * 创建人ID
     */
    @Column(name = "CJR_ID")
    private Long cjrId;
        /**
     * 创建时间
     */
    @Column(name = "CJSJ")
    private Date cjsj;
        /**
     * 修改人ID
     */
    @Column(name = "XGR_ID")
    private Long xgrId;
        /**
     * 修改时间
     */
    @Column(name = "XGSJ")
    private Date xgsj;
        /**
     * 有效标识:0无效，1有效
     */
    @Enumerated
    @Column(name = "SFYX_ST")
    private SfyxSt sfyxSt;

    //与报表属性的一对多关系
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumns(@JoinColumn(name = "REPORT_FORM_ID", referencedColumnName = "ID"))
    @Where(clause = " SFYX_ST='1' ")
    private List<SysReportProperty> propertyList;

    //与报表配置的一对多关系
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumns(@JoinColumn(name = "REPORT_FORM_ID", referencedColumnName = "ID"))
    @Where(clause = " SFYX_ST='1' ")
    private List<SysReportSetting> settingList;

    //设置的map型格式数据
    @Transient
    Map<String, Object> settings;

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setMetadataId(Long metadataId) {
        this.metadataId = metadataId;
    }

    public Long getMetadataId() {
        return metadataId;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getType() {
        return type;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getUrl() {
        return url;
    }

    public void setRuleType(String ruleType) {
        this.ruleType = ruleType;
    }

    public String getRuleType() {
        return ruleType;
    }

    public void setCjrId(Long cjrId) {
        this.cjrId = cjrId;
    }

    public Long getCjrId() {
        return cjrId;
    }

    public void setCjsj(Date cjsj) {
        this.cjsj = cjsj;
    }

    public Date getCjsj() {
        return cjsj;
    }

    public void setXgrId(Long xgrId) {
        this.xgrId = xgrId;
    }

    public Long getXgrId() {
        return xgrId;
    }

    public void setXgsj(Date xgsj) {
        this.xgsj = xgsj;
    }

    public Date getXgsj() {
        return xgsj;
    }

    public SfyxSt getSfyxSt() {
        return sfyxSt;
    }

    public void setSfyxSt(SfyxSt sfyxSt) {
        this.sfyxSt = sfyxSt;
    }

    public List<SysReportProperty> getPropertyList() {
        return propertyList;
    }

    public void setPropertyList(List<SysReportProperty> propertyList) {
        this.propertyList = propertyList;
    }

    public List<SysReportSetting> getSettingList() {
        return settingList;
    }

    public void setSettingList(List<SysReportSetting> settingList) {
        this.settingList = settingList;
    }

    public Map<String, Object> getSettings() {
        return settings;
    }

    public void setSettings(Map<String, Object> settings) {
        this.settings = settings;
    }
}