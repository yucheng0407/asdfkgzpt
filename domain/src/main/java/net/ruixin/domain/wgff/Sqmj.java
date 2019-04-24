package net.ruixin.domain.wgff;
import net.ruixin.domain.plat.BaseDomain;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import javax.persistence.*;

import net.ruixin.enumerate.plat.SfyxSt;
import java.util.Date;

/**
 * 实体:Sqmj(网格队伍-社区民警信息)
 *
 * @author RXCoder  on 2019-4-9 11:56:53
 */

@Table(name = "T_WGDW_SQMJ")
@Entity
@DynamicInsert
@DynamicUpdate
public class Sqmj extends BaseDomain{
      
    /**
     * 主键
     */
    @Id
    @SequenceGenerator(name = "seq_t_wgdw_sqmj", sequenceName = "SEQ_T_WGDW_SQMJ", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_t_wgdw_sqmj")
    private Long id;
        /**
     * 用户表关联ID
     */
    @Column(name = "SYSUSER_ID")
    private Long sysuserId;
        /**
     * 姓名
     */
    @Column(name = "XM")
    private String xm;
        /**
     * 联系电话
     */
    @Column(name = "LXDH")
    private String lxdh;
        /**
     * 所属派出所
     */
    @Column(name = "SSPCS")
    private String sspcs;
        /**
     * 管辖社区（多个以,分隔）
     */
    @Column(name = "GXSQ")
    private String gxsq;
        /**
     * 管辖网格（多个以,分隔）
     */
    @Column(name = "GXWG")
    private String gxwg;
        /**
     * 关联设备（多个以,分隔）
     */
    @Column(name = "GLSB")
    private String glsb;
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

    public void setSysuserId(Long sysuserId) {
        this.sysuserId = sysuserId;
    }

    public Long getSysuserId() {
        return sysuserId;
    }

    public void setXm(String xm) {
        this.xm = xm;
    }

    public String getXm() {
        return xm;
    }

    public void setLxdh(String lxdh) {
        this.lxdh = lxdh;
    }

    public String getLxdh() {
        return lxdh;
    }

    public void setSspcs(String sspcs) {
        this.sspcs = sspcs;
    }

    public String getSspcs() {
        return sspcs;
    }

    public void setGxsq(String gxsq) {
        this.gxsq = gxsq;
    }

    public String getGxsq() {
        return gxsq;
    }

    public void setGxwg(String gxwg) {
        this.gxwg = gxwg;
    }

    public String getGxwg() {
        return gxwg;
    }

    public void setGlsb(String glsb) {
        this.glsb = glsb;
    }

    public String getGlsb() {
        return glsb;
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