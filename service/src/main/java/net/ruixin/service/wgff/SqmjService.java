package net.ruixin.service.wgff;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import net.ruixin.service.plat.common.BaseService;
import net.ruixin.util.paginate.FastPagination;
import java.util.Map;
import net.ruixin.domain.wgff.Sqmj;

import net.ruixin.dao.wgff.ISqmjDao;

/**
 * 网格队伍-社区民警信息Service实现
 *
 * @author rxCoder on 2019-4-9 11:56:53
 */
@Service
public class SqmjService extends BaseService implements ISqmjService {
    @Autowired
    private ISqmjDao sqmjDao;
    @Override
    public FastPagination getSqmjListPage(Map map) {
        return sqmjDao.getSqmjListPage(map);
    }
    @Override
    public void saveSqmj(Sqmj sqmj) {
        save(sqmj);
    }

}