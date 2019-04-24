package net.ruixin.dao.qbyp;

import org.springframework.stereotype.Repository;     
import net.ruixin.util.paginate.FastPagination;
import java.util.Map;
import java.util.ArrayList;
import java.util.List;
import net.ruixin.util.tools.RxStringUtils;
import net.ruixin.util.hibernate.BaseDao;              
import net.ruixin.domain.qbyp.Ajjg;

/**
 * 案件加工 Dao实现
 *
 * @author rxCoder on 2019-4-9 11:47:16
 */
@Repository
public class AjjgDao extends BaseDao<Ajjg> implements IAjjgDao {
    @Override
    public FastPagination getAjjgListPage(Map map) {
        StringBuilder sql = new StringBuilder();
        List<Object> params = new ArrayList<>();

        sql.append("SELECT T.ID,T.AJBH,T.AJSD,T.ZADD,T.AJHG FROM T_AJST_AJJG T WHERE T.SFYX_ST='1' ");


        if (RxStringUtils.isNotEmpty(map.get("ajbh"))) {
                sql.append(" AND INSTR(T.AJBH,?)>0 ");
                params.add(map.get("ajbh"));
        }
        sql.append("ORDER BY T.XGSJ DESC");
        return super.getPaginationBySql(sql, params,map);
    }

}