package net.ruixin.dao.plat.auth.impl;

import net.ruixin.dao.plat.auth.IDataAuthDao;
import net.ruixin.dao.plat.auth.IRoleDao;
import net.ruixin.dao.plat.organ.IOrganDao;
import net.ruixin.domain.plat.auth.AuthResult;
import net.ruixin.domain.plat.auth.SysRole;
import net.ruixin.util.hibernate.BaseDao;
import net.ruixin.util.paginate.FastPagination;
import net.ruixin.util.shiro.ShiroKit;
import net.ruixin.util.tools.RxStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by admin on 2016-8-24.
 * 角色DAO实现
 */
@Repository
public class RoleDao extends BaseDao<SysRole> implements IRoleDao {

    @Autowired
    IDataAuthDao dataAuthDao;

    @Autowired
    IOrganDao organDao;

    @Override
    public SysRole getRoleById(Long id) {
        return super.get(id);
    }

    @Override
    public void persistRole(SysRole sysRole, Boolean clearFlag) {
//        saveRole(sysRole);
        super.getSession().flush();
        //组合角色调用存储过程
        if ("1".equals(sysRole.getIsCombine())) {
            List<Object> params = new ArrayList<>();
            params.add(sysRole.getId());
            super.prepareCallNoReturn("{call PKG_BASEPLAT.P_FACTOR_COMBINE_ROLE(?,?)}", params.toArray());
        }
        if (clearFlag) {
            if ("1".equals(sysRole.getRoleMade())) {
                //固定用户，需要清除动态逻辑,SYS_GLB_ROLE_AUTHRULE
                super.executeSqlUpdate("UPDATE SYS_GLB_ROLE_AUTHRULE SET SFYX_ST='0' WHERE ROLE_ID=?", sysRole.getId());
            } else {
                //动态逻辑，需要清除固定用户,SYS_GLB_ROLE 角色关联表,SYS_GLB_ROLE_USER 角色用户分解表
                //删除SYS_GLB_ROLE，删除SYS_GLB_ROLE_USER
                super.executeSqlUpdate("UPDATE SYS_GLB_ROLE SET SFYX_ST='0' WHERE ROLE_ID=?", sysRole.getId());
                //清除分解表数据
                super.executeSqlUpdate("delete from SYS_GLB_ROLE_USER  WHERE ROLE_ID=?", sysRole.getId());
            }
        }
    }

    @Override
    public void saveRole(SysRole sysRole) {
        super.saveOrUpdate(sysRole);
    }

    @Override
    public FastPagination getRoleList(Map map) {
        List<Object> params = new ArrayList<>();
        StringBuilder sql = new StringBuilder("SELECT R.ID,\n" +
                "       R.ROLE_NAME,\n" +
                "       R.ROLE_CODE,\n" +
                "       R.ROLE_TYPE,\n" +
                "       R.LEVELS,R.IS_COMBINE,\n" +
                "       (SELECT SS.VALUE\n" +
                "          FROM SYS_SUBDICT SS\n" +
                "         WHERE SS.DICT_CODE = 'JSLX'\n" +
                "           AND SS.SFYX_ST = '1'\n" +
                "           AND SS.CODE = R.ROLE_TYPE) ROLE_TYPE_NAME,\n" +
                "       R.XGSJ,\n" +
                "       SUM(DECODE(GR.GL_TYPE, '2', 1, 0)) ORGANCT,\n" +
                "       SUM(DECODE(GR.GL_TYPE, '1', 1, 0)) POSTCT,\n" +
                "       SUM(DECODE(GR.GL_TYPE, '3', 1, 0)) USERCT,\n" +
                "       (SELECT SUM(NVL2(RULE_ID, 1, 0))\n" +
                "          FROM SYS_GLB_ROLE_AUTHRULE\n" +
                "         WHERE ROLE_ID = R.ID\n" +
                "           AND SFYX_ST = '1') GLRULE,\n" +
                "       R.ROLE_MADE\n" +
                "  FROM SYS_ROLE R\n" +
                "  LEFT JOIN SYS_GLB_ROLE GR\n" +
                "    ON GR.ROLE_ID = R.ID\n" +
                "   AND GR.SFYX_ST = '1'\n" +
                "   AND GR.SFQY_ST = '1'\n" +
                " WHERE R.SFYX_ST = '1' ");
        if (RxStringUtils.isNotEmpty(map.get("roleName"))) {
            sql.append(" AND R.ROLE_NAME LIKE ? ");
            params.add("%" + map.get("roleName") + "%");
        }
        if (RxStringUtils.isNotEmpty(map.get("roleCode"))) {
            sql.append(" AND R.ROLE_CODE LIKE ? ");
            params.add("%" + map.get("roleCode") + "%");
        }
        if (RxStringUtils.isNotEmpty(map.get("roleType"))) {
            sql.append(" AND R.ROLE_TYPE IN (SELECT COLUMN_VALUE FROM TABLE (SPLITSTR(?,','))) ");
            params.add(map.get("roleType"));
        }
        if (RxStringUtils.isNotEmpty(map.get("isCombine"))) {
            sql.append(" AND R.IS_COMBINE = ?  ");
            params.add(map.get("isCombine"));
        }
        sql.append(" GROUP BY R.ID,R.ROLE_NAME,R.ROLE_CODE,R.ROLE_TYPE,R.LEVELS,R.ROLE_MADE,R.XGSJ,R.IS_COMBINE ORDER BY R.XGSJ DESC");
        return super.getPaginationBySql(sql, params, map);
    }

