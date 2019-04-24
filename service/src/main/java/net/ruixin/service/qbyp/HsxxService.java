package net.ruixin.service.qbyp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import net.ruixin.service.plat.common.BaseService;
import net.ruixin.util.paginate.FastPagination;
import java.util.Map;
import net.ruixin.domain.qbyp.Hsxx;

import net.ruixin.dao.qbyp.IHsxxDao;

/**
 * 情报会商Service实现
 *
 * @author rxCoder on 2019-4-9 11:56:20
 */
@Service
public class HsxxService extends BaseService implements IHsxxService {
    @Autowired
    private IHsxxDao hsxxDao;
    @Override
    public FastPagination getHsxxListPage(Map map) {
        return hsxxDao.getHsxxListPage(map);
    }
    @Override
    public void saveHsxx(Hsxx hsxx) {
        save(hsxx);
    }

}