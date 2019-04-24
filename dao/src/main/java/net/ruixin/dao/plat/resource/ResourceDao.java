package net.ruixin.dao.plat.resource;

import net.ruixin.domain.constant.Const;
import net.ruixin.domain.plat.resource.SysResource;
import net.ruixin.util.cache.Cache;
import net.ruixin.util.cache.CacheKit;
import net.ruixin.util.hibernate.BaseDao;
import net.ruixin.util.paginate.FastPagination;
import net.ruixin.util.tools.RxStringUtils;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Repository
public class ResourceDao extends BaseDao<SysResource> implements IResourceDao {

    @Override
    public void saveResource(SysResource resource) {
        super.saveOrUpdate(resource);
    }

    @Override
    public void updateResourceMaxSort(Long id, Long parentId) {
        super.getSession().flush();
        StringBuilder sql = new StringBuilder("update sys_resource set sort = " +
                "(select decode(max(r.sort),null,0,max(r.sort))+1 from sys_resource r where 1=1 ");
        List<Object> args = new ArrayList<>();
        if (null != parentId) {
            sql.append(" and r.parent_id = ? ");
            args.add(parentId);
        } else {
            sql.append(" and r.parent_id is null ");
        }
        sql.append(" and r.sfyx_st = '1') where id = ? ");
        args.add(id);
        super.getJdbcTemplate().update(sql.toString(), args.toArray());
    }

    @Override
    public SysResource getResourceById(Long id) {
        return super.get(id);
    }

    @Override
    public void delResource(Long id) {
        String sql = "UPDATE SYS_RESOURCE\n" +
                "  SET SFYX_ST = '0'\n" +
                "  WHERE ID IN (SELECT A.ID\n" +
                "                 FROM SYS_RESOURCE A\n" +
                "                START WITH A.SFYX_ST = '1'\n" +
                "                       AND A.ID = ? \n" +
                "               CONNECT BY PRIOR A.ID = A.PARENT_ID)";
        super.getJdbcTemplate().update(sql, id);
    }

    @Override
    public FastPagination getResourceList(Map map) {
        StringBuilder sql = new StringBuilder("SELECT R.ID, R.NAME, R.CODE, R.TYPE, R.XGSJ\n");
        List<Object> args = new ArrayList<>();
        if (RxStringUtils.isNotEmpty(map.get("parentId"))) {
            //parentId存在，则将父级显示在第一条，剩余条目按修改时间降序
            sql.append(", DECODE(R.ID, ?, 1, 0) UTYPE\n");
            args.add(map.get("parentId"));
        }
        sql.append("  FROM SYS_RESOURCE R\n" +
                " WHERE R.SFYX_ST = '1'\n");
        if (RxStringUtils.isNotEmpty(map.get("parentId"))) {
            //parentId存在，则查父级与子级条目
            sql.append("    AND (R.ID = ? OR R.PARENT_ID = ?)\n");
            args.add(map.get("parentId"));
            args.add(map.get("parentId"));
        }
        if (RxStringUtils.isNotEmpty(map.get("name"))) {
            sql.append(" AND R.NAME LIKE ? ");
            args.add("%" + map.get("name") + "%");
        }
        if (RxStringUtils.isNotEmpty(map.get("code"))) {
            sql.append(" AND R.CODE LIKE ? ");
            args.add("%" + map.get("code") + "%");
        }
        if (RxStringUtils.isNotEmpty(map.get("type"))) {
            sql.append(" AND R.TYPE = ? ");
            args.add(map.get("type"));
        }
        if (RxStringUtils.isNotEmpty(map.get("parentId"))) {
            //parentId存在，则将父级显示在第一条，剩余条目按修改时间降序
            sql.append("  ORDER BY DECODE(R.ID, ?, 1, 0) DESC,R.SORT, R.XGSJ DESC");
            args.add(map.get("parentId"));
        } else {
            sql.append("  ORDER BY R.XGSJ DESC");
        }
        return super.getPaginationBySql(sql, args, map);
    }

