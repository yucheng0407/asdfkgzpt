package net.ruixin.dao.gzl;

import org.springframework.stereotype.Repository;     
import net.ruixin.util.paginate.FastPagination;
import java.util.Map;
import java.util.ArrayList;
import java.util.List;
import net.ruixin.util.hibernate.BaseDao;              
import net.ruixin.domain.gzl.GzlJxfb;

/**
 * 工作流-继续发布 Dao实现
 *
 * @author rxCoder on 2019-4-9 11:55:38
 */
@Repository
public class GzlJxfbDao extends BaseDao<GzlJxfb> implements IGzlJxfbDao {
    @Override
    public FastPagination getGzlJxfbListPage(Map map) {
        StringBuilder sql = new StringBuilder();
        List<Object> params = new ArrayList<>();

        sql.append("SELECT T.ID,T.FBID,T.JSID,T.NR,T.FJID,T.SHAPE FROM T_GZL_JXFB T WHERE T.SFYX_ST='1' ");


        sql.append("ORDER BY T.XGSJ DESC");
        return super.getPaginationBySql(sql, params,map);
    }

}