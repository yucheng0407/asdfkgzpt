package net.ruixin.util.workflow.constant;

public enum ProcessDiagram {
    PENDING("pengding","#f55353"),
    SUBMIT("submit","#F89801"),
    RESUBMIT("resubmit","#E8D367"),
    AGREE("agree","#58BC5B"),
    OPPOSE("oppose","#2886C6"),
    REJECT("reject","#700101"),
    REJECTTOSTART("rejectToStart","#A54E4E"),
    RECOVER("recover","#569296"),
    RECOVERTOSTART("recoverToStart","#58A7CB"),
    SIGN_PASS("sign_pass","#6FA547"),
    SIGN_NO_PASS("sign_no_pass","#AFAB3D"),
    ABANDON("abandon","#026670"),
    MANUAL_END("manual_end","#BC79B8"),
    COMPLETE("complete","#5B6956"),
    SUSPEND("suspend","#C33A1F"),
    DEFAULT("default","#999999"),
    START("start","#000000"),
    END("end","#000000"),
    TASK("task","#f2f7fd"),
    EVENTBOUNDARY("eventBoundary","#FFFFFF");

    private String key = "";
    private String color = "";

    private ProcessDiagram(String key,String color) {
        this.key = key;
        this.color = color;
    }

    public String getKey() {
        return this.key;
    }

    public String getColor() {
        return this.color;
    }

    @Override
    public String toString() {
        return this.key;
    }

    public static ProcessDiagram fromKey(String key) {
        ProcessDiagram[] var4;
        int var3 = (var4 = values()).length;

        for(int var2 = 0; var2 < var3; ++var2) {
            ProcessDiagram c = var4[var2];
            if (c.getKey().equalsIgnoreCase(key)) {
                return c;
            }
        }
        return null;
    }
}
