package net.ruixin.dao.gzl;
import java.util.Map;
import net.ruixin.util.paginate.FastPagination;
import net.ruixin.util.hibernate.IBaseDao;
import net.ruixin.domain.gzl.HlwFb;

/**
 * 互联网-发布Dao接口
 *
 * @author rxCoder on 2019-4-9 11:54:20
 */
public interface IHlwFbDao extends IBaseDao<HlwFb> {

    /**
     * 查询互联网-发布分页列表
     *
     * @param map 查询条件
     * @return 模块分页信息
     */
    FastPagination getHlwFbListPage(Map map);
}
