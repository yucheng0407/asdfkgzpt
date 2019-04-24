package net.ruixin.domain.gzl;

import com.vividsolutions.jts.geom.Geometry;
import net.ruixin.domain.plat.BaseDomain;
import net.ruixin.enumerate.plat.SfyxSt;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

import java.util.Date;

/**
 * 实体:GzlJxfb(工作流-继续发布)
 *
 * @author RXCoder  on 2019-4-9 11:55:38
 */

@Table(name = "T_GZL_JXFB")
@Entity
@DynamicInsert
@DynamicUpdate
public class GzlJxfb extends BaseDomain {

    /**
     * 主键
     */
    @Id
    @SequenceGenerator(name = "seq_t_gzl_jxfb", sequenceName = "SEQ_T_GZL_JXFB", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_t_gzl_jxfb")
    private Long id;
    /**
     * 工作流发布ID
     */
    @Column(name = "FBID")
    private Long fbid;
    /**
     * 工作流接收ID
     */
    @Column(name = "JSID")
    private Long jsid;
    /**
     * 继续发布内容
     */
    @Column(name = "NR")
    private String nr;
    /**
     * 上传附件
     */
    @Column(name = "FJID")
    private String fjid;
    /**
     * 继续上报位置信息
     */
    @Column(name = "SHAPE")
    private Geometry shape;
    /**
     * 上报人（创建人）
     */
    @Column(name = "CJR_ID")
    private Long cjrId;
    /**
     * 上报时间（创建时间）
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

    public void setFbid(Long fbid) {
        this.fbid = fbid;
    }

    public Long getFbid() {
        return fbid;
    }

    public void setJsid(Long jsid) {
        this.jsid = jsid;
    }

    public Long getJsid() {
        return jsid;
    }

    public void setNr(String nr) {
        this.nr = nr;
    }

    public String getNr() {
        return nr;
    }

    public void setFjid(String fjid) {
        this.fjid = fjid;
    }

    public String getFjid() {
        return fjid;
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

    public Geometry getShape() {
        return shape;
    }

    public void setShape(Geometry shape) {
        this.shape = shape;
    }

    public SfyxSt getSfyxSt() {
        return sfyxSt;
    }

    public void setSfyxSt(SfyxSt sfyxSt) {
        this.sfyxSt = sfyxSt;
    }
}