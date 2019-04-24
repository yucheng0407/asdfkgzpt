package net.ruixin.domain.plat.dictionary;

import net.ruixin.domain.plat.BaseDomain;
import net.ruixin.domain.rule.Restrict;
import net.ruixin.domain.rule.Rule;
import net.ruixin.enumerate.plat.SfyxSt;
import org.hibernate.annotations.*;

import javax.persistence.*;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.OrderBy;
import javax.persistence.Table;
import java.util.Date;
import java.util.List;

/**
 * 字典实体
 */
@SuppressWarnings("unused")
@Table(name = "SYS_DICT")
@Entity
@DynamicInsert
@DynamicUpdate
public class SysDict extends BaseDomain {

    @Id
    @SequenceGenerator(name = "seq_sys_dict", sequenceName = "SEQ_SYS_DICT", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_sys_dict")
    private Long id;

    //字典名称
    @Restrict(rules = {@Rule(validateClass = "CheckUnique", name = "字典名称")})
    @Column(name = "DICT_NAME")
    private String dictName;

    //字典编码
    @Restrict(rules = {@Rule(validateClass = "CheckUnique", name = "字典编码")})
    @Column(name = "DICT_CODE")
    private String dictCode;

    //字典类型 1：系统字典   2：流程字典
    @Column(name = "DICT_TYPE")
    private String dictType;

    //字典描述
    @Column(name = "DESCRIPTION")
    private String description;

    //上级字典编码
    @Column(name = "PDICT_CODE")
    private String pdictCode;

    //上级字典名称
    @Formula("(SELECT DICT.DICT_NAME FROM SYS_DICT DICT WHERE DICT.DICT_CODE=PDICT_CODE AND DICT.SFYX_ST='1')")
    private String pdictName;

    //上级字典是否为空
    @Formula("(SELECT DICT.IS_EMPTY FROM SYS_DICT DICT WHERE DICT.DICT_CODE=PDICT_CODE AND DICT.SFYX_ST='1')")
    private String pdictIsEmpty;

    @Column(name = "IS_EMPTY")
    private String isEmpty;

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

    //有效状态，0：无效，1：有效
    @Enumerated
   @Column(name = "SFYX_ST")
    private SfyxSt sfyxSt;

    //与字典项的一对多关系
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "DICT_ID", referencedColumnName = "ID")
    @Where(clause = "SFYX_ST='1'")
    @OrderBy("sort")
    private List<SysSubDict> sysSubDictList;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDictName() {
        return dictName;
    }

    public void setDictName(String dictName) {
        this.dictName = dictName;
    }

    public String getDictCode() {
        return dictCode;
    }

    public void setDictCode(String dictCode) {
        this.dictCode = dictCode;
    }

    public String getDictType() {
        return dictType;
    }

    public void setDictType(String dictType) {
        this.dictType = dictType;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPdictCode() {
        return pdictCode;
    }

    public void setPdictCode(String pdictCode) {
        this.pdictCode = pdictCode;
    }

    public String getPdictName() {
        return pdictName;
    }

    public void setPdictName(String pdictName) {
        this.pdictName = pdictName;
    }

    public String getPdictIsEmpty() {
        return pdictIsEmpty;
    }

    public void setPdictIsEmpty(String pdictIsEmpty) {
        this.pdictIsEmpty = pdictIsEmpty;
    }

    public String getIsEmpty() {
        return isEmpty;
    }

    public void setIsEmpty(String isEmpty) {
        this.isEmpty = isEmpty;
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

    public List<SysSubDict> getSysSubDictList() {
        return sysSubDictList;
    }

    public void setSysSubDictList(List<SysSubDict> sysSubDictList) {
        this.sysSubDictList = sysSubDictList;
    }
}
