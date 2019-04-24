package net.ruixin.service.qzld;

import net.ruixin.domain.qzld.FkzlSend;
import net.ruixin.util.paginate.FastPagination;

import javax.validation.constraints.Max;
import java.util.List;
import java.util.Map;

public interface IFkzlService {

    /***
     * 防控指令-反馈列表页面
     * @param map
     * @return FastPagination
     * */
    FastPagination getFkzlFkList(Map map);

    /**
     * 设置信息已读
     *
     * @param fbid  工作流-发布的主键ID
     * @param jsid  工作流-接收表的主键ID
     * @param sfkhf 是否可回复 0-不可回复，读互联网端数据；1-可回复，读公安网端数据
     * @return
     */
    void setRead(String fbid, String jsid, String sfkhf);

    /**
     * 获取反馈详细信息
     *
     * @param fbid  工作流-发布的主键ID
     * @param sfkhf 是否可回复 0-不可回复，读互联网端数据；1-可回复，读公安网端数据
     * @return
     */
    List<Map<String, Object>> getFkzlFkDetail(Long fbid, String sfkhf);

    /**
     * 指令发送
     * @param fkzlSend
     * @return
     */
    boolean sendFkzl(FkzlSend fkzlSend);

    List getXzqh();
}
