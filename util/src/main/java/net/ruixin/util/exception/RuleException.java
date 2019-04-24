package net.ruixin.util.exception;

public class RuleException extends BussinessException {
    public RuleException(String friendlyMsg) {
        super(friendlyMsg);
    }

    public RuleException(String friendlyMsg, String detail) {
        super(friendlyMsg, detail);
    }

    public RuleException(int friendlyCode, String friendlyMsg, String detail) {
        super(friendlyCode, friendlyMsg, detail);
    }

    public RuleException(BizExceptionEnum bizExceptionEnum, String detail) {
        super(bizExceptionEnum, detail);
    }
}

