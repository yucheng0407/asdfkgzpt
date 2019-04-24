package net.ruixin.service.plat.workflow.impl;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import net.ruixin.dao.plat.auth.IRuleDao;
import net.ruixin.dao.plat.workflow.*;
import net.ruixin.domain.plat.resource.SysResource;
import net.ruixin.domain.plat.workflow.structure.frame.SysWorkflow;
import net.ruixin.domain.plat.workflow.structure.frame.SysWorkflowType;
import net.ruixin.domain.plat.workflow.structure.frame.SysWorkflowVariable;
import net.ruixin.domain.plat.workflow.structure.node.*;
import net.ruixin.domain.plat.workflow.structure.page.SysNodePage;
import net.ruixin.domain.plat.workflow.structure.page.SysWorkflowPage;
import net.ruixin.domain.plat.workflow.structure.route.SysRouter;
import net.ruixin.enumerate.plat.*;
import net.ruixin.service.plat.workflow.IWorkflowService;
import net.ruixin.util.json.JacksonMapper;
import net.ruixin.util.json.JacksonUtil;
import net.ruixin.util.paginate.FastPagination;
import net.ruixin.util.support.BeanKit;
import net.ruixin.util.support.ToolUtil;
import net.ruixin.util.tools.RxStringUtils;
import org.apache.commons.beanutils.BeanUtils;
import org.apache.poi.ss.usermodel.Workbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author Jealous
 * @date 2016-8-9
 * 工作流：流程服务接口实现
 */
@Service
@Transactional
public class WorkflowService implements IWorkflowService {

    private static final Logger LOGGER = LoggerFactory.getLogger(WorkflowService.class);

    @Autowired
    private IWorkflowDao workflowDao;

    @Autowired
    private IWorkflowTypeDao workflowTypeDao;

    @Autowired
    private ISysNodeDao sysNodeDao;

    @Autowired
    private ISysRouterDao sysRouterDao;

    @Autowired
    private ISysWorkflowVariableDao workflowVariableDao;

    @Autowired
    private ISysWorkflowPageDao workflowPageDao;

    @Autowired
    private ISysNodeVariableAssignDao nodeVariableAssignDao;

    @Autowired
    private ISysNodeCandidateDao sysNodeCandidateDao;

    @Autowired
    private ISysNodePageDao sysNodePageDao;

    @Autowired
    private ISysNodeButtonDao nodeButtonDao;

    @Autowired
    private IRuleDao ruleDao;

    @Override
    public SysWorkflow get(Long id) {
        return workflowDao.get(id);
    }

    @Override
    public List<SysWorkflow> findWorkflowsByType(Long workfolwTypeId) {
        return workflowDao.findByType(workfolwTypeId);
    }

    @Override
    public List<SysWorkflow> findLatestVersionWfByType(Long workfolwTypeId) {
        return workflowDao.findLatestVersionWfByType(workfolwTypeId);
    }

    @Override
    public SysWorkflow findWorkflowByCode(String flowCode) {
        return getLatestVersionWorkflow(flowCode);
        // 现在有版本默认取最新版本流程返回
        //return RxStringUtils.isNotEmpty(flowCode) ? workflowDao.findByCode(flowCode) : null;
    }

    @Override
    public List<SysWorkflow> findAllWorkflow() {
        return workflowDao.findAll();
    }

    @Override
    @Transactional
    public String delWorkflow(Long id) {
        String result = workflowDao.delWorkflow(id);
        calculateLatestVersion();
        return result;
    }

