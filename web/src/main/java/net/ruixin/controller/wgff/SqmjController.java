package net.ruixin.controller.wgff;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.stereotype.Controller;
import net.ruixin.controller.BaseController;
import net.ruixin.util.data.AjaxReturn;
import net.ruixin.util.resolver.FormModel;
import net.ruixin.util.resolver.SearchModel;
import java.util.Map;
import net.ruixin.domain.wgff.Sqmj;
import net.ruixin.service.wgff.ISqmjService;

/**
 * 网格队伍-社区民警信息 Controller实现
 *
 * @author RXCoder on 2019-4-9 11:56:53
 */
@Controller
@RequestMapping("/wgff")
public class SqmjController extends BaseController {

    @Autowired
    private ISqmjService sqmjService;

    /**
     * 获取Sqmj分页列表
     *
     * @param map 查询条件
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping("/getSqmjListPage")
    public AjaxReturn getSqmjListPage(@SearchModel Object map) {
        return success().setData(sqmjService.getSqmjListPage((Map) map));
    }
    /**
     * 保存网格队伍-社区民警信息
     *
     * @param sqmj 网格队伍-社区民警信息
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping("/saveSqmj")
    public AjaxReturn saveSqmj(@FormModel Sqmj sqmj) {
    sqmjService.saveSqmj(sqmj);
        return success().setData(sqmj.getId());
    }
    /**
     * 通过id获取网格队伍-社区民警信息
     *
     * @param id sqmjId
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping("/getSqmjById")
    public AjaxReturn getSqmjById(Long id) {
        return success().setData(sqmjService.get(Sqmj.class,id));
    }
    /**
     * 删除网格队伍-社区民警信息
     *
     * @param id SqmjId
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping("/delSqmj")
    public AjaxReturn delSqmj(Long id) {
    sqmjService.delete(Sqmj.class,id);
        return  success();
    }

}
