package net.ruixin.domain.plat.json;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.IOException;
import java.lang.reflect.Field;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * @Author: mxding
 * @Date: 2018-07-06 20:06
 * 可根据@DateTimeFormat配置的日期格式的反序列化日期格式字段
 * 对于Json字符串日期格式如yyyy-MM-dd HH:mm可配置字段注解@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")
 */
public class CustomJsonDateDeserializer2 extends JsonDeserializer<Date> {
    // 默认日期格式 若没有设置@DateTimeFormat则按默认
    private static final String defaultFormat = "yyyy-MM-dd HH:mm:ss";

    @Override
    public Date deserialize(JsonParser p, DeserializationContext context) {
        try {
            Class parseClass = p.getParsingContext().getCurrentValue().getClass();
            Field parseField = parseClass.getDeclaredField(p.getParsingContext().getCurrentName());
            String dateFormat = defaultFormat;
            DateTimeFormat annotation = parseField.getAnnotation(DateTimeFormat.class);
            if (annotation != null) {
                String pattern = annotation.pattern();
                if (pattern != null && pattern.trim().length() > 0) {
                    dateFormat = pattern;
                }
            }
            SimpleDateFormat format = new SimpleDateFormat(dateFormat);
            String date = p.getText();
            if (date != null && date.trim().length() > 0) {
                return format.parse(date);
            } else {
                return null;
            }
        } catch (NoSuchFieldException e) {
            throw new RuntimeException("字段" + p.getParsingContext().getCurrentName() + "不存在", e);
        } catch (Exception e) {
            throw new RuntimeException("日期格式转换异常", e);
        }
    }
}


