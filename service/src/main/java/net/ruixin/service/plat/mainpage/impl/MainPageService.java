package net.ruixin.service.plat.mainpage.impl;

import net.ruixin.dao.plat.mainpage.IMainPageDao;
import net.ruixin.service.plat.common.BaseService;
import net.ruixin.service.plat.mainpage.IMainPageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;


@Service
public class MainPageService extends BaseService implements IMainPageService {


    @Autowired
    private IMainPageDao mainPageDao;


    /**
     * 转化为消息列表显示的数据结构
     *
     * @param dataList 数据
     * @param name     显示字段
     * @param time     显示的time字段
     * @return
     */
    private void turnIntoDbrw(List<Map<String, Object>> dataList, String name, String time) {
        for (Map<String, Object> map : dataList) {
            map.put("name", map.get(name));
            map.put("time", map.get(time));
        }
    }

    @Override
    public List<Map<String, Object>> getDbrwList(Long userId) {
        List<Map<String, Object>> arr = mainPageDao.getDbrwList(userId);
        turnIntoDbrw(arr, "WORKFLOW_NAME", "CJSJ");
        return arr;
    }
}
