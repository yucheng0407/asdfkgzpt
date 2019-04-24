package net.ruixin.util.data;

import java.io.Serializable;

/**
 * 上传附件参数封装
 */
public class OrganTreeConfig implements Serializable {
    /**
     * 树的种类
     */
    private String kind;

    /**
     * 顶级id
     */
    private Long topId;

    /**
     * 包含无机构用户
     */
    private Boolean includeNoOrgan;

    /**
     * 当期异步请求节点的机构id
     * 根据节点的类型，节点为机构时，为机构ID；节点为岗位时，为岗位所属机构；节点为用户时，为用户所在机构；
     */

    private Long organId;

    public String getKind() {
        return kind;
    }

    public void setKind(String kind) {
        this.kind = kind;
    }

    public Long getTopId() {
        return topId;
    }

    public void setTopId(Long topId) {
        this.topId = topId;
    }

    public Boolean getIncludeNoOrgan() {
        return includeNoOrgan;
    }

    public void setIncludeNoOrgan(Boolean includeNoOrgan) {
        this.includeNoOrgan = includeNoOrgan;
    }

    public Long getOrganId() {
        return organId;
    }

    public void setOrganId(Long organId) {
        this.organId = organId;
    }
}
