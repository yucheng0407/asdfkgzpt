package net.ruixin.service.plat.workflow.title;

import net.ruixin.domain.plat.workflow.structure.frame.SysWorkflow;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

//请假流程实例标题生成策略
@Service
public class QjlcWfInsTitle implements IWfInsTitleStrategy {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public String getWfInsTitle(Long dataId, SysWorkflow wf) {
        StringBuilder title = new StringBuilder("[" + wf.getName() + "]");
        if (null == dataId) {
            title.append("(草稿)");
        } else {
            String sql = "SELECT NAME FROM SYS_TEACHER WHERE ID=? AND SFYX_ST='1'";
            String teacherName = jdbcTemplate.queryForObject(sql, String.class, dataId);
            title.append(teacherName);
        }
        return title.toString();
    }
}
