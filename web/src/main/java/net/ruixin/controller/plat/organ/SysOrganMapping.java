package net.ruixin.controller.plat.organ;

import net.ruixin.domain.constant.OrganConst;
import net.ruixin.util.cache.Cache;
import net.ruixin.util.cache.CacheKit;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 机构表 路径跳转
 *
 * @author Administrator
 */
@Controller
@RequestMapping("/organ")
public class SysOrganMapping {

    /**
     * 机构表列表
     */
    @RequestMapping("/sysOrganList")
    public String sysOrganList() {
        return "plat/organ/sysOrganList";
    }

    /**
     * 机构表编辑表单
     */
    @RequestMapping("/sysOrganEdit")
    public String sysOrganEdit() {
        String organType = CacheKit.get(Cache.CONFIG, "ORGAN_TYPE").toString().trim();
        switch (organType) {
            case OrganConst.YES_POST_MULTI_ORGAN:
            case OrganConst.YES_POST_SINGLE_ORGAN:
                return "plat/organ/haspost/sysOrganEdit";
            case OrganConst.NO_POST_MULTI_ORGAN:
            case OrganConst.NO_POST_SINGLE_ORGAN:
                return "plat/organ/nopost/sysOrganEdit_nopost";
            default:
                return "plat/organ/nopost/sysOrganEdit_nopost";
        }
    }

    /**
     * 机构新增表单
     */
    @RequestMapping("/sysOrganAdd")
    public String sysOrganAdd() {
        String organType = CacheKit.get(Cache.CONFIG, "ORGAN_TYPE").toString().trim();
        switch (organType) {
            case OrganConst.YES_POST_MULTI_ORGAN:
            case OrganConst.YES_POST_SINGLE_ORGAN:
                return "plat/organ/haspost/sysOrganEdit";
            case OrganConst.NO_POST_MULTI_ORGAN:
            case OrganConst.NO_POST_SINGLE_ORGAN:
                return "plat/organ/nopost/sysOrganEdit_nopost";
            default:
                return "plat/organ/nopost/sysOrganEdit_nopost";
        }
    }

    /**
     * 机构表查看表单
     */
    @RequestMapping("/sysOrganView")
    public String sysOrganView() {
        String organType = CacheKit.get(Cache.CONFIG, "ORGAN_TYPE").toString().trim();
        switch (organType) {
            case OrganConst.YES_POST_MULTI_ORGAN:
            case OrganConst.YES_POST_SINGLE_ORGAN:
                return "plat/organ/haspost/sysOrganView";
            case OrganConst.NO_POST_MULTI_ORGAN:
            case OrganConst.NO_POST_SINGLE_ORGAN:
                return "plat/organ/nopost/sysOrganView_nopost";
            default:
                return "plat/organ/nopost/sysOrganView_nopost";
        }
    }

    /**
     * 组织机构关联信息
     *
     * @return
     */
    @RequestMapping("/sysOrganLinkList")
    public String sysOrganLinkList() {
        return "plat/organ/sysOrganLinkList";
    }

    /**
     * 组织机构树
     *
     * @return
     */
    @RequestMapping("/organTree")
    public String organTree() {
        return "plat/tree/organTree";
    }


}
