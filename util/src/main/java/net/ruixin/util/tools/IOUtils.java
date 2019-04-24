package net.ruixin.util.tools;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.Closeable;
import java.io.IOException;

public class IOUtils {

    private static final Logger LOGGER = LoggerFactory.getLogger(IOUtils.class);

    /**
     * 关闭流
     */
    public static void close(Closeable... opens) {
        try {
            for (Closeable open : opens) {
                if (open != null) {
                    open.close();
                }
            }
        } catch (IOException e) {
            LOGGER.error("流关闭异常", e);
        }
    }
}
