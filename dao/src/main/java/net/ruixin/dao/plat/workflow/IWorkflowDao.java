package net.ruixin.dao.plat.workflow;

import net.ruixin.domain.plat.resource.SysResource;
import net.ruixin.domain.plat.workflow.structure.frame.SysWorkflow;
import net.ruixin.util.paginate.FastPagination;
import net.ruixin.util.tree.FlowTreeNode;
import org.apache.poi.ss.usermodel.Workbook;

import java.util.List;
import java.util.Map;

/**
 * @author Jealous
 * @date 2016-8-10
 * 工作流Dao接口
 */
public interface IWorkflowDao {

    /**
     * 保存工作流
     *
     * @param workflow 工作流
     */
    void save(SysWorkflow workflow);

    void update(SysWorkflow workflow);

    /**
     * 获取工作流
     *
     * @param id 工作流ID
     * @return 工作流
     */
    SysWorkflow get(Long id);

    /**
     * 通过类型获取工作流
     *
     * @param workfolwTypeId 工作流类型ID
     * @return 工作流List
     */
    List<SysWorkflow> findByType(Long workfolwTypeId);

    /**
     * 通过编码获取工作流
     *
     * @param flowCode 工作流编码
     * @return 工作流List
     */
    SysWorkflow findByCode(String flowCode);

    /**
     * 查询所有工作流
     *
     * @return 工作流List
     */
    List<SysWorkflow> findAll();

    /**
     * 删除工作流
     *
     * @param id 工作流ID
     * @return 操作结果
     */
    boolean del(Long id);

    /**
     * 判断流程类别下是否有工作流
     *
     * @param workflowTypeId 流程类别ID
     * @return 工作流总数
     */
    Integer hasChildrenWorkflow(Long workflowTypeId);

    /**
     * 获取工作流的名称
     *
     * @param workflowIds 工作流IDS
     * @return 工作流名称逗号拼接str
     */
    @SuppressWarnings("unused")
    String getWorkflowNames(String workflowIds);

    /**
     * 分页查询流程表单
     *
     * @param map 参数集
     * @return FastPagination
     */
    FastPagination getPageList(Map map);

    /**
     * 根据页面ID获取页面
     *
     * @param pageId 页面ID
     * @return SysResource
     */
    SysResource getResourceById(Long pageId);

    /**
     * 以excel的方式导出流程数据
     *
     * @param workflowId 流程编号
     */
    void expWorkflow(Long workflowId);

    /**
     * 导入excel中流程数据
     *  @param workbook 工作簿
     * @param typeId   流程类别ID
     */
    Long impWorkflow(Workbook workbook, Long typeId);

    /**
     * 根据流程ID获取最大版本号
     *
     * @param workflowId 流程ID
     * @return 最大版本号
     */
    Integer getVersion(Long workflowId);

    /**
     * 通过类型获取最新版工作流
     *
     * @param workfolwTypeId 工作流类型ID
     * @return 工作流List
     */
    List<SysWorkflow> findLatestVersionWfByType(Long workfolwTypeId);

    /**
     * 删除工作流
     * @param wiId 流程编号
     * @return
     */
    String delWorkflow(Long wiId);


    /**
     * 检查此流程下是否有正在运行的流程实例
     * @param workflowId 流程编号
     * @return
     */
    boolean hasRunningWorkflowInstance(Long workflowId);

    /**
     * 根据流程编码获取所有版本的流程
     * @param workflowCode 流程编码
     * @param isValid 是否有效 null:所有 true:有效 false:无效
     * @return
     */
    List<SysWorkflow> listVersionWorkflow(String workflowCode, Boolean isValid);

    /**
     * 根据流程编码获取新版本版本号
     * @param flowCode 流程编码
     * @return
     */
    Integer getNewVersion(String flowCode);

    /**
     * 计算流程最新版本
     * @return
     */
    boolean calculateLatestVersion();

    /**
     * 获取工作流设计列表
     * @param map
     * @return
     */
    FastPagination getWorkflowDefList(Map map);


    /**
     * 获取某流程编码下的所有版本号
     * @param map
     * @return
     */
    FastPagination getWorkflowVersionList(Map map);

    /**
     * 获取某流程编码的已发布版本
     * @param code
     * @return
     */
    SysWorkflow getReleasedWorkflowByCode(String code);

    /**
     * 批量停用某流程编码下的所有流程
     * @param code
     */
    void batchHandleWorkflowStatus(String code);
}
