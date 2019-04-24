package net.ruixin.dao.plat.workflow.impl;

import net.ruixin.dao.plat.workflow.ISysNodeButtonDao;
import net.ruixin.domain.plat.workflow.structure.frame.SysWorkflow;
import net.ruixin.domain.plat.workflow.structure.node.SysNode;
import net.ruixin.domain.plat.workflow.structure.node.SysNodeButton;
import net.ruixin.util.hibernate.BaseDao;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 环节button
 */
@SuppressWarnings({"SqlDialectInspection", "SqlNoDataSourceInspection"})
@Repository
public class SysNodeButtonDao extends BaseDao<SysNodeButton> implements ISysNodeButtonDao {

    @Override
    public List<SysNodeButton> findNodeButtonByWorkflow(SysWorkflow workflow) {
        return super.findListByHql("from SysNodeButton t where t.node.sysWorkflow = ? and t.sfyxSt = '1'",workflow);
    }

    @Override
    public SysNodeButton get(Long nodeButtonId) {
        return super.get(nodeButtonId);
    }

    @Override
    public void saveSysNodeButton(SysNodeButton nodeButton) {
        super.saveOrUpdate(nodeButton);
    }

    @Override
    public List<SysNodeButton> findNodeButtonByNode(SysNode sysNode) {
        return super.findListByHql("from SysNodeButton t where t.node = ? and t.sfyxSt = '1' order by t.sort",sysNode);
    }

    @Override
    public List<Map<String,Object>> queryButtonsByNode(Long nodeId){
        return super.getJdbcTemplate().query("SELECT ID, \n" +
                        "NAME, \n" +
                        "CODE, \n" +
                        "ICON, \n" +
                        "FLAG, \n" +
                        "FUNCNAME, \n" +
                        "NODE_ID, \n" +
                        "SFYX_ST, \n" +
                        "CJSJ, \n" +
                        "XGSJ, \n" +
                        "CJR_ID, \n" +
                        "XGR_ID, \n" +
                        "SORT, \n" +
                        "ISSHOWINHANDLE, \n" +
                        "TYPE, \n" +
                        "OPINION FROM SYS_NODE_BUTTON B WHERE B.SFYX_ST='1' AND B.NODE_ID=? ORDER BY SORT",
                new RowMapper<Map<String,Object>>() {
                    @Override
                    public Map<String,Object> mapRow(ResultSet rs, int rowNum) throws SQLException {
                        Map<String,Object> row= new HashMap<>();
                        row.put("id",rs.getString("ID"));
                        row.put("name",rs.getString("NAME"));
                        row.put("code",rs.getString("CODE"));
                        row.put("icon",rs.getString("ICON"));
                        row.put("type",rs.getString("TYPE"));
                        row.put("funcName",rs.getString("FUNCNAME"));
                        row.put("isShowInHandle",rs.getString("ISSHOWINHANDLE"));
                        row.put("sfyxSt","VALID");
                        return row;
                    }
                },nodeId);
    }
}