    @Override
    public List<Map<String, Object>> getResourceTreeData(String resourceType, Long removeId, Long id) {
        StringBuilder sql = new StringBuilder();
        List<Object> args = new ArrayList<>();
        sql.append(" SELECT R.ID,\n" +
                "       R.NAME,\n" +
                "       R.CODE,\n" +
                "       R.TYPE,\n" +
                "       R.XGSJ,\n" +
                "       (SELECT COUNT(R2.ID)\n" +
                "          FROM SYS_RESOURCE R2\n" +
                "         WHERE R2.PARENT_ID = R.ID\n");
        if (null != removeId) {
            sql.append("AND R2.ID <> ? ");
            args.add(removeId);
        }
        sql.append("  AND R.TYPE IN (SELECT COLUMN_VALUE FROM TABLE(SPLITSTR(?, ','))) ");
        args.add(resourceType);
        sql.append(" AND R2.SFYX_ST = '1') CHILD_NUM \n" +
                "  FROM SYS_RESOURCE R WHERE R.TYPE IN (SELECT COLUMN_VALUE FROM TABLE(SPLITSTR(?, ','))) \n");
        args.add(resourceType);
        if (null != removeId) {
            sql.append("AND R.ID <> ? ");
            args.add(removeId);
        }
        if (null == id) {
            sql.append("AND (R.PARENT_TYPE IS NULL OR R.PARENT_TYPE NOT IN (SELECT COLUMN_VALUE FROM TABLE(SPLITSTR(?, ',')))) ");
            args.add(resourceType);
        } else {
            sql.append("AND R.PARENT_ID = ? ");
            args.add(id);
        }
        sql.append("AND R.SFYX_ST = '1' ");
        return getJdbcTemplate().queryForList(sql.toString(), args.toArray());
    }

    @Override
    public List<Map<String, Object>> getRoleResourceTreeData(String type, String roleIds, String showRoleIds, Boolean showAll) {
        String sql = ("SELECT DISTINCT R.*,\n" +
                "                GRR2.IDS AS HAS_ID,\n" +
                "                NVL2((SELECT MAX(PM.ID)\n" +
                "                       FROM SYS_RESOURCE PM\n" +
                "                      WHERE PM.TARGET_ID = R.ID\n" +
                "                        AND PM.SFYX_ST = '1'),\n" +
                "                     1,\n" +
                "                     0) NOT_GARY\n" +
                "  FROM SYS_RESOURCE R\n") +
                "  LEFT JOIN (SELECT TO_CHAR(WM_CONCAT(DISTINCT GRR2.ROLE_ID)) IDS, GRR2.RESOURCE_ID\n" +
                "               FROM SYS_GLB_ROLE_RESOURCE GRR2\n" +
                "              WHERE GRR2.ROLE_ID IN (" +
                roleIds + ")\n" +
                "                AND GRR2.SFYX_ST = '1'\n" +
                "              GROUP BY GRR2.RESOURCE_ID) GRR2\n" +
                "    ON GRR2.RESOURCE_ID = R.ID\n" +
                " WHERE R.TYPE = ? \n" +
                "   AND R.SFYX_ST = '1'\n" +
                " ORDER BY R.SORT ASC\n";
        List<Object> args = new ArrayList<>();
        //HAS_ID为是资源关联表id，null代表无这个资源权限，不为空代表有这个资源权限（树勾选）
        //去除资源控制
//        if (!showAll) {
//            if (RxStringUtils.isEmpty(showRoleIds)) {
//                return new ArrayList<>();
//            }
//            sql.append("  INNER JOIN SYS_GLB_ROLE_RESOURCE GRR\n" +
//                    "    ON GRR.RESOURCE_ID = R.ID\n" +
//                    "   AND GRR.ROLE_ID IN (").append(showRoleIds).append(")\n" +
//                    "   AND GRR.SFYX_ST = '1'");
//        }
        args.add(type);
        return getJdbcTemplate().queryForList(sql, args.toArray());
    }

