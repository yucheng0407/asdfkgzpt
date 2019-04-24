package net.ruixin.dao.qzld;

import net.ruixin.domain.gzl.GzlFk;
import net.ruixin.domain.plat.auth.ShiroUser;
import net.ruixin.util.hibernate.BaseDao;
import net.ruixin.util.mapUtil.MapUtil;
import net.ruixin.util.paginate.FastPagination;
import net.ruixin.util.shiro.ShiroKit;
import net.ruixin.util.tools.RxStringUtils;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Repository
public class FkzlDao extends BaseDao<GzlFk> implements IFkzlDao {

    @Override
    public FastPagination getFkzlFkList(Map map) {
        ShiroUser user = ShiroKit.getUser();
        StringBuilder sql = new StringBuilder();
        List<Object> params = new ArrayList<>();
        sql.append("SELECT * FROM (" +
                "  SELECT FB.BT,FB.NR,JS.YDZT,DECODE(FB.SJLYLX,'4','防控反馈','防范反馈')FKLX,TO_CHAR(FB.XGSJ,'YYYY-MM-DD HH24:MI:SS')CJSJ, " +
                "     FB.FBDWMC,FB.CJRMC,FB.ID FBID,JS.ID JSID,JS.XGSJ,'1' SFKHF FROM T_GZL_FB FB " +
                "   LEFT JOIN T_GZL_JS JS ON FB.ID=JS.FBID AND FB.SFYX_ST='1' AND JS.SFYX_ST='1' " +
                "   WHERE FB.SJLYLX IN ('4','5') AND JS.JRS_ID=? " +
                "   UNION ALL " +
                "   SELECT FB.BT,FB.NR,TO_CHAR(SIGN((SELECT COUNT(1) FROM T_GZL_HLW_YDZT GH WHERE GH.FBID=FB.ID AND GH.JSRID=?))) YDZT, " +
                "     DECODE(FB.SJLYLX,'3','纠纷调解','4','治安防范','5','重点关注','治安宣传')FKLX,TO_CHAR(FB.XGSJ,'YYYY-MM-DD HH24:MI:SS')CJSJ, " +
                "     FB.FBDWMC,FB.CJRMC,FB.ID FBID,null JSID,FB.XGSJ XGSJ,'0' SFKHF FROM T_GZL_HLW_FB FB " +
                "   WHERE FB.SFYX_ST='1' AND FB.SJLYLX IN ('3','4','5','6') ) WHERE 1=1 ");
        params.add(user.getId());
        params.add(user.getId());
        if (RxStringUtils.isNotEmpty(map.get("ydzt")) && !"NOQUERY".equals(map.get("ydzt"))) {
            sql.append(" AND YDZT=? ");
            params.add(map.get("ydzt"));
        }
        if (RxStringUtils.isNotEmpty(map.get("fklx"))) {
            sql.append(" AND FKLX = ? ");
            params.add(map.get("fklx"));
        }
        if (RxStringUtils.isNotEmpty(map.get("nr"))) {
            sql.append(" AND INSTR(NR,?)>0 ");
            params.add(map.get("nr"));
        }
        sql.append(" ORDER BY XGSJ DESC");
        FastPagination fastPagination = super.getPaginationBySql(sql, params, map);
        MapUtil.handleGeometryToArcgis(fastPagination.getRows());
        return fastPagination;
    }

    /**
     * 更新互联网数据同步回公安网后阅读状态
     *
     * @param fbid 工作流-发布表的主键ID
     * @return
     */
    @Override
    public void insertGzlHlwYdzt(Long fbid) {
        ShiroUser user = ShiroKit.getUser();
        String sql = "INSERT INTO T_GZL_HLW_YDZT VALUES (SEQ_T_GZL_HLW_YDZT.NEXTVAL,?,?,SYSDATE)";
        super.executeSqlUpdate(sql, fbid, user.getId());
    }

