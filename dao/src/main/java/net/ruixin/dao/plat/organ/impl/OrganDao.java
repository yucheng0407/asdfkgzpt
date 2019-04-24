package net.ruixin.dao.plat.organ.impl;

import net.ruixin.dao.plat.auth.IDataAuthDao;
import net.ruixin.dao.plat.organ.IOrganDao;
import net.ruixin.domain.plat.auth.AuthResult;
import net.ruixin.domain.plat.auth.SysGlbRole;
import net.ruixin.domain.plat.organ.SysOrgan;
import net.ruixin.enumerate.plat.SfyxSt;
import net.ruixin.util.cache.Cache;
import net.ruixin.util.cache.CacheKit;
import net.ruixin.util.hibernate.BaseDao;
import net.ruixin.util.http.HttpKit;
import net.ruixin.util.paginate.FastPagination;
import net.ruixin.util.tools.RxStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author Pitcher
 * @date 2016-8-16
 * 机构DAO实现
 */
@SuppressWarnings("unchecked")
@Repository
public class OrganDao extends BaseDao<SysOrgan> implements IOrganDao {

    @Autowired
    IDataAuthDao dataAuthDao;

    @Override
    public FastPagination getSysOrganListPage(Map map) {
        StringBuilder sql = new StringBuilder();
        List<Object> params = new ArrayList<>();
        sql.append("SELECT  A.* FROM (SELECT O.ID,\n" +
                " 2 UTYPE,\n" +
                "       O.ORGAN_NAME,\n" +
                "       O.ORGAN_CODE,\n" +
                "       O.FULL_NAME,\n" +
                "       O.SFYX_ST,\n" +
                "       O.XGSJ,\n" +
                "       (SELECT ORGAN_NAME FROM SYS_ORGAN WHERE ID = O.PARENT_ORG) PARENT_ORG\n" +
                "  FROM SYS_ORGAN O\n" +
                " WHERE O.SFYX_ST='1' AND 1 = 1");

        if (RxStringUtils.isNotEmpty(map.get("organName"))) {
            sql.append(" AND O.ORGAN_NAME LIKE ? ");
            params.add("%" + map.get("organName") + "%");
        }
        if (RxStringUtils.isNotEmpty(map.get("fullName"))) {
            sql.append(" AND O.FULL_NAME LIKE ? ");
            params.add("%" + map.get("fullName") + "%");
        }
        if (RxStringUtils.isNotEmpty(map.get("organCode"))) {
            sql.append(" AND O.ORGAN_CODE LIKE ? ");
            params.add("%" + map.get("organCode") + "%");
        }
        sql.append(" AND (O.SFYX_ST = '1' ) ");
        if (RxStringUtils.isNotEmpty(map.get("parentId"))) {
            sql.append(" AND O.PARENT_ORG = ? ");
            sql.append("UNION ALL\n" +
                    "SELECT O.ID,\n" +
                    " 1 UTYPE,\n" +
                    "       O.ORGAN_NAME,\n" +
                    "       O.ORGAN_CODE,\n" +
                    "       O.FULL_NAME,\n" +
                    "       O.SFYX_ST,\n" +
                    "      O.XGSJ,\n" +
                    "       (SELECT ORGAN_NAME FROM SYS_ORGAN WHERE ID = O.PARENT_ORG) SJ_ORGAN\n" +
                    "  FROM SYS_ORGAN O\n" +
                    " WHERE O.SFYX_ST='1' AND 1 = 1\n" +
                    "   AND O.ID = ?\n");
            params.add(map.get("parentId"));
            params.add(map.get("parentId"));
        } else if (RxStringUtils.isNotEmpty(map.get("userId"))) {
            //数据权限控制
            AuthResult ar = dataAuthDao.getUserDataAuthResult(Long.valueOf(map.get("userId").toString()), "organ");
            if (ar.getHasAuth()) {
                if (!ar.getHasAll()) {
                    List<Map<String, Object>> authOrgansWithChild = getChildOrgans(ar.getOids());
                    String ids = RxStringUtils.listToString(authOrgansWithChild, ',', "ID");
                    sql.append("AND ( ").append(RxStringUtils.getInSql("O.PARENT_ORG", ids)).append(" OR ")
                            .append(RxStringUtils.getInSql("O.ID", ar.getOids())).append(")");
                }
            } else {
                //无权限
                sql.append(" AND O.ID = 0 ");
            }
        }
        sql.append(") A ORDER BY A.UTYPE, A.XGSJ DESC ");
        return super.getPaginationBySql(sql, params, map);
    }


