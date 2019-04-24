package net.ruixin.controller.gzl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.stereotype.Controller;
import net.ruixin.controller.BaseController;
import net.ruixin.util.data.AjaxReturn;
import net.ruixin.util.resolver.FormModel;
import net.ruixin.util.resolver.SearchModel;
import java.util.Map;
import net.ruixin.domain.gzl.GzlJs;
import net.ruixin.service.gzl.IGzlJsService;

/**
 * 工作流-接收 Controller实现
 *
 * @author RXCoder on 2019-4-9 11:55:22
 */
@Controller
@RequestMapping("/gzl")
public class GzlJsController extends BaseController {

    @Autowired
    private IGzlJsService gzlJsService;

    /**
     * 获取GzlJs分页列表
     *
     * @param map 查询条件
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping("/getGzlJsListPage")
    public AjaxReturn getGzlJsListPage(@SearchModel Object map) {
        return success().setData(gzlJsService.getGzlJsListPage((Map) map));
    }
    /**
     * 保存工作流-接收
     *
     * @param gzlJs 工作流-接收
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping("/saveGzlJs")
    public AjaxReturn saveGzlJs(@FormModel GzlJs gzlJs) {
    gzlJsService.saveGzlJs(gzlJs);
        return success().setData(gzlJs.getId());
    }
    /**
     * 通过id获取工作流-接收
     *
     * @param id gzlJsId
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping("/getGzlJsById")
    public AjaxReturn getGzlJsById(Long id) {
        return success().setData(gzlJsService.get(GzlJs.class,id));
    }
    /**
     * 删除工作流-接收
     *
     * @param id GzlJsId
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping("/delGzlJs")
    public AjaxReturn delGzlJs(Long id) {
    gzlJsService.delete(GzlJs.class,id);
        return  success();
    }

}
