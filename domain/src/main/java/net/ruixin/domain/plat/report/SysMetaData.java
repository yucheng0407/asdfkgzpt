package net.ruixin.domain.plat.report;

import net.ruixin.domain.plat.BaseDomain;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

import net.ruixin.enumerate.plat.SfyxSt;

import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * 实体:SysMetaData(元数据)
 *
 * @author RXCoder  on 2018-8-20 9:16:01
 */

@Table(name = "SYS_METADATA")
@Entity
@DynamicInsert
@DynamicUpdate
public class SysMetaData extends BaseDomain {

    /**
     * 主键
     */
    @Id
    @SequenceGenerator(name = "seq_sys_metadata", sequenceName = "SEQ_SYS_METADATA", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_sys_metadata")
    private Long id;
    /**
     * 元数据名称
     */
    @Column(name = "NAME")
    private String name;
    /**
     * 元数据编码
     */
    @Column(name = "CODE")
    private String code;
    /**
     * 实现类型，“1”数据表，“2”视图，“3”程序
     */
    @Column(name = "TYPE")
    private String type;
    /**
     * 实现细节，数据表名/视图名/程序包+方法名
     */
    @Column(name = "DETAIL")
    private String detail;
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
    /**
     * 元数据字段
     */
    @Transient
    List<Map> columns;

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

    public void setCode(String code) {
        this.code = code;
    }

    public String getCode() {
        return code;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getType() {
        return type;
    }

    public void setDetail(String detail) {
        this.detail = detail;
    }

    public String getDetail() {
        return detail;
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

    public List<Map> getColumns() {
        return columns;
    }

    public void setColumns(List<Map> columns) {
        this.columns = columns;
    }
}