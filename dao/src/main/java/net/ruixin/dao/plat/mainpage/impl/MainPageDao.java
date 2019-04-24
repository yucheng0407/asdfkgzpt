package net.ruixin.dao.plat.mainpage.impl;

import net.ruixin.dao.plat.mainpage.IMainPageDao;
import net.ruixin.util.hibernate.BaseDao;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;


@Repository
public class MainPageDao extends BaseDao implements IMainPageDao {
    @Override
    public List<Map<String, Object>> getDbrwList(Long userId) {
        String sql = ("SELECT  *\n" +
                "                  FROM (SELECT   DISTINCT WI.ID WORKFLOW_INSTANCE_ID,  \n" +
                "                               'DBRW' TYPE_CODE, \n" +
                "                               W.CODE WF_CODE,  \n" +
                "                               TO_CHAR(T.CJSJ, 'yyyy-mm-dd') CJSJ,  \n" +
                "                               DECODE(WI.DATA_ID, NULL, '(草稿)' || WI.TITLE,WI.TITLE||'('||NE.NAME||')') WORKFLOW_NAME, \n" +
                "                               T.ID RWID  \n" +
                "                          FROM SYS_TASK_INSTANCE     T, \n" +
                "                               SYS_NODE_INSTANCE     N, \n" +
                "                               SYS_NODE              EN, \n" +
                "                               SYS_WORKFLOW          W, \n" +
                "                               SYS_WORKFLOW_INSTANCE WI, \n" +
                "                               SYS_GLB_BIZ_WF WF, \n" +
                "                               SYS_NODE_INSTANCE NI, \n" +
                "                               SYS_NODE NE \n" +
                "                         WHERE \n" +
                "                           NI.WORKFLOW_INSTANCE_ID=WI.ID \n" +
                "                           AND NI.NODE_ID=NE.ID  \n" +
                "                           AND NI.STATUS='1' \n" +
                "                           AND T.NODE_INSTANCE_ID = N.ID \n" +
                "                           AND N.NODE_ID = EN.ID \n" +
                "                           AND EN.WORKFLOW_ID = W.ID \n" +
                "                           AND WI.WORKFLOW_ID = W.ID \n" +
                "                           AND T.WORKFLOW_INSTANCE_ID = WI.ID \n" +
                "                           AND (WI.DATA_ID IS NOT NULL OR \n" +
                "                               T.ID IN (SELECT TASK_INSTANCE_ID \n" +
                "                                           FROM SYS_TASK_PAGE_INSTANCE \n" +
                "                                          WHERE TMP_DATA_JSON IS NOT NULL \n" +
                "                                            AND SFYX_ST = '1')) \n" +
                "                           AND (T.STATUS = '0' OR T.STATUS = '1') \n" +
                "                           AND T.USER_ID = ?   \n" +
                "                         ORDER BY CJSJ DESC) \n" +
                "                 WHERE ROWNUM < 10 ");
        return getJdbcTemplate().queryForList(sql, userId);
    }
}