    @Override
    public List getRoleGlDataList(String roleIds) {
        Map<String, Object> map = new HashMap<>();
        String[] roleId = roleIds.split(",");
        StringBuilder roleIdIn = new StringBuilder();
        for (int i = 0; i < roleId.length; i++) {
            roleIdIn.append(":ROLEID").append(i);
            if (i < roleId.length - 1) {
                roleIdIn.append(",");
            }
            map.put("ROLEID" + i, roleId[i]);
        }
        String sql = ("SELECT O.ID, O.ORGAN_NAME MC, GR.GL_TYPE, GR.SFQY_ST, SO.ORGAN_NAME SSZZ\n" +
                "  FROM SYS_GLB_ROLE GR, SYS_ORGAN O\n" +
                "  LEFT JOIN SYS_ORGAN SO\n" +
                "    ON SO.ID = O.PARENT_ORG\n" +
                "   AND SO.SFYX_ST = '1'\n" +
                " WHERE GR.GL_ID = O.ID\n" +
                "   AND GR.SFYX_ST = '1'\n" +
                "   AND O.SFYX_ST = '1'\n" +
                "   AND GR.GL_TYPE = '2'\n" +
                "   AND GR.ROLE_ID IN ( ") +
                roleIdIn +
                " ) UNION ALL\n" +
                "SELECT U.ID,\n" +
                "       U.USER_NAME MC,\n" +
                "       GR.GL_TYPE,\n" +
                "       GR.SFQY_ST,\n" +
                "       WM_CONCAT(SO.ORGAN_NAME) SSZZ\n" +
                "  FROM SYS_GLB_ROLE GR, SYS_USER U\n" +
                "  LEFT JOIN SYS_GLB_USER OUP\n" +
                "    ON OUP.USER_ID = U.ID\n" +
                "   AND OUP.SFYX_ST = '1'\n" +
                "  LEFT JOIN SYS_ORGAN SO\n" +
                "    ON SO.ID = OUP.ORGAN_ID\n" +
                "   AND SO.SFYX_ST = '1'\n" +
                " WHERE GR.GL_ID = U.ID\n" +
                "   AND GR.SFYX_ST = '1'\n" +
                "   AND U.SFYX_ST = '1'\n" +
                "   AND GR.GL_TYPE = '3'\n" +
                "   AND GR.ROLE_ID IN ( " +
                roleIdIn +
                " ) GROUP BY U.ID, U.USER_NAME, GR.GL_TYPE, GR.SFQY_ST\n" +
                "  ORDER BY GL_TYPE DESC ";
        return super.getNpJdbcTemplate().queryForList(sql, map);
    }

    @Override
    public void deleteRole(Long roleId) {
        super.deleteCascade(roleId);
        //删除角色后置
        super.prepareCallNoReturn("{call PKG_BASEPLAT.P_AFTER_DELETE_ROLE(?,?)}", roleId);
    }

    @Override
    public List<Map<String, Object>> getRoleByGlxx(String gl_ids, String gl_type) {
        String sql = "SELECT R.ID   ROLEID," +
                "       1 SFGL,\n" +
                "       R.ROLE_CODE,\n" +
                "       R.ROLE_NAME,\n" +
                "       R.ROLE_TYPE,\n" +
                "       SS.VALUE     ROLE_TYPE_NAME,\n" +
                "       DECODE(GR.SFQY_ST,'0','UNVALID','1','VALID') SFQY_ST\n" +
                "  FROM SYS_ROLE R, SYS_GLB_ROLE GR, SYS_SUBDICT SS\n" +
                " WHERE R.ID = GR.ROLE_ID\n" +
                "   AND R.ROLE_TYPE = SS.CODE\n" +
                "   AND SS.DICT_CODE = 'JSLX'\n" +
                "   AND SS.SFYX_ST = '1'\n" +
                "   AND R.SFYX_ST = '1'\n" +
                "   AND GR.SFYX_ST = '1'\n" +
                "   AND GR.GL_TYPE = ?\n" +
                "   AND GR.GL_ID IN (select column_value from table(splitstr(?, ',')))\n" +
                " GROUP BY R.ID, R.ROLE_CODE, R.ROLE_NAME, R.ROLE_TYPE, SS.VALUE, GR.SFQY_ST" +
                " ORDER BY GR.SFQY_ST ";
        return super.getJdbcTemplate().queryForList(sql, gl_type, gl_ids);
    }

    @Override
    public List<Map<String, Object>> getRoleListByEleId(Long eleId, String gl_type) {
        String sql = ("SELECT DISTINCT R.ID,\n" +
                "                R.ROLE_CODE,\n" +
                "                R.ROLE_NAME,\n" +
                "                R.ROLE_TYPE,\n" +
                "                SS.VALUE ROLETYPE_NAME,\n" +
                "                GR.SFQY_ST" +
                "  FROM SYS_ROLE R, SYS_GLB_ROLE GR, SYS_SUBDICT SS\n" +
                " WHERE GR.ROLE_ID = R.ID\n" +
                "   AND R.ROLE_TYPE = SS.CODE\n" +
                "   AND SS.DICT_CODE = 'JSLX'\n" +
                "   AND SS.SFYX_ST = '1'\n" +
                "   AND GR.SFYX_ST = '1'\n" +
                "   AND R.SFYX_ST = '1'\n" +
                "   AND GR.GL_ID = ?\n" +
                "   AND GR.GL_TYPE = ?" +
                "   AND GR.ROLE_TYPE IN (1,2)");
        return super.getJdbcTemplate().queryForList(sql, eleId, gl_type);
    }

    @Override
    public boolean checkRoleHasUser(Long roleId) {
        String sql = "SELECT COUNT(ID) SL FROM SYS_GLB_ROLE_USER WHERE  ROLE_ID = ? ";
        return super.getJdbcTemplate().queryForObject(sql, Integer.class, roleId) > 0;
    }

    @Override
    public List<Map<String, Object>> getRoleGlRule(Long roleId) {
        String sql = "SELECT AR.ID, AR.XGSJ, BR.RULE_NAME, BR.DESCRIPTION\n" +
                "  FROM SYS_AUTH_RULE AR, SYS_BASE_RULE BR, SYS_GLB_ROLE_AUTHRULE GRA\n" +
                " WHERE AR.SFYX_ST = '1'\n" +
                "   AND BR.SFYX_ST = '1'\n" +
                "   AND GRA.SFYX_ST = '1'\n" +
                "   AND GRA.ROLE_ID = ?\n" +
                "   AND AR.ID = GRA.RULE_ID\n" +
                "   AND AR.GL_RULE_ID = BR.ID";
        return super.getJdbcTemplate().queryForList(sql, roleId);
    }


