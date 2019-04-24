package net.ruixin.util.exception;

public class BussinessException extends RuntimeException {

    //友好提示的code码
    private int friendlyCode;

    //友好提示
    private String friendlyMsg;

    //异常详情
    private String detail;

    public BussinessException(String friendlyMsg) {
        super(friendlyMsg);
        this.friendlyMsg = friendlyMsg;
    }

    public BussinessException(BizExceptionEnum bizExceptionEnum){
        super(bizExceptionEnum.getFriendlyMsg());
        this.friendlyMsg=bizExceptionEnum.getFriendlyMsg();
    }

    public BussinessException(String friendlyMsg, String detail) {
        super("系统异常: " + friendlyMsg + ", " + detail);
        this.friendlyMsg = friendlyMsg;
        this.detail = detail;
    }

    public BussinessException(int friendlyCode, String friendlyMsg, String detail) {
        super("系统异常: " + friendlyMsg + ", " + detail);
        this.setValues(friendlyCode, friendlyMsg, detail);
    }

    public BussinessException(BizExceptionEnum bizExceptionEnum, String detail) {
        super("系统异常: " + bizExceptionEnum.getFriendlyMsg() + ", " + detail);
        this.setValues(bizExceptionEnum.getFriendlyCode(),
                bizExceptionEnum.getFriendlyMsg(),
                detail);
    }

    private void setValues(int friendlyCode, String friendlyMsg, String detail) {
        this.friendlyCode = friendlyCode;
        this.friendlyMsg = friendlyMsg;
        this.detail = detail;
    }


    public int getFriendlyCode() {
        return friendlyCode;
    }

    public void setFriendlyCode(int friendlyCode) {
        this.friendlyCode = friendlyCode;
    }

    public String getFriendlyMsg() {
        return friendlyMsg;
    }

    public void setFriendlyMsg(String friendlyMsg) {
        this.friendlyMsg = friendlyMsg;
    }

    public String getDetail() {
        return detail;
    }

    public void setDetail(String detail) {
        this.detail = detail;
    }

    @Override
    public String toString() {
        return "BussinessException{" +
                "friendlyCode=" + friendlyCode +
                ", friendlyMsg='" + friendlyMsg + '\'' +
                ", detail='" + detail + '\'' +
                '}';
    }
}
