//model渲染方案配置
var param = RX.page.param;
var resourceConfig = {
    id: {display: false},
    name: {
        rules: {checkSave: ["notNull"]},
        maxLength: 25
    },
    code: {
        rules: {checkSave: ["notNull", "isCode"]},
        maxLength: 25
    },
    type: {defaultValue: resourceType},
    parentId: {},
    parentName: {
        type: "layer",
        layerConfig: {
            url: "/resource/resourceTreeSelect?id=" + (param.id || "") + "&resourceType=" + config.parent,
            title: "选择上级资源",
            callbackFunc: "selectParentCallback",
            style: "tree",
            canDelete: true,
            deleteProperty: "parentId"
        },
        ifForm: false
    },
    parentType: {},
    url: {
        rules: {checkValue: ["isResourceUrl"]},
        maxLength: 100
    },
    targetId: {},
    targetName: {
        disabled: true
    },
    icon: {},
    bizType: {},
    description: {
        type: "textarea",
        textareaConfig: {
            showNum: true
        },
        maxLength: 100
    },
    sfyxSt: {     //是否有效
        display: false,
        defaultValue: "VALID"
    }
};

if (config.bizdict) {
    var arrs = config.bizdict.split("||");
    resourceConfig.bizType = {
        type: "dict",
        dictConfig: {
            dictCode: arrs[0]
        },
        defaultValue: arrs[1]
    }
}

if (config.iconpath) {
    resourceConfig.icon = {
        type: "layer",
        layerConfig: {
            url: config.iconpath,
            title: "选择图标",
            callbackFunc: "selectIconCallback",
            style: "medium",
            canDelete: true
        }
    }
}

if (config.urlselect) {
    resourceConfig.url = {
        rules: {checkValue: ["isResourceUrl"]},
        type: "layer",
        layerConfig: {
            canInput: true,
            title: "选择地址",
            style: "medium",
            url: config.urlselect,
            checkFunc: "urlCheck",
            callbackFunc: "urlSelectCallback",
            canDelete: true
        },
        changeFunc: "urlChangeCallback"
    };
}
