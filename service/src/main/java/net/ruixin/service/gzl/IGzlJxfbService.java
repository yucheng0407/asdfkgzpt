package net.ruixin.service.gzl;

import net.ruixin.service.plat.common.IBaseService;
import net.ruixin.util.paginate.FastPagination;
import java.util.Map;
import net.ruixin.domain.gzl.GzlJxfb;
/**
 * 工作流-继续发布 Service接口
 *
 * @author rxCoder on 2019-4-9 11:55:38
 */
public interface IGzlJxfbService extends IBaseService {

    /**
     * 获取GzlJxfb分页列表
     *
     * @param map 查询条件
     * @return 分页信息
     */
    FastPagination getGzlJxfbListPage(Map map);
    /**
     * 保存工作流-继续发布
     *
     * @param gzlJxfb 工作流-继续发布
     */
    void saveGzlJxfb(GzlJxfb gzlJxfb);
}