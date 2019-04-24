package net.ruixin.dao.qbyp;

import org.springframework.stereotype.Repository;     
import net.ruixin.util.paginate.FastPagination;
import java.util.Map;
import java.util.ArrayList;
import java.util.List;
import net.ruixin.util.tools.RxStringUtils;
import net.ruixin.util.hibernate.BaseDao;              
import net.ruixin.domain.qbyp.Zfsj;

/**
 * 重防区域-重防时间 Dao实现
 *
 * @author rxCoder on 2019-4-9 11:50:39
 */
@Repository
public class ZfsjDao extends BaseDao<Zfsj> implements IZfsjDao {
    @Override
    public FastPagination getZfsjListPage(Map map) {
        StringBuilder sql = new StringBuilder();
        List<Object> params = new ArrayList<>();

        sql.append("SELECT T.ID,T.ZFID,T.ZFKSSJ,T.ZFJSSJ FROM T_AREA_ZFSJ T WHERE T.SFYX_ST='1' ");


       if (RxStringUtils.isNotEmpty(map.get("zfkssj"))) {
            RxStringUtils.handleDate(map.get("zfkssj").toString(), sql, params, "ZFKSSJ");
        }
       if (RxStringUtils.isNotEmpty(map.get("zfjssj"))) {
            RxStringUtils.handleDate(map.get("zfjssj").toString(), sql, params, "ZFJSSJ");
        }
        sql.append("ORDER BY T.XGSJ DESC");
        return super.getPaginationBySql(sql, params,map);
    }

}