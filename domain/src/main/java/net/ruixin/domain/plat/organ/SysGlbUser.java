package net.ruixin.domain.plat.organ;

import net.ruixin.domain.plat.BaseDomain;
import net.ruixin.enumerate.plat.SfyxSt;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.Formula;

import javax.persistence.*;

/**
 *
 * @author Jealous
 * @date 2015/10/9
 * 实体：组织用户岗位关联表
 */
@SuppressWarnings("unused")
@Table(name = "SYS_GLB_USER")
@Entity
@DynamicInsert
@DynamicUpdate
public class SysGlbUser extends BaseDomain {
    //三要素ID
    @Id
    @SequenceGenerator(name = "seq_sys_glb_user", sequenceName = "SEQ_SYS_GLB_USER", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_sys_glb_user")
    private Long id;
    //岗位ID
    @Column(name = "POST_ID")
    private Long postRoleId;
    //用户ID
    @Column(name = "USER_ID")
    private Long userId;
    //组织ID
    @Column(name = "ORGAN_ID")
    private Long organId;
    //有效标识
    @Enumerated
    @Column(name = "SFYX_ST")
    private SfyxSt sfyxSt;

    @Formula("(SELECT R.ROLE_NAME FROM SYS_ROLE R WHERE R.ID = POST_ID AND R.SFYX_ST = '1' AND R.ROLE_TYPE = 3)")
    private String postRoleName;

    @Formula("(SELECT ORGAN.ORGAN_NAME FROM SYS_ORGAN ORGAN WHERE ORGAN.ID=ORGAN_ID AND ORGAN.SFYX_ST='1')")
    private String organName;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getPostRoleId() {
        return postRoleId;
    }

    public void setPostRoleId(Long postRoleId) {
        this.postRoleId = postRoleId;
    }

    public String getPostRoleName() {
        return postRoleName;
    }

    public void setPostRoleName(String postRoleName) {
        this.postRoleName = postRoleName;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getOrganId() {
        return organId;
    }

    public void setOrganId(Long organId) {
        this.organId = organId;
    }

    public SfyxSt getSfyxSt() {
        return sfyxSt;
    }

    public void setSfyxSt(SfyxSt sfyxSt) {
        this.sfyxSt = sfyxSt;
    }

    public String getOrganName() {
        return organName;
    }

    public void setOrganName(String organName) {
        this.organName = organName;
    }
}
