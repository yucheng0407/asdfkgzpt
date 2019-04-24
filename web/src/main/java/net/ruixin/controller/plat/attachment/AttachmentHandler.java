package net.ruixin.controller.plat.attachment;

import net.ruixin.controller.BaseController;
import net.ruixin.domain.plat.attachment.Attachment;
import net.ruixin.service.plat.attachment.IAttachmentService;
import net.ruixin.util.data.AjaxReturn;
import net.ruixin.util.data.UploadEntity;
import net.ruixin.util.exception.BizExceptionEnum;
import net.ruixin.util.exception.BussinessException;
import net.ruixin.util.exception.UploadException;
import net.ruixin.util.file.FileUtil;
import net.ruixin.util.resolver.JsonModel;
import net.ruixin.util.tools.IOUtils;
import net.ruixin.util.tools.RxStringUtils;
import org.apache.commons.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.util.List;
import java.util.Map;

/**
 * @author ly
 */
@Controller
@RequestMapping("/attachment")
public class AttachmentHandler extends BaseController {

    /**
     * 别名最大长度
     */
    private static final int MAX_ALIAS = 50;
    /**
     * 描述最大长度
     */
    private static final int MAX_DESCRIPTION = 250;

    @Autowired
    private IAttachmentService attachmentService;

    /**
     * 上传附件
     *
     * @param request      request
     * @param uploadEntity 附件实体
     * @return
     */
    @RequestMapping(value = "/upload")
    @ResponseBody
    public AjaxReturn upload(HttpServletRequest request, UploadEntity uploadEntity) {
        MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
        //获取上传的文件
        List<MultipartFile> multipartFileList = multipartRequest.getFiles("fileData");
        checkUploadEntity(multipartFileList, uploadEntity);
        attachmentService.upload(multipartFileList, uploadEntity);
        return success();
    }

    /**
     * 上传附件(兼容IE)
     *
     * @param request      request
     * @param uploadEntity 附件实体
     * @return
     */
    @RequestMapping(value = "/uploadIE", produces = "text/html; charset=utf-8")
    @ResponseBody
    public String uploadIE(HttpServletRequest request, UploadEntity uploadEntity) {
        MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
        //获取上传的文件
        List<MultipartFile> multipartFileList = multipartRequest.getFiles("fileData");
        checkUploadEntity(multipartFileList, uploadEntity);
        String addFileIds = attachmentService.upload(multipartFileList, uploadEntity);
        if (addFileIds.endsWith(",")) {
            addFileIds = addFileIds.substring(0, addFileIds.length() - 1);
        }
        return "{\"success\":true," + "\"addFileIds\":" + "\"" + addFileIds + "\"" + "}";
    }

    /**
     * 上传图片（头像）
     *
     * @param request request
     * @return id
     */
    @RequestMapping(value = "/uploadImage", produces = "text/html; charset=utf-8")
    @ResponseBody
    public String uploadImage(HttpServletRequest request, UploadEntity uploadEntity) {
        MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
        //获取上传的文件
        MultipartFile multipartFile = multipartRequest.getFile("fileData");
        Long imageId = attachmentService.uploadSingle(multipartFile, uploadEntity);
        return "{\"success\":true," + "\"imgId\":" + imageId + "}";
    }

    /**
     * 通过附件id下载附件
     *
     * @param id 附件id
     * @return ResponseEntity
     */
    @RequestMapping("/download")
    public ResponseEntity download(Long id) {
        Attachment attachment = attachmentService.getAttachmentById(id);
        if (attachment != null) {
            byte[] content = attachmentService.getContent(attachment);
            return renderFile(attachment.findDownloadName(), content);
        } else {
            throw new UploadException(BizExceptionEnum.FILE_NOT_FOUND, "附件id:" + id);
        }
    }

    /**
     * 移动端通过附件id下载附件
     *
     * @param id 附件id
     * @return ResponseEntity
     */
    @RequestMapping("/downloadApp")
    public void downloadApp(Long id, HttpServletRequest request, HttpServletResponse response) {
        System.out.println("downloadApp");
        Attachment attachment = attachmentService.getAttachmentById(id);
        if (attachment != null) {
            FileUtil.downloadFile(attachment.getAbsolutePath(), attachment.getName(), request, response);
        } else {
            throw new UploadException(BizExceptionEnum.FILE_NOT_FOUND, "附件id:" + id);
        }
    }

    /**
     * 通过附件id获取其base64字符串
     *
     * @param id
     * @return
     */
    @RequestMapping("/getFileBase64")
    public String getFileBase64(Long id) {
        try {
            Attachment attachment = attachmentService.getAttachmentById(id);
            return new String(Base64.encodeBase64(attachmentService.getFileData(attachment.getId())), "UTF-8");
        } catch (Exception e) {
            throw new UploadException(BizExceptionEnum.FILE_NOT_FOUND, "附件id:" + id);
        }
    }

