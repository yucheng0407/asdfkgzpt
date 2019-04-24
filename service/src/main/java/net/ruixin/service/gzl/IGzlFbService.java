package net.ruixin.service.gzl;

import net.ruixin.service.plat.common.IBaseService;
import net.ruixin.util.paginate.FastPagination;
import java.util.Map;
import net.ruixin.domain.gzl.GzlFb;
/**
 * 工作流发布 Service接口
 *
 * @author rxCoder on 2019-4-9 11:53:33
 */
public interface IGzlFbService extends IBaseService {

    /**
     * 获取GzlFb分页列表
     *
     * @param map 查询条件
     * @return 分页信息
     */
    FastPagination getGzlFbListPage(Map map);
    /**
     * 保存工作流发布
     *
     * @param gzlFb 工作流发布
     */
    void saveGzlFb(GzlFb gzlFb);
}