    @Override
    public void saveSysOrgan(SysOrgan sysOrgan) {
        StringBuilder addRoles = new StringBuilder();
        StringBuilder delRoles = new StringBuilder();
        for (SysGlbRole sysGlbRole : sysOrgan.getSysGlbRoleList()) {
            //获取新增的角色无id,删除的角色sfyxSt为UNVALID
            if (null == sysGlbRole.getId() || sysOrgan.getSysGlbRoleList().get(0).getSfyxSt().equals(SfyxSt.UNVALID)) {
                addRoles.append(sysGlbRole.getRoleId()).append(",");
            } else if (null != sysGlbRole.getId() && sysOrgan.getSysGlbRoleList().get(0).getSfyxSt().equals(SfyxSt.UNVALID)) {
                delRoles.append(sysGlbRole.getRoleId()).append(",");
            }
        }
        super.prepareCallNoReturn("{call PKG_BASEPLAT.P_DEL_USER_ROLE_IF_ORGAN_EXIST(?,?,?,?)}", sysOrgan.getId(), addRoles.toString(), delRoles.toString());

        super.saveOrUpdate(sysOrgan);
        super.getSession().flush();

        //调用存储过程
        List<Object> params = new ArrayList<>();
        params.add(sysOrgan.getId());
        params.add("ORGAN");
        super.prepareCallNoReturn("{call PKG_BASEPLAT.P_SAVE_ORGAN_POST_USER(?,?,?)}", params.toArray());
    }

    @Override
    public void deleteOrgan(Long organId, Long newOrganId) {
        if (null == newOrganId) {
            delete(organId);
        } else {
            delete(organId);
            //调用存储过程
            List<Object> params = new ArrayList<>();
            //机构id
            params.add(organId);
            params.add("ORGAN");
            //调整后机构id
            params.add(newOrganId);
            super.prepareCallNoReturn("{call PKG_BASEPLAT.P_DELETE_ORGAN_POST_USER(?,?,?,?)}", params.toArray());
        }
    }

    @Override
    public SysOrgan getSysOrganById(Long id) {
        return super.get(id);
    }

    @Override
    public List<Map<String, Object>> getOrganListByParentId(Long id) {
        StringBuilder sql = new StringBuilder("SELECT O.ID,\n" +
                "       O.ORGAN_CODE,\n" +
                "       O.ORGAN_NAME MC,\n" +
                "       O.FULL_NAME QC,\n" +
                "       O.PARENT_ORG,\n" +
                "       O.SFYX_ST,\n" +
                "       (SELECT COUNT(1)\n" +
                "          FROM SYS_ORGAN SO\n" +
                "         WHERE SO.PARENT_ORG = O.ID\n" +
                "           AND SO.SFYX_ST = '1' ) JGCT,\n" + //机构总数
                "(SELECT COUNT(1)\n" +
                "  FROM SYS_GLB_ROLE G, SYS_ROLE R\n" +
                " WHERE G.GL_ID = O.ID\n" +
                "   AND G.GL_TYPE = 2\n" +
                "   AND R.ROLE_TYPE = 3\n" +
                "   AND G.SFYX_ST = 1\n" +
                "   AND R.SFYX_ST = 1\n" +
                "   AND G.ROLE_ID = R.ID) GWCT,\n" +
                "       (SELECT COUNT(OUP.USER_ID)\n" +
                "          FROM SYS_GLB_USER OUP\n" +
                "         WHERE OUP.ORGAN_ID = O.ID\n" +
                "           AND OUP.SFYX_ST = '1') USERCT\n" +  //用户总数
                "  FROM SYS_ORGAN O\n" +
                " WHERE 1 = 1\n" +
                "   AND O.SFYX_ST = '1'");

        if (null == id || 0 == id) {
            sql.append(" AND O.PARENT_ORG IS NULL ORDER BY O.SORT_NUM,O.ID ");
            return super.getJdbcTemplate().queryForList(sql.toString());
        } else {
            sql.append(" AND O.PARENT_ORG = ? ORDER BY O.SORT_NUM,O.ID ");
            return super.getJdbcTemplate().queryForList(sql.toString(), id);
        }
    }

