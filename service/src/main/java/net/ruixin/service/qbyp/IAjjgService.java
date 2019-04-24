package net.ruixin.service.qbyp;

import net.ruixin.service.plat.common.IBaseService;
import net.ruixin.util.paginate.FastPagination;
import java.util.Map;
import net.ruixin.domain.qbyp.Ajjg;
/**
 * 案件加工 Service接口
 *
 * @author rxCoder on 2019-4-9 11:47:16
 */
public interface IAjjgService extends IBaseService {

    /**
     * 获取Ajjg分页列表
     *
     * @param map 查询条件
     * @return 分页信息
     */
    FastPagination getAjjgListPage(Map map);
    /**
     * 保存案件加工
     *
     * @param ajjg 案件加工
     */
    void saveAjjg(Ajjg ajjg);
}