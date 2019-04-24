package net.ruixin.dao.qbyp;

import org.springframework.stereotype.Repository;     
import net.ruixin.util.paginate.FastPagination;
import java.util.Map;
import java.util.ArrayList;
import java.util.List;
import net.ruixin.util.tools.RxStringUtils;
import net.ruixin.util.hibernate.BaseDao;              
import net.ruixin.domain.qbyp.Hsxx;

/**
 * 情报会商 Dao实现
 *
 * @author rxCoder on 2019-4-9 11:56:20
 */
@Repository
public class HsxxDao extends BaseDao<Hsxx> implements IHsxxDao {
    @Override
    public FastPagination getHsxxListPage(Map map) {
        StringBuilder sql = new StringBuilder();
        List<Object> params = new ArrayList<>();

        sql.append("SELECT T.ID,T.BT,T.LX,T.BZ,T.FJ FROM T_QBHS_HSXX T WHERE T.SFYX_ST='1' ");


        if (RxStringUtils.isNotEmpty(map.get("bt"))) {
                sql.append(" AND INSTR(T.BT,?)>0 ");
                params.add(map.get("bt"));
        }
        sql.append("ORDER BY T.XGSJ DESC");
        return super.getPaginationBySql(sql, params,map);
    }

}