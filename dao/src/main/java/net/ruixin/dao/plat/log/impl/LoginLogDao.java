package net.ruixin.dao.plat.log.impl;

import net.ruixin.dao.plat.log.ILoginLogDao;
import net.ruixin.domain.plat.log.LoginLog;
import net.ruixin.util.hibernate.BaseDao;
import net.ruixin.util.paginate.FastPagination;
import net.ruixin.util.tools.RxStringUtils;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;


@Repository
public class LoginLogDao extends BaseDao<LoginLog> implements ILoginLogDao {
    @Override
    public FastPagination getLoginLogPage(Map map) {
        List<Object> params = new ArrayList<>();
        StringBuilder sql = new StringBuilder("SELECT T.* FROM SYS_LOG_LOGIN T WHERE 1=1 ");

        if (RxStringUtils.isNotEmpty(map.get("startTime"))) {
            sql.append(" AND T.LOGIN_TIME >=to_date( ?,'YYYY-MM-DD hh24:mi:ss')");
            params.add(map.get("startTime"));
        }
        if (RxStringUtils.isNotEmpty(map.get("endTime"))) {
            sql.append(" AND T.LOGIN_TIME <=to_date( ? ,'YYYY-MM-DD hh24:mi:ss')");
            params.add(map.get("endTime"));
        }
        if (RxStringUtils.isNotEmpty(map.get("userName"))) {
            sql.append(" AND INSTR(U.USER_NAME,?)>0 ");
            params.add(map.get("userName"));
        }
        sql.append("ORDER BY T.LOGIN_TIME DESC");
        return super.getPaginationBySql(sql, params, map);
    }
}
