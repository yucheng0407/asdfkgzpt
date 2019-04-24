package net.ruixin.service.plat.form;


import net.ruixin.domain.plat.form.FormDef;
import net.ruixin.domain.plat.form.FormField;
import net.ruixin.service.plat.common.IBaseService;
import net.ruixin.util.paginate.FastPagination;

import java.util.List;
import java.util.Map;

/**
 * 表单设计
 */
public interface IFormService extends IBaseService {

    /**
     * 保存
     *
     * @param formDef
     */
    Long saveFormDef(FormDef formDef, Boolean fbFlg);

    /**
     * 获取
     *
     * @param id
     * @return
     */
    FormDef getFormDef(Long id);

    /**
     * 获取list
     *
     * @param map
     * @return
     */
    FastPagination getFormDefList(Map map);

    /**
     * 删除
     *
     * @param id
     */
    void delFormDef(Long id);

    /**
     * 保存表单数据
     *
     * @param formId
     * @param dataJson
     * @return
     */
    Long saveFormData(Long formId, String dataJson);

    /**
     * 获取表单数据
     *
     * @param formId
     * @param id
     * @return
     */
    Map<String, Object> getFormData(Long formId, Long id);

    /**
     * @param map
     * @return
     */
    FastPagination getFormDataList(Map map);

    /**
     * @param map
     * @return
     */
    FastPagination getFormDataList2(Map map);

    /**
     * @param map
     * @return
     */
    FastPagination getFormShDataList(Map map);

    /**
     * @param map
     * @return
     */
    FastPagination getFormCkDataList(Map map);

    /**
     * 发布版本
     *
     * @param formId
     */
    String fbForm(Long formId);

    /**
     * 删除
     *
     * @param id
     * @param formId
     */
    void delFormData(Long id, Long formId);

    /**
     * @param map
     * @return
     */
    FastPagination getWfInsList(Map map);

    /**
     * 获取流程列表渲染的参数json
     *
     * @param flowId
     * @return
     */
    Map<String, Object> getWfJson(Long flowId);

    /**
     * 保存并且发布form
     *
     * @param formDef
     * @return
     */
    String saveAndFbForm(FormDef formDef);

    /**
     * 获取数据
     * @param formCode
     * @param type
     * @return
     */
    List<FormField> getShowData(String formCode, String type);

    /**
     * 批量删除
     * @param ids
     * @param formId
     */
    void deleteBatch(String ids,Long formId);

    /**
     * 批量审核方法
     * @param ids
     * @param formId
     * @param shzt
     * @return
     */
    void shBatchFormData(String ids, Long formId,String shzt);


    List getLocationFormData(String cjlx, Long formId, Long rowId);

    List getFormDataWz(Long formId, Long id);
}
