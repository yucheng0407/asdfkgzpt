package net.ruixin.service.plat.workflow.impl;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import net.ruixin.dao.plat.workflow.*;
import net.ruixin.domain.plat.organ.SysOrgan;
import net.ruixin.domain.plat.resource.SysResource;
import net.ruixin.domain.plat.workflow.instance.*;
import net.ruixin.domain.plat.workflow.structure.node.SysActivityNode;
import net.ruixin.domain.plat.workflow.structure.node.SysNode;
import net.ruixin.domain.plat.workflow.structure.node.SysNodeButton;
import net.ruixin.domain.plat.workflow.structure.page.SysNodePage;
import net.ruixin.enumerate.plat.NodeType;
import net.ruixin.enumerate.plat.SheetMode;
import net.ruixin.enumerate.plat.TaskStatus;
import net.ruixin.enumerate.plat.WfBtnType;
import net.ruixin.service.plat.workflow.ISysNodeService;
import net.ruixin.service.plat.workflow.ISysTaskService;
import net.ruixin.util.hibernate.HibernateProxyUtil;
import net.ruixin.util.json.JacksonMapper;
import net.ruixin.util.tools.RxStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

/**
 * 任务实例类操作接口实现
 * Created by Jealous on 2016-8-23.
 */
@Service
@Transactional
public class SysTaskService implements ISysTaskService {

    @Autowired
    private ISysTaskDao sysTaskDao;

    @Autowired
    private ISysTaskPageInstanceDao sysTaskPageInstanceDao;

    @Autowired
    private ISysNodeService sysNodeService;

    @Autowired
    private ISysNodeInstanceDao sysNodeInstanceDao;

    @Autowired
    private ISysNodeButtonDao buttonDao;

    @Autowired
    private IWorkflowInstanceDao workflowInstanceDao;

    @Autowired
    ISysWorkflowPageDataDao workflowPageDataDao;

    @Override
    public SysTask get(Long id) {
        return sysTaskDao.get(id);
    }

    @Override
    public Map generateTaskHandleJson(Long id, Long userId) {
        SysTask task = get(id);//任务
        SysWorkflowInstance workflowInstance = task.getWorkflow_instance_id();
        List<SysTask> list = findTasksByWorkflowInstance(workflowInstance.getId());
        List<Map<String, Object>> taskList = new ArrayList<>();
        Map<String, Object> taskMap;
        SysOrgan organ;
        for (SysTask it : list) {
            if (it.getFinish_date() != null && it.getOpinion() != null) {
                taskMap = new HashMap<>();
                organ = it.getUser_id().getDefaultOrganId() != null ? sysTaskDao.getOrganById(it.getUser_id().getDefaultOrganId()) : null;
                String name = (organ != null ? organ.getOrganName() : "无组织") + "：" + it.getUser_id().getUserName();
                taskMap.put("id", it.getId()); //任务id
                taskMap.put("handler", name);
                taskMap.put("handleDate", new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(it.getFinish_date())); //结束时间
                taskMap.put("opinion", it.getOpinion().replace("\n", "")); // 环节意见
                taskMap.put("pageOpinion", RxStringUtils.isNotEmpty(it.getPageOpinion()) ? it.getPageOpinion().replace("\n", "") : ""); //页面意见
                taskMap.put("fjs", it.getFjs()); //附件数
                taskMap.put("fj_id", it.getFj_id()); //附件ID
                taskList.add(taskMap);
            }
        }
        //获取流程环节表单
        List<Map<String, Object>> sheetList = findSheetByTask(task, userId);
        //环节
        SysNode node = task.getNode_instance_id().getNode_id();
        Map<String, Object> result = new HashMap<>();
        result.put("wiId", workflowInstance.getId()); //流程实例id
        result.put("wiStatus", workflowInstance.getStatus()); //流程实例状态
        result.put("ywDataId", workflowInstance.getData_id());  //获取流程主对象数据id
        result.put("flowCode", workflowInstance.getWorkflow_id().getCode());  //获取流程编码
        result.put("sort", node.getSort());
        result.put("list", sheetList); //环节页面list
        result.put("taskList", taskList); //任务实例list
        result.put("taskStatus", task.getStatus().name); //任务状态
        result.put("taskId", id); //任务id
        result.put("sfbxscfj", node.getSfbxscfj()); //是否必须上传附件
        result.put("nature", node.getNature()); //分支聚合属性
        result.put("nodeId", node.getId()); //环节id
        result.put("defaultOpinion", node.getOpinion()); //环节默认意见
        if (node.getType() == NodeType.ACTIVITY_NODE) {
            SysActivityNode activityNode = ((SysActivityNode) HibernateProxyUtil.getTarget(node));
            if (!"".equals(activityNode.getSaveName())) {
                result.put("saveName", activityNode.getSaveName());
            }
            if (!"".equals(activityNode.getSubmitName())) {
                result.put("submitName", activityNode.getSubmitName());
            }
            boolean isChangeTask = false;
            /*调整：登陆人查看的是最新任务，但按钮操作区按当前登录人最新任务显示*/
            if (!userId.equals(task.getUser_id().getId())) {
                //当前登录人不是当前任务办理人
                Long myTaskId = workflowInstanceDao.getLatestTaskIdByWiId(task.getWorkflow_instance_id().getId(), userId, null);
                if (myTaskId != null) {
                    SysTask myTask = sysTaskDao.get(myTaskId);
                    if (myTask != null) {
                        isChangeTask = true;
                        result.put("buttons", getshowButtons(myTask.getNode_instance_id().getNode_id(), myTask.getId(), userId, myTask.getStatus()));
                    }
                }
            }
            if (!isChangeTask) {
                result.put("buttons", getshowButtons(node, id, userId, task.getStatus()));
            }
        }
        result.put("isMe", task.getUser_id().getId().equals(userId)); //是否当前办理人登录
        return result;
    }