    @Override
    @Transactional
    public Long saveWorkflow(String json) {
        SysWorkflow workflow;
        ObjectMapper mapper = JacksonMapper.getInstance();
        try {
            JsonNode workflowJson = mapper.readTree(json);
            if (workflowJson != null && JacksonUtil.isNotEmptyFieldValue(workflowJson, "operatingStatus") && JacksonUtil.isNotEmptyFieldValue(workflowJson, "status")) {
                OperatingStatus operatingStatus = OperatingStatus.get(workflowJson.get("operatingStatus").asInt());
                WorkflowSaveStatus status = WorkflowSaveStatus.get(workflowJson.get("status").asInt());
                if (status.equals(WorkflowSaveStatus.RELEASE) && operatingStatus.equals(OperatingStatus.MODIFY)) {
                    // 批量更新同流程编码业务类别
                    batchUpdateSameCodeFlowType(workflowJson);
                }
                // 当是导入的时候修改流程有效状态
                if (operatingStatus.equals(OperatingStatus.IMPORTING)) {
                    SysWorkflow impworkflow = get(workflowJson.get("id").asLong());
                    impworkflow.setSfyxSt(SfyxSt.VALID);
                }
                // 是否为复制新建 新版本 or 复制结构 or 另存
                boolean isCopyCreated = OperatingStatus.isCopyCreated(operatingStatus);
                //提取流程基本信息保存
                workflow = initWorkflowByJson(workflowJson, isCopyCreated);
                if (workflow != null) {
                    //保存工作流关联信息
                    Map<String, SysWorkflowVariable> workflowVariables = new HashMap<>();
                    //1：保存流程变量信息
                    if (!JacksonUtil.getFieldBoolValue(workflowJson, "fromServer")) {
                        if (JacksonUtil.isNotEmptyFieldValue(workflowJson, "variables")) {
                            JsonNode variablesNodes = workflowJson.get("variables");
                            for (int i = 0; i < variablesNodes.size(); i++) {
                                JsonNode variablesNode = variablesNodes.get(i);
                                SysWorkflowVariable workflowVariable = initVariableByJson(variablesNodes.get(i), workflow, isCopyCreated);
                                workflowVariables.put(variablesNode.get("name").asText(), workflowVariable);
                            }
                        }
                        //2：保存流程表单
                        if (JacksonUtil.isNotEmptyFieldValue(workflowJson, "sheets")) {
                            JsonNode pagesNodes = workflowJson.get("sheets");
                            for (int i = 0; i < pagesNodes.size(); i++) {
                                initWorkflowPageByJson(pagesNodes.get(i), workflow, isCopyCreated);
                            }
                        }
                    }
//                    else {
//                        //服务端获取数据
//                        for (SysWorkflowVariable variable : workflow.getWorkflowVariables()) {
//                            workflowVariables.put(variable.getName(), variable);
//                        }
//                    }
                    Map<String, SysNode> nodeMap = new HashMap<>();
                    //3：保存环节信息
                    if (JacksonUtil.isNotEmptyFieldValue(workflowJson, "nodes")) {
                        JsonNode nodesJson = workflowJson.get("nodes");
                        for (int i = 0; i < nodesJson.size(); i++) {
                            JsonNode nodeJson = nodesJson.get(i);
                            SysNode node = initNodeByJson(nodeJson, workflowJson, workflow, workflowVariables, isCopyCreated);
                            nodeMap.put(nodeJson.get("domid").asText(), node);
                        }
                        //处理带有“不同意跳转至”的节点
                        for (Map.Entry<String, SysNode> entry : nodeMap.entrySet()) {
                            SysNode node = entry.getValue();
                            if (node.getType() == NodeType.ACTIVITY_NODE) {
                                String domid = ((SysActivityNode) node).getDisagree_nodedom_id();
                                if (RxStringUtils.isNotEmpty(domid) && nodeMap.containsKey(domid)) {
                                    ((SysActivityNode) node).setDisagree_node_id(nodeMap.get(domid).getId());
                                } else {
                                    ((SysActivityNode) node).setDisagree_node_id(null);
                                }
                                sysNodeDao.save(node);
                            }
                        }
                    }
                    //4：保存流向信息
                    if (JacksonUtil.isNotEmptyFieldValue(workflowJson, "routers")) {
                        JsonNode routersJson = workflowJson.get("routers");
                        for (int i = 0; i < routersJson.size(); i++) {
                            initRouterByJson(routersJson.get(i), workflowJson, nodeMap, workflow, isCopyCreated);
                        }
                    }
                    //返回工作流id
                    return workflow.getId();
                }
            }
            return null;
        } catch (IOException e) {
            LOGGER.error("工作流保存失败", e);
            return null;
        }
    }

    /**
     * 批量更新同流程编码下流程的类别
     *
     * @param workflowJson
     */
    private void batchUpdateSameCodeFlowType(JsonNode workflowJson) {
        SysWorkflow impworkflow = get(workflowJson.get("id").asLong());
        Long workflowTypeId = workflowJson.get("type").asLong();//类别
        if (workflowTypeId.longValue() != impworkflow.getType().getId().longValue()) {
            String flowCode = workflowJson.get("code").asText();
            List<SysWorkflow> listVersionFlow = this.workflowDao.listVersionWorkflow(flowCode, true);
            if (!ToolUtil.isNullList(listVersionFlow)) {
                SysWorkflowType workflowType = workflowTypeDao.get(workflowTypeId);
                for (SysWorkflow workflow : listVersionFlow) {
                    // 当是修改保存的时候检查是否有正在运行的流程实例
                    //checkWorkflowHasRunningInstance(workflow.getId());
                    workflow.setType(workflowType);
                    workflow.setOperatingStatus(OperatingStatus.MODIFY);
                    this.workflowDao.save(workflow);
                }
            }
        }
    }

    /**
     * 检查工作流是否有正在运行的实例
     *
     * @param workflowId 工作流ID
     */
    private void checkWorkflowHasRunningInstance(long workflowId) {
        if (workflowId > 0) {
            boolean isHas = this.hasRunningWorkflowInstance(workflowId);
            SysWorkflow workflow = this.get(workflowId);
            if (isHas) throw new RuntimeException("流程(" + workflow.getName() + ")含有未完成的流程实例");
        }
    }

