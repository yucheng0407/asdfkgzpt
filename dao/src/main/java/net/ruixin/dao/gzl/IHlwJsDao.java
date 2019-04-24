package net.ruixin.dao.gzl;
import java.util.Map;
import net.ruixin.util.paginate.FastPagination;
import net.ruixin.util.hibernate.IBaseDao;
import net.ruixin.domain.gzl.HlwJs;

/**
 * 互联网-接收Dao接口
 *
 * @author rxCoder on 2019-4-9 11:54:53
 */
public interface IHlwJsDao extends IBaseDao<HlwJs> {

    /**
     * 查询互联网-接收分页列表
     *
     * @param map 查询条件
     * @return 模块分页信息
     */
    FastPagination getHlwJsListPage(Map map);
}
