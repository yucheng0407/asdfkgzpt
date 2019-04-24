package net.ruixin.dao.plat.organ.impl;


import net.ruixin.dao.plat.auth.IDataAuthDao;
import net.ruixin.dao.plat.organ.IOrganDao;
import net.ruixin.dao.plat.organ.IUserDao;
import net.ruixin.domain.plat.auth.AuthResult;
import net.ruixin.domain.plat.auth.SysGlbRole;
import net.ruixin.domain.plat.organ.SysUser;
import net.ruixin.enumerate.plat.Sfqy_st;
import net.ruixin.enumerate.plat.SfyxSt;
import net.ruixin.util.cache.Cache;
import net.ruixin.util.cache.CacheKit;
import net.ruixin.util.hibernate.BaseDao;
import net.ruixin.util.http.HttpKit;
import net.ruixin.util.paginate.FastPagination;
import net.ruixin.util.tools.RxStringUtils;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;


/**
 * 用户DAO实现
 *
 * @author Pitcher
 */
@Repository
public class UserDao extends BaseDao<SysUser> implements IUserDao {

    @Autowired
    IOrganDao organDao;

    @Autowired
    IDataAuthDao dataAuthDao;

    @Override
    public FastPagination getUserPageList(Map map) {
        StringBuilder sql = new StringBuilder();
        List<Object> params = new ArrayList<>();
        sql.append("WITH A AS\n" +
                "(\n" +
                " SELECT DISTINCT U.ID,\n" +
                "       U.LOGIN_NAME,\n" +
                "       U.USER_NAME,\n" +
                "       U.IS_BLOCKED,\n" +
                "       U.CJSJ,\n" +
                "       U.XGSJ,\n" +
                "       U.SFYX_ST,\n" +
                "       OUP.POST_ID,\n" +
                "       OUP.ORGAN_ID, \n" +
                "       U.DEFAULT_ORGAN_ID,\n" +
                "       (SELECT O.ORGAN_NAME FROM SYS_ORGAN O WHERE O.ID=U.DEFAULT_ORGAN_ID) DEFAULT_ORGAN_NAME" +
                "   FROM SYS_USER U\n" +
                "  LEFT JOIN SYS_GLB_USER OUP\n" +
                "    ON U.ID = OUP.USER_ID\n" +
                "   AND OUP.SFYX_ST = '1'\n" +
                " WHERE U.SFYX_ST = '1'\n" +
                ") ");
        sql.append("SELECT DISTINCT A.DEFAULT_ORGAN_ID, A.DEFAULT_ORGAN_NAME,A.ID,A.LOGIN_NAME,A.USER_NAME,A.IS_BLOCKED,A.CJSJ,A.XGSJ  FROM A WHERE 1=1 ");

        if (RxStringUtils.isNotEmpty(map.get("organId"))) {
            sql.append(" AND A.ORGAN_ID=? ");
            params.add(map.get("organId"));
        } else if (RxStringUtils.isNotEmpty(map.get("userId"))) {
            //数据权限控制
            AuthResult ar = dataAuthDao.getUserDataAuthResult(Long.valueOf(map.get("userId").toString()), "organ");
            //有权限
            if (ar.getHasAuth()) {
                //有所有权限
                if (!ar.getHasAll()) {
                    List<Map<String, Object>> authOrgansWithChild = organDao.getChildOrgans(ar.getOids());
                    sql.append("AND").append(RxStringUtils.getInSql("A.ORGAN_ID",
                            RxStringUtils.listToString(authOrgansWithChild, ',', "ID")));
                }
            } else {
                //无权限
                sql.append(" AND A.ORGAN_ID = 0 ");
            }
        }

        if (RxStringUtils.isNotEmpty(map.get("postRoleId"))) {
            sql.append(" AND A.POST_ID=? ");
            params.add(map.get("postRoleId"));
        }
        if (RxStringUtils.isNotEmpty(map.get("loginName"))) {
            sql.append(" AND INSTR(A.LOGIN_NAME,?)>0 ");
            params.add(map.get("loginName"));
        }
        if (RxStringUtils.isNotEmpty(map.get("userName"))) {
            sql.append(" AND INSTR(A.USER_NAME,?)>0 ");
            params.add(map.get("userName"));
        }
        if (RxStringUtils.isNotEmpty(map.get("isBlocked"))) {
            sql.append(" AND A.IS_BLOCKED=? ");
            params.add(map.get("isBlocked"));
        }
        sql.append(" ORDER BY A.IS_BLOCKED,A.XGSJ DESC ");
        return super.getPaginationBySql(sql, params, map);

    }

