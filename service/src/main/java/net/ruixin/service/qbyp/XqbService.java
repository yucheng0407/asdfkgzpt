package net.ruixin.service.qbyp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import net.ruixin.service.plat.common.BaseService;
import net.ruixin.util.paginate.FastPagination;
import java.util.Map;
import net.ruixin.domain.qbyp.Xqb;

import net.ruixin.dao.qbyp.IXqbDao;

/**
 * 巡区表Service实现
 *
 * @author rxCoder on 2019-4-9 11:49:31
 */
@Service
public class XqbService extends BaseService implements IXqbService {
    @Autowired
    private IXqbDao xqbDao;
    @Override
    public FastPagination getXqbListPage(Map map) {
        return xqbDao.getXqbListPage(map);
    }
    @Override
    public void saveXqb(Xqb xqb) {
        save(xqb);
    }

}