//model渲染方案配置
var config = {
    id: {display: false},
    title: {
        rules: {checkSave: ["notNull"]}
    },
    content: {
        rules: {checkSave: ["notNull"]}
    },
    typeCode: {
        rules: {checkSave: ["notNull"]},
        type: "dict",
        dictConfig: {
            ifSearch: true,
            reqInterface: "getMessageType"
        }
    },
    sendUser: {
        rules: {checkSave: ["notNull"]},
        type: "layer",
        layerConfig: {
            title: "请选择一个机构或人员",
            url: "/organ/organTree?selectType=mul&kind=opu&confirmFunc=confirmFunc&sync=true&cascadeSel=-",
            style: "tree",
            callbackFunc: "sendUserSelect",
            canDelete: true,
            deleteProperty: "sendUserIds"
        }
    },
    sendUserIds: {},
    sfyxSt: {     //是否有效
        display: false,
        defaultValue: "VALID"
    }
};

