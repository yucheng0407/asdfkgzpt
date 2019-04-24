package net.ruixin.dao.plat.organ;


import net.ruixin.domain.plat.organ.SysGlbUser;

import java.util.List;


/**
 * 组织用户岗位关联DAO接口
 *
 * @author Pitcher
 */
public interface ISysGlbUserDao {
    /**
     * 根据组织机构ID查询组织用户岗位关联信息
     *
     * @param id 组织机构ID
     * @return 组织用户岗位关联集合
     */
    List<SysGlbUser> getSysGlbUserListByOrganId(Integer id);

    /**
     * 通过用户id获取机构用户岗位
     *
     * @param id 用户id
     * @return 三要素信息
     */
    List<SysGlbUser> getSysGlbUserListByUserId(Long id);
}
