package net.ruixin.domain.plat.workflow.structure.frame;

import net.ruixin.domain.plat.BaseDomain;
import net.ruixin.domain.plat.workflow.structure.page.SysWorkflowPage;
import net.ruixin.domain.plat.workflow.structure.route.SysRouter;
import net.ruixin.domain.rule.Restrict;
import net.ruixin.domain.rule.Rule;
import net.ruixin.enumerate.plat.SfyxSt;
import net.ruixin.enumerate.plat.WorkflowPriority;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.Formula;
import net.ruixin.enumerate.plat.OperatingStatus;

import javax.persistence.*;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * 实体：流程模型
 */
@SuppressWarnings("unused")
@Table(name = "SYS_WORKFLOW")
@Entity
@DynamicInsert
@DynamicUpdate
public class SysWorkflow extends BaseDomain {
    //ID
    @Id
    @SequenceGenerator(name = "seq_workflow", sequenceName = "SEQ_SYS_WORKFLOW", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_workflow")
    private Long id;
    //业务编码
    @Column(name = "CODE")
    private String code;
    //流程名称
    @Column(name = "NAME")
    private String name;
    //流程类别
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name = "TYPE_ID")
    private SysWorkflowType type;
    //流程处理优先级别
    @Enumerated
    private WorkflowPriority priority;
    //前处理程序
    @Column(name = "STARTUP_PROCESS")
    private String startupProcessSql;
    //后处理程序
    @Column(name = "FINISH_PROCESS")
    private String finishProcessSql;
    //流程实例标题
    @Column(name = "INSTANCE_TITLE")
    private String instanceTitle;
    //流程版本号
    @Column(name = "VERSION")
    private Integer version;
    //原始版本流程id
    @Column(name = "WORKFLOW_ID")
    private Long workflow;
    //bpmn格式xml
    @Column(name = "BPMN_DEF")
    private String bpmnDef;
    //状态
    @Column(name = "STATUS")
    private String status;
    //原始版本流程名称
    @Formula("(select flow.name from sys_workflow flow where flow.id = workflow_id and rownum < 2)")
    private String versionName;
    //描述
    @Column(name = "DESCRIPTION")
    private String description;
    //创建人
    @Column(name = "CJR_ID")
    private Long cjrId;
    //创建时间
    @Column(name = "CJSJ")
    private Date cjsj;
    //有效标识
    @Enumerated
    @Column(name = "SFYX_ST")
    private SfyxSt sfyxSt;

    //业务状态字典code
    @Column(name = "WORKFLOWYWZTZD")
    private String workflowYwztZd;

    @Transient
    private List<Map<String, Object>> nodes;

    @Transient
    private List<SysRouter> routers;

    //业务状态字典名称
    @Formula("(SELECT ZD.DICT_NAME FROM SYS_DICT ZD WHERE ZD.DICT_CODE = WORKFLOWYWZTZD)")
    private String workflowYwztZdName;

    //环节编码字典 编码
    @Column(name = "NODE_CODE_DICT_CODE")
    private String nodeCodeDictCode;

    //环节编码字典 名称
    @Formula("(SELECT DICT.DICT_NAME FROM SYS_DICT DICT WHERE DICT.DICT_CODE = NODE_CODE_DICT_CODE)")
    private String nodeCodeDictName;

    //操作状态
    @Transient
    private OperatingStatus operatingStatus;

    //是否是最新版
    @Transient
    private boolean isLatestVersion;

    //流程表单
    @Transient
    private List<Map<String,Object>> sheets;

    //流程变量
    @Transient
    private List<SysWorkflowVariable> workflowVariables;

    //最大序号
    @Transient
    private Integer nodeMaxSort;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public SysWorkflowType getType() {
        return type;
    }

    public void setType(SysWorkflowType type) {
        this.type = type;
    }

    public WorkflowPriority getPriority() {
        return priority;
    }

    public void setPriority(WorkflowPriority priority) {
        this.priority = priority;
    }

    public String getStartupProcessSql() {
        return startupProcessSql;
    }

    public void setStartupProcessSql(String startupProcessSql) {
        this.startupProcessSql = startupProcessSql;
    }

    public String getFinishProcessSql() {
        return finishProcessSql;
    }

    public void setFinishProcessSql(String finishProcessSql) {
        this.finishProcessSql = finishProcessSql;
    }

    public String getInstanceTitle() {
        return instanceTitle;
    }

    public void setInstanceTitle(String instanceTitle) {
        this.instanceTitle = instanceTitle;
    }

    public Integer getVersion() {
        return version;
    }

    public void setVersion(Integer version) {
        this.version = version;
    }

    public String getVersionName() {
        return versionName;
    }

    public void setVersionName(String versionName) {
        this.versionName = versionName;
    }

    public Long getWorkflow() {
        return workflow;
    }

    public void setWorkflow(Long workflow) {
        this.workflow = workflow;
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

    public SfyxSt getSfyxSt() {
        return sfyxSt;
    }

    public void setSfyxSt(SfyxSt sfyxSt) {
        this.sfyxSt = sfyxSt;
    }

    public String getWorkflowYwztZd() {
        return workflowYwztZd;
    }

    public void setWorkflowYwztZd(String workflowYwztZd) {
        this.workflowYwztZd = workflowYwztZd;
    }

    public List<Map<String, Object>> getNodes() {
        return nodes;
    }

    public void setNodes(List<Map<String, Object>> nodes) {
        this.nodes = nodes;
    }

    public List<SysRouter> getRouters() {
        return routers;
    }

    public void setRouters(List<SysRouter> routers) {
        this.routers = routers;
    }

    public String getWorkflowYwztZdName() {
        return workflowYwztZdName;
    }

    public void setWorkflowYwztZdName(String workflowYwztZdName) {
        this.workflowYwztZdName = workflowYwztZdName;
    }

    public String getNodeCodeDictCode() {
        return nodeCodeDictCode;
    }

    public void setNodeCodeDictCode(String nodeCodeDictCode) {
        this.nodeCodeDictCode = nodeCodeDictCode;
    }

    public String getNodeCodeDictName() {
        return nodeCodeDictName;
    }

    public void setNodeCodeDictName(String nodeCodeDictName) {
        this.nodeCodeDictName = nodeCodeDictName;
    }

    public OperatingStatus getOperatingStatus() {
        return operatingStatus;
    }

    public void setOperatingStatus(OperatingStatus operatingStatus) {
        this.operatingStatus = operatingStatus;
    }

    public boolean isLatestVersion() {
        return isLatestVersion;
    }

    public void setLatestVersion(boolean latestVersion) {
        isLatestVersion = latestVersion;
    }

    public String getBpmnDef() {
        return bpmnDef;
    }

    public void setBpmnDef(String bpmnDef) {
        this.bpmnDef = bpmnDef;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public List<Map<String, Object>> getSheets() {
        return sheets;
    }

    public void setSheets(List<Map<String, Object>> sheets) {
        this.sheets = sheets;
    }

    public List<SysWorkflowVariable> getWorkflowVariables() {
        return workflowVariables;
    }

    public void setWorkflowVariables(List<SysWorkflowVariable> workflowVariables) {
        this.workflowVariables = workflowVariables;
    }

    public Integer getNodeMaxSort() {
        return nodeMaxSort;
    }

    public void setNodeMaxSort(Integer nodeMaxSort) {
        this.nodeMaxSort = nodeMaxSort;
    }
}