    @Override
    public boolean hasOrganName(Long organId, String organName, Long parentOrg) {
        //无上级组织
        if (null == parentOrg) {
            return false;
        }
        StringBuilder sql = new StringBuilder("SELECT COUNT(O.ID) SL FROM SYS_ORGAN O " +
                "WHERE O.PARENT_ORG=:PARENT_ORG AND O.ORGAN_NAME=:ORGAN_NAME AND O.SFYX_ST='1'");
        Map<String, Object> queryMap = new HashMap<>();
        queryMap.put("PARENT_ORG", parentOrg);
        queryMap.put("ORGAN_NAME", organName);
        //修改时判断非本身
        if (null != organId) {
            sql.append(" AND O.ID <> :ORGAN_ID ");
            queryMap.put("ORGAN_ID", organId);
        }
        Map map = super.getNpJdbcTemplate().queryForMap(sql.toString(), queryMap);
        return Integer.parseInt(map.get("SL").toString()) > 0;
    }

    @Override
    public List<Map<String, Object>> getUserOrganPostRole(Long userId) {
        String sql = "SELECT OUP.ORGAN_ID, OUP.POST_ID, O.ORGAN_NAME, P.ROLE_NAME POST_NAME\n" +
                "  FROM SYS_GLB_USER OUP\n" +
                "  LEFT JOIN SYS_ORGAN O\n" +
                "    ON OUP.ORGAN_ID = O.ID\n" +
                "   AND O.SFYX_ST = '1'\n" +
                "  LEFT JOIN SYS_ROLE P\n" +
                "    ON OUP.POST_ID = P.ID\n" +
                "   AND P.SFYX_ST = '1'\n" +
                "   AND P.ROLE_TYPE='3'\n" +
                " WHERE OUP.USER_ID = ?\n" +
                "   AND OUP.SFYX_ST = '1' ";
        return super.getJdbcTemplate().queryForList(sql, userId);
    }

    @Override
    public SysOrgan getOrganByCode(String code) {
        return super.getByHql("FROM  SysOrgan  WHERE  ORGAN_CODE = ? AND SFYX_ST='1' ", code);
    }

    @Override
    public List<Map<String, Object>> getOrganTree(Long id, String kind) {
        StringBuilder sb = new StringBuilder();
        if (id != null) {
            sb.append("  SELECT OG.FULL_NAME,\n" +
                    "          OG.ID,\n" +
                    "          OG.ORGAN_NAME,\n" +
                    "          OG.PARENT_ORG,\n");
            if ("o".equals(kind)) {
                sb.append("(COUNT(OGG.ID)) JGCT");
            } else if ("ou".equals(kind)) {
                sb.append("(COUNT(OGG.ID) + COUNT(UR.ID)) JGCT");
            }
            sb.append("     FROM SYS_ORGAN OG\n" +
                    "   \n" +
                    "     LEFT JOIN SYS_ORGAN OGG\n" +
                    "       ON OGG.PARENT_ORG = OG.ID\n" +
                    "     LEFT JOIN SYS_USER UR\n" +
                    "       ON UR.DEFAULT_ORGAN_ID = OG.ID\n" +
                    "    WHERE OG.PARENT_ORG = ?\n" +
                    "      AND OG.SFYX_ST = '1'\n" +
                    "    GROUP BY OG.FULL_NAME, OG.ID, OG.ORGAN_NAME, OG.PARENT_ORG");
            return jdbcTemplate.queryForList(sb.toString(), id);
        } else {
            sb.append("SELECT OG.FULL_NAME,OG.ID,OG.ORGAN_NAME,OG.PARENT_ORG, (SELECT COUNT(1) FROM SYS_ORGAN OGG WHERE OGG.PARENT_ORG = OG.ID) JGCT  FROM SYS_ORGAN OG WHERE OG.PARENT_ORG is null AND OG.SFYX_ST='1'");
            return jdbcTemplate.queryForList(sb.toString());
        }
    }


    @Override
    @Deprecated
    public void changeTreeNodeSortAndParent(String ids, Long parentId) {
        if (RxStringUtils.isEmpty(ids)) {
            return;
        }
        String[] idArr = ids.split(",");
        String sql = "UPDATE SYS_ORGAN  SET PARENT_ORG=? , SORT_NUM =? WHERE ID=?";
        List<Object> args;
        for (int i = 0; i < idArr.length; i++) {
            args = new ArrayList<>();
            args.add(parentId);
            args.add(i + 1);
            args.add(idArr[i]);
            super.jdbcTemplate.update(sql, args.toArray());
        }
    }

