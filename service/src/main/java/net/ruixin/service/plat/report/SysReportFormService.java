
package net.ruixin.service.plat.report;
import net.ruixin.domain.plat.report.SysReportSetting;
import net.ruixin.enumerate.plat.SfyxSt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import net.ruixin.service.plat.common.BaseService;
import net.ruixin.util.paginate.FastPagination;

import java.util.HashMap;
import java.util.Map;
import net.ruixin.domain.plat.report.SysReportForm;

import net.ruixin.dao.plat.report.ISysReportFormDao;   

/**
 * 报表Service实现
 *
 * @author rxCoder on 2018-8-21 14:03:06
 */
@Service
public class SysReportFormService extends BaseService implements ISysReportFormService {
    @Autowired
    private ISysReportFormDao sysReportFormDao;
    @Override
    public FastPagination getSysReportFormListPage(Map map) {
        return sysReportFormDao.getSysReportFormListPage(map);
    }
    @Override
    public void saveSysReportForm(SysReportForm sysReportForm) {
        for(SysReportSetting setting : sysReportForm.getSettingList()){
            setting.setSfyxSt(SfyxSt.UNVALID);
        }
        for (Map.Entry entry : sysReportForm.getSettings().entrySet()) {
            SysReportSetting setting = new SysReportSetting();
            setting.setCode(entry.getKey().toString());
            setting.setName(entry.getKey().toString());
            if(null != entry.getValue()){
                setting.setValue(entry.getValue().toString());
            }else{
                setting.setValue("");
            }
            setting.setSfyxSt(SfyxSt.VALID);
            sysReportForm.getSettingList().add(setting);
        }
        save(sysReportForm);
    }
    @Override
    public void deleteCascade(Long id) throws NoSuchFieldException, IllegalAccessException {
        sysReportFormDao.deleteCascade(id);
    }
    @Override
    public SysReportForm getReportForm(Long id){
        SysReportForm form = get(SysReportForm.class, id);
        Map settings = new HashMap();
        for(SysReportSetting setting : form.getSettingList()){
            settings.put(setting.getCode(), setting.getValue());
        }
        form.setSettings(settings);
        return form;
    }

}