package net.ruixin.service.plat.report;

import net.ruixin.dao.plat.report.IReportDao;
import net.ruixin.domain.plat.report.SysMetaData;
import net.ruixin.domain.plat.report.SysReportForm;
import net.ruixin.domain.plat.report.SysReportProperty;
import net.ruixin.enumerate.plat.SfyxSt;
import net.ruixin.service.plat.common.BaseService;
import net.ruixin.util.json.JacksonUtil;
import net.ruixin.util.tools.RxStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.regex.Pattern;

/**
 * @author Pitcher
 */
@Service
public class ReportService extends BaseService implements IReportService {
    @Autowired
    private IReportDao reportDao;
    @Autowired
    private ISysReportFormService sysReportFormService;

    @Override
    public List<Map<String,Object>> getReportFormData() {
        return reportDao.getReportFormData();
    }

    @Override
    public Map<String,Object> getFormPreviewData(String json) {
        SysReportForm form = JacksonUtil.readValue(json, SysReportForm.class);
        return getFormData(form);
    }

    @Override
    public Map<String,Object> getFormPreviewData(Long id) {
        SysReportForm form = sysReportFormService.getReportForm(id);
        return getFormData(form);
    }

    private static final Pattern patternIsInteger = Pattern.compile("^[-\\+]?[\\d]*$");

    @Override
    public Map<String,Object> getFormData(SysReportForm form){
        SysMetaData metadata = get(SysMetaData.class, form.getMetadataId());
        Map result = new HashMap();
        result.put("type", form.getType());
        result.put("settings", form.getSettings());

        List<SysReportProperty> groupProList = new ArrayList<>();
        List<SysReportProperty> infoProList = new ArrayList<>();
        for(SysReportProperty pro: form.getPropertyList()){
            if(!SfyxSt.UNVALID.equals(pro.getSfyxSt())){
                if("1".equals(pro.getType())){
                    groupProList.add(pro);
                }else{
                    infoProList.add(pro);
                }
            }
        }

        //sql加工与数据获取
        StringBuilder sql = new StringBuilder();
        List params = new ArrayList();
        //构建基础sql-bs
        sql.append("select * from ").append(metadata.getDetail());
        //加工条件绑定sql-cs
        sql.insert(0, " select bs.* from (");
        sql.append(") bs");
        //加工格式转换sql-fs
        sql.insert(0, " select cs.* from (");
        sql.append(") cs");
        //加工分组运算sql-gs
        if(groupProList.size() > 0){
            sql.insert(0, " from (");
            for(SysReportProperty pro: infoProList){
                String word = ", ";
                switch (pro.getCalculateType()){
                    case "1":
                        word += "count(fs."+pro.getMetadataColumn()+") "+pro.getCode();
                        break;
                    case "2":
                        word += "sum(fs."+pro.getMetadataColumn()+") "+pro.getCode();
                        break;
                    case "3":
                        word += "round(avg(fs."+pro.getMetadataColumn()+"),2) "+pro.getCode();
                        break;
                    case "4":
                        word += "max(fs."+pro.getMetadataColumn()+") "+pro.getCode();
                        break;
                    case "5":
                        word += "min(fs."+pro.getMetadataColumn()+") "+pro.getCode();
                        break;
                    case "6":
                        word += "median(fs."+pro.getMetadataColumn()+") "+pro.getCode();
                        break;
                    default:
                        word += "fs."+pro.getMetadataColumn()+" "+pro.getCode();
                }
                sql.insert(0, word);
            }
            sql.insert(0," fs."+ groupProList.get(0).getMetadataColumn() + " " + groupProList.get(0).getCode());
            sql.insert(0, " select ");
            sql.append(") fs");
            sql.append(" group by fs.").append(groupProList.get(0).getMetadataColumn());
        }else{
            sql.insert(0, " from (");
            for(int i=0; i <infoProList.size(); i++){
                SysReportProperty pro = infoProList.get(i);
                sql.insert(0, " fs."+pro.getMetadataColumn() + " " + pro.getCode());
                if(i != infoProList.size() - 1){
                    sql.insert(0, ",");
                }
            }
            sql.insert(0, " select ");
            sql.append(") fs");
        }
        //加工排序sql-os
        sql.insert(0, " select gs.* from (");
        sql.append(") gs");
        List<SysReportProperty> orderList = new ArrayList<>();
        for(SysReportProperty pro: form.getPropertyList()){
            if(!SfyxSt.UNVALID.equals(pro.getSfyxSt())){
                if("1".equals(pro.getOrderType()) || "2".equals(pro.getOrderType())){
                    orderList.add(pro);
                }
            }
        }
        //展示最大条目
        if(RxStringUtils.isNotEmpty(form.getSettings().get("rownum")) && !"0".equals(form.getSettings().get("rownum"))
                && patternIsInteger.matcher(form.getSettings().get("rownum").toString()).matches()){
            //只展示200条
            sql.append(" where rownum <= ").append(form.getSettings().get("rownum"));
        }
        if(orderList.size() > 0){
            sql.append(" order by ");
            for(int i = 0; i < orderList.size(); i++){
                sql.append(" gs." + orderList.get(i).getCode());
                if("1".equals(orderList.get(i).getOrderType())){
                    sql.append(" asc");
                }else{
                    sql.append(" desc");
                }
                if(i != orderList.size() - 1){
                    sql.append(",");
                }
            }
        }
        result.put("rows",reportDao.getFormData(sql.toString(), params));

        //列表column获取
        if("1".equals(form.getType())){
            List<Map> columns = new ArrayList<>();
            for(SysReportProperty pro: groupProList){
                Map map = new HashMap();
                map.put("id", pro.getMetadataColumn());
                if(RxStringUtils.isNotEmpty(pro.getName())){
                    map.put("title", pro.getName());
                }else{
                    map.put("title", pro.getCode());
                }
                columns.add(map);
            }
            for(SysReportProperty pro: infoProList){
                Map map = new HashMap();
                map.put("id", pro.getCode());
                if(RxStringUtils.isNotEmpty(pro.getName())){
                    map.put("title", pro.getName());
                }else{
                    map.put("title", pro.getCode());
                }
                columns.add(map);
            }
            result.put("columns", columns);
        } else {
            if(groupProList.size() > 0){
                SysReportProperty pro = groupProList.get(0);
                Map xPro = new HashMap();
                xPro.put("id", pro.getCode());
                if(RxStringUtils.isNotEmpty(pro.getName())){
                    xPro.put("title", pro.getName());
                }else{
                    xPro.put("title", pro.getCode());
                }
                result.put("xPro",xPro);
            }

            List yPros = new ArrayList();
            for(SysReportProperty pro : infoProList){
                Map yPro = new HashMap();
                yPro.put("id", pro.getCode());
                if(RxStringUtils.isNotEmpty(pro.getName())){
                    yPro.put("title", pro.getName());
                }else{
                    yPro.put("title", pro.getCode());
                }
                yPros.add(yPro);
            }
            result.put("yPros",yPros);
        }

        return result;
    }

}
