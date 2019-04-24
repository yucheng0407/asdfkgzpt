package net.ruixin.service.plat.form.impl;


import net.ruixin.dao.plat.form.IFormDao;
import net.ruixin.dao.plat.resource.IResourceDao;
import net.ruixin.dao.plat.workflow.ISysWorkflowPageDao;
import net.ruixin.domain.plat.form.FormDef;
import net.ruixin.domain.plat.form.FormField;
import net.ruixin.domain.plat.resource.SysResource;
import net.ruixin.enumerate.plat.SfyxSt;
import net.ruixin.service.plat.common.BaseService;
import net.ruixin.service.plat.form.IFormService;
import net.ruixin.util.json.JacksonUtil;
import net.ruixin.util.mapUtil.MapUtil;
import net.ruixin.util.paginate.FastPagination;
import net.ruixin.util.tools.RxStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.lang.reflect.Field;
import java.util.*;

/**
 * 表单设计
 */
@Service
public class FormService extends BaseService implements IFormService {

    @Autowired
    private IFormDao formDao;
    @Autowired
    private ISysWorkflowPageDao workflowPageDao;
    @Autowired
    private IResourceDao resourceDao;

    @Override
    @Transactional
    public Long saveFormDef(FormDef formDef, Boolean fbFlg) {
        //保存基本数据
        //需要判断是否修改了比较大的影响，需要发布新版本，比如修改了列表展示字段，不影响展示，这时应该时不要发布新版本的
//        if (null != fbFlg && fbFlg) {
//            //增加、删除会发布版本？？？
//            formDef.setId(null);
//            //版本号清空
//            formDef.setVersion(null);
//            //是否主版本去除f
//            formDef.setIsMain("");
//            for (FormField field : formDef.getFields()) {
//                field.setId(null);
//            }
//        }
        formDef.setIsMain("0");
        this.save(formDef);
        return formDef.getId();
    }

    @Override
    public FormDef getFormDef(Long id) {
        return this.get(FormDef.class, id);
    }

    @Override
    public FastPagination getFormDefList(Map map) {
        return formDao.getFormDefList(map);
    }

    @Override
    @Transactional
    public void delFormDef(Long id) {
        this.deleteCascade(FormDef.class, id);
        //删除相关的资源信息
        resourceDao.delResourceByFormId(id);
    }

    @Override
    @Transactional
    public Long saveFormData(Long formId, String dataJson) {
        return formDao.saveFormData(formId, dataJson);
    }

    @Override
    public Map<String, Object> getFormData(Long formId, Long id) {
        return formDao.getFormData(formId, id);
    }

    @Override
    public  List getFormDataWz(Long formId, Long id) {
        return MapUtil.handleGeometryToArcgis(formDao.getFormDataWz(formId, id));
    }

    @Override
    public FastPagination getFormDataList(Map map) {
        return formDao.getFormDataList(map);
    }

    @Override
    public FastPagination getFormDataList2(Map map) {
        return formDao.getFormDataList2(map);
    }

    @Override
    public FastPagination getFormShDataList(Map map) {
        return formDao.getFormShDataList(map);
    }

    @Override
    public FastPagination getFormCkDataList(Map map) {
        return formDao.getFormCkDataList(map);
    }

    @Transactional
    @Override
    public String fbForm(Long formId) {
        FormDef formDef = this.get(FormDef.class, formId);
        String tableName = formDef.getTableName();
        formDao.fbForm(formDef);
        //发布成功之后生成一条资源数据，供流程或者表单使用
        /*if (RxStringUtils.isEmpty(tableName)) {
            SysResource resource = new SysResource();
            resource.setName(formDef.getName());
            resource.setCode("DIY_" + formDef.getKey());
            resource.setUrl("/form/formEdit?formId=" + formDef.getId());
            resource.setFormId(formDef.getId());
            resource.setType("page");
            resource.setSfyxSt(SfyxSt.VALID);
            this.save(resource);
        }*/
        return formDef.getTableName();
    }

    @Override
    public void delFormData(Long id, Long formId) {
        formDao.delFormData(id, formId);
    }

    @Override
    public void deleteBatch(String ids,Long formId) {
        formDao.deleteBatch(ids, formId);
    }

    @Override
    public void shBatchFormData(String ids, Long formId, String shzt) {
        formDao.shBatchFormData(ids, formId,shzt);
    }

    @Override
    public List getLocationFormData(String cjlx, Long formId, Long rowId) {
        if("4".equals(cjlx)){
            return  MapUtil.handleGeometryToArcgis(formDao.getLocationFormData(cjlx,formId,rowId));
        }else{
             return  MapUtil.handleGeometryCenterToArcgis(formDao.getLocationFormData(cjlx,formId,rowId));
        }
    }

    @Override
    public FastPagination getWfInsList(Map map) {
//        if (RxStringUtils.isNotEmpty(map.get("flowCode"))) {
        return formDao.getWfInsList(map);
//        } else {
//            return null;
//        }
    }

    @Override
    public Map<String, Object> getWfJson(Long flowId) {
        //获取流程sheets
        List<Map<String, Object>> sheets = workflowPageDao.querySheetsByWorkflow(flowId);
        //获取其中自定义的动态表单  PAGE_ID
        Map<String, Object> showFields = new HashMap<>();
        for (int i = 0; i < sheets.size(); i++) {
            Long pageId = Long.parseLong(sheets.get(i).get("sheet_id").toString());
            SysResource resource = this.get(SysResource.class, pageId);
            if (null != resource.getFormId()) {
                //是设计的表单，获取表单的信息
                FormDef formDef = this.get(FormDef.class, resource.getFormId());
                List<Object> list = new ArrayList<>();
                //获取其中需要展示在搜索列的数据
                List<FormField> fields = formDef.getFields();
                for (FormField field : fields) {
                    Map<String, Object> fieldOptions = JacksonUtil.readValue(field.getFieldOptions(), Map.class);
                    //列表展示字段
                    if (RxStringUtils.isNotEmpty(fieldOptions.get("show_table")) && "true".equals(fieldOptions.get("show_table").toString())) {
                        Map<String, Object> fieldM = new HashMap<>();
                        fieldM.put("label", field.getLabel());
                        fieldM.put("fieldType", field.getFieldType());
                        fieldM.put("code", field.getCode());
                        fieldM.put("fieldOptions", fieldOptions);
                        list.add(fieldM);
                    }
                }
                //数据表+字段的组合
                showFields.put(formDef.getTableName(), list);
            }
        }
        return showFields;
    }

    @Override
    @Transactional
    public String saveAndFbForm(FormDef formDef) {
        formDao.fbForm(formDef);
        this.save(formDef);
        return formDef.getTableName();
    }

    @Override
    public List<FormField> getShowData(String formCode, String type) {
        FormDef formDef = formDao.getFormByCode(formCode);
        List<FormField> list = new ArrayList<>();
        if (null != formDef) {
            List<FormField> fields = formDef.getFields();
            for (FormField field : fields) {
                Map<String, Object> map = JacksonUtil.readValue(field.getFieldOptions().toString(), Map.class);
                if (null != map.get(type) && (boolean) map.get(type)) {
                    list.add(field);
                }
            }
        }
        return list;
    }
}
