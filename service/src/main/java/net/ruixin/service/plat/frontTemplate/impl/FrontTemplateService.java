package net.ruixin.service.plat.frontTemplate.impl;

import net.ruixin.service.plat.frontTemplate.IFrontTemplateService;
import net.ruixin.util.tools.RxFileUtils;
import net.ruixin.util.tools.RxStringUtils;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by Administrator on 2016/11/18
 */
@Service
public class FrontTemplateService implements IFrontTemplateService {

    @Override
    public Map<String, Object> getTemplate(String tplPath, String basePath) {
        Map<String, Object> result = new HashMap<>();
        if (RxStringUtils.isNotEmpty(tplPath)) {
            String[] tpls = tplPath.split(",");
            for(String tpl: tpls){
                result.put(tpl, RxFileUtils.readFileToString(new File(basePath+"/WEB-INF/tpl/"+tpl+".html")));
            }
        }
        return result;
    }
}
