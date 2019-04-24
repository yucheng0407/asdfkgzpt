package net.ruixin.service.plat.demo;


import net.ruixin.dao.plat.demo.DemoOrganDao;
import net.ruixin.domain.plat.demo.DemoOrgan;
import net.ruixin.service.plat.common.BaseService;
import net.ruixin.util.paginate.FastPagination;
import net.ruixin.util.tools.ExcelImportUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

/**
 * Created by pitcher on 2017/8/21.
 */
@Service
public class DemoOrganService extends BaseService implements IDemoOrganService {
    @Autowired
    private DemoOrganDao demoOrganDao;

    @Override
    public FastPagination getDemoOrganList(Map map) {
        return demoOrganDao.getDemoOrganList(map);
    }

    @Override
    public void saveDemoOrgan(DemoOrgan demoOrgan) {
        save(demoOrgan);
    }

    @Override
    public List<Map<String, Object>> excelOrgan(MultipartFile file, String[] fields) throws IOException {
        List<Map<String, Object>> resultList = ExcelImportUtil.excelImport(file, fields);
        for (Map<String, Object> map : resultList) {
            //性别的转换
            if ("男".equals(map.get("SEX"))) {
                map.put("SEX", "0");
            } else if ("女".equals(map.get("SEX"))) {
                map.put("SEX", "1");
            }
            //机构的转换
            Integer uId = demoOrganDao.getIdByDemoUserName(map.get("ORGAN").toString());
            map.put("ORGAN", uId);
            //出生日期的转换
        }
        demoOrganDao.addExcelData(resultList);
        return resultList;
    }
}