    /**
     * 设置公安网信息已读
     *
     * @param jsid 工作流-接收表的主键ID
     */
    @Override
    public void setGzlYdzt(Long jsid) {
        ShiroUser user = ShiroKit.getUser();
        String sql = "UPDATE T_GZL_JS T SET T.YDZT='1',T.XGR_ID=?,T.XGSJ=SYSDATE WHERE T.ID=?";
        super.executeSqlUpdate(sql, user.getId(), jsid);
    }

    /**
     * 获取反馈详细信息
     *
     * @param fbid  工作流-发布的主键ID
     * @param sfkhf 是否可回复 0-不可回复，读互联网端数据；1-可回复，读公安网端数据
     * @return
     */
    @Override
    public List<Map<String, Object>> getFkzlFkDetail(Long fbid, String sfkhf) {
        String sql = "";
        List<Map<String, Object>> menuList = new ArrayList<>();
        List<Map<String, Object>> partList = new ArrayList<>();
        //sfkhf：0-不可回复，读互联网端数据；1-可回复，读公安网端数据
        if ("1".equals(sfkhf)) {
            sql = "SELECT FB.BT,FB.NR,FB.FBDWMC,FB.CJRMC,TO_CHAR(FB.XGSJ,'YYYY-MM-DD HH24:MI')CJSJ,FB.FJID FROM T_GZL_FB FB WHERE ID=?";
            partList = this.getJdbcTemplate().queryForList(sql, fbid);
            //添加发布人信息
            menuList.add(0, partList.get(0));
            menuList.get(0).put("CHILD_MENU", getJxfbListBy(fbid));
            //添加接收人信息
            sql = "SELECT * FROM (SELECT JS.ID JSID,JS.JSRMC,JS.JSDWMC,(SELECT COUNT(1) FROM T_GZL_FK FK WHERE FK.JSID=JS.ID AND FK.SFYX_ST='1') FKSL " +
                    "FROM T_GZL_JS JS WHERE JS.FBID=? AND JS.SFYX_ST='1' ORDER BY JS.JRS_ID )WHERE  FKSL>0 ";
            partList = this.getJdbcTemplate().queryForList(sql, fbid);
            for (int i = 0; i < partList.size(); i++) {
                menuList.add(i + 1, partList.get(i));
                menuList.get(i + 1).put("CHILD_MENU", getFkxxListBy(Long.valueOf(partList.get(i).get("JSID").toString())));
            }
        } else {
            sql = "SELECT FB.BT,FB.NR,FB.FBDWMC,FB.CJRMC,TO_CHAR(FB.XGSJ,'YYYY-MM-DD HH24:MI')CJSJ,FB.FJID FROM T_GZL_HLW_FB FB WHERE ID=?";
            partList = this.getJdbcTemplate().queryForList(sql, fbid);
            //添加发布人信息
            menuList.add(0, partList.get(0));
            menuList.get(0).put("CHILD_MENU", getHlwJxfbListBy(fbid));
            //添加接收人信息
            sql = "SELECT * FROM (SELECT JS.ID JSID,JS.JSRMC,JS.JSDWMC,(SELECT COUNT(1) FROM T_GZL_HLW_FK FK WHERE FK.JSID=JS.ID AND FK.SFYX_ST='1') FKSL " +
                    "FROM T_GZL_HLW_JS JS WHERE JS.FBID=? AND JS.SFYX_ST='1' ORDER BY JS.JRS_ID )WHERE  FKSL>0 ";
            partList = this.getJdbcTemplate().queryForList(sql, fbid);
            for (int i = 0; i < partList.size(); i++) {
                menuList.add(i + 1, partList.get(i));
                menuList.get(i + 1).put("CHILD_MENU", getHlwFkxxListBy(Long.valueOf(partList.get(i).get("JSID").toString())));
            }
        }
        return menuList;
    }

