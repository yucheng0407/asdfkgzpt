package net.ruixin.dao.qzld;

import net.ruixin.domain.qzld.Bqgl;
import net.ruixin.util.hibernate.BaseDao;
import net.ruixin.util.paginate.FastPagination;
import net.ruixin.util.tools.RxStringUtils;
import org.springframework.stereotype.Repository;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Repository
public class BqglDao extends BaseDao<Bqgl>  implements IBqglDao {
    @Override
    public FastPagination getBqglListPage(Map map) {
        StringBuilder sql = new StringBuilder();
        List<Object> params = new ArrayList<>();
        sql.append("SELECT ID , ZRDW,  ZRDWMC ,to_char(ZBKSSJ,'HH24:mi') ZBKSSJ ,to_char(ZBJSSJ,'HH24:mi') ZBJSSJ,  ZBLD ,ZBLDXM ,ZBLDZW ,ZBLDDH ,ZBSDH ,ZBMJS ,ZBMJMCS ,BQLD ,BQLDMC, BQMJS , BQMJMCS\n" +
                " , to_char(XGSJ,'yyyy-MM-dd HH24:mi:ss')  XGSJ  , SFFB_ST  FROM   T_ZBBQ_RWD  WHERE  SFYX_ST='1'");
        //查询
        if (RxStringUtils.isNotEmpty(map.get("name"))) {
             sql.append("AND ( INSTR(ZBLDXM,?)>0 OR INSTR(ZBMJMCS,?)>0  OR  INSTR(BQLDMC,?)>0  OR  INSTR(BQMJMCS,?)>0 )");
            params.add(map.get("name"));
            params.add(map.get("name"));
            params.add(map.get("name"));
            params.add(map.get("name"));
        }
        if(RxStringUtils.isNotEmpty(map.get("date"))){
            sql.append(" AND to_date((to_char(ZBKSSJ,'yyyy-MM-dd')) ,'yyyy-MM-dd') =  to_date(?,'yyyy-MM-dd')");
            params.add(map.get("date"));
        }
        if(RxStringUtils.isNotEmpty(map.get("organId"))){
            sql.append(" AND ZRDW = ? ");
            params.add(map.get("organId"));
        }
        sql.append("ORDER BY XGSJ DESC");
        FastPagination pagination = super.getPaginationBySql(sql, params, map);
        return pagination;
    }
    @Override
    public  List getZbld(Long defaultOrganid){
        String sql="SELECT ID  code, USER_NAME  value  FROM SYS_USER WHERE DEFAULT_ORGAN_ID=? AND SFYX_ST='1'";
        return super.jdbcTemplate.queryForList(sql,new Object[]{defaultOrganid});
    }
    @Override
    public  FastPagination getYylsList(Map map){
        StringBuilder sql = new StringBuilder();
        List<Object> params = new ArrayList<>();
        sql.append("SELECT ID , ZRDW,  ZRDWMC  ,to_char(ZBKSSJ,'HH24:mi') ZBKSSJ ,to_char(ZBJSSJ,'HH24:mi') ZBJSSJ, ZBLD ,ZBLDXM ,ZBLDZW ,ZBLDDH ,ZBSDH ,ZBMJS ,ZBMJMCS ,BQLD ,BQLDMC, BQMJS , BQMJMCS\n" +
                " , to_char(ZBKSSJ,'yyyy-MM-dd HH24:mi:ss')  XGSJ  , SFFB_ST  FROM   T_ZBBQ_RWD  WHERE  SFYX_ST='1'");
        //查询
        if (RxStringUtils.isNotEmpty(map.get("name"))) {
            sql.append(" AND (ZBLDXM LIKE ? OR BQLDMC LIKE ?)");
            params.add(map.get("name"));
            params.add(map.get("name"));
        }
        if (RxStringUtils.isNotEmpty(map.get("date"))) {
            sql.append(" AND to_date((to_char(ZBKSSJ,'yyyy-MM-dd')) ,'yyyy-MM-dd') =  to_date(?,'yyyy-MM-dd')");
            params.add(map.get("date"));

        }
        sql.append("ORDER BY XGSJ DESC");

        FastPagination pagination = super.getPaginationBySql(sql, params, map);
        return pagination;
    }

    @Override
    public List<Bqgl> findQbglByDay(Date date){
        List<Bqgl> bqgls=new ArrayList<>();
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        List<Long> list = this.jdbcTemplate.queryForList("SELECT ID  FROM T_ZBBQ_RWD t WHERE to_char(t.ZBKSSJ,'yyyy-MM-dd')=?", new Object[]{dateFormat.format(date)}, Long.class);
        for(Long L:list){
         bqgls.add(this.get(L));
        }
        return bqgls;
    }
}