    @Override
    public String getRoleAuthTypeByUserId(Long userId) {
        String sql = "select max(r.auth_type)\n" +
                "  from SYS_GLB_ROLE_USER t, sys_role r\n" +
                "   where r.sfyx_st = '1'\n" +
                "   and r.id = t.role_id\n" +
                "   and t.user_id = ?";
        return super.getJdbcTemplate().queryForObject(sql, String.class, userId);
    }

    @Override
    public FastPagination getRoleGlbUser(Map map, Long roleId) {
        List<Object> params = new ArrayList<>();
        StringBuilder sql = new StringBuilder("SELECT SUSER.USER_NAME, ORGAN.ORGAN_NAME\n" +
                "  FROM SYS_USER SUSER, sys_glb_role_user SGR, SYS_ORGAN ORGAN\n" +
                " WHERE SGR.User_Id = SUSER.ID\n" +
                "   AND ORGAN.ID = SUSER.DEFAULT_ORGAN_ID\n" +
                "   AND SGR.ROLE_ID = ?\n" +
                "   AND SUSER.SFYX_ST = '1'\n" +
                "   AND ORGAN.SFYX_ST = '1'\n");

        params.add(roleId);
        if (RxStringUtils.isNotEmpty(map.get("user_name"))) {
            sql.append(" AND SUSER.USER_NAME LIKE ? ");
            params.add("%" + map.get("user_name") + "%");
        }
        if (RxStringUtils.isNotEmpty(map.get("organ_name"))) {
            sql.append(" AND ORGAN.ORGAN_NAME LIKE ? ");
            params.add("%" + map.get("organ_name") + "%");
        }
        sql.append(" ORDER BY ORGAN.ORGAN_CODE");
        return super.getPaginationBySql(sql, params, map);
    }

    @Override
    public List<Map<String, Object>> getWFNameByRoleId(Long roleId) {
        String sql = "SELECT SW.NAME FROM SYS_WORKFLOW SW WHERE SW.SFYX_ST='1' " +
                " AND EXISTS(SELECT 1 FROM SYS_NODE SN,SYS_TRANSACT_NODE STN " +
                " WHERE SN.ID=STN.ID AND SN.WORKFLOW_ID=SW.ID AND SN.SFYX_ST='1' AND STN.ROLE_ID= ?)";
        return super.getJdbcTemplate().queryForList(sql, roleId);
    }

    @Override
    public Map<String, Object> getGlxxByRoleForRelate(Long roleId) {
        Map<String, Object> temp;
        List<Map<String, Object>> users;
        List<Map<String, Object>> organs = new ArrayList<>();
        Map<String, List<Map<String, Object>>> includeUsers = new HashMap<>();
        Map<String, List<Map<String, Object>>> excludeUsers = new HashMap<>();
        String sql = "SELECT GR.ID,\n" +
                "       GR.GL_ID,\n" +
                "       GR.GL_TYPE,\n" +
                "       GR.SFQY_ST,\n" +
                "       NULL          ORGAN_ID,\n" +
                "       SP.FULL_NAME      ORGAN_INFO,\n" +
                "       SP.ORGAN_NAME NAME\n" +
                "  FROM SYS_GLB_ROLE GR, SYS_ORGAN SP\n" +
                " WHERE GR.ROLE_ID = ?\n" +
                "   AND GR.GL_TYPE = '2'\n" +
                "   AND GR.SFYX_ST = '1'\n" +
                "   AND GR.GL_ID = SP.ID\n" +
                "\n" +
                "UNION ALL\n" +
                "--RY\n" +
                "SELECT GR.ID,\n" +
                "       GR.GL_ID,\n" +
                "       GR.GL_TYPE,\n" +
                "       GR.SFQY_ST,\n" +
                "       GOUP.ORGAN_ID ORGAN_ID,\n" +
                "       (SELECT ORGAN_NAME FROM SYS_ORGAN WHERE ID = GOUP.ORGAN_ID)      ORGAN_INFO,\n" +
                "       SU.USER_NAME  NAME\n" +
                "  FROM SYS_USER SU, SYS_GLB_ROLE GR\n" +
                "  LEFT JOIN SYS_GLB_USER GOUP\n" +
                "    ON GOUP.USER_ID = GR.GL_ID\n" +
                "   AND GOUP.SFYX_ST='1'\n" +
                " WHERE GR.ROLE_ID = ?\n" +
                "   AND GR.GL_TYPE = '3'\n" +
                "   AND GR.SFYX_ST = '1'\n" +
                "   AND GR.GL_ID = SU.ID\n";
        List<Map<String, Object>> glxxs = super.getJdbcTemplate().queryForList(sql, roleId, roleId);
        for (Map glxx : glxxs) {
            if ("2".equals(glxx.get("GL_TYPE"))) {
                temp = new HashMap<>();
                temp.put("glId", glxx.get("ID"));
                temp.put("id", glxx.get("GL_ID"));
                temp.put("handleId", glxx.get("GL_ID") + "jg");
                temp.put("lx", "jg");
                temp.put("info", glxx.get("ORGAN_INFO"));
                temp.put("name", glxx.get("NAME"));
                temp.put("saveFlag", true);
                organs.add(temp);
            } else if ("3".equals(glxx.get("GL_TYPE"))) {
                temp = new HashMap<>();
                temp.put("glId", glxx.get("ID"));
                temp.put("id", glxx.get("GL_ID"));
                temp.put("handleId", glxx.get("GL_ID") + "ry");
                temp.put("lx", "ry");
                temp.put("organId", glxx.get("ORGAN_ID"));
                String organInfo = glxx.get("ORGAN_INFO") != null ? glxx.get("ORGAN_INFO").toString() : "";
                temp.put("info", organInfo);
                temp.put("name", glxx.get("NAME"));
                temp.put("saveFlag", true);
                if ("1".equals(glxx.get("SFQY_ST"))) {
                    if (null != glxx.get("ORGAN_ID")) {      //仅关联组织用户
                        if (includeUsers.containsKey(glxx.get("ORGAN_ID") + "jg")) {
                            includeUsers.get(glxx.get("ORGAN_ID") + "jg").add(temp);
                        } else {
                            users = new ArrayList<>();
                            users.add(temp);
                            includeUsers.put(glxx.get("ORGAN_ID") + "jg", users);
                        }
                    } else {    //无组织用户
                        if (includeUsers.containsKey("jg")) {
                            includeUsers.get("jg").add(temp);
                        } else {
                            users = new ArrayList<>();
                            users.add(temp);
                            includeUsers.put("jg", users);
                        }
                    }
                } else if ("0".equals(glxx.get("SFQY_ST"))) {
                    if (null != glxx.get("ORGAN_ID")) {      //仅关联组织用户
                        if (excludeUsers.containsKey(glxx.get("ORGAN_ID") + "jg")) {
                            excludeUsers.get(glxx.get("ORGAN_ID") + "jg").add(temp);
                        } else {
                            users = new ArrayList<>();
                            users.add(temp);
                            excludeUsers.put(glxx.get("ORGAN_ID") + "jg", users);
                        }
                    } else {    //无组织用户
                        if (excludeUsers.containsKey("jg")) {
                            excludeUsers.get("jg").add(temp);
                        } else {
                            users = new ArrayList<>();
                            users.add(temp);
                            excludeUsers.put("jg", users);
                        }
                    }
                }
            }
        }
        Map<String, Object> result = new HashMap<>();
        result.put("organs", organs);
        result.put("inUsers", includeUsers);
        result.put("outUsers", excludeUsers);
        return result;
    }

