package net.ruixin.service.plat.tree;

import net.ruixin.dao.plat.auth.IDataAuthDao;
import net.ruixin.dao.plat.auth.IRoleDao;
import net.ruixin.dao.plat.organ.IOrganDao;
import net.ruixin.dao.plat.organ.IUserDao;
import net.ruixin.domain.constant.OrganConst;
import net.ruixin.domain.plat.auth.AuthResult;
import net.ruixin.domain.plat.organ.SysUser;
import net.ruixin.util.cache.Cache;
import net.ruixin.util.cache.CacheKit;
import net.ruixin.util.data.OrganTreeConfig;
import net.ruixin.util.http.HttpKit;
import net.ruixin.util.tools.RxStringUtils;
import net.ruixin.util.tree.BaseTreeNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * @author Administrator
 */
@Service
public class PlatTreeService {
    @Autowired
    private IOrganDao organDao;
    @Autowired
    private IUserDao userDao;
    @Autowired
    private IRoleDao roleDao;
    @Autowired
    private IDataAuthDao dataAuthDao;


    /**
     * 异步树（机构，包含岗位）
     *
     * @param id              异步节点id
     * @param lx              异步节点类型
     * @param organTreeConfig 树的配置参数
     * @return
     */
    public List getOrganPostUserTreeAsync(Long id, String lx, OrganTreeConfig organTreeConfig, Long userId) {
        String treeKind = organTreeConfig.getKind();
        List<BaseTreeNode> jsonList = new ArrayList<>();
        //初始展开树
        if ((organTreeConfig.getTopId() == null) && (id == null)) {
            addOrgan(jsonList, null, treeKind, userId);
        } else {
            addOrgan(jsonList, id, treeKind, userId);
        }
        if (id != null) {
            if (OrganConst.ORGAN_POST.equals(treeKind) || OrganConst.ORGAN_POST_USER.equals(treeKind)) {
                addPost(jsonList, id, treeKind);
            }
            if (OrganConst.ORGAN_POST_USER.equals(treeKind) || OrganConst.ORGAN_USER.equals(treeKind)) {
                addUser(jsonList, id, lx, organTreeConfig.getOrganId());
            }
        }
        return jsonList;
    }


    private void addOrgan(List<BaseTreeNode> jsonList, Long id, String kind, Long userId) {
        List<Map<String, Object>> organList = organDao.getOrganListByParentId(id);
        AuthResult ar = dataAuthDao.getUserDataAuthResult(userId, "organ");
        BaseTreeNode treeNode;
        String userIcon = HttpKit.handleCtxPath(CacheKit.get(Cache.CONFIG, "organIcon"));
        for (Map<String, Object> map : organList) {
            treeNode = new BaseTreeNode();
            treeNode.setHandleId((map.get("ID") + "jg"));
            treeNode.setId(map.get("ID").toString());
            treeNode.setOrganId(Long.valueOf(map.get("ID").toString()));
            treeNode.setName(map.get("MC").toString());
            treeNode.setFullName(map.get("QC").toString());
            treeNode.setIcon(userIcon);
            treeNode.setpId((id == null ? "" : id) + "jg");

            if (ar.getHasAuth()) {
                if (ar.getHasAll()) {
                    treeNode.setHasAuth(true);
                } else {
                    if (("," + ar.getOids() + ",").contains(("," + map.get("ID").toString() + ","))) {
                        treeNode.setHasAuth(true);
                    } else {
                        treeNode.setHasAuth(false);
                    }
                }
            } else {
                treeNode.setHasAuth(false);
            }
            switch (kind) {
                //机构树
                case OrganConst.ORGAN:
                    treeNode.setParent(Integer.parseInt(map.get("JGCT").toString()) > 0);
                    break;
                //机构岗位
                case OrganConst.ORGAN_POST:
                    treeNode.setParent((Integer.parseInt(map.get("JGCT").toString()) +
                            Integer.parseInt(map.get("GWCT").toString())) > 0);
                    break;
                //机构用户
                case OrganConst.ORGAN_USER:
                    treeNode.setParent((Integer.parseInt(map.get("JGCT").toString()) +
                            Integer.parseInt(map.get("USERCT").toString())) > 0);
                    break;
                //机构岗位用户，机构下直接挂用户
                case OrganConst.ORGAN_POST_USER:
                    treeNode.setParent((Integer.parseInt(map.get("JGCT").toString()) +
                            Integer.parseInt(map.get("GWCT").toString()) +
                            Integer.parseInt(map.get("USERCT").toString())) > 0);
                    break;
                default:
                    break;
            }
            treeNode.setLx("jg");
            jsonList.add(treeNode);
        }
    }

