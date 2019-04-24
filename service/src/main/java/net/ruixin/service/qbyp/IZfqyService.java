package net.ruixin.service.qbyp;

import net.ruixin.service.plat.common.IBaseService;
import net.ruixin.util.paginate.FastPagination;
import java.util.Map;
import net.ruixin.domain.qbyp.Zfqy;
/**
 * 重防区域 Service接口
 *
 * @author rxCoder on 2019-4-9 11:50:14
 */
public interface IZfqyService extends IBaseService {

    /**
     * 获取Zfqy分页列表
     *
     * @param map 查询条件
     * @return 分页信息
     */
    FastPagination getZfqyListPage(Map map);
    /**
     * 保存重防区域
     *
     * @param zfqy 重防区域
     */
    void saveZfqy(Zfqy zfqy);
}