    @Override
    public Map<String, Object> getGlxxByRoleForShow(Long roleId) {
        Map<String, Object> temp;
        List<Map<String, Object>> organs = new ArrayList<>();
        List<Map<String, Object>> inUsers = new ArrayList<>();
        List<Map<String, Object>> outUsers = new ArrayList<>();
        String sql = "SELECT GR.ID,\n" +
                "       GR.GL_ID,\n" +
                "       GR.GL_TYPE,\n" +
                "       GR.SFQY_ST,\n" +
                "       SP.FULL_NAME      ORGAN_INFO,\n" +
                "       SP.ORGAN_NAME NAME\n" +
                "  FROM SYS_GLB_ROLE GR, SYS_ORGAN SP\n" +
                " WHERE GR.ROLE_ID = ?\n" +
                "   AND GR.GL_TYPE = '2'\n" +
                "   AND GR.SFYX_ST = '1'\n" +
                "   AND GR.GL_ID = SP.ID\n" +
                "\n" +
                "UNION ALL\n" +
                "--RY\n" +
                "SELECT GR.ID,\n" +
                "       GR.GL_ID,\n" +
                "       GR.GL_TYPE,\n" +
                "       GR.SFQY_ST,\n" +
                "       (SELECT ORGAN_NAME FROM SYS_ORGAN WHERE ID = GOUP.ORGAN_ID)      ORGAN_INFO,\n" +
                "       SU.USER_NAME  NAME\n" +
                "  FROM SYS_USER SU, SYS_GLB_ROLE GR\n" +
                "  LEFT JOIN SYS_GLB_USER GOUP\n" +
                "   ON GOUP.SFYX_ST='1'\n" +
                "   AND GOUP.USER_ID = GR.GL_ID\n" +
                " WHERE GR.ROLE_ID = ?\n" +
                "   AND GR.GL_TYPE = '3'\n" +
                "   AND GR.SFYX_ST = '1'\n" +
                "   AND GR.GL_ID = SU.ID\n" +
                "\n";
        List<Map<String, Object>> glxxs = super.getJdbcTemplate().queryForList(sql, roleId, roleId);
        for (Map glxx : glxxs) {
            if ("2".equals(glxx.get("GL_TYPE"))) {
                temp = new HashMap<>();
                temp.put("glId", glxx.get("ID"));
                temp.put("id", glxx.get("GL_ID"));
                temp.put("handleId", glxx.get("GL_ID") + "jg");
                temp.put("lx", "jg");
                temp.put("info", glxx.get("ORGAN_INFO"));
                temp.put("name", glxx.get("NAME"));
                organs.add(temp);
            } else if ("3".equals(glxx.get("GL_TYPE"))) {
                temp = new HashMap<>();
                temp.put("glId", glxx.get("ID"));
                temp.put("id", glxx.get("GL_ID"));
                temp.put("handleId", glxx.get("GL_ID") + "ry");
                temp.put("lx", "ry");
                temp.put("organId", glxx.get("ORGAN_ID"));
                String organInfo = glxx.get("ORGAN_INFO") != null ? glxx.get("ORGAN_INFO").toString() : "";
                temp.put("info", organInfo);
                temp.put("name", glxx.get("NAME"));
                if ("1".equals(glxx.get("SFQY_ST"))) {
                    inUsers.add(temp);
                } else if ("0".equals(glxx.get("SFQY_ST"))) {
                    outUsers.add(temp);
                }
            }
        }
        Map<String, Object> result = new HashMap<>();
        result.put("organs", organs);
        result.put("inUsers", inUsers);
        result.put("outUsers", outUsers);
        return result;
    }

    @Override
    public void saveRoleGlxx(Object[] params) {
        super.prepareCallNoReturnClob("{call PKG_BASEPLAT.P_SAVE_ROLE_RELATIONS(?,?,?,?,?,?,?)}",
                new int[]{1, 2, 3, 4, 5, 6, 7}, params);
    }

