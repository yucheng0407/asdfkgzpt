package net.ruixin.aop;

import com.google.common.collect.Maps;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.mvc.condition.PatternsRequestCondition;
import org.springframework.web.servlet.mvc.method.RequestMappingInfo;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;

import java.util.Map;
import java.util.Set;

public class ApplicationContextListener implements ApplicationListener<ContextRefreshedEvent>,ApplicationContextAware {

    private static final Logger LOGGER = LoggerFactory.getLogger(ApplicationContextListener.class);

    public static final Map<String, HandlerMethod> urlMap = Maps.newHashMap();

    private static ApplicationContext applicationContext;

    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {
        if (urlMap.size() == 0) {
            LOGGER.debug("spring初始化完毕,构造全局的url和handler映射集合");
            RequestMappingHandlerMapping bean = event.getApplicationContext().getBean(RequestMappingHandlerMapping.class);
            Map<RequestMappingInfo, HandlerMethod> handlerMethods = bean.getHandlerMethods();
            RequestMappingInfo key = null;
            for (Map.Entry<RequestMappingInfo, HandlerMethod> entry : handlerMethods.entrySet()) {
                PatternsRequestCondition prc = entry.getKey().getPatternsCondition();
                Set<String> patterns = prc.getPatterns();
                for (String url : patterns) {
                    urlMap.put(url, entry.getValue());
                }
            }
        }
    }
    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        ApplicationContextListener.applicationContext = applicationContext;
    }

    public static <T> T getBean(String beanName) {
        return (T) applicationContext.getBean(beanName);
    }

    public static <T> T getBean(Class<T> requiredType) {
        return applicationContext.getBean(requiredType);
    }
}
