package net.ruixin.dao.plat.message;

import net.ruixin.domain.plat.message.Message;
import net.ruixin.util.hibernate.BaseDao;
import net.ruixin.util.paginate.FastPagination;
import net.ruixin.util.tools.RxStringUtils;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * @author Pitcher
 */
@Repository
public class MessageDao extends BaseDao<Message> implements IMessageDao {

    @Override
    public void readMessage(Long messageId, Long userId) {
        String sql = "UPDATE SYS_GLB_MESSAGE_USER SGU  SET STATUS='2' WHERE SGU.MESSAGE_ID=? AND SGU.USER_ID=?";
        executeSqlUpdate(sql, messageId, userId);
    }

    @Override
    public FastPagination getMessagePage(Map map) {
        StringBuilder sql = new StringBuilder();
        List<Object> params = new ArrayList<>();
        sql.append("\n" +
                "SELECT M.TITLE,\n" +
                "       M.CONTENT,\n" +
                "       M.SOURCE,\n" +
                "       M.PARAM,\n" +
                "       MT.URGENT_LEVEL,\n" +
                "       MT.VALID_TIME,\n" +
                "       M.ID MSG_ID,\n" +
                "      (SELECT U.REMARK FROM SYS_DICT T, SYS_SUBDICT U\n" +
                "   WHERE T.DICT_CODE=U.DICT_CODE AND T.DICT_CODE ='WINSIZE' AND U.CODE=MT.WIN_SIZE) WIN_SIZE," +
                "       MT.SKIP_PATH,\n" +
                "       MT.SKIP_TYPE,\n" +
                "       MT.OPERATE_TYPE,\n" +
                "       TO_CHAR(GM.RECEIVE_TIME,'YYYY-MM-DD')RECEIVE_TIME, \n" +
                "    GM.STATUS \n" +
                "  FROM SYS_GLB_MESSAGE_USER GM, SYS_MESSAGE M, SYS_MESSAGE_TYPE MT\n" +
                " WHERE M.TYPE_CODE = MT.CODE\n" +
                "   AND GM.MESSAGE_ID = M.ID\n" +
                "   AND M.SFYX_ST = '1'\n" +
                "   AND MT.SFYX_ST='1'\n" +
                "   AND GM.SFYX_ST='1' ");
        if (RxStringUtils.isNotEmpty(map.get("userId"))) {
            sql.append("AND GM.USER_ID=?");
            params.add(map.get("userId"));
        }
        sql.append("ORDER BY GM.STATUS,GM.RECEIVE_TIME DESC");
        return super.getPaginationBySql(sql, params, map);
    }

    @Override
    public List<Map<String, Object>> getMessageList(Long userId) {
        String sql = "select * from (" +
                "\n" +
                "SELECT M.TITLE,\n" +
                "       M.CONTENT,\n" +
                "       M.SOURCE,\n" +
                "       M.PARAM,\n" +
                "       MT.NAME TYPE_NAME," +
                "       MT.CODE TYPE_CODE," +
                "      (SELECT U.VALUE FROM SYS_DICT T, SYS_SUBDICT U\n" +
                "   WHERE T.DICT_CODE=U.DICT_CODE AND T.DICT_CODE ='XXJJCD' AND U.CODE=MT.URGENT_LEVEL) URGENT_LEVEL, " +
                "       MT.VALID_TIME,\n" +
                "       M.ID MSG_ID,\n" +
                "      (SELECT U.REMARK FROM SYS_DICT T, SYS_SUBDICT U\n" +
                "   WHERE T.DICT_CODE=U.DICT_CODE AND T.DICT_CODE ='WINSIZE' AND U.CODE=MT.WIN_SIZE) WIN_SIZE," +
                "       MT.SKIP_PATH,\n" +
                "       MT.SKIP_TYPE,\n" +
                "       MT.OPERATE_TYPE,\n" +
                "       TO_CHAR(GM.RECEIVE_TIME,'YYYY-MM-DD')RECEIVE_TIME, \n" +
                "    GM.STATUS \n" +
                "  FROM SYS_GLB_MESSAGE_USER GM, SYS_MESSAGE M, SYS_MESSAGE_TYPE MT\n" +
                " WHERE M.TYPE_CODE = MT.CODE\n" +
                "   AND GM.MESSAGE_ID = M.ID\n" +
                "   AND M.SFYX_ST = '1'\n" +
                "   AND MT.SFYX_ST='1'\n" +
                "   AND GM.STATUS='1'\n" +
                "   AND GM.SFYX_ST='1' AND GM.USER_ID=?" +
                " ORDER BY GM.RECEIVE_TIME DESC" +
                ") where rownum<=6";
        return getJdbcTemplate().queryForList(sql, userId);
    }
//
//    @Override
//    public List<Map<String, Object>> getMessageViewById(Long userId, Long msgId) {
//
//        StringBuilder sql = new StringBuilder();
//        sql.append("\n" +
//                "SELECT M.TITLE,\n" +
//                "       M.CONTENT,\n" +
//                "       M.SOURCE,\n" +
//                "       M.PARAM,\n" +
//                "      (SELECT U.VALUE FROM SYS_DICT T, SYS_SUBDICT U\n" +
//                "   WHERE T.DICT_CODE=U.DICT_CODE AND T.DICT_CODE ='XXJJCD' AND U.CODE=MT.URGENT_LEVEL) URGENT_LEVEL, " +
//                "       MT.VALID_TIME,\n" +
//                "       M.ID MSG_ID,\n" +
//                "      (SELECT U.REMARK FROM SYS_DICT T, SYS_SUBDICT U\n" +
//                "   WHERE T.DICT_CODE=U.DICT_CODE AND T.DICT_CODE ='WINSIZE' AND U.CODE=MT.WIN_SIZE) WIN_SIZE," +
//                "       MT.SKIP_PATH,\n" +
//                "       MT.SKIP_TYPE,\n" +
//                "       MT.OPERATE_TYPE,\n" +
//                "       TO_CHAR(GM.RECEIVE_TIME,'YYYY-MM-DD')RECEIVE_TIME, \n" +
//                "    GM.STATUS \n" +
//                "  FROM SYS_GLB_MESSAGE_USER GM, SYS_MESSAGE M, SYS_MESSAGE_TYPE MT\n" +
//                " WHERE M.TYPE_CODE = MT.CODE\n" +
//                "   AND GM.MESSAGE_ID = M.ID\n" +
//                "   AND M.SFYX_ST = '1'\n" +
//                "   AND MT.SFYX_ST='1'\n" +
//                "   AND GM.STATUS='1'\n" +
//                "   AND GM.SFYX_ST='1' AND GM.USER_ID=? AND M.ID=?");
//        sql.append(" ORDER BY GM.RECEIVE_TIME DESC");
//        return getJdbcTemplate().queryForList(sql.toString(), userId, msgId);
//    }


}