    @Override
    public List getOrganTbTreeDataListByRoleId(Long tid, Long roleId) {
        List args = new ArrayList();
        StringBuilder sb = new StringBuilder("SELECT LO.ID \"id\",\n" +
                "       LO.ID || 'jg' \"handleId\",\n" +
                "       LO.FULL_NAME \"qc\",\n" +
                "       LO.ORGAN_NAME \"name\",\n" +
                "       ?  \"icon\"," +
                "       'jg' \"lx\",\n" +
                "       LO.PARENT_ORG || 'jg' \"pId\",\n");
        args.add(HttpKit.handleCtxPath(CacheKit.get(Cache.CONFIG, "organIcon")));
        if (null != roleId) {
            sb.append("       (SELECT GR.ID\n" +
                    "          FROM SYS_GLB_ROLE GR\n" +
                    "         WHERE GR.ROLE_ID = ?\n" +
                    "           AND GR.GL_TYPE = '2'\n" +
                    "           AND GR.GL_ID = LO.ID\n" +
                    "           AND GR.SFYX_ST = '1' AND ROWNUM < 2 ) \"roleId\",\n");
            args.add(roleId);
        }
        sb.append("       LO.SFYX_ST \"sfyx_st\",\n" +
                "       LO.SORT_NUM \"sort\",\n" +
                "       LO.LV \"lv\"\n" +
                "  FROM (SELECT O.*, LEVEL AS LV, ROWNUM AS RN\n" +
                "          FROM SYS_ORGAN O\n" +
                "         START WITH ");
        if (null != tid) {
            sb.append("O.PARENT_ORG = ? ");
            args.add(tid);
        } else {
            sb.append("O.PARENT_ORG IS NULL ");
        }
        sb.append("        CONNECT BY PRIOR O.ID = O.PARENT_ORG) LO\n" +
                " WHERE LO.SFYX_ST = '1' ORDER BY LO.RN");
        return getJdbcTemplate().queryForList(sb.toString(), args.toArray());
    }

    @Override
    public Map getOrganPostTreeData(Long organId) {
        String sql1 = "SELECT O.ID \"id\",\n" +
                "       O.ID||'jg' \"handleId\",\n" +
                "       O.FULL_NAME \"info\",\n" +
                "       O.ORGAN_NAME \"name\",\n" +
                "       'jg' \"lx\",\n" +
                "       O.PARENT_ORG||'jg' \"pId\",\n" +
                "       ?  \"icon\"," +
                "       O.SFYX_ST \"sfyx_st\"\n" +
                "FROM SYS_ORGAN O WHERE O.ID = ? ";
        Map organ = getJdbcTemplate().queryForMap(sql1, HttpKit.handleCtxPath(CacheKit.get(Cache.CONFIG, "organIcon")), organId);
        String sql2 = "SELECT R.ID id,\n" +
                "       R.ID || 'gw' \"handleId\",\n" +
                "       R.ROLE_NAME \"name\",\n" +
                "       'gw' \"lx\",\n" +
                "       ? \"icon\",\n" +
                "       G.GL_ID || 'jg' \"pId\",\n" +
                "       G.GL_ID \"organId\",\n" +
                "       (SELECT O.ORGAN_NAME FROM SYS_ORGAN O WHERE O.ID = G.GL_ID) \"info\" \n" +
                "  FROM SYS_GLB_ROLE G, SYS_ROLE R\n" +
                " WHERE G.GL_ID = ?\n" +
                "   AND G.GL_TYPE = 2\n" +
                "   AND R.ROLE_TYPE = 3\n" +
                "   AND G.SFYX_ST = 1\n" +
                "   AND R.SFYX_ST = 1\n" +
                "   AND G.ROLE_ID = R.ID";
        organ.put("children", getJdbcTemplate().queryForList(sql2, HttpKit.handleCtxPath(CacheKit.get(Cache.CONFIG, "postIcon")), organId));
        String sql3 = "SELECT U.ID \"id\",\n" +
                "       U.ID || 'yh' \"handleId\",\n" +
                "       U.USER_NAME \"name\",\n" +
                "       'yh' \"lx\",\n" +
                "       ? \"icon\"," +
                "       GOUP.POST_ID \"postRoleId\",\n" +
                "       GOUP.ORGAN_ID \"organId\"," +
                "       DECODE(GOUP.POST_ID,\n" +
                "              NULL,\n" +
                "              GOUP.ORGAN_ID || 'jg',\n" +
                "              GOUP.POST_ID || 'gw') \"pId\"\n" +
                "  FROM SYS_USER U, SYS_GLB_USER GOUP\n" +
                " WHERE GOUP.USER_ID = U.ID\n" +
                "   AND GOUP.ORGAN_ID = ?\n" +
                "   AND U.SFYX_ST = '1'\n" +
                "   AND GOUP.SFYX_ST = '1'\n" +
                "   ORDER BY GOUP.POST_ID NULLS LAST";
        List<Map<String, Object>> userList = getJdbcTemplate().queryForList(sql3, HttpKit.handleCtxPath(CacheKit.get(Cache.CONFIG, "userIcon")), organId);
        if (userList.size() > 0) {
            List groupUserList = new ArrayList();
            groupUserList.add(userList.get(0));
            String postRoleId = null != userList.get(0).get("postRoleId") ? userList.get(0).get("postRoleId").toString() : "";
            for (int i = 0; i < userList.size(); i++) {
                String tempPostId = null != userList.get(i).get("postRoleId") ? userList.get(i).get("postRoleId").toString() : "";
                if (postRoleId.equals(tempPostId)) {
                    groupUserList.add(userList.get(i));
                } else {
                    addUserListToOrganPost(groupUserList, organ, postRoleId);
                    groupUserList = new ArrayList();
                    groupUserList.add(userList.get(i));
                    postRoleId = tempPostId;
                }
            }
            if (groupUserList.size() > 0) {
                addUserListToOrganPost(groupUserList, organ, postRoleId);
            }
        }

        return organ;
    }

