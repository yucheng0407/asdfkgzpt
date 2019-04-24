package net.ruixin.controller.plat.config;

import net.ruixin.controller.BaseController;
import net.ruixin.domain.constant.Const;
import net.ruixin.domain.plat.config.SysConfig;
import net.ruixin.service.plat.config.IConfigService;
import net.ruixin.service.plat.log.aop.BussinessLog;
import net.ruixin.util.cache.Cache;
import net.ruixin.util.cache.CacheKit;
import net.ruixin.util.data.AjaxReturn;
import net.ruixin.util.paginate.FastPagination;
import net.ruixin.util.resolver.FormModel;
import net.ruixin.util.resolver.SearchModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.Map;

/**
 * 配置控制层
 */
@Controller
@RequestMapping("/config")
@SuppressWarnings("unchecked")
public class ConfigHandler extends BaseController {

    @Autowired
    private IConfigService configService;

    /**
     * 分页列表查询
     *
     * @param map 查询条件
     */
    @ResponseBody
    @RequestMapping(value = "/getConfigList")
    public AjaxReturn getConfigList(@SearchModel Object map) {
        FastPagination fastPagination = configService.getConfigList((Map) map);
        return success().setData(fastPagination);
    }

    /**
     * 根据ID获取配置实体
     *
     * @param id 配置ID
     */
    @ResponseBody
    @RequestMapping(value = "/getConfigById")
    public AjaxReturn getConfigById(Long id) {
        return success().setData(configService.getConfigById(id));
    }

    /**
     * 保存、修改配置
     *
     * @param config 配置
     */
    @ResponseBody
    @RequestMapping(value = "/saveConfig")
    @BussinessLog(value = "配置变更")
    public AjaxReturn saveConfig(@FormModel SysConfig config) {
        configService.saveConfig(config);
        return success();
    }

    /**
     * 根据ID删除配置
     *
     * @param id 配置ID
     */
    @ResponseBody
    @RequestMapping(value = "/delConfig")
    @BussinessLog(value = "配置删除")
    public AjaxReturn delConfig(Long id) {
        configService.delConfig(id);
        return success();
    }

    //获取配置按类别平铺展示数据
    @ResponseBody
    @RequestMapping(value = "/getConfigListByType")
    public AjaxReturn getConfigListByType() {
        Map result = new HashMap();
        result.put("appTypeList",configService.getConfigListByType());
        return new AjaxReturn().setSuccess(true).setData(result);
    }

    /**
     * @return
     */
    @ResponseBody
    @RequestMapping("/getBaseConfig")
    public AjaxReturn getBaseConfig() {
//        return success().setData(CacheKit.getAll(Cache.CONFIG));
        Map<String, Object> configMap = new HashMap<String, Object>();
        configMap.put("BASE", CacheKit.get(Cache.CONFIG, Const.CONFIG_TYPE_PLATBASE));
        configMap.put("WORKFLOW", CacheKit.get(Cache.CONFIG, Const.CONFIG_TYPE_WORKFLOW));
        return success().setData(configMap);
    }

    /**
     * 资源引导配置页面
     * @param model
     * @return
     */
    @RequestMapping(value = "/resourceConfigEdit")
    public String resourceConfigEdit(Model model) {
        model.addAttribute("resourceConfig",CacheKit.get(Cache.CONFIG,"resourceConfig"));
        return "plat/config/resourceConfigEdit";
    }

    /**
     * 保存所有资源配置
     *
     * @param json 资源配置json字符串
     */
    @ResponseBody
    @RequestMapping(value = "/saveAllResourceConfig")
    public AjaxReturn saveAllResourceConfig(String json) {
        configService.saveAllResourceConfig(json);
        configService.recacheAllConfig();
        return success();
    }

    /**
     * 恢复默认资源配置
     */
    @ResponseBody
    @RequestMapping(value = "/defaultResourceConfig")
    public AjaxReturn defaultResourceConfig() {
        configService.defaultResourceConfig();
        configService.recacheAllConfig();
        return success();
    }
}