    /**
     * 获取当前环节显示的按钮
     *
     * @param node   当前节点
     * @param taskId 任务id
     * @param userId 用户
     * @return List button集合
     */
    private List<SysNodeButton> getshowButtons(SysNode node, Long taskId, Long userId, TaskStatus taskStatus) {
        Map<String, String> handleType = getHandleType(taskId, node.getId(), userId);
        List<SysNodeButton> allBtns = buttonDao.findNodeButtonByNode(node);
        return allBtns.stream().filter((SysNodeButton nodeButton) -> {
            boolean flag = false;
            WfBtnType wfBtnType = nodeButton.getType() == null ? null : WfBtnType.get(nodeButton.getType());
            if (null != wfBtnType) {
                switch (wfBtnType) {
                    case SUBMIT:
                        flag = "1".equals(handleType.get("submit"));
                        break;
                    case REFUSE:
                        flag = "1".equals(handleType.get("refuse"));
                        break;
                    case SAVEDRAFT:
                        flag = "1".equals(handleType.get("draft"));
                        break;
                    case CANCEL:
                        flag = "1".equals(handleType.get("cancel"));
                        break;
                    case DEL:
                        flag = "1".equals(handleType.get("del"));
                        break;
                    case DIY:
                        String showTime = nodeButton.getIsShowInHandle();
                        switch (showTime) {
                            case "1":
                                //办理中
                                flag = "1".equals(handleType.get("submit"));
                                break;
                            case "2":
                                //办理后
                                flag = TaskStatus.FINISHED == taskStatus;
                                break;
                            case "3":
                                flag = true;
                                break;
                        }
                        break;
                    case SPECBACK:
                        //ps 暂无
                        flag = "1".equals(handleType.get("specback"));
                        break;
                    case PRESS:
                        flag = "1".equals(handleType.get("press"));
                        break;

                }
            }
            return flag;
        }).collect(Collectors.toList());
    }

