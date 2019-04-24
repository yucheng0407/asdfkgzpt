package net.ruixin.service.plat.mainpage;

import net.ruixin.service.plat.common.IBaseService;

import java.util.List;
import java.util.Map;


/**
 * @author Pitcher
 */
public interface IMainPageService extends IBaseService {

    /**
     * 获取代办任务
     * @param userId 用户id
     * @return
     */
    List<Map<String, Object>> getDbrwList(Long userId);
}
