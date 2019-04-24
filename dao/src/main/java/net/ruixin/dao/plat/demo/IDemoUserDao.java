package net.ruixin.dao.plat.demo;

import net.ruixin.domain.plat.demo.DemoUser;
import net.ruixin.util.hibernate.IBaseDao;
import net.ruixin.util.paginate.FastPagination;

import java.util.Map;

/**
 * Created by pitcher on 2017/5/18.
 */

public interface IDemoUserDao extends IBaseDao<DemoUser> {

    FastPagination getDemoUserList(Map map);
}
