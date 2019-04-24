package net.ruixin.dao.gzl;

import net.ruixin.domain.plat.auth.ShiroUser;
import net.ruixin.util.hibernate.BaseDao;
import net.ruixin.util.paginate.FastPagination;
import net.ruixin.util.shiro.ShiroKit;
import net.ruixin.util.tools.RxStringUtils;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * 工作流发布 Dao实现
 *
 * @author czq 2019-4-11 17:28:11
 */
@Repository
public class GzlDao extends BaseDao implements IGzlDao {
    @Override
    public FastPagination getAppGzlListPage(Map map) {
        StringBuilder sql = new StringBuilder();
        List<Object> params = new ArrayList<>();
        Integer pageNum = (Integer) map.get("pageNum");
        Integer pageSize = (Integer) map.get("pageSize");
        String sjlxzd = map.get("dataType").toString();
        String sjlyzxt = map.get("sjlyzxt").toString();
        sql.append("SELECT T.ID,\n" +
                "       T.BT,\n" +
                "       T.NR,\n" +
                "       T.FSFS,\n" +
                "       T.JJCD,\n" +
                "       (SELECT SUB.VALUE\n" +
                "          FROM SYS_SUBDICT SUB\n" +
                "         WHERE SUB.DICT_CODE = 'JJCD'\n" +
                "           AND SUB.CODE = T.JJCD\n" +
                "           AND SUB.SFYX_ST = '1') JJCDVALUE,\n" +
                "       T.SJZT,\n" +
                "       (SELECT SUB.VALUE\n" +
                "          FROM SYS_SUBDICT SUB\n" +
                "         WHERE SUB.DICT_CODE = 'SJZT'\n" +
                "           AND SUB.CODE = T.SJZT\n" +
                "           AND SUB.SFYX_ST = '1') SJZTVALUE,\n" +
                "       T.FKLX,\n" +
                "       (SELECT SUB.VALUE\n" +
                "          FROM SYS_SUBDICT SUB\n" +
                "         WHERE SUB.DICT_CODE = 'FKLX'\n" +
                "           AND SUB.CODE = T.FKLX\n" +
                "           AND SUB.SFYX_ST = '1') FKLXVALUE,\n" +
                "       T.FPD,\n" +
                "       T.SJLX,\n" +
                "       T.YDZT,\n" +
                "       T.SHAPE,\n" +
                "       T.FJID,\n" +
                "       T.SJLYZXT,\n" +
                "       T.SJLYLX,\n" +
                "       T.FBDW,\n" +
                "       T.FBDWMC,\n" +
                "       T.CJRMC,\n" +
                "       T.CJSJ,\n" +
                "       T.CJR_ID,\n" +
                "       (SELECT SUB.VALUE\n" +
                "          FROM SYS_SUBDICT SUB\n" +
                "         WHERE SUB.DICT_CODE = T.SJLXZD\n" +
                "           AND SUB.CODE = T.SJLX\n" +
                "           AND SUB.SFYX_ST = '1') SJLXVALUE\n" +
                "  FROM T_GZL_FB T\n" +
                " WHERE T.SFYX_ST = '1'\n" +
                "   AND T.SJLYZXT = ?\n" +
                "   AND T.SJLXZD = ?\n" +
                "   AND (T.ID IN (SELECT T1.FBID FROM T_GZL_JS T1 WHERE T1.JRS_ID = ?) OR\n" +
                "       T.CJR_ID = ?)");
        params.add(sjlyzxt);
        params.add(sjlxzd);
        ShiroUser shiroUser = ShiroKit.getUser();
        params.add(shiroUser.getId());
        params.add(shiroUser.getId());
        if (RxStringUtils.isNotEmpty(map.get("bt"))) {
            sql.append(" AND INSTR(T.BT,?)>0 ");
            params.add(map.get("bt"));
        }
        sql.append("ORDER BY T.XGSJ DESC");
        return super.simpleFastPage(sql, params, pageNum, pageSize);
    }

    @Override
    public Map getLastGzlFk(String fbId) {
        StringBuilder sql = new StringBuilder();
        List<Object> params = new ArrayList<>();
        sql.append("SELECT FK.*,\n" +
                "       (SELECT ATTACH.TYPE\n" +
                "          FROM SYS_ATTACHMENT ATTACH\n" +
                "         WHERE ATTACH.ID = FK.FJID) FJTYPE\n" +
                "  FROM T_GZL_FK FK\n" +
                " WHERE FK.JSID IN (SELECT JS.ID FROM T_GZL_JS JS WHERE JS.FBID = ?)\n");
        params.add(fbId);
        sql.append(" ORDER BY FK.XGSJ DESC");
        List<Map<String, Object>> list = super.getJdbcTemplate().queryForList(sql.toString(), params.toArray());
        if (list.size() > 0) {
            return list.get(0);
        }
        return null;
    }

