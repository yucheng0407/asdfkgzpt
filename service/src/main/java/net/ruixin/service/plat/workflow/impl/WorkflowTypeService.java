package net.ruixin.service.plat.workflow.impl;

import net.ruixin.dao.plat.workflow.IWorkflowDao;
import net.ruixin.dao.plat.workflow.IWorkflowTypeDao;
import net.ruixin.domain.plat.workflow.structure.frame.SysWorkflow;
import net.ruixin.domain.plat.workflow.structure.frame.SysWorkflowType;
import net.ruixin.service.plat.workflow.IWorkflowTypeService;
import net.ruixin.util.cache.Cache;
import net.ruixin.util.cache.CacheKit;
import net.ruixin.util.http.HttpKit;
import net.ruixin.util.support.ToolUtil;
import net.ruixin.util.tree.FlowTreeNode;
import net.ruixin.util.tree.TreeUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Jealous on 2016-8-9.
 * 工作流：流程类别服务接口实现
 */
@SuppressWarnings("unused")
@Service
@Transactional
public class WorkflowTypeService implements IWorkflowTypeService {

    @Autowired
    private IWorkflowDao workflowDao;

    @Autowired
    private IWorkflowTypeDao workflowTypeDao;

    @Override
    public List<SysWorkflowType> findWorkflowTypesByParent(Long id) {
        return workflowTypeDao.findByParent(id);
    }

    @Override
    public List<SysWorkflowType> findTopWorkflowTypes() {
        return workflowTypeDao.findTops();
    }

    @SuppressWarnings("unchecked")
    @Override
    public List parseTreeMap(List<SysWorkflowType> list, List<SysWorkflow> sysWorkflowList, String treeType) {
        List jsonList = new ArrayList();
        if (list != null) {
            for (SysWorkflowType workflowtype : list) {
                Map map = new HashMap();
                map.put("id", workflowtype.getId());
                map.put("name", workflowtype.getName());
                map.put("type", "workflowtype");
                boolean isParent = workflowtype.isParent();
                if ("workflow".equalsIgnoreCase(treeType)) {
                    List workflowList = workflowDao.findLatestVersionWfByType(workflowtype.getId());
                    isParent = !ToolUtil.isNullList(workflowList) || isParent;
                }
                map.put("isParent", isParent);
                map.put("icon", HttpKit.handleCtxPath(CacheKit.get(Cache.CONFIG, "flowType")));
                if (workflowtype.getParentId() == null) {
                    map.put("pId", null);
                    map.put("open", true);
                } else {
                    map.put("pId", workflowtype.getParentId());
                }
                jsonList.add(map);
            }
        }
        if (sysWorkflowList != null) {
            for (SysWorkflow workflow : sysWorkflowList) {
                Map map = new HashMap();
                map.put("id", "f_" + workflow.getId());
                map.put("name", workflow.getName() + "(v" + workflow.getVersion() + ")");
                map.put("type", "workflow");
                List listVersion = workflowDao.listVersionWorkflow(workflow.getCode(), true);
                map.put("isParent", workflow.isLatestVersion() && listVersion != null && listVersion.size() > 1);
                map.put("icon", HttpKit.handleCtxPath(CacheKit.get(Cache.CONFIG, "flow")));
                jsonList.add(map);
            }
        }
        return jsonList;
    }

    @Override
    public boolean delWorkflowType(Long id) {
        return workflowTypeDao.del(id);
    }

    @Override
    public SysWorkflowType getWorkflowType(Long id) {
        return workflowTypeDao.get(id);
    }

    @Override
    public void saveWorkflowType(SysWorkflowType sysWorkflowType) {
        workflowTypeDao.save(sysWorkflowType);
    }

    @Override
    public boolean hasChildren(Long id) {
        Integer wftCount = workflowTypeDao.hasChildrenWorkflowTypes(id);
        return wftCount != null && wftCount > 0;
    }

    @Override
    public List<FlowTreeNode> getSyncWorkflowTypeAndWorkflowTree() {
        FlowTreeNode root = new FlowTreeNode();
        root.setHandleId("t_");
        TreeUtils.createTree(workflowTypeDao.getSyncWorkflowTypeAndWorkflowTree(), root);
        if (null != root.getChildren() && root.getChildren().size() > 0) {
            root.getChildren().get(0).setOpen(true);
            root.getChildren().get(0).setEditNameFlag(false);
        }
        return root.getChildren();
    }

    @Override
    public List<Map<String, Object>> getWfTypeTreeData() {
        List<Map<String, Object>> list = workflowTypeDao.getWfTypeTreeData();
        List<Map<String, Object>> typeTreeData = null;
        if (list != null && list.size() > 0) {
            Object icon = HttpKit.handleCtxPath(CacheKit.get(Cache.CONFIG, "flowType"));
            typeTreeData = new ArrayList<>();
            Map<String, Object> map = null;
            for (Map<String, Object> aList : list) {
                map = aList;
                map.put("icon", icon);
                if (null == aList.get("pId")) {
                    map.put("open", true);
                }
                typeTreeData.add(map);
            }
        }
        return typeTreeData;
    }

    @Override
    public List<FlowTreeNode> getFlowTypeAndFlowTree() {
        FlowTreeNode root = new FlowTreeNode();
        root.setHandleId("t_");
        TreeUtils.createTree(workflowTypeDao.getFlowTypeAndFlowTree(), root);
        if (null != root.getChildren() && root.getChildren().size() > 0) {
            root.getChildren().get(0).setOpen(true);
            root.getChildren().get(0).setEditNameFlag(false);
        }
        return root.getChildren();
    }

}
