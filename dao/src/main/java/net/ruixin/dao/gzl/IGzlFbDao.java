package net.ruixin.dao.gzl;
import java.util.Map;
import net.ruixin.util.paginate.FastPagination;
import net.ruixin.util.hibernate.IBaseDao;
import net.ruixin.domain.gzl.GzlFb;

/**
 * 工作流发布Dao接口
 *
 * @author rxCoder on 2019-4-9 11:53:33
 */
public interface IGzlFbDao extends IBaseDao<GzlFb> {

    /**
     * 查询工作流发布分页列表
     *
     * @param map 查询条件
     * @return 模块分页信息
     */
    FastPagination getGzlFbListPage(Map map);
}
