package net.ruixin.service.qbyp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import net.ruixin.service.plat.common.BaseService;
import net.ruixin.util.paginate.FastPagination;
import java.util.Map;
import net.ruixin.domain.qbyp.Zfsj;

import net.ruixin.dao.qbyp.IZfsjDao;

/**
 * 重防区域-重防时间Service实现
 *
 * @author rxCoder on 2019-4-9 11:50:39
 */
@Service
public class ZfsjService extends BaseService implements IZfsjService {
    @Autowired
    private IZfsjDao zfsjDao;
    @Override
    public FastPagination getZfsjListPage(Map map) {
        return zfsjDao.getZfsjListPage(map);
    }
    @Override
    public void saveZfsj(Zfsj zfsj) {
        save(zfsj);
    }

}