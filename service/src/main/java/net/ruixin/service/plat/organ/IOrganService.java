package net.ruixin.service.plat.organ;

import net.ruixin.domain.plat.organ.SysOrgan;
import net.ruixin.util.paginate.FastPagination;

import java.util.List;
import java.util.Map;

/**
 *
 * @author Jealous
 * @date 2016-8-15
 * 机构服务接口
 */
public interface IOrganService {

    /**
     * 通过组织机构ID获取组织机构
     *
     * @param id 机构ID
     * @return 机构
     */
    SysOrgan getSysOrganById(Long id);

    /**
     * 查询组织机构列表
     *
     * @param map 查询条件
     * @return FastPagination
     */
    FastPagination getSysOrganListPage(Map map);

    /**
     * 保存、修改组织机构
     *
     * @param organ 组织机构实体对象
     */
    void saveSysOrgan(SysOrgan organ);

    /**
     * 根据机构ID查询下级机构
     *
     * @param id 机构ID
     * @return 机构List
     */
    List<Map<String, Object>> getOrganListByParentId(Long id);

    /**
     * 查询组织关联角色信息
     *
     * @param organId 组织机构ID
     * @return AjaxReturn
     */
    Map getOrganGlxx(Long organId);

    /**
     * 验证同一组织机构下 简称不能重复
     *
     * @param organId   机构ID
     * @param organName 机构名称
     * @param parentOrg 上级机构ID
     * @return boolean
     */
    boolean hasOrganName(Long organId, String organName, Long parentOrg);

    /**
     * 删除组织机构
     *
     * @param organId    机构id
     * @param newOrganId 调整后的机构id
     */
    void delSysOrgan(Long organId, Long newOrganId);


    /**
     * 通过组织机构代码获取组织机构
     *
     * @param code 机构代码
     * @return 机构
     */
    SysOrgan getOrganByCode(String code);

    void changeTreeNodeSortAndParent(String ids, Long parentId);

    /**
     * 获取组织机构关联角色信息
     *
     * @param ids 组织机构Ids
     * @return
     */
    List<Map<String, Object>> getOrgansGlxx(String ids);

    /**
     * 获取组织机构关联角色信息
     * @param ids 机构ids
     * @return
     */
    List<Map<String, Object>> getOrgansLinkRole(String ids);

}
