package net.ruixin.service.plat.resource;

import net.ruixin.dao.plat.config.IConfigDao;
import net.ruixin.dao.plat.resource.IResourceDao;
import net.ruixin.domain.constant.Const;
import net.ruixin.domain.plat.auth.SysGlbCombineRole;
import net.ruixin.domain.plat.auth.SysRole;
import net.ruixin.domain.plat.resource.SysResource;
import net.ruixin.enumerate.plat.SfyxSt;
import net.ruixin.service.plat.common.BaseService;
import net.ruixin.util.shiro.ShiroKit;
import net.ruixin.util.cache.Cache;
import net.ruixin.util.cache.CacheKit;
import net.ruixin.util.http.HttpKit;
import net.ruixin.util.paginate.FastPagination;
import net.ruixin.util.tools.CamelCaseUtils;
import net.ruixin.util.tools.RxStringUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class ResourceService extends BaseService implements IResourceService {

    @Autowired
    private IResourceDao resourceDao;

    @Autowired
    private IConfigDao configDao;

    @Transactional
    @Override
    public Long saveResource(SysResource resource) {
        Boolean ifNew = (null == resource.getId());
        Map<String, Map<String, Object>> resourceConfigMap = CacheKit.get(Cache.CONFIG, "resourceConfig");
        //更新显示上级id
        if (RxStringUtils.isNotEmpty(resource.getParentType())) {
            if (RxStringUtils.isNotEmptyAndEqualsZero(resourceConfigMap.get(resource.getParentType()).get("tree"))) {
                SysResource parentResource = getResourceById(resource.getParentId());
                if (null != parentResource) {
                    resource.setShowParentId(parentResource.getShowParentId());
                }
            } else {
                resource.setShowParentId(resource.getParentId());
            }
        }
        //新增、修改资源到数据库
        resourceDao.saveResource(resource);
        //如果非新增，更新被选为目标资源的url
        if (!ifNew && RxStringUtils.isNotEmpty(resource.getUrl())) {
            resourceDao.updateOuterTargetUrl(resource.getId(), resource.getUrl());
        }
        //新增资源设置最大序号
        if (ifNew) {
            resourceDao.updateResourceMaxSort(resource.getId(), resource.getParentId());
        }
        return resource.getId();
    }

    @Override
    public SysResource getResourceById(Long id) {
        return resourceDao.getResourceById(id);
    }

    @Transactional
    @Override
    public void delResource(Long id) {
        //删除数据库中资源
        resourceDao.delResource(id);
        //清楚资源对应的配置数据
        configDao.delConfigByResourceId(id, ShiroKit.getUser().getId());
    }

    @Override
    public FastPagination getResourceList(Map map) {
        return resourceDao.getResourceList(map);
    }

    @Override
    public List getResourceTreeData(String resourceType, Long removeId, Long id) {
        List<Map<String, Object>> nodeList = new ArrayList<>();
        Map<String, Map<String, Object>> resourceMap = CacheKit.get(Cache.CONFIG, "resourceConfig");
        List<Map<String, Object>> resultList = resourceDao.getResourceTreeData(resourceType, removeId, id);
        resultList.forEach(result -> {
            Map<String, Object> node = new HashMap<>();
            node.put("id", result.get("ID"));
            node.put("type", result.get("TYPE"));
            node.put("name", result.get("NAME"));
            node.put("pid", result.get("PARENT_ID") != null ? result.get("PARENT_ID").toString() : "");
            node.put("isParent", Integer.parseInt(result.get("CHILD_NUM").toString()) > 0);
            node.put("icon", HttpKit.handleCtxPath(resourceMap.get(result.get("TYPE").toString()).get("icon").toString()));
            nodeList.add(node);
        });
        return nodeList;
    }

    /**
     * 获取角色下的角色ids，有平台管理员的角色为all，表示本身也是平台管理员
     *
     * @param ids
     * @param roleId
     * @return
     */
    private String getRoleIds(String ids, Long roleId) {
        if (!ids.contains(roleId.toString())) {
            //查询关联角色
            SysRole role = get(SysRole.class, roleId);
            if ("1".equals(role.getLevels())) {
                //系统管理员，具有所有权限
                return "all";
            }
            //平台管理员为管理员角色赋予资源时，去除admin新增角色带来的默认组合角色
            if (ShiroKit.isPlatAdmin()) {
                if ("2".equals(role.getLevels())) {
                    ids += roleId + ",";
                } else {
                    return ids;
                }
            } else {
                ids += roleId + ",";
            }
            if (role.getCombineRoleList() != null && role.getCombineRoleList().size() > 0) {
                for (SysGlbCombineRole combineRole : role.getCombineRoleList()) {
                    if (!SfyxSt.UNVALID.equals(combineRole.getSfyxSt())) {
                        ids = getRoleIds(ids, combineRole.getRoleId());
                        if ("all".equals(ids)) {
                            return "all";
                        }
                    }
                }
            }
        }
        return ids;
    }

    @Override
    public List<Map<String, Object>> getRoleResourceTreeData(Long roleId, boolean treeHide, Boolean allocatFlag) {
        List<Map<String, Object>> nodeList = new ArrayList<>();
        List<Map<String, Object>> resultList = new ArrayList<>();
        Map<String, Map<String, Object>> resourceConfigMap = CacheKit.get(Cache.CONFIG, "resourceConfig");
        List<Map<String, Object>> resourceDict = CacheKit.get(Cache.CONFIG, "resourceDict");
        Boolean showAll = ShiroKit.isPlatAdmin();          //平台管理员显示全部
        boolean ifAll = false;
        //查询组合的角色集合
        String roleIds = null;
        if (null != roleId) {
            //只要和当前角色相同级别的组合角色
            roleIds = getRoleIds("", roleId);
            if ("all".equals(roleIds)) {
                ifAll = true;
                roleIds = roleId.toString();
            } else {
                roleIds = roleIds.substring(0, roleIds.length() - 1);
            }
        }
        String showRoleIds = ShiroKit.getUserRoleIds();         //非平台管理员则仅显示自己拥有的资源，由角色触发关联条件
        for (Map map : resourceDict) {
            if (!treeHide || !RxStringUtils.isNotEmptyAndEqualsZero(resourceConfigMap.get(map.get("code").toString()).get("tree"))) {
                if (allocatFlag) {
                    showRoleIds = ShiroKit.getLevelRoleId().toString();
                    resultList.addAll(resourceDao.getRoleAllocatResourceData(map.get("code").toString(), roleIds, showRoleIds, showAll));
                } else {
                    resultList.addAll(resourceDao.getRoleResourceTreeData(map.get("code").toString(), roleIds, showRoleIds, showAll));
                }
            }
        }
        boolean finalIfAll = ifAll;
        resultList.forEach(result -> {
            Map<String, Object> node = new HashMap<>();
            node.put("id", result.get("ID"));
            node.put("type", result.get("TYPE"));
            node.put("name", result.get("NAME"));
            node.put("pid", treeHide ? result.get("SHOW_PARENT_ID") : result.get("PARENT_ID"));
            node.put("showParentId", result.get("SHOW_PARENT_ID"));
            if ("0".equals(result.get("NOT_GARY").toString()) && null != resourceConfigMap.get(result.get("TYPE").toString()).get("garyicon")) {
                node.put("icon", HttpKit.handleCtxPath(resourceConfigMap.get(result.get("TYPE").toString()).get("garyicon").toString()));
            } else {
                node.put("icon", HttpKit.handleCtxPath(resourceConfigMap.get(result.get("TYPE").toString()).get("icon").toString()));
            }
            if (finalIfAll) {
                if (null != result.get("HAS_ID") && Objects.equals(result.get("HAS_ID").toString(), roleId.toString())) {
                    //考虑在保存数据时不要冲掉本来的数据（继承和自己都存在的数据）
                    node.put("checked", true);
                    //标志已经保存的数据
                    node.put("isSave", true);
                }
                node.put("nocheck", true);
            } else {
                if (null != result.get("HAS_ID")) {
                    if (Objects.equals(result.get("HAS_ID").toString(), roleId.toString())) {
                        node.put("checked", true);
                        node.put("isSave", true);
                    } else {
                        if (result.get("HAS_ID").toString().contains(roleId.toString())) {
                            node.put("checked", true);
                            node.put("isSave", true);
                        }
                        node.put("nocheck", true);
                    }
                }
            }
            node.put("open", true);
            nodeList.add(node);
        });
        return nodeList;
    }

    @Override
    public void saveRoleResource(Long roleId, String resourceIds, String delIds) {
        resourceDao.saveRoleResource(roleId, resourceIds, Objects.requireNonNull(ShiroKit.getUser()).getId(), delIds, ShiroKit.isPlatAdmin());
    }

    @Override
    public Map<String, List> getUserResource(Long userId, Boolean hasAll, Boolean isSysAdmin) {
        Map<String, List> resourceMap = new HashMap<>();
        List<Map<String, Object>> resourceDict = CacheKit.get(Cache.CONFIG, "resourceDict");
        for (Map map : resourceDict) {
            if (null != map.get("code")) {
                String type = map.get("code").toString();
                List<Map<String, Object>> resourceList = new ArrayList<>();
                if (Const.RES_TYPE_MENU.equals(type)) {
                    resourceList = getMenus(userId, hasAll, isSysAdmin);
                } else {
                    List<Map<String, Object>> resultList = resourceDao.getUserResource(userId, type, hasAll, isSysAdmin);
                    for (Map<String, Object> result : resultList) {
                        resourceList.add(CamelCaseUtils.parseMapToCamelKeyMap(result));
                    }
                }
                resourceMap.put(type, resourceList);
            }
        }
        return resourceMap;
    }

    @Override
    @SuppressWarnings("unchecked")
    public List<Map<String, Object>> getMenus(Long userId, Boolean hasAll, Boolean isSysAdmin) {
        return (List<Map<String, Object>>) getChild(0, 1, resourceDao.getMenus(userId, hasAll, isSysAdmin)).get("CHILD_MENU");
    }

    private List<Map<String, Object>> sortList(List<Map<String, Object>> list) {
        list.sort((Comparator<Map>) (m1, m2) -> {
            Integer s1 = null != m1.get("sort") ? Integer.parseInt(m1.get("sort").toString()) : 0;
            Integer s2 = null != m2.get("sort") ? Integer.parseInt(m2.get("sort").toString()) : 0;

            return s1.compareTo(s2);
        });
        return list;
    }

    private Map<String, Object> getChild(int startIndex, int startLevel, List<Map<String, Object>> resultList) {
        //结果集合
        Map<String, Object> resultMap = new HashMap<>();
        List<Map<String, Object>> menuList = new ArrayList<>();
        for (int i = startIndex; i < resultList.size(); i++) {
            Map result = resultList.get(i);
            int level = Integer.parseInt(result.get("LV").toString());
            if (level < startLevel) {
                resultMap.put("endIndex", i - 1);
                resultMap.put("CHILD_MENU", sortList(menuList));
                break;
            } else if (level == startLevel) {
                Map<String, Object> menu = new HashMap<>();
                menu.put("id", result.get("MENU_ID"));
                menu.put("name", result.get("MENU_NAME"));
                menu.put("url", result.get("MENU_URL"));
                menu.put("type", result.get("TYPE"));
                menu.put("parentId", result.get("PARENT_ID"));
                menu.put("code", result.get("CODE"));
                menu.put("parentCode", result.get("PARENT_CODE"));
                menu.put("parentName", result.get("PARENT_NAME"));
                menu.put("parentType", result.get("PARENT_TYPE"));
                menu.put("icon", result.get("ICON"));
                menu.put("sort", result.get("SORT"));
                menuList.add(menu);
            } else if (level > startLevel) {
                Map childMap = getChild(i, level, resultList);
                i = Integer.parseInt(childMap.get("endIndex").toString());
                if (menuList.size() > 0) {
                    menuList.get(menuList.size() - 1).put("CHILD_MENU", childMap.get("CHILD_MENU"));
                }
            }
        }
        if (!resultMap.containsKey("endIndex")) {
            resultMap.put("endIndex", resultList.size() - 1);
            resultMap.put("CHILD_MENU", sortList(menuList));
        }
        return resultMap;
    }

    @Override
    public void changeTreeNodeSortAndParent(String ids, Long parentId, String parentType, Long parentShowId, Long needClearTargetId) {
        resourceDao.changeTreeNodeSortAndParent(ids, parentId, parentType, parentShowId, needClearTargetId);
    }

    @Override
    public FastPagination getMenuUrlList(Map map) {
        return resourceDao.getMenuUrlList(map);
    }

    @Override
    public Map<String, Object> getUserResourceUrl(Long id) {
        List<Map<String, Object>> urlList = resourceDao.getUserResourceUrl(id);
        HashMap<String, Object> hashRes = new HashMap();
        for (Map<String, Object> map : urlList) {
            String url = (String) map.get("url");
            if (StringUtils.isNotBlank(url)) {
                hashRes.put(url, true);
            }
        }
        return hashRes;
    }

    @Override
    public void saveAllotRes(String roleIds, Long resId) {
        resourceDao.saveAllotRes(roleIds, resId, Objects.requireNonNull(ShiroKit.getUser()).getId());
    }
}
