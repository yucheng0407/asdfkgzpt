package net.ruixin.util.mapUtil;

import net.ruixin.util.json.JacksonMapper;
import net.ruixin.util.tools.RxStringUtils;
import org.springframework.core.MethodParameter;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import java.util.List;
import java.util.Map;

public class GeometryJsonResolver implements HandlerMethodArgumentResolver {
    @Override
    public boolean supportsParameter(MethodParameter methodParameter) {
        return methodParameter.hasParameterAnnotation(GeometryJsonModel.class);
    }

    @Override
    @SuppressWarnings({"unchecked", "Duplicates"})
    public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer, NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {
        String searchParam = webRequest.getParameter(parameter.getParameterName());
        List<Map> params = null;
        if (RxStringUtils.isNotEmpty(searchParam)) {
            params = JacksonMapper.getInstance().readValue(searchParam, List.class);
            for (int i = 0; i < params.size(); i++) {
                Map map = params.get(i);
                if (map.get("name").equals("geometry")) {
                    map.put("value", MapUtil.getJGeometry((Map) map.get("value")));
                }
            }
        }
        return params;
    }
}
