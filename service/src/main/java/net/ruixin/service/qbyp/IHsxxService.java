package net.ruixin.service.qbyp;

import net.ruixin.service.plat.common.IBaseService;
import net.ruixin.util.paginate.FastPagination;
import java.util.Map;
import net.ruixin.domain.qbyp.Hsxx;
/**
 * 情报会商 Service接口
 *
 * @author rxCoder on 2019-4-9 11:56:20
 */
public interface IHsxxService extends IBaseService {

    /**
     * 获取Hsxx分页列表
     *
     * @param map 查询条件
     * @return 分页信息
     */
    FastPagination getHsxxListPage(Map map);
    /**
     * 保存情报会商
     *
     * @param hsxx 情报会商
     */
    void saveHsxx(Hsxx hsxx);
}