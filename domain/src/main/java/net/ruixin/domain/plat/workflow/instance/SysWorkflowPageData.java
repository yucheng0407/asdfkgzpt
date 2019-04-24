package net.ruixin.domain.plat.workflow.instance;

import net.ruixin.domain.plat.BaseDomain;
import net.ruixin.enumerate.plat.SfyxSt;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

/**
 *
 * 流程页面id和数据关联表
 */
@SuppressWarnings("unused")
@Table(name = "SYS_WORKFLOW_PAGE_DATA_INS")
@Entity
@DynamicInsert
@DynamicUpdate
public class SysWorkflowPageData extends BaseDomain {
    @Id
    @SequenceGenerator(name = "seq_sys_workflow_page_data", sequenceName = "SEQ_SYS_WORKFLOW_PAGE_DATA", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_sys_workflow_page_data")
    private Long id;

    //流程实例id
    @Column(name = "WORKFLOW_INSTANCE_ID")
    private Long workflowInstanceId;

    //页面id
    @Column(name = "PAGE_ID")
    private Long pageId;

    //数据id
    @Column(name = "DATA_ID")
    private Long  dataId;

    //流程设计器的表单id
    @Column(name = "FORM_ID")
    private Long  formId;

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

    public Long getWorkflowInstanceId() {
        return workflowInstanceId;
    }

    public void setWorkflowInstanceId(Long workflowInstanceId) {
        this.workflowInstanceId = workflowInstanceId;
    }

    public Long getPageId() {
        return pageId;
    }

    public void setPageId(Long pageId) {
        this.pageId = pageId;
    }

    public Long getDataId() {
        return dataId;
    }

    public void setDataId(Long dataId) {
        this.dataId = dataId;
    }

    public Long getFormId() {
        return formId;
    }

    public void setFormId(Long formId) {
        this.formId = formId;
    }

    public SfyxSt getSfyxSt() {
        return sfyxSt;
    }

    public void setSfyxSt(SfyxSt sfyxSt) {
        this.sfyxSt = sfyxSt;
    }
}
