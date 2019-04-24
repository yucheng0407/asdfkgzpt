package net.ruixin.service.qzld;

import net.ruixin.dao.qzld.IBqglDao;

import net.ruixin.domain.qzld.Bqgl;
import net.ruixin.enumerate.plat.SfyxSt;
import net.ruixin.util.paginate.FastPagination;
import net.ruixin.util.shiro.ShiroKit;
import net.ruixin.util.tools.RxStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.SimpleDateFormat;
import java.util.*;

@SuppressWarnings("all")
@Service
public class BqglService implements IBqglService {


    @Autowired
    private IBqglDao bqglDao;


    @Override
    public FastPagination getBqglListPage(Map map){
        return bqglDao.getBqglListPage(map);
    }

    @Override
    public Map getDefaultUser(){
        Long zrdw=  ShiroKit.getUser().getDftDeptId();
        String zrdwmc=ShiroKit.getUser().getDftDeptName();
        Map map=new HashMap();
        map.put("zrdw",zrdw);
        map.put("zrdwmc",zrdwmc);
        return map;
    }

    @Override
    public List getZbld(Long defaultOrganid){
        return bqglDao.getZbld(defaultOrganid);
    }

    @Transactional
    @Override
    public void saveBqgl(Bqgl bqgl,String drs){

        try{
            if(RxStringUtils.isNotEmpty(drs)){
                List<Bqgl> list=new ArrayList<>();
                List<Date> ks=new ArrayList<>();
                List<Date> js=new ArrayList<>();
                String[] arr = drs.split(",");
                SimpleDateFormat sdf =   new SimpleDateFormat( "yyyy-MM-dd HH:mm:ss" );
                SimpleDateFormat sdf2 =   new SimpleDateFormat( "yyyy-MM-dd" );
                SimpleDateFormat sdf3 =   new SimpleDateFormat( "HH:mm:ss" );
                String time1= sdf3.format(bqgl.getZbkssj());
                String time2= sdf3.format(bqgl.getZbjssj());
                for (int i = 0; i <arr.length ; i++) {
                    int days= differentDaysByMillisecond(sdf2.parse(sdf2.format(bqgl.getZbkssj()))  ,sdf2.parse(sdf2.format(bqgl.getZbjssj())));
                    Date date1= sdf.parse(arr[i]+" "+time1);
                    Date date2=addDate(sdf.parse(arr[i]+" "+time2),days);
                    ks.add(date1);
                    js.add(date2);
                    Bqgl desc=CopyBean(bqgl);
                    list.add(desc);
                }
                for (int i = 0; i <list.size() ; i++) {
                     list.get(i).setZbkssj(ks.get(i));
                     list.get(i).setZbjssj(js.get(i));
                    bqglDao.saveOrUpdate(list.get(i));
                }
            }
            else {
                bqglDao.saveOrUpdate(bqgl);
            }
        }
        catch (Exception e){
            e.printStackTrace();
        }
    }
    @Transactional
    @Override
    public   void changeFbzt(String ids){
        if(RxStringUtils.isNotEmpty(ids)){
            String[] strs=ids.split(",");
            for (int i = 0; i <strs.length ; i++) {
                Bqgl bqgl=bqglDao.get(Long.valueOf(strs[i]));
                bqgl.setSffb_st("1");
                bqgl.setXgrId(ShiroKit.getUser().getId());
                bqgl.setXgsj(new Date());
            }
        }
    }
    @Override
    public  FastPagination getYylsList(Map map){
        return bqglDao.getYylsList(map);
    }
    @Override
    public Bqgl getBqglById(Long id){
        return bqglDao.get(id);
    }
    @Transactional
    @Override
    public  void deleteBqgl(String ids){
        String[] strs=ids.split(",");
        for (int i = 0; i <strs.length ; i++) {
            Bqgl bqgl=bqglDao.get(Long.valueOf(strs[i]));
            bqgl.setSfyxSt(SfyxSt.UNVALID);
            bqgl.setXgrId(ShiroKit.getUser().getId());
            bqgl.setXgsj(new Date());
        }
    }
    /**
     * 通过时间秒毫秒数判断两个时间的间隔
     * @param date1
     * @param date2
     * @return
     */
    public static int differentDaysByMillisecond(Date date1,Date date2)
    {
        int days = (int) ((date2.getTime() - date1.getTime()) / (1000*3600*24));
        return days;
    }


   /***
    * 日期加上指定天数
    * @param num
    * @param newDate
    * @return date
    * */

    public static Date addDate(Date date,int day) throws Exception {
        long time = date.getTime(); // 得到指定日期的毫秒数
        day = day*24*60*60*1000; // 要加上的天数转换成毫秒数
        time+=day; // 相加得到新的毫秒数
        return new Date(time); // 将毫秒数转换成日期
    }
     /**
      * 对象克隆
      * */
     public static Bqgl CopyBean(Bqgl org){
         Bqgl bqgl=new Bqgl();
         bqgl.setSfyxSt(SfyxSt.VALID);
         bqgl.setBqfxjsl(org.getBqfxjsl());
         bqgl.setZbfxjsl(org.getZbfxjsl());
         bqgl.setSffb_st("0");//不发布
        bqgl.setBqld(org.getBqld());
        bqgl.setBqldmc(org.getBqldmc());
        bqgl.setBqmjs(org.getBqmjs());
        bqgl.setBqmjmcs(org.getBqmjmcs());
        bqgl.setBz(org.getBz());
        bqgl.setZrdw(org.getZrdw());
        bqgl.setZrdwmc(org.getZrdwmc());
        bqgl.setZblddh(org.getZblddh());
        bqgl.setZbsdh(org.getZbsdh());
        bqgl.setZbldzw(org.getZbldzw());
        bqgl.setZbmjmcs(org.getZbmjmcs());
        bqgl.setZbmjs(org.getZbmjs());
        bqgl.setZbld(org.getZbld());
        bqgl.setZbldxm(org.getZbldxm());
        return bqgl;
     }
     @Transactional
     @Override
     public void qxfb(){
         List<Bqgl> list = bqglDao.findQbglByDay(new Date());
         for(Bqgl b:list){
             b.setSffb_st("1");
         }
     }
}

