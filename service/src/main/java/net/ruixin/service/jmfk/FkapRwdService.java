package net.ruixin.service.jmfk;
import net.ruixin.enumerate.plat.SfyxSt;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import net.ruixin.service.plat.common.BaseService;
import net.ruixin.util.paginate.FastPagination;

import java.util.Date;
import java.util.Map;
import net.ruixin.domain.jmfk.FkapRwd;

import net.ruixin.dao.jmfk.IFkapRwdDao;
import org.springframework.transaction.annotation.Transactional;

/**
 * 防控安排表Service实现
 *
 * @author rxCoder on 2019-4-9 11:52:00
 */
@Service
public class FkapRwdService extends BaseService implements IFkapRwdService {
    @Autowired
    private IFkapRwdDao fkapRwdDao;
    @Override
    public FastPagination getFkapRwdListPage(Map map) {
        return fkapRwdDao.getFkapRwdListPage(map);
    }
    @Override
    public
    FastPagination getXqListPage(Map map,String xqlx){
        return fkapRwdDao.getXqListPage(map,xqlx);
    }
    @Override
    public FastPagination getDeviceListPage(Map map, String equipmentParent, String equipmentChild){
        return fkapRwdDao.getDeviceListPage(map,equipmentParent,equipmentChild);
    }

    @Transactional
    @Override
    public void saveFkapRwd(FkapRwd fkapRwd,String deviceIds,String zjsbs) {
        //保存任务
        fkapRwd.setSfyxSt(SfyxSt.VALID);
       save(fkapRwd);
       Long id=fkapRwd.getId();
       String[] arr= deviceIds.split(",");
        for (int i = 0; i <arr.length ; i++) {
            //关联设备
            fkapRwdDao.glSb(arr[i],id);
        }
        //更改设备状态
        if(StringUtils.isNotEmpty(zjsbs)){
            String[] arr2= zjsbs.split(",");
            for (int i = 0; i <arr2.length ; i++) {
                fkapRwdDao.checkSb(arr2[i]);
            }
        }
    }
    @Override
    public  Map getOrganName(Long id){
        return fkapRwdDao.getOrganName(id);
    }
    @Override
    public FastPagination getZfListPage(Map map){
        return fkapRwdDao.getZfListPage(map);
    }
    @Override
    public Boolean judgeRq(FkapRwd fkapRwd){
        Date xfkssj = fkapRwd.getXfkssj();
        Date xfjssj =fkapRwd.getXfjssj();
        return fkapRwdDao.judgeRq(xfkssj,xfjssj);
    }
    @Override
    public Boolean judgeXz(FkapRwd fkapRwd){
        return fkapRwdDao.judgeXz(fkapRwd);
    }
    @Override
    public Boolean judgeMj(FkapRwd fkapRwd){
        return fkapRwdDao.judgeMj(fkapRwd);
    }
    @Override
    public Boolean judgeDevices( FkapRwd fkapRwd,String deviceIds){
        return fkapRwdDao.judgeDevices(fkapRwd, deviceIds);
    }
    @Override
    public  void setXqmc(FkapRwd rwd){
        fkapRwdDao.setXqmc(rwd);
    }
    @Override
    public void getZfxqmc(FkapRwd rwd){
        fkapRwdDao.getZfxqmc(rwd);
    }
    @Override
    public void setZfsd(FkapRwd rwd){
        fkapRwdDao.setZfsd(rwd);
    }
    @Override
    public  void setSbs(FkapRwd rwd){
        fkapRwdDao.setSbs(rwd);
    }
}