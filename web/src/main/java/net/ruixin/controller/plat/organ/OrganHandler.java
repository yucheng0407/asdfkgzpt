package net.ruixin.controller.plat.organ;

import net.ruixin.controller.BaseController;
import net.ruixin.domain.plat.organ.SysOrgan;
import net.ruixin.service.plat.log.aop.BussinessLog;
import net.ruixin.service.plat.organ.IOrganService;
import net.ruixin.util.data.AjaxReturn;
import net.ruixin.util.paginate.FastPagination;
import net.ruixin.util.resolver.FormModel;
import net.ruixin.util.resolver.SearchModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.Map;

/**
 * 组织机构控制层
 *
 * @author Pitcher
 */
@Controller
@RequestMapping("/organ")
public class OrganHandler extends BaseController {

    @Autowired
    private IOrganService organService;

    /**
     * 查询组织机构列表
     *
     * @param map 查询条件
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping(value = "/getSysOrganListPage")
    public AjaxReturn getSysOrganListPage(@SearchModel Object map) {
        FastPagination fastPagination = organService.getSysOrganListPage((Map) map);
        return success().setData(fastPagination);
    }

    /**
     * 保存组织机构信息
     *
     * @param sysOrgan 机构信息
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping(value = "/saveSysOrgan")
    @BussinessLog(value = "机构变更")
    public AjaxReturn saveSysOrgan(@FormModel SysOrgan sysOrgan) {
        //验证同一组织机构下，简称是否重复
        boolean hasOrganName = organService.hasOrganName(sysOrgan.getId(), sysOrgan.getOrganName(), sysOrgan.getParentOrg());
        //验证（不重复）通过 保存
        if (!hasOrganName) {
            organService.saveSysOrgan(sysOrgan);
            return success().setData(sysOrgan.getId()).setMsg("保存成功");
        } else {
            return success().setSuccess(false).setMsg("此机构名称已存在，请重新命名");
        }
    }


    /**
     * 删除组织机构
     *
     * @param id         机构id
     * @param newOrganId 调整后的机构id
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping(value = "/delSysOrgan")
    @BussinessLog(value = "机构删除")
    public AjaxReturn delSysOrgan(Long id, Long newOrganId) {
        organService.delSysOrgan(id, newOrganId);
        return success();
    }


    /**
     * 根据ID查询组织机构信息
     *
     * @param id 机构ID
     * @return SysOrgan
     */
    @ResponseBody
    @RequestMapping(value = "/getSysOrganById")
    public AjaxReturn getSysOrganById(Long id) {
        return success().setData(organService.getSysOrganById(id));
    }

    /**
     * 查询下级机构
     *
     * @param id 机构id
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping(value = "/getChildOrgan")
    public AjaxReturn getChildOrgan(Long id) {
        List<Map<String, Object>> childList = organService.getOrganListByParentId(id);
        return new AjaxReturn().setSuccess(true).setData(childList);
    }


    /**
     * 查询组织关联角色信息
     *
     * @param id 组织机构ID
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping(value = "/organGlxx")
    public AjaxReturn getOrganGlxx(Long id) {
        Map map = organService.getOrganGlxx(id);
        return success().setData(map);
    }

    /**
     * 更换组织机构归属和排序
     *
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/changeTreeNodeSortAndParent")
    public AjaxReturn changeTreeNodeSortAndParent(String ids, Long parentId) {
        organService.changeTreeNodeSortAndParent(ids, parentId);
        return success();
    }


}
