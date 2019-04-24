package net.ruixin.service.gzl;

import net.ruixin.service.plat.common.IBaseService;
import net.ruixin.util.paginate.FastPagination;
import java.util.Map;
import net.ruixin.domain.gzl.HlwFb;
/**
 * 互联网-发布 Service接口
 *
 * @author rxCoder on 2019-4-9 11:54:20
 */
public interface IHlwFbService extends IBaseService {

    /**
     * 获取HlwFb分页列表
     *
     * @param map 查询条件
     * @return 分页信息
     */
    FastPagination getHlwFbListPage(Map map);
    /**
     * 保存互联网-发布
     *
     * @param hlwFb 互联网-发布
     */
    void saveHlwFb(HlwFb hlwFb);
}