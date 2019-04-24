package net.ruixin.domain.jmfk;

import net.ruixin.domain.plat.BaseDomain;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

import net.ruixin.enumerate.plat.SfyxSt;

/**
 * 实体:SbGlb(防控安排_设备_关联表)
 *
 * @author RXCoder  on 2019-4-9 11:52:23
 */

@Table(name = "T_FKAP_SB_GLB")
@Entity
@DynamicInsert
@DynamicUpdate
public class SbGlb extends BaseDomain {

    /**
     * 主键
     */
    @Id
    @SequenceGenerator(name = "seq_t_fkap_sb_glb", sequenceName = "SEQ_T_FKAP_SB_GLB", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_t_fkap_sb_glb")
    private Long id;
    /**
     * 防控安排ID
     */
    @Column(name = "FKID")
    private Long fkid;
    /**
     * 设备ID
     */
    @Column(name = "SBID")
    private Long sbid;
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

    public void setFkid(Long fkid) {
        this.fkid = fkid;
    }

    public Long getFkid() {
        return fkid;
    }

    public void setSbid(Long sbid) {
        this.sbid = sbid;
    }

    public Long getSbid() {
        return sbid;
    }

    public SfyxSt getSfyxSt() {
        return sfyxSt;
    }

    public void setSfyxSt(SfyxSt sfyxSt) {
        this.sfyxSt = sfyxSt;
    }

}