package net.ruixin.dao.plat.form;

import net.ruixin.domain.plat.form.FormDef;
import net.ruixin.util.paginate.FastPagination;

import java.util.List;
import java.util.Map;


/**
 * 表单设计Dao
 */
public interface IFormDao {

    /**
     * 获取list
     *
     * @param map
     * @return
     */
    FastPagination getFormDefList(Map map);

    /**
     * 保存数据
     *
     * @param formId
     * @param dataJson
     * @return
     */
    Long saveFormData(Long formId, String dataJson);

    /**
     * 获取
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
     * 发布
     *
     * @param formDef
     */
    void fbForm(FormDef formDef);

    /**
     * 删除
     * @param id
     * @param formId
     */
    void delFormData(Long id, Long formId);

    /**
     *
     * @param map
     * @return
     */
    FastPagination getWfInsList(Map map);

    /**
     * 根据code获取form
     * @param formCode
     * @return
     */
    FormDef getFormByCode(String formCode);


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
