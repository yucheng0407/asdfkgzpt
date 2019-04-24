package net.ruixin.service.plat.demo;


import net.ruixin.domain.plat.demo.DemoDict;
import net.ruixin.service.plat.common.IBaseService;
import net.ruixin.util.paginate.FastPagination;

import java.util.Map;

/**
 * Created by pitcher on 2018/5/16.
 */

public interface IDemoDictService extends IBaseService {

    FastPagination getDemoDictList(Map map);

    void saveDemoDict(DemoDict demoDict);

    void deleteBatch(String ids);

}
