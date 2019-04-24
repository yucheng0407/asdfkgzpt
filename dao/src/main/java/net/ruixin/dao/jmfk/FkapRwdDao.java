package net.ruixin.dao.jmfk;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Repository;
import net.ruixin.util.paginate.FastPagination;
import java.util.*;
import net.ruixin.util.tools.RxStringUtils;
import net.ruixin.util.hibernate.BaseDao;              
import net.ruixin.domain.jmfk.FkapRwd;

/**
 * 防控安排表 Dao实现
 *
 * @author rxCoder on 2019-4-9 11:52:01
 */
@SuppressWarnings("all")
@Repository
public class FkapRwdDao extends BaseDao<FkapRwd> implements IFkapRwdDao {
    final String temp1="SELECT COUNT(*) FROM T_FKAP_RWD WHERE " +
            "  to_date(to_char(XFKSSJ,'yyyy-MM-dd'),'yyyy-MM-dd') >=to_date(to_char((SELECT SYSDATE-1 FROM DUAL),'yyyy-MM-dd'),'yyyy-MM-dd')\n " +
            "  AND to_date(to_char(XFJSSJ,'yyyy-MM-dd'),'yyyy-MM-dd') <=to_date(to_char((SELECT SYSDATE+1 FROM DUAL),'yyyy-MM-dd'),'yyyy-MM-dd')\n " +
            "  AND(( ? BETWEEN  XFKSSJ AND  XFJSSJ) OR (? BETWEEN  XFKSSJ AND  XFJSSJ))";
    final  String temp2="SELECT COUNT(*) FROM T_FKAP_RWD WHERE " +
            " to_date(to_char(XFKSSJ,'yyyy-MM-dd'),'yyyy-MM-dd') >=to_date(to_char((SELECT SYSDATE-1 FROM DUAL),'yyyy-MM-dd'),'yyyy-MM-dd')" +
            "AND  to_date(to_char(XFJSSJ,'yyyy-MM-dd'),'yyyy-MM-dd') <=to_date(to_char((SELECT SYSDATE+1 FROM DUAL),'yyyy-MM-dd'),'yyyy-MM-dd')" +
            "AND XFKSSJ >? AND XFJSSJ< ?";
    @Override
    public FastPagination getFkapRwdListPage(Map map) {
        StringBuilder sql = new StringBuilder();
        List<Object> params = new ArrayList<>();

        sql.append("SELECT T.ID ," +
                "T.ZRDW ," +
                "T.ZRDWMC ," +
                "(SELECT  wm_concat(D.DEVICE_NAME)  FROM  T_DEVICE_INFOMATION  D WHERE D.SFYX_ST='1' AND  INSTR ((SELECT wm_concat(E.SBID)FROM T_FKAP_SB_GLB  E  WHERE  E.FKID = T.ID AND E.SFYX_ST='1' ),D.ID )>0) SBNAME," +
                "T.XZ," +
                "T.RWLX," +
                "T.XFFS," +
                "T.ZRMJS," +
                "T.ZRMJMCS," +
                "TO_CHAR(T.XFKSSJ,'yyyy-MM-dd HH24:mi:ss') XFKSSJ," +
                "TO_CHAR(T.XFJSSJ,'yyyy-MM-dd HH24:mi:ss') XFJSSJ ," +
                "T.XQLX," +
                "(SELECT XQMC FROM T_AREA_XQB WHERE T.XQID=ID  AND SFYX_ST='1') XQID ," +
                "(SELECT MC FROM T_AREA_ZFQY WHERE ID= T.ZFQY  AND SFYX_ST='1') ZFQY ," +
                "(SELECT  wm_concat(TO_CHAR(ZFKSSJ,'HH24:mi')||'--'||TO_CHAR(ZFJSSJ,'HH24:mi'))  FROM T_AREA_ZFSJ  WHERE T.ZFQY=ZFID AND SFYX_ST='1' GROUP BY zfid  ) ZFSD "+
                "FROM T_FKAP_RWD T WHERE T.SFYX_ST='1' " );
        if (RxStringUtils.isNotEmpty(map.get("zrdwmc"))) {
                sql.append(" AND INSTR(T.ZRDWMC,?)>0 ");
                params.add(map.get("zrdwmc"));
        }
        sql.append("ORDER BY T.XGSJ DESC");
        return super.getPaginationBySql(sql, params,map);
    }
    @Override
    public FastPagination getXqListPage(Map map,String xqlx){
        StringBuilder sql = new StringBuilder();
        List<Object> params = new ArrayList<>();
        sql.append("SELECT ID , XQMC  , (SELECT ORGAN_NAME  FROM SYS_ORGAN WHERE ID=SSDW)SSDW  ,CJSJ FROM t_area_xqb WHERE SFYX_ST='1' ");
        if (RxStringUtils.isNotEmpty(xqlx)) {
            sql.append(" AND INSTR(XQLX,?)>0 ");
            params.add(xqlx);
        }
        if (RxStringUtils.isNotEmpty(map.get("xqmc"))) {
            sql.append(" AND INSTR(XQMC,?)>0 ");
            params.add(map.get("xqmc"));
        }
        sql.append("ORDER BY XGSJ DESC");
        return super.getPaginationBySql(sql, params,map);
    }
    @Override
    public FastPagination getDeviceListPage(Map map, String equipmentParent, String equipmentChild){
        List<Object> args = new ArrayList<>();
        StringBuilder sql = new StringBuilder();
        sql.append("SELECT D.ID, D.DEVICE_NAME ,D.DEVICE_CODE ,D.EQUIPMENT_PARENT,EQUIPMENT_CHILD ,D.DEVICE_ORGAN_NAME,  D.XGSJ FROM T_DEVICE_INFOMATION D WHERE D.SFYX_ST='1'");

        if (RxStringUtils.isNotEmpty(map.get("deviceName"))) {
            sql.append(" AND D.DEVICE_NAME LIKE ? ");
            args.add("%" + map.get("deviceName") + "%");
        }

        //todo 装备大类小类查询
        //大类查询
        if (RxStringUtils.isNotEmpty(equipmentParent)) {
            sql.append(" AND D.EQUIPMENT_PARENT = ?  ");
            args.add(equipmentParent);
        }
        //小类查询
        if (RxStringUtils.isNotEmpty(equipmentChild)) {
            sql.append(" AND D.EQUIPMENT_CHILD = ? ");
            args.add(equipmentChild );
        }
        sql.append(" ORDER BY D.XGSJ DESC,D.ID DESC ");
        return super.getPaginationBySql(sql, args,map);
    }

