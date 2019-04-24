package net.ruixin.util.mapUtil;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.ObjectMapper;
import net.ruixin.util.json.JacksonMapper;
import net.ruixin.util.tools.RxStringUtils;
import oracle.spatial.geometry.JGeometry;
import org.springframework.core.MethodParameter;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import java.util.HashMap;
import java.util.Map;

public class GeometryResolver implements HandlerMethodArgumentResolver {
    @Override
    public boolean supportsParameter(MethodParameter methodParameter) {
        return methodParameter.hasParameterAnnotation(GeometryModel.class);
    }

    @Override
    public JGeometry resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer, NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {
        String param;
        GeometryModel jsonModel = parameter.getParameterAnnotation(GeometryModel.class);
        Map o = new HashMap();
        param = jsonModel.value();
        if ("".equals(param)) {
            param = parameter.getParameterName();
        }
        ObjectMapper mapper = JacksonMapper.getInstance();
        mapper.configure(JsonParser.Feature.ALLOW_UNQUOTED_CONTROL_CHARS, true);
        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        String jsonStr = webRequest.getParameter(param);
        Map domain;
        JGeometry geometry = null;
        if (RxStringUtils.isNotEmpty(jsonStr)) {
            domain = mapper.readValue(jsonStr, o.getClass());
            //ARCGIS转JGeometry
            geometry = MapUtil.getJGeometry(domain);
        }
        return geometry;
    }


    private static JavaType getCollectionType(ObjectMapper mapper, Class<?> collectionClass, Class<?>... elementClasses) {
        return mapper.getTypeFactory().constructParametrizedType(collectionClass, collectionClass, elementClasses);
    }


}
