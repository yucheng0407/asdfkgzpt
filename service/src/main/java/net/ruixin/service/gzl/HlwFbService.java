package net.ruixin.service.gzl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import net.ruixin.service.plat.common.BaseService;
import net.ruixin.util.paginate.FastPagination;
import java.util.Map;
import net.ruixin.domain.gzl.HlwFb;

import net.ruixin.dao.gzl.IHlwFbDao;

/**
 * 互联网-发布Service实现
 *
 * @author rxCoder on 2019-4-9 11:54:20
 */
@Service
public class HlwFbService extends BaseService implements IHlwFbService {
    @Autowired
    private IHlwFbDao hlwFbDao;
    @Override
    public FastPagination getHlwFbListPage(Map map) {
        return hlwFbDao.getHlwFbListPage(map);
    }
    @Override
    public void saveHlwFb(HlwFb hlwFb) {
        save(hlwFb);
    }

}