    @Override
    public void saveRoleResource(Long roleId, String resourceIds, Long cjrId, String delIds, Boolean isPlat) {
        getJdbcTemplate().update("delete from sys_glb_role_resource where role_id = ? ", roleId);
        String[] ids = resourceIds.split(",");
        for (String resourceId : ids) {
            getJdbcTemplate().update("insert into sys_glb_role_resource values(seq_sys_glb_role_resource.nextval,?,?,?,sysdate,'1')", roleId, resourceId, cjrId);
        }

        //查找此管理员管理的角色，删除含有被删除资源的关联关系，只有plat才会走这段逻辑（暂不考虑级联）
        if (isPlat && RxStringUtils.isNotEmpty(delIds)) {
            getJdbcTemplate().update("UPDATE SYS_GLB_ROLE_RESOURCE EE\n" +
                    "   SET SFYX_ST = '0'\n" +
                    " WHERE EE.ROLE_ID IN (SELECT ID\n" +
                    "                        FROM SYS_ROLE R\n" +
                    "                       WHERE R.SFYX_ST = '1'\n" +
                    "                         AND R.ROLE_TYPE != '2'\n" +
                    "                         AND R.CREATE_ROLE_ID = ? )\n" +
                    "   AND EE.RESOURCE_ID IN\n" +
                    "       (SELECT COLUMN_VALUE FROM TABLE(SPLITSTR(?, ',')))\n" +
                    "   AND EE.SFYX_ST = '1'", roleId, delIds);
        }
    }

    @Override
    public List<Map<String, Object>> getUserResource(Long userId, String type, Boolean hasAll, Boolean isSysAdmin) {
        StringBuilder sql = new StringBuilder();
        if (hasAll) {
            sql.append("SELECT R.*, PR.NAME AS PARENT_NAME, PR.CODE AS PARENT_CODE \n" +
                    "  FROM SYS_RESOURCE R " +
                    "   LEFT JOIN SYS_RESOURCE PR " +
                    "       ON R.PARENT_ID = PR.ID AND PR.SFYX_ST = '1' " +
                    " WHERE R.TYPE = ?\n" +
                    "   AND R.SFYX_ST = '1'");
            return super.getJdbcTemplate().queryForList(sql.toString(), type);
        } else {
            sql.append("SELECT DISTINCT R.*, PR.NAME AS PARENT_NAME, PR.CODE AS PARENT_CODE\n" +
                    "  FROM SYS_GLB_ROLE_RESOURCE GRR,\n");
            if (isSysAdmin) {
                sql.append("   (SELECT GRU.ROLE_ID\n" +
                        "          FROM SYS_GLB_ROLE_USER GRU\n" +
                        "         WHERE GRU.USER_ID = ? \n" +
                        "        UNION\n" +
                        "        SELECT CR.ROLE_ID\n" +
                        "          FROM SYS_GLB_ROLE_USER GRU\n" +
                        "         RIGHT JOIN SYS_GLB_COMBINE_ROLE_FJ CR\n" +
                        "            ON CR.COMBINE_ROLE_ID = GRU.ROLE_ID\n" +
                        "         WHERE GRU.USER_ID = ? ) CR,\n");
            } else {
                sql.append("       (SELECT GRU.ROLE_ID\n" +
                        "          FROM SYS_GLB_ROLE_USER GRU\n" +
                        "         WHERE GRU.USER_ID = ? \n" +
                        "        UNION\n" +
                        "        SELECT CR.ROLE_ID\n" +
                        "          FROM SYS_GLB_ROLE_USER GRU\n" +
                        "         RIGHT JOIN SYS_GLB_COMBINE_ROLE_FJ CR\n" +
                        "            ON CR.COMBINE_ROLE_ID = GRU.ROLE_ID\n" +
                        "         WHERE GRU.USER_ID = ? ) CR,\n");
            }
            sql.append("       SYS_RESOURCE R\n" +
                    "  LEFT JOIN SYS_RESOURCE PR\n" +
                    "    ON R.PARENT_ID = PR.ID\n" +
                    "   AND PR.SFYX_ST = '1'\n" +
                    " WHERE R.TYPE = ? \n" +
                    "   AND R.ID = GRR.RESOURCE_ID\n" +
                    "   AND GRR.ROLE_ID = CR.ROLE_ID\n" +
                    "   AND R.SFYX_ST = '1'\n" +
                    "   AND GRR.SFYX_ST = '1'");
            return super.getJdbcTemplate().queryForList(sql.toString(), userId, userId, type);
        }
    }

