package net.ruixin.controller.plat.main;

import net.ruixin.controller.BaseController;
import net.ruixin.service.plat.mainpage.IMainPageService;
import net.ruixin.util.data.AjaxReturn;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * mianPage用于首页测试
 */
@Controller
@RequestMapping("/mainPage")
public class MainPageHandler extends BaseController {
    @Autowired
    private IMainPageService mainPageService;

    @RequestMapping("/getDbrw")
    @ResponseBody
    public AjaxReturn getDbrwList() {
        return success().setData(mainPageService.getDbrwList(getCurrentUserId()));
    }

    @RequestMapping("/getImageRes")
    @ResponseBody
    public AjaxReturn getImageRes() {
        List<Map<String, Object>> list = new ArrayList<>();
        Map<String, Object> map;
//     //     {name: "待回访", icon: "&#xe70a;", num: "18"},
//     //     {name: "退回案件", icon: "&#xe629;", num: "16"},
//     //     {name: "待审核", icon: "&#xe60b;", num: "991"},
//     //     {name: "治安检查", icon: "&#xe621;", num: "99"},
//     //     {name: "监督考察", icon: "&#xe61d;", num: "99"},
//     //     {name: "地址房屋", icon: "&#xe62b;", num: "99"},
//     //     {name: "人口信息", icon: "&#xe638;", num: "99"},
//     //     {name: "地址房屋", icon: "&#xe627;", num: "100"},
//     //     {name: "人口信息", icon: "&#xe636;"}];
        map = new HashMap<>();
        map.put("name", "待回访");
        map.put("icon", "&#xe70a;");
        map.put("num", 18);
        list.add(map);
        map = new HashMap<>();
        map.put("name", "退回案件");
        map.put("icon", "&#xe629;");
        map.put("num", 100);
        list.add(map);
        map = new HashMap<>();
        map.put("name", "待审核");
        map.put("icon", "&#xe60b;");
        map.put("num", 991);
        list.add(map);
        map = new HashMap<>();
        map.put("name", "治安检查");
        map.put("icon", "&#xe621;");
        map.put("num", 0);
        list.add(map);
        map = new HashMap<>();
        map.put("name", "监督考察");
        map.put("icon", "&#xe61d;");
        map.put("num", 10);
        list.add(map);
        map = new HashMap<>();
        map.put("name", "地址房屋");
        map.put("icon", "&#xe62b;");
        map.put("num", 20);
        list.add(map);
        return success().setData(list);
    }

}