    /**
     * @param jsonList 树JSON
     * @param id       岗位的上级机构id
     */
    private void addPost(List<BaseTreeNode> jsonList, Long id, String kind) {
        List<Map<String, Object>> postList = roleDao.getPostRoleByOrganId(id);
        BaseTreeNode treeNode;
        for (Map<String, Object> map : postList) {
            treeNode = new BaseTreeNode();
            treeNode.setHandleId((map.get("POST_ID") + "gw"));
            treeNode.setId(map.get("POST_ID").toString());
            treeNode.setName(map.get("POST_NAME").toString());
            treeNode.setLx("gw");
            treeNode.setpId((id + "jg"));
            treeNode.setOrganId(id);
            treeNode.setOrganName(map.get("ORGAN_NAME").toString());
            treeNode.setIcon(HttpKit.handleCtxPath(CacheKit.get(Cache.CONFIG, "postIcon")));
            if (kind.equals(OrganConst.ORGAN_POST_USER) || kind.equals(OrganConst.ORGAN_USER)) {
                treeNode.setParent((Integer.parseInt(map.get("USER_CT").toString()) > 0));
            }
            jsonList.add(treeNode);
        }
    }

    /**
     * 添加用户
     *
     * @param jsonList 树数据对象
     * @param id       传入的节点ID
     * @param lx       传入的节点id的类型，jg：机构  gw:岗位
     */
    private void addUser(List<BaseTreeNode> jsonList, Long id, String lx, Long organId) {
        if ("jg".equals(lx)) {
            List<Map<String, Object>> organUserList = userDao.getUserListByOrganId(id);
            BaseTreeNode treeNode;
            for (Map<String, Object> map : organUserList) {
                treeNode = new BaseTreeNode();
                treeNode.setHandleId(map.get("ID") + "yh");
                treeNode.setId(map.get("ID").toString());
                treeNode.setName(map.get("MC").toString());
                treeNode.setpId(id + "jg");
                treeNode.setLx("yh");
                treeNode.setOrganId(id);
                treeNode.setOrganName(map.get("ORGAN_NAME").toString());
                treeNode.setIcon(HttpKit.handleCtxPath(CacheKit.get(Cache.CONFIG, "userIcon")));
                jsonList.add(treeNode);
            }
        } else if ("gw".equals(lx)) {
            List<Map<String, Object>> postUserList = roleDao.getUserListByPostRoleIdAndOrganId(organId, id);
            BaseTreeNode treeNode;
            for (Map<String, Object> map : postUserList) {
                treeNode = new BaseTreeNode();
                treeNode.setHandleId(map.get("USER_ID") + "yh");
                treeNode.setId(map.get("USER_ID").toString());
                treeNode.setName(map.get("USER_NAME").toString());
                treeNode.setpId(id + "gw");
                treeNode.setLx("yh");
                treeNode.setOrganId(organId);
                treeNode.setOrganName(map.get("ORGAN_NAME").toString());
                treeNode.setIcon(HttpKit.handleCtxPath(CacheKit.get(Cache.CONFIG, "userIcon")));
                jsonList.add(treeNode);
            }

        }
    }


