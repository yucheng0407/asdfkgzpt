package net.ruixin.dao.gzl;

import net.ruixin.domain.gzl.GzlFb;
import net.ruixin.domain.gzl.GzlFk;
import net.ruixin.util.hibernate.IBaseDao;
import net.ruixin.util.paginate.FastPagination;

import java.util.List;
import java.util.Map;

/**
 * 工作流Dao接口
 *
 * @author czq 2019-4-11 17:28:25
 */
public interface IGzlDao extends IBaseDao {

    /**
     * 查询工作流分页列表
     *
     * @param map 查询条件
     * @return 模块分页信息
     */
    FastPagination getAppGzlListPage(Map map);

    /**
     * 依据gzlfb主键获取最新的GzlFk
     *
     * @param fbId
     * @return
     */
    Map getLastGzlFk(String fbId);

    /**
     * 依据fbid获取所有的反馈
     *
     * @param fbId
     * @return
     */
    List getChattingMessages(Long fbId);

    /**
     * 依据jsId获取第一条与接收人有关的反馈信息
     *
     * @param jsId
     * @return
     */
    Map getFirstFeedBack(Long jsId);

    /**
     * 依据jsId和fkId获取除了第一条与接收人有关的反馈信息的反馈信息
     *
     * @param jsId
     * @param fkId
     * @return
     */
    List getFeedBacks(Long jsId, Long fkId);
}
