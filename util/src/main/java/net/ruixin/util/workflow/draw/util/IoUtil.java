package net.ruixin.util.workflow.draw.util;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URL;

import net.ruixin.util.workflow.draw.engine.ActivitiException;

public class IoUtil {

    public static byte[] readInputStream(InputStream inputStream, String inputStreamName) {
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        byte[] buffer = new byte[16384];

        try {
            for(int bytesRead = inputStream.read(buffer); bytesRead != -1; bytesRead = inputStream.read(buffer)) {
                outputStream.write(buffer, 0, bytesRead);
            }
        } catch (Exception var5) {
            throw new ActivitiException("couldn't read input stream " + inputStreamName, var5);
        }

        return outputStream.toByteArray();
    }

    public static String readFileAsString(String filePath) {
        byte[] buffer = new byte[(int)getFile(filePath).length()];
        BufferedInputStream inputStream = null;

        try {
            inputStream = new BufferedInputStream(new FileInputStream(getFile(filePath)));
            inputStream.read(buffer);
        } catch (Exception var7) {
            throw new ActivitiException("Couldn't read file " + filePath + ": " + var7.getMessage());
        } finally {
            closeSilently((InputStream)inputStream);
        }

        return new String(buffer);
    }

    public static File getFile(String filePath) {
        URL url = IoUtil.class.getClassLoader().getResource(filePath);

        try {
            return new File(url.toURI());
        } catch (Exception var3) {
            throw new ActivitiException("Couldn't get file " + filePath + ": " + var3.getMessage());
        }
    }

    public static void writeStringToFile(String content, String filePath) {
        BufferedOutputStream outputStream = null;

        try {
            outputStream = new BufferedOutputStream(new FileOutputStream(getFile(filePath)));
            outputStream.write(content.getBytes());
            outputStream.flush();
        } catch (Exception var7) {
            throw new ActivitiException("Couldn't write file " + filePath, var7);
        } finally {
            closeSilently((OutputStream)outputStream);
        }

    }

    public static void closeSilently(InputStream inputStream) {
        try {
            if (inputStream != null) {
                inputStream.close();
            }
        } catch (IOException var2) {
            ;
        }

    }

    public static void closeSilently(OutputStream outputStream) {
        try {
            if (outputStream != null) {
                outputStream.close();
            }
        } catch (IOException var2) {
            ;
        }

    }
}