    private Map<String, String> getHandleType(Long taskId, Long nodeId, Long userId) {
        Map<String, String> handleTypeMap = new HashMap<>();
        String handleTypeStr = sysTaskDao.getHandleTypes(taskId, nodeId, userId);
        for (String handleTypes : handleTypeStr.split(",")) {
            String[] handleTypeArr = handleTypes.split(":");
            handleTypeMap.put(handleTypeArr[0], handleTypeArr[1]);
        }
        return handleTypeMap;
    }

    @Override
    public List<SysTask> findTasksByNodeInstanceId(Long id) {
        return sysTaskDao.findTasksByNodeInstanceId(id);
    }

    @Override
    public List taskPage(Long wfiId, Long nodeId) {
        return sysTaskDao.taskPage(wfiId, nodeId);
    }

    @Override
    public SysTask getTaskByWorkflowInstanceAndUser(Long wId, Long userId) {
        return sysTaskDao.getTaskByWorkflowInstanceAndUser(wId, userId);
    }

    @Override
    public Boolean isFristNode(SysTask task) {
        if (task != null) {
            SysNodeInstance sni = task.getNode_instance_id();
            if (sni != null) {
                SysNode sn = sni.getNode_id();
                return sysNodeService.isStartNodeByPreviousNode(sn.getId());
            }
        }
        return false;
    }

    @Override
    public List<SysTask> findTasksByWorkflowInstance(Long id) {
        return sysTaskDao.findTasksByWorkflowInstance(id);
    }

    @Override
    public Boolean isSheetDrive(SysTask task) {
        List<SysTaskPageInstance> taskPageInstanceList = sysTaskPageInstanceDao.findByTask(task.getId());
        for (SysTaskPageInstance sysTaskPageInstance : taskPageInstanceList) {
            SysNodePage nodeSheet = sysTaskPageInstance.getSysNodePage();
            if (nodeSheet == null) {
                return true;
            }
        }
        return false;
    }

    @Override
    public Boolean isReturned(SysTask task) {
        // 环节实例
        SysNodeInstance nodeInstance = task.getNode_instance_id();
        SysNode node = nodeInstance.getNode_id();
        Boolean b = sysNodeService.isStartNodeByPreviousNode(node.getId());
        return !b && ("WAITING".equals(task.getStatus().name()) || "ACCEPTING".equals(task.getStatus().name()));
    }

//    @Deprecated
//    public List<Map<String, Object>> findSheetByTask2(SysTask task, Boolean flag, String status) {
//        // 环节实例
//        SysNodeInstance nodeInstance = task.getNode_instance_id();
//        // 流程实例
//        SysWorkflowInstance workflowInstance = task.getWorkflow_instance_id();
//
//        List<Map<String, Object>> sheets = new ArrayList<>();
//        // 根据环节实例ID获取环节页面
//        List<SysNodePageInstance> nodeSheetInstances = sysNodeInstanceService.findNodeSheetInstancesByNodeInstance(nodeInstance.getId());
//        for (SysNodePageInstance nodeSheetInstance : nodeSheetInstances) {
//            SysResource sheet = nodeSheetInstance.getResource();
//            Map<String, Object> result = new HashMap<>();
//            StringBuilder url = new StringBuilder(sheet.getUrl());
//            //处理环节表单数据id，放入url中以id键，放入map中以WdataId键
//            result.put("ywDataId", workflowInstance.getData_id());
//            result.put("PdataId", nodeSheetInstance.getData_id());
//            Integer id = nodeSheetInstance.getData_id() != null ? nodeSheetInstance.getData_id() : workflowInstance.getData_id();
//            url.append("?id=").append(id != null ? id : "");
//            //将sourceData（String）转换为json，再将json数据拼接到url中
//            if (workflowInstance.getSourceData() != null && !"".equals(workflowInstance.getSourceData())) {
//                ObjectMapper mapper = JacksonMapper.getInstance();
//                try {
//                    JsonNode sourceJson = mapper.readTree(workflowInstance.getSourceData());
//                    Iterator iter = sourceJson.fields();
//                    while (iter.hasNext()) {
//                        Map.Entry property = (Map.Entry) iter.next();
//                        url.append("&").append(property.getKey()).append("=").append(property.getValue());
//                    }
//                } catch (IOException e) {
//                    e.printStackTrace();
//                    return null;
//                }
//            }
//            // 编辑
//            result.put("edit", (nodeSheetInstance.getNode_page_id().getControl() == SheetMode.EDIT ||
//                    nodeSheetInstance.getNode_page_id().getControl() == SheetMode.SEAL));
//            result.put("lookflg", flag);
//            result.put("wiStatus", status);
//            SysNodePage nodeSheet = nodeSheetInstance.getNode_page_id();
//            result.put("name", nodeSheet != null ? nodeSheet.getTitle() : sheet.getName());
//            result.put("url", url.toString());
//            result.put("sId", nodeSheetInstance.getId());
//            result.put("wId", workflowInstance.getId());
//            result.put("nodeName", nodeSheetInstance.getNode_instance_id().getNode_id().getName());
//            result.put("sort", nodeSheetInstance.getNode_instance_id().getNode_id().getSort());
//            result.put("path", nodeSheetInstance.getPath());
//            result.put("rwId", task.getId());
//            result.put("lcId", workflowInstance.getWorkflow_id().getWorkflow());
//            result.put("ywDataId", workflowInstance.getData_id());
//            result.put("sheetId", sheet.getId());
//            sheets.add(result);
//        }
//        return sheets;
//    }

