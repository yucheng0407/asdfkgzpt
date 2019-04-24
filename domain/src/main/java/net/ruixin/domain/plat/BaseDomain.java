package net.ruixin.domain.plat;

import com.fasterxml.jackson.databind.JsonNode;

import javax.persistence.MappedSuperclass;
import javax.persistence.Transient;
import java.io.Serializable;
import java.util.Map;

/**
 * 实体基类
 * Created by Jealous on 2016-11-9.
 */
@MappedSuperclass
public class BaseDomain implements Serializable {
    @Transient
    private JsonNode interactionFields;
    @Transient
    private Map fjUpdateIds;

    public JsonNode getInteractionFields() {
        return interactionFields;
    }

    public void setInteractionFields(JsonNode interactionFields) {
        this.interactionFields = interactionFields;
    }

    public Map getFjUpdateIds() {
        return fjUpdateIds;
    }

    public void setFjUpdateIds(Map fjUpdateIds) {
        this.fjUpdateIds = fjUpdateIds;
    }
}