    @Override
    public FastPagination getZfListPage(Map map){
        List<Object> args = new ArrayList<>();
        StringBuilder sql = new StringBuilder();
        sql.append("SELECT T.ID ,T.MC ,(SELECT ORGAN_NAME  FROM SYS_ORGAN WHERE ID=T.SSDW) SSDW  ,T.ZFYQ , to_char(T.ZFKSRQ,'yyyy-MM-dd')ZFKSRQ  , to_char(T.ZFJSRQ,'yyyy-MM-dd') ZFJSRQ  ,T.XGSJ , wm_concat(to_char(D.ZFKSSJ,'HH24:mi')) ZFKSSJ  ,wm_concat(to_char(D.ZFJSSJ,'HH24:mi')) ZFJSSJ \n" +
                "FROM  t_area_zfqy   T  INNER JOIN t_area_zfsj D  ON T.ID =D.ZFID \n" +
                "WHERE T.SFYX_ST='1'AND D.SFYX_ST='1' AND\n" +
                "((SELECT to_date(to_char(SYSDATE,'yyyy-MM-dd'),'yyyy-MM-dd') FROM DUAL) BETWEEN to_date(to_char(T.ZFKSRQ,'yyyy-MM-dd'),'yyyy-MM-dd') \n" +
                " AND to_date(to_char(T.ZFJSRQ,'yyyy-MM-dd'),'yyyy-MM-dd')) ");

        if (RxStringUtils.isNotEmpty(map.get("mc"))) {
            //重防区域名称
            sql.append(" AND INSTR(T.MC,?)>0");
            args.add(map.get("mc"));
        }
        if (RxStringUtils.isNotEmpty(map.get("zfksrq"))) {
            //重防开始时间
            sql.append(" AND  to_date(to_char(T.ZFKSRQ,'yyyy-MM-dd'),'yyyy-MM-dd') >= to_date( ? , 'YYYY-MM-DD')");
            args.add(map.get("zfksrq"));
        }
        if (RxStringUtils.isNotEmpty(map.get("zfjsrq"))) {
            //重防开始结束
            sql.append(" AND to_date(to_char(T.ZFJSRQ,'yyyy-MM-dd'),'yyyy-MM-dd') <= to_date( ? , 'YYYY-MM-DD') ");
            args.add(map.get("zfjsrq"));
        }

        sql.append(" GROUP BY (T.ID ,T.MC ,T.SSDW ,T.ZFYQ , T.ZFKSRQ  , T.ZFJSRQ ,T.XGSJ) ORDER BY T.XGSJ DESC ");
        return super.getPaginationBySql(sql, args,map);
    }