    @Override
    public List<Map<String, Object>> findSheetByTask(SysTask task, Long userId) {
        SysNode node = task.getNode_instance_id().getNode_id();
        SysWorkflowInstance workflowInstance = task.getWorkflow_instance_id();
        SysNodeInstance runNodeInstance = sysNodeInstanceDao.findRunningNode(workflowInstance);
        int runNodeSort = runNodeInstance != null ? runNodeInstance.getNode_id().getSort() : 0;
        // 根据任务实例ID获取任务页面实例list
        List<SysTaskPageInstance> taskPageInstanceList = sysTaskPageInstanceDao.findByTask(task.getId());
        List<Map<String, Object>> sheets = new ArrayList<>();
        Map<String, Object> result;
        Long ywDataId;
        for (SysTaskPageInstance sysTaskPageInstance : taskPageInstanceList) {
            result = new HashMap<>();
            SysResource resource = sysTaskPageInstance.getResource();
            StringBuilder url = new StringBuilder(resource.getUrl()); //获取页面url
            ywDataId = sysTaskPageInstance.getData_id() != null ? sysTaskPageInstance.getData_id() : workflowInstance.getData_id();
            if (url.indexOf("?") > -1) {
                url.append("&id=").append(ywDataId != null ? ywDataId : "");
            } else {
                url.append("?id=").append(ywDataId != null ? ywDataId : "");
            }

            if (RxStringUtils.isNotEmpty(workflowInstance.getSourceData())) {
                Map<String, Object> sourceData = new HashMap<>();
                ObjectMapper mapper = JacksonMapper.getInstance();
                try {
                    JsonNode sourceJson = mapper.readTree(workflowInstance.getSourceData());
                    Iterator iter = sourceJson.fields();
                    while (iter.hasNext()) {
                        Map.Entry property = (Map.Entry) iter.next();
                        String key = property.getKey().toString();
                        String value = "";
                        if (property.getValue() != null) {
                            value = mapper.readValue(property.getValue().toString(), String.class);
                        }
                        url.append("&").append(key).append("=").append(value);
                        sourceData.put(key, value);
                    }
                    result.put("sourceData", sourceData); //流程实例初始源数据
                } catch (IOException e) {
                    throw new RuntimeException("流程实例对象ID集合解析出错", e);
                }
            }
            boolean sheetEdit = false;
            SysNodePage nodeSheet = sysTaskPageInstance.getSysNodePage();
            if (nodeSheet != null) {
                result.put("npId", nodeSheet.getId());//环节页面ID
                SheetMode sm = nodeSheet.getControl();
                if (sm != null) {
                    sheetEdit = !(sm == SheetMode.VIEW);
                    result.put("sheetMode", sm.id);//环节页面控制状态
                    /*if (sm == SheetMode.SEAL) { //签章页面
                        result.put("path", sysTaskPageInstance.getPath());
                        url = new StringBuilder("/workflow/instance/webofficePage");
                    }*/
                }
                //add by mrq
                result.put("pageId", nodeSheet.getPage_id());
                //根据workflowPageId获取dataId
                SysWorkflowPageData workflowPageData = workflowPageDataDao.getWorkflowPageData(workflowInstance.getId(), nodeSheet.getPage_id());
                if (null != workflowPageData) {
                    result.put("dataId", workflowPageData.getDataId());
                }
            }

            result.put("name", nodeSheet != null ? nodeSheet.getTitle() : resource.getName()); //环节页面标题或页面名称
            result.put("url", url.toString()); //页面url
            result.put("wiId", workflowInstance.getId());//流程实例ID
            result.put("flowCode", workflowInstance.getWorkflow_id().getCode());//流程编码
            result.put("nId", node.getId());//环节ID
            result.put("taskId", task.getId());//任务ID
            result.put("taskStatus", task.getStatus());//任务状态
            result.put("sId", sysTaskPageInstance.getId()); //任务页面实例id
            result.put("ywDataId", ywDataId != null ? ywDataId : ""); //业务数据ID
            result.put("tmpData", sysTaskPageInstance.getTmp_data_json()); //任务页面实例临时数据json(草稿)
            result.put("sort", node.getSort()); //当前任务所在环节序号
            result.put("runNodeSort", runNodeSort); //运行中的环节序号
            result.put("nature", node.getNature()); //分支聚合属性
            boolean isMe = task.getUser_id().getId().equals(userId);//是否当前办理人登录
            result.put("nodeCode", node.getNodeCode()); //环节編碼
            result.put("editFlag", isMe && sheetEdit
                    && "0".equals(task.getIs_finish())
                    && !"0".equals(workflowInstance.getStatus())); //是否可编辑
            result.put("pageCode", resource.getCode());
            sheets.add(result);
        }
        return sheets;
    }

