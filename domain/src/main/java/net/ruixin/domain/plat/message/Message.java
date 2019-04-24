package net.ruixin.domain.plat.message;

import net.ruixin.domain.plat.BaseDomain;
import net.ruixin.enumerate.plat.SfyxSt;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

/**
 * @author Pitcher
 */
@SuppressWarnings("unused")
@Table(name = "SYS_MESSAGE")
@Entity
@DynamicInsert
@DynamicUpdate
public class Message extends BaseDomain {

    @Id
    @SequenceGenerator(name = "seq_sys_message_type", sequenceName = "SEQ_SYS_MESSAGE_TYPE", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_sys_message_type")
    private Long id;

    //标题
    @Column(name = "TITLE")
    private String title;

    //内容
    @Column(name = "CONTENT")
    private String content;
    //来源
    @Column(name = "SOURCE")
    private Long source;

    //类型编码
    @Column(name = "TYPE_CODE")
    private String typeCode;

    //跳转参数
    @Column(name = "PARAM")
    private String param;

    //是否有效
    @Enumerated
   @Column(name = "SFYX_ST")
    private SfyxSt sfyxSt;

    //发送人
    @Transient
    private String sendUserIds;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Long getSource() {
        return source;
    }

    public void setSource(Long source) {
        this.source = source;
    }

    public String getTypeCode() {
        return typeCode;
    }

    public void setTypeCode(String typeCode) {
        this.typeCode = typeCode;
    }

    public String getParam() {
        return param;
    }

    public void setParam(String param) {
        this.param = param;
    }

    public String getSendUserIds() {
        return sendUserIds;
    }

    public void setSendUserIds(String sendUserIds) {
        this.sendUserIds = sendUserIds;
    }

    public SfyxSt getSfyxSt() {
        return sfyxSt;
    }

    public void setSfyxSt(SfyxSt sfyxSt) {
        this.sfyxSt = sfyxSt;
    }


    //有参构造器
    public Message(String typeCode, String title, String content, Long source, String param) {
        this.typeCode = typeCode;
        this.title = title;
        this.content = content;
        this.source = source;
        this.param = param;
        this.sfyxSt = SfyxSt.VALID;
    }

    //无参构造器
    public Message() {
    }
}
