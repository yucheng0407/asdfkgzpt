package net.ruixin.service.plat.message;

import net.ruixin.service.plat.common.IBaseService;
import net.ruixin.util.paginate.FastPagination;

import java.util.List;
import java.util.Map;

/**
 * @author Pitcher
 */
public interface IMessageService extends IBaseService {


    /**
     * 生成消息接口
     *
     * @param userIds  用户id逗号拼接
     * @param typeCode 消息类型CODE
     * @param title    标题
     * @param content  内容
     * @param source   来源
     * @param param    参数
     * @return 消息id
     */
    Long generateMessage(String userIds, String typeCode, String title, String content, Long source, String param);

    /**
     * 生成消息，消息来源默认当前登录人
     *
     * @param userIds  用户id逗号拼接
     * @param typeCode 消息类型CODE
     * @param title    标题
     * @param content  内容
     * @param param    参数
     * @return 消息id
     */
    Long generateMessage(String userIds, String typeCode, String title, String content, String param);

    /**
     * 阅读消息，将消状态变成已读
     *
     * @param messageId 消息id
     */
    void readMessage(Long messageId);

    /**
     * 获取当前登录人的消息;
     *
     * @param map 参数map
     * @return 分页信息
     */
    FastPagination getMessagePage(Map<String, Object> map);

    /**
     * 获取6条最新未读消息列表
     *
     * @return 消息列表
     */
    List<Map<String, Object>> getMessageList();

//    List<Map<String, Object>> getMessageViewById(Long messageId);
}
