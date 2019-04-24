var ruleConfig = {
    id: {
        display: false
    },
    qxlx: { //权限类型
        // rules: {checkSave: ["notNull"]},
        type: "dict",
        dictConfig: {
            dictCode: "QXLX"
        }
    },
    gzlx: {    //规则类型
        defaultValue: "2"
    },
    pageIds: {  //页面IDs
        display: false
    },
    pageNames: {          //页面names
        type: "layer",
        layerConfig: {     //在类型为数据字典时才有dictConfig
            url: "/page/pageSelect?mulChooseFlag=true&",
            title: "选择所属页面",
            callbackFunc: "pageSelectCallback",
            checkFunc: "checkPageSelect"
        },
        ifForm: false
    },
    objectId: {   //对象类id
        display: false
    },
    objectName: {           //对象名称
        // rules: {checkSave: ["notNull"]},
        type: "layer",
        layerConfig: {     //在类型为数据字典时才有dictConfig
            url: "/object/objectSelect?",
            title: "选择关联对象",
            callbackFunc: "objectSelectCallback",
            checkFunc: "checkObjectSelect"
        },
        ifForm: false
    },
    sfyxSt: {     //是否有效
        display: false,
        defaultValue: "VALID"
    }
};

var authRuleConfig = {
    "sysBaseRule.id": {        //主键ID
        display: false
    },
    "sysBaseRule.rule_name": {        //规则名称
        rules: {checkSave: ["notNull"]},
        maxLength: 25
    },
    "sysBaseRule.configType": { //规则配置方式
        rules: {checkSave: ["notNull"]},
        type: "dict",
        dictConfig: {
            showPlsSelect: false,
            dictCode: "RULECONFIGTYPE"
        }
    },
    "sysBaseRule.subject": { //规则主体
        rules: {checkSave: ["notNull"]},
        type: "dict",
        dictConfig: {
            checkType: "radio",
            dictCode: "RULESUBJECT"
        }
    },
    "sysBaseRule.ruleRange": { //规则范围
        rules: {checkSave: ["notNull"]},
        type: "dict",
        dictConfig: {
            checkType: "radio",
            dictCode: "RULERANGE"
        }
    },
    "sysBaseRule.includeSubject": { //包含主体
        rules: {checkSave: ["notNull"]},
        type: "dict",
        dictConfig: {
            checkType: "radio",
            dictCode: "INCLUDESUBJECT"
        }
    },
    "sysBaseRule.sxfs": {        //实现方式
        rules: {checkSave: ["notNull"]},
        type: "dict",
        dictConfig: {
            dictCode: "GZSXFS"
        }
    },
    "sysBaseRule.rule_detail": {        //规则实现细节
        type: "textarea",
        rules: {checkSave: ["notNull"]},
        textareaConfig: {
            showNum: true
        },
        maxLength: 500
    },
    "sysBaseRule.description": {        //规则描述
        type: "textarea",
        textareaConfig: {
            showNum: true
        },
        maxLength: 100
    },
    "sysBaseRule.sfyxSt": {        //是否有效
        display: false,
        defaultValue: "VALID"
    }
};
