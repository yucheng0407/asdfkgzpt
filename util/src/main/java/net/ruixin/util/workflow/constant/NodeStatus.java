package net.ruixin.util.workflow.constant;

public enum NodeStatus {
    PENDING("pending", "待审批", "#2886C6", 1),
    START("submit", "提交", "#F89801", 2),
    RE_SUBMIT("resubmit", "重新提交", "#E8D367", 3),
    AGREE("agree", "同意", "#58BC5B", 4),
    OPPOSE("oppose", "反对", "#2886C6", 5),
    REJECT("reject", "驳回", "#F55353", 6),
    REJECT_TO_START("rejectToStart", "驳回到发起人", "#A54E4E", 7),
    REVOKE("revoke", "撤销", "#569296", 8),
    RECOVER_TO_START("recoverToStart", "撤销到发起人", "#58A7CB", 9),
    SIGN_PASS("sign_pass", "会签通过", "#6FA547", 10),
    SIGN_NO_PASS("sign_no_pass", "会签不通过", "#AFAB3D", 11),
    ABANDON("abandon", "弃权", "#026670", 12),
    MANUAL_END("manual_end", "人工终止", "#BC79B8", 13),
    COMPLETE("complete", "完成", "#5B6956", 14),
    SUSPEND("suspend", "挂起", "#C33A1F", 15),
    SIGN_BACK_CANCEL("signBackCancel", "驳回取消", "#C33A1F", 16),
    SIGN_RECOVER_CANCEL("signRecoverCancel", "撤销取消", "#C33A1F", 17),
    AGREE_SIGN_PASS_CANCEL("passCancel", "通过取消", "#C33A1F", 18),
    OPPOSE_SIGN_NOPASS_CANCEL("notPassCancel", "不通过取消", "#C33A1F", 19),
    TRANS_FORMING("transforming", "流转中", "#C33A1F", 20),
    TRANS_AGREE("transAgree", "流转同意", "#C33A1F", 21),
    TRANS_OPPOSE("transOppose", "流转反对", "#C33A1F", 22),
    SKIP("skip", "跳过执行", "#C33A1F", 23),
    CALL_SUB_PROC("callSubProc", "外部子流程", "#C33A1F", 24),
    AUTOTASK("autoTask", "自动节点", "#C33A1A", 25);

    private String key = "";
    private String value = "";
    private String color = "";
    private Integer order = 0;

    private NodeStatus(String key, String value, String color, Integer order) {
        this.key = key;
        this.value = value;
        this.color = color;
        this.order = order;
    }

    public String getKey() {
        return this.key;
    }

    public String getValue() {
        return this.value;
    }

    public String getColor() {
        return this.color;
    }

    public Integer getOrder() {
        return this.order;
    }

    @Override
    public String toString() {
        return this.key;
    }

    public static NodeStatus fromKey(String key) {
        NodeStatus[] var4;
        int var3 = (var4 = values()).length;

        for(int var2 = 0; var2 < var3; ++var2) {
            NodeStatus c = var4[var2];
            if (c.getKey().equalsIgnoreCase(key)) {
                return c;
            }
        }

        throw new IllegalArgumentException(key);
    }
}