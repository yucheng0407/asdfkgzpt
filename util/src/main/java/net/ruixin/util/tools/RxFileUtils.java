package net.ruixin.util.tools;

import com.fasterxml.jackson.databind.ObjectMapper;
import net.ruixin.domain.constant.AttachmentConst;
import net.ruixin.util.cache.Cache;
import net.ruixin.util.cache.CacheKit;
import org.apache.commons.fileupload.disk.DiskFileItem;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import java.io.*;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;


/**
 * 文件工具类
 */
public class RxFileUtils {
    private static final Logger logger = LoggerFactory.getLogger(RxFileUtils.class);

    private static final Logger LOGGER = LoggerFactory.getLogger(RxFileUtils.class);

    /**
     * 根据文件扩展名获取文件类型
     *
     * @param extension 扩展名
     * @return fileType
     */
    public static String getFileType(String extension) {
        String fileType;
        String docExtStr = CacheKit.get(Cache.CONFIG, "docExt");
        String[] docExtArr = docExtStr.split(",");
        String imgExtStr = CacheKit.get(Cache.CONFIG, "imgExt");
        String[] imgExtArr = imgExtStr.split(",");
        if (Arrays.asList(docExtArr).contains(extension.toLowerCase())) {
            fileType = AttachmentConst.DOC;  //文档
        } else if (Arrays.asList(imgExtArr).contains(extension.toLowerCase())) {
            fileType = AttachmentConst.PIC;  //图片
        } else {
            fileType = AttachmentConst.OTHER;  //其他
        }
        return fileType;
    }

    /**
     * MultipartFile转换为File
     *
     * @param multipartFile 文件
     * @return File文件
     */
    public static File changToFile(MultipartFile multipartFile) {
        CommonsMultipartFile cmf = (CommonsMultipartFile) multipartFile;
        DiskFileItem fi = (DiskFileItem) cmf.getFileItem();
        return fi.getStoreLocation();
    }

    /**
     * 读取文件内容到字符串
     *
     * @param file 文件
     * @return 文件内容字符串
     */
    public static String readFileToString(File file) {
        StringBuilder sb = new StringBuilder();
        try (InputStream is = new FileInputStream(file);
             BufferedReader reader = new BufferedReader(new InputStreamReader(is, "utf-8"))) {
            String line;
            while ((line = reader.readLine()) != null) {
                sb.append(line);
                sb.append("\n");
            }
        } catch (Exception e) {
            LOGGER.error("读取文件内容到字符串异常" + file.getName(), e);
        }
        return sb.toString();
    }

    /**
     * 判断是否超期
     *
     * @param c1 Calendar对象
     * @return boolean
     */
    public boolean isExpire(Calendar c1) {
        Calendar now = Calendar.getInstance();
        now.setTime(new Date());
        return c1.compareTo(now) < 0;
    }

    /**
     * 将data数据写入文件
     *
     * @param f    文件
     * @param data 数据
     */
    public static void createFile(File f, Object data) {
        Calendar expires = Calendar.getInstance();
        expires.add(Calendar.DATE, 7);  //设置过期时间为7天
        String str = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(expires.getTime());
        String exp = "{ \"expires\":\"" + str + "\" ,";
        String content = exp + "\"data\":";
        if (data != null) {
            try {
                //将查询结果转为字符串
                content += new ObjectMapper().writeValueAsString(data) + "}";
            } catch (IOException e) {
                content += "null }";
            }
            File pf = f.getParentFile();
            if (!pf.exists()) {
                if (!pf.mkdirs()) {
                    throw new RuntimeException("生成缓存文件失败:" + f.getName());
                }
            }
            writeFile(f, content);//字符串写入到文件中
        }
    }

    /**
     * 将查询结果写入文件
     *
     * @param file    文件
     * @param content 内容
     */
    private static void writeFile(File file, String content) {
        FileOutputStream fos = null;
        OutputStreamWriter osw = null;
        try {
            fos = new FileOutputStream(file);
            osw = new OutputStreamWriter(fos, "utf-8");
            osw.write(content);
            osw.flush();
        } catch (IOException e) {
            LOGGER.error("写文件异常" + file.getName(), e);
        } finally {
            IOUtils.close(osw, fos);
        }
    }

