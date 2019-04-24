package net.ruixin.util.workflow.draw.bpmn;

public enum BPMNShapType {
    TASK("task"),
    USER_TASK("userTask"),
    SCRIPT_TASK("scriptTask"),
    SERVICE_TASK("serviceTask"),
    BUSINESS_RULE_TASK("bnusinessRuleTask"),
    MANUAL_TASK("manualTask"),
    SEND_TASK("sendTask"),
    RECEIVE_TASK("receiveTask"),
    SUB_PROCESS("subProcess"),
    CALL_ACTIVITY("callActivity"),
    AD_HOC_SUB_PROCESS("AdHocSubProcess"),
    H_POOL("hPool"),
    V_POOL("vPool"),
    H_LANE("hLane"),
    V_LANE("vLane"),
    START_EVENT("startEvent"),
    END_EVENT("endEvent"),
    CANCEL_EVENT("cancelEvent"),
    ERROR_EVENT("errorEvent"),
    INTERMEDIATE_CATCH_EVENT("intermediateCatchEvent"),
    PARALLEL_GATEWAY("parallelGateway"),
    EXCLUSIVE_GATEWAY("exclusiveGateway"),
    INCLUSIVE_GATEWAY("inclusiveGateway"),
    COMPLEX_GATEWAY("complexGateway"),
    EVENT_BASED_GATEWAY("eventBasedGateway"),
    TRANSACTION("transaction"),
    TEXT_ANNOTATION("textAnnotation"),
    UNKNOW_TYPE("unknowType");

    private String key;

    private BPMNShapType(String key) {
        this.key = key;
    }

    public String getKey() {
        return this.key;
    }
}

