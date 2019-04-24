package net.ruixin.domain.gzl;
import net.ruixin.domain.plat.BaseDomain;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import javax.persistence.*;

import net.ruixin.enumerate.plat.SfyxSt;
import java.util.Date;

/**
 * 实体:GzlJs(工作流-接收)
 *
 * @author RXCoder  on 2019-4-9 11:55:22
 */

@Table(name = "T_GZL_JS")
@Entity
@DynamicInsert
@DynamicUpdate
public class GzlJs extends BaseDomain{
      
    /**
     * 主键
     */
    @Id
    @SequenceGenerator(name = "seq_t_gzl_js", sequenceName = "SEQ_T_GZL_JS", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_t_gzl_js")
    private Long id;
        /**
     * 线索ID
     */
    @Column(name = "FBID")
    private Long fbid;
        /**
     * 阅读状态（接收人）0-未读，1-已读
     */
    @Column(name = "YDZT")
    private String ydzt;
        /**
     * 反馈状态 0-未反馈，1-已反馈
     */
    @Column(name = "FKZT")
    private String fkzt;
        /**
     * 接收人ID
     */
    @Column(name = "JRS_ID")
    private Long jrsId;
        /**
     * 接收人姓名
     */
    @Column(name = "JSRMC")
    private String jsrmc;
        /**
     * 接收单位
     */
    @Column(name = "JSDW")
    private Long jsdw;
        /**
     * 接收单位名称
     */
    @Column(name = "JSDWMC")
    private String jsdwmc;
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

    public void setFbid(Long fbid) {
        this.fbid = fbid;
    }

    public Long getFbid() {
        return fbid;
    }

    public void setYdzt(String ydzt) {
        this.ydzt = ydzt;
    }

    public String getYdzt() {
        return ydzt;
    }

    public void setFkzt(String fkzt) {
        this.fkzt = fkzt;
    }

    public String getFkzt() {
        return fkzt;
    }

    public void setJrsId(Long jrsId) {
        this.jrsId = jrsId;
    }

    public Long getJrsId() {
        return jrsId;
    }

    public void setJsrmc(String jsrmc) {
        this.jsrmc = jsrmc;
    }

    public String getJsrmc() {
        return jsrmc;
    }

    public void setJsdw(Long jsdw) {
        this.jsdw = jsdw;
    }

    public Long getJsdw() {
        return jsdw;
    }

    public void setJsdwmc(String jsdwmc) {
        this.jsdwmc = jsdwmc;
    }

    public String getJsdwmc() {
        return jsdwmc;
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