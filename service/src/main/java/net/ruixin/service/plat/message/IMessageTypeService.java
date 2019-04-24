package net.ruixin.service.plat.message;

import net.ruixin.service.plat.common.IBaseService;
import net.ruixin.util.paginate.FastPagination;

import java.util.List;
import java.util.Map;

/**
 * @author Pitcher
 */
public interface IMessageTypeService extends IBaseService {

    /**
     * 获取消息类型分页
     *
     * @param map 搜索参数
     * @return 消息类型分页
     */
    FastPagination getMessageTypePage(Map map);

    /**
     * 获取消息类型List
     *
     * @return 消息类型List
     */
    List getMessageTypeList();


}
