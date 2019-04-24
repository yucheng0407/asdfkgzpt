package net.ruixin.controller.plat.message;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @author Pitcher
 */
@Controller
@RequestMapping("/message")
public class MessageMapping {
    @RequestMapping("messageTypeList")
    private String messageTypeList() {
        return "plat/message/messageTypeList";
    }

    @RequestMapping("messageTypeAdd")
    private String messageTypeAdd() {
        return "plat/message/messageTypeEdit";
    }

    @RequestMapping("messageTypeEdit")
    private String messageTypeEdit() {
        return "plat/message/messageTypeEdit";
    }

    @RequestMapping("messageList")
    private String messageList() {
        return "plat/message/messageList";
    }

    @RequestMapping("messageEdit")
    private String messageEdit() {
        return "plat/message/messageEdit";
    }

    @RequestMapping("messageTypeView")
    private String messageView() {
        return "plat/message/messageTypeView";
    }
}
