package net.ruixin.service.plat.workflow.title;

import net.ruixin.util.spring.SpringContextHolder;
import org.springframework.stereotype.Service;

//流程实例标题策略工厂
@Service
public class WfInsTitleStrategyFactory {

    public IWfInsTitleStrategy getWfInsTitleStrategy(String flowCode) {
        if ("QJLC".equals(flowCode)) { //请假流程
            return SpringContextHolder.getBean("qjlcWfInsTitle");
        }
        return null;
    }
}

