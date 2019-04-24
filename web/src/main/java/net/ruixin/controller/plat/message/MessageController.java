package net.ruixin.controller.plat.message;

import net.ruixin.controller.BaseController;
import net.ruixin.domain.plat.message.Message;
import net.ruixin.service.plat.message.IMessageService;
import net.ruixin.util.data.AjaxReturn;
import net.ruixin.util.resolver.FormModel;
import net.ruixin.util.resolver.SearchModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Map;

/**
 * @author Pitcher
 */
@Controller
@RequestMapping("/message")
@SuppressWarnings("unchecked")
public class MessageController extends BaseController {
    @Autowired
    private IMessageService messageService;

    @ResponseBody
    @RequestMapping("/generateMessage")
    public AjaxReturn generateMessage(@FormModel Message message) {

        messageService.generateMessage(message.getSendUserIds(), message.getTypeCode(), message.getTitle(), message.getContent(), "param");
        return success();
    }

    @ResponseBody
    @RequestMapping("/getMessagePage")
    public AjaxReturn getMessagePage(@SearchModel Object map) {
        return success().setData(messageService.getMessagePage((Map) map));
    }

    @ResponseBody
    @RequestMapping("/getMessageList")
    public AjaxReturn getMessageList() {
        return success().setData(messageService.getMessageList());
    }

    @ResponseBody
    @RequestMapping("/readMessage")
    public AjaxReturn readMessage(Long messageId) {
        messageService.readMessage(messageId);
        return success();
    }

//    @ResponseBody
//    @RequestMapping("/getMessageViewById")
//    public AjaxReturn getMessageViewById(Long messageId) {
//        return success().setData(messageService.getMessageViewById(messageId));
//    }

}
