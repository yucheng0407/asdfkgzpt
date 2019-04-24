package net.ruixin.controller.plat.organ;

import net.ruixin.controller.BaseController;
import net.ruixin.domain.plat.organ.SysUser;
import net.ruixin.service.plat.log.aop.BussinessLog;
import net.ruixin.service.plat.organ.IOrganService;
import net.ruixin.service.plat.organ.IUserService;
import net.ruixin.util.data.AjaxReturn;
import net.ruixin.util.exception.RuleException;
import net.ruixin.util.paginate.FastPagination;
import net.ruixin.util.resolver.FormModel;
import net.ruixin.util.resolver.SearchModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Map;

/**
 * @author admin
 * @date 2016-8-17
 * 用户控制层
 */
@Controller
@RequestMapping("/user")
public class UserHandler extends BaseController {

    @Autowired
    private IUserService userService;
    @Autowired
    private IOrganService organService;

    /**
     * 查询用户列表
     *
     * @param map 查询条件
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping(value = "/getSysUserListPage")
    public AjaxReturn getSysUserListPage(@SearchModel Object map) {
        FastPagination fastPagination = userService.getUserPageList((Map) map);
        return new AjaxReturn().setSuccess(true).setData(fastPagination);
    }

    /**
     * 保存用户信息
     *
     * @param sysUser 用户信息
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping(value = "/saveSysUser")
    @BussinessLog(value = "用户变更")
    public AjaxReturn saveSysUser(@FormModel SysUser sysUser) {
        try {
            userService.saveUser(sysUser);
            return success().setData(sysUser.getId());
        } catch (RuleException e) {
            return error().setMsg(e.getFriendlyMsg());
        }
    }

    /**
     * 根据ID查询用户信息
     *
     * @param id 用户ID
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping(value = "/getSysUserById")
    public AjaxReturn getSysUserById(Long id) {
        return success().setData(userService.getUserById(id));
    }


    /**
     * 删除用户
     *
     * @param userId 用户id
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping(value = "/delSysUser")
    @BussinessLog(value = "用户删除")
    public AjaxReturn delSysUser(Long userId) {
        userService.delUser(userId);
        return success();
    }

    /**
     * 查询获取用户关联角色信息
     *
     * @param id 用户id
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping(value = "/userGlxx")
    public AjaxReturn getUserGlxx(Long id) {
        Map map = userService.getUserGlxx(id);
        return new AjaxReturn().setSuccess(true).setData(map);
    }

    /**
     * 封锁用户
     *
     * @param userId 用户id
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/blockUser")
    @BussinessLog(value = "用户封锁")
    public AjaxReturn blockUser(Long userId) {
        userService.blockUser(userId);
        return success();
    }

    /**
     * 解锁用户
     *
     * @param userId 用户id
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/unblockUser")
    @BussinessLog(value = "用户解锁")
    public AjaxReturn unblockUser(Long userId) {
        userService.unblockUser(userId);
        return success();
    }

    /**
     * 获取用户角色
     *
     * @param type 类型
     * @param ids
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/getLinkRole")
    public AjaxReturn getLinkRole(String type, String ids) {
        switch (type) {
            case "organ":
                return success().setData(organService.getOrgansGlxx(ids));
            //TODO
//            case "post":
//                return success().setData(postService.getPostsGlxx(ids));
            default:
                return error();
        }
    }

    /**
     * 获取用户角色
     *
     * @param ids 机构ids
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/getOrgansLinkRole")
    public AjaxReturn getOrgansLinkRole(String ids) {
        return success().setData(organService.getOrgansLinkRole(ids));
    }

    /**
     * 获取没有关联过管理员的用户
     *
     * @param map
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/getNoAdminUserList")
    public AjaxReturn getNoAdminUserList(@SearchModel Object map) {
        return success().setData(userService.getNoAdminUserList((Map) map));
    }


}