    /**
     * 私有方法:保存流向
     *
     * @param routerJson    流向json
     * @param workflowJson  流程json
     * @param nodes         节点
     * @param workflow      流程
     * @param isCopyCreated 是否为复制新建
     */
    private void initRouterByJson(JsonNode routerJson, JsonNode workflowJson, Map<String, SysNode> nodes, SysWorkflow workflow, boolean isCopyCreated) {
        SysRouter router;
        Long routerId = 0L;
        if (routerJson.has("id")) {
            routerId = routerJson.get("id").asLong();
        }
        if (!isCopyCreated && routerId != 0) {
            router = sysRouterDao.get(routerId);
        } else {
            router = new SysRouter();
        }
        if (!JacksonUtil.getFieldBoolValue(routerJson, "fromServer")) {
            //名称
            router.setName(JacksonUtil.getFieldStringValue(routerJson, "name"));
            //分支条件
            router.setBranch(JacksonUtil.getFieldStringValue(routerJson, "branch"));
            //流出环节
            router.setStartNode(nodes.get(JacksonUtil.getFieldStringValue(routerJson, "startNodeId")));
            //流入环节
            router.setEndNode(nodes.get(JacksonUtil.getFieldStringValue(routerJson, "endNodeId")));
            //domid
            router.setDomid(JacksonUtil.getFieldStringValue(routerJson, "domid"));
            //所在流程
            router.setWorkflow(workflow);
            //有效状态
            if ("VALID".equals(routerJson.get("sfyxSt").asText())) {
                router.setSfyxSt(SfyxSt.VALID);
            } else {
                router.setSfyxSt(SfyxSt.UNVALID);
            }
            sysRouterDao.save(router);
        } else if (isCopyCreated && workflowJson.has("id")) {
            //从服务端获取需要拷贝的
            Long workflowId = workflowJson.get("id").asLong();
            SysRouter sourceRouter = sysRouterDao.getRouterByWorkflowAndDomid(workflowId, routerJson.get("domid").asText());
            BeanKit.copyProperties(sourceRouter, router, "id", "startNode", "endNode", "workflow", "cjrId", "cjsj");
            router.setStartNode(nodes.get(JacksonUtil.getFieldStringValue(routerJson, "startNodeId")));
            router.setEndNode(nodes.get(JacksonUtil.getFieldStringValue(routerJson, "endNodeId")));
            router.setWorkflow(workflow);
            sysRouterDao.save(router);
        } else if (("UNVALID").equals(JacksonUtil.getFieldStringValue(routerJson, "sfyxSt"))) {
            //从服务端获取路由被删除
            Long workflowId = workflowJson.get("id").asLong();
            SysRouter delRouter = sysRouterDao.getRouterByWorkflowAndDomid(workflowId, routerJson.get("domid").asText());
            delRouter.setSfyxSt(SfyxSt.UNVALID);
            sysRouterDao.save(delRouter);
        }
    }

