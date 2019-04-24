package net.ruixin.service.qzld;

import net.ruixin.dao.plat.organ.IUserDao;
import net.ruixin.dao.qzld.IFkzlDao;
import net.ruixin.domain.gzl.GzlFb;
import net.ruixin.domain.gzl.GzlJs;
import net.ruixin.domain.plat.auth.ShiroUser;
import net.ruixin.domain.qzld.FkzlSend;
import net.ruixin.enumerate.plat.SfyxSt;
import net.ruixin.service.gzl.IGzlFbService;
import net.ruixin.util.paginate.FastPagination;
import net.ruixin.util.shiro.ShiroKit;
import net.ruixin.util.tools.RxStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class FkzlService implements IFkzlService {

    @Autowired
    private IUserDao userDao;

    @Autowired
    private IGzlFbService gzlFbService;

    @Autowired
    private ICommonService commonService;


    @Autowired
    private IFkzlDao fkzlDao;

    /***
     * 防控指令-反馈列表页面
     * @param map
     * @return FastPagination
     * */
    @Override
    public FastPagination getFkzlFkList(Map map) {
        return fkzlDao.getFkzlFkList(map);
    }

    /**
     * 设置信息已读
     *
     * @param fbid  工作流-发布的主键ID
     * @param jsid  工作流-接收表的主键ID
     * @param sfkhf 是否可回复 0-不可回复，读互联网端数据；1-可回复，读公安网端数据
     * @return
     */
    @Override
    @Transactional
    public void setRead(String fbid, String jsid, String sfkhf) {
        if ("0".equals(sfkhf)) {
            //互联网端数据
            fkzlDao.insertGzlHlwYdzt(Long.valueOf(fbid));
        } else {
            //公安网端数据
            fkzlDao.setGzlYdzt(Long.valueOf(jsid));
        }
    }

    /**
     * 获取反馈详细信息
     *
     * @param fbid  工作流-发布的主键ID
     * @param sfkhf 是否可回复 0-不可回复，读互联网端数据；1-可回复，读公安网端数据
     * @return
     */
    @Override
    public List<Map<String, Object>> getFkzlFkDetail(Long fbid, String sfkhf) {
        return fkzlDao.getFkzlFkDetail(fbid, sfkhf);
    }


    @Override
    public boolean sendFkzl(FkzlSend fkzlSend) {
        if(!RxStringUtils.isEmpty(fkzlSend.getOrgIds())){//按照单位发送
            //需要先获取组织下的人员
            List<Map<String,Object>> emps = userDao.getUserByOrganIds(fkzlSend.getOrgIds());
            //组织指令信息
            ShiroUser currentuser = ShiroKit.getUser();
            GzlFb gzlFb = new GzlFb();
            gzlFb.setFbdw(currentuser.getDftDeptId());
            gzlFb.setSjlxzd("ZLLX");
            gzlFb.setFbdwmc(currentuser.getDftDeptName());
            gzlFb.setNr(fkzlSend.getContent());
            gzlFb.setSjlylx("1");//数据来源
            gzlFb.setFsfs("1");//pc端
            gzlFb.setCjrId(currentuser.getId());
            gzlFb.setCjrmc(currentuser.getName());
            gzlFb.setSjlx(fkzlSend.getType());
            gzlFb.setYdzt("0");
            gzlFb.setSfyxSt(SfyxSt.VALID);
            gzlFb.setBt(commonService.getGzlFbBt(gzlFb));
            //根据接收单位组织接收人
            if(emps!=null && emps.size()>0){
                List<GzlJs> list = new ArrayList<>();
                GzlJs gzlJs = null;
                for(Map<String,Object> map:emps){
                    gzlJs = new GzlJs();
                    gzlJs.setJsdw(Long.parseLong(map.get("ORGAN").toString()));
                    gzlJs.setJsdwmc(map.get("ORGAN_NAME").toString());
                    gzlJs.setJrsId(Long.parseLong(map.get("ID").toString()));
                    gzlJs.setJsrmc(map.get("MC").toString());
                    gzlJs.setSfyxSt(SfyxSt.VALID);
                    gzlJs.setYdzt("0");
                    gzlJs.setFkzt("0");
                    list.add(gzlJs);
                }
                gzlFb.setGzlJsList(list);
            }
            gzlFbService.saveGzlFb(gzlFb);
        }else{
            //TODO 按照人员发送
        }

        return true;
    }

    @Override
    public List getXzqh() {
        return fkzlDao.getXzqh();
    }
}
