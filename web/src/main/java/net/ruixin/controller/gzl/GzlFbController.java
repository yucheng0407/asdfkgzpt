package net.ruixin.controller.gzl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.stereotype.Controller;
import net.ruixin.controller.BaseController;
import net.ruixin.util.data.AjaxReturn;
import net.ruixin.util.resolver.FormModel;
import net.ruixin.util.resolver.SearchModel;

import java.util.Map;

import net.ruixin.domain.gzl.GzlFb;
import net.ruixin.service.gzl.IGzlFbService;

/**
 * 工作流发布 Controller实现
 *
 * @author RXCoder on 2019-4-9 11:53:33
 */
@Controller
@RequestMapping("/gzl")
public class GzlFbController extends BaseController {

    @Autowired
    private IGzlFbService gzlFbService;

    /**
     * 获取GzlFb分页列表
     *
     * @param map 查询条件
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping("/getGzlFbListPage")
    public AjaxReturn getGzlFbListPage(@SearchModel Object map) {
        return success().setData(gzlFbService.getGzlFbListPage((Map) map));
    }

    /**
     * 保存工作流发布
     *
     * @param gzlFb 工作流发布
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping("/saveGzlFb")
    public AjaxReturn saveGzlFb(@FormModel GzlFb gzlFb) {
        gzlFbService.saveGzlFb(gzlFb);
        return success().setData(gzlFb.getId());
    }

    /**
     * 通过id获取工作流发布
     *
     * @param id gzlFbId
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping("/getGzlFbById")
    public AjaxReturn getGzlFbById(Long id) {
        return success().setData(gzlFbService.get(GzlFb.class, id));
    }

    /**
     * 删除工作流发布
     *
     * @param id GzlFbId
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping("/delGzlFb")
    public AjaxReturn delGzlFb(Long id) {
        gzlFbService.delete(GzlFb.class, id);
        return success();
    }

}
