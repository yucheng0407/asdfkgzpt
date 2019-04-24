var config = {
    id: { // ID
    },
    zrdw:{  //责任单位
      dispaly:true

    },
    zrdwmc: {  //责任单位名称
        rules: {checkSave: ["notNull"]},
        disabled:true
    },
    zbkssj:{  //值班开始时间
        rules: {checkSave: ["notNull"]},
        type: "date",
        dateConfig: {
            dateFmt: "yyyy-MM-dd HH:mm:ss",
            minDate: 0,
            maxDate: 1
        }
    },
    zbjssj:{ //值班结束时间
        rules: {checkSave: ["notNull"]},
        type: "date",
        dateConfig: {
            dateFmt: "yyyy-MM-dd HH:mm:ss",
            minDate: "zbkssj",
            maxDate:2
        }
    },
    zbld: { // 值班领导
        display:false,
        rules: {checkSave: ["notNull"]},
    },
    zbldxm:{ //值班领导名称
        rules: {checkSave: ["notNull"]},
        type: "layer",
        layerConfig: {
            url:"/bqgl/getUserTeamTree?type=select",
            title: "责任用户",
            style: "tree",
            callbackFunc: "getZbldDetail",
            checkFunc:'addZbldSelect',
            canDelete: true,
        }
    },

    zbldzw:{ //值班领导职务
        rules: {checkSave: ["notNull"]},
        maxLength: 50
    },
    zblddh:{  //值班领导电话
        rules: {checkSave: ["notNull"],checkValue: ["isTel"]},
        maxLength: 30
    },
    zbsdh:{ //值班室电话
        rules: {checkSave: ["notNull"] , checkValue: ["isTel"]},
        maxLength: 30
    },
    zbmjs:{  //值班民警
        display:false,
        rules: {checkSave: ["notNull"]},
    },
    zbmjmcs:{ //值班民警名称
        rules: {checkSave: ["notNull"]},
        type: "layer",
        layerConfig: {
            url:"/bqgl/getUserTeamTree?type=checkbox",
            title: "责任用户",
            style: "tree",
            callbackFunc: "getZbmjDetail",
            checkFunc:'addZbmjSelect',
            canDelete: true,
        }
    },
    zbfxjsl:{  //值班辅协警数量
        rules: {checkSave: ["notNull"],checkValue: ["isIntGte"]},
    },
    bqld: { // 备勤领导
        display:false,
        rules: {checkSave: ["notNull"]},
    },
    bqldmc:{ //备勤领导名称
        rules: {checkSave: ["notNull"]},
        type: "layer",
        layerConfig: {
            url:"/bqgl/getUserTeamTree?type=select",
            title: "责任用户",
            style: "tree",
            callbackFunc: "getBqldDetail",
            checkFunc:'addBqldSelect',
            canDelete: true,
        }

    },
    bqmjs:{  //备勤民警
        rules: {checkSave: ["notNull"]},
    },
    bqmjmcs:{ //备勤民警名称
        rules: {checkSave: ["notNull"]},
        type: "layer",
        layerConfig: {
            url:"/bqgl/getUserTeamTree?type=checkbox",
            title: "责任用户",
            style: "tree",
            callbackFunc: "getBqmjDetail",
            checkFunc:'addBqmjSelect',
            canDelete: true,
        }
    },
    bqfxjsl:{ //备勤辅协警数量
        rules: {checkSave: ["notNull"],checkValue: ["isIntGte"]},
    },
    bz: { // 备注
        maxLength: 1000
    },

    yyls:{
        type: "layer",
        layerConfig: {
            url:"/bqgl/getBqglList",
            title: "引用历史记录",
            style: "tree",
            canDelete: true,
        }
    },
    apdr:{
        type: "date",
        dateConfig: {
            dateFmt: "yyyy-MM-dd",
            minDate:"sysdate",
        }

    }
}

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