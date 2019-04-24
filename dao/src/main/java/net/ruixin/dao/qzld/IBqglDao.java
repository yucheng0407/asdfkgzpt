package net.ruixin.dao.qzld;

import net.ruixin.domain.qzld.Bqgl;
import net.ruixin.util.hibernate.IBaseDao;
import net.ruixin.util.paginate.FastPagination;

import java.util.Date;
import java.util.List;
import java.util.Map;

public interface IBqglDao  extends IBaseDao<Bqgl> {



    /***
     * 备勤管理列表页面
     * @param map
     * @return FastPagination
     * */
    FastPagination getBqglListPage(Map map);

    /**
     * 值班领导
     * @param defaultOrganid
     * @return list
     * */
    List getZbld(Long defaultOrganid);

    /**
     * 引用历史
     * @param map;
     * @return FastPagination
     * */
    FastPagination getYylsList(Map map);


    /**
     * 根据日期去查询备勤管理任务
     * @param date
     * @return list
     * */
    List<Bqgl> findQbglByDay(Date date);
}
