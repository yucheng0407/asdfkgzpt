package net.ruixin.dao.qbyp;
import java.util.Map;
import net.ruixin.util.paginate.FastPagination;
import net.ruixin.util.hibernate.IBaseDao;
import net.ruixin.domain.qbyp.Ajxx;

/**
 * 案件信息Dao接口
 *
 * @author rxCoder on 2019-4-9 11:47:55
 */
public interface IAjxxDao extends IBaseDao<Ajxx> {

    /**
     * 查询案件信息分页列表
     *
     * @param map 查询条件
     * @return 模块分页信息
     */
    FastPagination getAjxxListPage(Map map);
}
