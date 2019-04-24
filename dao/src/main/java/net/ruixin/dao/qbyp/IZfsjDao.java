package net.ruixin.dao.qbyp;
import java.util.Map;
import net.ruixin.util.paginate.FastPagination;
import net.ruixin.util.hibernate.IBaseDao;
import net.ruixin.domain.qbyp.Zfsj;

/**
 * 重防区域-重防时间Dao接口
 *
 * @author rxCoder on 2019-4-9 11:50:39
 */
public interface IZfsjDao extends IBaseDao<Zfsj> {

    /**
     * 查询重防区域-重防时间分页列表
     *
     * @param map 查询条件
     * @return 模块分页信息
     */
    FastPagination getZfsjListPage(Map map);
}
