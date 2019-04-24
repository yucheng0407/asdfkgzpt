package net.ruixin.service.jmfk;

import net.ruixin.service.plat.common.IBaseService;
import net.ruixin.util.paginate.FastPagination;
import java.util.Map;
import net.ruixin.domain.jmfk.SbGlb;
/**
 * 防控安排_设备_关联表 Service接口
 *
 * @author rxCoder on 2019-4-9 11:52:23
 */
public interface ISbGlbService extends IBaseService {

    /**
     * 获取SbGlb分页列表
     *
     * @param map 查询条件
     * @return 分页信息
     */
    FastPagination getSbGlbListPage(Map map);
    /**
     * 保存防控安排_设备_关联表
     *
     * @param sbGlb 防控安排_设备_关联表
     */
    void saveSbGlb(SbGlb sbGlb);
}