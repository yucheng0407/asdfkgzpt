package net.ruixin.dao.plat.workflow.impl;

import net.ruixin.dao.plat.workflow.IWorkflowDao;
import net.ruixin.domain.plat.resource.SysResource;
import net.ruixin.domain.plat.workflow.structure.frame.SysWorkflow;
import net.ruixin.enumerate.plat.WorkflowSaveStatus;
import net.ruixin.util.hibernate.BaseDao;
import net.ruixin.util.http.HttpKit;
import net.ruixin.util.paginate.FastPagination;
import net.ruixin.util.tools.IOUtils;
import net.ruixin.util.tools.RxStringUtils;
import net.ruixin.util.tree.FlowTreeNode;
import org.apache.poi.hssf.usermodel.*;
import org.apache.poi.ss.usermodel.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.stereotype.Repository;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.OutputStream;
import java.math.BigDecimal;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * @author Jealous
 * @date 2016-8-10
 * 工作流dao实现
 */
@Repository
public class WorkflowDao extends BaseDao<SysWorkflow> implements IWorkflowDao {

    private static final Logger LOGGER = LoggerFactory.getLogger(WorkflowDao.class);

    @Override
    public Integer getVersion(Long workflowId) {
        String sql = "SELECT NVL(MAX(W.VERSION),0)+1 FROM SYS_WORKFLOW W WHERE W.WORKFLOW_ID=? AND W.SFYX_ST='1' ";
        return jdbcTemplate.queryForObject(sql, Integer.class, workflowId);
    }

