package net.ruixin.dao.wgff;
import java.util.Map;
import net.ruixin.util.paginate.FastPagination;
import net.ruixin.util.hibernate.IBaseDao;
import net.ruixin.domain.wgff.Wgy;

/**
 * 网格员信息Dao接口
 *
 * @author rxCoder on 2019-4-9 11:57:15
 */
public interface IWgyDao extends IBaseDao<Wgy> {

    /**
     * 查询网格员信息分页列表
     *
     * @param map 查询条件
     * @return 模块分页信息
     */
    FastPagination getWgyListPage(Map map);
}
