package net.ruixin.service.gzl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import net.ruixin.service.plat.common.BaseService;
import net.ruixin.util.paginate.FastPagination;
import java.util.Map;
import net.ruixin.domain.gzl.HlwJs;

import net.ruixin.dao.gzl.IHlwJsDao;

/**
 * 互联网-接收Service实现
 *
 * @author rxCoder on 2019-4-9 11:54:53
 */
@Service
public class HlwJsService extends BaseService implements IHlwJsService {
    @Autowired
    private IHlwJsDao hlwJsDao;
    @Override
    public FastPagination getHlwJsListPage(Map map) {
        return hlwJsDao.getHlwJsListPage(map);
    }
    @Override
    public void saveHlwJs(HlwJs hlwJs) {
        save(hlwJs);
    }

}