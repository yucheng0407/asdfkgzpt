package net.ruixin.service.qbyp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import net.ruixin.service.plat.common.BaseService;
import net.ruixin.util.paginate.FastPagination;
import java.util.Map;
import net.ruixin.domain.qbyp.Ajjg;

import net.ruixin.dao.qbyp.IAjjgDao;

/**
 * 案件加工Service实现
 *
 * @author rxCoder on 2019-4-9 11:47:16
 */
@Service
public class AjjgService extends BaseService implements IAjjgService {
    @Autowired
    private IAjjgDao ajjgDao;
    @Override
    public FastPagination getAjjgListPage(Map map) {
        return ajjgDao.getAjjgListPage(map);
    }
    @Override
    public void saveAjjg(Ajjg ajjg) {
        save(ajjg);
    }

}