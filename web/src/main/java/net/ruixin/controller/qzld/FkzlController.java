package net.ruixin.controller.qzld;

import net.ruixin.controller.BaseController;
import net.ruixin.domain.qzld.FkzlSend;
import net.ruixin.service.qzld.IFkzlService;
import net.ruixin.util.data.AjaxReturn;
import net.ruixin.util.resolver.SearchModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Map;

@Controller
@RequestMapping("/fkzl")
public class FkzlController extends BaseController {

    @Autowired
    private IFkzlService fkzlService;

    /**
     * 获取防控指令-反馈分页列表
     *
     * @param map 查询条件
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping("/getFkzlFkList")
    public AjaxReturn getFkzlFkList(@SearchModel Object map) {
        return success().setData(fkzlService.getFkzlFkList((Map) map));
    }

    /**
     * 设置信息已读
     *
     * @param fbid  工作流-发布的主键ID
     * @param jsid  工作流-接收表的主键ID
     * @param sfkhf 是否可回复 0-不可回复，读互联网端数据；1-可回复，读公安网端数据
     * @return
     */
    @ResponseBody
    @RequestMapping("/setRead")
    public AjaxReturn setRead(String fbid, String jsid, String sfkhf) {
        fkzlService.setRead(fbid, jsid, sfkhf);
        return success();
    }

    /**
     * 获取反馈详细信息
     *
     * @param fbid  工作流-发布的主键ID
     * @param sfkhf 是否可回复 0-不可回复，读互联网端数据；1-可回复，读公安网端数据
     * @return
     */
    @ResponseBody
    @RequestMapping("/getFkzlFkDetail")
    public AjaxReturn getFkzlFkDetail(Long fbid, String sfkhf) {
        return success().setData(fkzlService.getFkzlFkDetail(fbid, sfkhf));
    }

    /**
     *
     * @param fkzlSend
     * @return
     */
    @ResponseBody
    @RequestMapping("/sendFkzl")
    public AjaxReturn sendFkzl(@RequestBody FkzlSend fkzlSend){
        try{
            return success().setData(fkzlService.sendFkzl(fkzlSend));
        }catch(Exception e){
            return error().setMsg(e.getMessage());
        }

    }
    /**
     *
     * @param
     * @return
     */
    @ResponseBody
    @RequestMapping("/getXzqh")
    public AjaxReturn getXzqh(){
        try{
            return success().setData(fkzlService.getXzqh());
        }catch(Exception e){
            return error().setMsg(e.getMessage());
        }

    }
}
