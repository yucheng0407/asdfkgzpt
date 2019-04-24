package net.ruixin.dao.qbyp;
import java.util.Map;
import net.ruixin.util.paginate.FastPagination;
import net.ruixin.util.hibernate.IBaseDao;
import net.ruixin.domain.qbyp.Xqb;

/**
 * 巡区表Dao接口
 *
 * @author rxCoder on 2019-4-9 11:49:31
 */
public interface IXqbDao extends IBaseDao<Xqb> {

    /**
     * 查询巡区表分页列表
     *
     * @param map 查询条件
     * @return 模块分页信息
     */
    FastPagination getXqbListPage(Map map);
}
