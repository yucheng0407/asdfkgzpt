package net.ruixin.domain.plat.workflow.structure.node;

import net.ruixin.domain.plat.BaseDomain;
import net.ruixin.domain.plat.workflow.structure.frame.SysWorkflowVariable;
import net.ruixin.enumerate.plat.SfyxSt;

import javax.persistence.*;

/**
 * Created by Jealous on 2015/10/15.
 * 实体类：流程变量环节赋值
 */
@Table(name = "SYS_NODE_VARIABLE_ASSIGN")
@Entity
public class SysNodeVariableAssign extends BaseDomain {
    //ID
    @Id
    @SequenceGenerator(name = "seq_node_variable_assign", sequenceName = "SEQ_SYS_NODE_VARIABLE_ASSIGN", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_node_variable_assign")
    private Long id;

    //流程变量
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name = "VARIABLE_ID")
    private SysWorkflowVariable workflowVariable;

    //环节
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name = "NODE_ID")
    private SysNode node;

    //表达式
    @Column(name = "EXPRESSION")
    private String expression;

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

    public SysWorkflowVariable getWorkflowVariable() {
        return workflowVariable;
    }

    public void setWorkflowVariable(SysWorkflowVariable workflowVariable) {
        this.workflowVariable = workflowVariable;
    }

    public SysNode getNode() {
        return node;
    }

    public void setNode(SysNode node) {
        this.node = node;
    }

    public String getExpression() {
        return expression;
    }

    public void setExpression(String expression) {
        this.expression = expression;
    }

    public SfyxSt getSfyxSt() {
        return sfyxSt;
    }

    public void setSfyxSt(SfyxSt sfyxSt) {
        this.sfyxSt = sfyxSt;
    }
}
