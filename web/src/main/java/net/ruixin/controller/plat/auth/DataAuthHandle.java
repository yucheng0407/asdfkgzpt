package net.ruixin.controller.plat.auth;

import net.ruixin.controller.BaseController;
import net.ruixin.service.plat.auth.IDataAuthService;
import net.ruixin.util.data.AjaxReturn;
import net.ruixin.util.paginate.FastPagination;
import net.ruixin.util.resolver.SearchModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Map;

/**
 * 数据权限
 *
 * @author Administrator
 */
@Controller
@RequestMapping("/auth")
public class DataAuthHandle extends BaseController {
    @Autowired
    private IDataAuthService dataAuthService;

    /**
     * 获取数据权限列表
     *
     * @param map
     * @return
     */
    @ResponseBody
    @RequestMapping("/getDataAuthList")
    public AjaxReturn getDataAuthList(@SearchModel Object map) {
        FastPagination fastPagination = dataAuthService.getDataAuthList((Map) map);
        return success().setData(fastPagination);
    }

    /**
     * 保存数据权限
     *
     * @param userIds
     * @param objId
     * @param oIds
     * @return
     */
    @ResponseBody
    @RequestMapping("/saveDataAuth")
    public AjaxReturn saveDataAuth(String userIds, Long objId, String oIds) {
        dataAuthService.saveDataAuth(userIds, objId, oIds, getCurrentUserId());
        return success();
    }

    /**
     * 删除数据权限
     *
     * @param id
     * @return
     */
    @ResponseBody
    @RequestMapping("/delDataAuth")
    public AjaxReturn delDataAuth(Long id) {
        dataAuthService.delDataAuth(id);
        return success();
    }

    /**
     * 批量删除数据权限
     *
     * @param userIds
     * @param objectId
     * @return
     */
    @ResponseBody
    @RequestMapping("/batchDel")
    public AjaxReturn batchDel(String userIds, Long objectId) {
        dataAuthService.batchDel(userIds, objectId);
        return success();
    }

    /**
     * 获取对象字典，目前是下拉选择，后期可以改成layer选择等
     *
     * @return
     */
    @ResponseBody
    @RequestMapping("/getObjList")
    public AjaxReturn getObjList() {
        return success().setData(dataAuthService.getObjList());
    }

    /**
     * 根据对象id获取数据
     *
     * @param objId 对象id
     * @return
     */
    @ResponseBody
    @RequestMapping("/getZtObjList")
    public AjaxReturn getZtObjList(@SearchModel Object map, Long objId) {
        return success().setData(dataAuthService.getZtObjList((Map) map, objId));
    }
}