    @Override
    public List getNodePageOpinion(Long wiId, Long pageId) {
        return sysTaskDao.getNodePageOpinion(wiId, pageId);
    }

    @Override
    public void saveTmpAuditOpinion(String auditOpinion) {
        sysTaskDao.saveTmpAuditOpinion(auditOpinion);
    }

    @Override
    public Map generateTaskHandleJson(String flowCode) {
        SysNode node = sysTaskDao.getFirstActivityNode(flowCode);
        List<Map<String, Object>> sheets = sysTaskDao.getSheetByNodeId(node.getId());
        Map<String, Object> result = new HashMap<>();
        result.put("list", sheets);
        //是否必须上传附件
        result.put("sfbxscfj", node.getSfbxscfj());
        if (node.getType() == NodeType.ACTIVITY_NODE) {
            SysActivityNode activityNode = (SysActivityNode) node;
            if (RxStringUtils.isNotEmpty(activityNode.getSaveName())) {
                result.put("saveName", activityNode.getSaveName());
            }
            if (RxStringUtils.isNotEmpty(activityNode.getSubmitName())) {
                result.put("submitName", activityNode.getSubmitName());
            }
            result.put("buttons", getshowButtons(node, null, null, TaskStatus.ACCEPTING));
            if (RxStringUtils.isNotEmpty(activityNode.getSfxstj())) {
                result.put("sfxstj", activityNode.getSfxstj());
            }
        }
//        result.put("handleType", getHandleType(null, node.getId(), null));
        result.put("sort", node.getSort());
        //运行中的环节序号:启动流程前默认为-1
        result.put("runNodeSort", -1);
        //环节默认意见
        result.put("defaultOpinion", node.getOpinion());
        return result;
    }

    @Override
    public void updateTmpData(Long id, String tmpJson) {
        sysTaskDao.updateTmpData(id, tmpJson);
    }

}