    @Override
    public SysUser getUserById(Long userId) {
        SysUser user = super.get(userId);
        //获取用户所在机构的角色，并存在user中
        user.setSysOrganRoleList(organDao.getOrgansLinkRole(user.getOrganIds()));
        //获取用户禁用的机构角色
        List<Map<String, Object>> disableRole = getDisableRoleByUserId(userId);
        for (Map<String, Object> t : disableRole) {
            for (Map<String, Object> m : user.getSysOrganRoleList()) {
                if (t.get("ROLE_ID").equals(m.get("roleId"))) {
                    m.put("sfqySt", "UNVALID");
                }
            }
        }
        Hibernate.initialize(user.getSysGlbRoleList());
        Hibernate.initialize(user.getSysGlbUser());
        return user;
    }

    @Override
    public void delUser(Long userId) {
        deleteCascade(userId);
        super.getSession().flush();
        List<Object> params = new ArrayList<>();
        params.add(userId);
        params.add("USER");
        params.add("");
        super.prepareCallNoReturn("{call PKG_BASEPLAT.P_DELETE_ORGAN_POST_USER(?,?,?,?)}", params.toArray());
    }

    @Override
    public void saveUser(SysUser sysUser) {
        if (sysUser.getId() == null) {
            //新增的时候赋予默认角色
            setDefaultRole(sysUser);
        }
        super.saveOrUpdate(sysUser);
        super.getSession().flush();
        afterChangeUser(sysUser.getId());
        //删除该用户所有的禁用数据
        String sql1 = "delete SYS_GLB_ROLE where GL_ID=? and gl_type='3' and sfqy_st='0'";
        getJdbcTemplate().update(sql1, sysUser.getId());
        //获取禁用的角色重新保存
        if (null != sysUser.getSysOrganRoleList()) {
            for (Map<String, Object> organRole : sysUser.getSysOrganRoleList()) {
                if (organRole.get("sfqySt") != null && organRole.get("sfqySt").equals("UNVALID")) {
                    String sql = "INSERT INTO SYS_GLB_ROLE  (ID,ROLE_ID,GL_ID,GL_TYPE,SFQY_ST,SFYX_ST,ROLE_TYPE)  VALUES ( SEQ_SYS_GLB_ROLE.NEXTVAL,?,?,3,0,1,?)";
                    getJdbcTemplate().update(sql, organRole.get("roleId"), sysUser.getId(), organRole.get("roleType"));
                }
            }
        }
    }

    /**
     * 设置用户的默认角色，只在新增的时候保存
     * 用户的个性角色和岗位角色都没有时添加，默认角色从配置中读取。
     *
     * @param sysUser 当前保存的用户
     */
    private void setDefaultRole(SysUser sysUser) {
        if (sysUser.getSysGlbRoleList().size() == 0 && sysUser.getSysOrganRoleList().size() == 0) {
            SysGlbRole sysGlbRole = new SysGlbRole();
            String defaultRole = CacheKit.get(Cache.CONFIG, "DEFAULT_ROLE").toString();
            String sql = "   SELECT ROLE_TYPE, ID FROM SYS_ROLE WHERE ROLE_CODE=? AND SFYX_ST='1'";
            Map<String, Object> roleMap = getJdbcTemplate().queryForMap(sql, defaultRole);
            if (roleMap != null) {
                sysGlbRole.setRoleId(Long.valueOf(roleMap.get("ID").toString()));
                sysGlbRole.setRoleType(roleMap.get("ROLE_TYPE").toString());
                sysGlbRole.setGlType("3");
                sysGlbRole.setSfqySt(Sfqy_st.VALID);
                sysGlbRole.setSfyxSt(SfyxSt.VALID);
                List<SysGlbRole> list = new ArrayList<>();
                list.add(sysGlbRole);
                sysUser.setSysGlbRoleList(list);
            }
        }
    }

    /**
     * 调用存储过程,刷角色数据
     *
     * @param id 用户id
     */
    @Override
    public void afterChangeUser(Long id) {
        List<Object> params = new ArrayList<>();
        params.add(id);
        //参数类型定义 USER
        params.add("USER");
        super.prepareCallNoReturn("{call PKG_BASEPLAT.P_SAVE_ORGAN_POST_USER(?,?,?)}", params.toArray());
    }

