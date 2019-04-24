package net.ruixin.controller.plat.report;

import net.ruixin.util.tools.RxStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.stereotype.Controller;
import net.ruixin.controller.BaseController;
import net.ruixin.util.data.AjaxReturn;
import net.ruixin.util.resolver.FormModel;
import net.ruixin.util.resolver.SearchModel;
import java.util.Map;
import net.ruixin.domain.plat.report.SysMetaData;                           
import net.ruixin.service.plat.report.ISysMetaDataService;   

/**
 * 元数据 Controller实现
 *
 * @author RXCoder on 2018-8-20 9:16:01
 */
@Controller
@RequestMapping("/report")
public class SysMetaDataController extends BaseController {

    @Autowired
    private ISysMetaDataService sysMetaDataService;

    /**
     * 获取SysMetaData分页列表
     *
     * @param map 查询条件
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping("/getSysMetaDataListPage")
    public AjaxReturn getSysMetaDataListPage(@SearchModel Object map) {
        return success().setData(sysMetaDataService.getSysMetaDataListPage((Map) map));
    }
    /**
     * 保存元数据
     *
     * @param sysMetaData 元数据
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping("/saveSysMetaData")
    public AjaxReturn saveSysMetaData(@FormModel SysMetaData sysMetaData) {
    sysMetaDataService.saveSysMetaData(sysMetaData);
        return success().setData(sysMetaData.getId());
    }
    /**
     * 通过id获取元数据
     *
     * @param id sysMetaDataId
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping("/getSysMetaDataById")
    public AjaxReturn getSysMetaDataById(Long id) {
        return success().setData(sysMetaDataService.get(SysMetaData.class,id));
    }
    /**
     * 删除元数据
     *
     * @param id SysMetaDataId
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping("/delSysMetaData")
    public AjaxReturn delSysMetaData(Long id) {
    sysMetaDataService.delete(SysMetaData.class,id);
        return  success();
    }
    /**
     * 获取SysMetaDataDetail分页列表
     *
     * @param map 查询条件
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping("/getSysMetaDataDetailListPage")
    public AjaxReturn getSysMetaDataDetailListPage(@SearchModel Object map) {
        return success().setData(sysMetaDataService.getSysMetaDataDetailListPage((Map) map));
    }

    /**
     * 获取SysMetaDataShow分页列表
     *
     * @param tableName 细节表名
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping("/getSysMetaDataShowListPage")
    public AjaxReturn getSysMetaDataShowListPage(String tableName, @SearchModel Object map) {
        return success().setData(sysMetaDataService.getSysMetaDataShowListPage(tableName, (Map) map));
    }

    /**
     * 获取SysMetaDataColumn信息
     *
     * @param tableName 细节表名
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping("/getSysMetaDataColumnList")
    public AjaxReturn getSysMetaDataColumnList(String tableName) {
        return success().setData(sysMetaDataService.getSysMetaDataColumnList(tableName));
    }

    /**
     * 获取视图text
     *
     * @param tableName 细节表名
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping("/getViewText")
    public AjaxReturn getViewText(String tableName) {
        return success().setData(sysMetaDataService.getViewText(tableName));
    }

    /**
     * 创建视图
     *
     * @param text 视图内容
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping("/createView")
    public AjaxReturn createView(String text) {
        String result = sysMetaDataService.createView(text);
        if(RxStringUtils.isNotEmpty(result)){
            return error().setMsg(result);
        }
        return success();
    }

    /**
     * 获取视图text
     *
     * @param metadataId 元数据ID
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping("/getMetaDataAndColumns")
    public AjaxReturn getMetaDataAndColumns(Long metadataId) {
        return success().setData(sysMetaDataService.getMetaDataAndColumns(metadataId));
    }
}
