package net.ruixin.util.file;

import net.ruixin.util.exception.BizExceptionEnum;
import net.ruixin.util.exception.BussinessException;
import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.*;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.nio.ByteBuffer;
import java.nio.channels.FileChannel;
import java.text.SimpleDateFormat;
import java.util.Date;


public class FileUtil {

    private static final Logger log = LoggerFactory.getLogger(FileUtil.class);

    /**
     * NIO way
     */
    public static byte[] toByteArray(String filename) {
        File f = new File(filename);
        if (!f.exists()) {
            log.error("文件未找到！" + filename);
            throw new BussinessException(BizExceptionEnum.FILE_NOT_FOUND, filename);
        }
        try (FileInputStream fs = new FileInputStream(f);
             FileChannel channel = fs.getChannel()) {
            ByteBuffer byteBuffer = ByteBuffer.allocate((int) channel.size());
            while ((channel.read(byteBuffer)) > 0) {
            }
            return byteBuffer.array();
        } catch (IOException e) {
            throw new BussinessException(BizExceptionEnum.FILE_READING_ERROR, filename);
        }
    }

    /**
     * 获取附件扩展名
     *
     * @param name 附件名称
     * @return
     */
    public static String getFileExtension(String name) {
        return name.substring(name.lastIndexOf(".")+1);
    }

    /**
     * 附件删除
     *
     * @param path 附件路径
     */
    public static void deleteFile(String path) {
        if (StringUtils.isNotEmpty(path)) {
            File file = new File(path);
            if (file.exists()) {
                file.delete();
            }
        }
    }

    /**
     * 附件上传
     *
     * @param file    上传附件
     * @param root    根目录
     */
    public static String uploadFile(CommonsMultipartFile file, String root) throws IOException {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
        Date date =new Date();
        String rootPath = root + sdf.format(date) + "/";
        File dictionary = new File(rootPath);
        if (!dictionary.exists()) {
            dictionary.mkdirs();
        }
        String fullName = file.getOriginalFilename();
        String name = fullName.substring(0,fullName.lastIndexOf("."));
        String exten = getFileExtension(fullName);
        String path = rootPath + name + date.getTime() + "." + exten;
        File ffile = new File(path);
        FileUtils.copyInputStreamToFile(file.getInputStream(), ffile);
        return path;
    }

    /**
     * 附件下载
     *
     * @param path     附件路径
     * @param name     附件名称
     * @param response 响应对象
     */
    public static void downloadFile(String path, String name, HttpServletRequest request, HttpServletResponse response) {
        BufferedInputStream in = null;
        BufferedOutputStream out = null;
        try {
            //设置响应对象参数
            response.reset();
            response.setHeader("Pragma", "public");
            response.setHeader("Cache-Control", "must-revalidate, post-check=0, pre-check=0");
            response.setCharacterEncoding("UTF-8");
            response.setContentType("application/octet-stream");
            String fileName;
            //解决下载文件名乱码的问题
            if (request.getHeader("User-Agent").toUpperCase().indexOf("MSIE") > 0) {//ie
                fileName = URLEncoder.encode(name, "UTF-8");
            } else {//chrome、Firefox等
                fileName = new String(name.getBytes("UTF-8"), "ISO8859-1");
            }
            response.setHeader("Content-Disposition", "attachment;filename=" + "\"" + fileName + "\"");
            //附件数据读取
            int len = 0;
            byte[] bytes = new byte[1024];
            in = new BufferedInputStream(new FileInputStream(URLDecoder.decode(path, "UTF8")));
            out = new BufferedOutputStream(response.getOutputStream());
            while ((len = in.read(bytes)) > 0) {
                out.write(bytes, 0, len);
            }
            out.flush();
        } catch(FileNotFoundException e){
            throw new BussinessException(BizExceptionEnum.FILE_NOT_FOUND);
        } catch (IOException e) {
            throw new BussinessException(BizExceptionEnum.FILE_DOWNLOAD_ERROR);
        } finally {
            try {
                if (in != null) {
                    in.close();
                }
                if (out != null) {
                    out.close();
                }
            } catch (Exception e) {
                log.error(BizExceptionEnum.FILE_CLOSE_ERROR.getFriendlyMsg(),e);
            }
        }
    }

    //获取文件byte[]数据
    public static byte[] getFileData(String path) throws IOException{
        File file = new File(path);
        byte[] data;
        if (file.exists() && file.isFile()) {
            data = FileUtils.readFileToByteArray(file);
        }else{
            throw new BussinessException(BizExceptionEnum.FILE_NOT_FOUND,path);
        }
        return data;
    }

    /**
     * 根据宽度、高度获取BufferedImage
     *
     * @param w     宽度
     * @param h     高度
     * @param force 是否强制按照宽高生成缩略图(如果为false，则生成最佳比例缩略图)
     * @param img   BufferedImage
     * @return BufferedImage
     */
    public static BufferedImage getBufferedImage(int w, int h, boolean force, BufferedImage img) {
        if (!force) {
            int width = img.getWidth();
            int height = img.getHeight();
            if ((width * 1.0) / w < (height * 1.0) / h) {
                if (width > w) {
                    h = Integer.parseInt(new java.text.DecimalFormat("0").format(height * w / (width * 1.0)));
                }
            } else {
                if (height > h) {
                    w = Integer.parseInt(new java.text.DecimalFormat("0").format(width * h / (height * 1.0)));
                }
            }
        }
        BufferedImage bi = new BufferedImage(w, h, BufferedImage.TYPE_INT_RGB);
        Graphics g = bi.getGraphics();
        g.drawImage(img, 0, 0, w, h, Color.LIGHT_GRAY, null);
        g.dispose();
        return bi;
    }

    /**
     * byte数组转file
     * @param byteData byte数组数据
     * @param path 路径
     * @param name 文件名
     * @return 转换后的File对象
     */
    public static String byte2File(byte[] byteData, String path, String name) {
        BufferedOutputStream bos = null;
        FileOutputStream fos = null;
        File file;
        File dir = new File(path);
        if(!(dir.exists()&&dir.isDirectory())){//判断文件目录是否存在
            dir.mkdirs();
        }
        file = new File(path + "/" + name);
        try {
            fos = new FileOutputStream(file);
            bos = new BufferedOutputStream(fos);
            bos.write(byteData);
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (bos != null) {
                try {
                    bos.close();
                } catch (IOException e1) {
                    e1.printStackTrace();
                }
            }
            if (fos != null) {
                try {
                    fos.close();
                } catch (IOException e1) {
                    e1.printStackTrace();
                }
            }
        }
        return path + "/" + name;
    }
}