    /**
     * 验证附件是否存在
     *
     * @param id 附件id
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping("/checkFileExist")
    public AjaxReturn checkFileExist(Long id) {
        if (attachmentService.checkFileExist(id)) {
            return success();
        } else {
            return error().setMsg("附件不存在");
        }
    }

    /**
     * 通过附件uuid下载附件
     *
     * @param uuid uuid
     */
    @RequestMapping("/downloadBatch")
    public AjaxReturn downloadBatch(String uuid) {
        List<Attachment> attachmentList = attachmentService.getAttachmentListByUuid(uuid);
        attachmentService.downloadBatch(getHttpServletResponse(), attachmentList);
        return success();
    }

    /**
     * 检查上传的附件
     *
     * @param multipartFileList 附件集合
     * @param uploadEntity      附件实体
     */
    private void checkUploadEntity(List<MultipartFile> multipartFileList, UploadEntity uploadEntity) {
        if (multipartFileList.isEmpty()) {
            throw new UploadException(BizExceptionEnum.FILE_NULL, uploadEntity.getUuid());
        }
        if (RxStringUtils.getStrLength(uploadEntity.getAlias()) > MAX_ALIAS) {
            throw new UploadException(BizExceptionEnum.FILE_ALIAS_TOOLONG, "uuid:" + uploadEntity.getUuid() + "，别名：" + uploadEntity.getAlias());
        }
        if (RxStringUtils.getStrLength(uploadEntity.getDescription()) > MAX_DESCRIPTION) {
            throw new UploadException(BizExceptionEnum.FILE_DESCRIPTION_TOOLONG, "description:" + uploadEntity.getDescription());
        }
    }

    /**
     * 根据uuid获取附件实体列表
     *
     * @param uuid uuid
     * @return 附件实体列表
     */
    @ResponseBody
    @RequestMapping("/getAttachmentListByUuid")
    public AjaxReturn getAttachmentListByUuid(String uuid) {
        return success().setData(attachmentService.getAttachmentListByUuid(uuid));
    }

    /**
     * 通过参数map获取附件
     *
     * @param map 参数map
     * @return 附件list
     */
    @ResponseBody
    @RequestMapping("/getAttachmentList")
    public AjaxReturn getAttachmentList(@JsonModel Object map) {
        return success().setData(attachmentService.getAttachmentList((Map) map));
    }


    /**
     * 获取图片缩略图，当图片缩略图不存在的时候，通过id生成缩略图
     *
     * @param id       附件id
     * @param thPath   缩略图路径
     * @param response 响应
     */
    @RequestMapping("/getThumbnail")
    public void getThumbnail(Long id, String thPath, HttpServletResponse response) {
        attachmentService.getThumbnail(id, thPath, response);
    }

    /**
     * 通过id获取附件信息
     *
     * @param id 附件id
     */
    @ResponseBody
    @RequestMapping("/getAttachmentById")
    public AjaxReturn getAttachmentById(Long id) {
        return new AjaxReturn().setSuccess(true).setData(attachmentService.getAttachmentById(id));
    }

    /**
     * 通过id获取图片
     *
     * @param id       附件id
     * @param response 响应
     */
    @RequestMapping("/getImage")
    public void getImage(Long id, HttpServletResponse response) {
        Attachment attachment;
        System.out.println("getImage");
        String addFileIds = getHttpServletRequest().getParameter("addFileIds");
        if (null != addFileIds && RxStringUtils.isNotEmpty(addFileIds)) {
            attachment = attachmentService.getAttachmentById(Long.valueOf(addFileIds));
        } else {
            attachment = attachmentService.getAttachmentById(id);
        }
        if (null != attachment) {
            byte[] data = attachmentService.getContent(attachment);
            if (data != null) {
                OutputStream outputStream = null;
                try {
                    outputStream = response.getOutputStream();
                    outputStream.write(data);
                    outputStream.flush();
                } catch (IOException e) {
                    throw new BussinessException(BizExceptionEnum.FILE_READING_ERROR, "附件id:" + id);
                } finally {
                    IOUtils.close(outputStream);
                }
            } else {
                throw new BussinessException(BizExceptionEnum.FILE_NOT_FOUND, "附件id:" + id);
            }
        }
    }


    /**
     * 删除文件
     *
     * @param ids 附件ids
     * @return str
     */
    @ResponseBody
    @RequestMapping("/delAttachment")
    public AjaxReturn delAttachment(String ids) {
        attachmentService.delAttachment(ids);
        return success();
    }

    /**
     * 保存文件
     *
     * @param addFileIds 附件ids
     * @return str
     */
    @ResponseBody
    @RequestMapping("/updateFiles")
    public AjaxReturn updateFiles(String addFileIds, String delFileIds) {
        attachmentService.updateFiles(addFileIds, delFileIds);
        return success();
    }
}
