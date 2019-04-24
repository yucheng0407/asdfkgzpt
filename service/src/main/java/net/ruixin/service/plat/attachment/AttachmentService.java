package net.ruixin.service.plat.attachment;

import net.coobird.thumbnailator.Thumbnails;
import net.ruixin.dao.plat.attachment.IAttachmentDao;
import net.ruixin.dao.plat.attachment.IAttachmentDataDao;
import net.ruixin.domain.constant.AttachmentConst;
import net.ruixin.domain.plat.attachment.Attachment;
import net.ruixin.domain.plat.attachment.AttachmentData;
import net.ruixin.enumerate.plat.SfyxSt;
import net.ruixin.service.plat.log.LogManager;
import net.ruixin.service.plat.log.factory.LogTaskFactory;
import net.ruixin.util.cache.Cache;
import net.ruixin.util.cache.CacheKit;
import net.ruixin.util.data.FileInfo;
import net.ruixin.util.data.UploadEntity;
import net.ruixin.util.exception.BizExceptionEnum;
import net.ruixin.util.exception.BussinessException;
import net.ruixin.util.exception.UploadException;
import net.ruixin.util.file.FileUtil;
import net.ruixin.util.file.FtpUtils;
import net.ruixin.util.tools.IOUtils;
import net.ruixin.util.tools.RxFileUtils;
import net.ruixin.util.tools.RxStringUtils;
import org.apache.commons.io.FileUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

/**
 * The type Attachment service.
 *
 * @author ly
 */
@Service
public class AttachmentService implements IAttachmentService {

    private static final Logger log = LoggerFactory.getLogger(AttachmentService.class);

    private static final String ZIP_NAME = "temp.zip";

    @Autowired
    private IAttachmentDao attachmentDao;

    @Autowired
    private IAttachmentDataDao attachmentDataDao;

    /**
     * 上传附件（多个）
     */
    @Override
    @Transactional(rollbackFor = Exception.class)
    public String upload(List<MultipartFile> multipartFileList, UploadEntity uploadEntity) {
        StringBuilder ids = new StringBuilder();
        Long tempId;
        try {
            for (MultipartFile mf : multipartFileList) {
                if (0 != mf.getSize()) {
                    tempId = uploadSingle(mf, uploadEntity);
                    ids.append(tempId.toString()).append(",");
                }
            }
            return ids.toString();
        } catch (UploadException e) {
            throw e;
        }
    }

    /**
     * 上传附加（单个）
     */
    @Override
    @Transactional(rollbackFor = Exception.class)
    public Long uploadSingle(MultipartFile multipartFile, UploadEntity uploadEntity) {
        Exception sltException = null;
        //获取文件信息
        FileInfo fileInfo;
        try {
            //解析上传的附件
            fileInfo = getFileInfo(multipartFile);
        } catch (UploadException e) {
            throw e;
        }
        String thAbsolutePath = null;
        try {
            //判断文件的类型，如果是图片类型的，根据参数，生成缩略图,返回缩略图文件系统路径
            thAbsolutePath = generateSLT(multipartFile, uploadEntity, fileInfo);
        } catch (Exception e) {
            sltException = e;
            //缩略图生成失败，继续上传附件
            log.error("缩略图生成失败", e);
        }

        //先根据配置信息，获取保存的位置
        String destPositionConfig = CacheKit.get(Cache.CONFIG, "attachmentPosition");
        List<String> positions = Arrays.asList(destPositionConfig.split(","));

        //构建附件实体
        Attachment attachment = new Attachment(fileInfo.getType(), fileInfo.getSimpleName(), uploadEntity.getAlias(), fileInfo.getExt(),
                fileInfo.getFileSize(), thAbsolutePath, uploadEntity.getDescription(), uploadEntity.getUuid(),
                uploadEntity.getFjlbNo(), SfyxSt.VALID);

        //存储方式包含文件系统则添加绝对路径信息
        if (positions.contains(AttachmentConst.FILE_SYSTEM) || positions.contains(AttachmentConst.ALL)) {
            attachment.setAbsolutePath(fileInfo.getAbsolutePath());
        }

        //保存附件信息入库
        Long attachmentId = attachmentDao.saveAttachment(attachment);

        try {
            for (String position : positions) {
                switch (position) {
                    case AttachmentConst.ALL: {
                        //均保存
                        File file = saveToFileSystem(multipartFile, fileInfo);
                        saveToDataBase(FileUtils.readFileToByteArray(file), attachmentId);
                        saveToFtp(fileInfo, multipartFile);
                        return attachmentId;
                    }
                    case AttachmentConst.FILE_SYSTEM: {
                        //保存到服务器文件系统
                        saveToFileSystem(multipartFile, fileInfo);
                        break;
                    }
                    case AttachmentConst.DATA_BASE: {
                        //保存到数据库
                        saveToDataBase(multipartFile.getBytes(), attachmentId);
                        break;
                    }
                    case AttachmentConst.FTP: {
                        saveToFtp(fileInfo, multipartFile);
                        break;
                    }
                    default:
                        break;
                }
            }
        } catch (IOException e) {
            throw new BussinessException(BizExceptionEnum.FILE_UPLOAD_ERROR, e.getMessage());
        }
        if (null != sltException) {
            LogManager.me().executeLog(LogTaskFactory.exceptionLog(new UploadException(sltException.getMessage(), "附件id:" + attachmentId)));
        }
        return attachmentId;
    }

