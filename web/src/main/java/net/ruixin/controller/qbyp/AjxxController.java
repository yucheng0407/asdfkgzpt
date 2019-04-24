package net.ruixin.controller.qbyp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.stereotype.Controller;
import net.ruixin.controller.BaseController;
import net.ruixin.util.data.AjaxReturn;
import net.ruixin.util.resolver.FormModel;
import net.ruixin.util.resolver.SearchModel;
import java.util.Map;
import net.ruixin.domain.qbyp.Ajxx;
import net.ruixin.service.qbyp.IAjxxService;

/**
 * 案件信息 Controller实现
 *
 * @author RXCoder on 2019-4-9 11:47:54
 */
@Controller
@RequestMapping("/qbyp")
public class AjxxController extends BaseController {

    @Autowired
    private IAjxxService ajxxService;

    /**
     * 获取Ajxx分页列表
     *
     * @param map 查询条件
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping("/getAjxxListPage")
    public AjaxReturn getAjxxListPage(@SearchModel Object map) {
        return success().setData(ajxxService.getAjxxListPage((Map) map));
    }
    /**
     * 保存案件信息
     *
     * @param ajxx 案件信息
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping("/saveAjxx")
    public AjaxReturn saveAjxx(@FormModel Ajxx ajxx) {
    ajxxService.saveAjxx(ajxx);
        return success().setData(ajxx.getId());
    }
    /**
     * 通过id获取案件信息
     *
     * @param id ajxxId
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping("/getAjxxById")
    public AjaxReturn getAjxxById(Long id) {
        return success().setData(ajxxService.get(Ajxx.class,id));
    }
    /**
     * 删除案件信息
     *
     * @param id AjxxId
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping("/delAjxx")
    public AjaxReturn delAjxx(Long id) {
    ajxxService.delete(Ajxx.class,id);
        return  success();
    }

}
