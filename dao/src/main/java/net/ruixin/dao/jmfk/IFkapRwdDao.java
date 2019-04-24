package net.ruixin.dao.jmfk;
import java.util.Date;
import java.util.Map;
import net.ruixin.util.paginate.FastPagination;
import net.ruixin.util.hibernate.IBaseDao;
import net.ruixin.domain.jmfk.FkapRwd;

/**
 * 防控安排表Dao接口
 *
 * @author rxCoder on 2019-4-9 11:52:01
 */
public interface IFkapRwdDao extends IBaseDao<FkapRwd> {

    /**
     * 查询防控安排表分页列表
     *
     * @param map 查询条件
     * @return 模块分页信息
     */
    FastPagination getFkapRwdListPage(Map map);

    /**
     * 获取organName
     * @param id
     * @return map
     * */
    Map getOrganName(Long id);
    /**
     * 查询巡区分页列表
     *
     * @param map 查询条件
     * @param xqlx
     * @return 模块分页信息
     */
    FastPagination getXqListPage(Map map,String xqlx);
    /**
     * 查询设备分页列表
     * @param map 查询条件
     * @param equipmentParent
     * @param equipmentChild
     * @return 模块分页信息
     */
    FastPagination getDeviceListPage(Map map, String equipmentParent, String equipmentChild);

    /**
     * 重防巡区
     * @param map
     * @return FastPagination
     * */
    FastPagination getZfListPage(Map map);

    /**
     * 判断任务日期时间是否被包含
     * @param xfkssj
     * @param xfjssj
     * @return boolean
     * */
    Boolean judgeRq(Date xfkssj, Date xfjssj);

    /**
     * 判断巡组是否相同
     * @param fkapRwd
     * @return boolean
     * */
    Boolean judgeXz(FkapRwd fkapRwd);

    /**
     * 判断民警相同
     * */
    Boolean judgeMj(FkapRwd fkapRwd);

    /**
     * 判断设备是否相同
     * */
    Boolean judgeDevices( FkapRwd fkapRwd,String  deviceIds);

    /**
     * 关联设备
     * */
    void glSb(String sbid, Long rwid);

    /**
     * 赋值巡区名称
     * */
    void setXqmc(FkapRwd rwd);
    /**
     * 赋值重巡区名称
     * */
    void getZfxqmc(FkapRwd rwd);

    /**
     * 赋值重防时段
     * */
    void setZfsd(FkapRwd rwd);

    /**
     * 检测设备
     * */
    void checkSb(String s);
    /**
     * 赋值设备
     * */
    void setSbs(FkapRwd rwd);
}
