package net.ruixin.domain.qbyp;

import net.ruixin.domain.plat.BaseDomain;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

import net.ruixin.enumerate.plat.SfyxSt;

import java.util.Date;

/**
 * 实体:Ajjg(案件加工)
 *
 * @author RXCoder  on 2019-4-9 11:47:16
 */

@Table(name = "T_AJST_AJJG")
@Entity
@DynamicInsert
@DynamicUpdate
public class Ajjg extends BaseDomain {

    /**
     * 主键
     */
    @Id
    @SequenceGenerator(name = "seq_t_ajst_ajjg", sequenceName = "SEQ_T_AJST_AJJG", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_t_ajst_ajjg")
    private Long id;
    /**
     * 案件编号
     */
    @Column(name = "AJBH")
    private String ajbh;
    /**
     * 案件时段：1-凌晨，2-清晨，3-早晨，4-上午，5-中午，6-下午，7-傍晚，8-晚上
     */
    @Column(name = "AJSD")
    private String ajsd;
    /**
     * 案件时段：1-小区，2-街面，3-大型商场，4-农村，5-学校，6-医院，7-机关，8-其他
     */
    @Column(name = "ZADD")
    private String zadd;
    /**
     * 案件后果：1-领导关注案件、2-严重后果案件
     */
    @Column(name = "AJHG")
    private String ajhg;
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

    public void setAjsd(String ajsd) {
        this.ajsd = ajsd;
    }

    public String getAjsd() {
        return ajsd;
    }

    public void setZadd(String zadd) {
        this.zadd = zadd;
    }

    public String getZadd() {
        return zadd;
    }

    public void setAjhg(String ajhg) {
        this.ajhg = ajhg;
    }

    public String getAjhg() {
        return ajhg;
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