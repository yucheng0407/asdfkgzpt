//表单字段配置
var config = {
    id: {        //主键ID
    },
    cs: {
        // rules: {checkSave: ["notNull"]}
    },
    userName: {        // 姓名
        type: "normal",
        display: true,
        spanShow: false,
        // rules: {checkSave: ["isDigits"]}
        // spanType: "multiline",
        // spanType: "ellipsis",

        // defaultValue:"Tom",
        // changeFunc: "nameChangeFun",
        disabled: false,
        rules: {checkKeyup: ["isEnglish"]}
        // maxLength: 10
        // rules: {checkSave: ["isDigits"]}
    },
    sex: {        // 性别
        // rules: {checkSave: ["notNull"]}
    },
    mz: {
        // rules: {checkSave: ["notNull"]},
        type: "dict",
        dictConfig: {
            dictCode: "MZDEMO",
            checkType: "radio"
        }
    },
    zzmm: {       //政治面貌
        type: "dict",
        dictConfig: {
            dictCode: "ZZMMDEMO",
            showPlsSelect: false
        },
        spanShow: false
    },
    birTime: {
        type: "date",
        dateConfig: {
            defaultDate:true,
            dateFmt: "yyyy-MM-dd HH:mm:ss",
            maxDate:"sysdate"
        }
    },
    hobby: {       //爱好
                   // rules: {checkSave: ["notNull"]},
        type: "dict",
        dictConfig: {
            dictCode: "HOBBYSDEMO",
            checkType: "checkbox"
        },
        spanShow: true
        // defaultValue: ["1", "2"]
    },

    fruit: {        // 水果
        // rules: {checkSave: ["notNull"]}
    },
    csrq: {        // 出生日期
        type: "date",
        // rules: {checkSave: ["notNull"]},
        dateConfig: {
            dateFmt: "yyyy-MM-dd"
        }
    },
    language: {
        rules: {checkSave: ["notNull"]},
        type: "dict",
        dictConfig: {
            reqInterface: "getLanguage"
        }
    },
    city: {
        // defaultValue:"1",
        // rules: {checkSave: ["notNull"]},
        type: "dict",
        dictConfig: {
            dictCode: "CITYDEMO",
            ifSearch: true
        },
        changeFunc: "changeCity"
    },
    // organName2: {  //所属企业
    //     // rules: {checkSave: ["notNull"]},
    //     type: "layer",
    //     layerConfig: {
    //         title: "所属示例企业",
    //         type: "div",
    //         divWidth: "200px",
    //         divHeight: "200px",
    //         url: "/demo/demoOrganSelect?type=xz&selectType=ck&",
    //         checkFunc: "",
    //         callbackFunc: "organSelectCallback",
    //         canDelete: true
    //     }
    // },
    organName: {  //所属企业
        // rules: {checkSave: ["notNull"]},
        type: "layer",
        layerConfig: {
            // canInput: true,
            title: "所属示例企业",
            style: "medium",
            url: "/demo/cmptDemoOrganSelect",
            param: {
                type: "xz",
                selectType: "ck"
            },
            checkFunc: "",
            callbackFunc: "organSelectCallback",
            canDelete: true,
            deleteProperty: "organId"
        }
    },
    organId: {  //企业ID
        display: false
    },
    zp_id: {
        type: "file",
        rules: {checkSave: ["checkImageFile"]},
        fileConfig: {
            type: "image",
            canDelete: true,
            fileType: ".jpg",
            fileSize: "10KB"
        }
    },
    fj_id_table: {
        type: "file",
        rules: {checkSave: ["checkTableFile"]},
        fileConfig: {
            listName: "表格附件上传",
            uploadName: "上传资料",
            fileType: "*.jpg;*.txt;*.png",
            fileSize: "1MB",
            // minNum: 2,
            // maxNum: 1,
            type: "table"
        }
    },
    fj_id_fl: {
        type: "file",
        rules: {checkSave: ["checkListFile"]},
        fileConfig: {
            type: "list",
            listName: "手风琴附件上传",
            uploadName: "上传照片",
            fileType: "*.jpg;*.txt",
            fileSize: "5MB",
            dictCode: "ZZMMDEMO",
            // minNum: 1
            // minNum: {"zd1": 3, "zd2": 2}
        }
    },
    fj_id_inner: {
        type: "file",
        rules: {checkSave: ["checkInnerFile"]},
        fileConfig: {
            type: "inner",
            fileType: "*.jpg;*.txt",
            fileSize: "1MB",
            // minNum: 2,
            // maxNum: 2
        }
    },
    description: { //备注
        type: "textarea",
        // rules: {checkSave: ["notNull"]},
        textareaConfig: {
            showNum: true
        },
        // defaultValue: "nihao"
        maxLength: 100
    },
    sheng: {  //省
        tagName: "省份",
        type: "dict",
        dictConfig: {
            // dictCode: "PROVINCE"
            dictCode: [{code: "PROVINCE_1", value: "安徽省"}, {code: "PROVINCE_2", value: "江苏省"}]
        }
    },
    shi: {  //市
        type: "dict",
        dictConfig: {
            // dictCode: "CITY",
            dictCode: [{code: "CITY_1", pcode: "PROVINCE_1", value: "合肥市"}, {
                code: "CITY_2",
                pcode: "PROVINCE_1",
                value: "芜湖市"
            },
                {code: "CITY_3", pcode: "PROVINCE_2", value: "南京市"}, {
                    code: "CITY_4",
                    pcode: "PROVINCE_2",
                    value: "常州市"
                }],
            // pcode:["PROVINCE_1","PROVINCE_2"]
            dependence: "sheng"
        }
    },
    content: {
        // rules: {checkSave: ["notNull"]},
        type: "textarea",
        textareaConfig: {
            rich: true,
            richConfig: {
                width: '100%',
                height: '200'
            }
        },
        maxLength: 20
    },
    cslxId: {},
    cslx: {
        canThink: true,
        thinkFunc: "lxFunc",   //获取值接口可以是接口，也可以配置thinkUrl，直接传入url
        linkId: "cslxId",
        maxLength: 25
    },
    startDate: {        // 开始日期
        type: "date",
        dateConfig: {
            type: "month",
            maxDate: "endDate"
        }
    },
    endDate: {        // 结束日期
        type: "date",
        dateConfig: {
            type: "month",
            minDate: "startDate"
        }
    },
    sfyxSt: {        //是否有效
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
