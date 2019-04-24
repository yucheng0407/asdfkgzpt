package net.ruixin.dao.plat.demo;

import net.ruixin.domain.plat.demo.DemoDict;
import net.ruixin.util.hibernate.IBaseDao;
import net.ruixin.util.paginate.FastPagination;

import java.util.Map;

/**
 * Created by pitcher on 2017/5/18.
 */

public interface IDemoDictDao extends IBaseDao<DemoDict> {

    FastPagination getDemoDictList(Map map);
}
