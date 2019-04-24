package net.ruixin.util.data;

import net.ruixin.domain.plat.BaseDomain;
import net.ruixin.util.support.ToolUtil;
import net.ruixin.util.tools.RxStringUtils;

import java.util.Map;

/**
 * 工作流运行参数
 */
public class FlowParam extends BaseDomain {
    //流程编码
    private String flowCode;

    //流程实例ID
    private Long wiId;

    //任务ID
    private Long taskId;

    //业务数据ID
    private Long ywDataId;

    //环节页面ID
    private Long npId;

    //环节ID
    private Long nId;

    //任务表单实例ID
    private Long sId;

    //当前任务环节序号
    private int sort;

    //当前运行环节序号
    private int runNodeSort;

    //环节信息
    private Map<String, Object> node;

    //页面信息
    private Map<String, Object> page;

    //流程信息
    private Map<String, Object> workflow;

    public String getFlowCode() {
        return flowCode;
    }

    public void setFlowCode(String flowCode) {
        this.flowCode = flowCode;
    }

    public Long getWiId() {
        return wiId;
    }

    public void setWiId(Long wiId) {
        this.wiId = wiId;
    }

    public Long getTaskId() {
        return taskId;
    }

    public void setTaskId(Long taskId) {
        this.taskId = taskId;
    }

    public Long getYwDataId() {
        return ywDataId;
    }

    public void setYwDataId(Long ywDataId) {
        this.ywDataId = ywDataId;
    }

    public Long getNpId() {
        return npId;
    }

    public void setNpId(Long npId) {
        this.npId = npId;
    }

    public Long getnId() {
        return nId;
    }

    public void setnId(Long nId) {
        this.nId = nId;
    }

    public Long getsId() {
        return sId;
    }

    public void setsId(Long sId) {
        this.sId = sId;
    }

    public int getSort() {
        return sort;
    }

    public void setSort(int sort) {
        this.sort = sort;
    }

    public int getRunNodeSort() {
        return runNodeSort;
    }

    public void setRunNodeSort(int runNodeSort) {
        this.runNodeSort = runNodeSort;
    }

    public Map<String, Object> getNode() {
        return node;
    }

    public void setNode(Map<String, Object> node) {
        this.node = node;
        if(ToolUtil.isNotEmpty(node)) {
            if(RxStringUtils.isNotEmpty(getKeyValue("id", node))) {
                this.setnId(Long.valueOf(getKeyValue("id", node)));
            }
            if(RxStringUtils.isNotEmpty(getKeyValue("sort", node))) {
                this.setSort(Integer.parseInt(getKeyValue("sort", node)));
            }
        }
    }

    public Map<String, Object> getPage() {
        return page;
    }

    public void setPage(Map<String, Object> page) {
        this.page = page;
        if(ToolUtil.isNotEmpty(page)) {
            if(RxStringUtils.isNotEmpty(getKeyValue("nodePageId", page))) {
                this.setnId(Long.valueOf(getKeyValue("nodePageId", page)));
            }
            if(RxStringUtils.isNotEmpty(getKeyValue("taskPageId", node))) {
                this.setsId(Long.valueOf(getKeyValue("taskPageId", node)));
            }
        }
    }

    public Map<String, Object> getWorkflow() {
        return workflow;
    }

    public void setWorkflow(Map<String, Object> workflow) {
        this.workflow = workflow;
        if(ToolUtil.isNotEmpty(workflow)) {
            if(RxStringUtils.isNotEmpty(getKeyValue("runNodeSort", workflow))) {
                this.setRunNodeSort(Integer.parseInt(getKeyValue("runNodeSort", workflow)));
            }
            if(RxStringUtils.isNotEmpty(getKeyValue("dataId", workflow))) {
                this.setYwDataId(Long.valueOf(getKeyValue("dataId", workflow)));
            }
            if(RxStringUtils.isNotEmpty(getKeyValue("code", workflow))) {
                this.setFlowCode((String)getKeyValue("code", workflow));
            }
            if(RxStringUtils.isNotEmpty(getKeyValue("insId", workflow))) {
                this.setWiId(Long.valueOf(getKeyValue("insId", workflow)));
            }
            if(RxStringUtils.isNotEmpty(getKeyValue("taskId", workflow))) {
                this.setTaskId(Long.valueOf(getKeyValue("taskId", workflow)));
            }
        }
    }

    private String getKeyValue(String key, Map map) {
        String value = "";
        if(RxStringUtils.isNotEmpty(key) && ToolUtil.isNotEmpty(map) && map.containsKey(key)) {
            if(map.get(key) != null) {
                value = map.get(key).toString();
            }
        }
        return value;
    }
}
