package net.ruixin.util.workflow.constant;

import com.fasterxml.jackson.annotation.JsonValue;

public enum NodeType {
    START("start", "开始节点"),
    END("end", "结束节点"),
    TASK("task", "任务节点"),
    USERTASK("userTask", "用户任务节点"),
    SIGNTASK("signTask", "会签任务节点"),
    SUBPROCESS("subProcess", "子流程"),
    CALLACTIVITY("callActivity", "外部子流程"),
    EXCLUSIVEGATEWAY("exclusivegateway", "分支网关"),
    PARALLELGATEWAY("parallelGateway", "同步网关"),
    INCLUSIVEGATEWAY("inclusiveGateway", "条件网关"),
    SUBSTARTGATEWAY("subStartGateway", "内嵌子流程开始网关"),
    SUBENDGATEWAY("subEndGateway", "内嵌子流程结束网关"),
    SUBMULTISTARTGATEWAY("subMultiStartGateway", "多实例内嵌子流程开始网关"),
    CALLSTARTGATEWAY("callStartGateway", "外部子流程开始网关"),
    CALLENDGATEWAY("callEndGateway", "外部子流程结束网关"),
    CALLMULTISTARTGATEWAY("callMultiStartGateway", "多实例外部子流程开始网关"),
    SERVICETASK("serviceTask", "服务任务节点"),
    SCRIPTTASK("scriptTask", "脚本任务节点"),
    RECEIVETASK("receiveTask", "消息任务节点");

    private String key = "";
    private String value = "";

    private NodeType(String key, String value) {
        this.key = key;
        this.value = value;
    }

    @JsonValue
    public String getKey() {
        return this.key;
    }

    public String getValue() {
        return this.value;
    }

    @Override
    public String toString() {
        return this.key;
    }

    public static NodeType get(String key) {
        NodeType[] var4;
        int var3 = (var4 = values()).length;

        for(int var2 = 0; var2 < var3; ++var2) {
            NodeType c = var4[var2];
            if (c.getKey().equalsIgnoreCase(key)) {
                return c;
            }
        }

        throw new IllegalArgumentException(key);
    }
}
