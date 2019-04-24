//model渲染方案配置
var config = {
    id: {        //主键ID
        display: false
    },
    userIds: {                   //用户IDs
        display: false
    },
    userId: {},
    userNames: {                 //用户名称
        type: "layer",
        layerConfig: {
            url: "/user/sysUserSelect",
            title: "请选择用户",
            callbackFunc: "userCallbackFunc"
        },
        ifForm: false
    },
    objectId: {
        rules: {checkSave: ["notNull"]},
        type: "dict",
        dictConfig: {
            reqInterface: "getObjZd"
        },
        changeFunc: "objectChangeFunc"
    },
    oIds: {
        display: false
    },
    sfyx_st: {        //是否有效
        display: false,
        defaultValue: "VALID"
    }
};

