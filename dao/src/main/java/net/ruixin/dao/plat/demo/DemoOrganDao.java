package net.ruixin.dao.plat.demo;

import net.ruixin.domain.plat.demo.DemoOrgan;
import net.ruixin.util.hibernate.BaseDao;
import net.ruixin.util.paginate.FastPagination;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Created by pitcher on 2017/5/18.
 */
@Repository
public class DemoOrganDao extends BaseDao<DemoOrgan> implements IDemoOrganDao {
    @Override
    public FastPagination getDemoOrganList(Map map) {
        StringBuilder sql = new StringBuilder();
        List<Object> params = new ArrayList<>();
        sql.append("SELECT T.ID,T.ORGAN_NAME FROM SYS_DEMO_ORGAN T WHERE T.SFYX_ST='1' ORDER BY T.ID DESC");
        return super.getPaginationBySql(sql, params, map);
    }

    //批量导入数据
    public void addExcelData(final List<Map<String, Object>> list) {

        String sql = "INSERT INTO SYS_DEMO_USER (ID,USER_NAME,SEX,CSRQ,ORGAN_ID,DESCRIPTION,SFYX_ST) VALUES(SEQ_SYS_DEMO_USER.NEXTVAL,?,?,to_date(?,'yyyy/mm/dd hh24:mi:ss'),?,?,'1')";

        super.getJdbcTemplate().batchUpdate(sql, new BatchPreparedStatementSetter() {
            @Override
            public void setValues(PreparedStatement ps, int i) throws SQLException {
                ps.setString(1, list.get(i).get("NAME").toString());//用户名称
                ps.setString(2, list.get(i).get("SEX").toString());//性别
                ps.setString(3, list.get(i).get("CSRQ").toString()); //出生日期
                ps.setString(4, list.get(i).get("ORGAN").toString()); //机构
                ps.setString(5, list.get(i).get("DESCRIPTION").toString()); //备注
            }
            @Override
            public int getBatchSize() {
                return list.size();
            }
        });
    }

    @Override
    public Integer getIdByDemoUserName(String organName){
        String sql="SELECT ID FROM SYS_DEMO_ORGAN WHERE ORGAN_NAME=? AND SFYX_ST='1'";
        return getJdbcTemplate().queryForObject(sql,Integer.class,organName);
    }

}