    /**
     * 获取附件信息实体
     *
     * @param mf MultipartFile
     * @return 附件信息实体
     */
    private FileInfo getFileInfo(MultipartFile mf) {
        String type = null;
        String ext = null;
        String fullName = mf.getOriginalFilename();
        String simpleName = fullName;
        long fileSize = mf.getSize();
        int lastIndex = fullName.lastIndexOf(".");
        if (lastIndex > 0) {
            type = RxFileUtils.getFileType(fullName.substring(lastIndex + 1));
            ext = fullName.substring(lastIndex + 1);
            simpleName = fullName.substring(0, lastIndex);
        }
        //当前时间
        String nowTime = DateTimeFormatter.ofPattern("yyyyMMddHHmmss").format(LocalDateTime.now());
        //获取附件存储路径
        String filePath = CacheKit.get(Cache.CONFIG, "attachmentPath");
        //获取缩略图存储路径及其前缀、后缀
        String thumbnailPath = CacheKit.get(Cache.CONFIG, "thumbnailPath");
        //验证路径有效性
        try {
            checkPath(filePath, thumbnailPath);
        } catch (UploadException e) {
            throw e;
        }
        //拼接缩略图物理绝对路径
        String absolutePath = filePath + File.separator + simpleName + nowTime + "." + ext;
        String thAbsolutePath = getThAbsolutePath();
        return new FileInfo(type, ext, fullName, simpleName, fileSize, absolutePath, thAbsolutePath);
    }

    private String getThAbsolutePath() {
        String nowTime = DateTimeFormatter.ofPattern("yyyyMMddHHmmss").format(LocalDateTime.now());
        return CacheKit.get(Cache.CONFIG, "thumbnailPath") + File.separator + "th" + nowTime + "_" + new Random().nextInt(100) + ".jpg";
    }

    /**
     * 检查文件路径
     *
     * @param paths 文件路径
     * @throws UploadException 上传异常
     */
    private void checkPath(String... paths) throws UploadException {
        for (String path : paths) {
            File file = new File(path);
            if (!file.exists()) {
                if (!file.mkdirs()) {
                    log.error("创建文件路径{}异常！", path);
                    throw new UploadException(BizExceptionEnum.FILE_PATH_ERROR, path);
                }
            }
        }
    }

