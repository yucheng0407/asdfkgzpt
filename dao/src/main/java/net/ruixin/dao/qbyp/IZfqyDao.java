package net.ruixin.dao.qbyp;
import java.util.Map;
import net.ruixin.util.paginate.FastPagination;
import net.ruixin.util.hibernate.IBaseDao;
import net.ruixin.domain.qbyp.Zfqy;

/**
 * 重防区域Dao接口
 *
 * @author rxCoder on 2019-4-9 11:50:14
 */
public interface IZfqyDao extends IBaseDao<Zfqy> {

    /**
     * 查询重防区域分页列表
     *
     * @param map 查询条件
     * @return 模块分页信息
     */
    FastPagination getZfqyListPage(Map map);
}
