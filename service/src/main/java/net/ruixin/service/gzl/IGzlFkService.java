package net.ruixin.service.gzl;

import net.ruixin.service.plat.common.IBaseService;
import net.ruixin.util.paginate.FastPagination;
import java.util.Map;
import net.ruixin.domain.gzl.GzlFk;
/**
 * 工作流反馈 Service接口
 *
 * @author rxCoder on 2019-4-9 11:54:03
 */
public interface IGzlFkService extends IBaseService {

    /**
     * 获取GzlFk分页列表
     *
     * @param map 查询条件
     * @return 分页信息
     */
    FastPagination getGzlFkListPage(Map map);
    /**
     * 保存工作流反馈
     *
     * @param gzlFk 工作流反馈
     */
    void saveGzlFk(GzlFk gzlFk);
}