package net.ruixin.service.plat.demo;


import net.ruixin.domain.plat.demo.DemoUser;
import net.ruixin.service.plat.common.IBaseService;
import net.ruixin.util.paginate.FastPagination;

import java.util.Map;

/**
 * Created by pitcher on 2017/5/18.
 */

public interface IDemoUserService extends IBaseService {

    FastPagination getDemoUserList(Map map);

    void saveDemoUser(DemoUser demoUser);

    void deleteBatch(String ids);

}
