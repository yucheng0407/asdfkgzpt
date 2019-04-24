package net.ruixin.controller.plat.tree;

import net.ruixin.controller.BaseController;
import net.ruixin.service.plat.tree.PlatTreeService;
import net.ruixin.util.data.OrganTreeConfig;
import net.ruixin.util.shiro.ShiroKit;
import net.ruixin.util.tools.RxStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * @author Administrator
 */
@Controller
@RequestMapping("/tree")
public class TreeController extends BaseController {

    @Autowired
    private PlatTreeService treeService;

    /**
     * 组织机构异步树
     *
     * @param id              异步节点id
     * @param lx              异步节点类型
     * @param organTreeConfig 异步树的配置参数
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/getOrganPostUserTree")
    public List getOrganPostUserTree(Long id, String lx, OrganTreeConfig organTreeConfig) {
        return treeService.getOrganPostUserTreeAsync(id, lx, organTreeConfig, getCurrentUserId());
    }

    /**
     * 获取同步树
     *
     * @param kind  树的类型
     * @param topId 顶级id
     * @param filterId
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/getSyncOrganTree")
    public List getSyncOrganTree(String kind, Long topId,String filterId)
    {
        if(RxStringUtils.isEmpty(kind)){
            kind="ou";
        }
        if(topId==null){
            topId=ShiroKit.getUser().getDftDeptId();
        }
        return treeService.getOrganSyncTreeData(kind, topId,filterId);
    }

    /**
     * 获取角色关联页面同步机构树CHILDREN
     *
     * @param tid    机构节点id，可为空
     * @param roleId 关联角色id
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/tbOrganTree")
    public List getOrganTbTreeDataListByRoleId(Long tid, Long roleId) {
        return treeService.getOrganTbTreeDataListByRoleId(tid, roleId);
    }

    /**
     * 通过机构获取用户信息，构造树形结构数据（包含当前机构本身）
     *
     * @param organId 机构id
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/getOrganUserByOrganId")
    public List getOrganUserByOrganId(Long organId) {
        return treeService.getOrganUserByOrganId(organId);
    }

//    /**
//     * 组织机构异步树
//     *
//     * @param id    id
//     * @param kind  速度种类
//     * @param topId topId
//     * @return
//     */
//    @ResponseBody
//    @RequestMapping(value = "/getOrganPostUserTreeWithAuth")
//    public List getOrganPostUserTreeWithAuth(Long id, String kind, Long topId, Boolean includeNoOrgan) {
//        return treeService.getOrganPostUserTreeWithAuthAsync(id, kind, topId,includeNoOrgan, getCurrentUserId());
//    }

}