    @Override
    public List getXzqh() {
        StringBuilder sql = new StringBuilder();
        sql.append("SELECT H.GEOM       SHOW_GEOMETRY,\n" +
                "       N.ORGAN_NAME \"name\",\n" +
                "       N.ID \"id\",\n" +
                "       N.PARENT_ORG \"pId\",\n" +
                "       N.ORGAN_CODE DM\n" +
                "  FROM SYS_ORGAN N\n" +
                "  LEFT JOIN T_PCS_XZQH H\n" +
                "    ON H.ZZJJDM = N.ORGAN_CODE");
        return  MapUtil.handleGeometryToArcgis((List)(this.getJdbcTemplate().queryForList(sql.toString())));
    }

    /**
     * 通过发布ID获取继续发布信息（公安网数据）
     *
     * @param fbid 工作流-发布的主键ID
     * @return
     */
    private List<Map<String, Object>> getJxfbListBy(Long fbid) {
        String sql = "SELECT JXFB.NR,JXFB.FJID,TO_CHAR(JXFB.XGSJ,'YYYY-MM-DD HH24:MI')XGSJ FROM T_GZL_JXFB JXFB WHERE JXFB.SFYX_ST='1' AND FBID=? AND JSID IS NULL";
        return this.getJdbcTemplate().queryForList(sql, fbid);
    }

    /**
     * 通过发布ID获取继续发布信息（互联网数据）
     *
     * @param fbid 工作流-发布的主键ID
     * @return
     */
    private List<Map<String, Object>> getHlwJxfbListBy(Long fbid) {
        String sql = "SELECT JXFB.NR,JXFB.FJID,TO_CHAR(JXFB.XGSJ,'YYYY-MM-DD HH24:MI')XGSJ FROM T_GZL_HLW_JXFB JXFB WHERE JXFB.SFYX_ST='1' AND FBID=? AND JSID IS NULL";
        return this.getJdbcTemplate().queryForList(sql, fbid);
    }

    /**
     * 通过接收ID获取继续反馈信息（公安网数据）
     *
     * @param jsid 工作流-接收的主键ID
     * @return
     */
    private List<Map<String, Object>> getFkxxListBy(Long jsid) {
        String sql = "SELECT * FROM " +
                "     (SELECT FK.NR,FK.FJID,TO_CHAR(FK.XGSJ,'YYYY-MM-DD HH24:MI')XGSJ,'jsr' MARK FROM T_GZL_FK FK WHERE FK.SFYX_ST='1' AND FK.JSID=? " +
                "     UNION ALL " +
                "     SELECT JXFB.NR,JXFB.FJID,TO_CHAR(JXFB.XGSJ,'YYYY-MM-DD HH24:MI')XGSJ,'fbr' MARK FROM T_GZL_JXFB JXFB WHERE JXFB.SFYX_ST='1' AND JXFB.JSID=?) ORDER BY XGSJ";
        return this.getJdbcTemplate().queryForList(sql, jsid, jsid);
    }

    /**
     * 通过接收ID获取继续反馈信息（互联网数据）
     *
     * @param jsid 工作流-接收的主键ID
     * @return
     */
    private List<Map<String, Object>> getHlwFkxxListBy(Long jsid) {
        String sql = "SELECT * FROM " +
                "     (SELECT FK.NR,FK.FJID,TO_CHAR(FK.XGSJ,'YYYY-MM-DD HH24:MI')XGSJ,'jsr' MARK FROM T_GZL_HLW_FK FK WHERE FK.SFYX_ST='1' AND FK.JSID=? " +
                "     UNION ALL " +
                "     SELECT JXFB.NR,JXFB.FJID,TO_CHAR(JXFB.XGSJ,'YYYY-MM-DD HH24:MI')XGSJ,'fbr' MARK FROM T_GZL_HLW_JXFB JXFB WHERE JXFB.SFYX_ST='1' AND JXFB.JSID=?) ORDER BY XGSJ";
        return this.getJdbcTemplate().queryForList(sql, jsid, jsid);
    }
}
