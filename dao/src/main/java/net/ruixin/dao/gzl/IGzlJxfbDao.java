package net.ruixin.dao.gzl;
import java.util.Map;
import net.ruixin.util.paginate.FastPagination;
import net.ruixin.util.hibernate.IBaseDao;
import net.ruixin.domain.gzl.GzlJxfb;

/**
 * 工作流-继续发布Dao接口
 *
 * @author rxCoder on 2019-4-9 11:55:38
 */
public interface IGzlJxfbDao extends IBaseDao<GzlJxfb> {

    /**
     * 查询工作流-继续发布分页列表
     *
     * @param map 查询条件
     * @return 模块分页信息
     */
    FastPagination getGzlJxfbListPage(Map map);
}
