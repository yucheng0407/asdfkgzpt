package net.ruixin.dao.plat.workflow;

import net.ruixin.domain.plat.workflow.structure.frame.SysWorkflow;
import net.ruixin.domain.plat.workflow.structure.node.SysNode;
import net.ruixin.domain.plat.workflow.structure.node.SysNodeButton;

import java.util.List;
import java.util.Map;

/*
* 工作流环节个性button
* */
public interface ISysNodeButtonDao {

    List<SysNodeButton> findNodeButtonByWorkflow(SysWorkflow workflow);

    SysNodeButton get(Long nodeButtonId);

    void saveSysNodeButton(SysNodeButton nodeButton);

    /**
     * 查询环节配置按钮
     * @param sysNode
     * @return
     */
    List<SysNodeButton> findNodeButtonByNode(SysNode sysNode);

    List<Map<String,Object>> queryButtonsByNode(Long nodeId);
}
