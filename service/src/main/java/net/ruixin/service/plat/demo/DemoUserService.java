package net.ruixin.service.plat.demo;



import net.ruixin.dao.plat.demo.IDemoUserDao;
import net.ruixin.domain.plat.demo.DemoUser;
import net.ruixin.service.plat.common.BaseService;
import net.ruixin.util.paginate.FastPagination;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

/**
 * Created by pitcher on 2017/5/18.
 */
@Service
public class DemoUserService extends BaseService implements IDemoUserService {

    @Autowired
    private IDemoUserDao demoUserDao;

    @Override
    public FastPagination getDemoUserList(Map map) {
        return demoUserDao.getDemoUserList(map);
    }
    @Override
    public void saveDemoUser(DemoUser demoUser) {
        save(demoUser);
    }

    @Override
    public void deleteBatch(String ids) {
        demoUserDao.deleteBatch(ids);
    }


}
