package net.ruixin.domain.plat.demo;

import net.ruixin.domain.plat.BaseDomain;
import net.ruixin.enumerate.plat.SfyxSt;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.util.List;

/**
 * 案例组织实体
 */
@SuppressWarnings("unused")
@Table(name = "SYS_DEMO_ORGAN")
@Entity
@DynamicInsert
@DynamicUpdate
public class DemoOrgan extends BaseDomain {

    @Id
    @SequenceGenerator(name = "seq_sysuser", sequenceName = "SEQ_SYS_USER", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_sysuser")
    private Long id;

    //名称
    @Column(name = "ORGAN_NAME")
    private String organName;
    //项目
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumns(@JoinColumn(name = "ORGAN_ID", referencedColumnName = "ID"))
    @Where(clause = " SFYX_ST='1' ")
    private List<DemoProject> demoProjectList;

    //项目
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumns(@JoinColumn(name = "ORGAN_ID", referencedColumnName = "ID"))
    @Where(clause = " SFYX_ST='1' ")
    private List<DemoLeader> demoLeaderList;

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

    public String getOrganName() {
        return organName;
    }

    public void setOrganName(String organName) {
        this.organName = organName;
    }

    public SfyxSt getSfyxSt() {
        return sfyxSt;
    }

    public void setSfyxSt(SfyxSt sfyxSt) {
        this.sfyxSt = sfyxSt;
    }

    public List<DemoProject> getDemoProjectList() {
        return demoProjectList;
    }

    public void setDemoProjectList(List<DemoProject> demoProjectList) {
        this.demoProjectList = demoProjectList;
    }

    public List<DemoLeader> getDemoLeaderList() {
        return demoLeaderList;
    }

    public void setDemoLeaderList(List<DemoLeader> demoLeaderList) {
        this.demoLeaderList = demoLeaderList;
    }
}
