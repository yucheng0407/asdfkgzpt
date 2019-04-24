package net.ruixin.dao.gzl;

import org.springframework.stereotype.Repository;     
import net.ruixin.util.paginate.FastPagination;
import java.util.Map;
import java.util.ArrayList;
import java.util.List;
import net.ruixin.util.tools.RxStringUtils;
import net.ruixin.util.hibernate.BaseDao;              
import net.ruixin.domain.gzl.GzlFb;

/**
 * 工作流发布 Dao实现
 *
 * @author rxCoder on 2019-4-9 11:53:33
 */
@Repository
public class GzlFbDao extends BaseDao<GzlFb> implements IGzlFbDao {
    @Override
    public FastPagination getGzlFbListPage(Map map) {
        StringBuilder sql = new StringBuilder();
        List<Object> params = new ArrayList<>();

        sql.append("SELECT T.ID,T.BT,T.NR,T.FSFS,T.JJCD,T.SJZT,T.FKLX,T.FPD,T.SJLX,T.YDZT,T.SHAPE,T.FJID,T.SJLYZXT,T.SJLYLX,T.FBDW,T.FBDWMC,T.CJRMC FROM T_GZL_FB T WHERE T.SFYX_ST='1' ");


        if (RxStringUtils.isNotEmpty(map.get("bt"))) {
                sql.append(" AND INSTR(T.BT,?)>0 ");
                params.add(map.get("bt"));
        }
        sql.append("ORDER BY T.XGSJ DESC");
        return super.getPaginationBySql(sql, params,map);
    }

}