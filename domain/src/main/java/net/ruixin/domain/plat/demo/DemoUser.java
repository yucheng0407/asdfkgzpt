package net.ruixin.domain.plat.demo;


import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import net.ruixin.domain.plat.BaseDomain;
import net.ruixin.domain.plat.json.CustomJsonDateDeserializer;
import net.ruixin.enumerate.plat.SfyxSt;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.Formula;

import javax.persistence.*;
import java.util.Date;


/**
 * 用户实体
 * Created by Pitcher on 2016-5-23.
 */
@SuppressWarnings("unused")
@Table(name = "SYS_DEMO_USER")
@Entity
@DynamicInsert
@DynamicUpdate
public class DemoUser extends BaseDomain {
    @Id
    @SequenceGenerator(name = "seq_sysuser", sequenceName = "SEQ_SYS_USER", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_sysuser")
    private Long id;

    //姓名
    @Column(name = "USER_NAME")
    private String userName;
    //性别
    @Column(name = "SEX")
    private Integer sex;
    //政治面貌
    @Column(name = "ZZMM")
    private String zzmm;

    //机构ID
    @Column(name = "ORGAN_ID")
    private Integer organId;
    //组织名称
    @Formula("(SELECT T.ORGAN_NAME FROM SYS_DEMO_ORGAN T WHERE T.ID=ORGAN_ID AND T.SFYX_ST='1' )")
    private String organName;

    //出生日期
    @Temporal(TemporalType.DATE)
    @Column(name = "CSRQ")
    private Date csrq;

    //出生时间
    @JsonDeserialize(using = CustomJsonDateDeserializer.class)
    @Column(name = "BIR_TIME")
    private Date birTime;

    //城市
    @Column(name = "CITY")
    private String city;


    //民族
    @Column(name = "MZ")
    private String mz;

    //爱好
    @Column(name = "HOBBY")
    private String hobby;

    //语言
    @Column(name = "LANGUAGE")
    private String language;

    //水果
    @Column(name = "FRUIT")
    private String fruit;

    //备注
    @Column(name = "DESCRIPTION")
    private String description;

    //照片
    @Column(name = "ZP_ID")
    private Long zp_id;

    //省
    @Column(name = "SHENG")
    private String sheng;

    //市
    @Column(name = "SHI")
    private String shi;

    //附件
    @Column(name = "FJ_ID")
    private String fj_id;

    //分类附件
    @Column(name = "FJ_ID_FL")
    private String fj_id_fl;

    //表格附件
    @Column(name = "FJ_ID_TABLE")
    private String fj_id_table;

    //单个附件
    @Column(name = "FJ_ID_SINGLE")
    private String fj_id_inner;

    //html5附件
    @Column(name = "FJ_ID_HTML5")
    private String fj_id_html5;

    //内容
    @Column(name = "CONTENT")
    private String content;


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


    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Integer getSex() {
        return sex;
    }

    public void setSex(Integer sex) {
        this.sex = sex;
    }


    public Date getCsrq() {
        return csrq;
    }

    public void setCsrq(Date csrq) {
        this.csrq = csrq;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getOrganId() {
        return organId;
    }

    public void setOrganId(Integer organId) {
        this.organId = organId;
    }

    public String getOrganName() {
        return organName;
    }

    public void setOrganName(String organName) {
        this.organName = organName;
    }

    public Long getZp_id() {
        return zp_id;
    }

    public void setZp_id(Long zp_id) {
        this.zp_id = zp_id;
    }

    public String getFj_id() {
        return fj_id;
    }

    public void setFj_id(String fj_id) {
        this.fj_id = fj_id;
    }


    public String getHobby() {
        return hobby;
    }

    public void setHobby(String hobby) {
        this.hobby = hobby;
    }

    public String getZzmm() {
        return zzmm;
    }

    public void setZzmm(String zzmm) {
        this.zzmm = zzmm;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getMz() {
        return mz;
    }

    public void setMz(String mz) {
        this.mz = mz;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getFruit() {
        return fruit;
    }

    public void setFruit(String fruit) {
        this.fruit = fruit;
    }

    public String getFj_id_fl() {
        return fj_id_fl;
    }

    public void setFj_id_fl(String fj_id_fl) {
        this.fj_id_fl = fj_id_fl;
    }

    public String getFj_id_table() {
        return fj_id_table;
    }

    public void setFj_id_table(String fj_id_table) {
        this.fj_id_table = fj_id_table;
    }

    public String getFj_id_inner() {
        return fj_id_inner;
    }

    public void setFj_id_inner(String fj_id_inner) {
        this.fj_id_inner = fj_id_inner;
    }

    public String getFj_id_html5() {
        return fj_id_html5;
    }

    public void setFj_id_html5(String fj_id_html5) {
        this.fj_id_html5 = fj_id_html5;
    }

    public Date getBirTime() {
        return birTime;
    }

    public void setBirTime(Date birTime) {
        this.birTime = birTime;
    }

    public String getSheng() {
        return sheng;
    }

    public void setSheng(String sheng) {
        this.sheng = sheng;
    }

    public String getShi() {
        return shi;
    }

    public void setShi(String shi) {
        this.shi = shi;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
