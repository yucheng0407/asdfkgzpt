var config = {
    id: { // 主键
    },
    dictName: { // 字典名称
        rules: {checkSave: ["notNull"]},
        maxLength: 50
    },
    dictCode: { // 字典编码
        rules: {checkSave: ["notNull", "isUpperCase", "isCode"]},
        maxLength: 25
    },
    isEmpty: { // 是否为空 0否  1是
        type: "dict",
        dictConfig: {
            dictCode: [{code: 1, value: "是"}, {code: 0, value: "否"}],
            checkType: "radio"
        },
        defaultValue: "0",
        changeFunc: "changeIsEmpty"
    },
    dictType: { // 字典类型  1平台字典  2业务字典
        rules: {checkSave: ["notNull"]},
        type: "dict",
        dictConfig: {
            dictCode: "DICTLX",
            // showPlsSelect:false
        },
        defaultValue: "2"
    },
    pdictCode: { // 上级字典编码
        display: false
    },
    pdictName: {
        type: "layer",
        layerConfig: {
            url: "/dict/sysDictSelect?",
            title: "选择上级字典",
            callbackFunc: "dictSelectCallback",
            canDelete: true
        },
        changeFunc: "emptyPdictName",
        ifForm: false
    },
    description: { // 描述
        type: "textarea",
        textareaConfig: {
            showNum: true
        },
        maxLength: 100
    },
    cjrId: { // 创建人ID
    },
    xgrId: { // 修改人ID
    },
    xgsj: { // 修改时间
        type: "date",
        dateConfig: {
            dateFmt: "yyyy-MM-dd"
        }
    },
    cjsj: { // 创建时间
        type: "date",
        dateConfig: {
            dateFmt: "yyyy-MM-dd"
        }
    },
    sfyxSt: { // 有效状态 0无效 1有效
        display: false,
        defaultValue: "VALID"
    }
};

//系统字典表（从表）列表字段配置
var sysSubdictConfig = {
    "list.*.id": {        //主键
    },

    "list.*.code": {        //字典项编码
        disabled: true
    },
    "list.*.value": {        //字典项值
        disabled: true
    },
    "list.*.sort": {        //字典项序号
        disabled: true
    },
    "list.*.pcode": {        //上级字典项编码
        disabled: true
    },
    "list.*.remark": {        //备注
        disabled: true
    },

    "list.*.dictId": {        //字典ID 对应SYS_DICT表主键(ID)
    },
    "list.*.sfyxSt": {        //是否有效
        display: false,
        defaultValue: "VALID"
    }
};


//按钮配置
var buttonArr = [
    {
        id: "save",
        name: "保存",
        onClick: "save",
        style: "c_button"
    }
];

var buttonsJson = {
    tag: ".w_button_box",
    buttons: buttonArr
};



