package net.ruixin.dao.plat.demo;

import net.ruixin.domain.plat.demo.DemoDict;
import net.ruixin.util.hibernate.BaseDao;
import net.ruixin.util.paginate.FastPagination;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Created by pitcher on 2018/5/18.
 */
@Repository
public class DemoDictDao extends BaseDao<DemoDict> implements IDemoDictDao {

    @Override
    public FastPagination getDemoDictList(Map map) {
        StringBuilder sql = new StringBuilder();
        List<Object> params = new ArrayList<>();
        sql.append("SELECT T.* FROM SYS_DEMO_DICT T WHERE T.SFYX_ST='1'");
        sql.append("ORDER BY T.XGSJ DESC");
        return super.getPaginationBySql(sql, params, map);
    }
}