    @Override
    public List<Map<String, Object>> getRuleByRole(Long roleId) {
        String sql = "select g.id as \"id\", g.role_id as \"roleId\", g.RULE_ID as \"ruleId\",g.sfyx_st \"sfyxSt\", " +
                "(SELECT BR.RULE_NAME FROM SYS_AUTH_RULE AR,SYS_BASE_RULE BR WHERE \n" +
                " AR.GL_RULE_ID=BR.ID AND AR.SFYX_ST='1' AND BR.SFYX_ST='1' AND AR.ID = g.RULE_ID) \"ruleName\", " +
                "(SELECT BR.XGSJ FROM SYS_AUTH_RULE AR,SYS_BASE_RULE BR WHERE \n" +
                " AR.GL_RULE_ID=BR.ID AND AR.SFYX_ST='1' AND BR.SFYX_ST='1' AND AR.ID = g.RULE_ID) \"ruleXgsj\", " +
                "(SELECT BR.DESCRIPTION FROM SYS_AUTH_RULE AR,SYS_BASE_RULE BR WHERE \n" +
                " AR.GL_RULE_ID=BR.ID AND AR.SFYX_ST='1' AND BR.SFYX_ST='1' AND AR.ID = g.RULE_ID) \"description\" " +
                "from SYS_GLB_ROLE_AUTHRULE g where g.role_id = ? and g.sfyx_st = '1' ";
        return getJdbcTemplate().queryForList(sql, roleId);
    }

    @Override
    public List<Map<String, Object>> getUserSysRole(Long userId) {
        String sql = "SELECT R.ID, R.ROLE_NAME, R.ROLE_CODE, R.LEVELS\n" +
                "  FROM SYS_GLB_ROLE_USER GRU, SYS_ROLE R\n" +
                " WHERE GRU.ROLE_ID = R.ID\n" +
                "   AND GRU.USER_ID = ?\n" +
                "   AND (R.ROLE_TYPE = '1' OR R.ROLE_TYPE='3')\n" +
                "   AND (R.SFYX_ST = '1'OR R.SFYX_ST='3')\n" +
                " ORDER BY R.LEVELS ASC NULLS LAST";
        return getJdbcTemplate().queryForList(sql, userId);
    }

    @Override
    public List<Map<String, Object>> getPostRoleByOrganId(Long id) {
        String sql = "SELECT distinct G.GL_ID ORGAN_ID,\n" +
                "       R.ID POST_ID,\n" +
                "       R.ROLE_NAME POST_NAME,\n" +
                "       R.ROLE_CODE POST_CODE,\n" +
                "       R.SFYX_ST,\n" +
                "       (SELECT O.ORGAN_NAME FROM SYS_ORGAN O WHERE O.ID = G.GL_ID) ORGAN_NAME,\n" +
                "       (SELECT COUNT(*) FROM  SYS_GLB_USER SGU WHERE SGU.POST_ID=R.ID AND SGU.ORGAN_ID=G.GL_ID AND  SGU.SFYX_ST='1') USER_CT  \n" +
                "  FROM SYS_GLB_ROLE G, SYS_ROLE R\n" +
                " WHERE G.GL_ID = ?\n" +
                "   AND G.GL_TYPE = 2\n" +
                "   AND R.ROLE_TYPE = 3\n" +
                "   AND G.SFYX_ST = 1\n" +
                "   AND R.SFYX_ST = 1\n" +
                "   AND G.ROLE_ID = R.ID\n";
        return getJdbcTemplate().queryForList(sql, id);
    }

    @Override
    public FastPagination getSelectRole(Map map) {

        StringBuilder sb = new StringBuilder();

        if ("role".equals(map.get("kind"))) { //业务角色和非动态逻辑的流程角色
            sb.append("SELECT SR.*,\n" +
                    "       CASE\n" +
                    "         WHEN ROLE_TYPE = 1 then\n" +
                    "          '业务角色' \n" +
                    "          WHEN ROLE_TYPE=2 THEN\n" +
                    "           '流程角色'\n" +
                    "         else\n" +
                    "          '其他'\n" +
                    "       end ROLE_TYPE_NAME\n" +
                    "  FROM SYS_ROLE SR\n" +
                    " WHERE (SR.ROLE_TYPE = '1' or SR.ROLE_TYPE='2')  AND SR.SFYX_ST='1' AND SR.ROLE_MADE='1' \n");
            //非管理员角色
            if (RxStringUtils.isNotEmpty(map.get("notAdminFlag"))) {
                sb.append(" AND SR.LEVELS != '2' ");
            }
        } else if ("combineRole".equals(map.get("kind"))) {
            //非流程角色
            sb.append("SELECT SR.*,\n" +
                    "       CASE\n" +
                    "         WHEN ROLE_TYPE = 1 then\n" +
                    "          '业务角色' \n" +
                    "          WHEN ROLE_TYPE=3 THEN\n" +
                    "           '岗位角色'\n" +
                    "         else\n" +
                    "          '其他'\n" +
                    "       end ROLE_TYPE_NAME\n" +
                    "  FROM SYS_ROLE SR\n" +
                    " WHERE (SR.ROLE_TYPE = '1' or SR.ROLE_TYPE='3')  AND SR.SFYX_ST='1' \n");
        } else if ("all".equals(map.get("kind"))) {
            sb.append("SELECT SR.*,\n" +
                    "       CASE\n" +
                    "         WHEN ROLE_TYPE = 1 then\n" +
                    "          '业务角色' \n" +
                    "          WHEN ROLE_TYPE=2 THEN\n" +
                    "           '流程角色'\n" +
                    "          WHEN ROLE_TYPE=3 THEN\n" +
                    "           '岗位角色'\n" +
                    "         else\n" +
                    "          '其他'\n" +
                    "       end ROLE_TYPE_NAME\n" +
                    "  FROM SYS_ROLE SR\n" +
                    " WHERE SR.SFYX_ST='1' \n");
        } else if ("post".equals(map.get("kind"))) {
            sb.append("SELECT * FROM SYS_ROLE SR  WHERE SR.ROLE_TYPE='3' AND SR.SFYX_ST='1'");
        } else {
            sb.append("SELECT * FROM SYS_ROLE SR  WHERE SR.SFYX_ST='1'");
        }
        List<Object> params = new ArrayList<>();
        if (RxStringUtils.isNotEmpty(map.get("roleName"))) {
            sb.append(" AND SR.ROLE_NAME LIKE ?");
            params.add("%" + map.get("roleName") + "%");
        }
        if (RxStringUtils.isNotEmpty(map.get("roleCode"))) {
            sb.append(" AND SR.ROLE_CODE LIKE ? ");
            params.add("%" + map.get("roleCode") + "%");
        }
        if (RxStringUtils.isNotEmpty(map.get("roleType"))) {
            sb.append(" AND SR.ROLE_TYPE = ? ");
            params.add(map.get("roleType"));
        }
        if (RxStringUtils.isNotEmpty(map.get("levels"))) {
            sb.append(" AND SR.levels in (").append(map.get("levels")).append(")");
        }
        if (RxStringUtils.isNotEmpty(map.get("excludeId"))) {
            sb.append(" AND SR.ID <> ? ");
            params.add(map.get("excludeId"));
        }
        sb.append(" ORDER BY SR.XGSJ DESC, ID DESC");
        return super.getPaginationBySql(sb.toString(), params, map);
    }

