package net.ruixin.controller.qbyp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.stereotype.Controller;
import net.ruixin.controller.BaseController;
import net.ruixin.util.data.AjaxReturn;
import net.ruixin.util.resolver.FormModel;
import net.ruixin.util.resolver.SearchModel;
import java.util.Map;
import net.ruixin.domain.qbyp.Ajjg;
import net.ruixin.service.qbyp.IAjjgService;

/**
 * 案件加工 Controller实现
 *
 * @author RXCoder on 2019-4-9 11:47:16
 */
@Controller
@RequestMapping("/qbyp")
public class AjjgController extends BaseController {

    @Autowired
    private IAjjgService ajjgService;

    /**
     * 获取Ajjg分页列表
     *
     * @param map 查询条件
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping("/getAjjgListPage")
    public AjaxReturn getAjjgListPage(@SearchModel Object map) {
        return success().setData(ajjgService.getAjjgListPage((Map) map));
    }
    /**
     * 保存案件加工
     *
     * @param ajjg 案件加工
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping("/saveAjjg")
    public AjaxReturn saveAjjg(@FormModel Ajjg ajjg) {
    ajjgService.saveAjjg(ajjg);
        return success().setData(ajjg.getId());
    }
    /**
     * 通过id获取案件加工
     *
     * @param id ajjgId
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping("/getAjjgById")
    public AjaxReturn getAjjgById(Long id) {
        return success().setData(ajjgService.get(Ajjg.class,id));
    }
    /**
     * 删除案件加工
     *
     * @param id AjjgId
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping("/delAjjg")
    public AjaxReturn delAjjg(Long id) {
    ajjgService.delete(Ajjg.class,id);
        return  success();
    }

}
