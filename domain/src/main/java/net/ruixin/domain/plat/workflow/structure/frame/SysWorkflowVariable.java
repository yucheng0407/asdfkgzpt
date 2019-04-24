package net.ruixin.domain.plat.workflow.structure.frame;

import com.fasterxml.jackson.annotation.JsonIgnore;
import net.ruixin.domain.plat.BaseDomain;
import net.ruixin.enumerate.plat.SfyxSt;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by Jealous on 2015/10/15.
 * 实体：流程变量
 */
@Table(name = "SYS_WORKFLOW_VARIABLE")
@Entity
@DynamicInsert
@DynamicUpdate
public class SysWorkflowVariable extends BaseDomain {
    //ID
    @Id
    @SequenceGenerator(name = "seq_workflow_variable", sequenceName = "SEQ_SYS_WORKFLOW_VARIABLE", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_workflow_variable")
    private Long id;
    //变量名称
    @Column(name = "NAME")
    private String name;
    //初始值
    @Column(name = "INITIAL_VALUE")
    private String value;
    //所属流程
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "WORKFLOW_ID")
    @JsonIgnore
    private SysWorkflow workflow;
    //创建人
    @Column(name = "CJR_ID")
    private Long cjrId;
    //创建时间
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "CJSJ")
    private Date cjsj;
    //有效标识
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

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public SysWorkflow getWorkflow() {
        return workflow;
    }

    public void setWorkflow(SysWorkflow workflow) {
        this.workflow = workflow;
    }

    public Long getCjrId() {
        return cjrId;
    }

    public void setCjrId(Long cjrId) {
        this.cjrId = cjrId;
    }

    public Date getCjsj() {
        return cjsj;
    }

    public void setCjsj(Date cjsj) {
        this.cjsj = cjsj;
    }

    public SfyxSt getSfyxSt() {
        return sfyxSt;
    }

    public void setSfyxSt(SfyxSt sfyxSt) {
        this.sfyxSt = sfyxSt;
    }
}
