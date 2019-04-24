package net.ruixin.service.jmfk;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import net.ruixin.service.plat.common.BaseService;
import net.ruixin.util.paginate.FastPagination;
import java.util.Map;
import net.ruixin.domain.jmfk.SbGlb;

import net.ruixin.dao.jmfk.ISbGlbDao;

/**
 * 防控安排_设备_关联表Service实现
 *
 * @author rxCoder on 2019-4-9 11:52:23
 */
@Service
public class SbGlbService extends BaseService implements ISbGlbService {
    @Autowired
    private ISbGlbDao sbGlbDao;
    @Override
    public FastPagination getSbGlbListPage(Map map) {
        return sbGlbDao.getSbGlbListPage(map);
    }
    @Override
    public void saveSbGlb(SbGlb sbGlb) {
        save(sbGlb);
    }

}