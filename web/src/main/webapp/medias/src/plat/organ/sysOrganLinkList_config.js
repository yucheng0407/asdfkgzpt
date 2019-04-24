//视图字段配置
var delOrganId = RX.page.param.delOrganId; //删除的机构id
var config = {
    newOrganName: {
        type: "layer",
        layerConfig: {
            title: "选择机构",
            style: "tree",
            url: "/organ/organTree?selectType=sin&kind=ou&filterId=" + delOrganId,
            callbackFunc: "selPositionCallback"
        }
    }
};

