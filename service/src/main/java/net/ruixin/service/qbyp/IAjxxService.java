package net.ruixin.service.qbyp;

import net.ruixin.service.plat.common.IBaseService;
import net.ruixin.util.paginate.FastPagination;
import java.util.Map;
import net.ruixin.domain.qbyp.Ajxx;
/**
 * 案件信息 Service接口
 *
 * @author rxCoder on 2019-4-9 11:47:54
 */
public interface IAjxxService extends IBaseService {

    /**
     * 获取Ajxx分页列表
     *
     * @param map 查询条件
     * @return 分页信息
     */
    FastPagination getAjxxListPage(Map map);
    /**
     * 保存案件信息
     *
     * @param ajxx 案件信息
     */
    void saveAjxx(Ajxx ajxx);
}