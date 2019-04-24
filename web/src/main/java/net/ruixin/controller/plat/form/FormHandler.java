package net.ruixin.controller.plat.form;

import net.ruixin.TranslateUtil;
import net.ruixin.controller.BaseController;
import net.ruixin.domain.plat.form.FormDef;
import net.ruixin.service.plat.form.IFormService;
import net.ruixin.util.data.AjaxReturn;
import net.ruixin.util.paginate.FastPagination;
import net.ruixin.util.resolver.FormModel;
import net.ruixin.util.resolver.SearchModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


/**
 * 表单设计控制层
 */
@Controller
@RequestMapping("/form")
public class FormHandler extends BaseController {

    @Autowired
    private IFormService formService;

    /**
     * 保存表单设计
     *
     * @param formDef 表单设计实体
     * @return
     */
    @ResponseBody
    @RequestMapping("/saveFormDef")
    public AjaxReturn saveFormDef(@FormModel FormDef formDef, Boolean fbFlg) {
        //验证code是否超出限制
        String preName = formDef.getPreName();
        if (formDef.getKey().length() >= 27) {
            return error().setMsg("表单key长度超出限制，最长为26个字符");
        } else {
            if (fbFlg) {
                return success().setData(formService.saveAndFbForm(formDef));
            } else {
                return success().setData(formService.saveFormDef(formDef, fbFlg));
            }
        }

    }

    /**
     * 根据id获取表单
     *
     * @param id
     * @return
     */
    @ResponseBody
    @RequestMapping("/getFormDef")
    public AjaxReturn getFormDef(Long id) {
        return success().setData(formService.getFormDef(id));
    }

    /**
     * 获取表单list
     *
     * @param map
     * @return
     */
    @ResponseBody
    @RequestMapping("/getFormDefList")
    public AjaxReturn getFormDefList(@SearchModel Object map) {
        FastPagination fastPagination = formService.getFormDefList((Map) map);
        return success().setData(fastPagination);
    }

    /**
     * 删除
     *
     * @param id
     * @return
     */
    @ResponseBody
    @RequestMapping("/delFormDef")
    public AjaxReturn delFormDef(Long id) {
        formService.delFormDef(id);
        return success();
    }

    /**
     * 保存表单数据
     *
     * @param dataJson
     * @param formId
     * @return
     */
    @ResponseBody
    @RequestMapping("/saveFormData")
    public AjaxReturn saveFormData(String dataJson, Long formId) {
        return success().setData(formService.saveFormData(formId, dataJson));
    }

    /**
     * 删除form的data
     *
     * @param id     数据id
     * @param formId 表单id
     * @return
     */
    @ResponseBody
    @RequestMapping("/delFormData")
    public AjaxReturn delFormData(Long id, Long formId) {
        formService.delFormData(id, formId);
        return success();
    }


    /**
     * 批量删除
     * @param ids
     * @param formId
     */
    @ResponseBody
    @RequestMapping("/deleteBatchFormData")
    public AjaxReturn deleteBatchFormData(String ids, Long formId) {
        formService.deleteBatch(ids, formId);
        return success();
    }


    /**
     * 批量审核方法
     * @param ids
     * @param formId
     * @param shzt
     * @return
     */
    @ResponseBody
    @RequestMapping("/shBatchFormData")
    public AjaxReturn shBatchFormData(String ids, Long formId,String shzt) {
        formService.shBatchFormData(ids, formId,shzt);
        return success();
    }

    /**
     * 获取表单数据
     *
     * @param id
     * @param formId
     * @return
     */
    @ResponseBody
    @RequestMapping("/getFormData")
    public AjaxReturn getFormData(Long id, Long formId) {
        return success().setData(formService.getFormData(formId, id));
    }

    /**
     * 获取表单数据
     *
     * @param id
     * @param formId
     * @return
     */
    @ResponseBody
    @RequestMapping("/getFormDataWz")
    public AjaxReturn getFormDataWz(Long id, Long formId) {
        return success().setData(formService.getFormDataWz(formId, id));
    }

