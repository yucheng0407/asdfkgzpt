package net.ruixin.service.gzl;

import com.vividsolutions.jts.geom.*;
import net.ruixin.dao.gzl.IGzlDao;
import net.ruixin.domain.gzl.GzlFb;
import net.ruixin.domain.gzl.GzlFk;
import net.ruixin.domain.gzl.GzlJs;
import net.ruixin.domain.gzl.GzlJxfb;
import net.ruixin.domain.plat.auth.ShiroUser;
import net.ruixin.domain.plat.organ.SysOrgan;
import net.ruixin.domain.plat.organ.SysUser;
import net.ruixin.enumerate.plat.SfyxSt;
import net.ruixin.service.plat.attachment.IAttachmentService;
import net.ruixin.service.plat.common.BaseService;
import net.ruixin.service.plat.dictionary.IDictService;
import net.ruixin.util.data.UploadEntity;
import net.ruixin.util.paginate.FastPagination;
import net.ruixin.util.shiro.ShiroKit;
import net.ruixin.util.support.DateUtil;
import net.ruixin.util.tools.ObjectUtils;
import net.ruixin.util.tools.RxStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.MultiValueMap;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

/**
 * 工作流Service实现
 *
 * @author czq 2019年4月10日15:56:33
 */
@Service
public class GzlService extends BaseService implements IGzlService {

    @Autowired
    private IGzlDao gzlDao;

    @Autowired
    private IAttachmentService attachmentService;

    @Autowired
    private IDictService dictService;

    private GeometryFactory geometryFactory = new GeometryFactory();

    @Override
    public void saveGzlApp(Map<String, Object> gzl, MultiValueMap<String, MultipartFile> multiValue) {
        String uuid = UUID.randomUUID().toString();
        saveGzlApp(gzl, uuid);
        uploadFile(multiValue, uuid);
    }

    @Override
    public FastPagination getAppGzlListPage(int pageNum, int pageSize, String dataType, String sjlyzxt, String bt) {
        Map map = new HashMap(4);
        map.put("pageNum", pageNum);
        map.put("pageSize", pageSize);
        map.put("dataType", dataType);
        map.put("sjlyzxt", sjlyzxt);
        map.put("bt", bt);
        FastPagination fastPagination = gzlDao.getAppGzlListPage(map);
        List<Map> rows = fastPagination.getRows();
        for (Map m : rows) {
            m.put("CJSJ", DateUtil.format((Date) m.get("CJSJ"), "yyyy-MM-dd HH:mm"));
            m.put("lastFeedBack", gzlDao.getLastGzlFk(m.get("ID").toString()));
        }
        fastPagination.setRows(rows);
        return fastPagination;
    }


    @Override
    public Map getAppGzlDetail(Long id) {
        GzlFb gzlFb = get(GzlFb.class, id);
        Map map = ObjectUtils.parseObjToMap(gzlFb);
        map.put("cjsj", DateUtil.format((Date) map.get("cjsj"), "yyyy-MM-dd HH:mm"));
        map.put("sjlxValue", dictService.getSubDictValueByCode(gzlFb.getSjlxzd(), gzlFb.getSjlx()));
        map.put("jjcdValue", dictService.getSubDictValueByCode("JJCD", gzlFb.getJjcd()));
        map.put("sjztValue", dictService.getSubDictValueByCode("SJZT", gzlFb.getSjzt()));
        map.put("fklxValue", dictService.getSubDictValueByCode("FKLX", gzlFb.getFklx()));
        map.put("isCommander", ShiroKit.getUser().getId().equals(gzlFb.getCjrId()));
        map.put("messages", getChattingMessages(gzlFb.getGzlJsList(), gzlFb.getCjrId()));
        return map;
    }

    @Override
    public void saveAppGzlFk(Long jsId, Map<String, Object> textMessage, MultiValueMap<String, MultipartFile> fileMessage) {
        GzlFk gzlFk = new GzlFk();
        gzlFk.setJsid(jsId);
        gzlFk.setSfyxSt(SfyxSt.VALID);
        if (textMessage.containsKey("txt")) {
            gzlFk.setMsgType("txt");
            gzlFk.setNr(textMessage.get("txt").toString());
        } else {
            String uuid = UUID.randomUUID().toString();
            Set<String> keys = fileMessage.keySet();
            for (String key : keys) {
                UploadEntity uploadEntity = new UploadEntity();
                uploadEntity.setUuid(uuid);
                List<MultipartFile> multipartFileList = fileMessage.get(key);
                Long id = attachmentService.uploadSingle(multipartFileList.get(0), uploadEntity);
                gzlFk.setFjid(id.toString());
                gzlFk.setMsgType(key);
            }
        }
        save(gzlFk);
    }

