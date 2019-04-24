//model渲染方案配置
var config = {
    userNames: {                 //用户名称
        rules: {checkSave: ["notNull"]},
        type: "layer",
        layerConfig: {
            url: "/user/sysUserSelect",
            title: "请选择用户",
            callbackFunc: "userCallbackFunc",
            canDelete: true,
        },
        changeFunc: "delUserIds",
        ifForm: false
    },
    userIds: {
        display: false
    },
    objectId: {
        type: "dict",
        dictConfig: {
            reqInterface: "getObjZd"
        }
    },
    sfyx_st: {        //是否有效
        display: false,
        defaultValue: "VALID"
    }
};