    /**
     * 获取表单数据list
     *
     * @param map
     * @return
     */
    @ResponseBody
    @RequestMapping("/getFormDataList")
    public AjaxReturn getFormDataList(@SearchModel Object map) {
        return success().setData(formService.getFormDataList((Map) map));
    }

    /**
     * 获取表单数据list
     *
     * @param map
     * @return
     */
    @ResponseBody
    @RequestMapping("/getFormDataList2")
    public AjaxReturn getFormDataList2(@SearchModel Object map) {

        return success().setData(formService.getFormDataList2((Map) map));
    }

    /**
     * 获取表单数据list
     *
     * @param map
     * @return
     */
    @ResponseBody
    @RequestMapping("/getFormShDataList")
    public AjaxReturn getFormShDataList(@SearchModel Object map) {
        return success().setData(formService.getFormShDataList((Map) map));
    }

    /**
     * 获取表单数据list
     *
     * @param map
     * @return
     */
    @ResponseBody
    @RequestMapping("/getFormCkDataList")
    public AjaxReturn getFormCkDataList(@SearchModel Object map) {
        return success().setData(formService.getFormCkDataList((Map) map));
    }

    /**
     * 发布新版本
     *
     * @param formId
     * @return
     */
    @ResponseBody
    @RequestMapping("/fbForm")
    public AjaxReturn fbForm(Long formId) {
        return success().setData(formService.fbForm(formId));
    }

    /**
     * 保存并且发布
     *
     * @param formDef
     * @return
     */
    @ResponseBody
    @RequestMapping("/saveAndFbForm")
    public AjaxReturn saveAndFbForm(@FormModel FormDef formDef) {
        return success().setData(formService.saveAndFbForm(formDef));
    }

    /**
     * 获取code
     *
     * @param str
     * @return
     */
    @ResponseBody
    @RequestMapping("/getEnglish")
    public AjaxReturn getEnglish(String str) {
        //去除特殊字符
        String specialCharact = "[`~!@#$%^&*()+=|{}':;',\\[\\].<>/?~！@#￥%……&*（）——+|{}【】‘；：”“’。，、？]";
        Pattern p = Pattern.compile(specialCharact);
        Matcher m = p.matcher(str);
        String name = m.replaceAll("").trim();
        //转化成英文
        String transEn = TranslateUtil.translate(name);
        return success().setData(transEn);
    }

    /**
     * 拼英首字母
     *
     * @param str
     * @return
     */
    @ResponseBody
    @RequestMapping("/getPingyin")
    public AjaxReturn getPingyin(String str) {
        //去除特殊字符
        String specialCharact = "[-`~!@#$%^&*()+=|{}':;',\\[\\].<>/?~！@#￥%……&*（）——+|{}【】‘；：”“’。，、？\\s]";
        Pattern p = Pattern.compile(specialCharact);
        Matcher m = p.matcher(str);
        String name = m.replaceAll("").trim();
        //转化成首字母大写
        return success().setData(TranslateUtil.transToPj(name).toUpperCase());
    }


    /**
     * 根据流程code返回列表数据(流程基本数据+动态表单设计时展示的数据)
     *
     * @param map
     * @return
     */
    @ResponseBody
    @RequestMapping("/getWfInsList")
    public AjaxReturn getWfInsList(@SearchModel Object map) {
        return success().setData(formService.getWfInsList((Map) map));
    }

    /**
     * 获取展示数据
     *
     * @param formCode 表单code
     * @param type     获取展示数据的类型
     * @return
     */
    @ResponseBody
    @RequestMapping("/getShowData")
    public AjaxReturn getShowData(String formCode, String type) {
        return success().setData(formService.getShowData(formCode, type));
    }

    /**
     * 获取所有定位的数据
     * @param cjlx
     * @param formId
     * @return
     */
    @ResponseBody
    @RequestMapping("/getLocationFormData")
    public AjaxReturn getLocationFormData(String cjlx, Long formId, Long rowId) {
        return success().setData(formService.getLocationFormData(cjlx,formId,rowId));
    }
}
