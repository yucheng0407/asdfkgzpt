package net.ruixin.domain.plat.workflow.structure.page;

import net.ruixin.domain.plat.BaseDomain;
import net.ruixin.domain.plat.workflow.structure.node.SysNode;
import net.ruixin.enumerate.plat.SfyxSt;
import net.ruixin.enumerate.plat.SheetMode;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by Jealous on 2015/10/15.
 * 环节和页面关系类
 */
@Table(name = "SYS_NODE_PAGE")
@Entity
@DynamicInsert
@DynamicUpdate
public class SysNodePage extends BaseDomain {
    //ID
    @Id
    @SequenceGenerator(name = "seq_node_page", sequenceName = "SEQ_SYS_NODE_PAGE", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_node_page")
    private Long id;
    //标题
    @Column(name = "TITLE")
    private String title;
    //所属环节
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name = "NODE_ID")
    private SysNode node;
    //所属页面
    @Column(name = "PAGE_ID")
    private Long page_id;
    //表单控制
    @Enumerated
    private SheetMode control;
    //审批项名称
    @Column(name = "SPX_NAME")
    private String spxName;
    //审批项序号
    @Column(name = "SPX_SORT")
    private Integer spxSort;
    //是否打印
    @Column(name = "SPX_PRINT")
    private String spxPrint;
    //排序
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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public SysNode getNode() {
        return node;
    }

    public void setNode(SysNode node) {
        this.node = node;
    }

    public Long getPage_id() {
        return page_id;
    }

    public void setPage_id(Long page_id) {
        this.page_id = page_id;
    }

    public SheetMode getControl() {
        return control;
    }

    public void setControl(SheetMode control) {
        this.control = control;
    }

    public String getSpxName() {
        return spxName;
    }

    public void setSpxName(String spxName) {
        this.spxName = spxName;
    }

    public Integer getSpxSort() {
        return spxSort;
    }

    public void setSpxSort(Integer spxSort) {
        this.spxSort = spxSort;
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

    public String getSpxPrint() {
        return spxPrint;
    }

    public void setSpxPrint(String spxPrint) {
        this.spxPrint = spxPrint;
    }
}