    @Override
    public List<Map<String, Object>> getUserListByOrganId(Long organId) {
        StringBuilder sql = new StringBuilder("SELECT DISTINCT U.ID,  \n" +
                "                       U.LOGIN_NAME,  \n" +
                "                       U.USER_NAME MC,  \n" +
                "                       U.DEFAULT_ORGAN_ID DEFAULT_ORGAN, \n" +
                "                       U.SFYX_ST,  \n" +
                "                       U.SORT,  \n" +
                "                       U.IS_BLOCKED,\n" +
                "                       OUP.ORGAN_ID,\n" +
                "                       (SELECT ORGAN_NAME FROM SYS_ORGAN WHERE ID= U.DEFAULT_ORGAN_ID) DEFAULT_ORGAN_NAME,\n" +
                "                       (SELECT ORGAN_NAME FROM SYS_ORGAN WHERE ID= OUP.ORGAN_ID) ORGAN_NAME\n" +
                "                  FROM SYS_USER U, SYS_GLB_USER OUP \n" +
                "                 WHERE U.ID = OUP.USER_ID \n" +
                "                   AND OUP.SFYX_ST = '1'  ");
        List<Object> args = new ArrayList<>();
        if (organId == -1) {
            sql.append(" AND OUP.ORGAN_ID IS NULL ");
        } else {
            sql.append(" AND OUP.ORGAN_ID=? ");
            args.add(organId);
        }
        sql.append(" AND U.SFYX_ST = '1' ");
        sql.append(" ORDER BY U.IS_BLOCKED, U.SORT ");
        if (args.size() > 0) {
            return super.getJdbcTemplate().queryForList(sql.toString(), args.toArray());
        } else {
            return super.getJdbcTemplate().queryForList(sql.toString());
        }
    }

    @Override
    public List<Map<String, Object>> getUserList() {
        String sql = "SELECT * FROM SYS_USER U WHERE U.SFYX_ST='1'";

        return getJdbcTemplate().queryForList(sql);

    }

    @Override
    public List<Map<String, Object>> getUserListByOrganId(String ids) {
        String sql = "SELECT DISTINCT U.ID, " +
                "       U.LOGIN_NAME, " +
                "       U.USER_NAME MC, " +
                "       U.DEFAULT_ORGAN_ID ORGAN,\n" +
                "       U.SFYX_ST, " +
                "       U.SORT, " +
                "       U.IS_BLOCKED " +
                "  FROM SYS_USER U, SYS_GLB_USER OUP\n" +
                " WHERE U.ID = OUP.USER_ID\n" +
                "   AND OUP.SFYX_ST = '1' " + " AND " + RxStringUtils.getInSql("OUP.ORGAN_ID", ids) +
                " AND U.SFYX_ST = '1' " +
                " ORDER BY U.IS_BLOCKED, U.SORT ";
        return super.getJdbcTemplate().queryForList(sql);
    }

    @Override
    public List<Map<String, Object>> getUserListByPostRoleId(Long postRoleId) {
        String sql = ("SELECT U.ID, U.LOGIN_NAME, U.USER_NAME MC, U.SFYX_ST \n" +
                "  FROM SYS_GLB_USER OUP, SYS_USER U\n" +
                " WHERE OUP.USER_ID = U.ID\n" +
                "   AND OUP.SFYX_ST = '1'\n" +
                "   AND OUP.POST_ID = ? ") +
                " AND U.SFYX_ST = '1' " +
                " ORDER BY U.SORT ";
        return super.getJdbcTemplate().queryForList(sql, postRoleId);
    }

    @Override
    public List<Map<String, Object>> getWgwUserListByOrganId(Long organId) {
        String sql = ("SELECT U.ID, U.LOGIN_NAME, U.USER_NAME MC, U.DEFAULT_ORGAN_ID ORGAN,\n" +
                "       U.SFYX_ST " +
                "  FROM SYS_USER U, SYS_GLB_USER OUP\n" +
                " WHERE U.ID = OUP.USER_ID\n" +
                "   AND OUP.SFYX_ST = '1'\n" +
                "   AND OUP.ORGAN_ID = ?\n" +
                "   AND OUP.POST_ID IS NULL ") +
                " AND U.SFYX_ST = '1'  " +
                " ORDER BY U.IS_BLOCKED, U.SORT ";

        return super.getJdbcTemplate().queryForList(sql, organId);
    }


