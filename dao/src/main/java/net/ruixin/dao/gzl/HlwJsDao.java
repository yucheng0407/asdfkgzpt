package net.ruixin.dao.gzl;

import org.springframework.stereotype.Repository;     
import net.ruixin.util.paginate.FastPagination;
import java.util.Map;
import java.util.ArrayList;
import java.util.List;
import net.ruixin.util.hibernate.BaseDao;              
import net.ruixin.domain.gzl.HlwJs;

/**
 * 互联网-接收 Dao实现
 *
 * @author rxCoder on 2019-4-9 11:54:53
 */
@Repository
public class HlwJsDao extends BaseDao<HlwJs> implements IHlwJsDao {
    @Override
    public FastPagination getHlwJsListPage(Map map) {
        StringBuilder sql = new StringBuilder();
        List<Object> params = new ArrayList<>();

        sql.append("SELECT T.ID,T.FBID,T.YDZT,T.FKZT,T.JRS_ID,T.JSRMC,T.JSDW,T.JSDWMC FROM T_GZL_HLW_JS T WHERE T.SFYX_ST='1' ");


        sql.append("ORDER BY T.XGSJ DESC");
        return super.getPaginationBySql(sql, params,map);
    }

}