
package net.ruixin.service.plat.report;

import net.ruixin.service.plat.common.IBaseService;
import net.ruixin.util.paginate.FastPagination;

import java.util.List;
import java.util.Map;
import net.ruixin.domain.plat.report.SysMetaData;
/**
 * 元数据 Service接口
 *
 * @author rxCoder on 2018-8-20 9:16:01
 */
public interface ISysMetaDataService extends IBaseService {

    /**
     * 获取SysMetaData分页列表
     *
     * @param map 查询条件
     * @return 分页信息
     */
    FastPagination getSysMetaDataListPage(Map map);
    /**
     * 保存元数据
     *
     * @param sysMetaData 元数据
     */
    void saveSysMetaData(SysMetaData sysMetaData);

    FastPagination getSysMetaDataDetailListPage(Map map);

    FastPagination getSysMetaDataShowListPage(String tableName, Map map);

    List getSysMetaDataColumnList(String tableName);

    String getViewText(String tableName);

    String createView(String text);

    SysMetaData getMetaDataAndColumns(Long metadataId);

    String getEasyCommentOfColumn(String column);

    String easyComment(String comment);
}