package net.ruixin.service.qzld;

import net.ruixin.domain.qzld.Bqgl;
import net.ruixin.util.paginate.FastPagination;

import java.util.List;
import java.util.Map;

public interface IBqglService {

    /***
     * 备勤管理列表页面
     * @param map
     * @return FastPagination
     * */
    FastPagination getBqglListPage(Map map);


    /***
     * 获取默认登录用户信息
     * @return map
     * */
    Map getDefaultUser();

    /**
     * 获取值班领导信息
     * @param defaultOrganid
     * @return list
     * */
    List getZbld(Long defaultOrganid);

    /**
     * 保存备勤管理
     * @param bqgl
     * @param drs
     * */
    void saveBqgl(Bqgl bqgl,String drs);

    /**
     * 发布
     * @param ids
     * */
    void changeFbzt(String ids);


    /**
     * 引用历史
     * @param map;
     * @return FastPagination
     * */
    FastPagination getYylsList(Map map);

    /***
     *
     * 通过id去查询备勤管理任务
     * @param id
     * @return Bqgl
     * */
    Bqgl getBqglById(Long id);
    /**
     * 删除
     * @param ids
     * */
    void deleteBqgl(String ids);

    /**
     * 全选发布
     * */
    void qxfb();
}
