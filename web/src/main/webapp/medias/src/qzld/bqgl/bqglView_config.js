organId=$("#organId").val();
var config = {
    id: { // ID
    },
    zrdw:{  //责任单位
        dispaly:true,
    },
    zrdwmc: {  //责任单位名称
        disabled:true

    },
    zbkssj:{  //值班开始时间
        disabled:true
    },
    zbjssj:{ //值班结束时间
        disabled:true
    },


    zbld: { // 值班领导
        display:false,
        disabled:true
    },
    zbldxm:{ //值班领导名称
        disabled:true
    },

    zbldzw:{ //值班领导职务
        disabled:true
    },
    zblddh:{  //值班领导电话
        disabled:true
    },
    zbsdh:{ //值班室电话
        disabled:true
    },
    zbmjs:{  //值班民警
        display:false,

    },
    zbmjmcs:{ //值班民警名称
        disabled:true
    },
    zbfxjsl:{  //值班辅协警数量
        disabled:true
    },
    bqld: { // 备勤领导
        disabled:true
    },
    bqldmc:{ //备勤领导名称
        disabled:true
    },
    bqmjs:{  //备勤民警
        disabled:true
    },
    bqmjmcs:{ //备勤民警名称
        disabled:true
    },
    bqfxjsl:{ //备勤辅协警数量
        disabled:true
    },
    bz: { // 备注
        disabled:true
    },

    yyls:{
        disabled:true
    },
}

//按钮配置
var buttonArr = [
    {
        id: "edit",
        name: "修改",
        onClick: "edit",
        style: "c_button"
    }
];
var buttonsJson = {
    tag: ".w_button_box",
    buttons: buttonArr
};