    @Override
    public void saveAppGzlJxFb(Long fbId,Map<String, Object> textMessage, MultiValueMap<String, MultipartFile> fileMessage) {
        GzlJxfb gzlJxfb = new GzlJxfb();
        gzlJxfb.setFbid(fbId);
        gzlJxfb.setSfyxSt(SfyxSt.VALID);
        if (textMessage.containsKey("txt")) {
            gzlJxfb.setNr(textMessage.get("txt").toString());
        } else {
            String uuid = UUID.randomUUID().toString();
            Set<String> keys = fileMessage.keySet();
            for (String key : keys) {
                UploadEntity uploadEntity = new UploadEntity();
                uploadEntity.setUuid(uuid);
                List<MultipartFile> multipartFileList = fileMessage.get(key);
                Long id = attachmentService.uploadSingle(multipartFileList.get(0), uploadEntity);
                gzlJxfb.setFjid(id.toString());
            }
        }
        save(gzlJxfb);
    }

    @Override
    public Long getGzlJsId(Long fbId) {
        Long jsId = null;
        GzlFb gzlFb = get(GzlFb.class,fbId);
        List<GzlJs> gzlJsList =  gzlFb.getGzlJsList();
        Long userId = ShiroKit.getUser().getId();
        for (GzlJs gzlJs : gzlJsList) {
            if(userId.equals(gzlJs.getJrsId())){
                jsId = gzlJs.getId();
                break;
            }
        }
        return jsId;
    }

    /**
     * 获取反馈信息
     *
     * @param gzlJsList
     * @param commanderId
     * @return
     */
    public List getChattingMessages(List<GzlJs> gzlJsList, Long commanderId) {
        List list = new ArrayList();
        if (null == gzlJsList) {
            return list;
        }
        ShiroUser shiroUser = ShiroKit.getUser();
        for (GzlJs gzlJs : gzlJsList) {
            Map map = new HashMap(2);
            Map firstMap = gzlDao.getFirstFeedBack(gzlJs.getId());
            if (null != firstMap) {
                firstMap.put("isCommander", shiroUser.getId().equals(commanderId));
                map.put("firstFeedBack", firstMap);
                map.put("feedBacks", gzlDao.getFeedBacks(gzlJs.getId(), Long.parseLong(firstMap.get("id").toString())));
                list.add(map);
            }
        }
        return list;
    }

    /**
     * 保存实体
     *
     * @param gzl
     * @param uuid
     */
    @Transactional(rollbackFor = Exception.class)
    public void saveGzlApp(Map<String, Object> gzl, String uuid) {
        GzlFb gzlFb = new GzlFb();
        gzlFb.setNr(gzl.get("nr").toString());
        gzlFb.setFsfs("2");//1- PC端，2-APP端
        gzlFb.setJjcd(RxStringUtils.isNotEmpty(gzl.get("jjcd")) ? gzl.get("jjcd").toString() : null);
        gzlFb.setSjzt(RxStringUtils.isNotEmpty(gzl.get("sszt")) ? gzl.get("sszt").toString() : null);
        gzlFb.setFklx(RxStringUtils.isNotEmpty(gzl.get("fklx")) ? gzl.get("fklx").toString() : null);
        gzlFb.setFpd(RxStringUtils.isNotEmpty(gzl.get("fpd")) ? Long.parseLong(gzl.get("fpd").toString()) : null);
        gzlFb.setYdzt("0");//阅读状态（上报人） 0-未读，1-已读
//        Coordinate coord = new Coordinate(31.371098, 118.371123);
//        Point point = geometryFactory.createPoint(coord);
//        gzlFb.setShape(point.reverse());
        gzlFb.setFjid(uuid);
        gzlFb.setSjlyzxt("1");//数据来源 1-街面防控警务APP指令 ，2-网格防范警务
//        gzlFb.setSjlylx("1");//数据来源 1-指令 ，2-线索，3-联勤联动，4-防控反馈 5-防范反馈，6-护航扶贫攻坚
        gzlFb.setSjlx(getSjlx(gzl));
        gzlFb.setSjlxzd(getSjlxDictCode(gzl));
        gzlFb.setBt(getGzlFbBt(gzlFb));
        ShiroUser shiroUser = ShiroKit.getUser();
        gzlFb.setFbdw(shiroUser.getDftDeptId());
        gzlFb.setFbdwmc(shiroUser.getDftDeptName());
        gzlFb.setCjrmc(shiroUser.getName());
        gzlFb.setSfyxSt(SfyxSt.VALID);
        gzlFb.setGzlJsList(getGzlJsList(gzl.get("jsr").toString()));
        save(gzlFb);
    }

