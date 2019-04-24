package net.ruixin.domain.plat.workflow.structure.frame;

import net.ruixin.domain.plat.BaseDomain;
import net.ruixin.enumerate.plat.SfyxSt;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.Formula;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by Jealous on 2015/10/15.
 * 实体：流程类别
 */
@SuppressWarnings("unused")
@Table(name = "SYS_WORKFLOW_TYPE")
@Entity
@DynamicInsert
@DynamicUpdate
public class SysWorkflowType extends BaseDomain {
    //ID
    @Id
    @SequenceGenerator(name = "seq_workflow_type", sequenceName = "SEQ_SYS_WORKFLOW_TYPE", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_workflow_type")
    private Long id;
    //流程类别名称
    @Column(name = "NAME")
    private String name;
    //上级类别
    @Column(name = "PARENT_ID")
    private Long parentId;
    //上级类别名称
    @Formula("(SELECT WT.NAME FROM SYS_WORKFLOW_TYPE WT WHERE WT.ID=PARENT_ID AND WT.SFYX_ST='1')")
    private String parentName;
    //类别描述
    @Column(name = "DESCRIPTION")
    private String description;
    //创建人
    @Column(name = "CJR_ID")
    private Long cjrId;
    //创建时间
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "CJSJ")
    private Date cjsj;
    //修改人
    @Column(name = "XGR_ID")
    private Long xgrId;
    //修改时间
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "XGSJ")
    private Date xgsj;
    //有效标识
    @Enumerated
    @Column(name = "SFYX_ST")
    private SfyxSt sfyxSt;
    //是否是父节点
    @org.hibernate.annotations.Type(type="yes_no")
    @Formula("(SELECT (CASE WHEN COUNT(1) > 0 THEN 'Y' ELSE 'N' END) FROM SYS_WORKFLOW_TYPE T WHERE T.SFYX_ST = '1' AND T.PARENT_ID = ID)")
    private boolean isParent;

    public SysWorkflowType() {

    }

    public SysWorkflowType(Long id, String name, String description, Long parentId) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.parentId = parentId;
    }

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

    public Long getParentId() {
        return parentId;
    }

    public void setParentId(Long parentId) {
        this.parentId = parentId;
    }

    public String getParentName() {
        return parentName;
    }

    public void setParentName(String parentName) {
        this.parentName = parentName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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

    public Long getXgrId() {
        return xgrId;
    }

    public void setXgrId(Long xgrId) {
        this.xgrId = xgrId;
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

    public boolean isParent() {
        return this.isParent;
    }

    public void setParent(boolean isParent) {
        this.isParent = isParent;
    }
}
