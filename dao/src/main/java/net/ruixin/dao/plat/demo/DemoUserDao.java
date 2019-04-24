package net.ruixin.dao.plat.demo;

import net.ruixin.domain.plat.demo.DemoUser;
import net.ruixin.util.hibernate.BaseDao;
import net.ruixin.util.paginate.FastPagination;
import net.ruixin.util.tools.RxStringUtils;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Created by pitcher on 2017/5/18.
 */
@Repository
public class DemoUserDao extends BaseDao<DemoUser> implements IDemoUserDao {

    @Override
    public FastPagination getDemoUserList(Map map) {
        StringBuilder sql = new StringBuilder();
        List<Object> params = new ArrayList<>();
        sql.append("SELECT T.ID, T.USER_NAME,T.SEX,T.CSRQ,T.ZZMM,T.ZP_ID FROM SYS_DEMO_USER T WHERE T.SFYX_ST='1'");
        if (RxStringUtils.isNotEmpty(map.get("userName"))) {
            sql.append(" AND T.USER_NAME LIKE ?");
            params.add("%" + map.get("userName") + "%");
        }
        if (RxStringUtils.isNotEmpty(map.get("zzmm"))) {
            sql.append(" AND T.ZZMM =?");
            params.add(map.get("zzmm"));
        }
        if (RxStringUtils.isNotEmpty(map.get("sex"))) {
            sql.append(" AND T.SEX =?");
            params.add(map.get("sex"));
        }
        if (RxStringUtils.isNotEmpty(map.get("csrq"))) {
            RxStringUtils.handleDate(map.get("csrq").toString(), sql, params, "CSRQ");
        }
        sql.append("ORDER BY T.XGSJ DESC");
        return super.getPaginationBySql(sql, params, map);
    }
}
