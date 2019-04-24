package net.ruixin.service.plat.workflow;

import net.ruixin.domain.plat.workflow.structure.frame.SysWorkflow;
import net.ruixin.util.paginate.FastPagination;
import org.apache.poi.ss.usermodel.Workbook;

import java.util.List;
import java.util.Map;

/**
 * @author Jealous
 * @date 2016-8-8
 * 工作流：服务接口
 */
public interface IWorkflowService {

    /**
     * 获取工作流
     *
     * @param id 工作流ID
     * @return SysWorkflow
     */
    SysWorkflow get(Long id);

    /**
     * 获取工作流List
     *
     * @param workfolwTypeId 工作流类型ID
     * @return List
     */
    List<SysWorkflow> findWorkflowsByType(Long workfolwTypeId);

    /**
     * 获取最新版工作流List
     *
     * @param workfolwTypeId 工作流类型ID
     * @return List
     */
    List<SysWorkflow> findLatestVersionWfByType(Long workfolwTypeId);

    /**
     * 根据流程编码获取流程
     *
     * @param flowCode 流程编码
     * @return SysWorkflow
     */
    SysWorkflow findWorkflowByCode(String flowCode);

    /**
     * 查询所有的流程
     *
     * @return List
     */
    List<SysWorkflow> findAllWorkflow();

    /**
     * 删除工作流
     *
     * @param id 工作流ID
     * @return 成功否
     */
    String delWorkflow(Long id);

    /**
     * 保存工作流
     *
     * @param json json格式工作流内容
     * @return 成功否
     */
    Long saveWorkflow(String json);

    /**
     * 判断某流程类别下是否有流程
     *
     * @param id 流程类别ID
     * @return 是否
     */
    boolean hasWorkflow(Long id);

    /**
     * 获取工作流的JSON数据
     *
     * @param id 流程ID
     * @return JSON数据
     */
    Map getWorkflowJSON(Long id);

    /**
     * 获取工作流最大版本号
     *
     * @param workflowId 流程ID
     * @return 最大版本号
     */
    Integer getWorkflowVersion(Long workflowId);

    /**
     * 分页查询流程表单
     *
     * @param map 参数集
     * @return FastPagination
     */
    FastPagination getPageList(Map map);

    /**
     * 以excel的方式导出流程数据
     *
     * @param workflowId 流程编号
     */
    void expWorkflow(Long workflowId);

    /**
     * 导入excel中流程数据
     *
     * @param workbook 工作簿
     * @param typeId   流程类别ID
     */
    Long impWorkflow(Workbook workbook, Long typeId);

    /**
     * 获取另存方式的工作流
     *
     * @param workflowId 流程编号
     * @return
     * @isNewVersion 是否新建为新版本
     * @isCopyStructure 是否复制流程结构图
     */
    Map getSaveAsWorkflowJSON(Long workflowId, boolean isNewVersion, boolean isCopyStructure);

    /**
     * 检查此流程下是否有正在运行的流程实例
     *
     * @param workflowId 流程编号
     * @return
     */
    boolean hasRunningWorkflowInstance(Long workflowId);

    /**
     * 根据流程编码获取所有版本的流程
     *
     * @param workflowCode 流程编码
     * @param isValid      是否有效 null:所有 true:有效 false:无效
     * @return
     */
    List<SysWorkflow> listVersionWorkflow(String workflowCode, Boolean isValid);

    /**
     * 获取最新版本流程
     *
     * @param workflowCode 流程编码
     * @return
     */
    SysWorkflow getLatestVersionWorkflow(String workflowCode);

    /**
     * 根据流程编码获取新版本版本号
     *
     * @param flowCode 流程编码
     * @return
     */
    Integer getNewVersion(String flowCode);

    /**
     * 检查流程编码已存在
     *
     * @param flowCode 流程编码
     * @return
     */
    boolean isFlowCodeExist(String flowCode);

    /**
     * 获取工作流设计的集合
     *
     * @param map
     * @return
     */
    FastPagination getWorkflowDefList(Map map);

    /**
     * 获取流程定义版本集合
     *
     * @param map 流程编码
     * @return
     */
    FastPagination getWorkflowVersionList(Map map);


    /**
     * 计算流程最新版本
     * @return
     */
    boolean calculateLatestVersion();

    /**
     * 获取流程定义Bpmn Xml
     * @param id
     * @return
     */
    String getBpmnDefXml(Long id);
}