    /**
     * 生成缩略图
     *
     * @param multipartFile multipartFile
     * @param uploadEntity  上传实体
     * @param fileInfo      文件信息
     * @return 缩略图路径
     */
    private String generateSLT(MultipartFile multipartFile, UploadEntity uploadEntity, FileInfo fileInfo) throws IOException {
        if ("2".equals(fileInfo.getType()) && uploadEntity.isThumbFlag()) {
            Thumbnails.of(multipartFile.getInputStream()).size(400, 300).toFile(fileInfo.getThAbsolutePath());
            return fileInfo.getThAbsolutePath();
        }
        return null;
    }

    /**
     * 保存到数据库中
     *
     * @param file         文件字节
     * @param attachmentId 附件id
     */
    private void saveToDataBase(byte[] file, Long attachmentId) {
        try {
            AttachmentData attachmentData = new AttachmentData(attachmentId, file, SfyxSt.VALID);
            attachmentDataDao.saveAttachmentData(attachmentData);
        } catch (Exception e) {
            throw new UploadException(BizExceptionEnum.FILE_DBSYS_ERROR, "附件id:" + attachmentId + e.getMessage());
        }
    }

    /**
     * 保存到文件系统
     *
     * @param multipartFile multipartFile
     * @param fileInfo      文件信息
     */
    private File saveToFileSystem(MultipartFile multipartFile, FileInfo fileInfo) {
        try {
            File file = new File(fileInfo.getAbsolutePath());
            multipartFile.transferTo(file);
            return file;
        } catch (IOException e) {
            throw new UploadException(BizExceptionEnum.FILE_FILESYS_ERROR, fileInfo.getAbsolutePath());
        }
    }

    /**
     * 保存到FTP文件服务器
     *
     * @return
     */
    private void saveToFtp(FileInfo fileInfo, MultipartFile multipartFile) {
        FtpUtils ftpUtils = new FtpUtils();
        ftpUtils.setHostname(CacheKit.get(Cache.CONFIG, "FTP_IP"));
        ftpUtils.setPort(Integer.parseInt(CacheKit.get(Cache.CONFIG, "FTP_PORT")));
        ftpUtils.setUsername(CacheKit.get(Cache.CONFIG, "FTP_ACCOUNT"));
        ftpUtils.setPassword(CacheKit.get(Cache.CONFIG, "FTP_PASSWORD"));
        try {
            ftpUtils.uploadFile("/", fileInfo.getFullName(), multipartFile.getInputStream());
        } catch (IOException e) {
            log.error("上传ftp失败");
        }
    }

    /**
     * 通过id获取附件
     *
     * @param id 附件id
     * @return 附件实体
     */
    @Override
    public Attachment getAttachmentById(Long id) {
        return attachmentDao.getAttachmentById(id);
    }

    /**
     * 依据附件id获取其文件流
     *
     * @param id
     * @return
     */
    @Override
    public byte[] getFileData(Long id) {
        Attachment attachment = attachmentDao.getAttachmentById(id);
        File file = new File(attachment.getAbsolutePath());
        byte[] data = null;
        if (file.exists()) {
            try {
                data = FileUtils.readFileToByteArray(file);
            } catch (IOException e) {
                throw new RuntimeException("文件下载失败");
            }
        }
        return data;
    }

    /**
     * 通过uuid获取附件
     *
     * @param uuid uuid
     * @return 附件List
     */
    @Override
    public List<Attachment> getAttachmentListByUuid(String uuid) {
        return attachmentDao.getAttachmentListByUuid(uuid);
    }

    /**
     * 通过参数map获取附件
     *
     * @param map 参数map
     * @return 附件list
     */
    @Override
    public List<Attachment> getAttachmentList(Map map) {
        return attachmentDao.getAttachmentList(map);
    }