    @Override
    public Boolean judgeRq(Date xfkssj, Date xfjssj){

        //1.开始时间或结束时间存在A-B时间段中 (前天 今天  后天三天时间内)
        String sql=temp1;
        Long L1= this.jdbcTemplate.queryForObject(sql,new Object[]{xfkssj,xfjssj},Long.class);
        if(L1!=0L){
            return false;
        }
        //2.开始时间小于A 结束时间大于B(前天 今天  后天三天时间内)
        sql=temp2;
        Long L2= this.jdbcTemplate.queryForObject(sql,new Object[]{xfkssj,xfjssj},Long.class);
        if(L2!=0L){
            return false;
        }
        else{
            return false;
        }
    }

    @Override
    public Boolean judgeXz(FkapRwd fkapRwd){
        //1.开始时间或结束时间存在A-B时间段中 (前天 今天  后天三天时间内) 巡组是否相同
        String sql=temp1+" AND XZ=?";
        Long L1= this.jdbcTemplate.queryForObject(sql,new Object[]{fkapRwd.getXfkssj(),fkapRwd.getXfjssj(),fkapRwd.getXz()},Long.class);
        if(L1!=0L){
            return false;
        }
        //2.开始时间小于A 结束时间大于B(前天 今天  后天三天时间内)
        sql=temp2+ " AND XZ=?";
        Long L2= this.jdbcTemplate.queryForObject(sql,new Object[]{fkapRwd.getXfkssj(),fkapRwd.getXfjssj(),fkapRwd.getXz()},Long.class);
        if(L2!=0L){
            return false;
        }
        else{
            return true;
        }

    }

    @Override
    public Boolean judgeMj(FkapRwd fkapRwd){
        //1.开始时间或结束时间存在A-B时间段中 (前天 今天  后天三天时间内) 民警是否相同
        String sql= temp1+" AND INSTR(ZRMJS,?)>0 ";
        Long L1= this.jdbcTemplate.queryForObject(sql,new Object[]{fkapRwd.getXfkssj(),fkapRwd.getXfjssj(),fkapRwd.getZrmjmcs()},Long.class);
        if(L1!=0L){
            return false;
        }
        //2.开始时间小于A 结束时间大于B(前天 今天  后天三天时间内)
        sql=temp2+" AND INSTR(ZRMJS,?)>0";
        Long L2= this.jdbcTemplate.queryForObject(sql,new Object[]{fkapRwd.getXfkssj(),fkapRwd.getXfjssj(),fkapRwd.getZrmjmcs()},Long.class);
        if(L2!=0L){
            return false;
        }
        else{
            return true;
        }
    }

    @Override
    public Boolean judgeDevices( FkapRwd fkapRwd,String deviceIds){
        //查询所有符合条件的任务ID
        String sql=temp1.replace("COUNT(*)" ,"ID");
        List<Long> list= this.jdbcTemplate.queryForList(sql,new Object[]{fkapRwd.getXfkssj(),fkapRwd.getXfjssj()},Long.class);
        sql=temp2.replace("COUNT(*)" ,"ID");
        list.addAll( this.jdbcTemplate.queryForList(sql,new Object[]{fkapRwd.getXfkssj(),fkapRwd.getXfjssj()},Long.class));
        //查询设备关联表中设备ID
        List<String> ids=new ArrayList<>();
        for (int i = 0; i <list.size() ; i++) {
            List<String> tempList = this.jdbcTemplate.queryForList("SELECT SBID  FROM T_FKAP_SB_GLB T WHERE  T.FKID =?", new Object[]{list.get(i)}, String.class);
            ids.addAll(tempList);
        }
        List<String> devices = Arrays.asList(deviceIds.split(","));
        for (int i = 0; i <ids.size() ; i++) {
            if(deviceIds.contains(ids.get(i))){
                return  false;
            }
        }
        return true;
    }