    @Override
    public boolean hasRunningWorkflowInstance(Long workflowId) {
        String sql = "SELECT COUNT(1) FROM SYS_WORKFLOW_INSTANCE S WHERE S.WORKFLOW_ID = ? AND S.STATUS = '2' AND SFYX_ST = '1'";
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, workflowId);
        if (count > 0) return true;
        return false;
    }

    @Override
    public List<SysWorkflow> listVersionWorkflow(String workflowCode, Boolean isValid) {
        StringBuilder hql = new StringBuilder("from SysWorkflow t where t.code = ? ");
        if (isValid) {
            hql.append("and t.sfyxSt = '1'");
        } else {
            hql.append("and t.sfyxSt = '0'");
        }
        // 根据版本降序
        hql.append(" order by version desc");
        return super.findListByHql(hql.toString(), workflowCode);
    }

    @Override
    public Integer getNewVersion(String flowCode) {
        String sql = "SELECT NVL(MAX(W.VERSION),0)+1 FROM SYS_WORKFLOW W WHERE W.CODE=? AND W.SFYX_ST='1' ";
        return jdbcTemplate.queryForObject(sql, Integer.class, flowCode);
    }

    @Override
    public boolean calculateLatestVersion() {
        super.prepareCallNoParam("{call PKG_WF.P_CALC_LATEST_VERSION(?,?)}");
        return true;
    }

    @Override
    public void save(SysWorkflow workflow) {
        super.saveOrUpdate(workflow);
        this.getSession().flush();
        this.calculateLatestVersion();
    }

    @Override
    public void update(SysWorkflow workflow) {
        super.saveOrUpdate(workflow);
    }

    @Override
    public SysWorkflow get(Long id) {
        return super.get(id);
    }

    @Override
    public List<SysWorkflow> findByType(Long workfolwTypeId) {
        return super.findListByHql("from SysWorkflow t where t.type.id = ? and t.sfyxSt = '1'", workfolwTypeId);
    }

    @Override
    public List<SysWorkflow> findLatestVersionWfByType(Long workfolwTypeId) {
        return super.findListByHql("from SysWorkflow t where t.type.id = ? and t.sfyxSt = '1'" +
                " and (t.code,t.version) in (select t.code, max(t.version)" +
                " from t where t.sfyxSt = '1' group by t.code) order by t.code", workfolwTypeId);
    }

    @Override
    public SysWorkflow findByCode(String flowCode) {
        List<SysWorkflow> list = super.findListByHql("from SysWorkflow t where t.code = ? and t.sfyxSt = '1'", flowCode);
        return list.size() > 0 ? list.get(0) : null;
    }

    @Override
    public List<SysWorkflow> findAll() {
        return super.findListByHql("from SysWorkflow");
    }

    @Override
    public boolean del(Long id) {
        super.delete(id);
        return true;
    }

    @Override
    public String delWorkflow(Long wiId) {
        return super.prepareCallAndReturn("{call PKG_WF.P_WORKFLOW_DELETE(?,?,?)}", wiId);
    }

    @Override
    public Integer hasChildrenWorkflow(Long workflowTypeId) {
        String sql = "SELECT COUNT(1) FROM SYS_WORKFLOW T WHERE T.SFYX_ST = '1' AND T.TYPE_ID = ?";
        return super.getJdbcTemplate().queryForObject(sql, Integer.class, workflowTypeId);
    }

    @Override
    public String getWorkflowNames(String workflowIds) {
        return super.getJdbcTemplate().queryForObject("SELECT WM_CONCAT(T.NAME) FROM SYS_WORKFLOW T WHERE T.ID IN(SELECT COLUMN_VALUE FROM TABLE(SPLITSTR(?,',')))AND T.SFYX_ST='1'", String.class, workflowIds);
    }

    @Override
    public FastPagination getPageList(Map map) {
        StringBuilder sql = new StringBuilder("SELECT SR.ID, SR.NAME, SR.CODE, SR.URL\n" +
                "  FROM SYS_RESOURCE SR\n" +
                " WHERE SR.TYPE = 'page'\n" +
                "   AND SR.SFYX_ST = '1'");
        List<Object> args = new ArrayList<>();
        if (RxStringUtils.isNotEmpty(map.get("pageName"))) {
            sql.append(" AND SR.NAME LIKE ? ");
            args.add("%" + map.get("pageName") + "%");
        }
        if (RxStringUtils.isNotEmpty(map.get("pageCode"))) {
            sql.append(" AND SR.CODE LIKE ? ");
            args.add("%" + map.get("pageCode") + "%");
        }
        sql.append(" ORDER BY SR.XGSJ DESC ");
        return super.getPaginationBySql(sql, args, map);
    }

    @Override
    public SysResource getResourceById(Long pageId) {
        return (SysResource) super.getSession().get(SysResource.class, pageId);
    }

    @Override
    public void expWorkflow(Long workflowId) {
        //新建工作簿
        HSSFWorkbook workbook = new HSSFWorkbook();
        //查询SYS_WORKFLOW
        String sql = "SELECT * FROM SYS_WORKFLOW W WHERE W.ID=? AND W.SFYX_ST='1'";
        List<Map<String, Object>> workflows = jdbcTemplate.queryForList(sql, workflowId);
        createSheet(workflows, "SYS_WORKFLOW", workbook);
        String flowCode = workflows.get(0).get("CODE").toString();
        //查询SYS_WORKFLOW_VARIABLE
        sql = "SELECT * FROM SYS_WORKFLOW_VARIABLE WV WHERE WV.WORKFLOW_ID=? AND WV.SFYX_ST='1'";
        createSheet(jdbcTemplate.queryForList(sql, workflowId), "SYS_WORKFLOW_VARIABLE", workbook);
        //查询SYS_WORKFLOW_PAGE
        sql = "SELECT * FROM SYS_WORKFLOW_PAGE WP WHERE WP.WORKFLOW_ID=? AND WP.SFYX_ST='1'";
        createSheet(jdbcTemplate.queryForList(sql, workflowId), "SYS_WORKFLOW_PAGE", workbook);
        //查询SYS_NODE
        sql = "SELECT * FROM SYS_NODE N WHERE N.WORKFLOW_ID=? AND N.SFYX_ST='1'";
        List<Map<String, Object>> nodes = jdbcTemplate.queryForList(sql, workflowId);
        createSheet(nodes, "SYS_NODE", workbook);
        for (Map<String, Object> node : nodes) {
            String nodeId = node.get("ID").toString();
            String nodeType = node.get("TYPE").toString();
            //办理环节
            sql = "SELECT * FROM SYS_TRANSACT_NODE TN WHERE TN.ID=?";
            createSheet(jdbcTemplate.queryForList(sql, nodeId), "SYS_TRANSACT_NODE", workbook);
            //活动环节
            if ("2".equals(nodeType)) {
                sql = "SELECT * FROM SYS_ACTIVITY_NODE AN WHERE AN.ID=?";
                createSheet(jdbcTemplate.queryForList(sql, nodeId), "SYS_ACTIVITY_NODE", workbook);
                //决策环节
            } else if ("4".equals(nodeType)) {
                sql = "SELECT * FROM SYS_DECISION_NODE AN WHERE AN.ID=?";
                createSheet(jdbcTemplate.queryForList(sql, nodeId), "SYS_DECISION_NODE", workbook);
            }
            //环节页面
            sql = "SELECT * FROM SYS_NODE_PAGE NP WHERE NP.NODE_ID=? AND NP.SFYX_ST='1'";
            createSheet(jdbcTemplate.queryForList(sql, nodeId), "SYS_NODE_PAGE", workbook);
            //环节按钮
            sql = "SELECT * FROM SYS_NODE_BUTTON NB WHERE NB.NODE_ID=? AND NB.SFYX_ST='1'";
            createSheet(jdbcTemplate.queryForList(sql, nodeId), "SYS_NODE_BUTTON", workbook);
        }
        //查询SYS_ROUTER
        sql = "SELECT * FROM SYS_ROUTER R WHERE R.WORKFLOW_ID=? AND R.SFYX_ST='1'";
        createSheet(jdbcTemplate.queryForList(sql, workflowId), "SYS_ROUTER", workbook);
        //下载工作簿
        HttpServletResponse response = HttpKit.getResponse();
        response.setContentType("application/vnd.ms-excel");
        response.setHeader("Content-disposition", "attachment;filename=" + flowCode + ".xls");
        OutputStream os = null;
        try {
            os = response.getOutputStream();
            workbook.write(os);
            os.flush();
        } catch (IOException e) {
            LOGGER.error("流程导出异常", e);
        } finally {
            IOUtils.close(os);
        }

    }

    //创建sheet并插入数据
    private void createSheet(List<Map<String, Object>> data, String tableName, Workbook workbook) {
        if (data != null && data.size() > 0) {
            Cell cell;
            Sheet sheet = workbook.getSheet(tableName);
            if (sheet != null) {
                //将数据插入excel
                insertDataToExcel(data, sheet);
            } else {
                //查找列注释
                Map columnCommentMap = getColumnComment(tableName);
                //创建sheet
                sheet = workbook.createSheet(tableName);
                //创建第一行
                Row firstRow = sheet.createRow(0);
                //获取第一行数据
                Map firstMap = data.get(0);
                //获取所有列名的数组
                String keystr = firstMap.keySet().toString().replace(" ", "");
                keystr = keystr.substring(1, keystr.length() - 1);
                String[] keys = keystr.split(",");
                //插入第一行列名及对应注释
                for (int i = 0, column = keys.length; i < column; i++) {
                    cell = firstRow.createCell(i);
                    cell.setCellValue(keys[i]);
                    cell.setCellComment(createComment(sheet, RxStringUtils.toEmptyString(columnCommentMap.get(keys[i]))));
                }
                //将数据插入excel
                insertDataToExcel(data, sheet);
            }
        }
    }

    /**
     * 将集合中数据插入excel的sheet中
     *
     * @param data  集合数据
     * @param sheet 对应的sheet
     */
    private void insertDataToExcel(List<Map<String, Object>> data, Sheet sheet) {
        Row row;
        Cell cell;
        Map<String, Object> map;
        int lastRowNum = sheet.getLastRowNum();
        for (int i = 0; i < data.size(); i++) {
            int h = 0;
            row = sheet.createRow(lastRowNum + i + 1);
            map = data.get(i);
            for (Map.Entry<String, Object> entry : map.entrySet()) {
                Object value = entry.getValue();
                if (value == null) {
                    row.createCell(h++, CellType.BLANK);
                } else {
                    if (value instanceof String) {
                        cell = row.createCell(h++, CellType.STRING);
                        cell.setCellValue(value.toString());
                    } else if (value instanceof BigDecimal) {
                        cell = row.createCell(h++, CellType.NUMERIC);
                        String stringValue = value.toString();
                        if (stringValue.contains(".")) {
                            cell.setCellValue(Double.parseDouble(stringValue));
                        } else {
                            cell.setCellValue(Long.parseLong(stringValue));
                        }
                    } else if (value instanceof Date) {
                        cell = row.createCell(h++, CellType.STRING);
                        cell.setCellValue(new SimpleDateFormat("yyyy-MM-dd").format((Date) value));
                    } else if (value instanceof Boolean) {
                        cell = row.createCell(h++, CellType.BOOLEAN);
                        cell.setCellValue((Boolean) value);
                    }
                }
            }
        }
    }

    /**
     * 获取表中所有列对应的注释,以map格式存储
     *
     * @param tableName 表名
     * @return map
     */
    private Map getColumnComment(String tableName) {
        String sql = "SELECT C.COLUMN_NAME,C.COMMENTS FROM USER_COL_COMMENTS C WHERE C.TABLE_NAME=?";
        List<Map<String, Object>> columnComments = jdbcTemplate.queryForList(sql, tableName);
        Map<String, Object> columnCommentMap = new HashMap<>();
        for (Map columnComment : columnComments) {
            columnCommentMap.put(columnComment.get("COLUMN_NAME").toString(), columnComment.get("COMMENTS"));
        }
        return columnCommentMap;
    }

    /**
     * 创建Comment对象
     *
     * @param sheet   sheet
     * @param comment 注释文本内容
     * @return Comment对象
     */
    private Comment createComment(Sheet sheet, String comment) {
        //创建绘图对象
        HSSFPatriarch p = ((HSSFSheet) sheet).createDrawingPatriarch();
        //获取批注对象
        //前四个参数是坐标点,后四个参数是编辑和显示批注时的大小.
        HSSFComment c = p.createComment(new HSSFClientAnchor(0, 0, 0, 0, (short) 3, 3, (short) 5, 6));
        //输入批注信息
        c.setString(new HSSFRichTextString(comment));
        return c;
    }

    @Override
    public Long impWorkflow(Workbook workbook, Long typeId) {
        //SYS_WORKFLOW
        Long wfId = getNextVal("SYS_WORKFLOW");
        Sheet sheet = workbook.getSheet("SYS_WORKFLOW");
        Row firstRow = sheet.getRow(0);
        int lastCellNum = firstRow.getLastCellNum();
        for (int i = 0; i < lastCellNum; i++) {
            if ("ID".equals(firstRow.getCell(i).getStringCellValue())) {
                sheet.getRow(1).getCell(i).setCellValue(wfId);
            }
            if ("TYPE_ID".equals(firstRow.getCell(i).getStringCellValue())) {
                sheet.getRow(1).getCell(i).setCellValue(typeId);
            }
            if ("WORKFLOW_ID".equals(firstRow.getCell(i).getStringCellValue())) {
                sheet.getRow(1).getCell(i).setCellValue(wfId);
            }
            if ("SFYX_ST".equals(firstRow.getCell(i).getStringCellValue())) {
                sheet.getRow(1).getCell(i).setCellValue("0");
            }
        }
        //SYS_WORKFLOW_VARIABLE
        updateSheetByWorkflow(workbook, wfId, "SYS_WORKFLOW_VARIABLE");
        //SYS_WORKFLOW_PAGE
        updateSheetByWorkflow(workbook, wfId, "SYS_WORKFLOW_PAGE");
        //SYS_ROUTER
        updateSheetByWorkflow(workbook, wfId, "SYS_ROUTER");
        //SYS_NODE SYS_TRANSACT_NODE SYS_ACTIVITY_NODE SYS_DECISION_NODE
        //SYS_NODE_PAGE SYS_NODE_BUTTON SYS_ROUTER
        updateSheetByNode(workbook, wfId, "SYS_NODE");
        //同步到数据库
        String[] tableNames = {"SYS_WORKFLOW", "SYS_WORKFLOW_VARIABLE", "SYS_WORKFLOW_PAGE",
                "SYS_NODE", "SYS_TRANSACT_NODE", "SYS_ACTIVITY_NODE", "SYS_DECISION_NODE",
                "SYS_NODE_PAGE", "SYS_NODE_BUTTON", "SYS_ROUTER"};
        for (String tableName : tableNames) {
            insertDataToDb(workbook, tableName);
        }
        return wfId;
    }

    private void updateSheetByWorkflow(Workbook workbook, Long wfId, String tableName) {
        Sheet sheet = workbook.getSheet(tableName);
        if (sheet != null) {
            int lastRowNum = sheet.getLastRowNum();
            Row firstRow = sheet.getRow(0);
            int lastCellNum = firstRow.getLastCellNum();
            for (int i = 0; i < lastCellNum; i++) {
                if ("SYS_ROUTER".equals(tableName)) {
                    if ("WORKFLOW_ID".equals(firstRow.getCell(i).getStringCellValue())) {
                        for (int j = 1; j <= lastRowNum; j++) {
                            sheet.getRow(j).getCell(i).setCellValue(wfId);
                        }
                    }
                } else if ("SYS_WORKFLOW_VARIABLE".equals(tableName) || "SYS_WORKFLOW_PAGE".equals(tableName)) {
                    if ("ID".equals(firstRow.getCell(i).getStringCellValue())) {
                        for (int j = 1; j <= lastRowNum; j++) {
                            sheet.getRow(j).getCell(i).setCellValue(getNextVal(tableName));
                        }
                    }
                    if ("WORKFLOW_ID".equals(firstRow.getCell(i).getStringCellValue())) {
                        for (int j = 1; j <= lastRowNum; j++) {
                            sheet.getRow(j).getCell(i).setCellValue(wfId);
                        }
                    }
                }
            }
        }
    }

    private void updateSheetByNode(Workbook workbook, Long wfId, String tableName) {
        Sheet sheet = workbook.getSheet(tableName);
        if (sheet != null) {
            int index = 0;
            int lastRowNum = sheet.getLastRowNum();
            Row firstRow = sheet.getRow(0);
            int lastCellNum = firstRow.getLastCellNum();
            for (int i = 0; i < lastCellNum; i++) {
                if ("TYPE".equals(firstRow.getCell(i).getStringCellValue())) {
                    index = i;
                    break;
                }
            }
            for (int i = 0; i < lastCellNum; i++) {
                if ("ID".equals(firstRow.getCell(i).getStringCellValue())) {
                    int activityNodeNum = 0;
                    int nodeNum = 0;
                    for (int j = 1; j <= lastRowNum; j++) {
                        Long nodeId = (long) sheet.getRow(j).getCell(i).getNumericCellValue();
                        Long newNodeId = getNextVal(tableName);
                        sheet.getRow(j).getCell(i).setCellValue(newNodeId);
                        String nodeType = sheet.getRow(j).getCell(index).getStringCellValue();
                        if (!"0".equals(nodeType) && !"1".equals(nodeType)) {
                            updateSheetByNode(workbook, nodeId, newNodeId, "SYS_TRANSACT_NODE", 0);
                        }
                        if ("2".equals(nodeType)) {
                            activityNodeNum++;
                            updateSheetByNode(workbook, nodeId, newNodeId, "SYS_ACTIVITY_NODE", 0);
                            updateSheetByNode(workbook, nodeId, newNodeId, "SYS_NODE_PAGE", activityNodeNum);
                            updateSheetByNode(workbook, nodeId, newNodeId, "SYS_NODE_BUTTON", activityNodeNum);
                        }
                        if ("4".equals(nodeType)) {
                            updateSheetByNode(workbook, nodeId, newNodeId, "SYS_DECISION_NODE", 0);
                        }
                        nodeNum++;
                        updateSheetByNode(workbook, nodeId, newNodeId, "SYS_ROUTER", nodeNum);
                    }
                }
                if ("WORKFLOW_ID".equals(firstRow.getCell(i).getStringCellValue())) {
                    for (int j = 1; j <= lastRowNum; j++) {
                        sheet.getRow(j).getCell(i).setCellValue(wfId);
                    }
                }
            }
        }
    }

    private void updateSheetByNode(Workbook workbook, Long nodeId, Long newNodeId, String tableName, int count) {
        Sheet sheet = workbook.getSheet(tableName);
        if (sheet != null) {
            int lastRowNum = sheet.getLastRowNum();
            Row firstRow = sheet.getRow(0);
            int lastCellNum = firstRow.getLastCellNum();
            for (int i = 0; i < lastCellNum; i++) {
                switch (tableName) {
                    case "SYS_NODE_PAGE":
                    case "SYS_NODE_BUTTON":
                        if ("ID".equals(firstRow.getCell(i).getStringCellValue()) && count == 1) {
                            for (int j = 1; j <= lastRowNum; j++) {
                                sheet.getRow(j).getCell(i).setCellValue(getNextVal(tableName));
                            }
                        }
                        if ("NODE_ID".equals(firstRow.getCell(i).getStringCellValue())) {
                            for (int j = 1; j <= lastRowNum; j++) {
                                Long oldNodeId = (long) sheet.getRow(j).getCell(i).getNumericCellValue();
                                if (Objects.equals(oldNodeId, nodeId)) {
                                    sheet.getRow(j).getCell(i).setCellValue(newNodeId);
                                }
                            }
                        }
                        break;
                    case "SYS_TRANSACT_NODE":
                    case "SYS_ACTIVITY_NODE":
                    case "SYS_DECISION_NODE":
                        if ("ID".equals(firstRow.getCell(i).getStringCellValue())) {
                            for (int j = 1; j <= lastRowNum; j++) {
                                Long oldNodeId = (long) sheet.getRow(j).getCell(i).getNumericCellValue();
                                if (Objects.equals(oldNodeId, nodeId)) {
                                    sheet.getRow(j).getCell(i).setCellValue(newNodeId);
                                }
                            }
                        }
                        break;
                    case "SYS_ROUTER":
                        if ("ID".equals(firstRow.getCell(i).getStringCellValue()) && count == 1) {
                            for (int j = 1; j <= lastRowNum; j++) {
                                sheet.getRow(j).getCell(i).setCellValue(getNextVal(tableName));
                            }
                        }
                        if ("START_NODE_ID".equals(firstRow.getCell(i).getStringCellValue())) {
                            for (int j = 1; j <= lastRowNum; j++) {
                                Long oldNodeId = (long) sheet.getRow(j).getCell(i).getNumericCellValue();
                                if (Objects.equals(oldNodeId, nodeId)) {
                                    sheet.getRow(j).getCell(i).setCellValue(newNodeId);
                                }
                            }
                        }
                        if ("END_NODE_ID".equals(firstRow.getCell(i).getStringCellValue())) {
                            for (int j = 1; j <= lastRowNum; j++) {
                                Long oldNodeId = (long) sheet.getRow(j).getCell(i).getNumericCellValue();
                                if (Objects.equals(oldNodeId, nodeId)) {
                                    sheet.getRow(j).getCell(i).setCellValue(newNodeId);
                                }
                            }
                        }
                        break;
                }
            }
        }
    }

    private Long getNextVal(String tableName) {
        if (tableName.length() > 26) {
            tableName = tableName.substring(0, 26);
        }
        String sql = "SELECT SEQ_" + tableName + ".NEXTVAL FROM DUAL";
        return jdbcTemplate.queryForObject(sql, Long.class);
    }

    /**
     * 将工作簿中指定sheet的内容插入对应数据库表中，批量更新
     *
     * @param workbook  工作簿
     * @param tableName 表名、sheet名
     */
    private void insertDataToDb(Workbook workbook, String tableName) {
        final Sheet sheet = workbook.getSheet(tableName);
        if (sheet != null) {
            final int lastRowNum = sheet.getLastRowNum();
            Row firstRow = sheet.getRow(0);
            final int lastCellNum = firstRow.getLastCellNum();
            StringBuilder sql = new StringBuilder();
            sql.append("INSERT INTO ").append(tableName).append(" (");
            for (int i = 0; i < lastCellNum; i++) {
                Cell cell = firstRow.getCell(i);
                String cellValue = cell.getStringCellValue();
                sql.append(cellValue).append(",");
            }
            sql.deleteCharAt(sql.length() - 1).append(") VALUES(");
            for (int i = 0; i < lastCellNum; i++) {
                sql.append("?,");
            }
            sql.deleteCharAt(sql.length() - 1).append(")");
            jdbcTemplate.batchUpdate(sql.toString(), new BatchPreparedStatementSetter() {
                @Override
                public void setValues(PreparedStatement preparedStatement, int i) throws SQLException {
                    for (int j = 0; j < lastCellNum; j++) {
                        Cell cell = sheet.getRow(i + 1).getCell(j);
                        if (cell != null) {
                            CellType cellType = cell.getCellTypeEnum();
                            switch (cellType) {
                                case NUMERIC: {
                                    double numValue = cell.getNumericCellValue();
                                    String strValue = String.valueOf(numValue);
                                    if (strValue.endsWith(".0")) {
                                        preparedStatement.setLong(j + 1, (long) numValue);
                                    } else {
                                        preparedStatement.setDouble(j + 1, numValue);
                                    }
                                    break;
                                }
                                case STRING: {
                                    String strValue = cell.getStringCellValue();
                                    if (isDate(strValue)) {
                                        preparedStatement.setDate(j + 1, toSqlDate(strValue));
                                    } else {
                                        preparedStatement.setString(j + 1, strValue);
                                    }
                                    break;
                                }
                                case BOOLEAN:
                                    preparedStatement.setBoolean(j + 1, cell.getBooleanCellValue());
                                    break;
                                case BLANK:
                                    preparedStatement.setObject(j + 1, null);
                                    break;
                            }
                        } else {
                            preparedStatement.setObject(j + 1, null);
                        }
                    }
                }

                @Override
                public int getBatchSize() {
                    return lastRowNum;
                }
            });
        }
    }

    private boolean isDate(String dateStr) {
        SimpleDateFormat[] formats = {
                new SimpleDateFormat("yyyy-MM-dd"), new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"),
                new SimpleDateFormat("yyyy/MM/dd"), new SimpleDateFormat("yyyy/MM/dd HH:mm:ss")
        };
        return isDate(dateStr, formats);
    }

    private boolean isDate(String dateStr, SimpleDateFormat[] formats) {
        int count = 0;
        for (SimpleDateFormat format : formats) {
            try {
                format.parse(dateStr);
                return true;
            } catch (ParseException e) {
                count++;
            }
        }
        return count < formats.length;
    }

    private java.sql.Date toSqlDate(String dateStr) {
        try {
            return new java.sql.Date(new SimpleDateFormat("yyyy-MM-dd").parse(dateStr).getTime());
        } catch (ParseException e) {
            LOGGER.error("日期转换错误", e);
            return null;
        }
    }

    @Override
    public FastPagination getWorkflowDefList(Map map) {
        List<Object> params = new ArrayList<>();
        StringBuilder sql = new StringBuilder("SELECT G.*,\n" +
                "       (SELECT COUNT(*)\n" +
                "          FROM SYS_WORKFLOW W\n" +
                "         WHERE W.SFYX_ST = '1'\n" +
                "           AND W.CODE = G.CODE) AS TOTAL\n" +
                "  FROM (SELECT T.ID,\n" +
                "               T.CODE,\n" +
                "               T.TYPE_ID,\n" +
                "               T.NAME,\n" +
                "               T.INSTANCE_TITLE,\n" +
                "               T.VERSION,\n" +
                "               T.STATUS,\n" +
                "               DECODE(T.STATUS,'0','草稿','1','启用','2','未启用',T.STATUS) AS STATUS_NAME,\n" +
                "               T.CJSJ,\n" +
                "               ROW_NUMBER() OVER(PARTITION BY CODE ORDER BY DECODE(T.STATUS, '2', '0.5', T.STATUS) DESC NULLS LAST, VERSION DESC, CJSJ DESC) AS ROW_ID\n" +
                "          FROM SYS_WORKFLOW T\n" +
                "         WHERE T.SFYX_ST = '1' AND T.STATUS IS NOT NULL) G\n" +
                " WHERE G.ROW_ID = 1");
        if (RxStringUtils.isNotEmpty(map.get("name"))) {
            sql.append(" AND G.NAME like ? ");
            params.add("%" + map.get("name") + "%");
        }
        if (RxStringUtils.isNotEmpty(map.get("code"))) {
            sql.append(" AND G.CODE like ? ");
            params.add("%" + map.get("code") + "%");
        }
        if (RxStringUtils.isNotEmpty(map.get("status"))) {
            sql.append(" AND G.STATUS = ? ");
            params.add(map.get("status"));
        }
        if (RxStringUtils.isNotEmpty(map.get("typeId"))) {
            sql.append(" AND G.TYPE_ID = ? ");
            params.add(map.get("typeId"));
        }
        sql.append("  ORDER BY G.CJSJ DESC");
        return super.getPaginationBySql(sql, params, map);
    }

    @Override
    public FastPagination getWorkflowVersionList(Map map) {
        List<Object> params = new ArrayList<>();
        StringBuilder sb = new StringBuilder("SELECT T.ID, T.CODE, T.NAME, T.INSTANCE_TITLE, T.VERSION, T.STATUS, DECODE(T.STATUS,'0','草稿','1','启用','2','未启用',T.STATUS) AS STATUS_NAME, T.CJSJ\n" +
                "  FROM SYS_WORKFLOW T\n" +
                " WHERE T.CODE = ?\n" +
                "   AND T.SFYX_ST = '1' AND T.STATUS IS NOT NULL ORDER BY CJSJ DESC");
        params.add(map.get("code"));
        return super.getPaginationBySql(sb, params, map);
    }

    @Override
    public SysWorkflow getReleasedWorkflowByCode(String code) {
        return super.getByHql(" from SysWorkflow where code=? and status='1' and sfyxSt='1'", code);
    }

    @Override
    public void batchHandleWorkflowStatus(String code) {
        super.executeSqlUpdate("UPDATE SYS_WORKFLOW T\n" +
                "   SET T.STATUS = '2'\n" +
                " WHERE T.CODE = ?\n" +
                "   AND T.STATUS = '1'", code);
    }
}
