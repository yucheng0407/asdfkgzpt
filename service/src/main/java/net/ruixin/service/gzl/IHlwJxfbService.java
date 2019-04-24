package net.ruixin.service.gzl;

import net.ruixin.service.plat.common.IBaseService;
import net.ruixin.util.paginate.FastPagination;
import java.util.Map;
import net.ruixin.domain.gzl.HlwJxfb;
/**
 * 互联网-继续发布 Service接口
 *
 * @author rxCoder on 2019-4-9 11:55:07
 */
public interface IHlwJxfbService extends IBaseService {

    /**
     * 获取HlwJxfb分页列表
     *
     * @param map 查询条件
     * @return 分页信息
     */
    FastPagination getHlwJxfbListPage(Map map);
    /**
     * 保存互联网-继续发布
     *
     * @param hlwJxfb 互联网-继续发布
     */
    void saveHlwJxfb(HlwJxfb hlwJxfb);
}