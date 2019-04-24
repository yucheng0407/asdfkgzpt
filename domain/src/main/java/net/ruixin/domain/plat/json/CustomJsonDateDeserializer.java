package net.ruixin.domain.plat.json;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class CustomJsonDateDeserializer extends JsonDeserializer<Date> {
    @Override
    public Date deserialize(JsonParser p, DeserializationContext ctxt) throws IOException {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String date = p.getText();
        try {
            if (date != null && !"".equals(date)) {
                return format.parse(date);
            } else {
                return null;
            }

        } catch (Exception e) {
            throw new RuntimeException("日期格式转换异常", e);
        }
    }
}
