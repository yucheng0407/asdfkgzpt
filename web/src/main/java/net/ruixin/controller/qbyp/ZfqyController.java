package net.ruixin.controller.qbyp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.stereotype.Controller;
import net.ruixin.controller.BaseController;
import net.ruixin.util.data.AjaxReturn;
import net.ruixin.util.resolver.FormModel;
import net.ruixin.util.resolver.SearchModel;
import java.util.Map;
import net.ruixin.domain.qbyp.Zfqy;
import net.ruixin.service.qbyp.IZfqyService;

/**
 * 重防区域 Controller实现
 *
 * @author RXCoder on 2019-4-9 11:50:14
 */
@Controller
@RequestMapping("/qbyp")
public class ZfqyController extends BaseController {

    @Autowired
    private IZfqyService zfqyService;

    /**
     * 获取Zfqy分页列表
     *
     * @param map 查询条件
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping("/getZfqyListPage")
    public AjaxReturn getZfqyListPage(@SearchModel Object map) {
        return success().setData(zfqyService.getZfqyListPage((Map) map));
    }
    /**
     * 保存重防区域
     *
     * @param zfqy 重防区域
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping("/saveZfqy")
    public AjaxReturn saveZfqy(@FormModel Zfqy zfqy) {
    zfqyService.saveZfqy(zfqy);
        return success().setData(zfqy.getId());
    }
    /**
     * 通过id获取重防区域
     *
     * @param id zfqyId
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping("/getZfqyById")
    public AjaxReturn getZfqyById(Long id) {
        return success().setData(zfqyService.get(Zfqy.class,id));
    }
    /**
     * 删除重防区域
     *
     * @param id ZfqyId
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping("/delZfqy")
    public AjaxReturn delZfqy(Long id) {
    zfqyService.delete(Zfqy.class,id);
        return  success();
    }

}
