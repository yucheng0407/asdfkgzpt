package net.ruixin.service.wgff;

import net.ruixin.service.plat.common.IBaseService;
import net.ruixin.util.paginate.FastPagination;
import java.util.Map;
import net.ruixin.domain.wgff.Sqmj;
/**
 * 网格队伍-社区民警信息 Service接口
 *
 * @author rxCoder on 2019-4-9 11:56:53
 */
public interface ISqmjService extends IBaseService {

    /**
     * 获取Sqmj分页列表
     *
     * @param map 查询条件
     * @return 分页信息
     */
    FastPagination getSqmjListPage(Map map);
    /**
     * 保存网格队伍-社区民警信息
     *
     * @param sqmj 网格队伍-社区民警信息
     */
    void saveSqmj(Sqmj sqmj);
}