    @Override
    public List getChattingMessages(Long fbId) {
        StringBuilder sql = new StringBuilder();
        List<Object> params = new ArrayList<>();
        sql.append("SELECT FK.NR \"nr\",\n" +
                "       FK.ID \"id\",\n" +
                "       FK.MSGTYPE \"msgType\",\n" +
                "       FK.CJR_ID \"userId\",\n" +
                "       CASE FK.CJR_ID\n" +
                "         WHEN ? THEN\n" +
                "          'true'\n" +
                "         ELSE\n" +
                "          'false'\n" +
                "       END \"isMe\",\n" +
                "       FK.FJID \"fjId\",\n" +
                "       TO_CHAR(FK.CJSJ, 'YYYY-MM-DD HH24:MI:SS') \"cjsj\",\n" +
                "       FK.CJSJ \"time\",\n" +
                "       ATTACH.NAME || '.' || ATTACH.EXTENSION \"fileName\",\n" +
                "       ATTACH.EXTENSION \"type\",\n" +
                "       US.USER_NAME \"userName\",\n" +
                "       ORGAN.ORGAN_NAME \"organName\"\n" +
                "  FROM T_GZL_FK FK\n" +
                "  LEFT JOIN SYS_ATTACHMENT ATTACH\n" +
                "    ON FK.FJID = ATTACH.ID\n" +
                "  JOIN SYS_USER US\n" +
                "    ON FK.CJR_ID = US.ID\n" +
                "  JOIN SYS_ORGAN ORGAN\n" +
                "    ON US.DEFAULT_ORGAN_ID = ORGAN.ID\n" +
                " WHERE FK.JSID IN (SELECT JS.ID FROM T_GZL_JS JS WHERE JS.FBID = ?)\n");
        params.add(ShiroKit.getUser().getId());
        params.add(fbId);
        sql.append(" ORDER BY FK.CJSJ DESC");
        return super.getJdbcTemplate().queryForList(sql.toString(), params.toArray());
    }

    @Override
    public Map getFirstFeedBack(Long jsId) {
        StringBuilder sql = new StringBuilder();
        List<Object> params = new ArrayList<>();
        sql.append(" SELECT A.*\n" +
                "   FROM (SELECT FK.NR \"nr\",\n" +
                "                FK.ID \"id\",\n" +
                "                FK.JSID \"jsId\",\n" +
                "                JS.FBID \"fbId\",\n" +
                "                FK.MSGTYPE \"msgType\",\n" +
                "                FK.CJR_ID \"userId\",\n" +
                "                CASE FK.CJR_ID\n" +
                "                  WHEN ? THEN\n" +
                "                   'true'\n" +
                "                  ELSE\n" +
                "                   'false'\n" +
                "                END \"isMe\",\n" +
                "                FK.FJID \"fjId\",\n" +
                "                TO_CHAR(FK.CJSJ, 'YYYY-MM-DD HH24:MI:SS') \"cjsj\",\n" +
                "                FK.CJSJ \"time\",\n" +
                "                ATTACH.NAME || '.' || ATTACH.EXTENSION \"fileName\",\n" +
                "                ATTACH.EXTENSION \"type\",\n" +
                "                US.USER_NAME \"userName\",\n" +
                "                ORGAN.ORGAN_NAME \"organName\",\n" +
                "                'true' \"isFirst\"\n" +
                "           FROM T_GZL_FK FK\n" +
                "           LEFT JOIN SYS_ATTACHMENT ATTACH\n" +
                "             ON FK.FJID = ATTACH.ID\n" +
                "           JOIN SYS_USER US\n" +
                "             ON FK.CJR_ID = US.ID\n" +
                "           JOIN SYS_ORGAN ORGAN\n" +
                "             ON US.DEFAULT_ORGAN_ID = ORGAN.ID\n" +
                "           JOIN T_GZL_JS JS\n" +
                "             ON FK.JSID = JS.ID\n" +
                "          WHERE FK.JSID = ?\n" +
                "            AND JS.JRS_ID = FK.CJR_ID\n" +
                "          ORDER BY FK.CJSJ, FK.ID) A\n" +
                "  WHERE ROWNUM = 1");
        params.add(ShiroKit.getUser().getId());
        params.add(jsId);
        List<Map<String, Object>> list = super.getJdbcTemplate().queryForList(sql.toString(), params.toArray());
        if (list.size() > 0) {
            return list.get(0);
        }
        return null;
    }

    @Override
    public List getFeedBacks(Long jsId, Long fkId) {
        StringBuilder sql = new StringBuilder();
        List<Object> params = new ArrayList<>();
        sql.append("SELECT FK.NR \"nr\",\n" +
                "       FK.ID \"id\",\n" +
                "       FK.MSGTYPE \"msgType\",\n" +
                "       FK.CJR_ID \"userId\",\n" +
                "       CASE FK.CJR_ID\n" +
                "         WHEN ? THEN\n" +
                "          'true'\n" +
                "         ELSE\n" +
                "          'false'\n" +
                "       END \"isMe\",\n" +
                "       FK.FJID \"fjId\",\n" +
                "       TO_CHAR(FK.CJSJ, 'YYYY-MM-DD HH24:MI:SS') \"cjsj\",\n" +
                "       FK.CJSJ \"time\",\n" +
                "       ATTACH.NAME || '.' || ATTACH.EXTENSION \"fileName\",\n" +
                "       ATTACH.EXTENSION \"type\",\n" +
                "       US.USER_NAME \"userName\",\n" +
                "       ORGAN.ORGAN_NAME \"organName\",\n" +
                "       'false' \"isFirst\"\n" +
                "  FROM T_GZL_FK FK\n" +
                "  LEFT JOIN SYS_ATTACHMENT ATTACH\n" +
                "    ON FK.FJID = ATTACH.ID\n" +
                "  JOIN SYS_USER US\n" +
                "    ON FK.CJR_ID = US.ID\n" +
                "  JOIN SYS_ORGAN ORGAN\n" +
                "    ON US.DEFAULT_ORGAN_ID = ORGAN.ID\n" +
                " WHERE FK.JSID = ?\n");
        params.add(ShiroKit.getUser().getId());
        params.add(jsId);
        if (RxStringUtils.isNotEmpty(fkId)) {
            sql.append(" AND FK.ID NOT IN (?)");
            params.add(fkId);
        }
        sql.append(" ORDER BY FK.CJSJ, FK.ID ");
        return super.getJdbcTemplate().queryForList(sql.toString(), params.toArray());
    }
}