package net.ruixin.dao.plat.workflow.impl;

import net.ruixin.dao.plat.workflow.ISysNodeCandidateDao;
import net.ruixin.domain.plat.workflow.structure.node.SysNodeCandidate;
import net.ruixin.util.hibernate.BaseDao;
import org.apache.commons.lang3.StringUtils;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.*;
import java.util.stream.Collectors;

@SuppressWarnings({"SqlDialectInspection", "SqlNoDataSourceInspection"})
@Repository
public class SysNodeCandidateDao extends BaseDao<SysNodeCandidate> implements ISysNodeCandidateDao {

    @Override
    public SysNodeCandidate get(Long id) {
        return super.get(id);
    }

    @Override
    public List<SysNodeCandidate> queryCandidateByNode(Long nodeId) {
        List<SysNodeCandidate> candidates = this.findListByHql("from SysNodeCandidate where node.id=?", nodeId);
        if (candidates != null && candidates.size() > 0) {
            for (SysNodeCandidate candidate : candidates) {
                if (StringUtils.isNotEmpty(candidate.getRoleIds())) {
                    Map<String, Object> param = new HashMap<>();
                    param.put("IDS", Arrays.asList(candidate.getRoleIds().split(",")).stream().map(s -> Long.parseLong(s.trim())).collect(Collectors.toList()));
                    candidate.setRoleList(this.npJdbcTemplate.query("SELECT R.ID,R.ROLE_NAME FROM SYS_ROLE R WHERE R.ID IN (:IDS)",
                            param,
                            new RowMapper<Map<String, Object>>() {
                                @Override
                                public Map<String, Object> mapRow(ResultSet rs, int rowNum) throws SQLException {
                                    Map<String, Object> row = new HashMap<>();
                                    row.put("roleId", rs.getLong("ID"));
                                    row.put("roleName", rs.getString("ROLE_NAME"));
                                    return row;
                                }
                            }
                    ));
                }
            }
        }
        return candidates;
    }

    @Override
    public void save(SysNodeCandidate nodeCandidate) {
        super.saveOrUpdate(nodeCandidate);
    }
}
