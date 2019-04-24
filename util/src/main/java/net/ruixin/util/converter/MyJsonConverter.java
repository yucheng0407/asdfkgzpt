package net.ruixin.util.converter;

import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;

import java.math.BigDecimal;

public class MyJsonConverter extends MappingJackson2HttpMessageConverter {
    public MyJsonConverter() {
        super.getObjectMapper().configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
        //Zp add 0716: 解决前端同步后台Long型数据精度丢失的问题
        SimpleModule simpleModule = new SimpleModule();
        simpleModule.addSerializer(Long.class,ToStringSerializer.instance);
        simpleModule.addSerializer(Long.TYPE,ToStringSerializer.instance);
        simpleModule.addSerializer(BigDecimal.class,ToStringSerializer.instance);
        objectMapper.registerModule(simpleModule);
    }
}
