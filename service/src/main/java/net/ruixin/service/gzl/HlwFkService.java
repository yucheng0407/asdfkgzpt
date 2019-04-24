package net.ruixin.service.gzl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import net.ruixin.service.plat.common.BaseService;
import net.ruixin.util.paginate.FastPagination;
import java.util.Map;
import net.ruixin.domain.gzl.HlwFk;

import net.ruixin.dao.gzl.IHlwFkDao;

/**
 * 互联网-反馈Service实现
 *
 * @author rxCoder on 2019-4-9 11:54:43
 */
@Service
public class HlwFkService extends BaseService implements IHlwFkService {
    @Autowired
    private IHlwFkDao hlwFkDao;
    @Override
    public FastPagination getHlwFkListPage(Map map) {
        return hlwFkDao.getHlwFkListPage(map);
    }
    @Override
    public void saveHlwFk(HlwFk hlwFk) {
        save(hlwFk);
    }

}