package net.ruixin.domain.qzld;

import java.util.List;

/**
 * 防控发送指令信息
 */
public class FkzlSend {

    /**
     * 指令类型
     */
    private String type;

    /**
     * 指令内容
     */
    private String content;

    /**
     * 接收组织，支持多个，用","分隔，根据组织id获取具体的接收人
     */
    private String orgIds;

    /**
     * 按照人员发送时，指定具体的接收人员，若选用按照单位发送，接收人员默认为空
     */
    private List<FkzlJsr> recivers;

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getOrgIds() {
        return orgIds;
    }

    public void setOrgIds(String orgIds) {
        this.orgIds = orgIds;
    }

    public List<FkzlJsr> getRecivers() {
        return recivers;
    }

    public void setRecivers(List<FkzlJsr> recivers) {
        this.recivers = recivers;
    }
}