    @Override
    public List<Map<String, Object>> getMenus(Long userId, Boolean hasAll, Boolean isSysAdmin) {
        StringBuilder sql = new StringBuilder();
        if (hasAll) {
            sql.append("SELECT MR.ID          MENU_ID,\n" +
                    "       MR.NAME        MENU_NAME,\n" +
                    "       MR.PARENT_ID,\n" +
                    "       MR.CODE,\n" +
                    "       MR.ICON,\n" +
                    "       MR.PARENT_TYPE,\n" +
                    "       (SELECT CODE AS PARENT_CODE FROM SYS_RESOURCE WHERE ID = MR.PARENT_ID AND SFYX_ST= '1') PARENT_CODE,\n" +
                    "       MR.SORT,\n" +
                    "       MR.URL         MENU_URL,\n" +
                    "       MR.LV\n" +
                    "  FROM (SELECT R.*, LEVEL AS LV, ROWNUM AS RN\n" +
                    "          FROM (SELECT RM.ID, RM.NAME, RM.PARENT_ID, RM.PARENT_TYPE, RM.ICON, RM.SORT,RM.CODE, RM.URL\n" +
                    "                  FROM SYS_RESOURCE RM\n" +
                    "                 WHERE RM.TYPE = '" + Const.RES_TYPE_MENU + "'\n" +
                    "                   AND RM.SFYX_ST = '1') R\n" +
                    "         START WITH R.PARENT_ID IS NULL OR R.PARENT_TYPE = '" + Const.RES_TYPE_APP + "'\n" +
                    "        CONNECT BY PRIOR R.ID = R.PARENT_ID) MR\n" +
                    " ORDER BY MR.RN\n");
            return super.getJdbcTemplate().queryForList(sql.toString());
        } else {
            sql.append("SELECT DISTINCT MR.ID          MENU_ID,\n" +
                    "       MR.NAME        MENU_NAME,\n" +
                    "       MR.PARENT_ID,\n" +
                    "       MR.CODE,\n" +
                    "       MR.ICON,\n" +
                    "       MR.PARENT_TYPE,\n" +
                    "       (SELECT CODE AS PARENT_CODE FROM SYS_RESOURCE WHERE ID = MR.PARENT_ID AND SFYX_ST= '1') PARENT_CODE,\n" +
                    "       MR.SORT,\n" +
                    "       MR.URL         MENU_URL,\n" +
                    "       MR.LV, MR.RN\n" +
                    "  FROM (SELECT R.*, LEVEL AS LV, ROWNUM AS RN\n" +
                    "          FROM (SELECT RM.ID, RM.NAME, RM.PARENT_ID, RM.PARENT_TYPE,RM.ICON, RM.SORT,RM.CODE, RM.URL\n" +
                    "                  FROM SYS_RESOURCE RM\n" +
                    "                 WHERE RM.TYPE = '" + Const.RES_TYPE_MENU + "'\n" +
                    "                   AND RM.SFYX_ST = '1') R\n" +
                    "         START WITH R.PARENT_ID IS NULL OR R.PARENT_TYPE = '" + Const.RES_TYPE_APP + "'\n" +
                    "        CONNECT BY PRIOR R.ID = R.PARENT_ID) MR,\n" +
                    "       SYS_GLB_ROLE_RESOURCE GRR,\n");
            //管理员角色登陆组合角色查询管理员角色级别
            if (isSysAdmin) {
                sql.append("(    SELECT GRUR.ROLE_ID\n" +
                        "      FROM (SELECT GRU.ROLE_ID\n" +
                        "              FROM SYS_GLB_ROLE_USER GRU\n" +
                        "             WHERE GRU.USER_ID = ? \n" +
                        "            UNION\n" +
                        "            SELECT CR.ROLE_ID\n" +
                        "              FROM SYS_GLB_ROLE_USER GRU\n" +
                        "             RIGHT JOIN SYS_GLB_COMBINE_ROLE_FJ CR\n" +
                        "                ON CR.COMBINE_ROLE_ID = GRU.ROLE_ID\n" +
                        "             WHERE GRU.USER_ID = ?) GRUR,\n" +
                        "           SYS_ROLE ROLE\n" +
                        "     WHERE GRUR.ROLE_ID = ROLE.ID\n" +
                        "       AND ROLE.LEVELS = '2' ) CR");
            } else {
                sql.append("       (SELECT GRU.ROLE_ID\n" +
                        "          FROM SYS_GLB_ROLE_USER GRU\n" +
                        "         WHERE GRU.USER_ID = ? \n" +
                        "        UNION\n" +
                        "        SELECT CR.ROLE_ID\n" +
                        "          FROM SYS_GLB_ROLE_USER GRU\n" +
                        "         RIGHT JOIN SYS_GLB_COMBINE_ROLE_FJ CR\n" +
                        "            ON CR.COMBINE_ROLE_ID = GRU.ROLE_ID\n" +
                        "         WHERE GRU.USER_ID = ?) CR \n");

            }
            sql.append(" WHERE MR.ID = GRR.RESOURCE_ID\n" +
                    "   AND GRR.ROLE_ID = CR.ROLE_ID\n" +
                    "   AND GRR.SFYX_ST = '1'\n" +
                    " ORDER BY MR.RN");
            return super.getJdbcTemplate().queryForList(sql.toString(), userId, userId);
        }
    }

