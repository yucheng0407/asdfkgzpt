package net.ruixin.util.workflow.draw.util;

import net.ruixin.util.workflow.constant.NodeStatus;
import net.ruixin.util.workflow.model.BpmProcessStatusColor;

import java.util.*;

public class FlowStatusColorUtil {
    public static Map<String, String> getStatusColorMap() {
        List<BpmProcessStatusColor> list = getProcessStatusColorList();
        Map<String, String> map = new LinkedHashMap();
        Iterator var3 = list.iterator();

        while(var3.hasNext()) {
            BpmProcessStatusColor nodeStatus = (BpmProcessStatusColor)var3.next();
            map.put(nodeStatus.getKey(), nodeStatus.getColor());
        }

        return map;
    }

    public static List<BpmProcessStatusColor> getProcessStatusColorList() {
        NodeStatus[] nodeStatusAry = NodeStatus.values();
        List<BpmProcessStatusColor> list = new ArrayList();
        NodeStatus[] var5 = nodeStatusAry;
        int var4 = nodeStatusAry.length;

        for(int var3 = 0; var3 < var4; ++var3) {
            NodeStatus nodeStatus = var5[var3];
            String key = nodeStatus.getKey();
            String color = ProcessDiagramColorUtil.getColorString(key, nodeStatus.getColor());
            BpmProcessStatusColor bpmProcessStatus = new BpmProcessStatusColor(key, nodeStatus.getValue(), color, nodeStatus.getOrder());
            list.add(bpmProcessStatus);
        }
        return list;
    }
}
