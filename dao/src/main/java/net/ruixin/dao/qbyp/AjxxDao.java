package net.ruixin.dao.qbyp;

import org.springframework.stereotype.Repository;     
import net.ruixin.util.paginate.FastPagination;
import java.util.Map;
import java.util.ArrayList;
import java.util.List;
import net.ruixin.util.hibernate.BaseDao;              
import net.ruixin.domain.qbyp.Ajxx;

/**
 * 案件信息 Dao实现
 *
 * @author rxCoder on 2019-4-9 11:47:55
 */
@Repository
public class AjxxDao extends BaseDao<Ajxx> implements IAjxxDao {
    @Override
    public FastPagination getAjxxListPage(Map map) {
        StringBuilder sql = new StringBuilder();
        List<Object> params = new ArrayList<>();

        sql.append("SELECT T.ID,T.AJBH,T.AJMC,T.AJLX,T.AJLB,T.AJZT,T.AY,T.AJXZ,T.SFQFCCA_ST,T.SFMA_ST,T.SFSQA_ST,T.SFSXFFJY_ST,T.SFSXLS_ST,T.SFSW_ST,T.FXSJQ,T.FXSJZ,T.AFSJQ,T.AFSJZ,T.FAXZQH,T.FASQ,T.FADD,T.SWRS,T.SSRS,T.SSZJZ,T.AJGJC,T.AYAQ,T.SHAPE FROM T_AJST_AJXX T WHERE T.SFYX_ST='1' ");


        sql.append("ORDER BY T.XGSJ DESC");
        return super.getPaginationBySql(sql, params,map);
    }

}