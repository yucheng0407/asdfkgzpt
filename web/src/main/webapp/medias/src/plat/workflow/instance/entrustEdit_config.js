var entrustConfig = {
    id: {   //id
        display: false
    },
    entrustUserId: {  //委办人id
        display: false
    },
    entrustUserName: {  //委办人姓名
        rules: {checkSave: ["notNull"]},
        type: "layer",
        layerConfig: {
            url: "/tree/getTree?treeType=4&selectType=ry&",
            title: "选择委办人",
            callbackFunc: "entrustUserSelectCallback",
            style: "tree"
        },
        ifForm: false
    },
    workflowId: {  //所属流程
        display: false
    },
    startDate: {   //开始时间
        rules: {checkSave: ["notNull"]},
        type: "date",
        dateConfig:{
            minDate:"sysdate",
            maxDate:"endDate",
            focusPosit:"endDate"
        }
    },
    endDate: {   //结束时间
        rules: {checkSave: ["notNull"]},
        type: "date",
        dateConfig:{
            minDate:"startDate"
        }
    },
    sfyxSt: {         //是否有效
        defaultValue: "VALID"
    }
};


