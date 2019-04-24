package net.ruixin.domain.plat.organ;

import net.ruixin.domain.plat.BaseDomain;
import net.ruixin.enumerate.plat.SfyxSt;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.Formula;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by ZXW on 2016-12-20
 * 实体：部门领导实体
 * @author Pitcher
 */

@SuppressWarnings("unused")
@Table(name = "SYS_ORGAN_LEADER")
@Entity
@DynamicInsert
@DynamicUpdate
public class OrganLeader extends BaseDomain {
    @Id
    @SequenceGenerator(name = "seq_sys_organ_leader", sequenceName = "SEQ_SYS_ORGAN_LEADER", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_sys_organ_leader")
    private Long id;

    @Column(name = "ORGAN_ID")
    private Long organ_id;

    @Column(name = "USER_ID")
    private Long user_id;

    @Formula("(SELECT U.USER_NAME FROM SYS_USER U WHERE U.ID = USER_ID)")
    private String user_name;

    //显示领导顺序
    @Column(name = "SORT_NO")
    private Long sort_no;

    //领导类型
    @Column(name = "TYPE_NO")
    private Long type_no;

    //创建人
    @Column(name = "CJR_ID")
    private Long cjrId;

    //创建时间
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "CJSJ")
    private Date cjsj;

    //修改人
    @Column(name = "XGR_ID")
    private Long xgrId;

    //修改时间
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "XGSJ")
    private Date xgsj;

    //有效标识:0无效，1有效
    @Enumerated
   @Column(name = "SFYX_ST")
    private SfyxSt sfyxSt;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getOrgan_id() {
        return organ_id;
    }

    public void setOrgan_id(Long organ_id) {
        this.organ_id = organ_id;
    }

    public Long getUser_id() {
        return user_id;
    }

    public void setUser_id(Long user_id) {
        this.user_id = user_id;
    }

    public String getUser_name() {
        return user_name;
    }

    public void setUser_name(String user_name) {
        this.user_name = user_name;
    }

    public Long getSort_no() {
        return sort_no;
    }

    public void setSort_no(Long sort_no) {
        this.sort_no = sort_no;
    }

    public Long getType_no() {
        return type_no;
    }

    public void setType_no(Long type_no) {
        this.type_no = type_no;
    }

    public Long getCjrId() {
        return cjrId;
    }

    public void setCjrId(Long cjrId) {
        this.cjrId = cjrId;
    }

    public Date getCjsj() {
        return cjsj;
    }

    public void setCjsj(Date cjsj) {
        this.cjsj = cjsj;
    }

    public Long getXgrId() {
        return xgrId;
    }

    public void setXgrId(Long xgrId) {
        this.xgrId = xgrId;
    }

    public Date getXgsj() {
        return xgsj;
    }

    public void setXgsj(Date xgsj) {
        this.xgsj = xgsj;
    }

    public SfyxSt getSfyxSt() {
        return sfyxSt;
    }

    public void setSfyxSt(SfyxSt sfyxSt) {
        this.sfyxSt = sfyxSt;
    }
}