    @Override
    public void changeTreeNodeSortAndParent(String ids, Long parentId, String parentType, Long parentShowId, Long needClearTargetId) {
        if (RxStringUtils.isEmpty(ids)) {
            return;
        }
        if (null != needClearTargetId) {
            super.getJdbcTemplate().update("update sys_resource set target_id = null where target_id = ? ", needClearTargetId);
        }
        Map<String, Map<String, Object>> resourceConfigMap = CacheKit.get(Cache.CONFIG, "resourceConfig");
        String[] idArr = ids.split(",");
        String sql1 = " update sys_resource set sort = ? , parent_id = ? , parent_type = ? ,show_parent_id = ? where id = ? ";
        String sql2 = " update sys_resource set sort = ? , parent_id = null , parent_type = null , show_parent_id = null where id = ? ";
        List<Object> args;
        for (int i = 0; i < idArr.length; i++) {
            args = new ArrayList<>();
            args.add(i + 1);
            if (null != parentId && 0 != parentId) {
                args.add(parentId);
                args.add(parentType);
                Long showId = null;
                if (RxStringUtils.isNotEmptyAndEqualsZero(resourceConfigMap.get(parentType).get("tree"))) {
                    if (null != parentShowId && 0 != parentShowId) {
                        showId = parentShowId;
                    }
                } else {
                    showId = parentId;
                }
                args.add(showId);
                args.add(idArr[i]);
                super.getJdbcTemplate().update(sql1, args.toArray());
            } else {
                args.add(idArr[i]);
                super.getJdbcTemplate().update(sql2, args.toArray());
            }
        }
    }

    @Override
    public FastPagination getMenuUrlList(Map map) {
        StringBuilder sql = new StringBuilder("SELECT R.ID, R.NAME, R.CODE, R.URL, R.XGSJ FROM SYS_RESOURCE R\n" +
                " WHERE R.TYPE = '" + Const.RES_TYPE_PAGE + "' AND R.SFYX_ST = '1'\n");
        List<Object> args = new ArrayList<>();
        if (RxStringUtils.isNotEmpty(map.get("parentId"))) {
            //parentId存在，则查父级与子级条目
            sql.append("    AND R.PARENT_ID = ? \n");
            args.add(map.get("parentId"));
        }
        if (RxStringUtils.isNotEmpty(map.get("name"))) {
            sql.append(" AND R.NAME LIKE ? ");
            args.add("%" + map.get("name") + "%");
        }
        sql.append("  ORDER BY R.XGSJ DESC");
        return super.getPaginationBySql(sql, args, map);
    }


    @Override
    public void updateOuterTargetUrl(Long id, String url) {
        getJdbcTemplate().update("update sys_resource set url = ? where target_id = ? and sfyx_st = '1'", url, id);
    }

