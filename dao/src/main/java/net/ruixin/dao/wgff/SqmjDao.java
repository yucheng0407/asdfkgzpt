package net.ruixin.dao.wgff;

import org.springframework.stereotype.Repository;     
import net.ruixin.util.paginate.FastPagination;
import java.util.Map;
import java.util.ArrayList;
import java.util.List;
import net.ruixin.util.tools.RxStringUtils;
import net.ruixin.util.hibernate.BaseDao;              
import net.ruixin.domain.wgff.Sqmj;

/**
 * 网格队伍-社区民警信息 Dao实现
 *
 * @author rxCoder on 2019-4-9 11:56:53
 */
@Repository
public class SqmjDao extends BaseDao<Sqmj> implements ISqmjDao {
    @Override
    public FastPagination getSqmjListPage(Map map) {
        StringBuilder sql = new StringBuilder();
        List<Object> params = new ArrayList<>();

        sql.append("SELECT T.ID,T.SYSUSER_ID,T.XM,T.LXDH,T.SSPCS,T.GXSQ,T.GXWG,T.GLSB FROM T_WGDW_SQMJ T WHERE T.SFYX_ST='1' ");


        if (RxStringUtils.isNotEmpty(map.get("xm"))) {
                sql.append(" AND INSTR(T.XM,?)>0 ");
                params.add(map.get("xm"));
        }
        sql.append("ORDER BY T.XGSJ DESC");
        return super.getPaginationBySql(sql, params,map);
    }

}