package net.ruixin.service.qzld;

import net.ruixin.domain.gzl.GzlFb;
import net.ruixin.service.plat.dictionary.IDictService;
import net.ruixin.util.support.DateUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

/**
 * @author zfk
 * @date 2019/4/18
 * @description
 */
@Service
public class CommonService implements ICommonService {

    @Autowired
    private IDictService dictService;

    @Override
    public String getGzlFbBt(GzlFb gzlFb) {
        String value = DateUtil.format(new Date(), "yyyy-MM-dd HH:mm ");
        String dictValue = dictService.getSubDictValueByCode(gzlFb.getSjlxzd(),gzlFb.getSjlx());
        return value + dictValue;
    }
}
