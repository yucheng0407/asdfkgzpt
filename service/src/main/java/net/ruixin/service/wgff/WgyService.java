package net.ruixin.service.wgff;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import net.ruixin.service.plat.common.BaseService;
import net.ruixin.util.paginate.FastPagination;
import java.util.Map;
import net.ruixin.domain.wgff.Wgy;

import net.ruixin.dao.wgff.IWgyDao;

/**
 * 网格员信息Service实现
 *
 * @author rxCoder on 2019-4-9 11:57:14
 */
@Service
public class WgyService extends BaseService implements IWgyService {
    @Autowired
    private IWgyDao wgyDao;
    @Override
    public FastPagination getWgyListPage(Map map) {
        return wgyDao.getWgyListPage(map);
    }
    @Override
    public void saveWgy(Wgy wgy) {
        save(wgy);
    }

}