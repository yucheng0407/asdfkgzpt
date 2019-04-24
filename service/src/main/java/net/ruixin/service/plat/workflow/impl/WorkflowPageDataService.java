package net.ruixin.service.plat.workflow.impl;


import net.ruixin.dao.plat.workflow.ISysWorkflowPageDataDao;
import net.ruixin.domain.plat.workflow.instance.SysWorkflowPageData;
import net.ruixin.enumerate.plat.SfyxSt;
import net.ruixin.service.plat.common.BaseService;
import net.ruixin.service.plat.workflow.IWorkflowPageDataService;
import net.ruixin.util.json.JacksonUtil;
import net.ruixin.util.tools.RxStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.beans.Transient;
import java.util.List;
import java.util.Map;


@Service
public class WorkflowPageDataService extends BaseService implements IWorkflowPageDataService {
    @Autowired
    private ISysWorkflowPageDataDao workflowPageDataDao;


    @Transient
    @Override
    public void saveWorkflowPageData(Long wiId, String dataIds) {
        //解析格式  // dataId:1,pageId:"",formId:"";dataId:1,pageId:"",formId:"";
        //判断存不存在数据
        if (RxStringUtils.isNotEmpty(dataIds)) {
            //dataId:1,pageId:"",formId:"";
            List<Map<String, Object>> dataList = JacksonUtil.readValue(dataIds, List.class);
            for (Map<String, Object> data : dataList) {
                if (RxStringUtils.isNotEmpty(data.get("dataId"))) {
                    SysWorkflowPageData workflowPageData = workflowPageDataDao.getWorkflowPageData(wiId, Long.parseLong(data.get("pageId").toString()));
                    //不存在数据保存
                    if (null == workflowPageData) {
                        workflowPageData = new SysWorkflowPageData();
                        workflowPageData.setDataId(Long.parseLong(data.get("dataId").toString()));
                        if (RxStringUtils.isNotEmpty(data.get("formId"))) {
                            workflowPageData.setFormId(Long.parseLong(data.get("formId").toString()));
                        }
                        if (RxStringUtils.isNotEmpty(data.get("pageId"))) {
                            workflowPageData.setPageId(Long.parseLong(data.get("pageId").toString()));
                        }
                        workflowPageData.setWorkflowInstanceId(wiId);
                        workflowPageData.setSfyxSt(SfyxSt.VALID);
                        this.save(workflowPageData);
                    }
                }
            }
        }
    }

    @Override
    public Long getDataId(Long wiId, Long pageId) {
        Long dataId = null;
        SysWorkflowPageData workflowPageData = workflowPageDataDao.getWorkflowPageData(wiId, pageId);
        if (null != workflowPageData) {
            dataId = workflowPageData.getDataId();
        }
        return dataId;
    }
}
