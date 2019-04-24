package net.ruixin.dao.plat.workflow;

import net.ruixin.domain.plat.workflow.structure.node.SysNodeCandidate;

import java.util.List;

/**
 * 环节办理人配置DAO
 */
public interface ISysNodeCandidateDao {
    SysNodeCandidate get(Long id);

    /**
     * 根据环节查询办理人配置
     * @param nodeId 环节Id
     * @return
     */
    List<SysNodeCandidate> queryCandidateByNode(Long nodeId);

    void save(SysNodeCandidate nodeCandidate);
}
