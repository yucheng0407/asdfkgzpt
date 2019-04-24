package net.ruixin.domain.plat.attachment;

import net.ruixin.domain.plat.BaseDomain;
import net.ruixin.enumerate.plat.SfyxSt;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.Date;


/**
 * 附件实体
 */
@SuppressWarnings("unused")
@Table(name = "SYS_ATTACHMENT")
@Entity
@DynamicInsert
@DynamicUpdate
public class Attachment extends BaseDomain {

    /**
     * ID 主键
     */
    @Id
    @SequenceGenerator(name = "seq_attachment", sequenceName = "SEQ_SYS_ATTACHMENT", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_attachment")
    private Long id;

    //附件类别 字典项 1：文档，2：图片，3：WORD模板，4：其他
    @Column(name = "TYPE")
    private String type;

    //附件名称
    @Column(name = "NAME")
    private String name;

    //附件别名
    @Column(name = "ALIAS")
    private String alias;

    //附件扩展名
    @Column(name = "EXTENSION")
    private String extension;

    //附件大小
    @Column(name = "FILESIZE")
    private Long fileSize;

    //物理绝对路径
    @Column(name = "ABSOLUTE_PATH")
    private String absolutePath;

    //缩略图物理绝对路径
    @Column(name = "TH_ABSOLUTEPATH")
    private String thAbsolutePath;

    //描述
    @Column(name = "DESCRIPTION")
    private String description;

    //UUID
    @Column(name = "UUID")
    private String uuid;

    //附件类别，分类说明
    @Column(name = "FJLB_NO")
    private String fjlbNo;

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

    /**
     * 是否有效 0:无效 1：有效
     */
    @Enumerated
   @Column(name = "SFYX_ST")
    private SfyxSt sfyxSt;

    public Attachment() {
    }

    public Attachment(String type, String name, String alias, String extension,
                      Long fileSize, String thAbsolutePath,
                      String description, String uuid, String fjlbNo, SfyxSt sfyxSt) {
        this.type = type;
        this.name = name;
        this.alias = alias;
        this.extension = extension;
        this.fileSize = fileSize;
        this.thAbsolutePath = thAbsolutePath;
        this.description = description;
        this.uuid = uuid;
        this.fjlbNo = fjlbNo;
        this.sfyxSt = sfyxSt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAlias() {
        return alias;
    }

    public void setAlias(String alias) {
        this.alias = alias;
    }

    public String getExtension() {
        return extension;
    }

    public void setExtension(String extension) {
        this.extension = extension;
    }

    public Long getFileSize() {
        return fileSize;
    }

    public void setFileSize(Long fileSize) {
        this.fileSize = fileSize;
    }

    public String getAbsolutePath() {
        return absolutePath;
    }

    public void setAbsolutePath(String absolutePath) {
        this.absolutePath = absolutePath;
    }

    public String getThAbsolutePath() {
        return thAbsolutePath;
    }

    public void setThAbsolutePath(String thAbsolutePath) {
        this.thAbsolutePath = thAbsolutePath;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getUuid() {
        return uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    public String getFjlbNo() {
        return fjlbNo;
    }

    public void setFjlbNo(String fjlbNo) {
        this.fjlbNo = fjlbNo;
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

    public String findDownloadName() {
        String fileName = getName();
        String ext = getExtension();
        String[] names = fileName.split("\\.");
        boolean hasExt = true;
        if (ext == null || "".equals(ext)) {
            hasExt = false;
        } else if (names.length > 0) {
            hasExt = !ext.toLowerCase().equals(names[names.length - 1].toLowerCase());
        }
        if (hasExt) {
            return fileName + "." + ext;
        } else {
            return fileName;
        }
    }
}