    private void addUserListToOrganPost(List userList, Map organ, String postRoleId) {
        if ("".equals(postRoleId)) {
            for (Map user : (List<Map>) userList) {
                user.put("info", organ.get("name"));
            }
            ((List) organ.get("children")).addAll(userList);
        } else {
            for (Map post : (List<Map>) organ.get("children")) {
                if (postRoleId.equals(post.get("id").toString())) {
                    for (Map user : (List<Map>) userList) {
                        user.put("info", organ.get("name") + "/" + post.get("name"));
                    }
                    post.put("children", userList);
                    break;
                }
            }
        }
    }

    @Override
    public List<Map<String, Object>> getOrgansGlxx(String ids) {
        String sql = "WITH GLR AS\n" +
                " (SELECT DISTINCT (ROLE_ID),\n" +
                "GR.GL_ID " +
                "    FROM SYS_GLB_ROLE GR, SYS_ROLE RE\n" +
                "   WHERE GR.GL_ID IN\n" +
                "         (SELECT COLUMN_VALUE FROM TABLE(splitstr(?, ',')))\n" +
                "     AND GR.GL_TYPE = 2\n" +
                "     AND GR.ROLE_TYPE IN (1,2) \n" +
                "     AND GR.SFYX_ST = '1')\n" +
                "SELECT GLR.GL_ID ORGAN_ID, R.ROLE_NAME, R.ROLE_CODE,R.ROLE_TYPE,decode(R.ROLE_TYPE,'1','业务角色','2','流程角色','3','岗位角色') ROLE_TYPE_NAME \n" +
                "  FROM GLR, SYS_ROLE R\n" +
                " WHERE GLR.ROLE_ID = R.ID";
        return super.getJdbcTemplate().queryForList(sql, ids);
    }

    @Override
    public List<Map<String, Object>> getOrgansLinkRole(String ids) {
        String sql = "WITH GLR AS\n" +
                " (SELECT DISTINCT (ROLE_ID), GR.GL_ID ORGAN_ID, O.ORGAN_NAME\n" +
                "    FROM SYS_GLB_ROLE GR, SYS_ROLE RE, SYS_ORGAN O\n" +
                "   WHERE GR.GL_ID IN\n" +
                "         (SELECT COLUMN_VALUE FROM TABLE(splitstr(?, ',')))\n" +
                "     AND GR.GL_TYPE = 2\n" +
                "     AND (GR.ROLE_TYPE = '1' or GR.ROLE_TYPE = '2')\n" +
                "     AND GR.SFYX_ST = '1'\n" +
                "     AND O.SFYX_ST = '1'\n" +
                "     AND GR.GL_ID = O.ID)\n" +
                "SELECT R.ID \"roleId\",\n" +
                "       R.ROLE_NAME \"roleName\",\n" +
                "       R.ROLE_CODE \"roleCode\",\n" +
                "       R.ROLE_TYPE \"roleType\",\n" +
                "       decode(R.ROLE_TYPE,\n" +
                "              '1',\n" +
                "              '业务角色',\n" +
                "              '2',\n" +
                "              '流程角色',\n" +
                "              '3',\n" +
                "              '岗位角色') \"roleTypeName\",\n" +
                "       wm_concat(GLR.ORGAN_ID) \"organId\",\n" +
                "       wm_concat(GLR.ORGAN_NAME) \"organName\"\n" +
                "  FROM GLR, SYS_ROLE R\n" +
                " WHERE GLR.ROLE_ID = R.ID\n" +
                " group by R.ID, R.ROLE_NAME, R.ROLE_CODE, R.ROLE_TYPE\n";
        return super.getJdbcTemplate().queryForList(sql, ids);
    }