    @Override
    public Map<String, Object> getGlbOrganByRole(Long roleId) {
        Map<String, Object> temp;
        List<Map<String, Object>> organs = new ArrayList<>();
        String sql = "SELECT GR.ID,\n" +
                "       GR.GL_ID,\n" +
                "       GR.GL_TYPE,\n" +
                "       GR.SFQY_ST,\n" +
                "       NULL          ORGAN_ID,\n" +
                "       NULL          POST_ID,\n" +
                "       SP.FULL_NAME      ORGAN_INFO,\n" +
                "       NULL      POST_INFO,\n" +
                "       SP.ORGAN_NAME NAME\n" +
                "  FROM SYS_GLB_ROLE GR, SYS_ORGAN SP\n" +
                " WHERE GR.ROLE_ID = ?\n" +
                "   AND GR.GL_TYPE = '2'\n" +
                "   AND GR.SFYX_ST = '1'\n" +
                "   AND GR.GL_ID = SP.ID";
        List<Map<String, Object>> glxxs = super.getJdbcTemplate().queryForList(sql, roleId);
        for (Map glxx : glxxs) {
            if ("2".equals(glxx.get("GL_TYPE"))) {
                temp = new HashMap<>();
                temp.put("glId", glxx.get("ID"));
                temp.put("id", glxx.get("GL_ID"));
                temp.put("handleId", glxx.get("GL_ID") + "jg");
                temp.put("lx", "jg");
                temp.put("info", glxx.get("ORGAN_INFO"));
                temp.put("name", glxx.get("NAME"));
                temp.put("saveFlag", true);
                organs.add(temp);
            }
        }
        Map<String, Object> result = new HashMap<>();
        result.put("organs", organs);
        return result;
    }

    @Override
    public List<Map<String, Object>> getUserListByPostRoleIdAndOrganId(Long organId, Long postRoleId) {
        String sql = "SELECT SGU.*,SU.USER_NAME FROM SYS_GLB_USER SGU,SYS_USER SU\n" +
                " WHERE SGU.ORGAN_ID=? AND SGU.POST_ID=?\n" +
                " AND  SGU.USER_ID=SU.ID\n" +
                " AND SGU.SFYX_ST='1'\n" +
                " AND SU.SFYX_ST='1'";
        return getJdbcTemplate().queryForList(sql, organId, postRoleId);
    }

    @Override
    public List<Long> getUserIdListByRole(Long roleId) {
        String sql = "select gru.user_id from sys_glb_role_user gru where gru.role_id = ?";
        return getJdbcTemplate().queryForList(sql, Long.class, roleId);
    }

    @Override
    public FastPagination getUserAuthorityList(Map map) {
        StringBuilder sql = new StringBuilder();
        List<Object> params = new ArrayList<>();
        sql.append("select distinct u.*\n" +
                "  from sys_user u, sys_glb_user gu, sys_organ o \n" +
                " where gu.user_id = u.id\n" +
                "   and o.id = gu.organ_id\n" +
                "   and u.sfyx_st = '1'\n" +
                "   and gu.sfyx_st = '1'\n");

        if (RxStringUtils.isNotEmpty(map.get("organId"))) {
            sql.append(" and gu.organ_id = ? ");
            params.add(map.get("organId"));
        } else if (RxStringUtils.isNotEmpty(map.get("ssqhdm"))) {
            sql.append(" and o.ssqhdm = ? ");
            params.add(map.get("ssqhdm"));
        } else if (RxStringUtils.isNotEmpty(map.get("userId"))) {
            //数据权限控制
            AuthResult ar = dataAuthDao.getUserDataAuthResult(Long.valueOf(map.get("userId").toString()), "organ");
            if (ar.getHasAuth()) {
                if (!ar.getHasAll()) {
                    List<Map<String, Object>> authOrgansWithChild = organDao.getChildOrgans(ar.getOids());
                    sql.append("and ").append(RxStringUtils.getInSql("gu.organ_id",
                            RxStringUtils.listToString(authOrgansWithChild, ',', "ID")));
                }
            } else {
                //无权限
                sql.append(" and gu.organ_id = 0 ");
            }
        }
        if (RxStringUtils.isNotEmpty(map.get("userName"))) {
            sql.append(" and u.user_name like ? ");
            params.add("%" + map.get("userName") + "%");
        }
        if (RxStringUtils.isNotEmpty(map.get("loginName"))) {
            sql.append(" and u.login_name like ? ");
            params.add("%" + map.get("loginName") + "%");
        }
        return super.getPaginationBySql(sql, params, map);
    }

