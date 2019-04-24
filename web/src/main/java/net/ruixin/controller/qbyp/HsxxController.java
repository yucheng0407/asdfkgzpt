package net.ruixin.controller.qbyp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.stereotype.Controller;
import net.ruixin.controller.BaseController;
import net.ruixin.util.data.AjaxReturn;
import net.ruixin.util.resolver.FormModel;
import net.ruixin.util.resolver.SearchModel;
import java.util.Map;
import net.ruixin.domain.qbyp.Hsxx;
import net.ruixin.service.qbyp.IHsxxService;

/**
 * 情报会商 Controller实现
 *
 * @author RXCoder on 2019-4-9 11:56:20
 */
@Controller
@RequestMapping("/qbyp")
public class HsxxController extends BaseController {

    @Autowired
    private IHsxxService hsxxService;

    /**
     * 获取Hsxx分页列表
     *
     * @param map 查询条件
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping("/getHsxxListPage")
    public AjaxReturn getHsxxListPage(@SearchModel Object map) {
        return success().setData(hsxxService.getHsxxListPage((Map) map));
    }
    /**
     * 保存情报会商
     *
     * @param hsxx 情报会商
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping("/saveHsxx")
    public AjaxReturn saveHsxx(@FormModel Hsxx hsxx) {
    hsxxService.saveHsxx(hsxx);
        return success().setData(hsxx.getId());
    }
    /**
     * 通过id获取情报会商
     *
     * @param id hsxxId
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping("/getHsxxById")
    public AjaxReturn getHsxxById(Long id) {
        return success().setData(hsxxService.get(Hsxx.class,id));
    }
    /**
     * 删除情报会商
     *
     * @param id HsxxId
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping("/delHsxx")
    public AjaxReturn delHsxx(Long id) {
    hsxxService.delete(Hsxx.class,id);
        return  success();
    }

}
