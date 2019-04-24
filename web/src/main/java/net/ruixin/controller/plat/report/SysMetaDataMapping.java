package net.ruixin.controller.plat.report;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 *元数据 路径跳转
 */
@Controller
@RequestMapping("/report")
public class SysMetaDataMapping {
    /**
     * 元数据列表
     */
    @RequestMapping("/sysMetaDataList")
    public String sysMetaDataList() { return "plat/report/sysMetaDataList";}

    /**
     * 元数据表单
     */
    @RequestMapping("/sysMetaDataEdit")
    public String sysMetaDataEdit() { return "plat/report/sysMetaDataEdit";}

    /**
     * 元数据查看表单
     */
    @RequestMapping("/sysMetaDataView")
    public String sysMetaDataView() { return "plat/report/sysMetaDataView";}

    /**
     * 元数据细节选择
     */
    @RequestMapping("/sysMetaDataDetailSelect")
    public String sysMetaDataDetailSelect() { return "plat/report/sysMetaDataDetailSelect";}

    /**
     * 新增视图编辑
     */
    @RequestMapping("/dataViewEdit")
    public String dataViewEdit() { return "plat/report/dataViewEdit";}

    /**
     * 元数据选择
     */
    @RequestMapping("/sysMetaDataSelect")
    public String sysMetaDataSelect() { return "plat/report/sysMetaDataSelect";}
    /**
     * 元数据预览
     */
    @RequestMapping("/metaDataPreview")
    public String metaDataPreview() { return "plat/report/metaDataPreview";}

}
