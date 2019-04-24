package net.ruixin.domain.plat.report;
import net.ruixin.domain.plat.BaseDomain;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import javax.persistence.*;

import net.ruixin.enumerate.plat.SfyxSt;
import java.util.Date;

/**
 * 实体:SysReportSetting(报表配置)
 *
 * @author RXCoder  on 2018-8-21 14:04:52
 */

@Table(name = "SYS_REPORT_SETTING")
@Entity
@DynamicInsert
@DynamicUpdate
public class SysReportSetting extends BaseDomain{
      
    /**
     * 主键
     */
    @Id
    @SequenceGenerator(name = "seq_sys_report_setting", sequenceName = "SEQ_SYS_REPORT_SETTING", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_sys_report_setting")
    private Long id;
        /**
     * ID
     */
    @Column(name = "REPORT_FORM_ID")
    private Long reportFormId;
        /**
     * 配置名称
     */
    @Column(name = "NAME")
    private String name;
        /**
     * 配置编码
     */
    @Column(name = "CODE")
    private String code;
        /**
     * 配置值
     */
    @Column(name = "VALUE")
    private String value;
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


    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setReportFormId(Long reportFormId) {
        this.reportFormId = reportFormId;
    }

    public Long getReportFormId() {
        return reportFormId;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getCode() {
        return code;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
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

}