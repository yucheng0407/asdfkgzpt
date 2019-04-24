package net.ruixin.dao.plat.attachment;

import net.ruixin.domain.plat.attachment.Attachment;
import net.ruixin.util.hibernate.BaseDao;
import net.ruixin.util.tools.RxStringUtils;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * 附件Dao层
 *
 * @author Pitcher
 */
@Repository
public class AttachmentDao extends BaseDao<Attachment> implements IAttachmentDao {

    @Override
    public Long saveAttachment(Attachment attachment) {
        super.saveOrUpdate(attachment);
        return attachment.getId();
    }

    @Override
    public Attachment getAttachmentById(Long id) {

        return super.get(id);
    }

    @Override
    public List<Attachment> getAttachmentListByUuid(String uuid) {
        return super.findListByHql("FROM Attachment WHERE UUID = ? AND sfyxSt='1'", uuid);
    }

    @Override
    public List<Attachment> getAttachmentList(Map map) {
        List<Object> args = new ArrayList<>();
        StringBuilder sql = new StringBuilder();
        if (RxStringUtils.isNotEmpty(map.get("addFileIds"))) {
            args.add(map.get("addFileIds"));
            sql.append("SELECT * FROM SYS_ATTACHMENT A WHERE (A.sfyx_St='1' OR A.ID in (select column_value from table(splitstr(?, ','))))");
        } else {
            sql.append("SELECT A.* FROM SYS_Attachment A WHERE A.sfyx_St='1' ");
        }
        //UUID
        if (RxStringUtils.isNotEmpty(map.get("uuid"))) {
            sql.append(" AND A.uuid=? ");
            args.add(map.get("uuid"));
        }
        //附件字典类别
        if (RxStringUtils.isNotEmpty(map.get("fjlbNo"))) {
            sql.append(" AND A.fjlbNo=? ");
            args.add(map.get("fjlbNo"));
        }
        //附件类型
//        if (RxStringUtils.isNotEmpty(map.get("type"))) {
//            hql.append(" AND A.type=? ");
//            args.add(map.get("type"));
//        }
        return super.getListBySql(sql, args.toArray());
    }

    @Override
    public void delAttachment(String ids) {
        super.deleteBatch(ids);
    }

    @Override
    public void updateFiles(String addFileIds, String delFileIds) {
        super.updateFiles(addFileIds, delFileIds);
    }

    @Override
    public void clearUnusedFile() {
        String sql = "DELETE SYS_ATTACHMENT WHERE SFYX_ST='2'";
        getJdbcTemplate().execute(sql);

    }
}
