package net.ruixin.service.qbyp;

import net.ruixin.service.plat.common.IBaseService;
import net.ruixin.util.paginate.FastPagination;
import java.util.Map;
import net.ruixin.domain.qbyp.Xqb;
/**
 * 巡区表 Service接口
 *
 * @author rxCoder on 2019-4-9 11:49:31
 */
public interface IXqbService extends IBaseService {

    /**
     * 获取Xqb分页列表
     *
     * @param map 查询条件
     * @return 分页信息
     */
    FastPagination getXqbListPage(Map map);
    /**
     * 保存巡区表
     *
     * @param xqb 巡区表
     */
    void saveXqb(Xqb xqb);
}