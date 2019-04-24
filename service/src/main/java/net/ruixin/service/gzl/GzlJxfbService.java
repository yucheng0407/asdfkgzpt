package net.ruixin.service.gzl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import net.ruixin.service.plat.common.BaseService;
import net.ruixin.util.paginate.FastPagination;
import java.util.Map;
import net.ruixin.domain.gzl.GzlJxfb;

import net.ruixin.dao.gzl.IGzlJxfbDao;

/**
 * 工作流-继续发布Service实现
 *
 * @author rxCoder on 2019-4-9 11:55:38
 */
@Service
public class GzlJxfbService extends BaseService implements IGzlJxfbService {
    @Autowired
    private IGzlJxfbDao gzlJxfbDao;
    @Override
    public FastPagination getGzlJxfbListPage(Map map) {
        return gzlJxfbDao.getGzlJxfbListPage(map);
    }
    @Override
    public void saveGzlJxfb(GzlJxfb gzlJxfb) {
        save(gzlJxfb);
    }

}