    @Override
    public List<Map<String, Object>> getUserGlxx(Long userId) {
        String sb = "SELECT R.ID, R.ROLE_CODE, R.ROLE_NAME\n" +
                "  FROM SYS_GLB_ROLE_USER RU\n" +
                "  LEFT JOIN SYS_ROLE R\n" +
                "    ON RU.ROLE_ID = R.ID\n" +
                "   AND (R.SFYX_ST = '1' || R.SFYX_ST='3')\n" +
                " WHERE RU.USER_ID = ?\n";
        return super.getJdbcTemplate().queryForList(sb, userId);
    }


    @Override
    public SysUser getUserByLoginInfo(String loginName, String loginPwd) {
        String hql = "from SysUser u where u.loginName=? and u.loginPwd=? and u.sfyxSt='1' ";
        SysUser user = super.getByHql(hql, loginName, loginPwd);
        if (user != null) {
            Hibernate.initialize(user.getSysGlbRoleList());
            Hibernate.initialize(user.getSysGlbUser());
        }
        return user;
    }

    @Override
    public SysUser getUserBySFZ(String sfz) {
        String sql = "SELECT U.ID FROM SYS_USER U, SYS_USER_INFO INFO WHERE SFZHM=? AND U.SFYX_ST='1' AND U.INFO_ID=INFO.ID";
        Long userId;
        try {
            userId = getJdbcTemplate().queryForObject(sql, Long.class, sfz);
        } catch (Exception e) {
            return null;
        }
        return super.get(userId);
    }


    @Override
    public boolean changePwd(String newPwd, Long userId) {
        String sql = "UPDATE SYS_USER SET LOGIN_PWD=? WHERE ID=? AND SFYX_ST='1' ";
        return super.executeSqlUpdate(sql, newPwd, userId) > 0;
    }


    @Override
    public SysUser findUserByLoginName(String loginName) {
        return super.getByHql("from SysUser t where t.loginName = ? and (t.sfyxSt = '1' or t.sfyxSt='3')", loginName);
    }

    @Override
    public void blockUser(Long userId) {
        String sql = "update SYS_USER set IS_BLOCKED='1' where id=?";
        getJdbcTemplate().update(sql, userId);
    }

    @Override
    public void unblockUser(Long userId) {
        String sql = "update SYS_USER set IS_BLOCKED='0' where id=?";
        getJdbcTemplate().update(sql, userId);
    }

    @Override
    public void resetPwd(String pwd, String userIds) {
        String sql = "UPDATE SYS_USER SET LOGIN_PWD=? WHERE ID IN(SELECT * FROM TABLE(SPLITSTR(?,','))) AND SFYX_ST='1' ";
        getJdbcTemplate().update(sql, pwd, userIds);
    }

    @Override
    public List<Map<String, Object>> getUserListTreeDataByOrganId(Long organId) {
        String sql = "SELECT U.ID \"id\",\n" +
                "       U.ID || 'yh' \"handleId\",\n" +
                "       U.USER_NAME \"name\",\n" +
                "       'yh' \"lx\",\n" +
                "       ? \"icon\"," +
                "       GOUP.POST_ID \"postRoleId\",\n" +
                "       GOUP.ORGAN_ID \"organId\"," +
                "       GOUP.ORGAN_ID \"pId\"\n" +
                "  FROM SYS_USER U, SYS_GLB_USER GOUP\n" +
                " WHERE GOUP.USER_ID = U.ID\n" +
                "   AND GOUP.ORGAN_ID = ?\n" +
                "   AND U.SFYX_ST = '1'\n" +
                "   AND GOUP.SFYX_ST = '1'\n" +
                "   ORDER BY GOUP.POST_ID NULLS LAST";
        return getJdbcTemplate().queryForList(sql,
                HttpKit.handleCtxPath(CacheKit.get(Cache.CONFIG, "userIcon")), organId);
    }

    private List<Map<String, Object>> getDisableRoleByUserId(Long userId) {
        String sql = "select * from sys_glb_role where sfqy_st='0' and GL_ID=? and gl_type='3'";
        return getJdbcTemplate().queryForList(sql, userId);
    }


//    public List<Map<String,Object>> getSysUserInfoByUserId(Long userId){
//
//    }

