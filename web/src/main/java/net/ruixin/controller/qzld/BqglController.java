package net.ruixin.controller.qzld;


import net.ruixin.controller.BaseController;
import net.ruixin.domain.qzld.Bqgl;
import net.ruixin.enumerate.plat.SfyxSt;
import net.ruixin.service.qzld.IBqglService;
import net.ruixin.util.data.AjaxReturn;
import net.ruixin.util.resolver.FormModel;
import net.ruixin.util.resolver.SearchModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Map;

@Controller
@RequestMapping("/bqgl")
public class BqglController extends BaseController {


    @Autowired
   private IBqglService bqglService;



    /**
     * 获取备勤管理分页列表
     *
     * @param map 查询条件
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping("/getBqglList")
    public AjaxReturn getBqglListPage(@SearchModel Object map) {
        return success().setData(bqglService.getBqglListPage((Map) map));
    }

    /**
     * 获取默认登录用户信息
     * **/
    @ResponseBody
    @RequestMapping("/getDefaultUser")
    public AjaxReturn getDefaultUser() {
        return success().setData(bqglService.getDefaultUser());
    }

    /**
     * 获取值班领导信息
     * */
    @ResponseBody
    @RequestMapping("/getZbld")
    public AjaxReturn getZbld(Long defaultOrganid) {
        return success().setData(bqglService.getZbld(defaultOrganid));
    }
    /**
     * 保存
     * */
    @ResponseBody
    @RequestMapping("/saveBqgl")
    public AjaxReturn saveBqgl(@FormModel Bqgl bqgl,String drs) {
        //默认的状态(SFYX_ST)为1 有效状态
        bqgl.setSfyxSt(SfyxSt.VALID);
        bqgl.setSffb_st("0");//不发布
        bqglService.saveBqgl(bqgl,drs);
        return success().setData(bqgl.getId());
    }
  /**
   * 发布
   * */
  @ResponseBody
  @RequestMapping("/changeFbzt")
  public AjaxReturn changeFbzt( String ids) {
      bqglService.changeFbzt(ids);
      return success();
  }
  /**
   * 全选发布
   * 选中这天的任务发布
   * */
  @ResponseBody
  @RequestMapping("/qxfb")
  public AjaxReturn qxfb() {
      bqglService.qxfb();
      return success();
  }


  //引用历史
  @ResponseBody
  @RequestMapping("/getYylsList")
  public AjaxReturn getYylsList(@SearchModel Object map) {
      return success().setData(bqglService.getYylsList((Map) map));
  }
    /**
     * 通过id获取备勤管理任务
     */
    @ResponseBody
    @RequestMapping("/getBqglById")
    public AjaxReturn getBqglById(Long id) {
        return success().setData(bqglService.getBqglById(id));
    }

    /**
     * 删除
     * */
    @ResponseBody
    @RequestMapping("/deleteBqgl")
    public AjaxReturn deleteBqgl( String ids) {
        bqglService.deleteBqgl(ids);
        return success();
    }
}
