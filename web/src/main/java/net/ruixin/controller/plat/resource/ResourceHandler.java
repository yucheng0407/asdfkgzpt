package net.ruixin.controller.plat.resource;

import net.ruixin.controller.BaseController;
import net.ruixin.domain.constant.Const;
import net.ruixin.domain.plat.resource.SysResource;
import net.ruixin.enumerate.plat.ShiroQueryKey;
import net.ruixin.service.plat.log.aop.BussinessLog;
import net.ruixin.service.plat.resource.IResourceService;
import net.ruixin.util.shiro.ShiroKit;
import net.ruixin.util.data.AjaxReturn;
import net.ruixin.util.paginate.FastPagination;
import net.ruixin.util.resolver.FormModel;
import net.ruixin.util.resolver.SearchModel;
import net.ruixin.util.tools.RxStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * 资源控制层
 */
@Controller
@RequestMapping("/resource")
public class ResourceHandler extends BaseController {

    @Autowired
    private IResourceService resourceService;

    /**
     * 分页列表查询
     *
     * @param map 查询条件
     */
    @ResponseBody
    @RequestMapping(value = "/getResourceList")
    public AjaxReturn getResourceList(@SearchModel Object map) {
        FastPagination fastPagination = resourceService.getResourceList((Map) map);
        return success().setData(fastPagination);
    }

    /**
     * 根据ID获取资源实体
     *
     * @param id 资源ID
     */
    @ResponseBody
    @RequestMapping(value = "/getResourceById")
    public AjaxReturn getResourceById(Long id) {
        return success().setData(resourceService.getResourceById(id));
    }

    /**
     * 保存、修改资源
     *
     * @param resource 资源
     */
    @ResponseBody
    @RequestMapping(value = "/saveResource")
    @BussinessLog(value = "资源变更")
    public AjaxReturn saveResource(@FormModel SysResource resource) {
        return success().setData(resourceService.saveResource(resource));
    }

    /**
     * 根据ID删除资源
     *
     * @param id 资源ID
     */
    @ResponseBody
    @RequestMapping(value = "/delResource")
    @BussinessLog(value = "资源删除")
    public AjaxReturn delResource(Long id) {
        resourceService.delResource(id);
        return success();
    }

    /**
     * 资源异步树数据获取
     *
     * @param resourceType 资源类型
     * @param removeId     启动(排除)资源id
     * @param id           异步节点id
     */
    @ResponseBody
    @RequestMapping(value = "/getResourceTreeData")
    public List getResourceTreeData(String resourceType, Long removeId, Long id) {
        return resourceService.getResourceTreeData(resourceType, removeId, id);
    }

    /**
     * 角色资源异步树数据获取
     *
     * @param roleId   角色id
     * @param treeHide 是否按配置隐藏资源
     */
    @ResponseBody
    @RequestMapping(value = "/getRoleResourceTreeData")
    public List getRoleResourceTreeData(Long roleId, Boolean treeHide) {
        return resourceService.getRoleResourceTreeData(roleId, treeHide, false);
    }

    /**
     * 角色资源分配tree（分配自己有的资源）
     *
     * @param roleId   角色id
     * @param treeHide 是否按配置隐藏资源
     */
    @ResponseBody
    @RequestMapping(value = "/getRoleAllocatResourceTree")
    public List getRoleAllocatResourceTree(Long roleId, Boolean treeHide) {
        return resourceService.getRoleResourceTreeData(roleId, treeHide, true);
    }

    /**
     * 保存角色资源关联
     */
    @ResponseBody
    @RequestMapping(value = "/saveRoleResource")
    public AjaxReturn saveRoleResource(Long roleId, String resourceIds, String delIds) {
        resourceService.saveRoleResource(roleId, resourceIds, delIds);
        return success();
    }

    /**
     * 调整资源树排序与归属
     *
     * @param ids          资源ids
     * @param parentId     上级id
     * @param parentType   上级类型
     * @param parentShowId 上级显示id
     */
    @ResponseBody
    @RequestMapping(value = "/changeTreeNodeSortAndParent")
    public AjaxReturn changeTreeNodeSortAndParent(String ids, Long parentId, String parentType, Long parentShowId, Long needClearTargetId) {
        resourceService.changeTreeNodeSortAndParent(ids, parentId, parentType, parentShowId, needClearTargetId);
        return success();
    }

    /**
     * 分页列表查询
     *
     * @param map 查询条件
     */
    @ResponseBody
    @RequestMapping(value = "/getMenuUrlList")
    public AjaxReturn getMenuUrlList(@SearchModel Object map) {
        FastPagination fastPagination = resourceService.getMenuUrlList((Map) map);
        return success().setData(fastPagination);
    }

    /**
     * 获取子系統菜单
     *
     * @param type       资源类型
     * @param parentCode 上级资源编码
     * @param zxtCode    子系统代码
     */
    @ResponseBody
    @RequestMapping(value = "/getUserResource")
    public AjaxReturn getUserResource(String type, String parentCode, String zxtCode) {
        List<Map> menuList = null;
        if (zxtCode == null || "".equals(zxtCode)) {
            menuList = ShiroKit.getUserResource(type, ShiroQueryKey.CODE, parentCode);
        } else {
            menuList = ShiroKit.getUserZxtResource(type, zxtCode, parentCode);
        }
        return success().setData(menuList);
    }

    /**
     * 登陆用户的url map
     *
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/getUserResUrl")
    public AjaxReturn getUserResUrl() {
        if (ShiroKit.getUser().getRoleLevel() == Const.ROLE_LEVEL_PLATADMIN) {
            return success().setData("all");
        } else {
            return success().setData(ShiroKit.getUser().getResourceUrl());
        }
    }

    /**
     * 资源分配
     *
     * @param roleIds 角色ids
     * @param resId   资源id
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/saveAllotRes")
    public AjaxReturn saveAllotRes(String roleIds, Long resId) {
        resourceService.saveAllotRes(roleIds, resId);
        return success();
    }
}
