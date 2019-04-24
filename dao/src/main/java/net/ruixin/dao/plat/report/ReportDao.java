package net.ruixin.dao.plat.report;

import net.ruixin.dao.plat.message.IMessageDao;
import net.ruixin.domain.plat.message.Message;
import net.ruixin.util.hibernate.BaseDao;
import net.ruixin.util.paginate.FastPagination;
import net.ruixin.util.tools.RxStringUtils;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * @author Zxh
 */
@Repository
public class ReportDao extends BaseDao<Message> implements IReportDao {

    @Override
    public List<Map<String,Object>> getReportFormData() {
        String sql = "select gs.*\n" +
                "  from (select cs.age_area, count(cs.user_name) as user_name_num\n" +
                "          from (select fs.*\n" +
                "                  from (select num_area_format(bs.age, '0-20,21-40,41-60,61+') as age_area,\n" +
                "                               bs.*\n" +
                "                          from (select * from VO_USER_INFO) bs) fs\n" +
                "                 where 1=1 ) cs\n" +
                "         group by cs.age_area) gs\n" +
                " order by age_area asc";
        return getJdbcTemplate().queryForList(sql);
    }

    @Override
    public List<Map<String,Object>> getFormData(String sql, List params) {
        return getJdbcTemplate().queryForList(sql, params.toArray());
    }
}