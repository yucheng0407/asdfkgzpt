package net.ruixin.controller.jmfk;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.stereotype.Controller;
import net.ruixin.controller.BaseController;
import net.ruixin.util.data.AjaxReturn;
import net.ruixin.util.resolver.FormModel;
import net.ruixin.util.resolver.SearchModel;
import java.util.Map;
import net.ruixin.domain.jmfk.SbGlb;
import net.ruixin.service.jmfk.ISbGlbService;

/**
 * 防控安排_设备_关联表 Controller实现
 *
 * @author RXCoder on 2019-4-9 11:52:23
 */
@Controller
@RequestMapping("/jmfk")
public class SbGlbController extends BaseController {

    @Autowired
    private ISbGlbService sbGlbService;

    /**
     * 获取SbGlb分页列表
     *
     * @param map 查询条件
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping("/getSbGlbListPage")
    public AjaxReturn getSbGlbListPage(@SearchModel Object map) {
        return success().setData(sbGlbService.getSbGlbListPage((Map) map));
    }
    /**
     * 保存防控安排_设备_关联表
     *
     * @param sbGlb 防控安排_设备_关联表
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping("/saveSbGlb")
    public AjaxReturn saveSbGlb(@FormModel SbGlb sbGlb) {
    sbGlbService.saveSbGlb(sbGlb);
        return success().setData(sbGlb.getId());
    }
    /**
     * 通过id获取防控安排_设备_关联表
     *
     * @param id sbGlbId
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping("/getSbGlbById")
    public AjaxReturn getSbGlbById(Long id) {
        return success().setData(sbGlbService.get(SbGlb.class,id));
    }
    /**
     * 删除防控安排_设备_关联表
     *
     * @param id SbGlbId
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping("/delSbGlb")
    public AjaxReturn delSbGlb(Long id) {
    sbGlbService.delete(SbGlb.class,id);
        return  success();
    }

}