    @Override
    public void glSb(String sbid, Long rwid) {
        //防控安排	1-未检测，2-在线，3-不在线  在线情况
        //防控安排	1-未检测，2-正常，3-异常    车载视频
         Long id= this.jdbcTemplate.queryForObject("SELECT SEQ_T_FKAP_SB_GLB.NEXTVAL FROM DUAL",Long.class);
         //判断设备类型是否是警用车辆
        String type=this.jdbcTemplate.queryForObject("SELECT EQUIPMENT_PARENT  FROM T_DEVICE_INFOMATION  WHERE ID =? ",new Object[]{sbid},String.class);
         if("EQUIPMENTPARENT_1".equals(type)){
             this.jdbcTemplate.update("INSERT INTO T_FKAP_SB_GLB (ID,FKID,SBID,SFYX_ST,SBZXZT,CZSHZT )VALUES(?,?,?,'1','1','1')",new Object[]{id,rwid,Long.valueOf(sbid)});
         }
         else{
             this.jdbcTemplate.update("INSERT INTO T_FKAP_SB_GLB (ID,FKID,SBID,SFYX_ST,SBZXZT)VALUES(?,?,?,'1','1')",new Object[]{id,rwid,Long.valueOf(sbid)});
         }
    }
    @Override
    public void checkSb(String s){
        this.jdbcTemplate.update("UPDATE T_FKAP_SB_GLB SET SBZXZT='2', CZSHZT='2 'WHERE SBID=?" ,new Object[]{Long.valueOf(s)});
    }

    @Override
    public  Map getOrganName(Long id){
        Map<String,String> data=new HashMap();
        String name=this.jdbcTemplate.queryForObject("SELECT ORGAN_NAME  FROM SYS_ORGAN WHERE ID=?",new Object[]{id},String.class);
        data.put("ORGAN_NAME",name);
        return  data;
    }

    @Override
    public void setXqmc(FkapRwd rwd){
      String mc= this.jdbcTemplate.queryForObject(" SELECT XQMC FROM T_AREA_XQB WHERE ID=? AND SFYX_ST='1'",new Object[]{rwd.getXqid()},String.class);
      rwd.setXqmc(mc);
    }
    @Override
    public  void getZfxqmc(FkapRwd rwd){
        String mc= this.jdbcTemplate.queryForObject("  SELECT MC FROM T_AREA_ZFQY WHERE ID=? AND SFYX_ST='1'",new Object[]{rwd.getZfqy()},String.class);
        rwd.setZfxqmc(mc);
    }
    @Override
    public void setZfsd(FkapRwd rwd){
        String sql="SELECT wm_concat( TO_CHAR(ZFKSSJ,'HH24:mi')||'--'||TO_CHAR(ZFJSSJ,'HH24:mi') )FROM  T_AREA_ZFSJ E WHERE E.ZFID  = ? AND E.SFYX_ST='1'";
        String sj= this.jdbcTemplate.queryForObject(sql,new Object[]{rwd.getZfqy()},String.class);
        String[] split = sj.split(",");
        String str="";
        for (int i = 0; i <split.length ; i++) {
            str+= "<a> "+split[i]+"</a> ";
        }
        rwd.setZfsd(str);
    }
    @Override
    public void setSbs(FkapRwd rwd){
        List<Map> sbs=new ArrayList<>();
        Long id= rwd.getId();
        List<Long> list = this.jdbcTemplate.queryForList("SELECT SBID   FROM T_FKAP_SB_GLB t WHERE FKID  = ?", new Object[]{id}, Long.class);
        for(Long L:list){
            String sql="SELECT D.DEVICE_NAME ," +
                    "(SELECT (VALUE)  FROM sys_subdict  WHERE  dict_id=(SELECT  ID  FROM sys_dict   WHERE dict_code ='EQUIPMENTPARENT' AND sfyx_st='1') AND CODE= D.EQUIPMENT_PARENT) EQUIPMENT_PARENT ," +
                    "(SELECT (VALUE)  FROM sys_subdict  WHERE  dict_id=(SELECT  ID  FROM sys_dict   WHERE dict_code ='EQUIPMENTCHILD' AND sfyx_st='1') AND CODE= D.EQUIPMENT_CHILD)  EQUIPMENT_CHILD ," +
                    "(SELECT (VALUE)  FROM sys_subdict  WHERE  dict_id=(SELECT  ID  FROM sys_dict   WHERE dict_code ='SBZSQK' AND sfyx_st='1') AND CODE=T.SBZXZT ) SBZXZT ," +
                    "(SELECT (VALUE)  FROM sys_subdict  WHERE  dict_id=(SELECT  ID  FROM sys_dict   WHERE dict_code ='CZSPQK' AND sfyx_st='1') AND CODE=T.CZSHZT ) CZSHZT  " +
                    "FROM T_DEVICE_INFOMATION D INNER JOIN T_FKAP_SB_GLB  T ON D.ID =T.SBID   INNER JOIN T_FKAP_RWD E ON  E.ID =T.FKID   WHERE D.SFYX_ST='1' AND T.SFYX_ST ='1' AND  D.ID =? AND E.ID=?";
            Map map= this.jdbcTemplate.queryForMap(sql,new Object[]{L,id});
            sbs.add(map);
        }
        rwd.setSb(sbs);
    }

}