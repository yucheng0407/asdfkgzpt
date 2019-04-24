package net.ruixin.dao.plat.message;

import net.ruixin.util.paginate.FastPagination;

import java.util.List;
import java.util.Map;

/**
 * @author Pitcher
 */
public interface IMessageDao {
    /**
     * 消息变成已读状态
     *
     * @param messageId 消息id
     * @param userId    用户
     */
    void readMessage(Long messageId, Long userId);

    /**
     * 获取消息分页列表
     *
     * @param map
     * @return 分页信息
     */
    FastPagination getMessagePage(Map map);

    /**
     * 获取消息列表前六条
     *
     * @param userId
     * @return
     */
    List<Map<String, Object>> getMessageList(Long userId);

//    /**
//     * 通过id获取消息的内容
//     *
//     * @param userId
//     * @param msgId
//     * @return
//     */
//    List<Map<String, Object>> getMessageViewById(Long userId, Long msgId);
}