    public static void writeFile(String fileName, String content) {
        writeFile(fileName, content, "UTF-8");
    }

    public static void writeFile(String fileName, String content, String charset) {
        BufferedWriter out = null;
        try {
            createFolder(fileName, true);
            out = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(fileName), charset));
            out.write(content);
        } catch (IOException ioe) {
            logger.error("write file failed {}.", ioe.getMessage());
        } finally {
            try {
                if (out != null) {
                    out.close();
                }
            } catch (IOException ioe) {
                logger.error("write file failed {}.", ioe.getMessage());
            }

        }

    }

    public static void createFolder(String path, boolean isFile) {
        if (isFile) {
            path = path.substring(0, path.lastIndexOf(File.separator));
        }

        File file = new File(path);
        if (!file.exists()) {
            file.mkdirs();
        }

    }

    /**
     * 删除单个文件
     *
     * @param filePath 待删除文件路径
     */
    public static void deleteFile(String filePath) {
        File file = new File(filePath);
        deleteFile(file);
    }

    /**
     * 删除单个文件
     *
     * @param file 待删除文件
     */
    public static void deleteFile(File file) {
        if (file.exists() && file.isFile()) {
            if (!file.delete()) {
                throw new RuntimeException("文件删除失败");
            }
        }
    }

    /*
     * 判断pdf文件是否存在
     *
     * @param id      附件id
     * @param ext     扩展名
     * @param request r
     * @return true/false
     */
    /* 暂时保留2016-12-9
    public static boolean isPdfExist(Integer id, String ext, HttpServletRequest request) {
        if (ext.toLowerCase().equals("pdf")) {
            return true;
        } else {
            String filePath = request.getSession().getServletContext().getRealPath("") + "/medias/pdf";
            File pdfFile = new File(filePath + "/pdf" + id + ".pdf");
            return pdfFile.exists();
        }
    }*/
    /* 暂时保留2016-12-9
    public static String fileToPdf(File f, Integer id, String ext, HttpServletRequest request) throws IOException {
        String thAbsolutePath = "";
        String filePath = request.getSession().getServletContext().getRealPath("") + "/medias/pdf";
        File file = new File(filePath);
        if (!file.exists()) {  //目录不存在则创建
            if (!file.mkdirs()) {
                throw new RuntimeException("目录创建失败");
            }
        }
        String fileUrlPath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath() + "/medias/pdf";
        String absolutePath = fileUrlPath + "/" + "pdf" + id + ".pdf";
        ext = ext.toLowerCase();
        switch (ext) {
            case "doc":
            case "docx":
            case "txt":
                OfficeToPdf.wordToPDF(f.getAbsolutePath(), filePath + "\\" + "pdf" + id + ".pdf");
                thAbsolutePath = absolutePath;
                break;
            case "xls":
            case "xlsx":
                OfficeToPdf.excelToPDF(f.getAbsolutePath(), filePath + "\\" + "pdf" + id + ".pdf");
                thAbsolutePath = absolutePath;
                break;
            case "ppt":
            case "pptx":
                OfficeToPdf.pptToPDF(f.getAbsolutePath(), filePath + "\\" + "pdf" + id + ".pdf");
                thAbsolutePath = absolutePath;
                break;
        }
        return thAbsolutePath;
    }
    */

    public static String readFileForHtmlStr(String fileName) {
        StringBuilder fileContent = new StringBuilder();
        File f = new File(fileName);
        if (f.isFile() && f.exists()) {
            try (BufferedReader reader = new BufferedReader(new InputStreamReader(
                    new FileInputStream(f), "utf-8"));) {
                String line;
                while ((line = reader.readLine()) != null) {
                    fileContent.append(line).append("\n");
                }
            } catch (Exception e) {
                LOGGER.error("读取文件内容到字符串异常" + fileName, e);
            }
        }
        return fileContent.toString();
    }
}