    @SuppressWarnings("ConstantConditions")
    private SysNode initNodeByJson(JsonNode nodeJson, JsonNode workflowJson, SysWorkflow workflow, Map<String, SysWorkflowVariable> workflowVariables, boolean isCopyCreated) {
        Long nodeId = 0L;
        if (nodeJson.has("id")) {
            nodeId = nodeJson.get("id").asLong();
        }
        NodeType nodeType = NodeType.get(nodeJson.get("type").asInt());
        SysNode node = null;
        if (!isCopyCreated && nodeId != 0) {
            switch (nodeType) {
                case ACTIVITY_NODE:
                    node = sysNodeDao.getActivityNode(nodeId);
                    break;
                case DECISION_NODE:
                    node = sysNodeDao.getDecisionNode(nodeId);
                    break;
                default:
                    node = sysNodeDao.get(nodeId);
                    break;
            }
        }
        if (node == null) {
            switch (nodeType) {
                case ACTIVITY_NODE:
                    node = new SysActivityNode();
                    break;
                case DECISION_NODE:
                    node = new SysDecisionNode();
                    break;
                default:
                    node = new SysNode();
                    break;
            }
            //指定环节类型
            node.setType(nodeType);
            //所属流程
            node.setSysWorkflow(workflow);
        }
        if (!JacksonUtil.getFieldBoolValue(nodeJson, "fromServer")) {
            switch (nodeType) {
                // 活动环节
                case ACTIVITY_NODE:
                    //多人办理方式
                    ((SysActivityNode) node).setTransactType(TransactType.get(JacksonUtil.getFieldIntValue(nodeJson, "transactType")));
                    //会签处理参数
                    ((SysActivityNode) node).setCountersignParameter(CountersignParameter.get(JacksonUtil.getFieldIntValue(nodeJson, "countersignParameter")));
                    //会签处理参数值
                    ((SysActivityNode) node).setCountersignValue(JacksonUtil.getFieldIntValue(nodeJson, "countersignValue"));
                    //聚合方式
                    ((SysActivityNode) node).setConvergeType(ConvergeType.get(JacksonUtil.getFieldIntValue(nodeJson, "convergeType")));
                    //环节办理人
                    String roleId = JacksonUtil.getFieldStringValue(nodeJson, "roleId");
                    if (RxStringUtils.isNotEmpty(roleId)) {
                        ((SysActivityNode) node).setRoleId(Long.valueOf(roleId));
                    }
                    //前处理程序
                    ((SysActivityNode) node).setStartupProcess(JacksonUtil.getFieldStringValue(nodeJson, "startupProcessSql"));
                    //后处理程序
                    ((SysActivityNode) node).setFinishProcess(JacksonUtil.getFieldStringValue(nodeJson, "finishProcessSql"));
                    //11月29日扩展 --- 退回节点domid
                    ((SysActivityNode) node).setDisagree_nodedom_id(JacksonUtil.getFieldStringValue(nodeJson, "disagreeNodeDomid"));
                    //12月8日扩展 --- 自动处理逻辑 SYS_TRANSACT_NODE(AUTO_PROCESS)
                    ((SysActivityNode) node).setAutoProcess(JacksonUtil.getFieldStringValue(nodeJson, "autoHandleSql"));

                    ((SysActivityNode) node).setSubmitName(JacksonUtil.getFieldStringValue(nodeJson, "submitName"));
                    ((SysActivityNode) node).setSaveName(JacksonUtil.getFieldStringValue(nodeJson, "saveName"));
                    //是否显示提交按钮
                    node.setSfxstj(JacksonUtil.getFieldStringValue(nodeJson, "sfxstj"));
                    break;
                //决策环节
                case DECISION_NODE:
                    //决策类型 目前默认为自动
                    ((SysDecisionNode) node).setDecisionType(DecisionType.AUTOMATIC);
                    break;
                default:
                    break;
            }
            //名称
            node.setName(JacksonUtil.getFieldStringValue(nodeJson, "name"));
            //x坐标
            node.setX(JacksonUtil.getFieldIntValue(nodeJson, "x"));
            //y坐标
            node.setY(JacksonUtil.getFieldIntValue(nodeJson, "y"));
            //domid
            node.setDomid(JacksonUtil.getFieldStringValue(nodeJson, "domid"));
            //环节序号
            node.setSort(JacksonUtil.getFieldIntValue(nodeJson, "nodeSort"));
            //新版
            if (nodeJson.has("sort")) {
                node.setSort(nodeJson.get("sort").asInt());
            }
            //是否显示保存按钮？？？若为空的话，有无默认值
            node.setSfxscg(JacksonUtil.getFieldStringValue(nodeJson, "sfxscg"));
            //是否显示催办按钮
            node.setSfxscb(!nodeJson.has("sfxscb") ? "0" : nodeJson.get("sfxscb").asText());
            //是否上传附件
            node.setSfbxscfj(JacksonUtil.getFieldStringValue(nodeJson, "sfbxscfj"));
            //环节业务状态
            node.setYwzt(JacksonUtil.getFieldStringValue(nodeJson, "ywzt"));
            //环节编码
            node.setNodeCode(JacksonUtil.getFieldStringValue(nodeJson, "nodeCode"));
            //分支聚合属性
            node.setNature(JacksonUtil.getFieldStringValue(nodeJson, "nature"));
            //环节默认意见
            node.setOpinion(JacksonUtil.getFieldStringValue(nodeJson, "opinion"));
            //有效状态
            if ("VALID".equals(nodeJson.get("sfyxSt").asText())) {
                node.setSfyxSt(SfyxSt.VALID);
            } else {
                node.setSfyxSt(SfyxSt.UNVALID);
            }
            //环节描述
            node.setDescription(JacksonUtil.getFieldStringValue(nodeJson, "description"));
            sysNodeDao.save(node);

            if (nodeJson.has("variables")) {
                //环节变量赋值
                JsonNode nodeVariables = nodeJson.get("variables");
                for (int i = 0; i < nodeVariables.size(); i++) {
                    JsonNode nodeVariable = nodeVariables.get(i);
                    initNodeVariable(nodeVariable, node, workflowVariables, isCopyCreated);
                }
            }
            //环节办理人
            if (nodeJson.has("candidates")) {
                JsonNode nodeCandidates = nodeJson.get("candidates");
                for (int i = 0; i < nodeCandidates.size(); i++) {
                    JsonNode nodeCandidate = nodeCandidates.get(i);
                    initNodeCandidate(nodeCandidate, node, isCopyCreated);
                }
            }
            //环节表单
            if (nodeJson.has("sheets")) {
                JsonNode nodePages = nodeJson.get("sheets");
                for (int i = 0; i < nodePages.size(); i++) {
                    JsonNode nodePage = nodePages.get(i);
                    initNodePage(nodePage, node, isCopyCreated);
                }
            }
            //环节按钮
            if (nodeJson.has("buttons")) {
                JsonNode nodeButtons = nodeJson.get("buttons");
                for (int i = 0; i < nodeButtons.size(); i++) {
                    JsonNode nodeButton = nodeButtons.get(i);
                    initNodeButton(nodeButton, node, isCopyCreated);
                }
            }
        } else if (isCopyCreated && workflowJson.has("id")) {
            //从服务端获取且需要拷贝的
            Long workflowId = workflowJson.get("id").asLong();
            SysNode sourceNode = sysNodeDao.getNodeByWorkflowAndDomid(workflowId, nodeJson.get("domid").asText());
            BeanKit.copyProperties(sourceNode, node, "id", "sysWorkflow", "cjrId", "cjsj");
            node.setSysWorkflow(workflow);
            sysNodeDao.save(node);
            //拷贝环节变量，表单，按钮
            sysNodeDao.copyNodesRelatedObjects(sourceNode, node);
        } else if (("UNVALID").equals(JacksonUtil.getFieldStringValue(nodeJson, "sfyxSt"))) {
            //从服务端获取节点被删除
            Long workflowId = workflowJson.get("id").asLong();
            SysNode delNode = sysNodeDao.getNodeByWorkflowAndDomid(workflowId, nodeJson.get("domid").asText());
            delNode.setSfyxSt(SfyxSt.UNVALID);
            sysNodeDao.save(node);
        }
        return node;
    }

