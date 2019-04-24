package net.ruixin.domain.qbyp;

import com.vividsolutions.jts.geom.Geometry;
import net.ruixin.domain.plat.BaseDomain;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

import net.ruixin.enumerate.plat.SfyxSt;

import java.util.Date;

/**
 * 实体:Xqb(巡区表)
 *
 * @author RXCoder  on 2019-4-9 11:49:31
 */

@Table(name = "T_AREA_XQB")
@Entity
@DynamicInsert
@DynamicUpdate
public class Xqb extends BaseDomain {

    /**
     * 主键
     */
    @Id
    @SequenceGenerator(name = "seq_t_area_xqb", sequenceName = "SEQ_T_AREA_XQB", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_t_area_xqb")
    private Long id;
    /**
     * 巡区名称
     */
    @Column(name = "XQMC")
    private String xqmc;
    /**
     * 巡区类型：1-常规巡区 2-临时巡区
     */
    @Column(name = "XQLX")
    private String xqlx;
    /**
     * 所属单位
     */
    @Column(name = "SSDW")
    private Long ssdw;
    /**
     * 位置信息
     */
    @Column(name = "SHAPE")
    private Geometry shape;
    /**
     * 巡区图片附件
     */
    @Column(name = "TPFJ")
    private String tpfj;
    /**
     * 发布人（创建人）
     */
    @Column(name = "CJR_ID")
    private Long cjrId;
    /**
     * 发布时间（创建时间）
     */
    @Column(name = "CJSJ")
    private Date cjsj;
    /**
     * 修改人
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

    public void setXqmc(String xqmc) {
        this.xqmc = xqmc;
    }

    public String getXqmc() {
        return xqmc;
    }

    public void setXqlx(String xqlx) {
        this.xqlx = xqlx;
    }

    public String getXqlx() {
        return xqlx;
    }

    public void setSsdw(Long ssdw) {
        this.ssdw = ssdw;
    }

    public Long getSsdw() {
        return ssdw;
    }

    public void setTpfj(String tpfj) {
        this.tpfj = tpfj;
    }

    public String getTpfj() {
        return tpfj;
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

    public Geometry getShape() {
        return shape;
    }

    public void setShape(Geometry shape) {
        this.shape = shape;
    }
}