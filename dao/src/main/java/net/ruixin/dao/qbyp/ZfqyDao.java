package net.ruixin.dao.qbyp;

import org.springframework.stereotype.Repository;     
import net.ruixin.util.paginate.FastPagination;
import java.util.Map;
import java.util.ArrayList;
import java.util.List;
import net.ruixin.util.hibernate.BaseDao;              
import net.ruixin.domain.qbyp.Zfqy;

/**
 * 重防区域 Dao实现
 *
 * @author rxCoder on 2019-4-9 11:50:14
 */
@Repository
public class ZfqyDao extends BaseDao<Zfqy> implements IZfqyDao {
    @Override
    public FastPagination getZfqyListPage(Map map) {
        StringBuilder sql = new StringBuilder();
        List<Object> params = new ArrayList<>();

        sql.append("SELECT T.ID,T.MC,T.SSDW,T.ZFYQ,T.ZFRQ,T.TPFJ,T.SHAPE FROM T_AREA_ZFQY T WHERE T.SFYX_ST='1' ");


        sql.append("ORDER BY T.XGSJ DESC");
        return super.getPaginationBySql(sql, params,map);
    }

}