package net.ruixin.dao.plat.workflow.impl;

import net.ruixin.domain.plat.workflow.test.Teacher;
import net.ruixin.util.hibernate.BaseDao;
import net.ruixin.util.paginate.FastPagination;
import net.ruixin.util.tools.RxStringUtils;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@SuppressWarnings({"SqlDialectInspection", "SqlNoDataSourceInspection"})
@Repository
public class TeacherDao extends BaseDao<Teacher> {

    public FastPagination getBlList(Map map) {
        String flowCode = "flowImageTest";//测试请假流程编码
//        String flowCode = "CSFZJH";//测试分支聚合流程编码
        List<Object> args = new ArrayList<>();
        StringBuilder sql = new StringBuilder("SELECT BW.STATUS,\n" +
                "       BW.TITLE,\n" +
                "       (SELECT WI.WORKFLOW_ID FROM SYS_WORKFLOW_INSTANCE WI WHERE WI.ID=BW.WORKFLOW_INSTANCE_ID) AS WF_ID,\n"+
                "       BW.WORKFLOW_INSTANCE_ID WF_INS_ID,\n" +
                "       BW.XGSJ,\n" +
                "       U.USER_NAME\n" +
                "  FROM SYS_GLB_BIZ_WF BW, SYS_USER U\n" +
                " WHERE BW.USER_ID = U.ID\n" +
                "   AND BW.WORKFLOW_CODE = '" + flowCode +"'"+ //测试分支聚合
                "   AND U.SFYX_ST <> '0'\n" +
                "   AND BW.SFYX_ST = '1' ");
        if (RxStringUtils.isNotEmpty(map.get("title"))) {
            sql.append(" AND BW.TITLE LIKE ?");
            args.add("%" + map.get("title") + "%");
        }
        sql.append(" ORDER BY BW.XGSJ DESC ");
        return super.getPaginationBySql(sql, args, map);
    }
}
