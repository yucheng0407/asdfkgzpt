package net.ruixin.service.plat.message;

import net.ruixin.dao.plat.message.IMessageTypeDao;
import net.ruixin.service.plat.common.BaseService;
import net.ruixin.util.paginate.FastPagination;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * @author Pitcher
 */
@Service
public class MessageTypeService extends BaseService implements IMessageTypeService {

    @Autowired
    private IMessageTypeDao messageTypeDao;

    @Override
    public FastPagination getMessageTypePage(Map map) {
        return messageTypeDao.getMessageTypePage(map);
    }

    @Override
    public List getMessageTypeList() {

        return messageTypeDao.getMessageTypeList();
    }

}
