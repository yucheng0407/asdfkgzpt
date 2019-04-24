package net.ruixin.domain.qbyp;

import net.ruixin.domain.plat.BaseDomain;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

import net.ruixin.enumerate.plat.SfyxSt;

import java.util.Date;

/**
 * 实体:Zfqy(重防区域)
 *
 * @author RXCoder  on 2019-4-9 11:50:14
 */

@Table(name = "T_AREA_ZFQY")
@Entity
@DynamicInsert
@DynamicUpdate
public class Zfqy extends BaseDomain {

    /**
     * 主键
     */
    @Id
    @SequenceGenerator(name = "seq_t_area_zfqy", sequenceName = "SEQ_T_AREA_ZFQY", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_t_area_zfqy")
    private Long id;
    /**
     * 重防区域名称
     */
    @Column(name = "MC")
    private String mc;
    /**
     * 所属单位
     */
    @Column(name = "SSDW")
    private Long ssdw;
    /**
     * 重防要求
     */
    @Column(name = "ZFYQ")
    private String zfyq;
    /**
     * 重防日期
     */
    @Column(name = "ZFRQ")
    private Date zfrq;
    /**
     * 重防区域图片附件
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

    public void setMc(String mc) {
        this.mc = mc;
    }

    public String getMc() {
        return mc;
    }

    public void setSsdw(Long ssdw) {
        this.ssdw = ssdw;
    }

    public Long getSsdw() {
        return ssdw;
    }

    public void setZfyq(String zfyq) {
        this.zfyq = zfyq;
    }

    public String getZfyq() {
        return zfyq;
    }

    public void setZfrq(Date zfrq) {
        this.zfrq = zfrq;
    }

    public Date getZfrq() {
        return zfrq;
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

}