    /**
     * 同步树
     *
     * @param kind  树的种类，
     * @param topId 顶级Id
     * @return
     */
    public List getOrganSyncTreeData(String kind, Long topId,String filterId) {
        Map<String, Object> map = new HashMap<>();
        List<BaseTreeNode> resultList;
        List<BaseTreeNode> organList;
        List<BaseTreeNode> postList;
        List<BaseTreeNode> userList;
        map.put("kind", kind);
        map.put("topId", topId);
        organList = getOrganTreeList(map,filterId);
        resultList = organList;
        for (int i = 0; i < organList.size(); i++) {
           organList.get(i).setNocheck(true);
        }
        switch (kind) {
            case OrganConst.ORGAN:
                resultList = organList;
                break;
            case OrganConst.ORGAN_POST:
                postList = getPostList(organList);
                resultList.addAll(postList);
                break;
            case OrganConst.ORGAN_USER:
                userList = getUserList(organList,filterId);
                resultList.addAll(userList);
                break;
            case OrganConst.ORGAN_POST_USER:
                userList = getUserList(organList,filterId);
                postList = getPostList(organList);
                resultList.addAll(postList);
                resultList.addAll(userList);
                break;
            default:
                break;
        }
        return resultList;
    }


    private List<BaseTreeNode> getOrganTreeList(Map map,String filterId) {
        String userIcon = HttpKit.handleCtxPath(CacheKit.get(Cache.CONFIG, "organIcon"));
        List<BaseTreeNode> organTreeList = new ArrayList<>();
        BaseTreeNode treeNode;
        List<Map<String, Object>> organList = organDao.getOrganList(map);
        for (Map<String, Object> o : organList) {
            treeNode = new BaseTreeNode();
            if (RxStringUtils.isNotEmpty(map.get("topId"))) {
                if (Long.valueOf(o.get("ID").toString()).equals(map.get("topId"))) {
                    treeNode.setOpen(true);
                }
            } else if (null == o.get("PARENT_ORG")) {
                treeNode.setOpen(true);
                treeNode.setChecked(true);
            }
            treeNode.setHandleId("o_" + o.get("ID"));
            treeNode.setId(o.get("ID").toString());
            treeNode.setpId("o_" + (null != o.get("PARENT_ORG") ? o.get("PARENT_ORG").toString() : ""));
            treeNode.setName(o.get("ORGAN_NAME").toString());
            treeNode.setLx("jg");
            treeNode.setCode(o.get("ORGAN_CODE").toString());
            treeNode.setIcon(userIcon);
            if(RxStringUtils.isNotEmpty(filterId)){
                //用于机构树
               if(o.get("ID").toString().equals(filterId)){
                   treeNode.setOpen(true);
                   treeNode.setChecked(true);
               }
               //用于责任用户
                String[] split = filterId.split(",");
                for(String str:split){
                    //查询人员的默认机构
                    SysUser user=null;
                    try{
                       user= userDao.getUserById(Long.valueOf(str));
                    }
                    catch (Exception e){

                    }
                     if(user!=null){
                       Long id=user.getDefaultOrganId();
                       if(id.equals(Long.valueOf(o.get("ID").toString()))){
                           treeNode.setOpen(true);
                       }
                    }
                }
            }
            organTreeList.add(treeNode);
        }
        return organTreeList;
    }

    private List<BaseTreeNode> getUserList(List<BaseTreeNode> organList,String filterId) {
        String userIcon = HttpKit.handleCtxPath(CacheKit.get(Cache.CONFIG, "userIcon"));
        List<BaseTreeNode> userTreeList = new ArrayList<>();
        StringBuilder idBuffer = new StringBuilder();
        for (BaseTreeNode treeNode : organList) {
            idBuffer.append(treeNode.getId()).append(",");
        }
        idBuffer.append("0");
        List<Map<String, Object>> userList = userDao.getUserListByOrganId(idBuffer.toString());
        BaseTreeNode treeNode;
        for (Map<String, Object> userMapItem : userList) {
            treeNode = new BaseTreeNode();
            treeNode.setHandleId("u_" + userMapItem.get("ID"));
            treeNode.setId(userMapItem.get("ID").toString());
            treeNode.setName(userMapItem.get("MC").toString());
            treeNode.setpId("o_" + (null != userMapItem.get("ORGAN") ? userMapItem.get("ORGAN") : "  "));
            if(RxStringUtils.isNotEmpty(filterId)&&filterId.contains(userMapItem.get("ID")+"")){
                treeNode.setOpen(true);
                treeNode.setChecked(true);
            }
            treeNode.setLx("yh");
            treeNode.setIcon(userIcon);
            userTreeList.add(treeNode);
        }
        return userTreeList;
    }

