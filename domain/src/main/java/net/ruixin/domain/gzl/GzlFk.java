package net.ruixin.domain.gzl;

import com.vividsolutions.jts.geom.Geometry;
import net.ruixin.domain.plat.BaseDomain;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

import net.ruixin.enumerate.plat.SfyxSt;

import java.util.Date;

/**
 * 实体:GzlFk(工作流反馈)
 *
 * @author RXCoder  on 2019-4-9 11:54:03
 */

@Table(name = "T_GZL_FK")
@Entity
@DynamicInsert
@DynamicUpdate
public class GzlFk extends BaseDomain {

    /**
     * 主键
     */
    @Id
    @SequenceGenerator(name = "seq_t_gzl_fk", sequenceName = "SEQ_T_GZL_FK", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_t_gzl_fk")
    private Long id;
    /**
     * 接收ID
     */
    @Column(name = "JSID")
    private Long jsid;
    /**
     * 反馈内容
     */
    @Column(name = "NR")
    private String nr;
    /**
     * 上传附件
     */
    @Column(name = "FJID")
    private String fjid;

    /**
     * 反馈消息类型 文本:txt 图片:img 视频:video 音频:audio
     */
    @Column(name = "MSGTYPE")
    private String msgType;

    /**
     * 位置信息
     */
    @Column(name = "SHAPE")
    private Geometry shape;
    /**
     * 反馈人（创建人）
     */
    @Column(name = "CJR_ID")
    private Long cjrId;
    /**
     * 反馈时间（创建时间）
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

    public String getMsgType() {
        return msgType;
    }

    public void setMsgType(String msgType) {
        this.msgType = msgType;
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