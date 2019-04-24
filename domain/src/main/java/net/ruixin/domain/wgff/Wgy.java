package net.ruixin.domain.wgff;
import net.ruixin.domain.plat.BaseDomain;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import javax.persistence.*;

import net.ruixin.enumerate.plat.SfyxSt;
import java.util.Date;

/**
 * 实体:Wgy(网格员信息)
 *
 * @author RXCoder  on 2019-4-9 11:57:15
 */

@Table(name = "T_WGDW_WGY")
@Entity
@DynamicInsert
@DynamicUpdate
public class Wgy extends BaseDomain{
      
    /**
     * 主键
     */
    @Id
    @SequenceGenerator(name = "seq_t_wgdw_wgy", sequenceName = "SEQ_T_WGDW_WGY", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_t_wgdw_wgy")
    private Long id;
        /**
     * 姓名
     */
    @Column(name = "XM")
    private String xm;
        /**
     * 职业
     */
    @Column(name = "ZY")
    private String zy;
        /**
     * 性别 1-男 2-女 3-其他
     */
    @Column(name = "XB")
    private String xb;
        /**
     * 民族
     */
    @Column(name = "MZ")
    private String mz;
        /**
     * 身份证号
     */
    @Column(name = "SFZH")
    private String sfzh;
        /**
     * 联系电话
     */
    @Column(name = "LXDH")
    private String lxdh;
        /**
     * 文化程度
     */
    @Column(name = "WHCD")
    private String whcd;
        /**
     * 政治面貌
     */
    @Column(name = "ZZMM")
    private String zzmm;
        /**
     * 所属派出所
     */
    @Column(name = "SSPCS")
    private String sspcs;
        /**
     * 所属社区
     */
    @Column(name = "SSSQ")
    private String sssq;
        /**
     * 所属网格
     */
    @Column(name = "SSWG")
    private String sswg;
        /**
     * 网格责任民警
     */
    @Column(name = "ZRMJ")
    private Long zrmj;
        /**
     * 住址
     */
    @Column(name = "ZZ")
    private String zz;
        /**
     * 备注
     */
    @Column(name = "BZ")
    private String bz;
        /**
     * 头像
     */
    @Column(name = "TPID")
    private String tpid;
        /**
     * 是否重点人员 0-不是 1-是
     */
    @Column(name = "SFZDRY")
    private String sfzdry;
        /**
     * 重点人员类型
     */
    @Column(name = "ZDRYLX")
    private String zdrylx;
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

    public void setXm(String xm) {
        this.xm = xm;
    }

    public String getXm() {
        return xm;
    }

    public void setZy(String zy) {
        this.zy = zy;
    }

    public String getZy() {
        return zy;
    }

    public void setXb(String xb) {
        this.xb = xb;
    }

    public String getXb() {
        return xb;
    }

    public void setMz(String mz) {
        this.mz = mz;
    }

    public String getMz() {
        return mz;
    }

    public void setSfzh(String sfzh) {
        this.sfzh = sfzh;
    }

    public String getSfzh() {
        return sfzh;
    }

    public void setLxdh(String lxdh) {
        this.lxdh = lxdh;
    }

    public String getLxdh() {
        return lxdh;
    }

    public void setWhcd(String whcd) {
        this.whcd = whcd;
    }

    public String getWhcd() {
        return whcd;
    }

    public void setZzmm(String zzmm) {
        this.zzmm = zzmm;
    }

    public String getZzmm() {
        return zzmm;
    }

    public void setSspcs(String sspcs) {
        this.sspcs = sspcs;
    }

    public String getSspcs() {
        return sspcs;
    }

    public void setSssq(String sssq) {
        this.sssq = sssq;
    }

    public String getSssq() {
        return sssq;
    }

    public void setSswg(String sswg) {
        this.sswg = sswg;
    }

    public String getSswg() {
        return sswg;
    }

    public void setZrmj(Long zrmj) {
        this.zrmj = zrmj;
    }

    public Long getZrmj() {
        return zrmj;
    }

    public void setZz(String zz) {
        this.zz = zz;
    }

    public String getZz() {
        return zz;
    }

    public void setBz(String bz) {
        this.bz = bz;
    }

    public String getBz() {
        return bz;
    }

    public void setTpid(String tpid) {
        this.tpid = tpid;
    }

    public String getTpid() {
        return tpid;
    }

    public void setSfzdry(String sfzdry) {
        this.sfzdry = sfzdry;
    }

    public String getSfzdry() {
        return sfzdry;
    }

    public void setZdrylx(String zdrylx) {
        this.zdrylx = zdrylx;
    }

    public String getZdrylx() {
        return zdrylx;
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