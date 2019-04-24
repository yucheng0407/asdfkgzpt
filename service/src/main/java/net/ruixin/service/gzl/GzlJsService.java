package net.ruixin.service.gzl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import net.ruixin.service.plat.common.BaseService;
import net.ruixin.util.paginate.FastPagination;
import java.util.Map;
import net.ruixin.domain.gzl.GzlJs;

import net.ruixin.dao.gzl.IGzlJsDao;

/**
 * 工作流-接收Service实现
 *
 * @author rxCoder on 2019-4-9 11:55:22
 */
@Service
public class GzlJsService extends BaseService implements IGzlJsService {
    @Autowired
    private IGzlJsDao gzlJsDao;
    @Override
    public FastPagination getGzlJsListPage(Map map) {
        return gzlJsDao.getGzlJsListPage(map);
    }
    @Override
    public void saveGzlJs(GzlJs gzlJs) {
        save(gzlJs);
    }

}