    /**
     * 保存附件
     *
     * @param multiValue
     * @param uuid
     */
    public void uploadFile(MultiValueMap<String, MultipartFile> multiValue, String uuid) {
        Set<String> keys = multiValue.keySet();
        for (String key : keys) {
            UploadEntity uploadEntity = new UploadEntity();
            uploadEntity.setUuid(uuid);
            List<MultipartFile> multipartFileList = multiValue.get(key);
            String addFileIds = attachmentService.upload(multipartFileList, uploadEntity);
        }
    }

    /**
     * 获取工作流中的数据类型字段值
     * 指令类型 线索类型 联动类型 防控反馈 防范反馈 护航扶贫攻坚
     *
     * @param map
     * @return
     */
    public String getSjlx(Map map) {
        String sjlx = null;
        if (map.containsKey("zllx")) {
            sjlx = map.get("zllx").toString();
        }
        if (map.containsKey("xslx")) {
            sjlx = map.get("xslx").toString();
        }
        if (map.containsKey("ldlx")) {
            sjlx = map.get("ldlx").toString();
        }
        if (map.containsKey("fkfklx")) {
            sjlx = map.get("fkfklx").toString();
        }
        if (map.containsKey("fffklx")) {
            sjlx = map.get("fffklx").toString();
        }
        if (map.containsKey("hhfpgj")) {
            sjlx = map.get("hhfpgj").toString();
        }
        return sjlx;
    }

    /**
     * 获取工作流中的数据类型对应字典CODE
     * 数据类型对应字典CODE：ZLLX (指令)，XSLX(线索)，LDLX(联勤联动)，FKFKLX(防控反馈) ，FFFKLX(防范反馈)，HHFPGJ(护航扶贫攻坚)
     *
     * @param map
     * @return
     */
    public String getSjlxDictCode(Map map) {
        String dictCode = null;
        if (map.containsKey("zllx")) {
            dictCode = "ZLLX";
        }
        if (map.containsKey("xslx")) {
            dictCode = "XSLX";
        }
        if (map.containsKey("ldlx")) {
            dictCode = "LDLX";
        }
        if (map.containsKey("fkfklx")) {
            dictCode = "FKFKLX";
        }
        if (map.containsKey("fffklx")) {
            dictCode = "FFFKLX";
        }
        if (map.containsKey("hhfpgj")) {
            dictCode = "HHFPGJ";
        }
        return dictCode;
    }

    /**
     * 依据接收人id保存工作流接收表 一对多
     *
     * @param idStr
     * @return
     */
    public List<GzlJs> getGzlJsList(String idStr) {
        List list = new ArrayList();
        String[] ids = idStr.split(",");
        for (String id : ids) {
            GzlJs gzlJs = new GzlJs();
            SysUser sysUser = get(SysUser.class, Long.parseLong(id));
            gzlJs.setJrsId(Long.parseLong(id));
            gzlJs.setJsrmc(sysUser.getUserName());
            gzlJs.setJsdw(sysUser.getDefaultOrganId());
            gzlJs.setJsdwmc(sysUser.getDftOrganName());
            gzlJs.setSfyxSt(SfyxSt.VALID);
            gzlJs.setFkzt("0");
            gzlJs.setYdzt("0");
            list.add(gzlJs);
        }
        return list;
    }

    /**
     * 获取发布标题
     * 时间 + 类型
     *
     * @param gzlFb
     * @return
     */
    public String getGzlFbBt(GzlFb gzlFb) {
        String value = DateUtil.format(new Date(), "yyyy-MM-dd HH:mm ");
        String dictValue = dictService.getSubDictValueByCode(gzlFb.getSjlxzd(), gzlFb.getSjlx());
        return value + dictValue;
    }

}