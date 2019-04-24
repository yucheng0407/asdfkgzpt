package net.ruixin.domain.plat.report;
import net.ruixin.domain.plat.BaseDomain;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import javax.persistence.*;

import net.ruixin.enumerate.plat.SfyxSt;
import java.util.Date;

/**
 * 实体:SysGlbReportForm(报表关联)
 *
 * @author RXCoder  on 2018-8-21 14:06:28
 */

@Table(name = "SYS_GLB_REPORT_FORM")
@Entity
@DynamicInsert
@DynamicUpdate
public class SysGlbReportForm extends BaseDomain{
      
    /**
     * 主键
     */
    @Id
    @SequenceGenerator(name = "seq_sys_glb_report_form", sequenceName = "SEQ_SYS_GLB_REPORT_FORM", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_sys_glb_report_form")
    private Long id;
        /**
     * ID
     */
    @Column(name = "REPORT_FORM_ID")
    private Long reportFormId;
        /**
     * ID
     */
    @Column(name = "222")
    private Long glReportFormId2;
        /**
     * 配置名称
     */
    @Column(name = "GL_PROPERTY")
    private String glProperty;
        /**
     * 配置编码
     */
    @Column(name = "SHOW_TYPE")
    private String showType;
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

    public void setGlReportFormId2(Long glReportFormId2) {
        this.glReportFormId2 = glReportFormId2;
    }

    public Long getGlReportFormId2() {
        return glReportFormId2;
    }

    public void setGlProperty(String glProperty) {
        this.glProperty = glProperty;
    }

    public String getGlProperty() {
        return glProperty;
    }

    public void setShowType(String showType) {
        this.showType = showType;
    }

    public String getShowType() {
        return showType;
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