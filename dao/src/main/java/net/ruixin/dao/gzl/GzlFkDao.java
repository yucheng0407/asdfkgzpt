package net.ruixin.dao.gzl;

import org.springframework.stereotype.Repository;     
import net.ruixin.util.paginate.FastPagination;
import java.util.Map;
import java.util.ArrayList;
import java.util.List;
import net.ruixin.util.hibernate.BaseDao;              
import net.ruixin.domain.gzl.GzlFk;

/**
 * 工作流反馈 Dao实现
 *
 * @author rxCoder on 2019-4-9 11:54:03
 */
@Repository
public class GzlFkDao extends BaseDao<GzlFk> implements IGzlFkDao {
    @Override
    public FastPagination getGzlFkListPage(Map map) {
        StringBuilder sql = new StringBuilder();
        List<Object> params = new ArrayList<>();

        sql.append("SELECT T.ID,T.JSID,T.NR,T.FJID,T.SHAPE FROM T_GZL_FK T WHERE T.SFYX_ST='1' ");


        sql.append("ORDER BY T.XGSJ DESC");
        return super.getPaginationBySql(sql, params,map);
    }

}