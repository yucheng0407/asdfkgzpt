package net.ruixin.intercept;

import org.apache.shiro.session.SessionException;

/**
 * Created by Administrator on 2018-1-5.
 */
public class AjaxSessionTimeoutException extends SessionException {
    public AjaxSessionTimeoutException() {
    }

    public AjaxSessionTimeoutException(String message) {
        super(message);
    }

    public AjaxSessionTimeoutException(Throwable cause) {
        super(cause);
    }

    public AjaxSessionTimeoutException(String message, Throwable cause) {
        super(message, cause);
    }
}
