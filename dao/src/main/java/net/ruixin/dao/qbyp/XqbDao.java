package net.ruixin.dao.qbyp;

import org.springframework.stereotype.Repository;     
import net.ruixin.util.paginate.FastPagination;
import java.util.Map;
import java.util.ArrayList;
import java.util.List;
import net.ruixin.util.hibernate.BaseDao;              
import net.ruixin.domain.qbyp.Xqb;

/**
 * 巡区表 Dao实现
 *
 * @author rxCoder on 2019-4-9 11:49:31
 */
@Repository
public class XqbDao extends BaseDao<Xqb> implements IXqbDao {
    @Override
    public FastPagination getXqbListPage(Map map) {
        StringBuilder sql = new StringBuilder();
        List<Object> params = new ArrayList<>();

        sql.append("SELECT T.ID,T.XQMC,T.XQLX,T.SSDW,T.SHAPE,T.TPFJ FROM T_AREA_XQB T WHERE T.SFYX_ST='1' ");


        sql.append("ORDER BY T.XGSJ DESC");
        return super.getPaginationBySql(sql, params,map);
    }

}