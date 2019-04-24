package net.ruixin.domain.plat.form;

import net.ruixin.domain.plat.BaseDomain;
import net.ruixin.domain.rule.Restrict;
import net.ruixin.domain.rule.Rule;
import net.ruixin.enumerate.plat.SfyxSt;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

/**
 * 表单定义
 */
@SuppressWarnings("unused")
@Table(name = "SYS_FORM_DEF")
@Entity
@DynamicInsert
@DynamicUpdate
public class FormDef extends BaseDomain {

    @Id
    @SequenceGenerator(name = "seq_form_def", sequenceName = "SEQ_SYS_FORM_DEF", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_form_def")
    private Long id;

    //标题
    @Column(name = "NAME")
    private String name;

    @Restrict(rules = {@Rule(validateClass = "CheckFormDesignUnique", name = "表单key")})
    @Column(name = "KEY")
    private String key;

    //表单描述
    @Column(name = "DESCRIPTION")
    private String description;

    //表单描述
    @Column(name = "TYPE_ID")
    private Long typeId;

    //是否主版本
    @Column(name = "IS_MAIN")
    private String isMain;

    @Column(name = "VERSION")
    private Integer version;

    //扩展属性
    @Lob
    @Basic(fetch = FetchType.EAGER)
    @Column(name = "EXTEND_ATTR", columnDefinition = "CLOB")
    private String extendAttr;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumns(@JoinColumn(name = "FORM_ID", referencedColumnName = "ID"))
    @OrderBy(" sort asc ")
    private List<FormField> fields;

    //创建人id
    @Column(name = "CJR_ID")
    private Long cjrId;

    //创建时间
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "CJSJ")
    private Date cjsj;

    //修改人id
    @Column(name = "XGR_ID")
    private Long xgrId;

    //修改时间
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "XGSJ")
    private Date xgsj;

    //生成表前缀名称
    @Column(name = "PRE_NAME")
    private String preName;

    //表名称
    @Column(name = "TABLE_NAME")
    private String tableName;

    //有效状态，0：无效，1：有效
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

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public Long getTypeId() {
        return typeId;
    }

    public void setTypeId(Long typeId) {
        this.typeId = typeId;
    }

    public String getIsMain() {
        return isMain;
    }

    public void setIsMain(String isMain) {
        this.isMain = isMain;
    }

    public Integer getVersion() {
        return version;
    }

    public void setVersion(Integer version) {
        this.version = version;
    }

    public String getExtendAttr() {
        return extendAttr;
    }

    public void setExtendAttr(String extendAttr) {
        this.extendAttr = extendAttr;
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

    public List<FormField> getFields() {
        return fields;
    }

    public void setFields(List<FormField> fields) {
        this.fields = fields;
    }

    public String getPreName() {
        return preName;
    }

    public void setPreName(String preName) {
        this.preName = preName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getTableName() {
        return tableName;
    }

    public void setTableName(String tableName) {
        this.tableName = tableName;
    }


}
