package net.ruixin.dao.plat.attachment;

import net.ruixin.domain.plat.attachment.Attachment;

import java.util.List;
import java.util.Map;

/**
 * 附件Dao  抽象类
 *
 * @author Pitcher
 */
public interface IAttachmentDao {

    /**
     * 保存Attachment实体
     *
     * @param attachment 附件实体
     * @return id
     */
    Long saveAttachment(Attachment attachment);

    /**
     * 根据id获取Attachment实体
     *
     * @param id 附件id
     * @return 附件实体
     */
    Attachment getAttachmentById(Long id);

    /**
     * 通过uuid获取附件集合
     *
     * @param uuid 附件uuid
     * @return 附件实体集合
     */
    List<Attachment> getAttachmentListByUuid(String uuid);

    /**
     * 根据参数map获取附件集合 （当前支持uuid,附件类别：fjlbNo,附件类型：type）
     *
     * @param map 查询条件
     * @return 附件实体列表
     */
    List<Attachment> getAttachmentList(Map map);

    /**
     * 删除文件
     *
     * @param ids 附件ids
     */
    void delAttachment(String ids);

    /**
     * 跟新临时新增和删除的文件
     *
     * @param addFileIds 新增的文件ids
     * @param delFileIds 删除的问题件ids
     */
    void updateFiles(String addFileIds, String delFileIds);

    /**
     * 清除无用的文件
     */
    void clearUnusedFile();
}

