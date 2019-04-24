package net.ruixin.dao.plat.organ.impl;

import net.ruixin.dao.plat.organ.ISysGlbUserDao;
import net.ruixin.domain.plat.organ.SysGlbUser;
import net.ruixin.util.hibernate.BaseDao;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 组织用户岗位关联DAO实现
 *
 * @author Pitcher
 * @date 2016-8-17
 */
@Repository
public class SysGlbUserDao extends BaseDao<SysGlbUser> implements ISysGlbUserDao {
    @Override
    public List<SysGlbUser> getSysGlbUserListByOrganId(Integer id) {
        String hql = "from SysGlbUser t where t.sfyxSt = '1' and t.organId = ? ";
        return super.findListByHql(hql, id);
    }

    @Override
    public List<SysGlbUser> getSysGlbUserListByUserId(Long id) {
        String hql = "from SysGlbUser t where t.sfyxSt = '1' and t.userId = ? ";
        return super.findListByHql(hql, id);
    }
}
