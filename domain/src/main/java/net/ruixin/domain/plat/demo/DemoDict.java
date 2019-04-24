package net.ruixin.domain.plat.demo;


import net.ruixin.domain.plat.BaseDomain;
import net.ruixin.enumerate.plat.SfyxSt;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.Date;


/**
 * 案例字典
 */
@SuppressWarnings("unused")
@Table(name = "SYS_DEMO_DICT")
@Entity
@DynamicInsert
@DynamicUpdate
public class DemoDict extends BaseDomain {
    @Id
    @SequenceGenerator(name = "seq_sysuser", sequenceName = "SEQ_SYS_USER", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_sysuser")
    private Long id;

    //姓名
    @Column(name = "USER_NAME")
    private String userName;

    //政治面貌
    @Column(name = "ZZMM")
    private String zzmm;

    //城市
    @Column(name = "CITY")
    private String city;
    //CEO
    @Column(name = "CEO")
    private String ceo;
    //方向
    @Column(name = "FX")
    private String fx;

    //民族
    @Column(name = "MZ")
    private String mz;

    //爱好
    @Column(name = "HOBBY")
    private String hobby;

    //语言
    @Column(name = "LANGUAGE")
    private String language;

    //游戏
    @Column(name = "GAME")
    private String game;

    //省
    @Column(name = "SHENG")
    private String sheng;

    //市
    @Column(name = "SHI")
    private String shi;

    //分类附件
    @Column(name = "FJ_ID_FL")
    private String fj_id_fl;

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


    public String getFj_id_fl() {
        return fj_id_fl;
    }

    public void setFj_id_fl(String fj_id_fl) {
        this.fj_id_fl = fj_id_fl;
    }

    public String getCeo() {
        return ceo;
    }

    public void setCeo(String ceo) {
        this.ceo = ceo;
    }

    public String getFx() {
        return fx;
    }

    public void setFx(String fx) {
        this.fx = fx;
    }

    public String getGame() {
        return game;
    }

    public void setGame(String game) {
        this.game = game;
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
}
