package net.ruixin.service.plat.auth.impl;

import net.ruixin.dao.plat.auth.IDataAuthDao;
import net.ruixin.domain.plat.auth.AuthResult;
import net.ruixin.domain.plat.auth.SysDataAuth;
import net.ruixin.service.plat.auth.IDataAuthService;
import net.ruixin.service.plat.common.BaseService;
import net.ruixin.util.paginate.FastPagination;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

/**
 * 数据权限service
 *
 * @author Administrator
 */
@Service
public class DataAuthService extends BaseService implements IDataAuthService {
    @Autowired
    private IDataAuthDao dataAuthDao;

    @Override
    public FastPagination getDataAuthList(Map map) {
        return dataAuthDao.getDataAuthList(map);
    }

    @Override
    @Transactional
    public void saveDataAuth(String userIds,Long objId,String oIds,Long userId) {
        dataAuthDao.saveDataAuth(userIds,objId,oIds,userId);
    }

    @Override
    @Transactional
    public void delDataAuth(Long id) {
        SysDataAuth sysDataAuth = this.get(SysDataAuth.class,id);
        dataAuthDao.delDataAuth(sysDataAuth.getUserId(),sysDataAuth.getObjectId(),sysDataAuth.getoIds());
    }

    @Override
    public List getObjList() {
        return dataAuthDao.getObjList();
    }

    @Override
    public FastPagination getZtObjList(Map map, Long objId) {
        return dataAuthDao.getZtObjList(map, objId);
    }

    @Transactional
    @Override
    public void batchDel(String userIds, Long objectId) {
        //删除所有userId和objectId的数据
        dataAuthDao.batchDel(userIds, objectId);
    }

    @Override
    public AuthResult getUserDataAuthResult(Long userId, String objectCode) {
        //删除所有userId和objectId的数据
        return dataAuthDao.getUserDataAuthResult(userId, objectCode);
    }
}