    private List<BaseTreeNode> getPostList(List<BaseTreeNode> organList) {
        StringBuilder idBuffer = new StringBuilder();
        for (BaseTreeNode treeNode : organList) {
            idBuffer.append(treeNode.getId()).append(",");
        }
        List<BaseTreeNode> resultList = new ArrayList<>();
        List<Map<String, Object>> postList = organDao.getPostListByOrganIds(idBuffer.toString());
        BaseTreeNode treeNode;
        for (Map<String, Object> postItem : postList) {
            treeNode = new BaseTreeNode();
            treeNode.setHandleId("p_" + postItem.get("POSTROLE_ID"));
            treeNode.setId(postItem.get("POSTROLE_ID").toString());
            treeNode.setpId("o_" + (null != postItem.get("ORGAN") ? postItem.get("ORGAN") : "  "));
            treeNode.setName(postItem.get("ROLE_NAME").toString());
            treeNode.setLx("gw");
            treeNode.setIcon(HttpKit.handleCtxPath(CacheKit.get(Cache.CONFIG, "postIcon")));
            resultList.add(treeNode);
        }
        return resultList;
    }

    public List getOrganTbTreeDataListByRoleId(Long tid, Long roleId) {
        return (List<Map<String, Object>>) getChild(0, 1, organDao.getOrganTbTreeDataListByRoleId(tid, roleId)).get("children");
    }

    private Map<String, Object> getChild(int startIndex, int startLevel, List<Map<String, Object>> resultList) {
        //结果集合
        Map resultMap = new HashMap();
        List<Map<String, Object>> organList = new ArrayList<>();
        for (int i = startIndex; i < resultList.size(); i++) {
            Map result = resultList.get(i);
            int level = Integer.parseInt(result.get("LV").toString());
            if (level < startLevel) {
                resultMap.put("endIndex", i - 1);
                resultMap.put("children", sortList(organList));
                break;
            } else if (level == startLevel) {
                if (null != result.get("roleId")) {
                    result.put("saveFlag", true);
                    result.put("checked", true);
                }
                organList.add(result);
            } else if (level > startLevel) {
                Map childMap = getChild(i, level, resultList);
                i = Integer.parseInt(childMap.get("endIndex").toString());
                if (organList.size() > 0) {
                    organList.get(organList.size() - 1).put("children", childMap.get("children"));
                }
            }
        }
        if (!resultMap.containsKey("endIndex")) {
            resultMap.put("endIndex", resultList.size() - 1);
            resultMap.put("children", sortList(organList));
        }
        return resultMap;
    }

    private List<Map<String, Object>> sortList(List<Map<String, Object>> list) {
        list.sort((Comparator<Map>) (m1, m2) -> {
            Integer s1 = null != m1.get("sort") ? Integer.parseInt(m1.get("sort").toString()) : 0;
            Integer s2 = null != m2.get("sort") ? Integer.parseInt(m2.get("sort").toString()) : 0;

            return s1.compareTo(s2);
        });
        return list;
    }

    public List getOrganUserByOrganId(Long organId) {
        List<Map<String, Object>> jsonList = new ArrayList<>();
        Map<String, Object> organMap = organDao.getOrganData(organId);
        organMap.put("icon", HttpKit.handleCtxPath(CacheKit.get(Cache.CONFIG, "organIcon")));
        List<Map<String, Object>> userList = userDao.getUserListTreeDataByOrganId(organId);
        organMap.put("children", userList);
        jsonList.add(organMap);
        jsonList.get(0).put("open", true);
        return jsonList;
    }
}