    @Override
    public List<Map<String, Object>> getUserResourceUrl(Long id) {
        String sql = "SELECT DISTINCT R.URL\n" +
                "  FROM SYS_GLB_ROLE_RESOURCE GRR,\n" +
                "       (SELECT GRU.ROLE_ID\n" +
                "          FROM SYS_GLB_ROLE_USER GRU\n" +
                "         WHERE GRU.USER_ID = ? \n" +
                "        UNION\n" +
                "        SELECT CR.ROLE_ID\n" +
                "          FROM SYS_GLB_ROLE_USER GRU\n" +
                "         RIGHT JOIN SYS_GLB_COMBINE_ROLE_FJ CR\n" +
                "            ON CR.COMBINE_ROLE_ID = GRU.ROLE_ID\n" +
                "         WHERE GRU.USER_ID = ? ) CR,\n" +
                "       SYS_RESOURCE R\n" +
                " WHERE  R.ID = GRR.RESOURCE_ID\n" +
                "   AND GRR.ROLE_ID = CR.ROLE_ID\n" +
                "   AND R.SFYX_ST = '1'\n" +
                "   AND GRR.SFYX_ST = '1'\n" +
                "   AND R.TYPE != 'app'\n" +
                "   AND R.TARGET_ID IS NULL\n" +
                "   AND R.URL IS NOT NULL";
        return super.getJdbcTemplate().queryForList(sql, id, id);
    }

    @Override
    public List<Map<String, Object>> getRoleAllocatResourceData(String type, String roleIds, String showRoleIds, Boolean showAll) {
        StringBuilder sql = new StringBuilder();
        List<Object> args = new ArrayList<>();
        sql.append(" SELECT DISTINCT R.*,\n" +
                "                GRR2.IDS AS HAS_ID,\n" +
                "                NVL2((SELECT MAX(PM.ID)\n" +
                "                       FROM SYS_RESOURCE PM\n" +
                "                      WHERE PM.TARGET_ID = R.ID\n" +
                "                        AND PM.SFYX_ST = '1'),\n" +
                "                     1,\n" +
                "                     0) NOT_GARY\n" +
                "  FROM SYS_GLB_ROLE_RESOURCE GLBR, SYS_RESOURCE R\n" +
                "  LEFT JOIN (SELECT TO_CHAR(WM_CONCAT(DISTINCT GRR2.ROLE_ID)) IDS, GRR2.RESOURCE_ID\n" +
                "               FROM SYS_GLB_ROLE_RESOURCE GRR2\n" +
                "              WHERE GRR2.ROLE_ID IN (").append(roleIds).append(")\n" +
                "                AND GRR2.SFYX_ST = '1'\n" +
                "              GROUP BY GRR2.RESOURCE_ID) GRR2\n" +
                "    ON GRR2.RESOURCE_ID = R.ID\n" +
                " WHERE R.TYPE = ? \n" +
                "   AND R.SFYX_ST = '1'\n" +
                "   AND GLBR.SFYX_ST = '1'\n");
        args.add(type);
        if (!showAll) {
            args.add(showRoleIds);
            args.add(showRoleIds);
            sql.append("AND GLBR.RESOURCE_ID = R.ID AND (GLBR.ROLE_ID = ? or GLBR.ROLE_ID in (select glb.role_id\n" +
                    "  from sys_glb_combine_role glb, sys_role role\n" +
                    " where glb.combine_role_id = ? \n" +
                    "   and role.id = glb.role_id\n" +
                    "   and role.levels = 2)) ");
        }
        sql.append(" ORDER BY R.SORT ASC ");
        return getJdbcTemplate().queryForList(sql.toString(), args.toArray());
    }

    @Override
    public void saveAllotRes(String roleIds, Long resId, Long cjrId) {
        //被分配的资源可能已经存在
        if (RxStringUtils.isNotEmpty(roleIds)) {
            String[] ids = roleIds.split(",");
            for (String roleId : ids) {
                //对新增的资源进行快捷操作，所以不用查询是否已经存在
//                Integer count = Integer.parseInt(getJdbcTemplate().queryForMap("SELECT COUNT(RES.ID) AS COUNT \n" +
//                        "    FROM SYS_GLB_ROLE_RESOURCE RES\n" +
//                        "   WHERE RES.SFYX_ST = '1'\n" +
//                        "     AND RES.ROLE_ID = ?\n" +
//                        "     AND RES.RESOURCE_ID = ?", roleId, resId).get("COUNT").toString());
//                if (count == 0) {
                getJdbcTemplate().update("insert into sys_glb_role_resource values(seq_sys_glb_role_resource.nextval,?,?,?,sysdate,'1')", roleId, resId, cjrId);
//                }
            }
        }
    }

    @Override
    public void delResourceByFormId(Long id) {
        this.jdbcTemplate.update("UPDATE SYS_RESOURCE T SET T.SFYX_ST = '0' WHERE T.FORM_ID = ? ", id);
    }
}