package net.ruixin.controller.jmfk;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 *防控安排表 路径跳转
 */
@Controller
@RequestMapping("/jmfk")
public class FkapRwdMapping {
    /**
     * 防控安排表列表
     */
    @RequestMapping("/fkapRwdList")
    public String fkapRwdList() { return "jmfk/fkap/fkapRwdList";}

    /**
     * 巡区列表
     * */
    @RequestMapping("/getXq")
    public String xqList() { return "jmfk/fkap/xqList";}


    /**
     * 设备列表
     * */
    @RequestMapping("/getDeviceInfomation")
    public String deviceList() { return "jmfk/fkap/deviceList";}


    /**
     * 重防巡区
     * */
    @RequestMapping("/getZfxq")
    public String getZfxq() { return "jmfk/fkap/zfList";}
    /**
     * 防控安排表表单
     */
    @RequestMapping("/fkapRwdEdit")
    public String fkapRwdEdit() { return "/jmfk/fkap/fkapRwdEdit";}

    /**
     * 防控安排表查看表单
     */
    @RequestMapping("/fkapRwdView")
    public String fkapRwdView() { return "jmfk/fkap/fkapRwdView";}
}