    @Override
    public Boolean checkFileExist(Long id) {
        Attachment attachment = getAttachmentById(id);
        if (attachment != null) {
            try {
                if (null != attachment.getAbsolutePath() && new File(attachment.getAbsolutePath()).exists()) {
                    return true;
                } else {
                    AttachmentData attachmentData = attachmentDataDao.getDataByAttachmentId(attachment.getId());
                    if (attachmentData != null && attachmentData.getContent() != null) {
                        return true;
                    } else {
                        FtpUtils ftpUtils = new FtpUtils();
                        ftpUtils.setHostname(CacheKit.get(Cache.CONFIG, "FTP_IP"));
                        ftpUtils.setPort(Integer.parseInt(CacheKit.get(Cache.CONFIG, "FTP_PORT")));
                        ftpUtils.setUsername(CacheKit.get(Cache.CONFIG, "FTP_ACCOUNT"));
                        ftpUtils.setPassword(CacheKit.get(Cache.CONFIG, "FTP_PASSWORD"));
                        return ftpUtils.checkFileExit("/", attachment.getName() + "." + attachment.getExtension());
                    }
                }
            } catch (Exception e) {
                return false;
            }
        } else {
            return false;
        }

    }

    /**
     * 获取附件字节内容
     */
    @Override
    public byte[] getContent(Attachment attachment) {
        byte[] data;
        //文件系统中取
        File file = new File(attachment.getAbsolutePath() == null ? "" : attachment.getAbsolutePath());
        if (file.exists()) {
            data = FileUtil.toByteArray(attachment.getAbsolutePath());
        } else {
            //数据库中取
            AttachmentData attachmentData = attachmentDataDao.getDataByAttachmentId(attachment.getId());
            if (attachmentData != null) {
                data = attachmentData.getContent();
            } else {
                //ftp中获取
                FtpUtils ftpUtils = new FtpUtils();
                ftpUtils.setHostname(CacheKit.get(Cache.CONFIG, "FTP_IP"));
                ftpUtils.setPort(Integer.parseInt(CacheKit.get(Cache.CONFIG, "FTP_PORT")));
                ftpUtils.setUsername(CacheKit.get(Cache.CONFIG, "FTP_ACCOUNT"));
                ftpUtils.setPassword(CacheKit.get(Cache.CONFIG, "FTP_PASSWORD"));
                data = ftpUtils.getData("/", attachment.getName() + "." + attachment.getExtension());
            }
        }
        return data;
    }

    /**
     * 批量下载
     *
     * @param response       the response
     * @param attachmentList the attachment list
     */
    @Override
    public void downloadBatch(HttpServletResponse response, List<Attachment> attachmentList) {
        if (attachmentList.size() == 0) {
            throw new UploadException(BizExceptionEnum.FILE_NOT_FOUND, "批量下载出错");
        }
        try (ZipOutputStream zos = new ZipOutputStream(response.getOutputStream());
             BufferedOutputStream bos = new BufferedOutputStream(zos);) {
            response.setContentType("application/x-msdownload");
            response.setHeader("content-disposition", "attachment;filename=" + URLEncoder.encode(ZIP_NAME, "utf-8"));
            for (Attachment attachment : attachmentList) {
                try (BufferedInputStream bis = new BufferedInputStream(new ByteArrayInputStream(getContent(attachment)));) {
                    zos.putNextEntry(new ZipEntry(attachment.findDownloadName()));
                    int len;
                    byte[] buf = new byte[10 * 1024];
                    while ((len = bis.read(buf, 0, buf.length)) != -1) {
                        bos.write(buf, 0, len);
                    }
                    bos.flush();
                }
            }
        } catch (IOException e) {
            throw new UploadException(BizExceptionEnum.FILE_DOWNLOAD_ERROR, e.getMessage());
        }
    }

