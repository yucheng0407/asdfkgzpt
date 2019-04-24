package net.ruixin.service.plat.demo;


import net.ruixin.dao.plat.demo.IDemoDictDao;
import net.ruixin.domain.plat.demo.DemoDict;
import net.ruixin.service.plat.common.BaseService;
import net.ruixin.util.paginate.FastPagination;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

/**
 * Created by pitcher on 2018/5/16.
 */
@Service
public class DemoDictService extends BaseService implements IDemoDictService {

    @Autowired
    private IDemoDictDao demoDictDao;

    @Override
    public FastPagination getDemoDictList(Map map) {
        return demoDictDao.getDemoDictList(map);
    }

    @Override
    public void saveDemoDict(DemoDict demoDict) {
        save(demoDict);
    }

    @Override
    public void deleteBatch(String ids) {
        demoDictDao.deleteBatch(ids);
    }


}
