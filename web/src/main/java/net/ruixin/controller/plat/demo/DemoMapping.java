package net.ruixin.controller.plat.demo;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by pitcher on 2017/5/18.
 */
@Controller
@RequestMapping("/demo")
public class DemoMapping {
    /**
     * 用户案例列表
     *
     * @return
     */
    @RequestMapping(value = "/demoUserList")
    public String demoList() {
        return "plat/demo/demoUserList";
    }

    /**
     * 用户案例表单
     *
     * @return
     */
    @RequestMapping(value = "/demoUserEdit")
    public String demoUserEdit() {
        return "plat/demo/demoUserEdit";
    }

    /**
     * 用户选择
     *
     * @return
     */
    @RequestMapping(value = "/demoUserSelect")
    public String demoUserSelect() {
        return "plat/demo/demoUserSelect";
    }

    /**
     * 机构选择列表
     *
     * @return
     */
    @RequestMapping(value = "/demoOrganSelect")
    public String demoOrganSelect() {
        return "plat/demo/demoOrganSelect";
    }

    /**
     * 机构案例列表
     *
     * @return
     */
    @RequestMapping(value = "/demoOrganList")
    public String demoOrganList() {
        return "plat/demo/demoOrganList";
    }

    /**
     * 机构案例表单
     *
     * @return
     */
    @RequestMapping(value = "/demoOrganEdit")
    public String demoOrganEdit() {
        return "plat/demo/demoOrganEdit";
    }

    /**
     * 验证表单
     *
     * @return
     */
    @RequestMapping(value = "/demoValidate")
    public String demoValidate() {
        return "plat/demo/demoValidate";
    }

    @RequestMapping(value = "/tplDomDemo")
    public String tplDomDemo() {
        return "plat/demo/tplDomDemo";
    }

    @RequestMapping(value = "/tabdemo")
    public String tabdemo() {
        return "plat/demo/tabdemo";
    }

    @RequestMapping(value = "/tabdemo2")
    public String tabdemo2() {
        return "plat/demo/tabdemo2";
    }

    @RequestMapping(value = "/demoAttachment")
    public String demoAttachment() {
        return "plat/demo/demoAttachment";
    }

    @RequestMapping(value = "/textFormDemo")
    public String textFormDemo() {
        return "plat/demo/textFormDemo";
    }

    @RequestMapping(value = "/newrxTest")
    public String newrxTest() {
        return "plat/demo/newrxTest";
    }

    /**
     * 引入layerDate，日期测试
     */
    @RequestMapping(value = "/testlayerDate")
    public String testlayerDate() {
        return "plat/demo/testlayerDate";
    }

    /**
     * 测试表单渲染
     */
    @RequestMapping(value = "/testFormRender")
    public String testFormRender() {
        return "plat/demo/testTablePage";
    }

    /**
     * 测试table
     */
    @RequestMapping(value = "/testRxTableList")
    public String testRxTableList() {
        return "plat/demo/testRxTableList";
    }

    /**
     * 门户
     */
    @RequestMapping(value = "/mh")
    public String mh() {
        return "plat/demo/ui/mh";
    }

    /**
     * 分步表单
     */
    @RequestMapping(value = "/fbbd")
    public String fbbd() {
        return "plat/demo/ui/fbbd";
    }

    /**
     * 卡片列表
     */
    @RequestMapping(value = "/cardList")
    public String cardList() {
        return "plat/demo/ui/cardList";
    }

    /**
     * 导航列表
     */
    @RequestMapping(value = "/dhList")
    public String dhList() {
        return "plat/demo/ui/dhList";
    }

    /**
     * 统计列表
     */
    @RequestMapping(value = "/tjList")
    public String tjList() {
        return "plat/demo/ui/tjList";
    }

    /**
     * 案例描述
     */
    @RequestMapping(value = "/demoUserDesc")
    public String demoUserDesc() {
        return "plat/demo/demoUserDesc";
    }

    /**
     * 字典案例列表
     *
     * @return
     */
    @RequestMapping(value = "/demoDictList")
    public String demoDictList() {
        return "plat/demo/demoDictList";
    }

    /**
     * 字典案例列表
     *
     * @return
     */
    @RequestMapping(value = "/demoDictEdit")
    public String demoDictEdit() {
        return "plat/demo/demoDictEdit";
    }

    @RequestMapping(value = "/gridCmptDemo")
    public String gridCmptDemo() {
        return "plat/demo/cmpt/gridCmptDemo";
    }

    @RequestMapping(value = "/autoGridCmptDemo")
    public String autoGridCmptDemo() {
        return "plat/demo/cmpt/autoGridCmptDemo";
    }

    @RequestMapping(value = "/dataGridCmptDemo")
    public String dataGridCmptDemo() {
        return "plat/demo/cmpt/dataGridCmptDemo";
    }

    @RequestMapping(value = "/formCmptDemo")
    public String formCmptDemo() {
        return "plat/demo/cmpt/formCmptDemo";
    }

    @RequestMapping(value = "/cmptDemoUserList")
    public String cmptDemoUserList() {
        return "plat/demo/cmpt/cmptDemoUserList";
    }

    @RequestMapping(value = "/cmptDemoUserEdit")
    public String cmptDemoUserEdit() {
        return "plat/demo/cmpt/cmptDemoUserEdit";
    }

    @RequestMapping(value = "/cmptDemoUserView")
    public String cmptDemoUserView() {
        return "plat/demo/cmpt/cmptDemoUserView";
    }

    @RequestMapping(value = "/cmptDemoOrganSelect")
    public String cmptDemoOrganSelect() {
        return "plat/demo/cmpt/cmptDemoOrganSelect";
    }

    @RequestMapping(value = "/cmptDemoOrganList")
    public String cmptDemoOrganList() {
        return "plat/demo/cmpt/cmptDemoOrganList";
    }

    @RequestMapping(value = "/cmptDemoOrganEdit")
    public String cmptDemoOrganEdit() {
        return "plat/demo/cmpt/cmptDemoOrganEdit";
    }

    @RequestMapping(value = "/cmptDemoOrganView")
    public String cmptDemoOrganView() {
        return "plat/demo/cmpt/cmptDemoOrganView";
    }

    @RequestMapping(value = "/cmptDemoUserSelect")
    public String cmptDemoUserSelect() {
        return "plat/demo/cmpt/cmptDemoUserSelect";
    }

    @RequestMapping(value = "cmptConfigTypeShow")
    public String cmptConfigTypeShow() {
        return "plat/demo/cmpt/cmptConfigTypeShow";
    }

    @RequestMapping(value = "statisticDataList")
    public String statisticDataList() {
        return "plat/demo/cmpt/statisticDataList";
    }
}
