package net.ruixin.service.gzl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import net.ruixin.service.plat.common.BaseService;
import net.ruixin.util.paginate.FastPagination;
import java.util.Map;
import net.ruixin.domain.gzl.HlwJxfb;

import net.ruixin.dao.gzl.IHlwJxfbDao;

/**
 * 互联网-继续发布Service实现
 *
 * @author rxCoder on 2019-4-9 11:55:07
 */
@Service
public class HlwJxfbService extends BaseService implements IHlwJxfbService {
    @Autowired
    private IHlwJxfbDao hlwJxfbDao;
    @Override
    public FastPagination getHlwJxfbListPage(Map map) {
        return hlwJxfbDao.getHlwJxfbListPage(map);
    }
    @Override
    public void saveHlwJxfb(HlwJxfb hlwJxfb) {
        save(hlwJxfb);
    }

}