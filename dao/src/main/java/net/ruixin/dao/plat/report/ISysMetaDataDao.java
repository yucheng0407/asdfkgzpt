
package net.ruixin.dao.plat.report;
import java.util.List;
import java.util.Map;
import net.ruixin.util.paginate.FastPagination;
import net.ruixin.util.hibernate.IBaseDao;
import net.ruixin.domain.plat.report.SysMetaData;

/**
 * 元数据Dao接口
 *
 * @author rxCoder on 2018-8-20 9:16:01
 */
public interface ISysMetaDataDao extends IBaseDao<SysMetaData> {

    /**
     * 查询元数据分页列表
     *
     * @param map 查询条件
     * @return 模块分页信息
     */
    FastPagination getSysMetaDataListPage(Map map);

    FastPagination getSysMetaDataDetailListPage(Map map);

    FastPagination getSysMetaDataShowListPage(String tableName, Map map);

    List getSysMetaDataColumnList(String tableName);

    String getViewText(String tableName);

    String createView(String text);

    String getCommentOfColumn(String column);
}
