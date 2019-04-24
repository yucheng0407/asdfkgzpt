package net.ruixin.util.data;

import java.io.Serializable;

/**
 * 上传附件参数封装
 */
public class UploadEntity implements Serializable{
    /**
     * 附件别名
     */
    private String alias;

    /**
     * 附件描述
     */
    private String description;

    /**
     * 附件uuid
     */
    private String uuid;

    /**
     * 附件类别
     */
    private String fjlbNo;

    /**
     * 是否生成缩略图
     */
    private boolean thumbFlag;

    public String getAlias() {
        return alias;
    }

    public void setAlias(String alias) {
        this.alias = alias;
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

    public boolean isThumbFlag() {
        return thumbFlag;
    }

    public void setThumbFlag(boolean thumbFlag) {
        this.thumbFlag = thumbFlag;
    }
}
