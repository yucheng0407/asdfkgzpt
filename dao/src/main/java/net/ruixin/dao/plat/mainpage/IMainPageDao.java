package net.ruixin.dao.plat.mainpage;

import java.util.List;
import java.util.Map;

/**
 * 操作日志DAO接口
 */
public interface IMainPageDao {
    /**
     * 获取代办任务
     * @param userId 用户id
     * @return
     */
    List<Map<String, Object>> getDbrwList(Long userId);
}
