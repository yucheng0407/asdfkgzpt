package net.ruixin.domain.qbyp;

import net.ruixin.domain.plat.BaseDomain;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

import net.ruixin.enumerate.plat.SfyxSt;

import java.util.Date;

/**
 * 实体:Zfsj(重防区域-重防时间)
 *
 * @author RXCoder  on 2019-4-9 11:50:39
 */

@Table(name = "T_AREA_ZFSJ")
@Entity
@DynamicInsert
@DynamicUpdate
public class Zfsj extends BaseDomain {

    /**
     * 主键
     */
    @Id
    @SequenceGenerator(name = "seq_t_area_zfsj", sequenceName = "SEQ_T_AREA_ZFSJ", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_t_area_zfsj")
    private Long id;
    /**
     * 重防区域ID
     */
    @Column(name = "ZFID")
    private Long zfid;
    /**
     * 重防开始时间
     */
    @Column(name = "ZFKSSJ")
    private Date zfkssj;
    /**
     * 重防结束时间
     */
    @Column(name = "ZFJSSJ")
    private Date zfjssj;
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

    public void setZfid(Long zfid) {
        this.zfid = zfid;
    }

    public Long getZfid() {
        return zfid;
    }

    public void setZfkssj(Date zfkssj) {
        this.zfkssj = zfkssj;
    }

    public Date getZfkssj() {
        return zfkssj;
    }

    public void setZfjssj(Date zfjssj) {
        this.zfjssj = zfjssj;
    }

    public Date getZfjssj() {
        return zfjssj;
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