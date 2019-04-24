package net.ruixin.controller.gzl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.stereotype.Controller;
import net.ruixin.controller.BaseController;
import net.ruixin.util.data.AjaxReturn;
import net.ruixin.util.resolver.FormModel;
import net.ruixin.util.resolver.SearchModel;
import java.util.Map;
import net.ruixin.domain.gzl.HlwFk;
import net.ruixin.service.gzl.IHlwFkService;

/**
 * 互联网-反馈 Controller实现
 *
 * @author RXCoder on 2019-4-9 11:54:43
 */
@Controller
@RequestMapping("/gzl")
public class HlwFkController extends BaseController {

    @Autowired
    private IHlwFkService hlwFkService;

    /**
     * 获取HlwFk分页列表
     *
     * @param map 查询条件
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping("/getHlwFkListPage")
    public AjaxReturn getHlwFkListPage(@SearchModel Object map) {
        return success().setData(hlwFkService.getHlwFkListPage((Map) map));
    }
    /**
     * 保存互联网-反馈
     *
     * @param hlwFk 互联网-反馈
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping("/saveHlwFk")
    public AjaxReturn saveHlwFk(@FormModel HlwFk hlwFk) {
    hlwFkService.saveHlwFk(hlwFk);
        return success().setData(hlwFk.getId());
    }
    /**
     * 通过id获取互联网-反馈
     *
     * @param id hlwFkId
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping("/getHlwFkById")
    public AjaxReturn getHlwFkById(Long id) {
        return success().setData(hlwFkService.get(HlwFk.class,id));
    }
    /**
     * 删除互联网-反馈
     *
     * @param id HlwFkId
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping("/delHlwFk")
    public AjaxReturn delHlwFk(Long id) {
    hlwFkService.delete(HlwFk.class,id);
        return  success();
    }

}
