package net.ruixin.domain.gzl;

import com.vividsolutions.jts.geom.Geometry;
import net.ruixin.domain.plat.BaseDomain;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

import net.ruixin.enumerate.plat.SfyxSt;

import java.util.Date;

/**
 * 实体:HlwFb(互联网-发布)
 *
 * @author RXCoder  on 2019-4-9 11:54:20
 */

@Table(name = "T_GZL_HLW_FB")
@Entity
@DynamicInsert
@DynamicUpdate
public class HlwFb extends BaseDomain {

    /**
     * 主键
     */
    @Id
    @SequenceGenerator(name = "seq_t_gzl_hlw_fb", sequenceName = "SEQ_T_GZL_HLW_FB", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_t_gzl_hlw_fb")
    private Long id;
    /**
     * 标题
     */
    @Column(name = "BT")
    private String bt;
    /**
     * 内容
     */
    @Column(name = "NR")
    private String nr;
    /**
     * （线索）紧急程度 1-紧急，2-一般 3-不紧急
     */
    @Column(name = "JJCD")
    private String jjcd;
    /**
     * （线索）事件状态 1-已解决，2-解决中，3-未解决
     */
    @Column(name = "SJZT")
    private String sjzt;
    /**
     * （护航扶贫攻坚）扶贫点
     */
    @Column(name = "FPD")
    private Long fpd;
    /**
     * 数据类型（不同数据来源对应不同字典）
     */
    @Column(name = "SJLX")
    private String sjlx;
    /**
     * 阅读状态（发布人） 0-未读，1-已读
     */
    @Column(name = "YDZT")
    private String ydzt;
    /**
     * 发布人位置信息
     */
    @Column(name = "SHAPE")
    private Geometry shape;
    /**
     * 上传附件
     */
    @Column(name = "FJID")
    private String fjid;
    /**
     * 数据类型：1-指令 2-线索 3-纠纷调解 4-治安防范 5-重点关注 6-治安宣传 7-护航扶贫攻坚
     */
    @Column(name = "SJLYLX")
    private String sjlylx;
    /**
     * 发布单位
     */
    @Column(name = "FBDW")
    private Long fbdw;
    /**
     * 发布单位名称
     */
    @Column(name = "FBDWMC")
    private String fbdwmc;
    /**
     * 发布人姓名
     */
    @Column(name = "CJRMC")
    private String cjrmc;
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

    /**
     * 数据类型对应字典CODE：ZLLX (指令)，XSLX(线索)，LDLX(联勤联动)，FKFKLX(防控反馈) ，FFFKLX(防范反馈)，HHFPGJ(护航扶贫攻坚)
     */
    @Column(name = "SJLXZD")
    private String sjlxzd;

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setBt(String bt) {
        this.bt = bt;
    }

    public String getBt() {
        return bt;
    }

    public void setNr(String nr) {
        this.nr = nr;
    }

    public String getNr() {
        return nr;
    }

    public void setJjcd(String jjcd) {
        this.jjcd = jjcd;
    }

    public String getJjcd() {
        return jjcd;
    }

    public void setSjzt(String sjzt) {
        this.sjzt = sjzt;
    }

    public String getSjzt() {
        return sjzt;
    }

    public void setFpd(Long fpd) {
        this.fpd = fpd;
    }

    public Long getFpd() {
        return fpd;
    }

    public void setSjlx(String sjlx) {
        this.sjlx = sjlx;
    }

    public String getSjlx() {
        return sjlx;
    }

    public void setYdzt(String ydzt) {
        this.ydzt = ydzt;
    }

    public String getYdzt() {
        return ydzt;
    }

    public void setFjid(String fjid) {
        this.fjid = fjid;
    }

    public String getFjid() {
        return fjid;
    }

    public void setSjlylx(String sjlylx) {
        this.sjlylx = sjlylx;
    }

    public String getSjlylx() {
        return sjlylx;
    }

    public void setFbdw(Long fbdw) {
        this.fbdw = fbdw;
    }

    public Long getFbdw() {
        return fbdw;
    }

    public void setFbdwmc(String fbdwmc) {
        this.fbdwmc = fbdwmc;
    }

    public String getFbdwmc() {
        return fbdwmc;
    }

    public void setCjrmc(String cjrmc) {
        this.cjrmc = cjrmc;
    }

    public String getCjrmc() {
        return cjrmc;
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

    public String getSjlxzd() {
        return sjlxzd;
    }

    public void setSjlxzd(String sjlxzd) {
        this.sjlxzd = sjlxzd;
    }
}