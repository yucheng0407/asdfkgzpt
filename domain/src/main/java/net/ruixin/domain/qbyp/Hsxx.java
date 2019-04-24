package net.ruixin.domain.qbyp;
import net.ruixin.domain.plat.BaseDomain;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import javax.persistence.*;

import net.ruixin.enumerate.plat.SfyxSt;
import java.util.Date;

/**
 * 实体:Hsxx(情报会商)
 *
 * @author RXCoder  on 2019-4-9 11:56:20
 */

@Table(name = "T_QBHS_HSXX")
@Entity
@DynamicInsert
@DynamicUpdate
public class Hsxx extends BaseDomain{
      
    /**
     * 主键
     */
    @Id
    @SequenceGenerator(name = "seq_t_qbhs_hsxx", sequenceName = "SEQ_T_QBHS_HSXX", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_t_qbhs_hsxx")
    private Long id;
        /**
     * 标题
     */
    @Column(name = "BT")
    private String bt;
        /**
     * 类型:1-机制文件，2-情报会商，3-领导指示，4-政策文件，5-通知通报
     */
    @Column(name = "LX")
    private String lx;
        /**
     * 备注
     */
    @Column(name = "BZ")
    private String bz;
        /**
     * 附件
     */
    @Column(name = "FJ")
    private String fj;
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

    public void setBt(String bt) {
        this.bt = bt;
    }

    public String getBt() {
        return bt;
    }

    public void setLx(String lx) {
        this.lx = lx;
    }

    public String getLx() {
        return lx;
    }

    public void setBz(String bz) {
        this.bz = bz;
    }

    public String getBz() {
        return bz;
    }

    public void setFj(String fj) {
        this.fj = fj;
    }

    public String getFj() {
        return fj;
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