    /**
     * 私有方法:保存环节按钮
     *
     * @param isCopyCreated 是否为复制新建
     */
    private void initNodeButton(JsonNode nodeButtonJson, SysNode node, boolean isCopyCreated) {
        SysNodeButton nodeButton;
        Long nodeButtonId = JacksonUtil.getFieldLongValue(nodeButtonJson, "id");
        if (!isCopyCreated && nodeButtonId != null && nodeButtonId != 0) {
            nodeButton = nodeButtonDao.get(nodeButtonId);
        } else {
            nodeButton = new SysNodeButton();
        }
        //名称
        nodeButton.setName(JacksonUtil.getFieldStringValue(nodeButtonJson, "name"));
        //环节
        nodeButton.setNode(node);
        nodeButton.setCode(JacksonUtil.getFieldStringValue(nodeButtonJson, "code"));
        nodeButton.setFlag(JacksonUtil.getFieldStringValue(nodeButtonJson, "flag"));
        nodeButton.setSort(JacksonUtil.getFieldIntValue(nodeButtonJson, "sort"));
        nodeButton.setIcon(JacksonUtil.getFieldStringValue(nodeButtonJson, "icon"));
        nodeButton.setIsShowInHandle(JacksonUtil.getFieldStringValue(nodeButtonJson, "isShowInHandle"));
        nodeButton.setType(JacksonUtil.getFieldStringValue(nodeButtonJson, "type"));
        nodeButton.setOpinion(JacksonUtil.getFieldStringValue(nodeButtonJson, "opinion"));
        //有效状态
        if (RxStringUtils.isNotEmpty(nodeButtonJson.get("sfyxSt")) && "VALID".equals(nodeButtonJson.get("sfyxSt").asText())) {
            nodeButton.setSfyxSt(SfyxSt.VALID);
        } else {
            nodeButton.setSfyxSt(SfyxSt.UNVALID);
        }
        nodeButton.setFuncName(JacksonUtil.getFieldStringValue(nodeButtonJson, "funcName"));
        //保存
        nodeButtonDao.saveSysNodeButton(nodeButton);
    }

    /**
     * 私有方法:保存环节办理人
     *
     * @param nodeCandidateJson
     * @param node
     * @param isCopyCreated
     */
    private void initNodeCandidate(JsonNode nodeCandidateJson, SysNode node, boolean isCopyCreated) {
        SysNodeCandidate nodeCandidate;
        Long nodeCandidateId = JacksonUtil.getFieldLongValue(nodeCandidateJson, "id");
        if (!isCopyCreated && nodeCandidateId != null) {
            nodeCandidate = sysNodeCandidateDao.get(nodeCandidateId);
        } else {
            nodeCandidate = new SysNodeCandidate();
        }
        nodeCandidate.setNode(node);
        //保存规则
        if (nodeCandidateJson.hasNonNull("rule")) {
            Long ruleId = JacksonUtil.getFieldLongValue(nodeCandidateJson.get("rule"), "id");
            if (ruleId != null) {
                nodeCandidate.setRule(ruleDao.getAuthRuleById(ruleId));
            }
        }
        if (nodeCandidateJson.hasNonNull("roleList")) {
            JsonNode roleList = nodeCandidateJson.get("roleList");
            List<String> roleIds = new ArrayList<>();
            for (int i = 0; i < roleList.size(); i++) {
                JsonNode roleJson = roleList.get(i);
                if (!"UNVALID".equals(JacksonUtil.getFieldStringValue(roleJson, "sfyxSt"))) {
                    roleIds.add(JacksonUtil.getFieldStringValue(roleJson, "roleId"));
                }
            }
            nodeCandidate.setRoleIds(String.join(",", roleIds));
        }
        //有效状态
        if ("VALID".equals(JacksonUtil.getFieldStringValue(nodeCandidateJson, "sfyxSt"))) {
            nodeCandidate.setSfyxSt(SfyxSt.VALID);
        } else {
            nodeCandidate.setSfyxSt(SfyxSt.UNVALID);
        }
        //保存
        sysNodeCandidateDao.save(nodeCandidate);
    }


    /**
     * 私有方法:保存环节表单
     *
     * @param nodePageJson  环节表单json
     * @param node          环节
     * @param isCopyCreated 是否为复制新建
     */
    private void initNodePage(JsonNode nodePageJson, SysNode node, boolean isCopyCreated) {
        SysNodePage nodePage;
        Long nodePageId = nodePageJson.get("id").asLong();
        if (!isCopyCreated && nodePageId != 0) {
            nodePage = sysNodePageDao.get(nodePageId);
        } else {
            nodePage = new SysNodePage();
        }
        //标题
        nodePage.setTitle(nodePageJson.get("title").asText());
        //环节
        nodePage.setNode(node);
        //关联流程表单
        nodePage.setPage_id(nodePageJson.get("sheet_id").asLong());
        //排序
        nodePage.setSort(nodePageJson.get("sort").asInt());
        //有效状态
        if ("VALID".equals(nodePageJson.get("sfyxSt").asText())) {
            nodePage.setSfyxSt(SfyxSt.VALID);
        } else {
            nodePage.setSfyxSt(SfyxSt.UNVALID);
        }
        //控制标记
        SheetMode control;
        switch (JacksonUtil.getFieldStringValue(nodePageJson, "control")) {
            case "EDIT":
                control = SheetMode.EDIT;
                break;
            case "VIEW":
                control = SheetMode.VIEW;
                break;
            default:
                control = SheetMode.EDIT;
                break;
        }
        nodePage.setControl(control);
        //12月9日：新增逻辑，添加环节表单（审批项名称和序号）
        // 2018/07/23 审批项去掉
        /*if (control.equals(SheetMode.EXAMINE)) {
            if (RxStringUtils.isNotEmpty(nodePageJson.get("spxName")) && !"null".equals(nodePageJson.get("spxName").asText())) {
                nodePage.setSpxName(nodePageJson.get("spxName").asText());
            } else {
                nodePage.setSpxName("");
            }
            if (RxStringUtils.isNotEmpty(nodePageJson.get("spxSort")) && !"0".equals(nodePageJson.get("spxSort").toString())) {
                nodePage.setSpxSort(nodePageJson.get("spxSort").asInt());
            } else {
                nodePage.setSpxSort(null);
            }
        } else {
            nodePage.setSpxName(null);
            nodePage.setSpxSort(null);
        }*/

        //保存
        sysNodePageDao.saveSysNodePage(nodePage);
    }