    /**
     * 获取缩略图，当图片缩略图不存在的时候，通过id生成缩略图
     *
     * @param id       附件id
     * @param thPath   缩略图路径
     * @param response 响应
     */
    @Override
    @Transactional(rollbackFor = Exception.class)
    public void getThumbnail(Long id, String thPath, HttpServletResponse response) {
        OutputStream outputStream = null;
        if (RxStringUtils.isNotEmpty(thPath)) {
            try {
                thPath = URLDecoder.decode(URLDecoder.decode(thPath, "utf-8"), "utf-8");
            } catch (UnsupportedEncodingException e) {
                throw new BussinessException(BizExceptionEnum.File_DECODING_ERROR, thPath);
            }
            if (!new File(thPath).exists()) {
                //重新生成缩略图
                thPath = rePaintThumbnail(id);
            }
        } else {
            //重新生成缩略图及路径
            thPath = rePaintThumbnail(id);
        }
        if (thPath != null) {
            File thfile = new File(thPath);
            try {
                byte[] data = FileUtils.readFileToByteArray(thfile);
                outputStream = response.getOutputStream();
                outputStream.write(data);
                outputStream.flush();
            } catch (IOException e) {
                throw new BussinessException(BizExceptionEnum.File_DECODING_ERROR, thPath);
            } finally {
                IOUtils.close(outputStream);
            }
        }
    }


    //根据附件id thPath重新生成缩略图
    private String rePaintThumbnail(Long id) {
        Attachment attachment = getAttachmentById(id);
        String thPath = getThAbsolutePath();
        InputStream in = null;
        try {
            //区分附件位置：DB;FS
            File f = new File(attachment.getAbsolutePath());
            if (f.exists()) {
                //先从文件系统取附件
                in = new FileInputStream(f);
            } else {
                //文件系统找不到，从数据库取
                in = new ByteArrayInputStream(attachmentDataDao.getDataByAttachmentId(id).getContent());
            }
            File parent = new File(thPath).getParentFile();
            if (!parent.exists()) {
                if (!parent.mkdirs()) {
                    throw new BussinessException(BizExceptionEnum.FILE_MKDIRS_ERROR, thPath);
                }
            }
            Thumbnails.of(in).size(600, 300).toFile(thPath);
            attachment.setThAbsolutePath(thPath);
            attachmentDao.saveAttachment(attachment);
        } catch (Exception e) {
            throw new BussinessException(BizExceptionEnum.FILE_SLT_ERROR, e.getMessage());
        } finally {
            IOUtils.close(in);
        }
        return thPath;
    }

    /**
     * 删除附件
     *
     * @param ids 附件ids
     */
    @Override
    @Transactional
    public void delAttachment(String ids) {
        String destPosition = CacheKit.get(Cache.CONFIG, "attachmentPosition");
        attachmentDao.delAttachment(ids); //删除数据库中的Attachment
        Attachment attachment;
        String[] idsArr = ids.split(",");
        for (String id : idsArr) {
            attachment = attachmentDao.getAttachmentById(Long.parseLong(id));
            switch (destPosition) {
                case AttachmentConst.FILE_SYSTEM:
                    //删除服务器上的文件
                    delFileOnFileSystem(attachment.getAbsolutePath());
                    break;
                case AttachmentConst.DATA_BASE:
                    //删除数据库中的AttachmentData
                    attachmentDataDao.delDataByAttachmentId(Long.parseLong(id));
                    break;
                default:
                    //删除数据库中的AttachmentData
                    attachmentDataDao.delDataByAttachmentId(Long.parseLong(id));
                    //删除服务器上的文件
                    delFileOnFileSystem(attachment.getAbsolutePath());
                    break;
            }
            //删除缩略图
            delFileOnFileSystem(attachment.getThAbsolutePath());
        }
    }

    @Override
    @Transactional
    public void updateFiles(String addFileIds, String delFileIds) {
        attachmentDao.updateFiles(addFileIds, delFileIds);
    }


    @Scheduled(cron = "0 0 3 * * ?")
    public void clearUnusedFile() {
        attachmentDao.clearUnusedFile();

    }

    /**
     * 删除文件服务器中的附件
     *
     * @param absolutePath 附件绝对路径
     */
    private void delFileOnFileSystem(String absolutePath) {
        if (RxStringUtils.isNotEmpty(absolutePath)) {
            File f = new File(absolutePath);
            if (f.exists()) {
                if (!f.delete()) {
                    throw new BussinessException(BizExceptionEnum.FILE_DELETE_ERROR, absolutePath);
                }
            }
        }
    }


}