    @Override
    public List<Map<String, Object>> getUserAuthorityList(Long userId, Long currentUserId) {
        StringBuilder sql = new StringBuilder();
        List<Object> params = new ArrayList<>();
        if (ShiroKit.getRoleLevel() < 3) {
            sql.append("select r.id role_id, r.role_name role_name, r.levels role_level\n" +
                    "  from sys_role r, sys_glb_role_user gru\n" +
                    " where r.id = gru.role_id\n" +
                    "   and gru.user_id = ?\n" +
                    "   and r.role_type = '1'\n" +
                    "   and r.create_role_id in (select r2.id\n" +
                    "                              from sys_role r2, sys_glb_role_user gru2\n" +
                    "                             where r2.id = gru2.role_id\n" +
                    "                               and gru2.user_id = ?\n" +
                    "                               and (r2.levels = '1' or r2.levels = '2')\n" +
                    "                               and (r2.sfyx_st = '1' or r2.sfyx_st = '3'))\n" +
                    "   and r.sfyx_st = '1'\n");
            if(ShiroKit.getRoleLevel() == 2){
                sql.append("     and r.levels <> '2' ");
            }
            sql.append(" union\n");
            params.add(userId);
            params.add(currentUserId);
        }
        sql.append("select r.id role_id, r.role_name role_name, r.levels role_level\n" +
                "  from sys_glb_role_user gru,\n" +
                "       sys_role r,\n" +
                "       (select cr.role_id\n" +
                "          from sys_glb_role_user gru2, sys_glb_combine_role cr\n" +
                "         where cr.combine_role_id = gru2.role_id\n" +
                "           and cr.sfyx_st = '1'\n" +
                "           and gru2.user_id = ?) r2\n" +
                " where r2.role_id = gru.role_id\n" +
                "   and gru.role_id = r.id\n" +
                "   and r.role_type = '1'\n" +
                "   and gru.user_id = ?\n" +
                "   and r.levels = '3'\n" +
                "   and r.sfyx_st = '1'");
        params.add(currentUserId);
        params.add(userId);
        return getJdbcTemplate().queryForList(sql.toString(), params.toArray());
    }

    @Override
    public List<Map<String, Object>> getUserOtherAuthorityList(Long userId, Long currentUserId) {
        StringBuilder sql = new StringBuilder();
        List<Object> params = new ArrayList<>();
        sql.append("select r.id role_id, r.role_name role_name, r.levels role_level \n" +
                "  from sys_glb_role_user gru, sys_role r\n" +
                " where gru.role_id = r.id\n" +
                "   and gru.user_id = ?\n" +
                "   and r.role_type = '1'\n" +
                "   and gru.role_id not in\n" +
                "       (");
        params.add(userId);
        if (ShiroKit.getRoleLevel() < 3) {
            sql.append("select r.id \n" +
                    "  from sys_role r, sys_glb_role_user gru\n" +
                    " where r.id = gru.role_id\n" +
                    "   and gru.user_id = ?\n" +
                    "   and r.create_role_id in (select r2.id\n" +
                    "                              from sys_role r2, sys_glb_role_user gru2\n" +
                    "                             where r2.id = gru2.role_id\n" +
                    "                               and gru2.user_id = ?\n" +
                    "                               and (r2.levels = '1' or r2.levels = '2')\n" +
                    "                               and (r2.sfyx_st = '1' or r2.sfyx_st = '3'))\n" +
                    "   and r.sfyx_st = '1'\n");
            if(ShiroKit.getRoleLevel() == 2){
                sql.append("     and r.levels <> '2' ");
            }
            sql.append(" union\n");
            params.add(userId);
            params.add(currentUserId);
        }
        sql.append("select r.id\n" +
                "          from sys_glb_role_user gru,\n" +
                "               sys_role r,\n" +
                "               (select cr.role_id\n" +
                "                  from sys_glb_role_user gru2, sys_glb_combine_role cr\n" +
                "                 where cr.combine_role_id = gru2.role_id\n" +
                "                   and cr.sfyx_st = '1'\n" +
                "                   and gru2.user_id = ?) r2\n" +
                "         where r2.role_id = gru.role_id\n" +
                "           and gru.role_id = r.id\n" +
                "           and r.role_type = '1'\n" +
                "           and gru.user_id = ?\n" +
                "           and r.levels = '3'\n" +
                "           and r.sfyx_st = '1')\n" +
                "   and r.sfyx_st = '1' ");
        params.add(currentUserId);
        params.add(userId);
        return getJdbcTemplate().queryForList(sql.toString(),params.toArray());
    }

    @Override
    public FastPagination getAuthorityRoleList(Map map) {
        StringBuilder sql = new StringBuilder();
        List<Object> params = new ArrayList<>();
        if (ShiroKit.getRoleLevel() < 3) {
            sql.append("select r.id role_id, r.role_name, r.role_code\n" +
                    "  from sys_role r \n" +
                    " where r.create_role_id in (select r2.id\n" +
                    "                              from sys_role r2, sys_glb_role_user gru2\n" +
                    "                             where r2.id = gru2.role_id\n" +
                    "                               and gru2.user_id = ?\n" +
                    "                               and (r2.levels = '1' or r2.levels = '2')\n" +
                    "                               and (r2.sfyx_st = '1' or r2.sfyx_st = '3'))\n" +
                    "   and r.role_type = '1'\n");
            if(ShiroKit.getRoleLevel() == 2){
                sql.append("     and r.levels <> '2' ");
            }
            sql.append(" union\n");
            params.add(map.get("currentUserId"));
        }
        sql.append("select cr.role_id, r.role_name, r.role_code\n" +
                "  from sys_glb_role_user gru2, sys_glb_combine_role cr, sys_role r\n" +
                " where cr.combine_role_id = gru2.role_id\n" +
                "   and r.id = cr.role_id\n" +
                "   and r.role_type = '1'\n" +
                "   and gru2.user_id = ?\n" +
                "   and r.levels = '3'\n" +
                "   and r.sfyx_st = '1'\n" +
                "   and cr.sfyx_st = '1'");
        params.add(map.get("currentUserId"));
        return super.getPaginationBySql(sql, params, map);
    }

