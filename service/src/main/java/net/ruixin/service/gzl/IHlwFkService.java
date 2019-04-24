package net.ruixin.service.gzl;

import net.ruixin.service.plat.common.IBaseService;
import net.ruixin.util.paginate.FastPagination;
import java.util.Map;
import net.ruixin.domain.gzl.HlwFk;
/**
 * 互联网-反馈 Service接口
 *
 * @author rxCoder on 2019-4-9 11:54:43
 */
public interface IHlwFkService extends IBaseService {

    /**
     * 获取HlwFk分页列表
     *
     * @param map 查询条件
     * @return 分页信息
     */
    FastPagination getHlwFkListPage(Map map);
    /**
     * 保存互联网-反馈
     *
     * @param hlwFk 互联网-反馈
     */
    void saveHlwFk(HlwFk hlwFk);
}