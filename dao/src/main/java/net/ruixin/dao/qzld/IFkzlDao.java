package net.ruixin.dao.qzld;

import net.ruixin.domain.gzl.GzlFk;
import net.ruixin.util.hibernate.IBaseDao;
import net.ruixin.util.paginate.FastPagination;

import java.util.List;
import java.util.Map;

public interface IFkzlDao extends IBaseDao<GzlFk> {

    /***
     * 防控指令-反馈列表页面
     * @param map
     * @return FastPagination
     * */
    FastPagination getFkzlFkList(Map map);

    /**
     * 更新互联网数据同步回公安网后阅读状态
     *
     * @param fbid 工作流-发布表的主键ID
     * @return
     */
    void insertGzlHlwYdzt(Long fbid);

    /**
     * 设置公安网信息已读
     *
     * @param jsid 工作流-接收表的主键ID
     */
    void setGzlYdzt(Long jsid);

    /**
     * 获取反馈详细信息
     *
     * @param fbid  工作流-发布的主键ID
     * @param sfkhf 是否可回复 0-不可回复，读互联网端数据；1-可回复，读公安网端数据
     * @return
     */
    List<Map<String, Object>> getFkzlFkDetail(Long fbid, String sfkhf);

    List getXzqh();

}
