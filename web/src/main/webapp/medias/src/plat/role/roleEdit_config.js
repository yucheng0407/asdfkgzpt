//model渲染方案配置
var roleConfig = {
    id: {        //主键ID
        display: false
    },
    roleName: {        //角色名称
        rules: {checkSave: ["notNull"]},
        maxLength: 25
    },
    roleCode: {        //角色编码
        rules: {checkKeyup: ["isCode"], checkSave: ["notNull"]},
        maxLength: 20
    },
    description: {   //描述
        type: "textarea",
        textareaConfig: {
            showNum: true
        },
        maxLength: 100
    },
    roleType: {        //角色类型
        rules: {checkSave: ["notNull"]},
        type: "dict",
        // defaultValue:1,
        dictConfig: {
            dictCode: "JSLX"
        },
        changeFunc: "changeRule"
    },
    levels: {        //角色级别
        rules: {checkSave: ["notNull"]},
        type: "dict",
        dictConfig: {
            dictCode: "SYSLEVEL",
            pcode: 3        //默认为业务用户级别
        },
        defaultValue: 3
    },
    roleMade: { //角色组成类型
        rules: {checkSave: ["notNull"]},
        type: "dict",
        dictConfig: {
            dictCode: "JSZCLX"
        },
        defaultValue: 1
    },
    authType: {     //数据规则类型
        type: "dict",
        dictConfig: {
            dictCode: "SJQXLX"
        }
    },
    isCombine: {   //是否组合
        rules: {checkSave: ["notNull"]},
        type: "dict",
        dictConfig: {
            dictCode: "SF",
            checkType: "radio"
        },
        defaultValue: "0",
        changeFunc: "combineChange"
    },
    sfyxSt: {        //是否有效
        display: false,
        defaultValue: "VALID"
    }
};