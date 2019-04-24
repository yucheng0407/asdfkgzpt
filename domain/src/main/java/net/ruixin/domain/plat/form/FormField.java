package net.ruixin.domain.plat.form;

import net.ruixin.domain.plat.BaseDomain;
import net.ruixin.enumerate.plat.SfyxSt;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

/**
 * 表单定义
 */
@SuppressWarnings("unused")
@Table(name = "SYS_FORM_FIELD")
@Entity
@DynamicInsert
@DynamicUpdate
public class FormField extends BaseDomain {

    @Id
    @SequenceGenerator(name = "seq_form_field", sequenceName = "SEQ_SYS_FORM_FIELD", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_form_field")
    private Long id;

    //表单ID
    @Column(name = "FORM_ID")
    private Long formId;

    //父字段ID
    @Column(name = "PARENT_ID")
    private Long parentId;

    //字段code
    @Column(name = "CODE")
    private String code;

    //字段标题
    @Column(name = "LABEL")
    private String label;

    //字段值
    @Transient
    private Object value;

    //字段描述
    @Column(name = "DESCRIPTION")
    private String description;

    //字段类型
    @Column(name = "FIELD_TYPE")
    private String fieldType;

    //字段选项
    @Lob
    @Basic(fetch = FetchType.EAGER)
    @Column(name = "FIELD_OPTIONS", columnDefinition = "CLOB")
    private String fieldOptions;

    //修改人id
    @Column(name = "SORT")
    private Long sort;

    //column名称
    @Column(name = "COLUMN_NAME")
    private String columnName;

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

    public Long getFormId() {
        return formId;
    }

    public void setFormId(Long formId) {
        this.formId = formId;
    }

    public Long getParentId() {
        return parentId;
    }

    public void setParentId(Long parentId) {
        this.parentId = parentId;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public Object getValue() {
        return value;
    }

    public void setValue(Object value) {
        this.value = value;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getFieldType() {
        return fieldType;
    }

    public void setFieldType(String fieldType) {
        this.fieldType = fieldType;
    }

    public String getFieldOptions() {
        return fieldOptions;
    }

    public void setFieldOptions(String fieldOptions) {
        this.fieldOptions = fieldOptions;
    }

    public Long getSort() {
        return sort;
    }

    public void setSort(Long sort) {
        this.sort = sort;
    }

    public SfyxSt getSfyxSt() {
        return sfyxSt;
    }

    public void setSfyxSt(SfyxSt sfyxSt) {
        this.sfyxSt = sfyxSt;
    }

    public String getColumnName() {
        return columnName;
    }

    public void setColumnName(String columnName) {
        this.columnName = columnName;
    }
}
