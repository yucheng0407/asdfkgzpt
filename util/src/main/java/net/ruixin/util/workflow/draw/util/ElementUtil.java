package net.ruixin.util.workflow.draw.util;

import org.dom4j.Element;

public class ElementUtil {
    public static Boolean getBoolean(Element element, String name, Boolean defaultValue) {
        String val = element.attributeValue(name);
        if (val != null) {
            return "true".equalsIgnoreCase(val);
        }
        return defaultValue;
    }

    public static Boolean getBoolean(Element element, String name) {
        return getBoolean(element, name, null);
    }

    public static Float getFloat(Element element, String name) {
        return getFloat(element, name, 0.0F);
    }

    public static Float getFloat(Element element, String name, Float defaultValue) {
        String val = element.attributeValue(name);
        return val != null ? Float.parseFloat(val) : defaultValue;
    }

    public static Double getDouble(Element element, String name) {
        return getDouble(element, name, 0.0D);
    }

    public static Double getDouble(Element element, String name, Double defaultValue) {
        String val = element.attributeValue(name);
        return val != null ? Double.parseDouble(val) : defaultValue;
    }
}

