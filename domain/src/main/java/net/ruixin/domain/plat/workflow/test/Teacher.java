package net.ruixin.domain.plat.workflow.test;

import net.ruixin.domain.plat.BaseDomain;
import net.ruixin.enumerate.plat.SfyxSt;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.Date;

@Table(name = "SYS_TEACHER")
@Entity
@DynamicInsert
@DynamicUpdate
public class Teacher extends BaseDomain {
    @Id
    @SequenceGenerator(name = "seq_teacher", sequenceName = "seq_sys_teacher", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_teacher")
    private Long id;

    private String name;

    private int qjsc;

    @Temporal(TemporalType.TIMESTAMP)
    private Date xgsj;

    @Enumerated
   @Column(name = "SFYX_ST")
    private SfyxSt sfyxSt;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getQjsc() {
        return qjsc;
    }

    public void setQjsc(int qjsc) {
        this.qjsc = qjsc;
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
