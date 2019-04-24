package net.ruixin.dao.gzl;
import java.util.Map;
import net.ruixin.util.paginate.FastPagination;
import net.ruixin.util.hibernate.IBaseDao;
import net.ruixin.domain.gzl.GzlFk;

/**
 * 工作流反馈Dao接口
 *
 * @author rxCoder on 2019-4-9 11:54:03
 */
public interface IGzlFkDao extends IBaseDao<GzlFk> {

    /**
     * 查询工作流反馈分页列表
     *
     * @param map 查询条件
     * @return 模块分页信息
     */
    FastPagination getGzlFkListPage(Map map);
}
