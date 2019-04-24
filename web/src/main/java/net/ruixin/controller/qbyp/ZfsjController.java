package net.ruixin.controller.qbyp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.stereotype.Controller;
import net.ruixin.controller.BaseController;
import net.ruixin.util.data.AjaxReturn;
import net.ruixin.util.resolver.FormModel;
import net.ruixin.util.resolver.SearchModel;
import java.util.Map;
import net.ruixin.domain.qbyp.Zfsj;
import net.ruixin.service.qbyp.IZfsjService;

/**
 * 重防区域-重防时间 Controller实现
 *
 * @author RXCoder on 2019-4-9 11:50:39
 */
@Controller
@RequestMapping("/qbyp")
public class ZfsjController extends BaseController {

    @Autowired
    private IZfsjService zfsjService;

    /**
     * 获取Zfsj分页列表
     *
     * @param map 查询条件
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping("/getZfsjListPage")
    public AjaxReturn getZfsjListPage(@SearchModel Object map) {
        return success().setData(zfsjService.getZfsjListPage((Map) map));
    }
    /**
     * 保存重防区域-重防时间
     *
     * @param zfsj 重防区域-重防时间
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping("/saveZfsj")
    public AjaxReturn saveZfsj(@FormModel Zfsj zfsj) {
    zfsjService.saveZfsj(zfsj);
        return success().setData(zfsj.getId());
    }
    /**
     * 通过id获取重防区域-重防时间
     *
     * @param id zfsjId
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping("/getZfsjById")
    public AjaxReturn getZfsjById(Long id) {
        return success().setData(zfsjService.get(Zfsj.class,id));
    }
    /**
     * 删除重防区域-重防时间
     *
     * @param id ZfsjId
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping("/delZfsj")
    public AjaxReturn delZfsj(Long id) {
    zfsjService.delete(Zfsj.class,id);
        return  success();
    }

}
