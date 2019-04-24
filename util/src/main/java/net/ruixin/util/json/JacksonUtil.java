package net.ruixin.util.json;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import net.ruixin.util.tools.RxStringUtils;

import java.io.IOException;

/**
 * JSON工具类
 */
public class JacksonUtil {
    public static JsonNode getJsonNode(String json) {
        try {
            return JacksonMapper.getInstance().readTree(json);
        } catch (IOException e) {
            throw new RuntimeException("JSON数据解析错误：" + json);
        }
    }

    public static String toJson(Object o) {
        try {
            return JacksonMapper.getInstance().writeValueAsString(o);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("对象转JSON错误：" + o.toString());
        }
    }

    public static <T> T readValue(String jsonStr, Class<T> valueType) {
        try {
            ObjectMapper mapper = JacksonMapper.getInstance();
            mapper.configure(JsonParser.Feature.ALLOW_UNQUOTED_CONTROL_CHARS, true);
            mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
            return mapper.readValue(jsonStr, valueType);
        } catch (Exception e) {
            throw new RuntimeException("JSON转对象错误：" + jsonStr);
        }
    }

    public static <T> T readValue(String jsonStr, TypeReference<T> valueTypeRef) {
        try {
            return JacksonMapper.getInstance().readValue(jsonStr, valueTypeRef);
        } catch (Exception e) {
            throw new RuntimeException("JSON数组转List错误：" + jsonStr);
        }
    }

    public static boolean isNotEmptyFieldValue(JsonNode node, String fieldName) {
        return node.has(fieldName) && !node.get(fieldName).isNull();
    }

    public static boolean isNotEmptyFieldStringValue(JsonNode node, String fieldName) {
        return isNotEmptyFieldValue(node, fieldName) && RxStringUtils.isNotEmpty(node.get(fieldName).asText());
    }

    public static String getFieldStringValue(JsonNode node, String fieldName) {
        if (isNotEmptyFieldValue(node, fieldName)) {
            String fieldValue = node.get(fieldName).asText();
            if (RxStringUtils.isNotEmpty(fieldValue)) {
                return fieldValue;
            }
        }
        return null;
    }

    public static Long getFieldLongValue(JsonNode node, String fieldName) {
        if (isNotEmptyFieldStringValue(node, fieldName)) {
            return node.get(fieldName).asLong();
        }
        return null;
    }

    public static Integer getFieldIntValue(JsonNode node, String fieldName) {
        if (isNotEmptyFieldStringValue(node, fieldName)) {
            return node.get(fieldName).asInt();
        }
        return null;
    }

    public static boolean getFieldBoolValue(JsonNode node, String fieldName) {
        if (isNotEmptyFieldStringValue(node, fieldName)) {
            return node.get(fieldName).asBoolean();
        }
        return false;
    }
}
