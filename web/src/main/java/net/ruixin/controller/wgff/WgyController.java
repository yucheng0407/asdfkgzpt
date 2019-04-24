package net.ruixin.controller.wgff;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.stereotype.Controller;
import net.ruixin.controller.BaseController;
import net.ruixin.util.data.AjaxReturn;
import net.ruixin.util.resolver.FormModel;
import net.ruixin.util.resolver.SearchModel;
import java.util.Map;
import net.ruixin.domain.wgff.Wgy;
import net.ruixin.service.wgff.IWgyService;

/**
 * 网格员信息 Controller实现
 *
 * @author RXCoder on 2019-4-9 11:57:14
 */
@Controller
@RequestMapping("/wgff")
public class WgyController extends BaseController {

    @Autowired
    private IWgyService wgyService;

    /**
     * 获取Wgy分页列表
     *
     * @param map 查询条件
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping("/getWgyListPage")
    public AjaxReturn getWgyListPage(@SearchModel Object map) {
        return success().setData(wgyService.getWgyListPage((Map) map));
    }
    /**
     * 保存网格员信息
     *
     * @param wgy 网格员信息
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping("/saveWgy")
    public AjaxReturn saveWgy(@FormModel Wgy wgy) {
    wgyService.saveWgy(wgy);
        return success().setData(wgy.getId());
    }
    /**
     * 通过id获取网格员信息
     *
     * @param id wgyId
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping("/getWgyById")
    public AjaxReturn getWgyById(Long id) {
        return success().setData(wgyService.get(Wgy.class,id));
    }
    /**
     * 删除网格员信息
     *
     * @param id WgyId
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping("/delWgy")
    public AjaxReturn delWgy(Long id) {
    wgyService.delete(Wgy.class,id);
        return  success();
    }

}
