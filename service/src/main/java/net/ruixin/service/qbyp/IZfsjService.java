package net.ruixin.service.qbyp;

import net.ruixin.service.plat.common.IBaseService;
import net.ruixin.util.paginate.FastPagination;
import java.util.Map;
import net.ruixin.domain.qbyp.Zfsj;
/**
 * 重防区域-重防时间 Service接口
 *
 * @author rxCoder on 2019-4-9 11:50:39
 */
public interface IZfsjService extends IBaseService {

    /**
     * 获取Zfsj分页列表
     *
     * @param map 查询条件
     * @return 分页信息
     */
    FastPagination getZfsjListPage(Map map);
    /**
     * 保存重防区域-重防时间
     *
     * @param zfsj 重防区域-重防时间
     */
    void saveZfsj(Zfsj zfsj);
}