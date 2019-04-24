package net.ruixin.service.gzl;

import net.ruixin.domain.gzl.GzlFb;
import net.ruixin.service.plat.common.IBaseService;
import net.ruixin.util.paginate.FastPagination;
import org.springframework.util.MultiValueMap;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

/**
 * 工作流 Service接口
 *
 * @author czq 2019年4月10日15:56:33
 */
public interface IGzlService extends IBaseService {

    /**
     * App 保存工作流(指令下发，线索上报等)
     *
     * @param gzl        数据对象
     * @param multiValue 文件
     */
    void saveGzlApp(Map<String, Object> gzl, MultiValueMap<String, MultipartFile> multiValue);

    /**
     * 获取移动端工作流表单
     *
     * @param pageNum  页码
     * @param pageSize 页条目
     * @param dataType 数据类型(指令/线索...)
     * @param sjlyzxt  数据来源子系统(数据来源 1-街面防控警务APP指令 ，2-网格防范警务)
     * @param bt       搜索项 标题
     * @return
     */
    FastPagination getAppGzlListPage(int pageNum, int pageSize, String dataType, String sjlyzxt, String bt);

    /**
     * 获取移动端工作流详情
     *
     * @param id
     * @return
     */
    Map getAppGzlDetail(Long id);

    /**
     * App 保存移动端工作流反馈
     *
     * @param jsId        接收Id
     * @param textMessage 文本反馈信息
     * @param fileMessage 文件反馈信息
     */
    void saveAppGzlFk(Long jsId, Map<String, Object> textMessage, MultiValueMap<String, MultipartFile> fileMessage);

    /**
     * App 保存移动端工作流继续反馈
     *
     * @param fbId        发布Id
     * @param textMessage 文本反馈信息
     * @param fileMessage 文件反馈信息
     */
    void saveAppGzlJxFb(Long fbId, Map<String, Object> textMessage, MultiValueMap<String, MultipartFile> fileMessage);

    /**
     * 依据fbId和用户Id获取接收Id
     * 用户id通过shirokit获取
     *
     * @param fbId
     * @return
     */
    Long getGzlJsId(Long fbId);
}