    /**
     * 私有方法:保存环节变量
     *
     * @param nodeVariable      环节变量json
     * @param node              环节
     * @param workflowVariables 流程变量map
     * @param isCopyCreated     是否为复制新建
     */
    private void initNodeVariable(JsonNode nodeVariable, SysNode node, Map<String, SysWorkflowVariable> workflowVariables, boolean isCopyCreated) {
        SysNodeVariableAssign nodeVariableAssign;
        Long nodeVariableId = nodeVariable.get("id").asLong();
        if (!isCopyCreated && nodeVariableId != 0) {
            nodeVariableAssign = nodeVariableAssignDao.get(nodeVariableId);
        } else {
            nodeVariableAssign = new SysNodeVariableAssign();
        }
        //流程变量，从map中获取变量
        nodeVariableAssign.setWorkflowVariable(workflowVariables.get(nodeVariable.get("name").asText()));
        //初始值
        nodeVariableAssign.setExpression(nodeVariable.get("value").asText());
        //有效状态
        if ("VALID".equals(nodeVariable.get("sfyxSt").asText())) {
            nodeVariableAssign.setSfyxSt(SfyxSt.VALID);
        } else {
            nodeVariableAssign.setSfyxSt(SfyxSt.UNVALID);
        }
        //设置环节
        nodeVariableAssign.setNode(node);
        //保存
        nodeVariableAssignDao.saveSysNodeVariableAssign(nodeVariableAssign);
    }


    /**
     * 私有方法：从json中保存工作流表单数据
     *
     * @param pagesNodes    变量json
     * @param workflow      工作流对象
     * @param isCopyCreated 是否为复制新建
     */
    private void initWorkflowPageByJson(JsonNode pagesNodes, SysWorkflow workflow, boolean isCopyCreated) {
        SysWorkflowPage workflowPage;
        Long workflowPageId = pagesNodes.get("id").asLong();
        if (!isCopyCreated && workflowPageId != 0) {
            workflowPage = workflowPageDao.get(workflowPageId);
        } else {
            workflowPage = new SysWorkflowPage();
            //所属流程
            workflowPage.setSysWorkflow(workflow);
        }
        //标题
        workflowPage.setName(pagesNodes.get("name").asText());
        //排序
        workflowPage.setSort(pagesNodes.get("sort").asInt());
        //是否有效
        if ("VALID".equals(pagesNodes.get("sfyxSt").asText())) {
            workflowPage.setSfyxSt(SfyxSt.VALID);
        } else {
            workflowPage.setSfyxSt(SfyxSt.UNVALID);
        }
        //所属表单页
        Long pageId = pagesNodes.get("sheet_id").asLong();
        if (pageId != 0) {
            SysResource page = workflowDao.getResourceById(pageId);
            workflowPage.setResource(page);
        }
        //保存
        workflowPageDao.saveWorkflowPage(workflowPage);
    }

    /**
     * 私有方法：从json中保存工作流变量数据
     *
     * @param variablesNode 变量json
     * @param workflow      工作流对象
     * @param isCopyCreated 是否为复制新建
     * @return 工作流变量
     */
    private SysWorkflowVariable initVariableByJson(JsonNode variablesNode, SysWorkflow workflow, boolean isCopyCreated) {
        SysWorkflowVariable workflowVariable;
        Long variableId = variablesNode.get("id").asLong();
        if (!isCopyCreated && variableId != 0) {
            workflowVariable = workflowVariableDao.get(variableId);
        } else {
            workflowVariable = new SysWorkflowVariable();
            //变量所属流程
            workflowVariable.setWorkflow(workflow);
        }
        //变量名称
        workflowVariable.setName(variablesNode.get("name").asText());
        //初始值
        workflowVariable.setValue(variablesNode.get("value").asText());
        //是否有效
        if ("VALID".equals(variablesNode.get("sfyxSt").asText())) {
            workflowVariable.setSfyxSt(SfyxSt.VALID);
        } else {
            workflowVariable.setSfyxSt(SfyxSt.UNVALID);
        }
        //保存
        workflowVariableDao.saveVariable(workflowVariable);
        return workflowVariable;
    }

