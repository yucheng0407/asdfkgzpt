package net.ruixin.service.plat.auth;

import net.ruixin.domain.plat.auth.AuthResult;
import net.ruixin.util.paginate.FastPagination;

import java.util.List;
import java.util.Map;

/**
 * 数据权限service接口
 *
 * @author Administrator
 */
public interface IDataAuthService {

    /**
     * 获取数据权限列表
     *
     * @param map
     * @return
     */
    FastPagination getDataAuthList(Map map);

    /**
     * 保存数据权限
     *
     * @param userIds
     * @param objId
     * @param oIds
     * @param userId
     */
    void saveDataAuth(String userIds, Long objId, String oIds, Long userId);

    /**
     * 删除数据权限
     *
     * @param id
     */
    void delDataAuth(Long id);

    /**
     * 获取对象list数据
     *
     * @return
     */
    List getObjList();

    /**
     * 根据对象id获取数据
     *
     * @param map
     * @param objId
     * @return
     */
    FastPagination getZtObjList(Map map, Long objId);

    /**
     * 批量删除数据权限
     *
     * @param userIds
     * @param objectId
     */
    void batchDel(String userIds, Long objectId);

    /**
     * 获取用户数据权限
     * @param userId    用户id
     * @param objectCode 对象编码
     * @return
     */
    AuthResult getUserDataAuthResult(Long userId, String objectCode);
}
