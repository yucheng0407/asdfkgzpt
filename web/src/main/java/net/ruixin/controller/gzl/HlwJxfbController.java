package net.ruixin.controller.gzl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.stereotype.Controller;
import net.ruixin.controller.BaseController;
import net.ruixin.util.data.AjaxReturn;
import net.ruixin.util.resolver.FormModel;
import net.ruixin.util.resolver.SearchModel;
import java.util.Map;
import net.ruixin.domain.gzl.HlwJxfb;
import net.ruixin.service.gzl.IHlwJxfbService;

/**
 * 互联网-继续发布 Controller实现
 *
 * @author RXCoder on 2019-4-9 11:55:07
 */
@Controller
@RequestMapping("/gzl")
public class HlwJxfbController extends BaseController {

    @Autowired
    private IHlwJxfbService hlwJxfbService;

    /**
     * 获取HlwJxfb分页列表
     *
     * @param map 查询条件
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping("/getHlwJxfbListPage")
    public AjaxReturn getHlwJxfbListPage(@SearchModel Object map) {
        return success().setData(hlwJxfbService.getHlwJxfbListPage((Map) map));
    }
    /**
     * 保存互联网-继续发布
     *
     * @param hlwJxfb 互联网-继续发布
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping("/saveHlwJxfb")
    public AjaxReturn saveHlwJxfb(@FormModel HlwJxfb hlwJxfb) {
    hlwJxfbService.saveHlwJxfb(hlwJxfb);
        return success().setData(hlwJxfb.getId());
    }
    /**
     * 通过id获取互联网-继续发布
     *
     * @param id hlwJxfbId
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping("/getHlwJxfbById")
    public AjaxReturn getHlwJxfbById(Long id) {
        return success().setData(hlwJxfbService.get(HlwJxfb.class,id));
    }
    /**
     * 删除互联网-继续发布
     *
     * @param id HlwJxfbId
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping("/delHlwJxfb")
    public AjaxReturn delHlwJxfb(Long id) {
    hlwJxfbService.delete(HlwJxfb.class,id);
        return  success();
    }

}
