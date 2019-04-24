package net.ruixin.domain.qzld;

/**
 * 防控指令接收人
 */
public class FkzlJsr {

    /**
     * 接收人标识
     */
    private Long id;

    /**
     * 接收人姓名
     */
    private String userName;

    /**
     * 接收人组织标识
     */
    private long defaultOrganId;

    /**
     * 接收人组织名称
     */
    private String dftOrganName;


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

    public long getDefaultOrganId() {
        return defaultOrganId;
    }

    public void setDefaultOrganId(long defaultOrganId) {
        this.defaultOrganId = defaultOrganId;
    }

    public String getDftOrganName() {
        return dftOrganName;
    }

    public void setDftOrganName(String dftOrganName) {
        this.dftOrganName = dftOrganName;
    }
}
