package net.ruixin.service.gzl;

import net.ruixin.service.plat.common.IBaseService;
import net.ruixin.util.paginate.FastPagination;
import java.util.Map;
import net.ruixin.domain.gzl.GzlJs;
/**
 * 工作流-接收 Service接口
 *
 * @author rxCoder on 2019-4-9 11:55:22
 */
public interface IGzlJsService extends IBaseService {

    /**
     * 获取GzlJs分页列表
     *
     * @param map 查询条件
     * @return 分页信息
     */
    FastPagination getGzlJsListPage(Map map);
    /**
     * 保存工作流-接收
     *
     * @param gzlJs 工作流-接收
     */
    void saveGzlJs(GzlJs gzlJs);
}