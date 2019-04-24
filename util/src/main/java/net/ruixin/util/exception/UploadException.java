package net.ruixin.util.exception;

public class UploadException extends BussinessException {
    public UploadException(String friendlyMsg, String detail) {
        super(friendlyMsg, detail);
    }

    public UploadException(int friendlyCode, String friendlyMsg, String detail) {
        super(friendlyCode, friendlyMsg, detail);
    }

    public UploadException(BizExceptionEnum bizExceptionEnum, String detail) {
        super(bizExceptionEnum, detail);
    }
}
