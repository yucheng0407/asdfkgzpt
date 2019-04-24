package net.ruixin.service.gzl;

import net.ruixin.service.plat.common.IBaseService;
import net.ruixin.util.paginate.FastPagination;
import java.util.Map;
import net.ruixin.domain.gzl.HlwJs;
/**
 * 互联网-接收 Service接口
 *
 * @author rxCoder on 2019-4-9 11:54:53
 */
public interface IHlwJsService extends IBaseService {

    /**
     * 获取HlwJs分页列表
     *
     * @param map 查询条件
     * @return 分页信息
     */
    FastPagination getHlwJsListPage(Map map);
    /**
     * 保存互联网-接收
     *
     * @param hlwJs 互联网-接收
     */
    void saveHlwJs(HlwJs hlwJs);
}