//权限状态配置

//新增权限配置
var xzState = {
    disable: ["postList.*"]
};

//修改权限配置
var xgState = {
    disable: []
};

//查看权限配置
var ckState = {
    enable: []
};

//model渲染方案配置
var config = {
    "postList.*.name":{

    },
    organName: {        //机构名称
        rules: {checkSave: ["notNull"]},
        maxLength: 50
    },
    fullName: {        //全称
        rules: {checkSave: ["notNull"]},
        maxLength: 50
    },
    sortNum: {        //顺序号
        rules: {checkKeyup: ["isIntGte"], checkSave: ["notNull"]},
        maxLength: 10
    },
    organCode: {        //机构编码
        rules: {checkKeyup: ["isCode"], checkSave: ["notNull"]},
        maxLength: 25
    },
    parentOrg: {        //上级机构ID
        display: false
    },
    parentName: {            //上级机构名称
        type: "layer",
        layerConfig: {
            url: "/tree/getTree?",
            title: "选择上级机构",
            callbackFunc: "sjmbSelectCallback",
            style: "tree",
            checkFunc: "addOrganId",
            canDelete: true
        },
        changeFunc: "emptyParent"
    },
    description: {        //备注
        maxLength: 100
    },
    zzmm: {
        type:"dict",
        dictConfig:{
            dictCode:"ZZMMDEMO"
        }
    },
    clsj: {
        rules:{
            // checkValue:["notNull"],
            checkSave:["notNull"]
        },
        type: "date"
    },
    dv:{
        rules:{
            // checkValue:["notNull"],
            checkSave:["notNull"]
        },
        defaultValue:"100"
    }
};
