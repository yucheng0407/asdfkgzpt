package net.ruixin.dao.jmfk;

import org.springframework.stereotype.Repository;     
import net.ruixin.util.paginate.FastPagination;
import java.util.Map;
import java.util.ArrayList;
import java.util.List;
import net.ruixin.util.hibernate.BaseDao;              
import net.ruixin.domain.jmfk.SbGlb;

/**
 * 防控安排_设备_关联表 Dao实现
 *
 * @author rxCoder on 2019-4-9 11:52:23
 */
@Repository
public class SbGlbDao extends BaseDao<SbGlb> implements ISbGlbDao {
    @Override
    public FastPagination getSbGlbListPage(Map map) {
        StringBuilder sql = new StringBuilder();
        List<Object> params = new ArrayList<>();

        sql.append("SELECT T.ID,T.FKID,T.SBID FROM T_FKAP_SB_GLB T WHERE T.SFYX_ST='1' ");


        sql.append("ORDER BY T.XGSJ DESC");
        return super.getPaginationBySql(sql, params,map);
    }

}