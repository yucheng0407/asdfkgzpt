package net.ruixin.controller.plat.dict;

import net.ruixin.controller.BaseController;
import net.ruixin.domain.plat.dictionary.SysDict;
import net.ruixin.domain.plat.dictionary.SysSubDict;
import net.ruixin.service.plat.dictionary.IDictService;
import net.ruixin.service.plat.log.aop.BussinessLog;
import net.ruixin.util.cache.Cache;
import net.ruixin.util.cache.CacheKit;
import net.ruixin.util.data.AjaxReturn;
import net.ruixin.util.paginate.FastPagination;
import net.ruixin.util.resolver.FormModel;
import net.ruixin.util.resolver.SearchModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.*;

/**
 * 字典控制层
 */
@Controller
@RequestMapping("/dict")
public class DictHandler extends BaseController {

    @Autowired
    private IDictService dictService;

    /**
     * 保存字典实体
     *
     * @param sysDict 字典实体
     */
    @ResponseBody
    @RequestMapping("/saveSysDict")
    @BussinessLog(value = "字典变更")
    public AjaxReturn saveSysDict(@FormModel SysDict sysDict) {
        for (SysSubDict subDict : sysDict.getSysSubDictList()) {
            subDict.setDictCode(sysDict.getDictCode());
        }
        dictService.saveDict(sysDict);
        return success().setData(sysDict.getId());
    }

    /**
     * 获取字典列表
     *
     * @param map 查询条件:dictName dictCode dictType
     */
    @ResponseBody
    @RequestMapping("/getSysDictListPage")
    public AjaxReturn getSysDictListPage(@SearchModel Object map) {
        FastPagination fastPagination = dictService.getDictList((Map) map);
        return success().setData(fastPagination);
    }

    /**
     * 获取字典实体
     *
     * @param id 字典id
     */
    @ResponseBody
    @RequestMapping("/getSysDictById")
    public AjaxReturn getSysDictById(Long id) {
        return success().setData(dictService.getDictById(id));
    }

    /**
     * 删除字典
     *
     * @param id 字典id
     */
    @ResponseBody
    @RequestMapping("/delSysDict")
    @BussinessLog(value = "字典删除")
    public AjaxReturn delSysDict(Long id) {
        dictService.deleteDict(id);
        return success();
    }

    /**
     * 根据code（"zd1+zd2+zd3,zd4,zd5"）获取多个字典
     *
     * @param codeStr code
     */
    @ResponseBody
    @RequestMapping("/getDictsByCodes")
    public Map getDictsByCodes(String codeStr) {
        Map<String, Object> result = new HashMap<>();
        if (codeStr.contains(",")) {
            String[] codes = codeStr.split(",");
            for (String code : codes) {
                result.put(code, getDictByCodes(code));
            }
        } else {
            result.put(codeStr, getDictByCodes(codeStr));
        }
        return result;
    }

    /**
     * 根据code（"zd1+zd2+zd3"）获取单个字典
     *
     * @param codeStr code
     */
    @ResponseBody
    @RequestMapping("/getDictByCodes")
    public List getDictByCodes(String codeStr) {
        Collection<Object> obj;
        List<Object> list = new ArrayList<>();
        if (codeStr.contains("+")) {
            for (String code : codeStr.split("\\+")) {
                obj = CacheKit.get(Cache.DICT, code);
                if (null != obj) {
                    list.addAll(obj);
                }
            }
        } else {
            obj = CacheKit.get(Cache.DICT, codeStr);
            if (null != obj) {
                list.addAll(obj);
            }
        }
        return list;
    }
}
