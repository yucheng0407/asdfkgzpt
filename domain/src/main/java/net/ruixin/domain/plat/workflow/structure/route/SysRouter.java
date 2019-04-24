package net.ruixin.domain.plat.workflow.structure.route;

import com.fasterxml.jackson.annotation.JsonIgnore;
import net.ruixin.domain.plat.BaseDomain;
import net.ruixin.domain.plat.workflow.structure.frame.SysWorkflow;
import net.ruixin.domain.plat.workflow.structure.node.SysNode;
import net.ruixin.enumerate.plat.SfyxSt;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by Jealous on 2015/10/15.
 * 实体：流向
 */
@SuppressWarnings("unused")
@Table(name = "SYS_ROUTER")
@Entity
@DynamicInsert
@DynamicUpdate
public class SysRouter extends BaseDomain {
    //ID
    @Id
    @SequenceGenerator(name = "seq_router", sequenceName = "SEQ_SYS_ROUTER", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_router")
    private Long id;
    //名称
    @Column(name = "NAME")
    private String name;
    //决策条件分支
    @Column(name = "BRANCH")
    private String branch;
    //上一环节
    @ManyToOne(cascade = CascadeType.REFRESH)
    @JoinColumn(name = "START_NODE_ID")
    private SysNode startNode;
    //下一环节
    @ManyToOne(cascade = CascadeType.REFRESH)
    @JoinColumn(name = "END_NODE_ID")
    private SysNode endNode;
    //所属流程
    @ManyToOne(cascade = CascadeType.REFRESH)
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
    //DOM元素ID
    @Column(name = "DOM_ID")
    private String domid;
    //开始环节DOMID
    @Transient
    private String startNodeId;
    //结束环节DOMID;
    @Transient
    private String endNodeId;

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

    public String getBranch() {
        return branch;
    }

    public void setBranch(String branch) {
        this.branch = branch;
    }

    public SysNode getStartNode() {
        return startNode;
    }

    public void setStartNode(SysNode startNode) {
        this.startNode = startNode;
    }

    public SysNode getEndNode() {
        return endNode;
    }

    public void setEndNode(SysNode endNode) {
        this.endNode = endNode;
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

    public String getDomid() {
        return domid;
    }

    public void setDomid(String domid) {
        this.domid = domid;
    }

    public String getStartNodeId() {
        if (startNode != null) {
            return startNode.getDomid();
        }
        return null;
    }

    public String getEndNodeId() {
        if (endNode != null) {
            return endNode.getDomid();
        }
        return null;
    }
}