    @Override
    public void addDataAuthOfUserOrgan(Long userId, Long organId) {
        String sql1 = "select count(t.id)\n" +
                "  from SYS_DATA_AUTH t\n" +
                " where t.user_id = ?\n" +
                "   and t.oids = ?\n" +
                "   and t.object_id in (select max(o.id)\n" +
                "                         from sys_object o\n" +
                "                        where o.obj_code = 'organ'\n" +
                "                          and o.sfyx_st = '1')\n" +
                "   and t.sfyx_st = '1'\n";
        Integer existNum = getJdbcTemplate().queryForObject(sql1, Integer.class, userId, organId);

        if (existNum.equals(0)) {
            String sql2 = "insert into sys_data_auth\n" +
                    "values\n" +
                    "  (seq_sys_data_auth.nextval,\n" +
                    "   null,\n" +
                    "   null,\n" +
                    "   ?,\n" +
                    "   (select max(o.id)\n" +
                    "      from sys_object o\n" +
                    "     where o.obj_code = 'organ'\n" +
                    "       and o.sfyx_st = '1'),\n" +
                    "   ?,\n" +
                    "   null,\n" +
                    "   null,\n" +
                    "   286,\n" +
                    "   sysdate,\n" +
                    "   '1')\n";
            getJdbcTemplate().update(sql2, userId, organId);
        }
    }

    @Override
    public void removeDataAuthOfUserOrgan(Long userId, Long organId) {
        String sql = "update sys_data_auth a\n" +
                "   set a.sfyx_st = '0'\n" +
                " where a.user_id = ?\n" +
                "   and a.oids = ?\n" +
                "   and a.sfyx_st = '1'\n" +
                "   and a.object_id in (select o.id\n" +
                "                         from sys_object o\n" +
                "                        where o.obj_code = 'organ'\n" +
                "                          and o.sfyx_st = '1')";
        getJdbcTemplate().update(sql, userId, organId);
    }

    @Override
    public boolean adminDataAuthOfUserOrgan(Long userId) {
        String sql1 = "select count(r.id)\n" +
                "  from sys_role r, sys_glb_role_user gru\n" +
                " where r.id = gru.role_id\n" +
                "   and gru.user_id = ?\n" +
                "   and (r.levels = 1 or r.levels = 2)\n" +
                "   and r.sfyx_st = '1'\n";
        Integer adminRoleNum = getJdbcTemplate().queryForObject(sql1, Integer.class, userId);
        if (adminRoleNum > 0) {
            String sql2 = "select count(t.id)\n" +
                    "  from SYS_DATA_AUTH t\n" +
                    " where t.user_id = ?\n" +
                    "   and t.oids is null\n" +
                    "   and t.object_id in (select max(o.id)\n" +
                    "                         from sys_object o\n" +
                    "                        where o.obj_code = 'organ'\n" +
                    "                          and o.sfyx_st = '1')\n" +
                    "   and t.sfyx_st = '1'\n";
            Integer existNum = getJdbcTemplate().queryForObject(sql2, Integer.class, userId);
            if (existNum.equals(0)) {
                String sql3 = "update sys_data_auth a\n" +
                        "   set a.sfyx_st = '0'\n" +
                        " where a.user_id = ?\n" +
                        "   and a.sfyx_st = '1'\n" +
                        "   and a.object_id in (select o.id\n" +
                        "                         from sys_object o\n" +
                        "                        where o.obj_code = 'organ'\n" +
                        "                          and o.sfyx_st = '1')";
                getJdbcTemplate().update(sql3, userId);
                String sql4 = "insert into sys_data_auth\n" +
                        "values\n" +
                        "  (seq_sys_data_auth.nextval,\n" +
                        "   null,\n" +
                        "   null,\n" +
                        "   ?,\n" +
                        "   (select max(o.id)\n" +
                        "      from sys_object o\n" +
                        "     where o.obj_code = 'organ'\n" +
                        "       and o.sfyx_st = '1'),\n" +
                        "   null,\n" +
                        "   null,\n" +
                        "   null,\n" +
                        "   286,\n" +
                        "   sysdate,\n" +
                        "   '1')\n";
                getJdbcTemplate().update(sql4, userId);
            }
            return true;
        }
        return false;
    }

