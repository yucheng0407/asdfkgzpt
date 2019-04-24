package net.ruixin.service.wgff;

import net.ruixin.service.plat.common.IBaseService;
import net.ruixin.util.paginate.FastPagination;
import java.util.Map;
import net.ruixin.domain.wgff.Wgy;
/**
 * 网格员信息 Service接口
 *
 * @author rxCoder on 2019-4-9 11:57:14
 */
public interface IWgyService extends IBaseService {

    /**
     * 获取Wgy分页列表
     *
     * @param map 查询条件
     * @return 分页信息
     */
    FastPagination getWgyListPage(Map map);
    /**
     * 保存网格员信息
     *
     * @param wgy 网格员信息
     */
    void saveWgy(Wgy wgy);
}