package net.ruixin.controller.gzl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.stereotype.Controller;
import net.ruixin.controller.BaseController;
import net.ruixin.util.data.AjaxReturn;
import net.ruixin.util.resolver.FormModel;
import net.ruixin.util.resolver.SearchModel;
import java.util.Map;
import net.ruixin.domain.gzl.HlwJs;
import net.ruixin.service.gzl.IHlwJsService;

/**
 * 互联网-接收 Controller实现
 *
 * @author RXCoder on 2019-4-9 11:54:53
 */
@Controller
@RequestMapping("/gzl")
public class HlwJsController extends BaseController {

    @Autowired
    private IHlwJsService hlwJsService;

    /**
     * 获取HlwJs分页列表
     *
     * @param map 查询条件
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping("/getHlwJsListPage")
    public AjaxReturn getHlwJsListPage(@SearchModel Object map) {
        return success().setData(hlwJsService.getHlwJsListPage((Map) map));
    }
    /**
     * 保存互联网-接收
     *
     * @param hlwJs 互联网-接收
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping("/saveHlwJs")
    public AjaxReturn saveHlwJs(@FormModel HlwJs hlwJs) {
    hlwJsService.saveHlwJs(hlwJs);
        return success().setData(hlwJs.getId());
    }
    /**
     * 通过id获取互联网-接收
     *
     * @param id hlwJsId
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping("/getHlwJsById")
    public AjaxReturn getHlwJsById(Long id) {
        return success().setData(hlwJsService.get(HlwJs.class,id));
    }
    /**
     * 删除互联网-接收
     *
     * @param id HlwJsId
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping("/delHlwJs")
    public AjaxReturn delHlwJs(Long id) {
    hlwJsService.delete(HlwJs.class,id);
        return  success();
    }

}
