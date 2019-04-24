package net.ruixin.controller.jmfk;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.stereotype.Controller;
import net.ruixin.controller.BaseController;
import net.ruixin.util.data.AjaxReturn;
import net.ruixin.util.resolver.FormModel;
import net.ruixin.util.resolver.SearchModel;
import java.util.Map;
import net.ruixin.domain.jmfk.FkapRwd;
import net.ruixin.service.jmfk.IFkapRwdService;

/**
 * 防控安排表 Controller实现
 *
 * @author RXCoder on 2019-4-9 11:52:00
 */
@Controller
@RequestMapping("/jmfk")
public class FkapRwdController extends BaseController {

    @Autowired
    private IFkapRwdService fkapRwdService;

    /**
     * 获取FkapRwd分页列表
     *
     * @param map 查询条件
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping("/getFkapRwdListPage")
    public AjaxReturn getFkapRwdListPage(@SearchModel Object map) {
        return success().setData(fkapRwdService.getFkapRwdListPage((Map) map));
    }

    /**
     * 巡区
     * @param
     * @return
     * */
    @ResponseBody
    @RequestMapping("/getXqListPage")
    public AjaxReturn getXqListPage(@SearchModel Object map,String xqlx) {
        return success().setData(fkapRwdService.getXqListPage((Map) map,xqlx));
    }
    /**
     *设备
     * */
    @ResponseBody
    @RequestMapping("/getDeviceListPage")
    public AjaxReturn getDeviceListPage(@SearchModel Object map,String equipmentParent,String equipmentChild) {
        return success().setData(fkapRwdService.getDeviceListPage((Map) map,equipmentParent,equipmentChild));
    }
    /**
     *重防
     * */
    @ResponseBody
    @RequestMapping("/getZfListPage")
    public AjaxReturn getZfListPage(@SearchModel Object map) {
        return success().setData(fkapRwdService.getZfListPage((Map) map));
    }
    /**
     * 保存防控安排表
     *
     * @param fkapRwd 防控安排表
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping("/saveFkapRwd")
    public AjaxReturn saveFkapRwd(@FormModel FkapRwd fkapRwd,String deviceIds,String zjsbs) {
        Boolean flag;
        flag=fkapRwdService.judgeRq(fkapRwd); //巡防日期判断
        if(!flag){
            flag=fkapRwdService.judgeXz(fkapRwd); //巡组判断
                if(!flag){
                    return error().setMsg("存在相同的巡组号");
                }
                flag=fkapRwdService.judgeMj(fkapRwd); //民警判断
                if(!flag){
                    return error().setMsg("存在相同的民警绑定");
                }
            flag=fkapRwdService.judgeDevices(fkapRwd,deviceIds);
                if(!flag){
                    return error().setMsg("存在相同的设备绑定");
                }
        }
        fkapRwdService.saveFkapRwd(fkapRwd,deviceIds,zjsbs);
        return success().setData(fkapRwd.getId());

    }
   /**
    * 获取机构OrganName
    * */
    @ResponseBody
    @RequestMapping("/getOrganName")
   public AjaxReturn getOrganName(Long id){
        return success().setData(fkapRwdService.getOrganName(id));
   }
    /**
     * 通过id获取防控安排表
     *
     * @param id fkapRwdId
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping("/getFkapRwdById")
    public AjaxReturn getFkapRwdById(Long id) {
        FkapRwd rwd = fkapRwdService.get(FkapRwd.class, id);
        //巡区名称
        fkapRwdService.setXqmc(rwd);
        //重防区域名称
        if(rwd.getZfqy()!=null){
        fkapRwdService.getZfxqmc(rwd);
        fkapRwdService.setZfsd(rwd);
        }
       //关联设备
        fkapRwdService.setSbs(rwd);
        return success().setData(rwd);
    }
    /**
     * 删除防控安排表
     *
     * @param id FkapRwdId
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping("/delFkapRwd")
    public AjaxReturn delFkapRwd(Long id) {
    fkapRwdService.delete(FkapRwd.class,id);
        return  success();
    }

}
