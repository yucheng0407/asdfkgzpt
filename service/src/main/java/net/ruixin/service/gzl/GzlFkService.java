package net.ruixin.service.gzl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import net.ruixin.service.plat.common.BaseService;
import net.ruixin.util.paginate.FastPagination;
import java.util.Map;
import net.ruixin.domain.gzl.GzlFk;

import net.ruixin.dao.gzl.IGzlFkDao;

/**
 * 工作流反馈Service实现
 *
 * @author rxCoder on 2019-4-9 11:54:03
 */
@Service
public class GzlFkService extends BaseService implements IGzlFkService {
    @Autowired
    private IGzlFkDao gzlFkDao;
    @Override
    public FastPagination getGzlFkListPage(Map map) {
        return gzlFkDao.getGzlFkListPage(map);
    }
    @Override
    public void saveGzlFk(GzlFk gzlFk) {
        save(gzlFk);
    }

}