package net.ruixin.service.qbyp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import net.ruixin.service.plat.common.BaseService;
import net.ruixin.util.paginate.FastPagination;
import java.util.Map;
import net.ruixin.domain.qbyp.Zfqy;

import net.ruixin.dao.qbyp.IZfqyDao;

/**
 * 重防区域Service实现
 *
 * @author rxCoder on 2019-4-9 11:50:14
 */
@Service
public class ZfqyService extends BaseService implements IZfqyService {
    @Autowired
    private IZfqyDao zfqyDao;
    @Override
    public FastPagination getZfqyListPage(Map map) {
        return zfqyDao.getZfqyListPage(map);
    }
    @Override
    public void saveZfqy(Zfqy zfqy) {
        save(zfqy);
    }

}