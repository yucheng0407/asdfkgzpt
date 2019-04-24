package net.ruixin.util.tree;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.jdbc.core.RowMapper;

import java.io.Serializable;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

/**
 * 树节点
 * @author Administrator
 */
public class BaseTreeNode implements Serializable {

    /**
     * id
     */
    private String id;

    /**
     * 处理id
     */
    private String handleId;
    /**
     * 名称
     */
    private String name;
    private Long organId;
    private String organName;
    private String fullName;
    private String lx;
    private String pId;
    private Boolean hasAuth;

    private Boolean nocheck=false;
    private Boolean checked=false;

    private List<BaseTreeNode> children;

    private String code;
    private String icon;
    private Boolean open;
    @JsonProperty(value = "isParent")
    private Boolean isParent;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getHandleId() {
        return handleId;
    }

    public void setHandleId(String handleId) {
        this.handleId = handleId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLx() {
        return lx;
    }

    public void setLx(String lx) {
        this.lx = lx;
    }

    public String getpId() {
        return pId;
    }

    public void setpId(String pId) {
        this.pId = pId;
    }

    public List<BaseTreeNode> getChildren() {
        return children;
    }

    public void setChildren(List<BaseTreeNode> children) {
        this.children = children;
    }


    public Boolean getOpen() {
        return open;
    }

    public void setOpen(Boolean open) {
        this.open = open;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public Long getOrganId() {
        return organId;
    }

    public void setOrganId(Long organId) {
        this.organId = organId;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getOrganName() {
        return organName;
    }

    public void setOrganName(String organName) {
        this.organName = organName;
    }

    public Boolean getParent() {
        return isParent;
    }

    public void setParent(Boolean parent) {
        isParent = parent;
    }

    public Boolean getHasAuth() {
        return hasAuth;
    }

    public void setHasAuth(Boolean hasAuth) {
        this.hasAuth = hasAuth;
    }

    public static class TreeRowMapper implements RowMapper<BaseTreeNode> {

        @Override
        public BaseTreeNode mapRow(ResultSet rs, int rowNum) throws SQLException {
            BaseTreeNode node = new BaseTreeNode();
            node.setId(rs.getString("ID"));
            node.setHandleId(rs.getString("HANDLEID"));
            node.setName(rs.getString("NAME"));
            node.setLx(rs.getString("LX"));
            node.setpId(rs.getString("PID"));
            return node;
        }
    }

    public Boolean getNocheck() {
        return nocheck;
    }

    public void setNocheck(Boolean nocheck) {
        this.nocheck = nocheck;
    }

    public Boolean getChecked() {
        return checked;
    }

    public void setChecked(Boolean checked) {
        this.checked = checked;
    }
}
