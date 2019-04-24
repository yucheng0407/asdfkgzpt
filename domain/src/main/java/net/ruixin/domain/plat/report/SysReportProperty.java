package net.ruixin.domain.plat.report;

import net.ruixin.domain.plat.BaseDomain;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

import net.ruixin.enumerate.plat.SfyxSt;

import java.util.Date;

/**
 * 实体:SysReportProperty(报表字段)
 *
 * @author RXCoder  on 2018-8-21 14:04:35
 */

@Table(name = "SYS_REPORT_PROPERTY")
@Entity
@DynamicInsert
@DynamicUpdate
public class SysReportProperty extends BaseDomain {

    /**
     * 主键
     */
    @Id
    @SequenceGenerator(name = "seq_sys_report_property", sequenceName = "SEQ_SYS_REPORT_PROPERTY", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_sys_report_property")
    private Long id;
    /**
     * ID
     */
    @Column(name = "REPORT_FORM_ID")
    private Long reportFormId;
    /**
     * 字段名称
     */
    @Column(name = "NAME")
    private String name;
    /**
     * 字段编码
     */
    @Column(name = "CODE")
    private String code;
    /**
     * 元数据字段
     */
    @Column(name = "METADATA_COLUMN")
    private String metadataColumn;
    /**
     * 数据类型
     */
    @Column(name = "DATA_TYPE")
    private String dataType;
    /**
     * 字段类型，“1”分组字段，“2”运算字段
     */
    @Column(name = "TYPE")
    private String type;
    /**
     * 分组方式，“1”按值分组，“2”按范围分组
     */
    @Column(name = "GROUP_TYPE")
    private String groupType;
    /**
     * 运算方式，“1”计数，“2”合计，“3”平均值，“4”最大值，“5”最小值，“6”中位数
     */
    @Column(name = "CALCULATE_TYPE")
    private String calculateType;
    /**
     * 排序方式，“0”默认，“1”升序，“2”降序
     */
    @Column(name = "ORDER_TYPE")
    private String orderType;
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

    public String getMetadataColumn() {
        return metadataColumn;
    }

    public void setMetadataColumn(String metadataColumn) {
        this.metadataColumn = metadataColumn;
    }

    public String getDataType() {
        return dataType;
    }

    public void setDataType(String dataType) {
        this.dataType = dataType;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getType() {
        return type;
    }

    public void setGroupType(String groupType) {
        this.groupType = groupType;
    }

    public String getGroupType() {
        return groupType;
    }

    public void setCalculateType(String calculateType) {
        this.calculateType = calculateType;
    }

    public String getCalculateType() {
        return calculateType;
    }

    public void setOrderType(String orderType) {
        this.orderType = orderType;
    }

    public String getOrderType() {
        return orderType;
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