    /**
     * 私有方法：从json中保存工作流本体数据
     *
     * @param workflowJson  工作流json数据
     * @param isCopyCreated 是否为复制新建
     * @return SysWorkflow
     */
    private SysWorkflow initWorkflowByJson(JsonNode workflowJson, boolean isCopyCreated) {
        SysWorkflow workflow;
        Long workflowId = workflowJson.get("id").asLong();
        if (!isCopyCreated && workflowId != 0) {
            workflow = get(workflowId);
        } else {
            //新增或另存新版本
            workflow = new SysWorkflow();
        }
        //已编辑数据
        if (!workflowJson.has("fromServer") || !workflowJson.get("fromServer").asBoolean()) {
            workflow.setSfyxSt(SfyxSt.VALID);
            //业务编号
            workflow.setCode(JacksonUtil.getFieldStringValue(workflowJson, "code"));
            //流程名称
            workflow.setName(JacksonUtil.getFieldStringValue(workflowJson, "name"));
            //描述
            workflow.setDescription(JacksonUtil.getFieldStringValue(workflowJson, "description"));
            //原始流程
            workflow.setWorkflow(JacksonUtil.getFieldLongValue(workflowJson, "workflow"));
            //版本号
            int version = 0;
            if (JacksonUtil.isNotEmptyFieldValue(workflowJson, "version")) {
                version = workflowJson.get("version").asInt();
            }
            // 根据操作状态设置版本号
            OperatingStatus operatingStatus = OperatingStatus.get(workflowJson.get("operatingStatus").asInt());
            workflow.setOperatingStatus(operatingStatus);
            if (operatingStatus.equals(OperatingStatus.NEWVERSION)) {
                //在最新版本基础上加一
                SysWorkflow latestWorkflow = getLatestVersionWorkflow(workflow.getCode());
                if (latestWorkflow != null) {
                    Integer latestVersion = latestWorkflow.getVersion();
                    workflow.setVersion(latestVersion + 1);
                    //发布新版本停用现版本
                    workflowDao.batchHandleWorkflowStatus(workflow.getCode());
                } else {
                    workflow.setVersion(version);
                }
            } else {
                workflow.setVersion(version);
            }
            //类别
            Long workflowTypeId = JacksonUtil.getFieldLongValue(workflowJson, "type");
            SysWorkflowType workflowType = workflowTypeDao.get(workflowTypeId);
            workflow.setType(workflowType);
            //优先级别
            String priorityValue = JacksonUtil.getFieldStringValue(workflowJson, "priority");
            if (priorityValue != null) {
                WorkflowPriority priority;
                switch (priorityValue) {
                    case "high":
                        priority = WorkflowPriority.high;
                        break;
                    case "mediun":
                        priority = WorkflowPriority.medium;
                        break;
                    default:
                        priority = WorkflowPriority.low;
                        break;
                }
                workflow.setPriority(priority);
            }
            //Bpmn格式xml
            workflow.setBpmnDef(JacksonUtil.getFieldStringValue(workflowJson, "bpmnDef"));
            //状态(草稿/发布)
            workflow.setStatus(JacksonUtil.getFieldStringValue(workflowJson, "status"));
            //前处理程序
            workflow.setStartupProcessSql(JacksonUtil.getFieldStringValue(workflowJson, "startupProcessSql"));
            //后处理程序
            workflow.setFinishProcessSql(JacksonUtil.getFieldStringValue(workflowJson, "finishProcessSql"));
            //实例标题配置
            workflow.setInstanceTitle(JacksonUtil.getFieldStringValue(workflowJson, "instanceTitle"));
            //业务状态字典  必须判空
            workflow.setWorkflowYwztZd(JacksonUtil.getFieldStringValue(workflowJson, "workflowYwztZd"));
            //环节编码字典
            workflow.setNodeCodeDictCode(JacksonUtil.getFieldStringValue(workflowJson, "nodeCodeDictCode"));
            workflowDao.save(workflow);
            if (workflow.getWorkflow() == null) {
                workflow.setWorkflow(workflow.getId());
            }
        }
        return workflow;
    }

    @Override
    public boolean hasWorkflow(Long workflowTypeId) {
        Integer wfCount = workflowDao.hasChildrenWorkflow(workflowTypeId);
        return wfCount != null && wfCount > 0;
    }

    @Override
    public Map getWorkflowJSON(Long id) {
        Map<String, Object> map = new HashMap<>();
        if (id != null) {
            SysWorkflow workflow = get(id);
            if (workflow != null) {
                //环节
                List<SysNode> nodes = sysNodeDao.findNodesByWorkflow(workflow);
                //流程表单 ？
                List<SysWorkflowPage> workflowPages = workflowPageDao.findWorkflowSheetsByWorkflow(workflow.getId());
                Map<String, String> wfn = new HashMap<>();
                for (SysWorkflowPage w : workflowPages) {
                    wfn.put(w.getId().toString(), w.getResource() != null ? w.getName() : null);
                }
                //环节表单
                List<SysNodePage> nodePages = sysNodePageDao.findNodePagesByWorkflow(workflow);
                //流向
                List<SysRouter> routers = sysRouterDao.findRoutersByWorkflow(workflow);
                //流程变量
                List<SysWorkflowVariable> workflowVariables = workflowVariableDao.findVariableByWorkflow(workflow);
                //环节变量
                List<SysNodeVariableAssign> nodeVariableAssigns = nodeVariableAssignDao.findNodeVariableAssignByWorkflow(workflow);
                //环节buttons
                List<SysNodeButton> nodeButtons = nodeButtonDao.findNodeButtonByWorkflow(workflow);
                map.put("workflow", workflow);
                map.put("nodes", nodes);
                map.put("workflowPages", workflowPages);
                map.put("nodePages", nodePages);
                map.put("routers", routers);
                map.put("workflowVariables", workflowVariables);
                map.put("nodeVariableAssigns", nodeVariableAssigns);
                map.put("wfn", wfn);
                map.put("nodeButtons", nodeButtons);
            }
        }
        return map;
    }

