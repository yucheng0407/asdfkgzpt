package net.ruixin.dao.plat.workflow.impl;

import net.ruixin.dao.plat.workflow.ISysNodePageDao;
import net.ruixin.domain.plat.workflow.structure.frame.SysWorkflow;
import net.ruixin.domain.plat.workflow.structure.node.SysNode;
import net.ruixin.domain.plat.workflow.structure.page.SysNodePage;
import net.ruixin.enumerate.plat.SheetMode;
import net.ruixin.util.hibernate.BaseDao;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

/**
 * 环节页面DAO接口实现
 * Created by Jealous on 2016-9-1.
 */
@SuppressWarnings({"SqlDialectInspection", "SqlNoDataSourceInspection"})
@Repository
public class SysNodePageDao extends BaseDao<SysNodePage> implements ISysNodePageDao {
    @Override
    public SysNodePage get(Long nodePageId) {
        return super.get(nodePageId);
    }

    @Override
    public void saveSysNodePage(SysNodePage nodePage) {
        super.saveOrUpdate(nodePage);
    }

    @Override
    public List<SysNodePage> findNodePagesByWorkflow(SysWorkflow workflow) {
        return super.findListByHql("from SysNodePage t where t.node.sysWorkflow = ? and t.sfyxSt = '1'",workflow);
    }

    @Override
    public List<SysNodePage> findNodePagesByNode(SysNode node) {
        return super.findListByHql("from SysNodePage t where t.node = ? and t.sfyxSt = '1'",node);
    }

    @Override
    public List<Map<String,Object>> querySheetsByNode(Long nodeId){
        return super.getJdbcTemplate().query("SELECT ID, \n" +
                        "TITLE, \n" +
                        "NODE_ID, \n" +
                        "PAGE_ID, \n" +
                        "CONTROL, \n" +
                        "SORT, \n" +
                        "CJR_ID, \n" +
                        "CJSJ, \n" +
                        "SFYX_ST, \n" +
                        "SPX_NAME, \n" +
                        "SPX_SORT, \n" +
                        "SPX_PRINT FROM SYS_NODE_PAGE P WHERE P.SFYX_ST = '1' AND P.NODE_ID=? ORDER BY SORT",
                new RowMapper<Map<String,Object>>() {
                    @Override
                    public Map<String,Object> mapRow(ResultSet rs, int rowNum) throws SQLException {
                        Map<String,Object> row= new HashMap<>();
                        row.put("id",rs.getString("ID"));
                        row.put("title",rs.getString("TITLE"));
                        row.put("node_id",rs.getString("NODE_ID"));
                        row.put("sheet_id",rs.getString("PAGE_ID"));
                        row.put("control",Objects.requireNonNull(SheetMode.get(Integer.parseInt(rs.getString("CONTROL")))).name());
                        row.put("sort",rs.getString("SORT"));
                        row.put("sfyxSt","VALID");
                        row.put("spxName",rs.getString("SPX_NAME"));
                        row.put("spxSort",rs.getString("SPX_SORT"));
                        row.put("spxPrint",rs.getString("SPX_PRINT"));
                        return row;
                    }
                },nodeId);
    }
}
