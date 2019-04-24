package net.ruixin.service.qbyp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import net.ruixin.service.plat.common.BaseService;
import net.ruixin.util.paginate.FastPagination;
import java.util.Map;
import net.ruixin.domain.qbyp.Ajxx;

import net.ruixin.dao.qbyp.IAjxxDao;

/**
 * 案件信息Service实现
 *
 * @author rxCoder on 2019-4-9 11:47:54
 */
@Service
public class AjxxService extends BaseService implements IAjxxService {
    @Autowired
    private IAjxxDao ajxxDao;
    @Override
    public FastPagination getAjxxListPage(Map map) {
        return ajxxDao.getAjxxListPage(map);
    }
    @Override
    public void saveAjxx(Ajxx ajxx) {
        save(ajxx);
    }

}