    @Override
    public void addUserAuthority(Long userId, Long roleId) {
        String sql = "INSERT INTO SYS_GLB_ROLE  (ID,ROLE_ID,GL_ID,GL_TYPE,SFQY_ST,SFYX_ST,ROLE_TYPE)  VALUES ( SEQ_SYS_GLB_ROLE.NEXTVAL,?,?,3,1,1,'1')";
        getJdbcTemplate().update(sql, roleId, userId);
    }

    @Override
    public void removeUserAuthority(Long userId, Long roleId) {
        String sql1 = "SELECT COUNT(*) FROM SYS_GLB_ROLE R WHERE R.GL_TYPE = '3' AND R.GL_ID = ? AND R.ROLE_ID = ? AND R.SFQY_ST = '1' AND R.SFYX_ST = '1'";
        Integer qyNum = getJdbcTemplate().queryForObject(sql1, Integer.class, userId, roleId);
        if (qyNum > 0) {
            String sql = "UPDATE SYS_GLB_ROLE R SET R.SFYX_ST = '0' WHERE R.GL_ID = ? AND R.GL_TYPE = '3' AND R.ROLE_ID = ? AND R.SFYX_ST = '1'";
            getJdbcTemplate().update(sql, userId, roleId);
        } else {
            String sql = "INSERT INTO SYS_GLB_ROLE  (ID,ROLE_ID,GL_ID,GL_TYPE,SFQY_ST,SFYX_ST,ROLE_TYPE)  VALUES ( SEQ_SYS_GLB_ROLE.NEXTVAL,?,?,3,0,1,'1')";
            getJdbcTemplate().update(sql, roleId, userId);
        }
    }

    @Override
    public FastPagination getCombineRoleList(Map map) {
        /*
         * 查询逻辑查询当前管理员角色管理的角色，新建的
         * */
        List<Object> params = new ArrayList<>();
        StringBuilder sb = new StringBuilder();
        //查询下级角色，被组合的角色只能是自己管理的
        if (RxStringUtils.isNotEmpty(map.get("ifOwn")) && RxStringUtils.isNotEmpty(map.get("roleId"))) {
            sb.append("SELECT ROLE.*,\n" +
                    " GET_DICT_VALUE(ROLE.ROLE_TYPE, 'JSLX') ROLE_TYPE_NAME, " +
                    " GET_DICT_VALUE(ROLE.LEVELS, 'SYSLEVEL') ROLE_LEVEL_NAME " +
                    "  FROM SYS_ROLE ROLE\n" +
                    " WHERE ROLE.SFYX_ST = '1'\n" +
                    "   AND ROLE.CREATE_ROLE_ID = ?");
            params.add(map.get("roleId"));
            if (RxStringUtils.isNotEmpty(map.get("roleName"))) {
                sb.append(" AND ROLE.ROLE_NAME LIKE ?");
                params.add("%" + map.get("roleName") + "%");
            }
            if (RxStringUtils.isNotEmpty(map.get("roleLevel"))) {
                sb.append(" AND ROLE.LEVELS = ?");
                params.add(map.get("roleLevel"));
            }
            if (RxStringUtils.isNotEmpty(map.get("roleCode"))) {
                sb.append(" AND ROLE.ROLE_CODE LIKE ? ");
                params.add("%" + map.get("roleCode") + "%");
            }
            if (RxStringUtils.isNotEmpty(map.get("roleType"))) {
                sb.append(" AND ROLE.ROLE_TYPE = ? ");
                params.add(map.get("roleType"));
            }
            if (RxStringUtils.isNotEmpty(map.get("isCombine"))) {
                sb.append(" AND ROLE.IS_COMBINE = ? ");
                params.add(map.get("isCombine"));
            }
            //不展示流程角色，目前是一个，后期改为多个，以都好隔开
            if (RxStringUtils.isNotEmpty(map.get("notShowType"))) {
                String[] strArr = map.get("notShowType").toString().split(",");
                for (String aStrArr : strArr) {
                    sb.append(" AND ROLE.ROLE_TYPE <> ? ");
                    params.add(aStrArr);
                }
            }
            if (RxStringUtils.isNotEmpty(map.get("excludeId"))) {
                sb.append(" AND ROLE.ID <> ? ");
                params.add(map.get("excludeId"));
            }
            sb.append(" ORDER BY ROLE.XGSJ DESC, ROLE.ID DESC");
            return super.getPaginationBySql(sb.toString(), params, map);
        } else {
            return null;
        }
    }

    @Override
    public List<Map<String, Object>> getUserByRole(Long roleId) {
        String sql = "SELECT SU.USER_NAME as \"userName\", SU.SEX as \"sex\", ORGAN.ORGAN_NAME as \"organName\", " +
                "GLB.ID as \"id\",SU.ID as \"userId\" " +
                "     FROM SYS_GLB_ROLE GLB, SYS_USER SU, SYS_ORGAN ORGAN\n" +
                "    WHERE GLB.GL_TYPE = '3'\n" +
                "      AND SU.ID = GLB.GL_ID\n" +
                "      AND SU.DEFAULT_ORGAN_ID = ORGAN.ID\n" +
                "      AND SU.SFYX_ST = '1'\n" +
                "      AND GLB.SFYX_ST = '1'\n" +
                "      AND GLB.ROLE_ID = ?\n" +
                "    ORDER BY GLB.ID DESC";
        return getJdbcTemplate().queryForList(sql, roleId);
    }

}

