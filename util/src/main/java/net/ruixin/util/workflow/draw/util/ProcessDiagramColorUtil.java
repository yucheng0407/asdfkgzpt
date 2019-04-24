package net.ruixin.util.workflow.draw.util;

import com.twelvemonkeys.lang.StringUtil;
import net.ruixin.util.workflow.constant.ProcessDiagram;

import java.awt.*;

public class ProcessDiagramColorUtil {

    public static Color getColor(String key, String defaultValue) {
        String color = getColorString(key, defaultValue);
        return Color.decode(color);
    }

    public static String getColorString(String key, String defaultValue) {
        ProcessDiagram processDiagram=ProcessDiagram.fromKey(key);
        if (processDiagram!=null) {
            return processDiagram.getColor();
        }
        return defaultValue;
    }
}