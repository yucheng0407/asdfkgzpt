package net.ruixin.domain.plat.workflow.instance;

import com.fasterxml.jackson.annotation.JsonBackReference;
import net.ruixin.domain.plat.resource.SysResource;
import net.ruixin.domain.plat.workflow.structure.page.SysNodePage;
import net.ruixin.domain.plat.workflow.structure.page.SysWorkflowPage;
import net.ruixin.enumerate.plat.SfyxSt;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.Date;

/**
 * 任务表单实例
 */
@Table(name = "SYS_TASK_PAGE_INSTANCE")
@Entity
@DynamicInsert
@DynamicUpdate
public class SysTaskPageInstance {
    @Id
    @SequenceGenerator(name = "seq_sys_task_page_instance", sequenceName = "SEQ_SYS_TASK_PAGE_INSTANCE", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_sys_task_page_instance")
    private Long id;

    // 任务实例
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "TASK_INSTANCE_ID")
    @JsonBackReference
    private SysTask sysTask;

    // 流程表单
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "WORKFLOW_PAGE_ID")
    @JsonBackReference
    private SysWorkflowPage sysWorkflowPage;

    // 环节表单
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "NODE_PAGE_ID")
    @JsonBackReference
    private SysNodePage sysNodePage;

    // 表单ID
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "PAGE_ID")
    @JsonBackReference
    private SysResource resource;

    // 数据ID
    @Column(name = "DATA_ID")
    private Long data_id;

    //临时数据JSON
    @Lob
    @Basic(fetch = FetchType.LAZY)
    @Column(name = "TMP_DATA_JSON", columnDefinition = "CLOB")
    private String tmp_data_json;

    // 创建时间
    @Column(name = "CJSJ")
    private Date cjsj;

    // 修改时间
    @Column(name = "XGSJ")
    private Date xgsj;

    //有效标识
    @Enumerated
   @Column(name = "SFYX_ST")
    private SfyxSt sfyxSt;

    @Column
    private String path;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setData_id(Long data_id) {
        this.data_id = data_id;
    }

    public SysTask getSysTask() {
        return sysTask;
    }

    public void setSysTask(SysTask sysTask) {
        this.sysTask = sysTask;
    }

    public SysWorkflowPage getSysWorkflowPage() {
        return sysWorkflowPage;
    }

    public void setSysWorkflowPage(SysWorkflowPage sysWorkflowPage) {
        this.sysWorkflowPage = sysWorkflowPage;
    }

    public Long getData_id() {
        return data_id;
    }

    public String getTmp_data_json() {
        return tmp_data_json;
    }

    public void setTmp_data_json(String tmp_data_json) {
        this.tmp_data_json = tmp_data_json;
    }

    public Date getCjsj() {
        return cjsj;
    }

    public void setCjsj(Date cjsj) {
        this.cjsj = cjsj;
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

    public SysNodePage getSysNodePage() {
        return sysNodePage;
    }

    public void setSysNodePage(SysNodePage sysNodePage) {
        this.sysNodePage = sysNodePage;
    }

    public SysResource getResource() {
        return resource;
    }

    public void setResource(SysResource resource) {
        this.resource = resource;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }
}
