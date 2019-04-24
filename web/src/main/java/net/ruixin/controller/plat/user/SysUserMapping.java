package net.ruixin.controller.plat.user;

import net.ruixin.domain.constant.OrganConst;
import net.ruixin.util.cache.Cache;
import net.ruixin.util.cache.CacheKit;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 用户表 路径跳转
 *
 * @author Administrator
 */
@Controller
@RequestMapping("/user")
public class SysUserMapping {

    /**
     * 用户表列表
     */
    @RequestMapping("/sysUserList")
    public String sysUserList() {
        return "plat/user/sysUserList";
    }

    /**
     * 用户编辑表单
     */
    @RequestMapping("/sysUserEdit")
    public String sysUserEdit() {
        String organType = CacheKit.get(Cache.CONFIG, "ORGAN_TYPE").toString().trim();
        switch (organType) {
            case OrganConst.NO_POST_SINGLE_ORGAN:
                return "plat/user/np-so/sysUserEdit_npso";
            case OrganConst.NO_POST_MULTI_ORGAN:
                return "plat/user/np-mo/sysUserEdit_npmo";
            case OrganConst.YES_POST_SINGLE_ORGAN:
                return "plat/user/yp-so/sysUserEdit_ypso";
            case OrganConst.YES_POST_MULTI_ORGAN:
                return "plat/user/yp-mo/sysUserEdit_ypmo";
            default:
                return "plat/user/np-so/sysUserEdit_npso";
        }
    }

    /**
     * 用户新增表单
     */
    @RequestMapping("/sysUserAdd")
    public String sysUserAdd() {
        String organType = CacheKit.get(Cache.CONFIG, "ORGAN_TYPE").toString().trim();
        switch (organType) {
            case OrganConst.NO_POST_SINGLE_ORGAN:
                return "plat/user/np-so/sysUserEdit_npso";
            case OrganConst.NO_POST_MULTI_ORGAN:
                return "plat/user/np-mo/sysUserEdit_npmo";
            case OrganConst.YES_POST_SINGLE_ORGAN:
                return "plat/user/yp-so/sysUserEdit_ypso";
            case OrganConst.YES_POST_MULTI_ORGAN:
                return "plat/user/yp-mo/sysUserEdit_ypmo";
            default:
                return "plat/user/np-so/sysUserEdit_npso";
        }
    }

    /**
     * 用户表查看表单
     */
    @RequestMapping("/sysUserView")
    public String sysUserView() {
        String organType = CacheKit.get(Cache.CONFIG, "ORGAN_TYPE").toString().trim();
        switch (organType) {
            case OrganConst.NO_POST_SINGLE_ORGAN:
                return "plat/user/np-so/sysUserView_npso";
            case OrganConst.NO_POST_MULTI_ORGAN:
                return "plat/user/np-mo/sysUserView_npmo";
            case OrganConst.YES_POST_SINGLE_ORGAN:
                return "plat/user/yp-so/sysUserView_ypso";
            case OrganConst.YES_POST_MULTI_ORGAN:
                return "plat/user/yp-mo/sysUserView_ypmo";
            default:
                return "plat/user/np-so/sysUserView_npso";
        }
    }

    /**
     * 用户表选择列表
     */
    @RequestMapping("/sysUserSelect")
    public String sysUserSelect() {
        return "plat/user/sysUserSelect";
    }

    /**
     * 重置密码
     */
    @RequestMapping("/resetPwd")
    public String resetPwd() {
        return "plat/user/resetPwd";
    }

    /**
     * 用户信息查看
     *
     * @return
     */
    @RequestMapping("/sysUserInfoView")
    public String sysUserInfoView() {
        return "plat/user/info/sysUserInfoView";
    }

    /**
     * 用户信息编辑
     *
     * @return
     */
    @RequestMapping("/sysUserInfoEdit")
    public String sysUserInfoEdit() {
        return "plat/user/info/sysUserInfoEdit";
    }
}
