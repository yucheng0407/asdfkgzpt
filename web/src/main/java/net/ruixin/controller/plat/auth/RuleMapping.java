package net.ruixin.controller.plat.auth;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by admin on 2016-9-22.
 * 权限控制类——控制规则、功能权限、数据权限
 */
@Controller
@RequestMapping("/rule")
@SuppressWarnings("all")
public class RuleMapping {
    //规则列表
    @RequestMapping("/ruleList")
    public String authRuleList() {
        return "plat/rule/ruleList";
    }

    //规则新增
    @RequestMapping("/ruleAdd")
    public String ruleAdd() {
        return "plat/rule/ruleEdit";
    }

    //规则修改
    @RequestMapping("/ruleEdit")
    public String ruleEdit() {
        return "plat/rule/ruleEdit";
    }

    //规则查看
    @RequestMapping("/ruleView")
    public String authRuleView() {
        return "plat/rule/ruleView";
    }

    //规则选择
    @RequestMapping("/ruleSelect")
    public String authRuleSelect() {
        return "plat/rule/ruleSelect";
    }

    //提示信息
    @RequestMapping("/commonMsg")
    public String commonMsg() {
        return "plat/rule/commonMsg";
    }
}
