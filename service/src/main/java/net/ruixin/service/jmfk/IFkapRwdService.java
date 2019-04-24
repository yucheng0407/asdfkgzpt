package net.ruixin.service.jmfk;

import net.ruixin.service.plat.common.IBaseService;
import net.ruixin.util.paginate.FastPagination;
import java.util.Map;
import net.ruixin.domain.jmfk.FkapRwd;
/**
 * 防控安排表 Service接口
 *
 * @author rxCoder on 2019-4-9 11:52:00
 */
public interface IFkapRwdService extends IBaseService {

    /**
     * 获取FkapRwd分页列表
     *
     * @param map 查询条件
     * @return 分页信息
     */
    FastPagination getFkapRwdListPage(Map map);
    /**
     * 保存防控安排表
     *
     * @param deviceIds
     * @param fkapRwd 防控安排表
     * @param zjsbs
     */
    void saveFkapRwd(FkapRwd fkapRwd,String deviceIds,String zjsbs);

    /**
     * 获取organName
     * @param id
     * @return map
     * */
    Map getOrganName(Long id);

    /**
     * 巡区列表
     * @param map
     * @param xqlx
     * @return FastPagination
     * */
    FastPagination getXqListPage(Map map,String xqlx);

    /**
     * 设备列表
     * @param map
     * @param equipmentParent
     * @param equipmentChild
     * @return FastPagination
     * */
    FastPagination getDeviceListPage(Map map, String equipmentParent, String equipmentChild);

    /***
     * 重防
     * @param map
     * @return FastPagination
     * */
    FastPagination getZfListPage(Map map);

    /**
     * 判断任务日期时间是否被包含
     * @param fkapRwd
     * @return boolean
     * */
    Boolean judgeRq(FkapRwd fkapRwd);

    /**
     * 判断巡组是否相同
     **/
    Boolean judgeXz(FkapRwd fkapRwd);

    /**
     *  判断民警是否相同
     * */
    Boolean judgeMj(FkapRwd fkapRwd);

    /**
     * 判断设备是否相同
     * */
    Boolean judgeDevices( FkapRwd fkapRwd,String deviceIds);

    /**
     * 赋值巡区名称
     * @param rwd
     * */
    void setXqmc(FkapRwd rwd);
    /**
     * 赋值重防巡区名称
     * @param rwd
     * */
    void getZfxqmc(FkapRwd rwd);

    /**
     * 赋值重防时段
     * */
    void setZfsd(FkapRwd rwd);

    /**
     * 赋值设备
     * */
    void setSbs(FkapRwd rwd);
}