package net.ruixin.domain.qbyp;
import net.ruixin.domain.plat.BaseDomain;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import javax.persistence.*;

import net.ruixin.enumerate.plat.SfyxSt;
import java.util.Date;

/**
 * 实体:Ajxx(案件信息)
 *
 * @author RXCoder  on 2019-4-9 11:47:55
 */

@Table(name = "T_AJST_AJXX")
@Entity
@DynamicInsert
@DynamicUpdate
public class Ajxx extends BaseDomain{
      
    /**
     * 主键
     */
    @Id
    @SequenceGenerator(name = "seq_t_ajst_ajxx", sequenceName = "SEQ_T_AJST_AJXX", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_t_ajst_ajxx")
    private Long id;
        /**
     * 案件编号
     */
    @Column(name = "AJBH")
    private String ajbh;
        /**
     * 案件名称
     */
    @Column(name = "AJMC")
    private String ajmc;
        /**
     * 案件类型 字典项 1-接处警，2-民事纠纷，3-刑事案件，4-行政案件，5-其他
     */
    @Column(name = "AJLX")
    private String ajlx;
        /**
     * 案件类别 字典项
     */
    @Column(name = "AJLB")
    private String ajlb;
        /**
     * 案件状态 字典项
     */
    @Column(name = "AJZT")
    private String ajzt;
        /**
     * 案由 字典项
     */
    @Column(name = "AY")
    private String ay;
        /**
     * 案件性质 字典项
     */
    @Column(name = "AJXZ")
    private String ajxz;
        /**
     * 是否侵犯财产案：0-否 1-是
     */
    @Column(name = "SFQFCCA_ST")
    private String sfqfccaSt;
        /**
     * 是否命案：0-否 1-是
     */
    @Column(name = "SFMA_ST")
    private String sfmaSt;
        /**
     * 是否涉枪案：0-否 1-是
     */
    @Column(name = "SFSQA_ST")
    private String sfsqaSt;
        /**
     * 是否涉嫌非法交易：0-否 1-是
     */
    @Column(name = "SFSXFFJY_ST")
    private String sfsxffjySt;
        /**
     * 是否涉嫌勒索：0-否 1-是
     */
    @Column(name = "SFSXLS_ST")
    private String sfsxlsSt;
        /**
     * 是否涉外：0-否 1-是
     */
    @Column(name = "SFSW_ST")
    private String sfswSt;
        /**
     * 发现时间起
     */
    @Column(name = "FXSJQ")
    private Date fxsjq;
        /**
     * 发现时间止
     */
    @Column(name = "FXSJZ")
    private Date fxsjz;
        /**
     * 发案时间止
     */
    @Column(name = "AFSJQ")
    private Date afsjq;
        /**
     * 发案时间止
     */
    @Column(name = "AFSJZ")
    private Date afsjz;
        /**
     * 发案地行政区划
     */
    @Column(name = "FAXZQH")
    private Long faxzqh;
        /**
     * 发案社区
     */
    @Column(name = "FASQ")
    private Long fasq;
        /**
     * 发案地点
     */
    @Column(name = "FADD")
    private String fadd;
        /**
     * 死亡人数
     */
    @Column(name = "SWRS")
    private Long swrs;
        /**
     * 受伤人数
     */
    @Column(name = "SSRS")
    private Long ssrs;
        /**
     * 损失总价值
     */
    @Column(name = "SSZJZ")
    private Long sszjz;
        /**
     * 案情关键词
     */
    @Column(name = "AJGJC")
    private String ajgjc;
        /**
     * 简要案情
     */
    @Column(name = "AYAQ")
    private String ayaq;
        /**
     * 位置信息
     */
//    @Column(name = "SHAPE")
//    private UNKNOWN shape;
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

    public void setAjbh(String ajbh) {
        this.ajbh = ajbh;
    }

    public String getAjbh() {
        return ajbh;
    }

    public void setAjmc(String ajmc) {
        this.ajmc = ajmc;
    }

    public String getAjmc() {
        return ajmc;
    }

    public void setAjlx(String ajlx) {
        this.ajlx = ajlx;
    }

    public String getAjlx() {
        return ajlx;
    }

    public void setAjlb(String ajlb) {
        this.ajlb = ajlb;
    }

    public String getAjlb() {
        return ajlb;
    }

    public void setAjzt(String ajzt) {
        this.ajzt = ajzt;
    }

    public String getAjzt() {
        return ajzt;
    }

    public void setAy(String ay) {
        this.ay = ay;
    }

    public String getAy() {
        return ay;
    }

    public void setAjxz(String ajxz) {
        this.ajxz = ajxz;
    }

    public String getAjxz() {
        return ajxz;
    }

    public void setSfqfccaSt(String sfqfccaSt) {
        this.sfqfccaSt = sfqfccaSt;
    }

    public String getSfqfccaSt() {
        return sfqfccaSt;
    }

    public void setSfmaSt(String sfmaSt) {
        this.sfmaSt = sfmaSt;
    }

    public String getSfmaSt() {
        return sfmaSt;
    }

    public void setSfsqaSt(String sfsqaSt) {
        this.sfsqaSt = sfsqaSt;
    }

    public String getSfsqaSt() {
        return sfsqaSt;
    }

    public void setSfsxffjySt(String sfsxffjySt) {
        this.sfsxffjySt = sfsxffjySt;
    }

    public String getSfsxffjySt() {
        return sfsxffjySt;
    }

    public void setSfsxlsSt(String sfsxlsSt) {
        this.sfsxlsSt = sfsxlsSt;
    }

    public String getSfsxlsSt() {
        return sfsxlsSt;
    }

    public void setSfswSt(String sfswSt) {
        this.sfswSt = sfswSt;
    }

    public String getSfswSt() {
        return sfswSt;
    }

    public void setFxsjq(Date fxsjq) {
        this.fxsjq = fxsjq;
    }

    public Date getFxsjq() {
        return fxsjq;
    }

    public void setFxsjz(Date fxsjz) {
        this.fxsjz = fxsjz;
    }

    public Date getFxsjz() {
        return fxsjz;
    }

    public void setAfsjq(Date afsjq) {
        this.afsjq = afsjq;
    }

    public Date getAfsjq() {
        return afsjq;
    }

    public void setAfsjz(Date afsjz) {
        this.afsjz = afsjz;
    }

    public Date getAfsjz() {
        return afsjz;
    }

    public void setFaxzqh(Long faxzqh) {
        this.faxzqh = faxzqh;
    }

    public Long getFaxzqh() {
        return faxzqh;
    }

    public void setFasq(Long fasq) {
        this.fasq = fasq;
    }

    public Long getFasq() {
        return fasq;
    }

    public void setFadd(String fadd) {
        this.fadd = fadd;
    }

    public String getFadd() {
        return fadd;
    }

    public void setSwrs(Long swrs) {
        this.swrs = swrs;
    }

    public Long getSwrs() {
        return swrs;
    }

    public void setSsrs(Long ssrs) {
        this.ssrs = ssrs;
    }

    public Long getSsrs() {
        return ssrs;
    }

    public void setSszjz(Long sszjz) {
        this.sszjz = sszjz;
    }

    public Long getSszjz() {
        return sszjz;
    }

    public void setAjgjc(String ajgjc) {
        this.ajgjc = ajgjc;
    }

    public String getAjgjc() {
        return ajgjc;
    }

    public void setAyaq(String ayaq) {
        this.ayaq = ayaq;
    }

    public String getAyaq() {
        return ayaq;
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