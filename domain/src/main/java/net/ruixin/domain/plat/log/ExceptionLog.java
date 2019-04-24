package net.ruixin.domain.plat.log;

import net.ruixin.domain.plat.BaseDomain;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.Date;

/**
 * 登录日志
 */
@Table(name = "SYS_LOG_EXCEPTION")
@Entity
@DynamicInsert
@DynamicUpdate
public class ExceptionLog extends BaseDomain {
    @Id
    @SequenceGenerator(name = "seq_sys_log", sequenceName = "SEQ_SYS_LOG_EXCEPTION", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_sys_log")
    private Long id;

    //    用户id
    @Column(name = "USER_ID")
    private Long userId;

    //    登录用户名
    @Column(name = "USER_NAME")
    private String userName;

    //    异常消息
    @Column(name = "MESSAGE")
    private String message;

    //    创建时间
    @Column(name = "CREATE_TIME")
    private Date createTime;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }
}
