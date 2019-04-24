package net.ruixin.dao.plat.organ;

import net.ruixin.domain.plat.organ.SysUser;
import net.ruixin.domain.qzld.FkzlJsr;
import net.ruixin.util.paginate.FastPagination;

import java.util.List;
import java.util.Map;


/**
 * 用户Dao
 *
 * @author Pitcher
 */
@SuppressWarnings("JavaDoc")
public interface IUserDao {

    /**
     * 查询用户列表
     *
     * @param map 查询条件
     * @return FastPagination
     */
    FastPagination getUserPageList(Map map);

    /**
     * 根据ID查询用户信息
     *
     * @param userId 用户ID
     * @return SysUser
     */
    SysUser getUserById(Long userId);

    /**
     * 保存用户信息
     *
     * @param sysUser 用户实体
     */
    void saveUser(SysUser sysUser);

    /**
     * 删除用户
     *
     * @param userId
     */
    void delUser(Long userId);

    /**
     * 调用存储过程,刷角色数据
     *
     * @param id 用户id
     */
    void afterChangeUser(Long id);

    /**
     * 根据机构ID查询机构下的用户List
     *
     * @param organId 机构ID
     * @return List<Map<String, Object>>
     */
    List<Map<String, Object>> getUserListByOrganId(Long organId);

    /**
     * 获取系统中的用户集合
     *
     * @return
     */
    List<Map<String, Object>> getUserList();

    List<Map<String, Object>> getUserListByOrganId(String ids);

    /**
     * 根据岗位角色ID查询岗位下的用户List
     *
     * @param postRoleId 岗位角色ID
     * @return List<Map<String,Object>>
     */
    List<Map<String, Object>> getUserListByPostRoleId(Long postRoleId);

    /**
     * 获取用户关联信息
     *
     * @param userId 用户id
     * @return AjaxReturn
     */
    List<Map<String, Object>> getUserGlxx(Long userId);

    /**
     * 获取机构下的无岗位的用户
     *
     * @param organId 机构id
     * @return
     */
    List<Map<String, Object>> getWgwUserListByOrganId(Long organId);




    /**
     * 根据登录信息获取用户实体
     *
     * @param loginName 登录名
     * @param loginPwd  登录密码
     * @return SysUser
     */
    SysUser getUserByLoginInfo(String loginName, String loginPwd);

    /**
     * 根据身份证获取登录账号
     *
     * @param sfz 身份证
     * @return 账号
     */
    SysUser getUserBySFZ(String sfz);

    /**
     * 根据用户登录账号获取登录账号
     *
     * @param loginName 登录账号
     * @return 账号
     */
    SysUser findUserByLoginName(String loginName);

    /**
     * 修改用户密码
     *
     * @param newPwd 新密码
     * @param userId 用户id
     * @return ar
     */
    boolean changePwd(String newPwd, Long userId);

    /**
     * 封锁用户
     *
     * @param userId
     */
    void blockUser(Long userId);

    /**
     * 解锁用户
     *
     * @param userId
     */
    void unblockUser(Long userId);

    /**
     * 重置用户密码
     *
     * @param pwd
     * @param userIds
     */
    void resetPwd(String pwd, String userIds);

    /**
     * 根据机构ID获取用户的树形数据
     *
     * @param organId 机构id
     * @return
     */
    List<Map<String, Object>> getUserListTreeDataByOrganId(Long organId);

    /**
     * 增加用户组织数据权限
     *
     * @param userId  用户id
     * @param organId 组织id
     */
    void addDataAuthOfUserOrgan(Long userId, Long organId);

    /**
     * 去除用户组织数据权限
     *
     * @param userId  用户id
     * @param organId 组织id
     */
    void removeDataAuthOfUserOrgan(Long userId, Long organId);

    /**
     * admin用户获取所有组织权限
     *
     * @param userId 用户id
     * @return true是admin用户，false不是admin用户
     */
    boolean adminDataAuthOfUserOrgan(Long userId);

    /**
     * 重置用户组织数据权限
     *
     * @param userId 用户id
     */
    void refreshDataAuthOfUserOrgan(Long userId);

    /**
     * 重置组织下用户的组织数据权限
     *
     * @param organId 组织id
     */
    void refreshDataAuthOfUserOrganByOrgan(Long organId);

    /**
     * 获取没有关联过管理员的用户
     *
     * @param map
     * @return
     */
    FastPagination getNoAdminUserList(Map map);


    /*****************************************************
     * add by zfk 2019/04/18
     * 安顺大防控 start
     * 关于该项目用到的用户体系方法平台中没有的建议在下面的代码块里增加
     *
     *****************************************************/

    /**
     * 根据多个组织机构获取用户，orgIds ：","隔开
     * @param orgIds
     * @return
     */
    List<Map<String, Object>> getUserByOrganIds(String orgIds);

    /******************************************************
     * 安顺大防控 end
     ******************************************************/

}
