package net.ruixin.dao.qbyp;
import java.util.Map;
import net.ruixin.util.paginate.FastPagination;
import net.ruixin.util.hibernate.IBaseDao;
import net.ruixin.domain.qbyp.Ajjg;

/**
 * 案件加工Dao接口
 *
 * @author rxCoder on 2019-4-9 11:47:16
 */
public interface IAjjgDao extends IBaseDao<Ajjg> {

    /**
     * 查询案件加工分页列表
     *
     * @param map 查询条件
     * @return 模块分页信息
     */
    FastPagination getAjjgListPage(Map map);
}
