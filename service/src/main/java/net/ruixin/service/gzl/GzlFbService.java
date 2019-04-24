package net.ruixin.service.gzl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import net.ruixin.service.plat.common.BaseService;
import net.ruixin.util.paginate.FastPagination;
import java.util.Map;
import net.ruixin.domain.gzl.GzlFb;

import net.ruixin.dao.gzl.IGzlFbDao;

/**
 * 工作流发布Service实现
 *
 * @author rxCoder on 2019-4-9 11:53:33
 */
@Service
public class GzlFbService extends BaseService implements IGzlFbService {
    @Autowired
    private IGzlFbDao gzlFbDao;
    @Override
    public FastPagination getGzlFbListPage(Map map) {
        return gzlFbDao.getGzlFbListPage(map);
    }
    @Override
    public void saveGzlFb(GzlFb gzlFb) {
        save(gzlFb);
    }

}