package net.ruixin.dao.gzl;
import java.util.Map;
import net.ruixin.util.paginate.FastPagination;
import net.ruixin.util.hibernate.IBaseDao;
import net.ruixin.domain.gzl.GzlJs;

/**
 * 工作流-接收Dao接口
 *
 * @author rxCoder on 2019-4-9 11:55:22
 */
public interface IGzlJsDao extends IBaseDao<GzlJs> {

    /**
     * 查询工作流-接收分页列表
     *
     * @param map 查询条件
     * @return 模块分页信息
     */
    FastPagination getGzlJsListPage(Map map);
}