    @Override
    public Integer getWorkflowVersion(Long workflowId) {
        return workflowDao.getVersion(workflowId);
    }

    @Override
    public FastPagination getPageList(Map map) {
        return workflowDao.getPageList(map);
    }

    @Override
    public void expWorkflow(Long workflowId) {
        workflowDao.expWorkflow(workflowId);
    }

    @Override
    public Long impWorkflow(Workbook workbook, Long typeId) {
        return workflowDao.impWorkflow(workbook, typeId);
    }

    @Override
    public Map getSaveAsWorkflowJSON(Long id, boolean isNewVersion, boolean isCopyStructure) {
        Map<String, Object> map = new HashMap<>();
        if (id != null) {
            SysWorkflow workflow = get(id);
            if (workflow != null) {
                //环节
                List<SysNode> nodes = sysNodeDao.findNodesByWorkflow(workflow);
                //流程表单
                List<SysWorkflowPage> workflowPages = workflowPageDao.findWorkflowSheetsByWorkflow(workflow.getId());
                Map<String, String> wfn = new HashMap<>();
                for (SysWorkflowPage w : workflowPages) {
                    wfn.put(w.getId().toString(), w.getResource() != null ? w.getName() : null);
                }
                //环节表单
                List<SysNodePage> nodePages = sysNodePageDao.findNodePagesByWorkflow(workflow);
                //流向
                List<SysRouter> routers = sysRouterDao.findRoutersByWorkflow(workflow);
                //流程变量
                List<SysWorkflowVariable> workflowVariables = workflowVariableDao.findVariableByWorkflow(workflow);
                //环节变量
                List<SysNodeVariableAssign> nodeVariableAssigns = nodeVariableAssignDao.findNodeVariableAssignByWorkflow(workflow);
                //环节buttons
                List<SysNodeButton> nodeButtons = nodeButtonDao.findNodeButtonByWorkflow(workflow);
                if (isNewVersion) {
                    try {
                        workflow = (SysWorkflow) BeanUtils.cloneBean(workflow);
                        workflow.setVersion(this.getNewVersion(workflow.getCode()));
                    } catch (Exception e) {
                    }
                } else {
                    workflow = new SysWorkflow();
                    workflow.setName("新建流程");
                    workflow.setVersion(1);
                }
                map.put("workflow", isNewVersion || isCopyStructure ? workflow : null);
                map.put("workflowPages", isNewVersion ? workflowPages : new ArrayList<SysWorkflowPage>());
                map.put("workflowVariables", isNewVersion ? workflowVariables : new ArrayList<SysWorkflowVariable>());
                map.put("wfn", isNewVersion ? wfn : new HashMap<>());
                map.put("nodes", isCopyStructure ? nodes : new ArrayList<SysNode>());
                map.put("nodePages", isCopyStructure ? nodePages : new ArrayList<SysNodePage>());
                map.put("routers", isCopyStructure ? routers : new ArrayList<SysRouter>());
                map.put("nodeVariableAssigns", isCopyStructure ? nodeVariableAssigns : new ArrayList<SysWorkflowVariable>());
                map.put("nodeButtons", isCopyStructure ? nodeButtons : new ArrayList<SysNodeButton>());
            }
        }
        return map;
    }

    @Override
    public boolean hasRunningWorkflowInstance(Long workflowId) {
        return workflowDao.hasRunningWorkflowInstance(workflowId);
    }

    @Override
    public List<SysWorkflow> listVersionWorkflow(String workflowCode, Boolean isValid) {
        return workflowDao.listVersionWorkflow(workflowCode, isValid);
    }

    @Override
    public SysWorkflow getLatestVersionWorkflow(String workflowCode) {
        List<SysWorkflow> listValidWorkFlow = this.listVersionWorkflow(workflowCode, true);
        if (listValidWorkFlow != null && listValidWorkFlow.size() > 0) {
            return listValidWorkFlow.get(0);
        }
        return null;
    }

    @Override
    public Integer getNewVersion(String flowCode) {
        return workflowDao.getNewVersion(flowCode);
    }

    @Override
    public boolean isFlowCodeExist(String flowCode) {
        List<SysWorkflow> listValidWorkFlow = this.listVersionWorkflow(flowCode, true);
        return !(ToolUtil.isNullList(listValidWorkFlow));
    }

    @Override
    public FastPagination getWorkflowDefList(Map map) {
        return workflowDao.getWorkflowDefList(map);
    }

    @Override
    public FastPagination getWorkflowVersionList(Map map) {
        return workflowDao.getWorkflowVersionList(map);
    }

    @Override
    public boolean calculateLatestVersion() {
        return workflowDao.calculateLatestVersion();
    }


    @Override
    public String getBpmnDefXml(Long id) {
        return this.get(id).getBpmnDef();
    }


}
