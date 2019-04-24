package net.ruixin.dao.jmfk;
import java.util.Map;
import net.ruixin.util.paginate.FastPagination;
import net.ruixin.util.hibernate.IBaseDao;
import net.ruixin.domain.jmfk.SbGlb;

/**
 * 防控安排_设备_关联表Dao接口
 *
 * @author rxCoder on 2019-4-9 11:52:23
 */
public interface ISbGlbDao extends IBaseDao<SbGlb> {

    /**
     * 查询防控安排_设备_关联表分页列表
     *
     * @param map 查询条件
     * @return 模块分页信息
     */
    FastPagination getSbGlbListPage(Map map);
}
