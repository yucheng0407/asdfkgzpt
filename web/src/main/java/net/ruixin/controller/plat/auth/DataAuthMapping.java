package net.ruixin.controller.plat.auth;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 数据权限mapping
 *
 * @author Administrator
 */
@Controller
@RequestMapping("/auth")
public class DataAuthMapping {
    /**
     * 数据权限列表
     */
    @RequestMapping("/dataAuthList")
    public String dataAuthList() {
        return "plat/dataauth/dataAuthList";
    }

    /**
     * 数据权限表单
     */
    @RequestMapping("/dataAuthEdit")
    public String dataAutEdit() {
        return "plat/dataauth/dataAuthEdit";
    }

    /**
     * 数据权限对象数据选择页面
     */
    @RequestMapping("/dataObjSelect")
    public String dataObjSelect() {
        return "plat/dataauth/dataObjSelect";
    }

    /**
     * 批量删除数据权限页面
     */
    @RequestMapping("/batchDelSel")
    public String batchDelSel() {
        return "plat/dataauth/batchDelSel";
    }
}
