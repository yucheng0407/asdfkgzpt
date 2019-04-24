package net.ruixin.domain.jmfk;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import net.ruixin.domain.plat.BaseDomain;
import net.ruixin.domain.plat.json.CustomJsonDateDeserializer;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

import net.ruixin.enumerate.plat.SfyxSt;

import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * 实体:FkapRwd(防控安排表)
 *
 * @author RXCoder  on 2019-4-9 11:52:01
 */

@Table(name = "T_FKAP_RWD")
@Entity
@DynamicInsert
@DynamicUpdate
public class FkapRwd extends BaseDomain {

    /**
     * 主键
     */
    @Id
    @SequenceGenerator(name = "seq_t_fkap_rwd", sequenceName = "SEQ_T_FKAP_RWD", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_t_fkap_rwd")
    private Long id;
    /**
     * 责任单位
     */
    @Column(name = "ZRDW")
    private Long zrdw;
    /**
     * 责任单位名称
     */
    @Column(name = "ZRDWMC")
    private String zrdwmc;
    /**
     * 巡组
     */
    @Column(name = "XZ")
    private String xz;
    /**
     * 巡防开始时间（年月日时分秒）
     */
    @JsonDeserialize(using = CustomJsonDateDeserializer.class)
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "XFKSSJ")
    private Date xfkssj;
    /**
     * 巡防结束时间（年月日时分秒）
     */
    @JsonDeserialize(using = CustomJsonDateDeserializer.class)
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "XFJSSJ")
    private Date xfjssj;
    /**
     * 巡区类型 1-常规巡区 2-临时巡区
     */
    @Column(name = "XQLX")
    private String xqlx;
    /**
     * 巡区
     */
    @Column(name = "XQID")
    private Long xqid;


    /**
     * 巡区名称
     * */
    @Transient
    private String xqmc;
    public String getXqmc() {
        return xqmc;
    }

    public void setXqmc(String xqmc) {
        this.xqmc = xqmc;
    }

    /***
     * 重防巡区名称
     * */
    @Transient
    private String zfxqmc;
    public String getZfxqmc() {
        return zfxqmc;
    }
    public void setZfxqmc(String zfxqmc) {
        this.zfxqmc = zfxqmc;
    }
    /***
     * 重防时段
     * */
    @Transient
    private String zfsd;
    public String getZfsd() {
        return zfsd;
    }

    public void setZfsd(String zfsd) {
        this.zfsd = zfsd;
    }


    /**
     * 设备
     * */
    @Transient
    private List<Map> Sbs;

    public List<Map> getSbs() {
        return Sbs;
    }

    public void setSb(List<Map> sbs) {
        Sbs = sbs;
    }

    /**
     * 任务类型：1-常规任务，2-临时任务，3-大型安保任务
     */
    @Column(name = "RWLX")
    private String rwlx;
    /**
     * 巡防方式： 1-警车巡，2-步巡，3-摩托车巡，4-其他
     */
    @Column(name = "XFFS")
    private String xffs;
    /**
     * 值班民警（多人）
     */
    @Column(name = "ZRMJS")
    private String zrmjs;
    /**
     * 值班民警名称（多人）
     */
    @Column(name = "ZRMJMCS")
    private String zrmjmcs;
    /**
     * 重防区域
     */
    @Column(name = "ZFQY")
    private Long zfqy;
    /**
     * 备注
     */
    @Column(name = "BZ")
    private String bz;
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

    public void setZrdw(Long zrdw) {
        this.zrdw = zrdw;
    }

    public Long getZrdw() {
        return zrdw;
    }

    public void setZrdwmc(String zrdwmc) {
        this.zrdwmc = zrdwmc;
    }

    public String getZrdwmc() {
        return zrdwmc;
    }

    public void setXz(String xz) {
        this.xz = xz;
    }

    public String getXz() {
        return xz;
    }

    public void setXfkssj(Date xfkssj) {
        this.xfkssj = xfkssj;
    }

    public Date getXfkssj() {
        return xfkssj;
    }

    public void setXfjssj(Date xfjssj) {
        this.xfjssj = xfjssj;
    }

    public Date getXfjssj() {
        return xfjssj;
    }

    public void setXqlx(String xqlx) {
        this.xqlx = xqlx;
    }

    public String getXqlx() {
        return xqlx;
    }

    public void setXqid(Long xqid) {
        this.xqid = xqid;
    }

    public Long getXqid() {
        return xqid;
    }

    public void setRwlx(String rwlx) {
        this.rwlx = rwlx;
    }

    public String getRwlx() {
        return rwlx;
    }

    public void setXffs(String xffs) {
        this.xffs = xffs;
    }

    public String getXffs() {
        return xffs;
    }

    public void setZrmjs(String zrmjs) {
        this.zrmjs = zrmjs;
    }

    public String getZrmjs() {
        return zrmjs;
    }

    public void setZrmjmcs(String zrmjmcs) {
        this.zrmjmcs = zrmjmcs;
    }

    public String getZrmjmcs() {
        return zrmjmcs;
    }

    public void setZfqy(Long zfqy) {
        this.zfqy = zfqy;
    }

    public Long getZfqy() {
        return zfqy;
    }

    public void setBz(String bz) {
        this.bz = bz;
    }

    public String getBz() {
        return bz;
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