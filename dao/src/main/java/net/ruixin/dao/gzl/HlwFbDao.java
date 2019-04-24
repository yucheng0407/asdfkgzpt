package net.ruixin.dao.gzl;

import org.springframework.stereotype.Repository;     
import net.ruixin.util.paginate.FastPagination;
import java.util.Map;
import java.util.ArrayList;
import java.util.List;
import net.ruixin.util.hibernate.BaseDao;              
import net.ruixin.domain.gzl.HlwFb;

/**
 * 互联网-发布 Dao实现
 *
 * @author rxCoder on 2019-4-9 11:54:20
 */
@Repository
public class HlwFbDao extends BaseDao<HlwFb> implements IHlwFbDao {
    @Override
    public FastPagination getHlwFbListPage(Map map) {
        StringBuilder sql = new StringBuilder();
        List<Object> params = new ArrayList<>();

        sql.append("SELECT T.ID,T.BT,T.NR,T.JJCD,T.SJZT,T.FPD,T.SJLX,T.YDZT,T.SHAPE,T.FJID,T.SJLYLX,T.FBDW,T.FBDWMC,T.CJRMC FROM T_GZL_HLW_FB T WHERE T.SFYX_ST='1' ");


        sql.append("ORDER BY T.XGSJ DESC");
        return super.getPaginationBySql(sql, params,map);
    }

}