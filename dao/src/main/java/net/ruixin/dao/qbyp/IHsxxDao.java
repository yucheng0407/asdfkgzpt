package net.ruixin.dao.qbyp;
import java.util.Map;
import net.ruixin.util.paginate.FastPagination;
import net.ruixin.util.hibernate.IBaseDao;
import net.ruixin.domain.qbyp.Hsxx;

/**
 * 情报会商Dao接口
 *
 * @author rxCoder on 2019-4-9 11:56:20
 */
public interface IHsxxDao extends IBaseDao<Hsxx> {

    /**
     * 查询情报会商分页列表
     *
     * @param map 查询条件
     * @return 模块分页信息
     */
    FastPagination getHsxxListPage(Map map);
}
