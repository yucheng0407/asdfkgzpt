package net.ruixin.dao.wgff;
import java.util.Map;
import net.ruixin.util.paginate.FastPagination;
import net.ruixin.util.hibernate.IBaseDao;
import net.ruixin.domain.wgff.Sqmj;

/**
 * 网格队伍-社区民警信息Dao接口
 *
 * @author rxCoder on 2019-4-9 11:56:53
 */
public interface ISqmjDao extends IBaseDao<Sqmj> {

    /**
     * 查询网格队伍-社区民警信息分页列表
     *
     * @param map 查询条件
     * @return 模块分页信息
     */
    FastPagination getSqmjListPage(Map map);
}
