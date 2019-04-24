package net.ruixin.controller.qbyp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.stereotype.Controller;
import net.ruixin.controller.BaseController;
import net.ruixin.util.data.AjaxReturn;
import net.ruixin.util.resolver.FormModel;
import net.ruixin.util.resolver.SearchModel;
import java.util.Map;
import net.ruixin.domain.qbyp.Xqb;
import net.ruixin.service.qbyp.IXqbService;

/**
 * 巡区表 Controller实现
 *
 * @author RXCoder on 2019-4-9 11:49:31
 */
@Controller
@RequestMapping("/qbyp")
public class XqbController extends BaseController {

    @Autowired
    private IXqbService xqbService;

    /**
     * 获取Xqb分页列表
     *
     * @param map 查询条件
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping("/getXqbListPage")
    public AjaxReturn getXqbListPage(@SearchModel Object map) {
        return success().setData(xqbService.getXqbListPage((Map) map));
    }
    /**
     * 保存巡区表
     *
     * @param xqb 巡区表
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping("/saveXqb")
    public AjaxReturn saveXqb(@FormModel Xqb xqb) {
    xqbService.saveXqb(xqb);
        return success().setData(xqb.getId());
    }
    /**
     * 通过id获取巡区表
     *
     * @param id xqbId
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping("/getXqbById")
    public AjaxReturn getXqbById(Long id) {
        return success().setData(xqbService.get(Xqb.class,id));
    }
    /**
     * 删除巡区表
     *
     * @param id XqbId
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping("/delXqb")
    public AjaxReturn delXqb(Long id) {
    xqbService.delete(Xqb.class,id);
        return  success();
    }

}
