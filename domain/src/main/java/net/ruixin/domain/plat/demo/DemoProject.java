package net.ruixin.domain.plat.demo;

import net.ruixin.domain.plat.BaseDomain;
import net.ruixin.enumerate.plat.SfyxSt;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

/**
 * Created by pitcher on 2017/8/21.
 */
@SuppressWarnings("unused")
@Table(name = "SYS_DEMO_PROJECT")
@Entity
@DynamicInsert
@DynamicUpdate
public class DemoProject extends BaseDomain {

    @Id
    @SequenceGenerator(name = "seq_sysuser", sequenceName = "SEQ_SYS_USER", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_sysuser")
    private Long id;

    //名称
    @Column(name = "PROJECT_NAME")
    private String projectName;

    //类型
    @Column(name = "PROJECT_TYPE")
    private String projectType;

    //所属组织
    @Column(name = "ORGAN_ID")
    private Integer organId;

    //成立日期
    @Column(name = "CLRQ")
    private String clrq;

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

    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }


    public SfyxSt getSfyxSt() {
        return sfyxSt;
    }

    public void setSfyxSt(SfyxSt sfyxSt) {
        this.sfyxSt = sfyxSt;
    }

    public Integer getOrganId() {
        return organId;
    }

    public void setOrganId(Integer organId) {
        this.organId = organId;
    }

    public String getProjectType() {
        return projectType;
    }

    public void setProjectType(String projectType) {
        this.projectType = projectType;
    }

    public String getClrq() {
        return clrq;
    }

    public void setClrq(String clrq) {
        this.clrq = clrq;
    }
}
