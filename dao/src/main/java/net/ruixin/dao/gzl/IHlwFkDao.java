package net.ruixin.dao.gzl;
import java.util.Map;
import net.ruixin.util.paginate.FastPagination;
import net.ruixin.util.hibernate.IBaseDao;
import net.ruixin.domain.gzl.HlwFk;

/**
 * 互联网-反馈Dao接口
 *
 * @author rxCoder on 2019-4-9 11:54:43
 */
public interface IHlwFkDao extends IBaseDao<HlwFk> {

    /**
     * 查询互联网-反馈分页列表
     *
     * @param map 查询条件
     * @return 模块分页信息
     */
    FastPagination getHlwFkListPage(Map map);
}
