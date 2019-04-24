package net.ruixin.domain.qzld;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import net.ruixin.domain.plat.BaseDomain;
import net.ruixin.domain.plat.json.CustomJsonDateDeserializer;
import net.ruixin.enumerate.plat.SfyxSt;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.Date;

@SuppressWarnings("unused")
@Table(name = "T_ZBBQ_RWD")
@Entity
@DynamicInsert
@DynamicUpdate
public class Bqgl extends BaseDomain {

    //id
    @Id
    @SequenceGenerator(name = "seq_t_zbbq_rwd", sequenceName = "SEQ_T_ZBBQ_RWD", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_t_zbbq_rwd")
    private Long id;

    //责任单位
    @Column(name = "ZRDW")
    private  Integer zrdw;

    //责任单位名称
    @Column(name = "ZRDWMC")
    private String zrdwmc;

    //值班开始时间
    @JsonDeserialize(using = CustomJsonDateDeserializer.class)
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "ZBKSSJ")
    private Date zbkssj;

    //值班结束时间
    @JsonDeserialize(using = CustomJsonDateDeserializer.class)
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "ZBJSSJ")
    private Date zbjssj;

    //值班领导
    @Column(name = "ZBLD")
    private Integer zbld;


    //值班领导姓名
    @Column(name = "ZBLDXM")
    private String zbldxm;

    //值班领导职务
    @Column(name = "ZBLDZW")
    private String zbldzw;

    //值班领导电话
    @Column(name = "ZBLDDH")
    private String zblddh;

   //值班室电话
    @Column(name = "ZBSDH")
    private  String zbsdh;

    //值班民警
    @Column(name = "ZBMJS")
    private  String zbmjs;


    //值班民警姓名
    @Column(name = "ZBMJMCS")
    private String zbmjmcs;


    //值班辅协警数量
    @Column(name = "ZBFXJSL")
    private Integer zbfxjsl;


    //备勤领导
    @Column(name = "BQLD")
    private Integer bqld;


    //备勤领导名称
    @Column(name = "BQLDMC")
    private String bqldmc;

    //备勤民警
    @Column(name = "BQMJS")
    private String bqmjs;

   // 备勤民警名称（多人）
    @Column(name = "BQMJMCS")
    private String bqmjmcs;

    //备勤辅协警数量
    @Column(name = "BQFXJSL")
    private  Integer bqfxjsl;

    //备注
    @Column(name = "BZ")
    private String bz;

    //创建人
    @Column(name = "CJR_ID")
    private Long cjrId;
    //创建时间
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "CJSJ")
    private Date cjsj;
    //修改人
    @Column(name = "XGR_ID")
    private Long xgrId;
    //修改时间
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "XGSJ")
    private Date xgsj;

    //是否发布
    @Column(name = "SFFB_ST")
    private String sffb_st;

    public String getSffb_st() {
        return sffb_st;
    }

    public void setSffb_st(String sffb_st) {
        this.sffb_st = sffb_st;
    }

    //有效标识:0无效，1有效
    @Enumerated
    @Column(name = "SFYX_ST")
    private SfyxSt sfyxSt;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getZrdw() {
        return zrdw;
    }

    public void setZrdw(Integer zrdw) {
        this.zrdw = zrdw;
    }

    public String getZrdwmc() {
        return zrdwmc;
    }

    public void setZrdwmc(String zrdwmc) {
        this.zrdwmc = zrdwmc;
    }

    public Date getZbkssj() {
        return zbkssj;
    }

    public void setZbkssj(Date zbkssj) {
        this.zbkssj = zbkssj;
    }

    public Date getZbjssj() {
        return zbjssj;
    }

    public void setZbjssj(Date zbjssj) {
        this.zbjssj = zbjssj;
    }

    public Integer getZbld() {
        return zbld;
    }

    public void setZbld(Integer zbld) {
        this.zbld = zbld;
    }

    public String getZbldxm() {
        return zbldxm;
    }

    public void setZbldxm(String zbldxm) {
        this.zbldxm = zbldxm;
    }

    public String getZbldzw() {
        return zbldzw;
    }

    public void setZbldzw(String zbldzw) {
        this.zbldzw = zbldzw;
    }

    public String getZblddh() {
        return zblddh;
    }

    public void setZblddh(String zblddh) {
        this.zblddh = zblddh;
    }

    public String getZbsdh() {
        return zbsdh;
    }

    public void setZbsdh(String zbsdh) {
        this.zbsdh = zbsdh;
    }

    public String getZbmjs() {
        return zbmjs;
    }

    public void setZbmjs(String zbmjs) {
        this.zbmjs = zbmjs;
    }

    public String getZbmjmcs() {
        return zbmjmcs;
    }

    public void setZbmjmcs(String zbmjmcs) {
        this.zbmjmcs = zbmjmcs;
    }

    public Integer getZbfxjsl() {
        return zbfxjsl;
    }

    public void setZbfxjsl(Integer zbfxjsl) {
        this.zbfxjsl = zbfxjsl;
    }

    public Integer getBqld() {
        return bqld;
    }

    public void setBqld(Integer bqld) {
        this.bqld = bqld;
    }

    public String getBqldmc() {
        return bqldmc;
    }

    public void setBqldmc(String bqldmc) {
        this.bqldmc = bqldmc;
    }

    public String getBqmjs() {
        return bqmjs;
    }

    public void setBqmjs(String bqmjs) {
        this.bqmjs = bqmjs;
    }

    public String getBqmjmcs() {
        return bqmjmcs;
    }

    public void setBqmjmcs(String bqmjmcs) {
        this.bqmjmcs = bqmjmcs;
    }

    public Integer getBqfxjsl() {
        return bqfxjsl;
    }

    public void setBqfxjsl(Integer bqfxjsl) {
        this.bqfxjsl = bqfxjsl;
    }

    public String getBz() {
        return bz;
    }

    public void setBz(String bz) {
        this.bz = bz;
    }

    public Long getCjrId() {
        return cjrId;
    }

    public void setCjrId(Long cjrId) {
        this.cjrId = cjrId;
    }

    public Date getCjsj() {
        return cjsj;
    }

    public void setCjsj(Date cjsj) {
        this.cjsj = cjsj;
    }

    public Long getXgrId() {
        return xgrId;
    }

    public void setXgrId(Long xgrId) {
        this.xgrId = xgrId;
    }

    public Date getXgsj() {
        return xgsj;
    }

    public void setXgsj(Date xgsj) {
        this.xgsj = xgsj;
    }

    public SfyxSt getSfyxSt() {
        return sfyxSt;
    }

    public void setSfyxSt(SfyxSt sfyxSt) {
        this.sfyxSt = sfyxSt;
    }
}
