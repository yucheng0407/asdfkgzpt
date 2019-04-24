package net.ruixin.controller.qzld;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 情指联动_防控指令 路径跳转
 */
@Controller
@RequestMapping("/fkzl")
public class FkzlMapping {
    /**
     * 防控指令-指令列表
     */
    @RequestMapping("/fkzlPage")
    public String fkzlPage() {
        return "qzld/fkzl/zl/fkzlPage";
    }

    /**
     * 防控指令-历史指令
     */
    @RequestMapping("/fkzlList")
    public String fkzlList() {
        return "qzld/fkzl/zl/fkzlList";
    }

    /**
     * 防控指令-指令容器
     */
    @RequestMapping("/fkzlEdit")
    public String fkzlEdit() {
        return "qzld/fkzl/zl/fkzlEdit";
    }

    /**
     * 防控指令-反馈
     */
    @RequestMapping("/fkzlFkPage")
    public String fkzlFkPage() {
        return "qzld/fkzl/fk/fkzlFkPage";
    }
    /**
     * 防控指令-反馈列表
     */
    @RequestMapping("/fkzlFkList")
    public String fkzlFkList() {
        return "qzld/fkzl/fk/fkzlFkList";
    }
    /**
     * 防控指令-反馈详情
     */
    @RequestMapping("/fkzlFkDetail")
    public String fkzlFkDetail() {
        return "qzld/fkzl/fk/fkzlFkDetail";
    }

    /**
     * 防控指令-警情
     */
    @RequestMapping("/fkzlJqPage")
    public String fkzlJqPage() {
        return "qzld/fkzl/jq/fkzlJqPage";
    }
    /**
     * 防控指令-警情列表
     */
    @RequestMapping("/fkzlJqList")
    public String fkzlJqList() {
        return "qzld/fkzl/jq/fkzlJqList";
    }
    /**
     * 防控指令-警情详情
     */
    @RequestMapping("/fkzlJqDetail")
    public String fkzlJqDetail() {
        return "qzld/fkzl/jq/fkzlJqDetail";
    }


    /**
     * 防控指令-发送指令
     */
    @RequestMapping("/fkzlSend")
    public String fkzlSend() {
        return "qzld/fkzl/zl/fkzlSend";
    }

    /**
     * 防控指令-发送指令-按区域
     */
    @RequestMapping("/fkzlSend/region")
    public String fkzlSendByRegion() {
        return "qzld/fkzl/zl/fkzlSendByRegion";
    }

    /**
     * 防控指令-发送指令-按单位
     */
    @RequestMapping("/fkzlSend/org")
    public String fkzlSendByOrg() {
        return "qzld/fkzl/zl/fkzlSendByOrg";
    }


    /**
     * 防控指令-发送指令-按人员
     */
    @RequestMapping("/fkzlSend/person")
    public String fkzlSendByPerson() {
        return "qzld/fkzl/zl/fkzlSendByPerson";
    }

    /**
     * 防控指令-历史指令
     */
    @RequestMapping("/history")
    public String fkzlHistory() {
        return "qzld/fkzl/zl/fkzlHistory";
    }

}