    @Override
    public void refreshDataAuthOfUserOrgan(Long userId) {
        if (!adminDataAuthOfUserOrgan(userId)) {
            String sql1 = "update sys_data_auth a\n" +
                    "   set a.sfyx_st = '0'\n" +
                    " where a.user_id = ?\n" +
                    "   and a.sfyx_st = '1'\n" +
                    "   and a.object_id in (select o.id\n" +
                    "                         from sys_object o\n" +
                    "                        where o.obj_code = 'organ'\n" +
                    "                          and o.sfyx_st = '1')";
            getJdbcTemplate().update(sql1, userId);

            String sql2 = "select distinct gu.organ_id\n" +
                    "  from sys_glb_user gu\n" +
                    " where gu.user_id = ?\n" +
                    "   and gu.sfyx_st = '1'\n";
            List<Map<String, Object>> organList = getJdbcTemplate().queryForList(sql2, userId);
            for (Map<String, Object> organ : organList) {
                addDataAuthOfUserOrgan(userId, Long.valueOf(organ.get("ORGAN_ID").toString()));
            }
        }
    }

    @Override
    public void refreshDataAuthOfUserOrganByOrgan(Long organId) {
        String sql1 = "select distinct gu.user_id\n" +
                "  from sys_glb_user gu\n" +
                " where gu.organ_id = ?\n" +
                "   and gu.sfyx_st = '1'\n";
        List<Map<String, Object>> userList = getJdbcTemplate().queryForList(sql1, organId);
        for (Map<String, Object> user : userList) {
            refreshDataAuthOfUserOrgan(Long.valueOf(user.get("USER_ID").toString()));
        }
    }

    @Override
    public FastPagination getNoAdminUserList(Map map) {
        List<Object> params = new ArrayList<>();
        StringBuilder sql = new StringBuilder(" SELECT OO.ORGAN_NAME, UU.USER_NAME," +
                "   UU.ID,UU.SEX" +
                "   FROM SYS_USER UU\n" +
                "   LEFT JOIN SYS_ORGAN OO\n" +
                "     ON OO.SFYX_ST = '1'\n" +
                "    AND OO.ID = UU.DEFAULT_ORGAN_ID\n");
        sql.append("  WHERE UU.SFYX_ST = '1'\n" +
                "    AND UU.ID NOT IN (SELECT NVL(GLB.GL_ID, 0)\n" +
                "                        FROM SYS_GLB_ROLE GLB, SYS_ROLE RR\n" +
                "                       WHERE RR.SFYX_ST = '1'\n" +
                "                         AND GLB.SFYX_ST = '1'\n" +
                "                         AND GLB.GL_TYPE = '3'\n" +
                "                         AND GLB.ROLE_ID = RR.ID\n" +
                "                         AND RR.LEVELS IN ('1', '2')) ");
        if (RxStringUtils.isNotEmpty(map.get("userName"))) {
            sql.append(" AND UU.USER_NAME LIKE ? ");
            params.add("%" + map.get("userName") + "%");
        }
        if (RxStringUtils.isNotEmpty(map.get("sex"))) {
            sql.append(" AND UU.SEX = ? ");
            params.add(map.get("sex"));
        }
        return super.getPaginationBySql(sql, params, map);
    }


    /*****************************************************
     * add by zfk 2019/04/18
     * 安顺大防控 start
     * 关于该项目用到的用户体系方法平台中没有的建议在下面的代码块里增加
     *
     *****************************************************/
    @Override
    public List<Map<String, Object>> getUserByOrganIds(String orgIds) {
        String sql = "SELECT DISTINCT U.ID, " +
                "       U.LOGIN_NAME, " +
                "       U.USER_NAME MC, " +
                "       U.DEFAULT_ORGAN_ID ORGAN,\n" +
                "       U.SFYX_ST, " +
                "       U.SORT, " +
                "       U.IS_BLOCKED, " +
                "       ORG.ORGAN_NAME " +
                "  FROM SYS_USER U,SYS_ORGAN ORG\n" +
                " WHERE U.SFYX_ST = '1'\n" +
                " AND " + RxStringUtils.getInSql("U.DEFAULT_ORGAN_ID", orgIds) +
                " AND U.DEFAULT_ORGAN_ID=ORG.ID" +
                " ORDER BY U.IS_BLOCKED, U.SORT ";
        return super.getJdbcTemplate().queryForList(sql);
    }

    /******************************************************
     * 安顺大防控 end
     ******************************************************/
}
