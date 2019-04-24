package net.ruixin.controller.gzl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.stereotype.Controller;
import net.ruixin.controller.BaseController;
import net.ruixin.util.data.AjaxReturn;
import net.ruixin.util.resolver.FormModel;
import net.ruixin.util.resolver.SearchModel;
import java.util.Map;
import net.ruixin.domain.gzl.HlwFb;
import net.ruixin.service.gzl.IHlwFbService;

/**
 * 互联网-发布 Controller实现
 *
 * @author RXCoder on 2019-4-9 11:54:20
 */
@Controller
@RequestMapping("/gzl")
public class HlwFbController extends BaseController {

    @Autowired
    private IHlwFbService hlwFbService;

    /**
     * 获取HlwFb分页列表
     *
     * @param map 查询条件
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping("/getHlwFbListPage")
    public AjaxReturn getHlwFbListPage(@SearchModel Object map) {
        return success().setData(hlwFbService.getHlwFbListPage((Map) map));
    }
    /**
     * 保存互联网-发布
     *
     * @param hlwFb 互联网-发布
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping("/saveHlwFb")
    public AjaxReturn saveHlwFb(@FormModel HlwFb hlwFb) {
    hlwFbService.saveHlwFb(hlwFb);
        return success().setData(hlwFb.getId());
    }
    /**
     * 通过id获取互联网-发布
     *
     * @param id hlwFbId
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping("/getHlwFbById")
    public AjaxReturn getHlwFbById(Long id) {
        return success().setData(hlwFbService.get(HlwFb.class,id));
    }
    /**
     * 删除互联网-发布
     *
     * @param id HlwFbId
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping("/delHlwFb")
    public AjaxReturn delHlwFb(Long id) {
    hlwFbService.delete(HlwFb.class,id);
        return  success();
    }

}
