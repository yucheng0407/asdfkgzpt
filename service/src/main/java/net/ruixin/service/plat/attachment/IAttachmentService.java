package net.ruixin.service.plat.attachment;

import net.ruixin.domain.plat.attachment.Attachment;
import net.ruixin.util.data.UploadEntity;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Map;

/**
 * 附件服务层AttachmentService
 *
 * @author Pitcher
 */
public interface IAttachmentService {
    /**
     * 上传附件（多个）
     *
     * @param multipartFileList multipartFileList
     * @param uploadEntity      uploadEntity
     */
    String upload(List<MultipartFile> multipartFileList, UploadEntity uploadEntity);

    /**
     * 上传附件（单个）
     *
     * @param multipartFile multipartFile
     * @param uploadEntity  uploadEntity
     */
    Long uploadSingle(MultipartFile multipartFile, UploadEntity uploadEntity);

    /**
     * 通过id获取附件
     *
     * @param id 附件id
     * @return 附件实体
     */
    Attachment getAttachmentById(Long id);

    /**
     * 依据附件id获取其文件流
     *
     * @param id
     * @return
     */
    byte[] getFileData(Long id);

    /**
     * 通过uuid获取附件
     *
     * @param uuid uuid
     * @return 附件List
     */
    List<Attachment> getAttachmentListByUuid(String uuid);


    /**
     * 多个文件下载
     *
     * @param response       response
     * @param attachmentList 附件集合
     */
    void downloadBatch(HttpServletResponse response, List<Attachment> attachmentList);

    /**
     * 根据参数map获取附件集合 （当前支持uuid,附件类别：fjlbNo,附件类型：type）
     *
     * @param map 查询条件
     * @return 附件实体列表
     */
    List<Attachment> getAttachmentList(Map map);

    /**
     * 根据附件id判断附件是否存在
     *
     * @param id 附件id
     * @return
     */
    Boolean checkFileExist(Long id);

    /**
     * 根据ids删除附件
     *
     * @param ids 附件ids
     */
    void delAttachment(String ids);

    /**
     * 更新文件
     *
     * @param addFileIds 新增的文件
     * @param delFileIds 删除的文件
     */
    void updateFiles(String addFileIds, String delFileIds);

    /**
     * 获取缩略图
     *
     * @param id       附件id
     * @param thPath   缩略图路径
     * @param response 响应
     */
    void getThumbnail(Long id, String thPath, HttpServletResponse response);

    /**
     * 获取内容
     *
     * @param attachment 附件实体
     * @return 附件byte[ ]
     */
    byte[] getContent(Attachment attachment);
}
