package net.ruixin.controller.gzl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.stereotype.Controller;
import net.ruixin.controller.BaseController;
import net.ruixin.util.data.AjaxReturn;
import net.ruixin.util.resolver.FormModel;
import net.ruixin.util.resolver.SearchModel;
import java.util.Map;
import net.ruixin.domain.gzl.GzlJxfb;
import net.ruixin.service.gzl.IGzlJxfbService;

/**
 * 工作流-继续发布 Controller实现
 *
 * @author RXCoder on 2019-4-9 11:55:38
 */
@Controller
@RequestMapping("/gzl")
public class GzlJxfbController extends BaseController {

    @Autowired
    private IGzlJxfbService gzlJxfbService;

    /**
     * 获取GzlJxfb分页列表
     *
     * @param map 查询条件
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping("/getGzlJxfbListPage")
    public AjaxReturn getGzlJxfbListPage(@SearchModel Object map) {
        return success().setData(gzlJxfbService.getGzlJxfbListPage((Map) map));
    }
    /**
     * 保存工作流-继续发布
     *
     * @param gzlJxfb 工作流-继续发布
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping("/saveGzlJxfb")
    public AjaxReturn saveGzlJxfb(@FormModel GzlJxfb gzlJxfb) {
    gzlJxfbService.saveGzlJxfb(gzlJxfb);
        return success().setData(gzlJxfb.getId());
    }
    /**
     * 通过id获取工作流-继续发布
     *
     * @param id gzlJxfbId
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping("/getGzlJxfbById")
    public AjaxReturn getGzlJxfbById(Long id) {
        return success().setData(gzlJxfbService.get(GzlJxfb.class,id));
    }
    /**
     * 删除工作流-继续发布
     *
     * @param id GzlJxfbId
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping("/delGzlJxfb")
    public AjaxReturn delGzlJxfb(Long id) {
    gzlJxfbService.delete(GzlJxfb.class,id);
        return  success();
    }

}
