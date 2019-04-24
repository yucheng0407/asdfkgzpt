package net.ruixin.controller.gzl;

import net.ruixin.controller.BaseController;
import net.ruixin.domain.constant.OrganConst;
import net.ruixin.domain.gzl.GzlFb;
import net.ruixin.service.gzl.IGzlFbService;
import net.ruixin.service.gzl.IGzlService;
import net.ruixin.service.plat.attachment.IAttachmentService;
import net.ruixin.service.plat.tree.PlatTreeService;
import net.ruixin.util.data.AjaxReturn;
import net.ruixin.util.data.UploadEntity;
import net.ruixin.util.json.JacksonUtil;
import net.ruixin.util.paginate.FastPagination;
import net.ruixin.util.resolver.FormModel;
import net.ruixin.util.resolver.SearchModel;
import net.ruixin.util.shiro.ShiroKit;
import net.ruixin.util.tools.RxStringUtils;
import net.ruixin.util.tree.TreeUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import java.util.*;

/**
 * 工作流 Controller实现
 *
 * @author czq 2019年4月10日15:56:33
 */
@Controller
@RequestMapping("/gzl")
public class GzlController extends BaseController {

    private static final Logger log = LoggerFactory.getLogger(GzlController.class);

    @Autowired
    private IGzlService gzlService;

    @Autowired
    private PlatTreeService treeService;

    /**
     * App 保存工作流(指令下发，线索上报等)
     *
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping(value = "/saveGzlApp", method = RequestMethod.POST)
    public AjaxReturn saveGzlApp(String data, HttpServletRequest request) {
        try {
            MultipartHttpServletRequest multipartHttpServletRequest = (MultipartHttpServletRequest) request;
            //表单除了文件外的参数
            Map<String, String[]> parameterMap = multipartHttpServletRequest.getParameterMap();
            Map<String, Object> formDataMap = new HashMap<>(2);
            for (Map.Entry<String, String[]> entry : parameterMap.entrySet()) {
                formDataMap.put(entry.getKey(), entry.getValue()[0]);
            }
            //表单上传的附件
            MultiValueMap<String, MultipartFile> multiValueMap = multipartHttpServletRequest.getMultiFileMap();
            gzlService.saveGzlApp(formDataMap, multiValueMap);
            return success();
        } catch (Exception e) {
            e.printStackTrace();
            log.error("保存工作流(指令下发，线索上报等)失败", e);
            return error().setMsg(e.getMessage());
        }
    }

    /**
     * 获取移动端工作流表单
     *
     * @param pageNum  页码
     * @param pageSize 页条目
     * @param dataType 数据类型(指令/线索...)
     * @param sjlyzxt  数据来源子系统(数据来源 1-街面防控警务APP指令 ，2-网格防范警务)
     * @param bt       搜索项 标题
     * @return
     */
    @ResponseBody
    @RequestMapping("/getAppGzlListPage")
    public AjaxReturn getAppGzlListPage(int pageNum, int pageSize, String dataType, String sjlyzxt, String bt) {
        try {
            FastPagination fastPagination = gzlService.getAppGzlListPage(pageNum, pageSize, dataType, sjlyzxt, bt);
            return success().setData(fastPagination);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("获取移动端工作流表单分页失败", e);
            return error().setMsg(e.getMessage());
        }
    }

    /**
     * 获取移动端工作流详情
     *
     * @param id
     * @return
     */
    @ResponseBody
    @RequestMapping("/getAppGzlDetail")
    public AjaxReturn getAppGzlDetail(Long id) {
        try {
            return success().setData(gzlService.getAppGzlDetail(id));
        } catch (Exception e) {
            e.printStackTrace();
            log.error("获取移动端工作流详情失败", e);
            return error().setMsg(e.getMessage());
        }
    }

    /**
     * 移动端机构人员树
     *
     * @return
     */
    @ResponseBody
    @RequestMapping("/getAppOrganUser")
    public AjaxReturn getAppOrganUser() {
        try {
            Map rm = new HashMap();
            rm.put("options", TreeUtils.getTreeJson(treeService.getOrganSyncTreeData(OrganConst.ORGAN_USER, null, null), "o_"));
            rm.put("isSingle", false);
            return success().setData(rm);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("获取移动端机构人员树失败", e);
            return error().setMsg(e.getMessage());
        }
    }

    /**
     * 保存移动端工作流发布人继续发布或者反馈
     *
     * @param request
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/saveAppGzlFkFbr", method = RequestMethod.POST)
    public AjaxReturn saveAppGzlFkFbr(HttpServletRequest request) {
        try {
            MultipartHttpServletRequest multipartHttpServletRequest = (MultipartHttpServletRequest) request;
            //文本信息内容，包含区别继续发布和反馈的属性
            Map<String, String[]> parameterMap = multipartHttpServletRequest.getParameterMap();
            Map<String, Object> textMessage = new HashMap<>(2);
            for (Map.Entry<String, String[]> entry : parameterMap.entrySet()) {
                textMessage.put(entry.getKey(), entry.getValue()[0]);
            }
            //文件信息内容
            MultiValueMap<String, MultipartFile> multiValueMap = multipartHttpServletRequest.getMultiFileMap();
            Long jsId = null;
            if (textMessage.containsKey("jsId")) {
                jsId = Long.parseLong(textMessage.get("jsId").toString());
            }
            if (null != jsId) {
                gzlService.saveAppGzlFk(jsId, textMessage, multiValueMap);
            } else {
                Long fbId = Long.parseLong(textMessage.get("fbId").toString());
                gzlService.saveAppGzlJxFb(fbId, textMessage, multiValueMap);
            }
            return success();
        } catch (Exception e) {
            e.printStackTrace();
            log.error("保存移动端工作流发布人继续发布或者反馈失败", e);
            return error().setMsg(e.getMessage());
        }
    }

    /**
     * 保存移动端工作流接收人反馈
     *
     * @param request
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/saveAppGzlFkJsr", method = RequestMethod.POST)
    public AjaxReturn saveAppGzlFkJsr(HttpServletRequest request) {
        try {
            MultipartHttpServletRequest multipartHttpServletRequest = (MultipartHttpServletRequest) request;
            //文本信息内容，包含区别继续发布和反馈的属性
            Map<String, String[]> parameterMap = multipartHttpServletRequest.getParameterMap();
            Map<String, Object> textMessage = new HashMap<>(2);
            for (Map.Entry<String, String[]> entry : parameterMap.entrySet()) {
                textMessage.put(entry.getKey(), entry.getValue()[0]);
            }
            //文件信息内容
            MultiValueMap<String, MultipartFile> multiValueMap = multipartHttpServletRequest.getMultiFileMap();
            Long fbId = Long.parseLong(textMessage.get("fbId").toString());
            Long jsId = gzlService.getGzlJsId(fbId);
            gzlService.saveAppGzlFk(jsId, textMessage, multiValueMap);
            return success();
        } catch (Exception e) {
            e.printStackTrace();
            log.error("保存移动端工作流发布人继续发布或者反馈失败", e);
            return error().setMsg(e.getMessage());
        }
    }

}
