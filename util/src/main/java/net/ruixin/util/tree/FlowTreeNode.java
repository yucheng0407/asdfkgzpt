package net.ruixin.util.tree;

import net.ruixin.util.cache.Cache;
import net.ruixin.util.cache.CacheKit;
import net.ruixin.util.http.HttpKit;
import org.springframework.jdbc.core.RowMapper;

import java.io.Serializable;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

/**
 * 树节点
 */
public class FlowTreeNode implements Serializable {

    private static final long serialVersionUID = -4957200023107628717L;

    private String id;

    private String handleId;

    private String name;

    private String code;

    private String type;

    private String icon;

    private String pId;

    private boolean open;

    private boolean editNameFlag = true;

    private List<FlowTreeNode> children;

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

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public boolean isOpen() {
        return open;
    }

    public void setOpen(boolean open) {
        this.open = open;
    }

    public boolean isEditNameFlag() {
        return editNameFlag;
    }

    public void setEditNameFlag(boolean editNameFlag) {
        this.editNameFlag = editNameFlag;
    }

    public String getpId() {
        return pId;
    }

    public void setpId(String pId) {
        this.pId = pId;
    }

    public List<FlowTreeNode> getChildren() {
        return children;
    }

    public void setChildren(List<FlowTreeNode> children) {
        this.children = children;
    }

    public static class TreeRowMapper implements RowMapper<FlowTreeNode> {

        @Override
        public FlowTreeNode mapRow(ResultSet rs, int rowNum) throws SQLException {
            FlowTreeNode node = new FlowTreeNode();
            node.setId(rs.getString("ID"));
            node.setHandleId(rs.getString("HANDLEID"));
            node.setName(rs.getString("NAME"));
            node.setType(rs.getString("TYPE"));
            node.setpId(rs.getString("PID"));
            node.setCode(rs.getString("CODE"));
            node.setIcon("workflow".equals(rs.getString("TYPE")) ?
                    HttpKit.handleCtxPath(CacheKit.get(Cache.CONFIG, "flow")) :
                    HttpKit.handleCtxPath(CacheKit.get(Cache.CONFIG, "flowType")));
            return node;
        }
    }
}
