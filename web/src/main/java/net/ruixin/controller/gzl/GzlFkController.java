package net.ruixin.controller.gzl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.stereotype.Controller;
import net.ruixin.controller.BaseController;
import net.ruixin.util.data.AjaxReturn;
import net.ruixin.util.resolver.FormModel;
import net.ruixin.util.resolver.SearchModel;
import java.util.Map;
import net.ruixin.domain.gzl.GzlFk;
import net.ruixin.service.gzl.IGzlFkService;

/**
 * 工作流反馈 Controller实现
 *
 * @author RXCoder on 2019-4-9 11:54:03
 */
@Controller
@RequestMapping("/gzl")
public class GzlFkController extends BaseController {

    @Autowired
    private IGzlFkService gzlFkService;

    /**
     * 获取GzlFk分页列表
     *
     * @param map 查询条件
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping("/getGzlFkListPage")
    public AjaxReturn getGzlFkListPage(@SearchModel Object map) {
        return success().setData(gzlFkService.getGzlFkListPage((Map) map));
    }
    /**
     * 保存工作流反馈
     *
     * @param gzlFk 工作流反馈
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping("/saveGzlFk")
    public AjaxReturn saveGzlFk(@FormModel GzlFk gzlFk) {
    gzlFkService.saveGzlFk(gzlFk);
        return success().setData(gzlFk.getId());
    }
    /**
     * 通过id获取工作流反馈
     *
     * @param id gzlFkId
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping("/getGzlFkById")
    public AjaxReturn getGzlFkById(Long id) {
        return success().setData(gzlFkService.get(GzlFk.class,id));
    }
    /**
     * 删除工作流反馈
     *
     * @param id GzlFkId
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping("/delGzlFk")
    public AjaxReturn delGzlFk(Long id) {
    gzlFkService.delete(GzlFk.class,id);
        return  success();
    }

}