    @Override
    public List<Map<String, Object>> getOrganList(Map map) {
        StringBuilder sql = new StringBuilder();
        List<Object> args = new ArrayList<>();
        if (RxStringUtils.isNotEmpty(map.get("topId"))) {
            sql.append("SELECT  0 LEV, O.ID,O.ORGAN_CODE,O.ORGAN_NAME,O.FULL_NAME, O.PARENT_ORG FROM SYS_ORGAN O WHERE ID =? UNION ALL ");
            args.add(Long.valueOf(map.get("topId").toString()));
        }
        sql.append("SELECT LEVEL LEV,O.ID,O.ORGAN_CODE,O.ORGAN_NAME,O.FULL_NAME, O.PARENT_ORG FROM SYS_ORGAN O ");
        if (RxStringUtils.isNotEmpty(map.get("topId"))) {
            sql.append("START WITH O.PARENT_ORG =? ");
            args.add(map.get("topId").toString());
        } else {
            sql.append("START WITH O.PARENT_ORG IS NULL ");
        }
        sql.append("AND O.SFYX_ST='1' CONNECT BY  PRIOR O.ID= O.PARENT_ORG");
        if (RxStringUtils.isNotEmpty(map.get("outId"))) {
            sql.append(" AND O.ID <> ? ");
            args.add(map.get("outId").toString());
        }
        sql.append(" AND O.SFYX_ST='1'");
        return getJdbcTemplate().queryForList(sql.toString(), args.toArray());
    }

    @Override
    public Map<String, Object> getOrganData(Long organId) {
        String sql1 = "SELECT O.ID \"id\",\n" +
                "       O.ID||'jg' \"handleId\",\n" +
                "       O.FULL_NAME \"info\",\n" +
                "       O.ORGAN_NAME \"name\",\n" +
                "       'jg' \"lx\",\n" +
                "       O.PARENT_ORG||'jg' \"pId\",\n" +
                "       O.SFYX_ST \"sfyx_st\"\n" +
                "FROM SYS_ORGAN O WHERE O.ID = ? AND O.SFYX_ST = '1'";
        return getJdbcTemplate().queryForMap(sql1, organId);
    }

    @Override
    public List<Map<String, Object>> getPostListByOrganIds(String organIds) {
        String sb = ("SELECT SR.ROLE_NAME,SR.ROLE_CODE,SGR.ROLE_ID POSTROLE_ID,SGR.GL_ID ORGAN_ID\n" +
                "  FROM SYS_GLB_ROLE SGR,SYS_ROLE SR\n" +
                " WHERE SGR.GL_ID IN (SELECT COLUMN_VALUE FROM TABLE (SPLITSTR(?,',')))\n" +
                "   AND SGR.GL_TYPE = '2'\n" +
                "   AND SGR.ROLE_TYPE = '3'\n" +
                "   AND SGR.SFYX_ST = '1'\n" +
                "   AND SGR.ROLE_ID =SR.ID ");
        return getJdbcTemplate().queryForList(sb, organIds);


    }

    @Override
    public List<Map<String, Object>> getChildOrgans(String organIds) {
        if (RxStringUtils.isNotEmpty(organIds)) {
            StringBuilder sql = new StringBuilder();
            sql.append("SELECT O.ID, O.ORGAN_NAME, O.ORGAN_CODE, O.FULL_NAME, LEVEL\n" +
                    "  FROM SYS_ORGAN O\n" +
                    " START WITH ");
            sql.append(RxStringUtils.getInSql("O.ID", organIds));
            sql.append(" CONNECT BY PRIOR O.ID = O.PARENT_ORG\n");
            return getJdbcTemplate().queryForList(sql.toString());
        }
        return new ArrayList<>();
    }

}
