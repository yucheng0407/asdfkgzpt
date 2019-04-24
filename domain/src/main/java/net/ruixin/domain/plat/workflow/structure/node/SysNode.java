package net.ruixin.domain.plat.workflow.structure.node;

import com.fasterxml.jackson.annotation.JsonIgnore;
import net.ruixin.domain.plat.BaseDomain;
import net.ruixin.domain.plat.workflow.structure.frame.SysWorkflow;
import net.ruixin.enumerate.plat.NodeType;
import net.ruixin.enumerate.plat.SfyxSt;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * Created by Jealous on 2015/10/15.
 * 实体类：环节
 */
@SuppressWarnings("unused")
@Entity
@Table(name = "SYS_NODE")
@Inheritance(strategy = InheritanceType.JOINED)
@DynamicInsert
@DynamicUpdate
public class SysNode extends BaseDomain {
    //ID
    @Id
    @SequenceGenerator(name = "seq_node", sequenceName = "SEQ_SYS_NODE", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_node")
    private Long id;
    //名称
    @Column(name = "NAME")
    private String name;
    //x坐标
    @Column(name = "X")
    private Integer x;
    //y坐标
    @Column(name = "Y")
    private Integer y;
    //节点类型
    @Enumerated
    @Column(name = "TYPE")
    private NodeType type;
    //所属流程
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name = "WORKFLOW_ID")
    @JsonIgnore
    private SysWorkflow sysWorkflow;
    //序号
    @Column(name = "SORT")
    private Integer sort;
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

    //是否显示草稿按钮：0不显示,1显示
    @Column(name = "SFXSCG")
    private String sfxscg;

    //是否显示催办按钮：0不显示,1显示
    @Column(name = "SFXSCB")
    private String sfxscb;

    //是否必须上传附件：0不必须,1必须
    @Column(name = "SFBXSCFJ")
    private String sfbxscfj;

    //是否显示提交按钮：0不显示，1显示，默认显示
    @Column(name = "SFXSTJ")
    private String sfxstj;

    //环节业务状态
    @Column(name = "YWZT")
    private String ywzt;

    //环节编码
    @Column(name = "CODE")
    private String nodeCode;

    //环节默认意见
    @Column(name = "OPINION")
    private String opinion;

    //分支聚合属性 1分支 2聚合 0普通
    @Column(name = "NATURE")
    private String nature;

    //环节描述
    @Column(name = "DESCRIPTION")
    private String description;

    //DOM元素ID
    @Column(name="DOM_ID")
    private String domid;

    //办理人
    @Transient
    private List<SysNodeCandidate> candidates;

    //表单
    @Transient
    private List<Map<String,Object>> sheets;

    //按钮
    @Transient
    private List<Map<String,Object>> buttons;

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

    public Integer getX() {
        return x;
    }

    public void setX(Integer x) {
        this.x = x;
    }

    public Integer getY() {
        return y;
    }

    public void setY(Integer y) {
        this.y = y;
    }

    public NodeType getType() {
        return type;
    }

    public void setType(NodeType type) {
        this.type = type;
    }

    public SysWorkflow getSysWorkflow() {
        return sysWorkflow;
    }

    public void setSysWorkflow(SysWorkflow sysWorkflow) {
        this.sysWorkflow = sysWorkflow;
    }

    public Integer getSort() {
        return sort;
    }

    public void setSort(Integer sort) {
        this.sort = sort;
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

    public String getSfxscg() {
        return sfxscg;
    }

    public void setSfxscg(String sfxscg) {
        this.sfxscg = sfxscg;
    }

    public String getSfbxscfj() {
        return sfbxscfj;
    }

    public void setSfbxscfj(String sfbxscfj) {
        this.sfbxscfj = sfbxscfj;
    }

    public String getYwzt() {
        return ywzt;
    }

    public void setYwzt(String ywzt) {
        this.ywzt = ywzt;
    }

    public String getNodeCode() {
        return nodeCode;
    }

    public void setNodeCode(String nodeCode) {
        this.nodeCode = nodeCode;
    }

    public String getSfxstj() {
        return sfxstj;
    }

    public void setSfxstj(String sfxstj) {
        this.sfxstj = sfxstj;
    }

    public String getOpinion() {
        return opinion;
    }

    public void setOpinion(String opinion) {
        this.opinion = opinion;
    }

    public String getNature() {
        return nature;
    }

    public void setNature(String nature) {
        this.nature = nature;
    }

    public String getSfxscb() {
        return sfxscb;
    }

    public void setSfxscb(String sfxscb) {
        this.sfxscb = sfxscb;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDomid() {
        return domid;
    }

    public void setDomid(String domid) {
        this.domid = domid;
    }

    public List<SysNodeCandidate> getCandidates() {
        return candidates;
    }

    public void setCandidates(List<SysNodeCandidate> candidates) {
        this.candidates = candidates;
    }

    public List<Map<String, Object>> getSheets() {
        return sheets;
    }

    public void setSheets(List<Map<String, Object>> sheets) {
        this.sheets = sheets;
    }

    public List<Map<String, Object>> getButtons() {
        return buttons;
    }

    public void setButtons(List<Map<String, Object>> buttons) {
        this.buttons = buttons;
    }
}
