
package net.ruixin.service.plat.report;

import net.ruixin.util.tools.RxStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import net.ruixin.service.plat.common.BaseService;
import net.ruixin.util.paginate.FastPagination;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.ruixin.domain.plat.report.SysMetaData;

import net.ruixin.dao.plat.report.ISysMetaDataDao;

/**
 * 元数据Service实现
 *
 * @author rxCoder on 2018-8-20 9:16:01
 */
@Service
public class SysMetaDataService extends BaseService implements ISysMetaDataService {
    @Autowired
    private ISysMetaDataDao sysMetaDataDao;

    @Override
    public FastPagination getSysMetaDataListPage(Map map) {
        return sysMetaDataDao.getSysMetaDataListPage(map);
    }

    @Override
    public void saveSysMetaData(SysMetaData sysMetaData) {
        save(sysMetaData);
    }

    @Override
    public FastPagination getSysMetaDataDetailListPage(Map map) {
        return sysMetaDataDao.getSysMetaDataDetailListPage(map);
    }

    @Override
    public FastPagination getSysMetaDataShowListPage(String tableName, Map map) {
        return sysMetaDataDao.getSysMetaDataShowListPage(tableName, map);
    }

    @Override
    public List getSysMetaDataColumnList(String tableName) {
        List<Map> colList = sysMetaDataDao.getSysMetaDataColumnList(tableName);
        if (colList.size() > 0) {
            for (Map map : colList) {
                if(RxStringUtils.isEmpty(map.get("COMMENTS"))){
                    map.put("COMMENTS", getEasyCommentOfColumn(map.get("COLUMN_NAME").toString()));
                }else{
                    map.put("COMMENTS", easyComment(map.get("COMMENTS").toString()));
                }
            }
        }
        return colList;
    }

    @Override
    public String getViewText(String tableName) {
        return sysMetaDataDao.getViewText(tableName);
    }

    @Override
    public String createView(String text) {
        return sysMetaDataDao.createView(text);
    }

    @Override
    public SysMetaData getMetaDataAndColumns(Long metadataId) {
        SysMetaData metaData = get(SysMetaData.class, metadataId);
        if (RxStringUtils.isNotEmpty(metaData.getDetail())) {
            metaData.setColumns(getSysMetaDataColumnList(metaData.getDetail()));
        }
        return metaData;
    }

    @Override
    public String getEasyCommentOfColumn(String column) {
        String comment = sysMetaDataDao.getCommentOfColumn(column);
        if (RxStringUtils.isNotEmpty(comment)) {
            comment = easyComment(comment);
        }
        return comment;
    }

    @Override
    public String easyComment(String comment) {
        String ezComment = comment;
        int tempIndex = ezComment.indexOf(",");
        if (tempIndex > 0) {  //在第一位则不截，故不从-1开始
            ezComment = ezComment.substring(0, tempIndex);
        }
        tempIndex = ezComment.indexOf("，");
        if (tempIndex > 0) {
            ezComment = ezComment.substring(0, tempIndex);
        }
        tempIndex = ezComment.indexOf("。");
        if (tempIndex > 0) {
            ezComment = ezComment.substring(0, tempIndex);
        }
        tempIndex = ezComment.indexOf(".");
        if (tempIndex > 0) {
            ezComment = ezComment.substring(0, tempIndex);
        }
        tempIndex = ezComment.indexOf("(");
        if (tempIndex > 0) {
            ezComment = ezComment.substring(0, tempIndex);
        }
        tempIndex = ezComment.indexOf("（");
        if (tempIndex > 0) {
            ezComment = ezComment.substring(0, tempIndex);
        }
        tempIndex = ezComment.indexOf("|");
        if (tempIndex > 0) {
            ezComment = ezComment.substring(0, tempIndex);
        }
        tempIndex = ezComment.indexOf(" ");
        if (tempIndex > 0) {
            ezComment = ezComment.substring(0, tempIndex);
        }
        return ezComment;
    }
}