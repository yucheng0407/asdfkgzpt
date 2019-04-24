package net.ruixin.dao.wgff;

import org.springframework.stereotype.Repository;     
import net.ruixin.util.paginate.FastPagination;
import java.util.Map;
import java.util.ArrayList;
import java.util.List;
import net.ruixin.util.tools.RxStringUtils;
import net.ruixin.util.hibernate.BaseDao;              
import net.ruixin.domain.wgff.Wgy;

/**
 * 网格员信息 Dao实现
 *
 * @author rxCoder on 2019-4-9 11:57:15
 */
@Repository
public class WgyDao extends BaseDao<Wgy> implements IWgyDao {
    @Override
    public FastPagination getWgyListPage(Map map) {
        StringBuilder sql = new StringBuilder();
        List<Object> params = new ArrayList<>();

        sql.append("SELECT T.ID,T.XM,T.ZY,T.XB,T.MZ,T.SFZH,T.LXDH,T.WHCD,T.ZZMM,T.SSPCS,T.SSSQ,T.SSWG,T.ZRMJ,T.ZZ,T.BZ,T.TPID,T.SFZDRY,T.ZDRYLX FROM T_WGDW_WGY T WHERE T.SFYX_ST='1' ");


        if (RxStringUtils.isNotEmpty(map.get("xm"))) {
                sql.append(" AND INSTR(T.XM,?)>0 ");
                params.add(map.get("xm"));
        }
        sql.append("ORDER BY T.XGSJ DESC");
        return super.getPaginationBySql(sql, params,map);
    }

}